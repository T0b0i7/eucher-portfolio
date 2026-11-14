# Migration P1 — recherche publique des projets

> Prérequis : P0 appliqué (`docs/MIGRATION-P0.md`), tables `portfolio_*` présentes et peuplées.
> À exécuter dans **Supabase → SQL Editor**. Aucun secret n'est nécessaire.

## Ce que fait cette migration

Crée la fonction RPC `public.search_portfolio_projects(...)` utilisée par la galerie (`assets/js/gallery.js` via `EA_API.searchProjects`) pour :

- rechercher dans le titre, la description, les tags et les technologies ;
- filtrer par catégories, technologies et tags (listes de slugs) ;
- trier (`recent`, `updated`, `alpha`, `oldest`, `featured`) ;
- paginer (`p_limit` borné à 48, `p_offset` ≥ 0) ;
- ne renvoyer que les projets `published` (la fonction est `security invoker`, la RLS P0 s'applique).

La galerie fonctionne **sans** cette migration (mode simple : filtres + titre/description + bandeau « Recherche simple »).

## Application

1. Sauvegarde rapide : `select proname from pg_proc where proname='search_portfolio_projects';` (attendu : 0 ligne avant).
2. Coller **tout** `supabase/migrations/2026-11-14-04-p1-search.sql` dans le SQL Editor, puis Run.
3. Vérifications :

```sql
-- V1. Fonction présente
select proname, prosecdef from pg_proc where proname='search_portfolio_projects';

-- V2. Résultat global
select public.search_portfolio_projects(null,null,null,null,'recent',12,0) -> 'total' as total;
-- attendu : 8

-- V3. Filtre catégorie (adapter le slug au besoin)
select public.search_portfolio_projects(null, array['ia'], null, null, 'recent', 12, 0) -> 'total' as total;
-- attendu : 1

-- V4. Recherche multi-entités (technologie)
select public.search_portfolio_projects('react', null, null, null, 'recent', 12, 0) -> 'total' as total;
-- attendu : > 0
```

4. Test REST (clé anon) :

```bash
curl -s "https://pwpfoqgiltdgdlaazdjc.supabase.co/rest/v1/rpc/search_portfolio_projects" \
  -H "apikey: <CLE_PUBLISHABLE>" -H "Content-Type: application/json" \
  -d '{"p_limit":12,"p_offset":0,"p_sort":"recent"}'
```

## Rollback

```sql
drop function if exists public.search_portfolio_projects(text, text[], text[], text[], text, integer, integer);
```

Le front retombe automatiquement sur `listProjects` (mode simple) : aucune autre action.

## Vérification côté site

1. Ouvrir `projects.html` : le bandeau « Recherche simple » disparaît.
2. Rechercher une technologie (`react`) : les projets correspondants remontent.
3. Filtrer par catégorie, changer le tri, recharger l'URL : la vue est identique.
4. « Charger plus » ajoute des cartes sans doublon.
