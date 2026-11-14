-- ============================================================================
-- P0 — projection contrôlée du document portfolio vers les tables projet
-- Le back-office continue d'écrire public.portfolio.data ; un trigger dédié
-- projette les projets vers les tables normalisées (modèle de lecture).
-- L'ancien trigger legacy (sync_portfolio_tables) n'est PAS remplacé : il ne
-- touche pas aux nouvelles tables. En P2, les écritures iront directement aux
-- tables et ce document deviendra un cache transitoire.
-- Rejouable.
-- ============================================================================

create or replace function public.sync_portfolio_projects()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  doc jsonb := coalesce(new.data, '{}'::jsonb);
  arr jsonb;
  proj jsonb;
  v_legacy int;
  v_id uuid;
  v_slug text;
  candidate text;
  suffix int;
  v_status public.portfolio_project_status;
  v_featured boolean;
  v_cat text;
  v_cat_id uuid;
  v_cats text[];
  v_tag text;
  v_tag_id uuid;
  v_tags text[];
  tech text;
  v_tech_id uuid;
  idx int := 0;
begin
  arr := case
    when jsonb_typeof(doc->'projects') = 'array' then doc->'projects'
    else '[]'::jsonb
  end;

  -- 1. Catégories distinctes (une catégorie par valeur du champ `cat`).
  for v_cat in
    select distinct trim(cat.value)
    from jsonb_array_elements(arr) as project(item)
    cross join lateral jsonb_array_elements_text(
      jsonb_build_array(project.item->>'cat')
    ) as cat(value)
    where nullif(trim(cat.value), '') is not null
  loop
    insert into public.portfolio_categories (slug, name)
    values (public.portfolio_slugify(v_cat), v_cat)
    on conflict (slug) do update set name = excluded.name;
  end loop;

  -- 2. Technologies distinctes (champ `t` au format CSV).
  for tech in
    select distinct trim(tech.value)
    from jsonb_array_elements(arr) as project(item)
    cross join lateral regexp_split_to_table(
      coalesce(project.item->>'t', ''), '\s*,\s*'
    ) as tech(value)
    where nullif(trim(tech.value), '') is not null
  loop
    insert into public.portfolio_technologies (slug, name)
    values (public.portfolio_slugify(tech), tech)
    on conflict (slug) do update set name = excluded.name;
  end loop;

  -- 3. Projets : upsert par legacy_id, slug stable et unique.
  for proj in
    select item.value
    from jsonb_array_elements(arr) with ordinality as item(value, ord)
    order by item.ord
  loop
    idx := idx + 1;
    -- Cast tolérant : un id non numérique ne doit jamais faire échouer une publication.
    v_legacy := coalesce(
      case when coalesce(proj->>'id', '') ~ '^[0-9]+$' then (proj->>'id')::int end,
      idx
    );

    v_status := case lower(unaccent(coalesce(proj->>'st', '')))
      when 'publie' then 'published'::public.portfolio_project_status
      when 'archive' then 'archived'::public.portfolio_project_status
      else 'draft'::public.portfolio_project_status
    end;

    v_featured := case
      when jsonb_typeof(proj->'featured') = 'boolean' then (proj->>'featured')::boolean
      else false
    end;

    -- Slug : calculé une seule fois, puis préservé (un renommage ne casse pas
    -- les liens existants et un réordonnancement n'échange pas les URLs).
    select p.slug into v_slug
    from public.portfolio_projects p
    where p.legacy_id = v_legacy
    limit 1;

    if v_slug is null then
      v_slug := public.portfolio_slugify(coalesce(proj->>'slug', proj->>'n', 'projet-' || v_legacy));
      if v_slug = '' then v_slug := 'projet-' || v_legacy; end if;
      candidate := v_slug;
      suffix := 1;
      while exists (
        select 1 from public.portfolio_projects p
        where p.slug = candidate
      ) loop
        suffix := suffix + 1;
        candidate := v_slug || '-' || suffix;
      end loop;
      v_slug := candidate;
    end if;

    insert into public.portfolio_projects (
      legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
      role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
    ) values (
      v_legacy,
      v_slug,
      coalesce(nullif(proj->>'n', ''), 'Projet ' || v_legacy),
      nullif(proj->>'d', ''),
      nullif(proj->>'long', ''),
      v_status,
      v_featured,
      case when coalesce(proj->>'sort', '') ~ '^[0-9]+
      nullif(proj->>'role', ''),
      nullif(proj->>'sec', ''),
      nullif(proj->>'u', ''),
      nullif(proj->>'repo', ''),
      true,
      jsonb_exists(proj, 'repo'),
      case when jsonb_typeof(proj->'impact') = 'array' then proj->'impact' else '[]'::jsonb end,
      case when jsonb_typeof(proj->'f') = 'array' then proj->'f' else '[]'::jsonb end,
      case
        when coalesce(proj->>'published_at', '') ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
          then (proj->>'published_at')::timestamptz
        when v_status = 'published' then now()
        else null
      end
    )
    on conflict (legacy_id) do update set
      slug          = public.portfolio_projects.slug,
      title         = excluded.title,
      short_desc    = excluded.short_desc,
      long_desc     = excluded.long_desc,
      status        = excluded.status,
      featured      = excluded.featured,
      sort_order    = excluded.sort_order,
      role          = excluded.role,
      sector        = excluded.sector,
      demo_url      = excluded.demo_url,
      repo_url      = coalesce(excluded.repo_url, public.portfolio_projects.repo_url),
      demo_visible  = excluded.demo_visible,
      repo_visible  = case
                        when jsonb_exists(proj, 'repo') then true
                        else public.portfolio_projects.repo_visible
                      end,
      impact        = excluded.impact,
      features      = excluded.features,
      published_at  = coalesce(public.portfolio_projects.published_at, excluded.published_at),
      updated_at    = now()
    returning id into v_id;

    -- 4. Relations : purge puis réinsertion (idempotent).
    delete from public.portfolio_project_technologies where project_id = v_id;

    -- 4a. Catégories multiples (`cats` tableau ou CSV) sinon repli `cat`.
    v_cats := case
      when jsonb_typeof(proj->'cats') = 'array' then array(
        select trim(value) from jsonb_array_elements_text(proj->'cats') where trim(value) <> ''
      )
      when nullif(trim(coalesce(proj->>'cats', '')), '') is not null
        then string_to_array(proj->>'cats', ',')
      else array[]::text[]
    end;

    if cardinality(v_cats) > 0 then
      delete from public.portfolio_project_categories where project_id = v_id;
      foreach v_cat in array v_cats loop
        insert into public.portfolio_categories (slug, name)
        values (public.portfolio_slugify(v_cat), initcap(replace(public.portfolio_slugify(v_cat), '-', ' ')))
        on conflict (slug) do nothing;
        select c.id into v_cat_id from public.portfolio_categories c
        where c.slug = public.portfolio_slugify(v_cat) limit 1;
        if v_cat_id is not null then
          insert into public.portfolio_project_categories (project_id, category_id)
          values (v_id, v_cat_id) on conflict do nothing;
        end if;
      end loop;
    elsif not exists (select 1 from public.portfolio_project_categories where project_id = v_id)
          and nullif(trim(coalesce(proj->>'cat', '')), '') is not null then
      insert into public.portfolio_categories (slug, name)
      values (public.portfolio_slugify(proj->>'cat'), proj->>'cat')
      on conflict (slug) do nothing;
      select c.id into v_cat_id from public.portfolio_categories c
      where c.slug = public.portfolio_slugify(proj->>'cat') limit 1;
      if v_cat_id is not null then
        insert into public.portfolio_project_categories (project_id, category_id)
        values (v_id, v_cat_id) on conflict do nothing;
      end if;
    end if;

    -- 4b. Tags (`tags` tableau ou CSV) ; absents = on préserve l'existant.
    v_tags := case
      when jsonb_typeof(proj->'tags') = 'array' then array(
        select trim(value) from jsonb_array_elements_text(proj->'tags') where trim(value) <> ''
      )
      when nullif(trim(coalesce(proj->>'tags', '')), '') is not null
        then string_to_array(proj->>'tags', ',')
      else array[]::text[]
    end;

    if cardinality(v_tags) > 0 then
      delete from public.portfolio_project_tags where project_id = v_id;
      foreach v_tag in array v_tags loop
        insert into public.portfolio_tags (slug, name)
        values (public.portfolio_slugify(v_tag), initcap(replace(public.portfolio_slugify(v_tag), '-', ' ')))
        on conflict (slug) do nothing;
        select t.id into v_tag_id from public.portfolio_tags t
        where t.slug = public.portfolio_slugify(v_tag) limit 1;
        if v_tag_id is not null then
          insert into public.portfolio_project_tags (project_id, tag_id)
          values (v_id, v_tag_id) on conflict do nothing;
        end if;
      end loop;
    end if;

    for tech in
      select trim(t.value)
      from regexp_split_to_table(coalesce(proj->>'t', ''), '\s*,\s*') as t(value)
      where nullif(trim(t.value), '') is not null
    loop
      select v.id into v_tech_id
      from public.portfolio_technologies v
      where v.slug = public.portfolio_slugify(tech)
      limit 1;
      if v_tech_id is not null then
        insert into public.portfolio_project_technologies (project_id, technology_id)
        values (v_id, v_tech_id)
        on conflict do nothing;
      end if;
    end loop;
  end loop;

  -- 5. Un projet retiré du document est retiré de la projection (les projets
  --    sans legacy_id, gérés hors document, ne sont jamais supprimés).
  if jsonb_typeof(doc->'projects') = 'array' then
    delete from public.portfolio_projects p
    where p.legacy_id is not null
      and not exists (
        select 1
        from jsonb_array_elements(arr) with ordinality as item(value, ord)
        where coalesce(
          case when coalesce(item.value->>'id', '') ~ '^[0-9]+$' then (item.value->>'id')::int end,
          item.ord
        ) = p.legacy_id
      );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_sync_portfolio_projects on public.portfolio;
create trigger trg_sync_portfolio_projects
after insert or update on public.portfolio
for each row execute function public.sync_portfolio_projects();

-- Rejoue la projection sur la ligne existante (sans modifier le document).
do $$
begin
  if exists (select 1 from public.portfolio where id = 1) then
    update public.portfolio set data = data where id = 1;
  end if;
end;
$$;
 then (proj->>'sort')::int else idx end,
      nullif(proj->>'role', ''),
      nullif(proj->>'sec', ''),
      nullif(proj->>'u', ''),
      nullif(proj->>'repo', ''),
      true,
      jsonb_exists(proj, 'repo'),
      case when jsonb_typeof(proj->'impact') = 'array' then proj->'impact' else '[]'::jsonb end,
      case when jsonb_typeof(proj->'f') = 'array' then proj->'f' else '[]'::jsonb end,
      case when v_status = 'published' then now() else null end
    )
    on conflict (legacy_id) do update set
      slug          = public.portfolio_projects.slug,
      title         = excluded.title,
      short_desc    = excluded.short_desc,
      long_desc     = excluded.long_desc,
      status        = excluded.status,
      featured      = excluded.featured,
      sort_order    = excluded.sort_order,
      role          = excluded.role,
      sector        = excluded.sector,
      demo_url      = excluded.demo_url,
      repo_url      = coalesce(excluded.repo_url, public.portfolio_projects.repo_url),
      demo_visible  = excluded.demo_visible,
      repo_visible  = case
                        when jsonb_exists(proj, 'repo') then true
                        else public.portfolio_projects.repo_visible
                      end,
      impact        = excluded.impact,
      features      = excluded.features,
      published_at  = coalesce(public.portfolio_projects.published_at, excluded.published_at),
      updated_at    = now()
    returning id into v_id;

    -- 4. Relations : purge puis réinsertion (idempotent).
    delete from public.portfolio_project_technologies where project_id = v_id;

    -- 4a. Catégories multiples (`cats` tableau ou CSV) sinon repli `cat`.
    v_cats := case
      when jsonb_typeof(proj->'cats') = 'array' then array(
        select trim(value) from jsonb_array_elements_text(proj->'cats') where trim(value) <> ''
      )
      when nullif(trim(coalesce(proj->>'cats', '')), '') is not null
        then string_to_array(proj->>'cats', ',')
      else array[]::text[]
    end;

    if cardinality(v_cats) > 0 then
      delete from public.portfolio_project_categories where project_id = v_id;
      foreach v_cat in array v_cats loop
        insert into public.portfolio_categories (slug, name)
        values (public.portfolio_slugify(v_cat), initcap(replace(public.portfolio_slugify(v_cat), '-', ' ')))
        on conflict (slug) do nothing;
        select c.id into v_cat_id from public.portfolio_categories c
        where c.slug = public.portfolio_slugify(v_cat) limit 1;
        if v_cat_id is not null then
          insert into public.portfolio_project_categories (project_id, category_id)
          values (v_id, v_cat_id) on conflict do nothing;
        end if;
      end loop;
    elsif not exists (select 1 from public.portfolio_project_categories where project_id = v_id)
          and nullif(trim(coalesce(proj->>'cat', '')), '') is not null then
      insert into public.portfolio_categories (slug, name)
      values (public.portfolio_slugify(proj->>'cat'), proj->>'cat')
      on conflict (slug) do nothing;
      select c.id into v_cat_id from public.portfolio_categories c
      where c.slug = public.portfolio_slugify(proj->>'cat') limit 1;
      if v_cat_id is not null then
        insert into public.portfolio_project_categories (project_id, category_id)
        values (v_id, v_cat_id) on conflict do nothing;
      end if;
    end if;

    -- 4b. Tags (`tags` tableau ou CSV) ; absents = on préserve l'existant.
    v_tags := case
      when jsonb_typeof(proj->'tags') = 'array' then array(
        select trim(value) from jsonb_array_elements_text(proj->'tags') where trim(value) <> ''
      )
      when nullif(trim(coalesce(proj->>'tags', '')), '') is not null
        then string_to_array(proj->>'tags', ',')
      else array[]::text[]
    end;

    if cardinality(v_tags) > 0 then
      delete from public.portfolio_project_tags where project_id = v_id;
      foreach v_tag in array v_tags loop
        insert into public.portfolio_tags (slug, name)
        values (public.portfolio_slugify(v_tag), initcap(replace(public.portfolio_slugify(v_tag), '-', ' ')))
        on conflict (slug) do nothing;
        select t.id into v_tag_id from public.portfolio_tags t
        where t.slug = public.portfolio_slugify(v_tag) limit 1;
        if v_tag_id is not null then
          insert into public.portfolio_project_tags (project_id, tag_id)
          values (v_id, v_tag_id) on conflict do nothing;
        end if;
      end loop;
    end if;

    for tech in
      select trim(t.value)
      from regexp_split_to_table(coalesce(proj->>'t', ''), '\s*,\s*') as t(value)
      where nullif(trim(t.value), '') is not null
    loop
      select v.id into v_tech_id
      from public.portfolio_technologies v
      where v.slug = public.portfolio_slugify(tech)
      limit 1;
      if v_tech_id is not null then
        insert into public.portfolio_project_technologies (project_id, technology_id)
        values (v_id, v_tech_id)
        on conflict do nothing;
      end if;
    end loop;
  end loop;

  -- 5. Un projet retiré du document est retiré de la projection (les projets
  --    sans legacy_id, gérés hors document, ne sont jamais supprimés).
  if jsonb_typeof(doc->'projects') = 'array' then
    delete from public.portfolio_projects p
    where p.legacy_id is not null
      and not exists (
        select 1
        from jsonb_array_elements(arr) with ordinality as item(value, ord)
        where coalesce(
          case when coalesce(item.value->>'id', '') ~ '^[0-9]+$' then (item.value->>'id')::int end,
          item.ord
        ) = p.legacy_id
      );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_sync_portfolio_projects on public.portfolio;
create trigger trg_sync_portfolio_projects
after insert or update on public.portfolio
for each row execute function public.sync_portfolio_projects();

-- Rejoue la projection sur la ligne existante (sans modifier le document).
do $$
begin
  if exists (select 1 from public.portfolio where id = 1) then
    update public.portfolio set data = data where id = 1;
  end if;
end;
$$;
