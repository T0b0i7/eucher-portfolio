# P0 — Socle de données et API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Passer la lecture publique des projets du document JSON unique à des tables PostgreSQL normalisées, sans aucune régression visuelle, en gardant le back-office actuel fonctionnel via une projection contrôlée.

**Architecture:** Phase « expand » de la migration validée : les nouvelles tables `projects`, `categories`, `tags`, `technologies`, `project_*` deviennent le **modèle de lecture** alimenté par une projection SQL idempotente du document `portfolio.data` (trigger réécrit). Le site public lit ces tables via PostgREST avec pagination et filtres ; `catalog.js` reste le secours. En P2, les écritures du back-office passeront directement aux tables et le document deviendra un simple cache transitoire.

**Tech Stack:** HTML/CSS/JS natifs (ES5, sans build), Supabase (PostgreSQL, PostgREST, RLS, Storage), Node.js ≥ 20 (tests, génération SQL), `jsdom` (tests DOM, dépendance de développement uniquement).

**Spec:** docs/superpowers/specs/2026-11-14-plateforme-evolution-design.md

## Global Constraints

- Aucune régression visuelle ou fonctionnelle : le carrousel, les fiches Atlas, l'admin, l'auth GitHub, l'i18n et le responsive existants doivent continuer à fonctionner.
- Pas de build pour le site en production ; les scripts navigateur restent en ES5 dans la portée globale.
- Aucun jeton GitHub ni secret service_role dans le code navigateur ou le dépôt.
- Le back-office doit continuer à publier pendant P0 : le document `portfolio.data` reste la source d'écriture, les tables sont une projection fiable et idempotente.
- Toute écriture SQL doit être idempotente et rejouable ; toute migration doit avoir une procédure de rollback documentée.
- Les brouillons et archives ne doivent jamais être exposés par l'API publique.
- Les images en base64 du document ne sont pas migrées dans les tables en P0 ; les visuels générés (`eaProjectArt`) servent de repli (décision documentée).
- Tests exécutables localement via `npm test`, sans instance Supabase (mock fetch, contrôles SQL statiques) ; les migrations sont vérifiées manuellement via la checklist du runbook.
- Le présent plan ne couvre ni la galerie publique complète, ni le back-office v2, ni GitHub : voir P1/P2/P3.

## Review Focus

- **Exposition de brouillons :** un visiteur ne doit jamais recevoir un projet `draft` ou `archived`, même par URL directe ou requête REST forgée. Testé dans Task 6 (filtre `status=published`) et Task 3 (RLS vérifiée statiquement + requête de vérification).
- **Perte de synchronisation admin → public :** après une modification dans l'admin, le projet doit apparaître à jour sur le site ; un échec de projection ne doit pas être silencieux. Couvert par Task 4 (projection) et Task 9 (checklist de vérification).
- **Écrasement par l'ancien trigger :** si l'ancien mécanisme qui reconstruit toutes les tables reste actif, il détruit les données projet ; la suppression/remplacement doit être vérifiée. Testé dans Task 4.
- **Slug dupliqué ou instable :** deux projets aux noms proches ne doivent pas produire le même slug, et renommer un projet ne doit pas casser les liens existants sans redirection. Testé dans Task 2 (contrainte unique) et Task 5 (génération déterministe).
- **Repli silencieux du catalogue :** si l'API échoue, le site affiche le catalogue de secours mais doit le signaler (indicateur/console), pas faire croire que le contenu publié est à jour. Testé dans Task 6.

---

## Task 1: Harnais de tests et socle de non-régression

**Files:**
- Create: `package.json`
- Create: `tests/helpers.mjs`
- Create: `tests/dom.test.mjs`
- Modify: `.vercelignore`
- Modify: `.gitignore` (uniquement si `coverage/` ou artefacts manquent)

**Interfaces:**
- Consumes: `index.html`, `project.html`, `assets/js/*.js` existants.
- Produces: `npm test` exécutant `node --test tests/` ; helper `loadPage(htmlPath, scriptFiles, url, opts)` renvoyant `{window, document, errors, close}`.

