-- ============================================================================
-- P1 — recherche publique des projets (filtres combinables, tri, pagination)
-- Fonction RPC appelée par assets/js/api.js via
-- POST /rest/v1/rpc/search_portfolio_projects.
-- security invoker : la RLS P0 s'applique (seuls les published sortent).
-- Rejouable.
-- ============================================================================

create or replace function public.search_portfolio_projects(
  p_q            text default null,
  p_categories   text[] default null,
  p_technologies text[] default null,
  p_tags         text[] default null,
  p_sort         text default 'recent',
  p_limit        integer default 12,
  p_offset       integer default 0
) returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
with base as (
  select p.*
  from public.portfolio_projects p
  where p.status = 'published'
    and (
      p_q is null or btrim(p_q) = '' or
      p.search_vector @@ websearch_to_tsquery('french', p_q) or
      exists (
        select 1
        from public.portfolio_project_tags pt
        join public.portfolio_tags t on t.id = pt.tag_id
        where pt.project_id = p.id and t.name ilike '%' || p_q || '%'
      ) or
      exists (
        select 1
        from public.portfolio_project_technologies pt
        join public.portfolio_technologies t on t.id = pt.technology_id
        where pt.project_id = p.id and t.name ilike '%' || p_q || '%'
      )
    )
    and (
      p_categories is null or cardinality(p_categories) = 0 or exists (
        select 1
        from public.portfolio_project_categories pc
        join public.portfolio_categories c on c.id = pc.category_id
        where pc.project_id = p.id and c.slug = any(p_categories)
      )
    )
    and (
      p_technologies is null or cardinality(p_technologies) = 0 or exists (
        select 1
        from public.portfolio_project_technologies pt
        join public.portfolio_technologies t on t.id = pt.technology_id
        where pt.project_id = p.id and t.slug = any(p_technologies)
      )
    )
    and (
      p_tags is null or cardinality(p_tags) = 0 or exists (
        select 1
        from public.portfolio_project_tags pt
        join public.portfolio_tags t on t.id = pt.tag_id
        where pt.project_id = p.id and t.slug = any(p_tags)
      )
    )
), counted as (
  select count(*)::int as total from base
), paged as (
  select *
  from base
  order by
    case when p_sort = 'alpha' then title end asc,
    case when p_sort = 'oldest' then published_at end asc nulls last,
    case when p_sort = 'updated' then updated_at end desc nulls last,
    case when p_sort = 'featured' then featured end desc,
    featured desc,
    sort_order asc,
    published_at desc
  limit greatest(1, least(coalesce(p_limit, 12), 48))
  offset greatest(0, coalesce(p_offset, 0))
)
select jsonb_build_object(
  'total', (select total from counted),
  'items', coalesce((
    select jsonb_agg(jsonb_build_object(
      'id', x.id,
      'slug', x.slug,
      'title', x.title,
      'short_desc', x.short_desc,
      'long_desc', x.long_desc,
      'status', x.status,
      'featured', x.featured,
      'sort_order', x.sort_order,
      'role', x.role,
      'sector', x.sector,
      'demo_url', x.demo_url,
      'repo_url', x.repo_url,
      'demo_visible', x.demo_visible,
      'repo_visible', x.repo_visible,
      'published_at', x.published_at,
      'updated_at', x.updated_at,
      'impact', x.impact,
      'features', x.features,
      'portfolio_project_categories', coalesce((
        select jsonb_agg(jsonb_build_object('portfolio_categories', jsonb_build_object('slug', c.slug, 'name', c.name)))
        from public.portfolio_project_categories pc
        join public.portfolio_categories c on c.id = pc.category_id
        where pc.project_id = x.id
      ), '[]'::jsonb),
      'portfolio_project_tags', coalesce((
        select jsonb_agg(jsonb_build_object('portfolio_tags', jsonb_build_object('slug', t.slug, 'name', t.name)))
        from public.portfolio_project_tags pt
        join public.portfolio_tags t on t.id = pt.tag_id
        where pt.project_id = x.id
      ), '[]'::jsonb),
      'portfolio_project_technologies', coalesce((
        select jsonb_agg(jsonb_build_object('portfolio_technologies', jsonb_build_object('slug', t.slug, 'name', t.name, 'icon', t.icon)))
        from public.portfolio_project_technologies pt
        join public.portfolio_technologies t on t.id = pt.technology_id
        where pt.project_id = x.id
      ), '[]'::jsonb),
      'portfolio_media', coalesce((
        select jsonb_agg(jsonb_build_object(
          'url', m.url, 'storage_path', m.storage_path, 'alt', m.alt,
          'caption', m.caption, 'kind', m.kind, 'sort_order', m.sort_order
        ) order by m.sort_order)
        from public.portfolio_media m
        where m.project_id = x.id
      ), '[]'::jsonb)
    ) order by x.featured desc, x.sort_order asc, x.published_at desc)
    from paged x
  ), '[]'::jsonb)
);
$$;
