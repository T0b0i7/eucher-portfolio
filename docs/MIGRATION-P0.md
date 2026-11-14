# Migration P0 — socle de données et API

> Runbook à exécuter par le propriétaire. Les migrations SQL s'appliquent dans **Supabase → SQL Editor** (ou `psql`).
> Aucun secret ne doit être copié dans le dépôt. Ordre à respecter.

## Ce que fait P0

- Crée les tables éditoriales (`projects`, `categories`, `tags`, `technologies`, jonctions, `project_media`), les enums, les slugs, les index et la RLS.
- Crée le bucket Storage `media` (lecture publique, écriture propriétaire).
- Ajoute un trigger dédié `trg_sync_project_tables` qui projette **le document `portfolio` actuel** vers ces tables. Le back-office continue d'écrire le document ; la projection suit automatiquement.
- Le site public lit désormais ces tables via `assets/js/api.js`, avec repli sur `catalog.js` et le cache local.
- `project.html` charge la même API avec repli catalogue.

## 1. Sauvegarde obligatoire

Dans Supabase → SQL Editor :

```sql
-- Export du document avant toute modification
select data from public.portfolio where id = 1;
```

Copier le JSON obtenu dans un fichier local daté. Faire également une sauvegarde de la base (Dashboard → Database → Backups) ou `pg_dump`.

## 2. Ordre d'application

1. `supabase/migrations/2026-11-14-01-p0-schema.sql`
2. `supabase/migrations/2026-11-14-02-p0-rls-storage.sql`
3. `supabase/migrations/2026-11-14-03-p0-projection.sql`
4. `supabase/seed/2026-11-14-projects.sql` (généré par `node scripts/build-seed.mjs`)

Chaque fichier est idempotent (rejouable) sauf le seed qui fait des upserts. Si un fichier échoue, **ne pas continuer** : lire l'erreur, corriger, restaures la sauvegarde si nécessaire.

## 3. Vérifications (V1–V10)

```sql
-- V1. Les tables existent (attendu : 8 lignes)
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('projects','categories','tags','technologies',
                     'project_categories','project_tags','project_technologies','project_media');

-- V2. Tous les projets sont là (attendu : 8)
select count(*) from public.projects;

-- V3. Slugs attendus (attendu : 8 lignes)
select slug from public.projects order by slug;

-- V4. Statuts (attendu : 8 published, 0 draft/archived)
select status, count(*) from public.projects group by status;

-- V5. Relations (attendu : 8 catégories liées, > 20 technologies liées)
select count(*) from public.project_categories;
select count(*) from public.project_technologies;

-- V6. Aucune policy anon ne laisse voir un brouillon (attendu : 0 ligne)
select policyname, roles, qual from pg_policies
where schemaname = 'public' and tablename = 'projects' and cmd = 'SELECT';

-- V7. Les deux triggers existent (legacy + projection)
select tgname from pg_trigger where tgname in ('trg_sync_portfolio','trg_sync_project_tables');

-- V8. Le seed correspond au catalogue
select count(*) from public.projects where legacy_id is not null; -- 8
select count(*) from public.categories;                          -- 3
select count(*) from public.technologies;                        -- 16

-- V9. Test de lecture publique (à exécuter avec la clé anon via l'API)
-- GET /rest/v1/projects?select=slug,title&status=eq.published
-- attendu : 8 projets, aucun brouillon

-- V10. Test de non-fuite du document : le document public ne contient ni msgs ni tel
select data ? 'msgs' as msgs, data -> 'profile' ? 'tel' as tel
from public.portfolio where id = 1; -- false / false
```

## 4. Recette fonctionnelle

1. Ouvrir le site (local ou déployé) : le carrousel affiche les 8 projets, la console indique `dataSource = "api"` (`document.body.dataset.dataSource`).
2. Si Supabase est indisponible : 8 projets catalogue, `dataSource = "catalog"`, avertissement console.
3. Ouvrir une fiche (`project.html?project=akoue-app`) : rendu Atlas complet.
4. Admin : modifier un projet (description), publier, puis recharger le site public : la modification apparaît (document → trigger → tables → API).
5. Tester un slug inconnu : page « Projet introuvable ».
6. Vérifier qu'un brouillon n'est jamais visible publiquement (admin → repasser un projet en Brouillon → il disparaît du site après synchronisation).

## 5. Rollback

1. Retirer la projection et le trigger :

```sql
drop trigger if exists trg_sync_project_tables on public.portfolio;
drop function if exists public.sync_project_tables();
```

2. (Optionnel) Supprimer les tables P0 (aucune donnée éditoriale unique n'y est stockée : elles sont projetées depuis le document) :

```sql
drop table if exists public.project_media, public.project_technologies, public.project_tags,
  public.project_categories, public.technologies, public.tags, public.categories, public.projects;
drop type if exists public.media_kind;
drop type if exists public.project_status;
drop function if exists public.slugify(text);
drop function if exists public.set_updated_at();
```

3. Restaurer le document depuis la sauvegarde si nécessaire (`update public.portfolio set data = '…'::jsonb where id = 1;`).
4. Le site continue de fonctionner avec `catalog.js` et le document : aucune dépendance dure au nouveau schéma.

## 6. Limites connues de P0

- **Images** : les couvertures restent dans le document (base64) ; seuls les visuels générés servent de repli. Le Storage et les vraies galeries arrivent en P2.
- **Recherche** : titre et description uniquement via PostgREST ; la recherche par tags/technologies et les filtres combinés complets arrivent en P1/P2.
- **Écritures** : toujours via le document JSON ; la bascule des écritures vers les tables est P2.
- **Aperçu avant publication** : pas encore (P2).
- Le trigger legacy `sync_portfolio_tables` est conservé pour les autres entités ; il ne touche pas aux tables P0.