- [ ] **Step 1: Créer `package.json`** avec `"private": true`, `"scripts": {"test": "node --test tests/"}` et `jsdom` en `devDependencies` (dernière version 24+), aucun impact sur le site déployé.
- [ ] **Step 2: Écrire `tests/helpers.mjs`** : `loadPage(htmlPath, scriptFiles, url, { seedLocalStorage })` construit un JSDOM `runScripts: "outside-only"`, évalue les scripts inline puis les fichiers dans l'ordre, installe les stubs manquants (`matchMedia`, `IntersectionObserver`, `fetch` renvoyant 503 par défaut, `AudioContext`, `HTMLDialogElement.showModal`), collecte les erreurs JS et expose `close()`.
- [ ] **Step 3: Écrire les tests de non-régression** `tests/dom.test.mjs` : l'accueil charge `catalog.js → data.js → sections.js → remote.js → ui.js → effects.js` et affiche exactement 8 cartes projet, 8 pastilles et le titre « Akouè App » ; la fiche `project.html?project=akoue-app` affiche le titre, 4 visuels de galerie et aucune erreur JS ; un slug inconnu affiche `#projectNotFound`.
- [ ] **Step 4: Lancer les tests, vérifier qu'ils passent** : `npm install` puis `npm test`. Attendu : tous les tests PASS (baseline avant modification).
- [ ] **Step 5: Exclure les fichiers de développement du déploiement** : ajouter `tests`, `scripts`, `package.json`, `package-lock.json` à `.vercelignore` ; vérifier que `.gitignore` contient `node_modules/`.
- [ ] **Step 6: Commit** : `test: poser un harnais jsdom et la non-régression du portfolio`.

---

## Task 2: Schéma PostgreSQL — tables éditoriales, enums, index, slugs

**Files:**
- Create: `supabase/migrations/2026-11-14-01-p0-schema.sql`
- Create: `scripts/check-sql.mjs`
- Test: `tests/schema.test.mjs`

**Interfaces:**
- Consumes: rien (premier schéma).
- Produces: tables `projects`, `categories`, `tags`, `technologies`, `project_categories`, `project_tags`, `project_technologies`, `project_media` ; enums `project_status`, `media_kind` ; fonction `public.slugify(text)` ; colonne `projects.search_vector` ; contraintes et index listés ci-dessous.

- [ ] **Step 1: Écrire `tests/schema.test.mjs`** : il lit le fichier SQL et échoue s'il manque un élément (test rouge au départ). Assertions minimales :
  - les 8 tables existent (`create table if not exists ...`) ;
  - `projects` contient `id uuid`, `legacy_id integer unique`, `slug text not null unique`, `title text not null`, `short_desc text`, `long_desc text`, `status public.project_status not null default 'draft'`, `featured boolean not null default false`, `sort_order integer not null default 0`, `published_at timestamptz`, `created_at timestamptz not null default now()`, `updated_at timestamptz not null default now()`, `demo_url text`, `repo_url text`, `demo_visible boolean not null default true`, `repo_visible boolean not null default false`, `impact jsonb not null default '[]'::jsonb`, `features jsonb not null default '[]'::jsonb`, `github_repo_id` absent en P0 ;
  - les jonctions ont des clés primaires composites et des index inversés ;
  - `project_media` contient `kind public.media_kind`, `storage_path text not null`, `sort_order integer not null default 0` ;
  - `projects.search_vector` est une colonne générée (`generated always as`) ;
  - `public.slugify` et un trigger `set_updated_at` sont définis.
