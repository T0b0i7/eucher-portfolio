-- ============================================================================
-- P3 — synchronisation GitHub : dépôts, commits, classification
-- Rejouable. Owner-only en écriture ; lecture publique limitée aux projets publiés.
-- ============================================================================

create table if not exists public.portfolio_github_repositories (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.portfolio_projects(id) on delete cascade,
  full_name text not null,
  default_branch text default 'main',
  html_url text,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_github_commits (
  id uuid primary key default gen_random_uuid(),
  repository_id uuid not null references public.portfolio_github_repositories(id) on delete cascade,
  sha text not null,
  message text not null,
  author_name text,
  author_login text,
  committed_at timestamptz,
  html_url text,
  category text not null default 'other',
  additions int default 0,
  deletions int default 0,
  files_changed int default 0,
  created_at timestamptz not null default now(),
  unique (repository_id, sha)
);

create index if not exists portfolio_github_commits_repo_idx on public.portfolio_github_commits (repository_id, committed_at desc);

create or replace function public.portfolio_classify_commit(p_message text)
returns text
language sql
immutable
as $$
  select case
    when p_message is null or btrim(p_message) = '' then 'other'
    when lower(p_message) ~ '^(revert|rollback)' then 'revert'
    when lower(p_message) ~ '^(feat|feature|add|ajout|nouveau)' or lower(p_message) ~ '^[a-z]+\([^)]*\)!?: feat' then 'feat'
    when lower(p_message) ~ '^(fix|bugfix|hotfix|corrige|correction)' then 'fix'
    when lower(p_message) ~ '^(refactor|refacto|renomme|rename)' then 'refactor'
    when lower(p_message) ~ '^(docs?|doc|documentation)' then 'docs'
    when lower(p_message) ~ '^(perf|performance|optim)' then 'perf'
    when lower(p_message) ~ '^(test|tests|testing)' then 'test'
    when lower(p_message) ~ '^(ci|build|chore|deps|bump|release)' then 'chore'
    when lower(p_message) ~ '^(style|format|lint)' then 'style'
    when lower(p_message) ~ '^(improve|improvement|amelior|amélior|enhance)' then 'improvement'
    else 'other'
  end;
$$;

alter table public.portfolio_github_repositories enable row level security;
alter table public.portfolio_github_commits enable row level security;

drop policy if exists github_repos_public_read on public.portfolio_github_repositories;
create policy github_repos_public_read on public.portfolio_github_repositories
  for select using (
    exists (
      select 1 from public.portfolio_projects p
      where p.id = portfolio_github_repositories.project_id and p.status = 'published'
    )
  );

drop policy if exists github_repos_owner_write on public.portfolio_github_repositories;
create policy github_repos_owner_write on public.portfolio_github_repositories
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());

drop policy if exists github_commits_public_read on public.portfolio_github_commits;
create policy github_commits_public_read on public.portfolio_github_commits
  for select using (
    exists (
      select 1
      from public.portfolio_github_repositories r
      join public.portfolio_projects p on p.id = r.project_id
      where r.id = portfolio_github_commits.repository_id and p.status = 'published'
    )
  );

drop policy if exists github_commits_owner_write on public.portfolio_github_commits;
create policy github_commits_owner_write on public.portfolio_github_commits
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());

-- Catégories de commits par dépôt (vue publique agrégée)
create or replace view public.portfolio_github_commit_stats as
select r.project_id, r.full_name, c.category, count(*)::int as commits
from public.portfolio_github_repositories r
join public.portfolio_github_commits c on c.repository_id = r.id
group by r.project_id, r.full_name, c.category;
