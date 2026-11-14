-- ============================================================================
-- P0 — socle de données : schéma éditorial
-- Migration rejouable. À appliquer dans Supabase → SQL Editor, ou via psql.
-- Ordre : 01 (ce fichier) → 02 (RLS/Storage) → 03 (projection) → seed.
-- ============================================================================

create extension if not exists unaccent;
create extension if not exists pg_trgm;

do $$ begin
  create type public.project_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.media_kind as enum ('cover', 'gallery');
exception when duplicate_object then null; end $$;

-- Slug stable : minuscules, accents retirés, séparateurs normalisés.
create or replace function public.slugify(value text)
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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  legacy_id       integer unique,
  slug            text not null unique,
  title           text not null,
  short_desc      text,
  long_desc       text,
  status          public.project_status not null default 'draft',
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

create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  name_en     text,
  parent_id   uuid references public.categories(id) on delete set null,
  enabled     boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.tags (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  name_en     text,
  created_at  timestamptz not null default now()
);

create table if not exists public.technologies (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  icon        text,
  color       text,
  created_at  timestamptz not null default now()
);

create table if not exists public.project_categories (
  project_id  uuid not null references public.projects(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (project_id, category_id)
);

create table if not exists public.project_tags (
  project_id uuid not null references public.projects(id) on delete cascade,
  tag_id     uuid not null references public.tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

create table if not exists public.project_technologies (
  project_id     uuid not null references public.projects(id) on delete cascade,
  technology_id  uuid not null references public.technologies(id) on delete cascade,
  primary key (project_id, technology_id)
);

create table if not exists public.project_media (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects(id) on delete cascade,
  kind          public.media_kind not null default 'gallery',
  storage_path  text not null,
  url           text,
  alt           text,
  caption       text,
  sort_order    integer not null default 0,
  width         integer,
  height        integer,
  created_at    timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status, featured desc, sort_order, published_at desc);
create index if not exists projects_search_idx on public.projects using gin (search_vector);
create index if not exists projects_trgm_idx on public.projects using gin (title gin_trgm_ops);
create index if not exists categories_parent_idx on public.categories (parent_id);
create index if not exists project_categories_category_idx on public.project_categories (category_id);
create index if not exists project_tags_tag_idx on public.project_tags (tag_id);
create index if not exists project_technologies_technology_idx on public.project_technologies (technology_id);
create index if not exists project_media_project_idx on public.project_media (project_id, kind, sort_order);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- RLS activée dès le schéma ; les policies arrivent dans la migration 02.
alter table public.projects              enable row level security;
alter table public.categories            enable row level security;
alter table public.tags                  enable row level security;
alter table public.technologies          enable row level security;
alter table public.project_categories    enable row level security;
alter table public.project_tags          enable row level security;
alter table public.project_technologies  enable row level security;
alter table public.project_media         enable row level security;