- [ ] **Step 2: Lancer `npm test` et vérifier l'échec** avec un message indiquant l'élément manquant (attendu : FAIL).
- [ ] **Step 3: Écrire la migration** `2026-11-14-01-p0-schema.sql` : extensions `unaccent`, `pg_trgm` ; enum `project_status ('draft','published','archived')`, `media_kind ('cover','gallery')` ; fonction `slugify` (`lower`, `unaccent`, remplacement non-alphanumérique par `-`, trim) ; tables et contraintes décrites en Step 1 ; `search_vector` générée depuis `title`, `short_desc`, `long_desc` avec `to_tsvector('french', ...)` ; index `projects_status_idx (status, featured desc, sort_order, published_at desc)`, `projects_slug_idx`, `projects_search_idx gin(search_vector)`, `projects_trgm_idx gin(title gin_trgm_ops)`, index sur chaque FK de jonction ; trigger `updated_at`.
- [ ] **Step 4: Écrire `scripts/check-sql.mjs`** : vérifie l'équilibre des `$$`, que chaque `create policy` a un `drop policy if exists` préalable, et que chaque table créée dispose de `enable row level security` (utilisé plus tard par Task 3 et la CI locale).
- [ ] **Step 5: Rejouer et vérifier** : `npm test` PASS ; `node scripts/check-sql.mjs` PASS ; relire la migration et confirmer qu'elle est rejouable (`if not exists`, `drop ... if exists`).
- [ ] **Step 6: Commit** : `feat(db): schéma projet normalisé, slugs et index de recherche`.

---

## Task 3: RLS, vues publiques et bucket Storage

**Files:**
- Create: `supabase/migrations/2026-11-14-02-p0-rls-storage.sql`
- Test: `tests/schema.test.mjs` (étendre)
- Test: `tests/rls.test.mjs`

**Interfaces:**
- Consumes: tables de Task 2, fonction `public.is_owner()` existante.
- Produces: policies publiques de lecture limitées aux projets `published` et à leurs relations ; policies d'écriture `authenticated` + `is_owner()` ; bucket `media` (public en lecture, écriture admin) ; vue `public_projects_published` (facultatif mais utilisée par l'API).

- [ ] **Step 1: Étendre `tests/schema.test.mjs`** pour exiger : `enable row level security` sur les 8 tables ; policies de lecture `projects` avec `status = 'published'` ; policy d'écriture `to authenticated` avec `public.is_owner()` ; policies Storage sur `storage.objects` pour le bucket `media` ; aucune policy `select` publique sur les jetons/secrets (inexistants en P0, test de non-régression).
- [ ] **Step 2: Lancer les tests, vérifier l'échec** (FAIL attendu).
- [ ] **Step 3: Écrire la migration RLS/Storage** : `alter table ... enable row level security` ; pour chaque table, `drop policy if exists` + `create policy` (lecture publique conditionnelle, écriture propriétaire) ; lecture publique des jonctions uniquement via `exists` sur un projet publié ; bucket `insert into storage.buckets (id,name,public) values ('media','media',true) on conflict do nothing` ; policies `storage.objects` : lecture publique du bucket, insert/update/delete réservés au propriétaire.
- [ ] **Step 4: Vérifier** : `npm test` PASS ; `node scripts/check-sql.mjs` PASS ; vérifier qu'aucune policy ne permet à `anon` de voir un `draft` (lecture du SQL).
- [ ] **Step 5: Commit** : `feat(db): RLS des projets publiés et bucket média`.

---

## Task 4: Projection idempotente depuis le document (remplacement du trigger destructif)

**Files:**
- Create: `supabase/migrations/2026-11-14-03-p0-projection.sql`
- Test: `tests/projection.test.mjs`
- Modify: `supabase/schema-complete.sql` (documenter que le trigger legacy est remplacé sur une base existante)

**Interfaces:**
- Consumes: document `public.portfolio.data` (`projects[]` avec `n,d,cat,st,t,u,preview,cover,role,sec,long,f[],impact[]`), tables de Task 2/3.
- Produces: fonction `public.sync_portfolio_tables()` remplacée, qui projette les projets et relations ; trigger `trg_sync_portfolio` conservé.

