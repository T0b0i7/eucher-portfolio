-- ============================================================================
-- P0 — sécurité : policies RLS des projets et bucket Storage des médias
-- Prérequis : migration 01 (schéma) et public.is_owner() (schema-complete /
-- migration-securite). Rejouable : chaque policy est précédée d'un drop.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Projets : lecture publique limitée aux publications ; écriture propriétaire
-- ---------------------------------------------------------------------------
drop policy if exists "projets lecture publique" on public.portfolio_projects;
create policy "projets lecture publique" on public.portfolio_projects for select to anon, authenticated
  using (status = 'published');

drop policy if exists "projets ecriture proprietaire" on public.portfolio_projects;
create policy "projets ecriture proprietaire" on public.portfolio_projects for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Taxonomies : catégories activées, portfolio_tags et portfolio_technologies publics
-- ---------------------------------------------------------------------------
drop policy if exists "portfolio_categories lecture publique" on public.portfolio_categories;
create policy "portfolio_categories lecture publique" on public.portfolio_categories for select to anon, authenticated
  using (enabled = true);

drop policy if exists "portfolio_categories ecriture proprietaire" on public.portfolio_categories;
create policy "portfolio_categories ecriture proprietaire" on public.portfolio_categories for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "portfolio_tags lecture publique" on public.portfolio_tags;
create policy "portfolio_tags lecture publique" on public.portfolio_tags for select to anon, authenticated
  using (true);

drop policy if exists "portfolio_tags ecriture proprietaire" on public.portfolio_tags;
create policy "portfolio_tags ecriture proprietaire" on public.portfolio_tags for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "portfolio_technologies lecture publique" on public.portfolio_technologies;
create policy "portfolio_technologies lecture publique" on public.portfolio_technologies for select to anon, authenticated
  using (true);

drop policy if exists "portfolio_technologies ecriture proprietaire" on public.portfolio_technologies;
create policy "portfolio_technologies ecriture proprietaire" on public.portfolio_technologies for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Relations et médias : visibles uniquement si le projet est publié
-- ---------------------------------------------------------------------------
drop policy if exists "relations lecture publique" on public.portfolio_project_categories;
create policy "relations lecture publique" on public.portfolio_project_categories for select to anon, authenticated
  using (exists (
    select 1 from public.portfolio_projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "relations ecriture proprietaire" on public.portfolio_project_categories;
create policy "relations ecriture proprietaire" on public.portfolio_project_categories for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "relations lecture publique" on public.portfolio_project_tags;
create policy "relations lecture publique" on public.portfolio_project_tags for select to anon, authenticated
  using (exists (
    select 1 from public.portfolio_projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "relations ecriture proprietaire" on public.portfolio_project_tags;
create policy "relations ecriture proprietaire" on public.portfolio_project_tags for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "relations lecture publique" on public.portfolio_project_technologies;
create policy "relations lecture publique" on public.portfolio_project_technologies for select to anon, authenticated
  using (exists (
    select 1 from public.portfolio_projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "relations ecriture proprietaire" on public.portfolio_project_technologies;
create policy "relations ecriture proprietaire" on public.portfolio_project_technologies for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "medias lecture publique" on public.portfolio_media;
create policy "medias lecture publique" on public.portfolio_media for select to anon, authenticated
  using (exists (
    select 1 from public.portfolio_projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "medias ecriture proprietaire" on public.portfolio_media;
create policy "medias ecriture proprietaire" on public.portfolio_media for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Brouillons : document complet privé, jamais lisible par anon
-- ---------------------------------------------------------------------------
drop policy if exists "brouillons proprietaire" on public.portfolio_drafts;
create policy "brouillons proprietaire" on public.portfolio_drafts for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Storage : bucket média public en lecture, écriture réservée au propriétaire
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media lecture publique" on storage.objects;
create policy "media lecture publique" on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "media ecriture proprietaire" on storage.objects;
create policy "media ecriture proprietaire" on storage.objects for all to authenticated
  using (bucket_id = 'media' and public.is_owner())
  with check (bucket_id = 'media' and public.is_owner());
