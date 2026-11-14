# P1 — Galerie publique Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Offrir une galerie publique complète des projets (grille, filtres combinables, recherche, tri, chargement progressif) alimentée par l'API P0, sans surcharger l'accueil.

**Architecture:** Nouvelle page autonome `projects.html` + module `assets/js/gallery.js` (ES5, sans build). Elle interroge l'API P0 via `searchProjects` (fonction RPC `search_portfolio_projects` pour la recherche multi-entités) et retombe sur `listProjects` puis sur `catalog.js` si la base n'est pas encore migrée. L'accueil conserve le carrousel et ajoute un lien vers la galerie.

**Tech Stack:** HTML/CSS/JS natifs, Supabase PostgREST + RPC SQL, jsdom pour les tests, Chrome headless pour la validation visuelle.

**Spec:** docs/superpowers/specs/2026-11-14-plateforme-evolution-design.md

## Global Constraints

- Aucune régression : l'accueil, les fiches projet, l'admin, l'i18n et le responsive existants restent inchangés.
- Site statique sans build, ES5, globales ; aucun secret dans le navigateur.
- Un brouillon ou un archivé ne doit jamais apparaître dans la galerie.
- La galerie doit rester utilisable si la migration 04 n'est pas appliquée (repli `listProjects`) et si Supabase est indisponible (repli `catalog.js` filtré côté client).
- Filtres dans l'URL (partage de lien), combinables : catégorie, technologie, tag, recherche, tri.
- Chargement progressif (bouton « Charger plus »), jamais tous les projets d'un coup.
- Mobile d'abord : filtres utilisables au pouce (cibles ≥ 44 px), grille 1/2/3/4 colonnes.
- Tests exécutables via `npm test`, sans base ni réseau.

## Review Focus

- **Fuite de brouillons** : la galerie ne doit jamais afficher un `draft`/`archived`, même si l'API en renvoie — filtre client en défense + RLS serveur.
- **État des filtres** : recharger une URL filtrée doit reproduire exactement la même vue ; « Charger plus » ne doit pas dupliquer de cartes.
- **Repli dégradé** : sans RPC (migration 04 non appliquée) la recherche par technologie/tag doit rester possible côté client ou être signalée, sans page blanche.
- **Compteur total** : le nombre affiché doit correspondre au total filtré, pas au nombre chargé.
- **Filtres vides** : une combinaison sans résultat affiche un état vide explicite (pas une grille vide silencieuse).

---

## Task 1: API de recherche + repli

**Files:** Modify `assets/js/api.js`, `tests/api.test.mjs`.

**Interfaces:**
- `EA_API.searchProjects({ q, categories, technologies, tags, sort, page, perPage }) -> Promise<{items,total,hasMore,source,degraded}>`
- Utilise `POST /rest/v1/rpc/search_portfolio_projects` ; en cas d'échec (404/400), appelle `listProjects` et renvoie `degraded: true`.

- [ ] **Step 1:** test rouge : la recherche appelle la RPC avec les bons paramètres ; une RPC indisponible bascule sur `listProjects` avec `degraded:true` ; les brouillons ne dépassent jamais.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** implémenter `searchProjects` (POST JSON, mapping des items, filtre `published`).
- [ ] **Step 4:** `npm test` → PASS.

## Task 2: Migration SQL de recherche (optionnelle pour le front)

**Files:** Create `supabase/migrations/2026-11-14-04-p1-search.sql`, `tests/search-sql.test.mjs`.

**Interfaces:** `public.search_portfolio_projects(p_q text, p_categories text[], p_technologies text[], p_tags text[], p_sort text, p_limit int, p_offset int) returns jsonb` → `{total, items:[…]}` avec relations (catégories, tags, technologies, médias) et filtre `status='published'`.

- [ ] **Step 1:** test statique rouge (fonction, `security invoker`, `status='published'`, recherche `search_vector` + tags + technologies, tri, limite/offset bornés).
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** écrire la migration ; documenter l'application dans `docs/MIGRATION-P1.md`.
- [ ] **Step 4:** `npm test` + `node scripts/check-sql.mjs` → PASS (aucune collision, RLS inchangée).

## Task 3: Page galerie et rendu

**Files:** Create `projects.html`, `assets/css/gallery.css`, `assets/js/gallery.js` ; modify `tests/helpers.mjs` (GALLERY_SCRIPTS).

**Interfaces:** la page charge `config.js`, `api.js`, `catalog.js`, `gallery.js` (defer) et `gallery.css`. La galerie lit `?q=&cat=&tech=&tag=&sort=`, affiche `#galleryGrid`, `#galleryCount`, `#galleryMore`, `#galleryEmpty`, les filtres `#gallerySearch`, `#galleryCategory`, `#galleryTech`, `#galleryTag`, `#gallerySort`, `#galleryReset`.

- [ ] **Step 1:** tests DOM rouges : 2 projets API → 2 cartes ; filtre catégorie → 1 carte ; recherche → requête et cartes ; état vide ; « Charger plus » ajoute la page suivante sans doublon ; URL filtrée restaurée ; API en échec → catalogue filtré.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** écrire la page (header, titre, filtres, grille, états) et le CSS responsive ; le JS rend des cartes sans `innerHTML` avec données (helper `E`/`createElement`), met à jour l'URL via `history.replaceState`, gère `degraded` (bandeau discret), et un fallback catalogue local.
- [ ] **Step 4:** `npm test` → PASS.

## Task 4: Accueil relié à la galerie

**Files:** Modify `index.html`, `assets/css/app.css`, `tests/dom.test.mjs`.

- [ ] **Step 1:** test rouge : un lien « Voir tous les projets » pointe vers `projects.html` et reste accessible (texte + href).
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** ajouter le lien sous l'en-tête des projets ; style aligné sur le site ; pas de changement du carrousel.
- [ ] **Step 4:** `npm test` → PASS.

## Task 5: Vérification finale et documentation

**Files:** Modify `README.md`, `docs/ARCHITECTURE.md`, `docs/MIGRATION-P1.md` ; create `tests/gallery.test.mjs` (consolidation).

- [ ] **Step 1:** `npm test` (suite complète), `node scripts/check-sql.mjs`, `node --check` sur les nouveaux JS.
- [ ] **Step 2:** test navigateur (serveur local + Chrome headless) : `projects.html` affiche 8 cartes, filtres opérationnels, URL rechargée identique, mobile 390 px sans débordement, console sans erreur applicative ; capture.
- [ ] **Step 3:** documenter la page, les filtres, le repli et l'application de la migration 04.
- [ ] **Step 4:** commit `feat(galerie): page publique de tous les projets avec filtres, recherche et pagination`.

## Hors périmètre P1

- Back-office des taxonomies (P2), GitHub (P3), apparence/motion (P4), pagination par URL page (on utilise « Charger plus »), recherche floue avancée.