- [ ] **Step 1: Écrire `tests/projection.test.mjs`** exigeant : la migration supprime/redéfinit `public.sync_portfolio_tables()` ; la fonction contient une purge des jonctions avant réinsertion ; elle upsert `projects` par `legacy_id` avec `slug = public.slugify(coalesce(doc->>'slug', doc->>'n'))` et résolution de collision ; elle mappe `cat` vers `categories` (une catégorie par valeur), `t` (CSV) vers `technologies`, `f`/`impact` vers jsonb, `u` vers `demo_url`, `repo` vers `repo_url` ; elle supprime les projets dont `legacy_id` n'existe plus et qui n'ont pas de dépôt GitHub ; elle met à jour `published_at` seulement à la première publication et `updated_at` à chaque synchronisation.
- [ ] **Step 2: Lancer les tests, vérifier l'échec** (FAIL attendu).
- [ ] **Step 3: Écrire la migration** : `create or replace function public.sync_portfolio_tables() ... security definer set search_path = public` ; conserver la synchronisation des tables legacy existantes pour compatibilité ; projeter les nouvelles tables en transaction (delete jonctions, upsert catégories/technologies, upsert projets, réinsertion des liaisons) ; ne jamais publier un projet dont `st` n'est pas « Publié » (mapping vers `published`, sinon `draft`/`archived`).
- [ ] **Step 4: Vérifier** : `npm test` PASS ; `node scripts/check-sql.mjs` PASS ; vérifier qu'aucun `delete from public.projects` inconditionnel n'existe.
- [ ] **Step 5: Commit** : `feat(db): projection idempotente du document vers les tables projets`.

---

## Task 5: Générateur de seed depuis le catalogue

**Files:**
- Create: `scripts/build-seed.mjs`
- Create: `tests/seed.test.mjs`
- Create: `supabase/seed/2026-11-14-projects.sql` (généré, versionné)

**Interfaces:**
- Consumes: `assets/js/catalog.js` (`window.EA_PROJECTS`), `eaSlug`.
- Produces: `node scripts/build-seed.mjs` écrit un SQL idempotent contenant 8 projets, leurs catégories, technologies et slugs ; réexécutable sans doublon.

