-- ============================================================================
-- P2a — taxonomie : colonnes de hiérarchie et de mise en avant
-- Rejouable. Prérequis : P0 (tables portfolio_*).
-- ============================================================================

alter table public.portfolio_categories add column if not exists featured boolean not null default false;
alter table public.portfolio_categories add column if not exists description text;
alter table public.portfolio_categories add column if not exists icon text;
alter table public.portfolio_categories add column if not exists color text;

alter table public.portfolio_tags add column if not exists description text;

create index if not exists portfolio_categories_featured_idx on public.portfolio_categories (featured, sort_order);
create index if not exists portfolio_tags_slug_idx on public.portfolio_tags (slug);

-- Profondeur maximale : familles (racines) → sous-catégories (2 niveaux).
create or replace function public.portfolio_category_depth()
returns trigger
language plpgsql
as $$
declare
  parent_parent uuid;
begin
  if new.parent_id is null then
    return new;
  end if;
  if new.parent_id = new.id then
    raise exception 'Une catégorie ne peut pas être son propre parent';
  end if;
  select parent_id into parent_parent
  from public.portfolio_categories
  where id = new.parent_id;
  if parent_parent is not null then
    raise exception 'Profondeur maximale de 2 niveaux (famille → sous-catégorie)';
  end if;
  return new;
end;
$$;

drop trigger if exists portfolio_categories_depth on public.portfolio_categories;
create trigger portfolio_categories_depth
before insert or update of parent_id on public.portfolio_categories
for each row execute function public.portfolio_category_depth();
