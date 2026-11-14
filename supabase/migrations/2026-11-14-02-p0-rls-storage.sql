-- ============================================================================
-- P0 — sécurité : policies RLS des projets et bucket Storage des médias
-- Prérequis : migration 01 (schéma) et public.is_owner() (schema-complete /
-- migration-securite). Rejouable : chaque policy est précédée d'un drop.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Projets : lecture publique limitée aux publications ; écriture propriétaire
-- ---------------------------------------------------------------------------
drop policy if exists "projets lecture publique" on public.projects;
create policy "projets lecture publique" on public.projects for select to anon, authenticated
  using (status = 'published');

drop policy if exists "projets ecriture proprietaire" on public.projects;
create policy "projets ecriture proprietaire" on public.projects for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Taxonomies : catégories activées, tags et technologies publics
-- ---------------------------------------------------------------------------
drop policy if exists "categories lecture publique" on public.categories;
create policy "categories lecture publique" on public.categories for select to anon, authenticated
  using (enabled = true);

drop policy if exists "categories ecriture proprietaire" on public.categories;
create policy "categories ecriture proprietaire" on public.categories for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "tags lecture publique" on public.tags;
create policy "tags lecture publique" on public.tags for select to anon, authenticated
  using (true);

drop policy if exists "tags ecriture proprietaire" on public.tags;
create policy "tags ecriture proprietaire" on public.tags for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "technologies lecture publique" on public.technologies;
create policy "technologies lecture publique" on public.technologies for select to anon, authenticated
  using (true);

drop policy if exists "technologies ecriture proprietaire" on public.technologies;
create policy "technologies ecriture proprietaire" on public.technologies for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Relations et médias : visibles uniquement si le projet est publié
-- ---------------------------------------------------------------------------
drop policy if exists "relations lecture publique" on public.project_categories;
create policy "relations lecture publique" on public.project_categories for select to anon, authenticated
  using (exists (
    select 1 from public.projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "relations ecriture proprietaire" on public.project_categories;
create policy "relations ecriture proprietaire" on public.project_categories for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "relations lecture publique" on public.project_tags;
create policy "relations lecture publique" on public.project_tags for select to anon, authenticated
  using (exists (
    select 1 from public.projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "relations ecriture proprietaire" on public.project_tags;
create policy "relations ecriture proprietaire" on public.project_tags for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "relations lecture publique" on public.project_technologies;
create policy "relations lecture publique" on public.project_technologies for select to anon, authenticated
  using (exists (
    select 1 from public.projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "relations ecriture proprietaire" on public.project_technologies;
create policy "relations ecriture proprietaire" on public.project_technologies for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

drop policy if exists "medias lecture publique" on public.project_media;
create policy "medias lecture publique" on public.project_media for select to anon, authenticated
  using (exists (
    select 1 from public.projects p where p.id = project_id and p.status = 'published'
  ));

drop policy if exists "medias ecriture proprietaire" on public.project_media;
create policy "medias ecriture proprietaire" on public.project_media for all to authenticated
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