- [ ] **Step 1: Écrire `tests/seed.test.mjs`** : exécute le générateur dans un répertoire temporaire et vérifie que la sortie contient 8 `insert into public.projects`, les slugs attendus (`akoue-app`, `navigarde-ia`, `clavis`, `havre`, `cauris-group-international`, `savekari-beauty`, `portefolio-os`, `vigilance-bj`), des `on conflict ... do update`, les catégories et technologies, et aucun secret. Test rouge au départ.
- [ ] **Step 2: Lancer les tests, vérifier l'échec** (FAIL attendu).
- [ ] **Step 3: Écrire `scripts/build-seed.mjs`** : charge `catalog.js` dans un `vm` avec un faux `window`, mappe les projets vers le schéma de Task 2 (`legacy_id` stable issu de l'ordre du catalogue, `status='published'`, `published_at` = date fixe documentée, `sort_order` = index), échappe les apostrophes SQL, génère les upserts et un bloc de vérification en commentaire.
- [ ] **Step 4: Générer et vérifier** : `node scripts/build-seed.mjs`, relire le SQL, `npm test` PASS.
- [ ] **Step 5: Commit** : `feat(db): seed des projets généré depuis le catalogue`.

---

## Task 6: Module API publique (lecture paginée, filtres, détail)

**Files:**
- Create: `assets/js/api.js`
- Modify: `index.html` (charger `api.js` avant `data.js`)
- Test: `tests/api.test.mjs`

**Interfaces:**
- Consumes: `window.EA_SUPABASE` (`url`, `key`), `fetch`.
- Produces: `window.EA_API` avec :
  - `listProjects({ page=1, perPage=12, categories=[], technologies=[], tags=[], q='', featured=null, sort='recent' }) -> Promise<{items, total, hasMore, source}>` ;
  - `getProject(slug) -> Promise<project|{notFound:true}|null>` ;
  - `listTaxonomies() -> Promise<{categories, tags, technologies}>` ;
  - `isEnabled() -> boolean` (clé présente) ;
  - `createApi({url, key, fetchImpl})` exporté pour les tests Node.

- [ ] **Step 1: Écrire `tests/api.test.mjs`** (avec `createApi` et fetch mocké) : l'URL de `listProjects` contient `status=eq.published`, `order=featured.desc,sort_order.asc,published_at.desc` (selon `sort`), `limit=12`, `offset=0`, `select=` avec les jonctions ; les filtres catégories/technologies deviennent `project_categories.categories.slug=in.(...)` et `project_technologies.technologies.slug=in.(...)` ; `q` non vide ajoute un `or=(title.ilike.*q*,short_desc.ilike.*q*)` ; `getProject('akoue-app')` appelle `projects?slug=eq.akoue-app&select=...` et renvoie `{notFound:true}` sur tableau vide ; une erreur réseau fait renvoyer `null` (et non une exception) ; `isEnabled()` est faux sans clé.
- [ ] **Step 2: Lancer les tests, vérifier l'échec** (FAIL attendu).
- [ ] **Step 3: Implémenter `assets/js/api.js`** : UMD (`module.exports` en Node, `window.EA_API` en navigateur), `fetch` avec `AbortController` (timeout 8 s), en-têtes `apikey`/`Authorization: Bearer`, `Prefer: count=exact`, lecture de `Content-Range` pour `total`, mapping tolérant (champs absents), aucune exception non capturée. Aucun secret supplémentaire.
- [ ] **Step 4: Vérifier** : `npm test` PASS.
- [ ] **Step 5: Commit** : `feat(api): couche de lecture publique des projets avec filtres et pagination`.

---

## Task 7: Brancher le carrousel et la fiche projet sur l'API (avec repli catalogue)

**Files:**
- Modify: `assets/js/data.js` (chargement API après le rendu catalogue, remplacement de `P` puis `renderProjectCarousel()`)
- Modify: `assets/js/project-details.js` (fetch API par slug, repli catalogue/localStorage)
- Modify: `assets/js/catalog.js` (exposer un mapper `eaProjectFromDb`)
- Test: `tests/dom.test.mjs` (étendre)

**Interfaces:**
- Consumes: `EA_API` (Task 6), `P`, `renderProjectCarousel`, `EA_PROJECTS`.
- Produces: rendu public alimenté par l'API quand elle est disponible ; indicateur `document.body.dataset.dataSource` = `"api" | "catalog"` ; aucun changement de design.

- [ ] **Step 1: Étendre les tests DOM** avec un faux `fetch` : (a) l'API renvoie 2 projets → le carrousel affiche 2 cartes et `data-source="api"` ; (b) l'API échoue → 8 cartes catalogue et `data-source="catalog"` ; (c) la fiche `?project=nouveau-projet` absente du catalogue mais renvoyée par l'API s'affiche correctement ; (d) aucun brouillon renvoyé par l'API factice ne doit être affiché (le test mocke une réponse contenant un draft et vérifie qu'il est ignoré côté client).
- [ ] **Step 2: Lancer `npm test`, vérifier l'échec** (FAIL attendu).
- [ ] **Step 3: Implémenter** : dans `data.js`, après le rendu initial depuis `catalog.js`, appeler `EA_API.listProjects({ perPage: 24 })` et, si `items.length`, remplacer `P` par les projets mappés (même forme que `P`) puis `renderProjectCarousel()` ; sinon laisser le catalogue et `body.dataset.dataSource='catalog'` ; en cas d'erreur, consigner `console.warn('[EA] API indisponible, catalogue utilisé')`. Dans `project-details.js`, tenter `EA_API.getProject(slug)` avant la résolution locale ; conserver l'overlay localStorage pour l'admin ; ne jamais accepter un projet `status !== 'published'` hors session admin.
- [ ] **Step 4: Vérifier** : `npm test` PASS ; `node --check` sur les fichiers modifiés ; contrôle visuel rapide sur serveur local.
- [ ] **Step 5: Commit** : `feat(public): carrousel et fiches projet alimentés par l'API avec repli catalogue`.

---

## Task 8: Procédure de migration, vérification et rollback

**Files:**
- Create: `docs/MIGRATION-P0.md`
- Modify: `docs/ARCHITECTURE.md` (nouveau flux de lecture et statut « expand »)

**Interfaces:**
- Consumes: les 3 migrations SQL, le seed, l'API.
- Produces: runbook exécutable par le propriétaire (Supabase SQL Editor), ordre d'application, requêtes de vérification V1–V10, procédure de rollback, tableau de réconciliation catalogue/document/tables.

