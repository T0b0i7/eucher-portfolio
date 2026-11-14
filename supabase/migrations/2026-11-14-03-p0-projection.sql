-- ============================================================================
-- P0 — projection contrôlée du document portfolio vers les tables projet
-- Le back-office continue d'écrire public.portfolio.data ; un trigger dédié
-- projette les projets vers les tables normalisées (modèle de lecture).
-- L'ancien trigger legacy (sync_portfolio_tables) n'est PAS remplacé : il ne
-- touche pas aux nouvelles tables. En P2, les écritures iront directement aux
-- tables et ce document deviendra un cache transitoire.
-- Rejouable.
-- ============================================================================

create or replace function public.sync_project_tables()
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
  v_status public.project_status;
  v_featured boolean;
  v_cat text;
  v_cat_id uuid;
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
    insert into public.categories (slug, name)
    values (public.slugify(v_cat), v_cat)
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
    insert into public.technologies (slug, name)
    values (public.slugify(tech), tech)
    on conflict (slug) do update set name = excluded.name;
  end loop;

  -- 3. Projets : upsert par legacy_id, slug stable et unique.
  for proj in
    select item.value
    from jsonb_array_elements(arr) with ordinality as item(value, ord)
    order by item.ord
  loop
    idx := idx + 1;
    v_legacy := coalesce(nullif(proj->>'id', '')::int, idx);

    v_status := case lower(unaccent(coalesce(proj->>'st', '')))
      when 'publie' then 'published'::public.project_status
      when 'archive' then 'archived'::public.project_status
      else 'draft'::public.project_status
    end;

    v_featured := case
      when jsonb_typeof(proj->'featured') = 'boolean' then (proj->>'featured')::boolean
      else false
    end;

    v_slug := public.slugify(coalesce(proj->>'slug', proj->>'n', 'projet-' || v_legacy));
    if v_slug = '' then v_slug := 'projet-' || v_legacy; end if;
    candidate := v_slug;
    suffix := 1;
    while exists (
      select 1 from public.projects p
      where p.slug = candidate and coalesce(p.legacy_id, -1) <> v_legacy
    ) loop
      suffix := suffix + 1;
      candidate := v_slug || '-' || suffix;
    end loop;
    v_slug := candidate;

    insert into public.projects (
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
      idx,
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
      slug          = excluded.slug,
      title         = excluded.title,
      short_desc    = excluded.short_desc,
      long_desc     = excluded.long_desc,
      status        = excluded.status,
      featured      = excluded.featured,
      sort_order    = excluded.sort_order,
      role          = excluded.role,
      sector        = excluded.sector,
      demo_url      = excluded.demo_url,
      repo_url      = excluded.repo_url,
      demo_visible  = excluded.demo_visible,
      repo_visible  = excluded.repo_visible,
      impact        = excluded.impact,
      features      = excluded.features,
      published_at  = coalesce(public.projects.published_at, excluded.published_at),
      updated_at    = now()
    returning id into v_id;

    -- 4. Relations : purge puis réinsertion (idempotent).
    delete from public.project_categories where project_id = v_id;
    delete from public.project_tags where project_id = v_id;
    delete from public.project_technologies where project_id = v_id;

    if nullif(trim(coalesce(proj->>'cat', '')), '') is not null then
      select c.id into v_cat_id
      from public.categories c
      where c.slug = public.slugify(proj->>'cat')
      limit 1;
      if v_cat_id is not null then
        insert into public.project_categories (project_id, category_id)
        values (v_id, v_cat_id)
        on conflict do nothing;
      end if;
    end if;

    for tech in
      select trim(t.value)
      from regexp_split_to_table(coalesce(proj->>'t', ''), '\s*,\s*') as t(value)
      where nullif(trim(t.value), '') is not null
    loop
      select v.id into v_tech_id
      from public.technologies v
      where v.slug = public.slugify(tech)
      limit 1;
      if v_tech_id is not null then
        insert into public.project_technologies (project_id, technology_id)
        values (v_id, v_tech_id)
        on conflict do nothing;
      end if;
    end loop;
  end loop;

  -- 5. Un projet retiré du document est retiré de la projection (les projets
  --    sans legacy_id, gérés hors document, ne sont jamais supprimés).
  if jsonb_exists(doc, 'projects') then
    delete from public.projects p
    where p.legacy_id is not null
      and not exists (
        select 1
        from jsonb_array_elements(arr) with ordinality as item(value, ord)
        where coalesce(nullif(item.value->>'id', '')::int, item.ord) = p.legacy_id
      );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_sync_project_tables on public.portfolio;
create trigger trg_sync_project_tables
after insert or update on public.portfolio
for each row execute function public.sync_project_tables();

-- Rejoue la projection sur la ligne existante (sans modifier le document).
do $$
begin
  if exists (select 1 from public.portfolio where id = 1) then
    update public.portfolio set data = data where id = 1;
  end if;
end;
$$;
