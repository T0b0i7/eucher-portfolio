-- ============================================================================
-- P6 — catalogue GitHub universel (indépendant des projets publiés)
-- Rejouable. RLS propriétaire uniquement : aucune lecture publique.
-- ============================================================================

create table if not exists public.portfolio_github_catalog (
  id bigint primary key,
  full_name text not null unique,
  name text not null,
  owner_login text,
  description text,
  private boolean not null default false,
  archived boolean not null default false,
  fork boolean not null default false,
  disabled boolean not null default false,
  language text,
  topics text[] not null default '{}',
  default_branch text,
  html_url text,
  homepage text,
  stargazers_count int default 0,
  forks_count int default 0,
  open_issues_count int default 0,
  github_created_at timestamptz,
  github_updated_at timestamptz,
  pushed_at timestamptz,
  readme text,
  languages jsonb not null default '{}'::jsonb,
  branches jsonb not null default '[]'::jsonb,
  releases jsonb not null default '[]'::jsonb,
  published_project_id uuid references public.portfolio_projects(id) on delete set null,
  sync_status text not null default 'synced',
  sync_error text,
  synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_github_catalog_visibility_idx
  on public.portfolio_github_catalog (private, archived, sync_status);
create index if not exists portfolio_github_catalog_language_idx
  on public.portfolio_github_catalog (language);
create index if not exists portfolio_github_catalog_pushed_idx
  on public.portfolio_github_catalog (pushed_at desc nulls last);

alter table public.portfolio_github_catalog enable row level security;

drop policy if exists github_catalog_owner_all on public.portfolio_github_catalog;
create policy github_catalog_owner_all on public.portfolio_github_catalog
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());

-- Journal des actions de l'agent JARVIS (P8, socle posé ici).
create table if not exists public.portfolio_agent_actions (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid,
  tool text not null,
  input jsonb,
  output jsonb,
  status text not null default 'pending',
  requires_confirmation boolean not null default false,
  confirmed_at timestamptz,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.portfolio_agent_actions enable row level security;
drop policy if exists agent_actions_owner_all on public.portfolio_agent_actions;
create policy agent_actions_owner_all on public.portfolio_agent_actions
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());