- [ ] **Step 1: Rédiger `docs/MIGRATION-P0.md`** : prérequis (sauvegarde `pg_dump` ou export du document `select data from portfolio where id=1`), ordre `01 → 02 → 03 → seed`, vérifications (nombre de projets = 8, slugs, aucune policy anon sur les brouillons, jonctions peuplées, trigger remplacé), et rollback (drop des nouvelles tables, restauration du trigger legacy depuis `schema-complete.sql`, restauration du document).
- [ ] **Step 2: Exécuter la checklist de vérification locale** : `npm test`, `node scripts/check-sql.mjs`, `node --check` sur `assets/js/api.js`, `data.js`, `project-details.js`.
- [ ] **Step 3: Documenter la vérification manuelle** : après application sur Supabase, lancer les requêtes de vérification et consigner les résultats attendus dans le runbook (aucune exécution réelle possible sans accès base dans cet environnement).
- [ ] **Step 4: Mettre à jour `docs/ARCHITECTURE.md`** : flux « document → trigger → tables → API → public », statut transitoire, et note « P2 basculera les écritures ».
- [ ] **Step 5: Commit** : `docs: runbook de migration P0 et architecture du flux de lecture`.

---

## Task 9: Vérification finale P0 et critères de sortie

**Files:**
- Modify: `tests/dom.test.mjs` (consolidation)
- Aucun autre fichier de production.

**Interfaces:**
- Consumes: tout ce qui précède.
- Produces: preuve de sortie P0.

- [ ] **Step 1: Exécuter `npm test`** : attendu, tous les tests PASS (DOM accueil 8 cartes, fiche Atlas, API mockée, seed, schéma, projection).
- [ ] **Step 2: Exécuter `node scripts/check-sql.mjs`** : attendu PASS.
- [ ] **Step 3: Exécuter `node --check`** sur `assets/js/api.js`, `data.js`, `project-details.js`, `catalog.js` : attendu exit 0.
- [ ] **Step 4: Contrôle visuel** (serveur local + navigateur ou captures comme en P0) : accueil, galerie de fiches, mobile 390 px, aucune erreur console, aucune régression par rapport aux captures de référence.
- [ ] **Step 5: Vérifier le critère de sortie** : le site lit les tables quand la migration est appliquée ; sans base, il retombe sur le catalogue ; le back-office publie toujours ; `docs/MIGRATION-P0.md` est complet.
- [ ] **Step 6: Commit** : `test: consolider la vérification de sortie P0`.

---

## Hors périmètre P0 (préparé pour la suite)

- P1 : page galerie complète, filtres combinés serveur (RPC de recherche avancée), tri, pagination UI, accueil « mis en avant », autoplay opt-in.
- P2 : écritures directes en tables depuis l'admin, fin du document, éditeurs catégories/tags/technologies/médias/dates/statuts/ordre, aperçu, Storage, journal.
- P3 : GitHub App, Edge Functions, dépôts/commits, classification, webhooks.
- P4 : apparence configurable et motion.
- P5 : rôles, audit serveur, cache/CDN, export `catalog.js`/sitemap, tests E2E.

## Journal des décisions de plan

- **Projection plutôt que double écriture** en P0 : le document reste la source d'écriture, les tables sont un modèle de lecture synchronisé par trigger. Cela supprime le risque de divergence tant que le back-office n'est pas migré, et respecte la stratégie « tables = vérité, document en cache transitoire » (la bascule des écritures est P2).
- **Base64 non migré** en P0 : les couvertures restent dans le document ; les visuels générés servent de repli. Le Storage prend le relais en P2 (galerie réelle).
- **Recherche** en P0 limitée à titre/description via PostgREST ; la recherche multi-entités (tags/technologies) sera une fonction RPC en P1.
- **Tests** : `jsdom` en dépendance de développement, jamais déployé ; SQL vérifié statiquement + checklist manuelle car aucune instance Supabase n'est accessible depuis l'environnement d'exécution.
