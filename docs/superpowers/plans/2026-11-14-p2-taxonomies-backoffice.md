# P2 — Taxonomies et back-office Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Donner au portfolio une taxonomie professionnelle à trois niveaux (familles, sous-catégories, tags) gérée dynamiquement, et l'exposer proprement dans la galerie publique — sans mélanger catégories et technologies.

**Architecture:** P2a étend le modèle existant (`portfolio_categories.parent_id`, `featured`) et seed 40 catégories + sous-catégories + tags depuis `assets/data/taxonomy.json`. La projection et l'API apprennent les catégories multiples (`cats[]`) et les tags. La galerie affiche **12 familles mises en avant** + sous-catégorie contextuelle. P2b construit les écrans d'administration (CRUD taxonomies, éditeur projet multi-catégories/tags, médias, dates/statuts/ordre, aperçu). P2c bascule les écritures en tables et retire le document JSON.

**Tech Stack:** PostgreSQL/Supabase, PostgREST + RPC, HTML/CSS/JS natifs, Node pour générateurs, jsdom pour tests.

**Spec:** docs/superpowers/specs/2026-11-14-plateforme-evolution-design.md

## Global Constraints

- Ne pas mélanger catégories (domaines) et technologies (outils/frameworks) : deux tables et deux liaisons distinctes.
- Les 40 catégories restent le référentiel interne ; seules les 12 familles `featured` apparaissent dans la navigation publique.
- Sous-catégories = catégories avec `parent_id` (profondeur 2 maximum), nombre illimité, création dynamique.
- Un projet peut avoir plusieurs catégories/sous-catégories et plusieurs tags.
- Aucune régression P0/P1 ; repli catalogue maintenu ; brouillons jamais publics.
- Migrations SQL idempotentes et rollback documenté ; application via runbook.
- Tests locaux sans base : `npm test` + `node scripts/check-sql.mjs`.

## Review Focus

- **Familles publiques** : seules les 12 catégories `featured` racines doivent apparaître dans le filtre principal ; les 40 restent accessibles en admin.
- **Filtre parent** : sélectionner « Web Development » doit inclure les projets classés dans ses sous-catégories (expansion parent → enfants).
- **Cohabitation** : un même projet peut être Web + FinTech + SaaS sans doublon dans les résultats.
- **Projection** : une sauvegarde admin ne doit pas effacer les catégories multiples/tags (lecture de `cats[]`/`tags[]` avec repli sur `cat`).
- **Intégrité** : aucune sous-catégorie orpheline, aucun tag dupliqué, slugs stables.

---

## P2a — Modèle, données et galerie (en cours)

### Task 1: Migration 05 — colonnes et contraintes taxonomie
**Files:** `supabase/migrations/2026-11-14-05-p2-taxonomy.sql`, `tests/schema.test.mjs`.
- [ ] `portfolio_categories` : `featured boolean not null default false`, `description text`, `icon text`, `color text` ; index `(featured, sort_order)` et `(parent_id)`.
- [ ] `portfolio_tags` : `description text` ; index slug.
- [ ] Contrainte : pas de profondeur > 2 (trigger ou contrainte applicative documentée).
- [ ] Test statique rouge → migration → vert ; `check-sql` OK.

### Task 2: Référentiel et générateur
**Files:** `assets/data/taxonomy.json`, `scripts/build-taxonomy.mjs`, `supabase/seed/2026-11-14-taxonomy.sql`, `tests/taxonomy.test.mjs`.
- [ ] JSON : 40 catégories (slugs explicites pour les racines), sous-catégories, 12 `featured`, ~30 tags.
- [ ] Générateur : upserts idempotents parents → enfants (parent_id), tags ; sortie SQL versionnée ; validation des slugs uniques.
- [ ] Test : 40 racines, 12 featured, ≥ 200 sous-catégories, tags, pas de doublon, génération déterministe.

### Task 3: Mapping projets → taxonomie
**Files:** `assets/data/project-taxonomy.json`, `scripts/build-taxonomy.mjs`, `supabase/migrations/2026-11-14-03-p0-projection.sql` (extension), tests.
- [ ] Mapping des 8 projets : catégories principales, sous-catégories, tags.
- [ ] Projection : lit `cats[]` / `tags[]` du document, repli sur `cat` / CSV ; crée une catégorie manquante à la volée.
- [ ] Seed : upserts des jonctions projet↔catégorie↔tag.
- [ ] Tests statiques : la projection gère les tableaux, le seed référence des slugs existants.

### Task 4: API hiérarchie et filtres
**Files:** `assets/js/api.js`, `tests/api.test.mjs`.
- [ ] `listTaxonomies` renvoie `{slug,name,name_en,id,parent_id,parent_slug,featured,sort_order}` pour catégories + tags + technologies.
- [ ] `listProjects`/`searchProjects` : expansion parent → enfants pour les catégories ; tags filtrés.
- [ ] Tests : parent renvoie les enfants ; featured uniquement côté galerie ; pas de brouillon.

### Task 5: Galerie 12 familles + sous-catégories
**Files:** `projects.html`, `assets/js/gallery.js`, `assets/css/gallery.css`, `tests/gallery.test.mjs`.
- [ ] Filtre catégorie = 12 familles featured ; filtre sous-catégorie dynamique ; tag ; URL `?cat=&sub=&tag=`.
- [ ] Tests : familles featured seulement, sous-catégorie filtrée, URL restaurée, réinitialisation.

### Task 6: Application et recette
- [ ] Appliquer migration 05 + seed taxonomie en base (token Management API, hors dépôt).
- [ ] Vérifier : 40 catégories, 12 featured, jonctions projets, RPC, galerie live (familles, sous-cat, recherche).
- [ ] Captures 390/1440, console propre ; mise à jour README/ARCHITECTURE/MIGRATION-P1 (ou P2).
- [ ] Commit.

## P2b — Back-office taxonomies et projets (plan suivant)

- Écrans Catégories (arborescence, featured, activation, ordre, icône/couleur), Tags, Technologies.
- Éditeur projet : multi-catégories/sous-catégories (cases), tags, dates, statuts (brouillon/publié/archivé), featured, ordre, galerie médias (Storage), liens et visibilités.
- Aperçu avant publication (`?preview=1` authentifié), journal d'activité.
- Suppression progressive des migrations localStorage et du document JSON ; conservation d'un export.

## P2c — Écritures en tables (plan suivant)

- API d'écriture par entité (RLS propriétaire), validation serveur, conflits `updated_at`.
- Dépréciation du document `portfolio` et du trigger de projection.
- Audit serveur (`activity`), rôles owner/editor, sauvegardes.

## Hors périmètre P2

GitHub (P3), apparence/motion (P4), cache/CDN et tests E2E (P5).
