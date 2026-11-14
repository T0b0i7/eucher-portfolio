# Migration P2a — taxonomie (familles, sous-catégories, tags)

> Prérequis : P0 et P1 appliqués. À exécuter dans **Supabase → SQL Editor**, dans cet ordre.

## 1. Migration 05 — colonnes et hiérarchie

Coller `supabase/migrations/2026-11-14-05-p2-taxonomy.sql`.
Ajoute `featured`, `description`, `icon`, `color` aux catégories, `description` aux tags, les index et le garde-fou de profondeur (2 niveaux max).

## 2. Projection mise à jour (multi-catégories et tags)

Réappliquer `supabase/migrations/2026-11-14-03-p0-projection.sql` (idempotent).
La projection lit désormais `cats[]` / `cats` (CSV) et `tags[]` / `tags` (CSV) ; si ces champs sont absents, elle **préserve** les jonctions existantes et retombe sur `cat` uniquement si le projet n'a aucune catégorie.

## 3. Seed de la taxonomie

Coller `supabase/seed/2026-11-14-taxonomy.sql`.
Contenu : **40 familles**, **12 `featured`** (navigation publique), **254 sous-catégories**, **42 tags**, et le classement des 8 projets (catégories + sous-catégories + tags).

## Vérifications

```sql
-- V1. Familles / featured / sous-catégories / tags
select count(*) filter (where parent_id is null) as familles,
       count(*) filter (where featured)          as featured,
       count(*) filter (where parent_id is not null) as sous_categories
from public.portfolio_categories;
-- attendu : 40 / 12 / 254

select count(*) from public.portfolio_tags; -- 42

-- V2. Classement d'un projet
select p.slug, count(distinct pc.category_id) as categories, count(distinct pt.tag_id) as tags
from public.portfolio_projects p
left join public.portfolio_project_categories pc on pc.project_id = p.id
left join public.portfolio_project_tags pt on pt.project_id = p.id
group by p.slug order by p.slug;

-- V3. Filtre famille (inclut les sous-catégories côté API)
select public.search_portfolio_projects(null, array['web-development'], null, null, 'recent', 12, 0) -> 'total';
-- attendu : 7
```

## Utilisation

- Galerie : 12 familles dans le filtre principal ; la sous-catégorie apparaît après sélection d'une famille.
- Admin : champs `cats` et `tags` du formulaire projet (slugs séparés par des virgules), en attendant l'éditeur visuel P2b.
- Les 40 familles restent administrables ; seules les 12 `featured` sont publiques.

## Rollback

```sql
-- Retirer les jonctions issues de la taxonomie et les lignes non référencées
delete from public.portfolio_project_tags;
delete from public.portfolio_project_categories;
delete from public.portfolio_categories c
where not exists (select 1 from public.portfolio_project_categories pc where pc.category_id = c.id)
  and not exists (select 1 from public.portfolio_categories child where child.parent_id = c.id);
delete from public.portfolio_tags t
where not exists (select 1 from public.portfolio_project_tags pt where pt.tag_id = t.id);
```

Puis réappliquer le seed P0 pour retrouver l'ancien classement si nécessaire. La galerie retombe sur ses filtres catalogue.

## 4. P2b — back-office taxonomie

L'écran **Taxonomie** de l'admin (onglet dédié) permet de :
- créer/renommer/supprimer des familles et sous-catégories ;
- activer/désactiver une catégorie et cocher « mise en avant » (12 familles publiques) ;
- gérer les tags et les technologies ;
- les modifications sont écrites directement dans les tables (RLS propriétaire), sans passer par le document JSON.

L'éditeur projet accepte désormais des listes de slugs dans **cats** et **tags**, stockées en tableaux JSON ; la projection les convertit en jonctions.
