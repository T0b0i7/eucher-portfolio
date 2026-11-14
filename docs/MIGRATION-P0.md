# Migration P0 — socle de données et API

> Runbook à exécuter par le propriétaire. Les migrations SQL s'appliquent dans **Supabase → SQL Editor** (ou `psql`).
> Aucun secret ne doit être copié dans le dépôt. Ordre à respecter.

## Ce que fait P0

- Crée les tables éditoriales (`portfolio_projects`, `portfolio_categories`, `portfolio_tags`, `portfolio_technologies`, jonctions, `portfolio_media`), les enums, les slugs, les index et la RLS.
- Crée le bucket Storage `media` (lecture publique, écriture propriétaire).
- Ajoute un trigger dédié `trg_sync_portfolio_projects` qui projette **le document `portfolio` actuel** vers ces tables. Le back-office continue d'écrire le document ; la projection suit automatiquement.
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

Chaque fichier est rejouable (idempotent). Si un fichier échoue, **ne pas continuer** : lire l'erreur, corriger, restaurer la sauvegarde si nécessaire. Les nouvelles tables sont préfixées `portfolio_*` pour ne pas entrer en collision avec les tables legacy de `schema-complete.sql` (dont `public.projects`) ; le document JSON reste la source d'écriture pendant P0.

## 3. Vérifications (V1–V11)

```sql
-- V1. Les tables P0 existent (attendu : 9 lignes)
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('portfolio_projects','portfolio_categories','portfolio_tags','portfolio_technologies',
                     'portfolio_project_categories','portfolio_project_tags','portfolio_project_technologies',
                     'portfolio_media','portfolio_drafts');

-- V2. Tous les projets sont là (attendu : 8)
select count(*) from public.portfolio_projects;

-- V3. Slugs attendus (attendu : 8 lignes)
select slug from public.portfolio_projects order by slug;

-- V4. Statuts (attendu : 8 published, 0 draft/archived)
select status, count(*) from public.portfolio_projects group by status;

-- V5. Relations (attendu : 8 catégories liées, > 20 technologies liées)
select count(*) from public.portfolio_project_categories;
select count(*) from public.portfolio_project_technologies;

-- V6. Aucune policy anon ne laisse voir un brouillon (attendu : 0 ligne)
select policyname, roles, qual from pg_policies
where schemaname = 'public' and tablename = 'portfolio_projects' and cmd = 'SELECT';

-- V7. Les deux triggers existent (legacy + projection)
select tgname from pg_trigger where tgname in ('trg_sync_portfolio','trg_sync_portfolio_projects');

-- V8. Le seed correspond au catalogue
select count(*) from public.portfolio_projects where legacy_id is not null; -- 8
select count(*) from public.portfolio_categories;                          -- 3
select count(*) from public.portfolio_technologies;                        -- 16

-- V9. Test de lecture publique (à exécuter avec la clé anon via l'API)
-- GET /rest/v1/portfolio_projects?select=slug,title&status=eq.published
-- attendu : 8 projets, aucun brouillon

-- V10. Test de non-fuite du document public (attendu : false / false / 0)
select data ? 'msgs' as msgs,
       data -> 'profile' ? 'tel' as tel,
       (select count(*) from jsonb_array_elements(coalesce(data->'projects', '[]'::jsonb)) p
        where coalesce(p->>'st', '') <> 'Publié') as brouillons_publics
from public.portfolio where id = 1;

-- V11. Les brouillons sont privés (attendu : policy propriétaire, aucun rôle anon)
select policyname, roles from pg_policies
where schemaname = 'public' and tablename = 'portfolio_drafts';

-- V0 (avant migration). Vérifier qu'aucune collision n'existe :
select column_name from information_schema.columns
where table_schema = 'public' and table_name = 'projects'; -- table legacy, non modifiée par P0
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
drop trigger if exists trg_sync_portfolio_projects on public.portfolio;
drop function if exists public.sync_portfolio_projects();
```

2. (Optionnel) Supprimer les tables P0 (aucune donnée éditoriale unique n'y est stockée : elles sont projetées depuis le document) :

```sql
drop table if exists public.portfolio_media, public.portfolio_project_technologies, public.portfolio_project_tags,
  public.portfolio_project_categories, public.portfolio_technologies, public.portfolio_tags, public.portfolio_categories, public.portfolio_projects;
drop type if exists public.portfolio_media_kind;
drop type if exists public.portfolio_project_status;
drop function if exists public.portfolio_slugify(text);
drop function if exists public.portfolio_set_updated_at();
```

3. Restaurer le document depuis la sauvegarde si nécessaire (`update public.portfolio set data = '…'::jsonb where id = 1;`).
4. Le site continue de fonctionner avec `catalog.js` et le document : aucune dépendance dure au nouveau schéma.

## 6. Limites connues de P0

- **Images** : les couvertures restent dans le document (base64) ; seuls les visuels générés servent de repli. Le Storage et les vraies galeries arrivent en P2.
- **Recherche** : titre et description uniquement via PostgREST ; la recherche par tags/technologies et les filtres combinés complets arrivent en P1/P2.
- **Écritures** : toujours via le document JSON ; la bascule des écritures vers les tables est P2.
- **Aperçu avant publication** : pas encore (P2).
- Le trigger legacy `sync_portfolio_tables` est conservé pour les autres entités ; il ne touche pas aux tables P0.
