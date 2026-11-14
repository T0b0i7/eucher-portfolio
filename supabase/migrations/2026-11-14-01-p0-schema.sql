-- ============================================================================
-- P0 — socle de données : schéma éditorial
-- Migration rejouable. À appliquer dans Supabase → SQL Editor, ou via psql.
-- Ordre : 01 (ce fichier) → 02 (RLS/Storage) → 03 (projection) → seed.
-- ============================================================================

create extension if not exists unaccent;
create extension if not exists pg_trgm;

do $$ begin
  create type public.portfolio_project_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.portfolio_media_kind as enum ('cover', 'gallery');
exception when duplicate_object then null; end $$;

-- Slug stable : minuscules, accents retirés, séparateurs normalisés.
create or replace function public.portfolio_slugify(value text)
returns text
language sql
stable
set search_path = public, extensions
as $$
  select trim(both '-' from regexp_replace(
    lower(unaccent(coalesce(value, ''))),
    '[^a-z0-9]+', '-', 'g'
  ));
$$;

create or replace function public.portfolio_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.portfolio_projects (
  id              uuid primary key default gen_random_uuid(),
  legacy_id       integer unique,
  slug            text not null unique,
  title           text not null,
  short_desc      text,
  long_desc       text,
  status          public.portfolio_project_status not null default 'draft',
  featured        boolean not null default false,
  sort_order      integer not null default 0,
  role            text,
  sector          text,
  demo_url        text,
  repo_url        text,
  demo_visible    boolean not null default true,
  repo_visible    boolean not null default false,
  impact          jsonb not null default '[]'::jsonb,
  features        jsonb not null default '[]'::jsonb,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  search_vector   tsvector generated always as (
    to_tsvector('french', coalesce(title, '') || ' ' || coalesce(short_desc, '') || ' ' || coalesce(long_desc, ''))
  ) stored
);

create table if not exists public.portfolio_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  name_en     text,
  parent_id   uuid references public.portfolio_categories(id) on delete set null,
  enabled     boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.portfolio_tags (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  name_en     text,
  created_at  timestamptz not null default now()
);

create table if not exists public.portfolio_technologies (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  icon        text,
  color       text,
  created_at  timestamptz not null default now()
);

create table if not exists public.portfolio_project_categories (
  project_id  uuid not null references public.portfolio_projects(id) on delete cascade,
  category_id uuid not null references public.portfolio_categories(id) on delete cascade,
  primary key (project_id, category_id)
);

create table if not exists public.portfolio_project_tags (
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  tag_id     uuid not null references public.portfolio_tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

create table if not exists public.portfolio_project_technologies (
  project_id     uuid not null references public.portfolio_projects(id) on delete cascade,
  technology_id  uuid not null references public.portfolio_technologies(id) on delete cascade,
  primary key (project_id, technology_id)
);

create table if not exists public.portfolio_media (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.portfolio_projects(id) on delete cascade,
  kind          public.portfolio_media_kind not null default 'gallery',
  storage_path  text not null,
  url           text,
  alt           text,
  caption       text,
  sort_order    integer not null default 0,
  width         integer,
  height        integer,
  created_at    timestamptz not null default now()
);

create index if not exists portfolio_projects_status_idx on public.portfolio_projects (status, featured desc, sort_order, published_at desc);
create index if not exists portfolio_projects_search_idx on public.portfolio_projects using gin (search_vector);
create index if not exists portfolio_projects_trgm_idx on public.portfolio_projects using gin (title gin_trgm_ops);
create index if not exists portfolio_categories_parent_idx on public.portfolio_categories (parent_id);
create index if not exists portfolio_project_categories_category_idx on public.portfolio_project_categories (category_id);
create index if not exists portfolio_project_tags_tag_idx on public.portfolio_project_tags (tag_id);
create index if not exists portfolio_project_technologies_technology_idx on public.portfolio_project_technologies (technology_id);
create index if not exists portfolio_media_project_idx on public.portfolio_media (project_id, kind, sort_order);

drop trigger if exists portfolio_projects_set_updated_at on public.portfolio_projects;
create trigger portfolio_projects_set_updated_at
before update on public.portfolio_projects
for each row execute function public.portfolio_set_updated_at();

-- Brouillons du back-office : document complet privé (jamais publié).
create table if not exists public.portfolio_drafts (
  id          integer primary key default 1 check (id = 1),
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- RLS activée dès le schéma ; les policies arrivent dans la migration 02.
alter table public.portfolio_projects              enable row level security;
alter table public.portfolio_categories            enable row level security;
alter table public.portfolio_tags                  enable row level security;
alter table public.portfolio_technologies          enable row level security;
alter table public.portfolio_project_categories    enable row level security;
alter table public.portfolio_project_tags          enable row level security;
alter table public.portfolio_project_technologies  enable row level security;
alter table public.portfolio_media                 enable row level security;
alter table public.portfolio_drafts                enable row level security;
