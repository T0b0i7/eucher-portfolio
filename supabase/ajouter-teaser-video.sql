-- ============================================================================
-- SCRIPT DE MISE À JOUR DE LA BASE DE DONNÉES SUPABASE
-- Objet : Ajout du support des Teasers Vidéo TikTok / YouTube / MP4
--
-- Exécutez ce script dans l'éditeur SQL de votre tableau de bord Supabase :
-- https://supabase.com/dashboard/project/pwpfoqgiltdgdlaazdjc/sql/new
-- ============================================================================

begin;

-- 1. Ajout de la colonne video_url dans la table relationnelle portfolio_projects
alter table public.portfolio_projects
  add column if not exists video_url text;

-- 2. Mise à jour de la fonction de projection pour inclure video_url
create or replace function public.sync_portfolio_projects(doc jsonb)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  arr jsonb;
  proj jsonb;
  v_id uuid;
  v_legacy int;
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

  -- 1. Catégories distinctes
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

  -- 2. Technologies distinctes
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

  -- 3. Projets : upsert par legacy_id
  for proj in
    select item.value
    from jsonb_array_elements(arr) with ordinality as item(value, ord)
    order by item.ord
  loop
    idx := idx + 1;
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
      role, sector, demo_url, repo_url, video_url, demo_visible, repo_visible, impact, features, published_at
    ) values (
      v_legacy,
      v_slug,
      coalesce(nullif(proj->>'n', ''), 'Projet ' || v_legacy),
      nullif(proj->>'d', ''),
      nullif(proj->>'long', ''),
      v_status,
      v_featured,
      case when coalesce(proj->>'sort', '') ~ '^[0-9]+$' then (proj->>'sort')::int else idx end,
      nullif(proj->>'role', ''),
      nullif(proj->>'sec', ''),
      nullif(proj->>'u', ''),
      nullif(proj->>'repo', ''),
      nullif(coalesce(proj->>'video_url', proj->>'video'), ''),
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
      video_url     = excluded.video_url,
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

    -- 4. Relations : purge puis réinsertion
    delete from public.portfolio_project_technologies where project_id = v_id;

    v_cats := case
      when jsonb_typeof(proj->'cats') = 'array' then array(
        select trim(value) from jsonb_array_elements_text(proj->'cats') where trim(value) <> ''
      )
      when nullif(trim(coalesce(proj->>'cats', '')), '') is not null
        then string_to_array(proj->>'cats', ',')
      when nullif(trim(coalesce(proj->>'cat', '')), '') is not null
        then array[proj->>'cat']
      else array[]::text[]
    end;

    delete from public.portfolio_project_categories where project_id = v_id;

    if array_length(v_cats, 1) > 0 then
      insert into public.portfolio_project_categories (project_id, category_id)
      select distinct v_id, c.id
      from unnest(v_cats) as item(raw)
      join public.portfolio_categories c
        on c.slug = public.portfolio_slugify(trim(item.raw))
      on conflict do nothing;
    end if;

    v_tags := case
      when jsonb_typeof(proj->'tags') = 'array' then array(
        select trim(value) from jsonb_array_elements_text(proj->'tags') where trim(value) <> ''
      )
      when nullif(trim(coalesce(proj->>'tags', '')), '') is not null
        then string_to_array(proj->>'tags', ',')
      else array[]::text[]
    end;

    delete from public.portfolio_project_tags where project_id = v_id;

    if array_length(v_tags, 1) > 0 then
      for v_tag in select distinct trim(t) from unnest(v_tags) as t where trim(t) <> '' loop
        insert into public.portfolio_tags (slug, name)
        values (public.portfolio_slugify(v_tag), v_tag)
        on conflict (slug) do update set name = excluded.name
        returning id into v_tag_id;

        insert into public.portfolio_project_tags (project_id, tag_id)
        values (v_id, v_tag_id)
        on conflict do nothing;
      end loop;
    end if;

    if nullif(trim(coalesce(proj->>'t', '')), '') is not null then
      insert into public.portfolio_project_technologies (project_id, technology_id)
      select distinct v_id, t.id
      from regexp_split_to_table(proj->>'t', '\s*,\s*') as item(tech)
      join public.portfolio_technologies t
        on t.slug = public.portfolio_slugify(trim(item.tech))
      on conflict do nothing;
    end if;
  end loop;

  -- 5. Suppression des projets orphelins
  delete from public.portfolio_projects
  where legacy_id is not null
    and legacy_id not in (
      select coalesce(
        case when coalesce(item.value->>'id', '') ~ '^[0-9]+$' then (item.value->>'id')::int end,
        item.ord::int
      )
      from jsonb_array_elements(arr) with ordinality as item(value, ord)
    );
end;
$$;

-- 3. Déclenchement de la synchronisation sur le document maître portfolio existant
update public.portfolio
set updated_at = now()
where id = 1;

commit;

-- Vérification du résultat
select id, legacy_id, slug, title, status, demo_url, video_url 
from public.portfolio_projects 
order by sort_order asc, legacy_id asc;
