# Évolution du portfolio en plateforme — analyse et architecture cible

> **Statut : architecture validée le 2026-11-14** (décisions §5 confirmées : Supabase Edge Functions + GitHub App, tables = vérité avec cache transitoire, P0+P1 en premier, checkpoint Git effectué).
> **Plan d'implémentation associé :** `docs/superpowers/plans/2026-11-14-p0-socle-donnees-api.md`
> **Date :** 2026-11-14
> **Périmètre :** cahier des charges « Évolution du portfolio TobiDev » (12 sections + vision finale).
> **Principe directeur demandé :** séparer nettement le **contenu éditorial** (back-office) des **données techniques GitHub** (synchronisées), sans reconstruire ce qui fonctionne.

---

## 1. Résumé exécutif

Le portfolio actuel est un site statique (HTML/CSS/JS sans build) avec un back-office SPA, une base Supabase et une véritable direction artistique. Il **fonctionne** : carrousel de projets, fiches « Atlas », i18n FR/EN, Aether, CV, contact, admin authentifié, RLS durcie, responsive mobile vérifié.

Le cahier des charges dépasse cependant ce socle sur un point structurel : **le contenu vit aujourd'hui dans un document JSON unique** (`portfolio.data`), recopié dans `localStorage`, avec un `catalog.js` codé en dur en secours. Ce modèle ne peut pas tenir :

- plusieurs centaines de projets (volume du document, quota localStorage ~5 Mo) ;
- des relations plusieurs-à-plusieurs (catégories, sous-catégories, tags, technologies) ;
- des filtres, une recherche et une pagination côté serveur ;
- des dates, statuts, médias multiples et un ordre éditorial ;
- une synchronisation GitHub avec commits et webhooks sans exposer de jeton ;
- un aperçu avant publication et un journal d'opérations.

**Recommandation :** conserver l'intégralité de l'existant visuel et fonctionnel, migrer progressivement le socle de données vers **PostgreSQL normalisé (Supabase)**, ajouter une **couche serverless Supabase Edge Functions** pour GitHub, puis construire dans l'ordre : **socle données → galerie publique → back-office v2 → GitHub → apparence/motion → durcissement**. Chaque étape est un sous-projet livrable et testable, avec un plan d'implémentation distinct.

---

## 2. Ce qui existe et doit être préservé

| Domaine | Existant | Fichiers |
|---|---|---|
| Site public | 2 pages, carrousel dynamique, fiches projet détaillées, 8 projets, i18n FR/EN, contact, CV, Aether, sons, mode sobre | `index.html`, `project.html`, `assets/js/*` |
| Identité visuelle | noir/rouge, Anton/Oswald/Inter, composants brutalistes, fiche Atlas | `assets/css/*` |
| Motion Design | intro, wipe, révélations au scroll, bannière, ticker, tilt 3D, orbite, curseur Zéo, marquees, micro-interactions, `prefers-reduced-motion` | `effects.js`, `data.js`, `ui.js`, `app.css` |
| Admin | 10 menus, CRUD projets/compétences/blog/boutique/services/parcours/profil/paramètres/messages, export JSON | `admin.js` |
| Auth & sécurité | OAuth GitHub, table `public.admins`, `is_owner()` serveur, RLS, push assaini, formulaire messages limité | `schema-complete.sql`, `migration-securite.sql`, `admin.js`, `remote.js` |
| Données | Supabase `portfolio` (JSON) + 13 tables normalisées (aujourd'hui inutilisées), cache `localStorage`, `catalog.js` en secours | `supabase/*`, `catalog.js`, `sections.js` |
| Responsive | breakpoints 360→1440, swipe carrousel, cibles 44 px, `prefers-reduced-motion`, admin mobile | `app.css`, `data.js` |
| Qualité | vérifications DOM jsdom (88/88 accueil, 146/146 fiches), captures Chrome mobile/desktop | harnais externe (non versionné) |

**Rien de tout cela n'est à refaire.** Les plans devront réutiliser ces briques ; les modifications se font par extension, pas par réécriture.

---

## 3. Matrice de conformité au cahier des charges

Légende : ✅ conforme · 🟡 partiel · ❌ absent.

| § | Exigence | État | Écart principal |
|---|---|---|---|
| 1 | Navigation, carrousel manuel, tactile, performance | 🟡 | Carrousel tactile et clavier OK, mais **autoplay actif par défaut** (la spec le refuse) et pas de transition entre pages |
| 2 | Galerie complète, grille, pagination/Load More, ordre, mis en avant | ❌ | Aucune page galerie ; accueil limité à 8 cartes ; pas de `featured`/`sort_order` |
| 3 | Catégories/sous-catégories illimitées, tags, technologies, filtres combinés, recherche, tri | ❌ | Une seule `cat` texte ; technologies en CSV ; aucune relation M2M, aucun filtre public |
| 4 | Champs projet complets, dates publiée/MAJ, galerie multi-images, statuts brouillon/publié/archivé | 🟡 | Pas de dates, pas de galerie réelle, statut binaire texte, pas d'archivage, impact non éditable |
| 5 | Synchro GitHub : dépôts, commits, langages, classification, webhooks, sync manuelle | ❌ | Aucune brique GitHub (ni tables, ni fonctions, ni secrets) |
| 6 | Sélection/publication manuelle, « Synchroniser maintenant » | 🟡 | Publication manuelle existante, mais pas d'inventaire de dépôts ni de workflow éditorial |
| 7 | Arrière-plan/apparence configurables, prévisualisation | 🟡 | Accent, son, sections/extras configurables ; **pas** de fond activable/désactivable ni d'aperçu |
| 8 | Motion Design enrichi (sections, pages, galerie, hover, micro-interactions, typo, fond, 3D) | 🟡 | Socle riche existant ; manquent transitions de sections/pages, animations de galerie, typo hero avancée, fond configurable |
| 9 | Back-office centre de contrôle, aperçu avant publication, droits | 🟡 | Pilotage via JSON, pas de nouvelles entités, pas d'aperçu, mono-admin, journal local de 12 entrées |
| 10 | Boutons code source/démo configurables par projet | 🟡 | `repo` statique sur 2 projets, aucune option d'activation/désactivation en admin |
| 11 | Pages de détails complètes (design Atlas) | ✅ | Design livré ; contenu limité par le schéma (galerie, impact, dates) |
| 12 | Architecture modulaire, relationnelle, API sécurisées, webhooks vérifiés, journal, cache, images optimisées, centaines de projets | 🟡 | Sécurité déjà durcie ; mais document JSON unique, images base64, trigger destructif, pas de journal serveur, aucun test versionné |

---

## 4. Architecture cible

```
┌──────────────────────────────┐        webhooks signés HMAC
│  GitHub (compte/app)         │ ─────────────────────────────┐
│  repos · commits · langages  │                              │
└──────────────┬───────────────┘                              │
               │ API (installation token, côté serveur)       │
┌──────────────▼───────────────┐        ┌────────────────────▼─────────┐
│  Edge Functions Supabase     │        │  github-webhook              │
│  github-sync (manuel/cron)   │        │  vérifie X-Hub-Signature-256 │
└──────────────┬───────────────┘        └────────────────────┬─────────┘
               │                                            │
┌──────────────▼────────────────────────────────────────────▼─────────┐
│  PostgreSQL Supabase                                                 │
│  ÉDITORIAL : projects, project_media, categories, tags, technologies,│
│              jonctions M2M, services, posts, products, profile,     │
│              settings.appearance, admins(role), activity            │
│  TECHNIQUE : github_repos, github_commits, github_sync_runs,        │
│              github_webhook_events  (jamais publié tel quel)        │
│  Lien : projects.github_repo_id (facultatif) + champs éditoriaux    │
└──────────────┬───────────────────────────────────────────────────────┘
               │ PostgREST + RLS (lecture publiée / écriture admins)
┌──────────────▼───────────────┐        ┌──────────────────────────────┐
│  Back-office TobiDev         │        │  Portfolio public statique   │
│  projets · catégories · tags │        │  accueil · galerie · fiches  │
│  médias · GitHub · apparence │        │  filtres · recherche · tri   │
└──────────────────────────────┘        └──────────────────────────────┘
```

### 4.1 Séparation éditorial / technique (exigence utilisateur)

- **Éditorial** : titre, descriptions, catégories, tags, médias, dates de publication, statut, mise en avant, ordre, liens démo/code, impact. Modifiable uniquement depuis le back-office.
- **Technique** : dépôts, commits, messages, langages, dernière activité. Récupéré par synchronisation ; **jamais publié directement**. Seuls des champs choisis (ex. « dernière mise à jour technique ») sont recopiés vers le projet au moment où l'admin valide.
- Un projet peut référencer un dépôt (`projects.github_repo_id`) sans que le dépôt soit publié ; inversement, un dépôt non sélectionné reste dans l'inventaire admin.

### 4.2 Modèle de données proposé (nouvelles tables)

**Éditorial**

| Table | Colonnes clés |
|---|---|
| `projects` | `id uuid`, `slug unique`, `title`, `short_desc`, `long_desc`, `status enum(draft,published,archived)`, `featured bool`, `sort_order int`, `published_at`, `updated_at`, `created_at`, `role`, `sector`, `impact jsonb`, `demo_url`, `repo_url`, `demo_visible bool`, `repo_visible bool`, `github_repo_id nullable` |
| `project_translations` | `project_id`, `locale`, `title`, `short_desc`, `long_desc` (i18n extensible ; remplace les champs `en_*`) |
| `categories` | `id`, `slug`, `parent_id nullable` (sous-catégories), `enabled`, `sort_order`, `name`, `name_en` |
| `tags` | `id`, `slug`, `name`, `name_en` |
| `technologies` | `id`, `slug`, `name`, `icon`, `color` |
| `project_categories` / `project_tags` / `project_technologies` | `project_id` + `category_id`/`tag_id`/`technology_id` (clés primaires composites, index inversés) |
| `project_media` | `id`, `project_id`, `storage_path`, `kind enum(cover,gallery)`, `alt`, `caption`, `sort_order`, `width`, `height` |
| `settings` (étendu) | `appearance jsonb` (fond activé, couches visuelles, intensité, accent, niveau de motion), `motion_level`, etc. |
| `admins` (étendu) | `role enum(owner,editor)` — préparation des droits |

**Technique**

| Table | Colonnes clés |
|---|---|
| `github_repos` | `id`, `github_id unique`, `full_name`, `name`, `description`, `html_url`, `default_branch`, `visibility`, `created_at`, `pushed_at`, `last_commit_at`, `languages jsonb`, `topics text[]`, `selected bool`, `project_id nullable`, `last_synced_at` |
| `github_commits` | `id`, `repo_id`, `sha unique`, `message`, `author_name`, `author_login`, `committed_at`, `html_url`, `type enum(feat,fix,improvement,refactor,docs,perf,chore,other)`, `type_manual bool` |
| `github_sync_runs` | `id`, `started_at`, `finished_at`, `trigger enum(manual,webhook,cron)`, `status`, `stats jsonb`, `error` |
| `github_webhook_events` | `id`, `delivery_id unique`, `event`, `payload jsonb`, `received_at`, `processed` (idempotence) |

**Conservées / adaptées :** `profile`, `skills`, `experiences`, `education`, `posts`, `products`, `services`, `steps`, `messages`, `activity`, `portfolio` (document legacy pendant la transition uniquement).

**Index et recherche :** index sur `status`, `featured`, `sort_order`, `published_at` ; index composites sur les jonctions ; colonne `search_vector tsvector` générée sur le projet (titre, descriptions, tags, technologies) avec index GIN ; recherche `websearch_to_tsquery` + `pg_trgm` pour les fautes de frappe.

### 4.3 Sécurité

- RLS : lecture publique des projets `status='published'` et de leurs relations ; lecture des brouillons/archives réservée aux admins (`is_owner()` étendu ou `admins.role`) ; écriture réservée aux admins ; tables GitHub **non lisibles par `anon`**.
- Jetons GitHub : **uniquement** dans les secrets des Edge Functions (Vault). Jamais dans `index.html`, `localStorage`, le document public ni une table lisible.
- Webhook : vérification `X-Hub-Signature-256` (HMAC SHA-256, secret dédié), idempotence par `delivery_id`, journal des événements, rejet des payloads invalides, limite de taille.
- Images : bucket Supabase Storage (`media`) avec politiques (lecture publique, écriture admin), transformations à la volée pour les vignettes ; fin du base64 dans le document.
- Journalisation : table `activity` alimentée côté serveur (qui, quoi, quand) + `github_sync_runs`.
- Rôles : owner/editor (P5 ; owner seul au départ).
- Sauvegardes : export SQL périodique + rollback documenté pour chaque migration.

### 4.4 Front-office

- **`projects.html`** (nouvelle page) : galerie en grille, filtres catégories/sous-catégories/technologies/tags combinables, recherche plein texte, tri (publication, mise à jour, ordre, alphabétique), pagination « Charger plus » (12/24 par page), état des filtres dans l'URL, états vides/erreur.
- **Accueil** : carrousel = **projets mis en avant** uniquement (max 8) avec lien « Voir tous les projets » ; **autoplay désactivé par défaut** (opt-in), navigation manuelle, tactile, clavier.
- **Fiche projet** : conserve le design Atlas ; chargement par `slug` depuis l'API ; galerie réelle avec lightbox ; section impact si données ; boutons « Voir la démonstration » / « Voir le code source » pilotés par `demo_visible` / `repo_visible` ; projets liés.
- **Réplique pour les visiteurs sans JS / SEO** : `catalog.js` reste un instantané généré depuis la base (voir §5, décision 6) ; balises meta/JSON-LD dynamiques.

### 4.5 Back-office v2

Menus ajoutés : **Catégories**, **Tags**, **Technologies**, **Médias**, **GitHub** (inventaire, commits, classification, « Synchroniser maintenant »), **Apparence** (fond + aperçu), **Journal**. Le menu Projets passe à un formulaire complet (dates, statut 3 états, mise en avant, ordre, galerie, liens et visibilités, impact, traductions). Écritures **par entité** via PostgREST (plus de document global), conflits gérés par `updated_at`/ETag, uploads vers Storage, aperçu via session admin authentifiée (`?preview=1`, RLS renvoie le brouillon).

### 4.6 GitHub

- **GitHub App** (recommandée) : permissions minimales (Metadata read, Contents read, Commit statuses read), webhooks `push` par installation, installation token à durée de vie courte — plus propre qu'un PAT longue durée.
- **Edge Functions** : `github-sync` (inventaire des dépôts + derniers commits, déclenchée manuellement ou par cron), `github-webhook` (événements `push`), `github-auth` (callback d'installation si nécessaire).
- **Classification** : analyse des messages de commits (Conventional Commits `feat:`, `fix:`, `refactor:`, `docs:`, `perf:`, `chore:` + heuristiques) côté serveur, **toujours modifiable** en admin (`type_manual`).
- **Sélection** : l'admin voit tous les dépôts et choisit lesquels deviennent des projets ; rien n'est publié automatiquement.
- **Dates** : `repo.created_at` (création), premier commit, `published_at` (portfolio) et `updated_at` (dernière évolution significative, initialisée par le dernier commit puis corrigeable) sont distincts.

### 4.7 Apparence et Motion Design

**Existant (à conserver) :** intro avec logo slam et sortie animée, transition d'ancre en 3 bandes (`#wipe`), révélations au scroll via IntersectionObserver (slam, stagger, timeline, compteurs), ticker RAF, carrousel coverflow 3D avec swipe/clavier, tilt CSS des cartes, curseur Zéo, Aether animé, HUD/bannière/palette, son WebAudio, mode sobre et `prefers-reduced-motion`.

**Écarts réels :** transitions de sections au scroll (hors wipe), transitions inter-pages (navigation dure, page détail sans reveal), galerie/lightbox, micro-interactions (press, focus, formulaires), hero joué une seule fois, arrière-plan statique non configurable, aucune 3D WebGL, back-office sans réglages d'apparence ni aperçu.

**Cible :**

- `settings.appearance` + `settings.motion` (jsonb) : fond activé/désactivé, couches visuelles (aurora, grille, bruit, scanlines, shards, bgword), intensité, accent, niveau de motion (complet / réduit / sobre).
- Couche dédiée `#bgfx` insérée avant `#intro`, pilotée par classes `body.bg-*` / `body.fx-*` et variables `--fx-*` ; sections opaques neutralisées uniquement quand un fond est actif.
- Portail `EA.motion` centralisant les conditions d'arrêt : `prefers-reduced-motion`, mode sobre, `document.hidden`, visibilité par IntersectionObserver, pointeur grossier ; branché sur les boucles rAF existantes (Aether, orbite, curseur, ticker) et les nouvelles.
- Positions de motion : **P4** livre les réglages d'apparence avec aperçu, les transitions de sections (variantes de reveal data-driven), la View Transitions API en progressive enhancement avec repli, les micro-interactions et la lightbox de galerie. **WebGL/Three.js reste optionnel et différé** (module lazy, budget ≤ 250 Ko gzip, jamais en mode réduit/mobile bas de gamme).
- Budget : ≤ 1 boucle rAF active et visible (0 hors section), transforms/opacity uniquement, pas de blur plein écran, images WebP ≤ 40 Ko, CSS/JS minifiés, mesures LCP/INP sur mobile 4G.

---

## 5. Décisions structurantes (à valider)

| # | Décision | Recommandation | Justification |
|---|---|---|---|
| 1 | Backend serverless | **Supabase Edge Functions** | Supabase déjà en place ; secrets, cron, Storage, RLS et Auth au même endroit ; pas de nouvelle plateforme |
| 2 | Intégration GitHub | **GitHub App** (webhooks + installation token) | Permissions minimales, webhooks natifs, pas de PAT longue durée ; alternative PAT acceptée si la création d'app est bloquante |
| 3 | Vérité éditoriale | **Tables PostgreSQL = source de vérité**, `portfolio` en cache de compatibilité pendant la transition, `catalog.js` en instantané de secours | Scalabilité, relations, pagination, RLS ; évite le big-bang |
| 4 | Images | **Supabase Storage + transformations**, fin du base64 | Volume, cache CDN, galerie ; nécessite d'autoriser les URLs Storage dans `safeImage` |
| 5 | Aperçu avant publication | **Session admin authentifiée** (`?preview=1`), pas de lien public signé | Simple, pas de fuite de brouillons, pas de seconde infra |
| 6 | `catalog.js` | Instantané **généré** depuis la base par une action/commande d'export, conservé pour SEO/offline | « Back-office pilote tout » sans casser la résilience ; génération après publication |
| 7 | Build front | Rester **statique sans build** au départ ; SSG/prerender envisagé en P5 si le SEO l'exige | Limite les risques et préserve le fonctionnement actuel |
| 8 | Rôles | Owner seul maintenant, `editor` préparé en base puis activé en P5 | YAGNI, mais schéma prêt |
| 9 | Motion et 3D | **CSS + JS léger d'abord**, WebGL/Three.js **optionnel et différé** (module lazy, budget ≤ 250 Ko) | Performance mobile et `prefers-reduced-motion` ; la 3D n'est pas indispensable à la valeur |
| 10 | Contrôle du fond | **Presets définis en admin** (mode, couches, intensité) ; le visiteur peut tout désactiver via le mode sobre | Évite un studio trop complexe ; garde le contrôle éditorial et l'accessibilité |
| 11 | Reduced-motion | **Priorité stricte** à `prefers-reduced-motion` et au mode sobre ; aucune boucle infinie par défaut sur mobile | Accessibilité et budget de performance |
| 12 | Checkpoint avant migration | **Committer l'état actuel** (travail non commité : projets réels, sécurité, fiches Atlas, mobile, docs) avant d'attaquer P0 | La migration doit partir d'une base propre et réversible |

---

## 6. Découpage en sous-projets (plans séparés)

Chaque sous-projet est un plan d'implémentation autonome (format `docs/superpowers/plans/`), avec critères d'acceptation et tests. Dépendances : P0 est le prérequis ; P1 et P2 sont parallélisables après P0 ; P3 après P0/P2 ; P4 après P2 ; P5 transverse.

### P0 — Socle de données et API (prérequis)
- Migrations : enums, nouvelles tables, jonctions, index, `tsvector`, vues publiques, RLS.
- Reprise des 8 projets (catalog + `IMP`) vers les tables, slugs stables, réconciliation des 4 sources actuelles.
- Désarmement contrôlé du trigger destructif et de `load()` auto-migrate ; stratégie de cache temporaire.
- Bucket Storage `media` + politiques ; `safeImage` étendu.
- Couche cliente `assets/js/api.js` (lecture paginée, filtres, détail) + tests Node/jsdom.
- **Critère :** le site public lit les projets depuis les tables, `catalog.js` sert de secours, aucune régression visuelle.

### P1 — Galerie publique et navigation
- `projects.html` : grille, filtres combinés, recherche, tri, pagination/load more, URL partageable.
- Accueil : carrousel des projets mis en avant, autoplay opt-in, lien vers la galerie.
- Fiche projet : galerie réelle + lightbox, impact, boutons pilotés par la base.
- **Critère :** 100+ projets factices filtrables sans dégradation ; mobile validé.

### P2 — Back-office v2
- Formulaire projet complet, écrans Catégories/Tags/Technologies/Médias, ordre + mis en avant.
- Écritures serveur par entité, uploads Storage, dates/statuts, aperçu, journal, rôles.
- Suppression progressive des migrations localStorage et du document global.
- **Critère :** toutes les opérations de contenu se font en admin, sans toucher au code ; aperçu fiable.

### P3 — Synchronisation GitHub
- GitHub App + secrets, Edge Functions sync/webhook, tables repos/commits, classification modifiable, cron de secours, « Synchroniser maintenant », UI admin (inventaire, sélection, commits, lien projet).
- **Critère :** un push met à jour l'inventaire sans publication ; signature de webhook vérifiée ; aucune fuite de jeton.

### P4 — Apparence et Motion Design
- Configuration du fond/de l'apparence (couches, intensité, accent, motion) + aperçu public.
- Motion : transitions de sections et de pages (View Transitions progressive enhancement), animations de galerie, micro-interactions, typographie du hero, effets de fond ; budgets perf et `prefers-reduced-motion`.
- **Critère :** l'apparence se pilote depuis l'admin ; 60 fps desktop, dégradation propre mobile, mode sobre inchangé.

### P5 — Durcissement et passage à l'échelle
- Rôles owner/editor, audit serveur, rate limits, cache/CDN, optimisation d'images, tests E2E/visual regression, monitoring, sauvegardes, sitemap/export `catalog.js`.
- **Critère :** 500 projets simulés, temps de réponse < 300 ms sur la galerie, sauvegarde/restauration testées.

Ordre recommandé : **P0 → P1 → P2 → P3 → P4 → P5** (P4 « quick wins » motion peut démarrer tôt sans dépendance).

---

## 7. Risques et points de vigilance

1. **Trigger destructif** : `sync_portfolio_tables()` reconstruit toutes les tables à chaque écriture du document ; une fois les tables source de vérité, il doit être désactivé/remplacé, sinon il écrase les données.
2. **Migrations auto au démarrage** : `load()` (admin) réécrit et ressuscite les données de démonstration ; à retirer avant bascule.
3. **Quatre sources de vérité** : `catalog.js`, `IMP`, document `portfolio`, `import-projects.sql` (déclaré obsolète) — réconciliation par `id`/`slug` obligatoire et testée.
4. **Écriture « document entier »** : conflits entre onglets/appareils ; passer à des écritures par entité avec contrôle de version.
5. **Images** : base64 + quota localStorage ; `safeImage` rejette aujourd'hui les URLs `https://…/storage/` — à étendre avant la galerie.
6. **Statuts** : « Publié » accentué dupliqué en JS et SQL ; brouillons accessibles par URL directe aujourd'hui — à corriger avec les vrais statuts et la RLS.
7. **GitHub** : jeton côté client interdit ; webhooks rejoués (idempotence) ; rate limits ; repos privés à exclure ; app externe à créer.
8. **SEO** : contenu chargé côté client ; conserver le secours statique et prévoir un export généré.
9. **Coûts/quotas** Supabase (Storage, egress, fonctions) et GitHub API ; prévoir budget et alertes.
10. **Tests** : aucun harnais versionné actuellement ; P0 doit poser des tests (Node + jsdom) et une commande de vérification.
11. **Traductions** : champs `en_*` actuels ; prévoir des tables de traduction pour ne pas multiplier les colonnes.
12. **Non-régression** : le site actuel doit rester utilisable pendant toute la transition ; chaque phase a un critère « aucune régression visuelle ou fonctionnelle ».

---

## 8. Ce qui ne sera pas reconstruit (réutilisation explicite)

1. Design Atlas des fiches projet et sa mise en page responsive.
2. Carrousel dynamique accessible (swipe, clavier, dots, pause) — seule l'autoplay par défaut change.
3. Pipeline de rendu des fiches (`project-details.js`) et générateurs de visuels (`eaProjectArt`, `eaProjectShot`, `eaTechIcon`).
4. Composants admin (`formM`, handlers délégués, toasts, recherche, `esc`, `nid`) et pipeline image canvas→WebP (redirigé vers Storage).
5. Auth GitHub + `admins` + `is_owner()` + RLS + push assaini + policy `messages`.
6. i18n `D18`/`regTr` et convention de traduction du contenu admin.
7. Résilience de lecture (`catalog.js` → cache → API) et mode sobre / `prefers-reduced-motion`.
8. Aether, CV, contact, palette Ctrl+K, sons, HUD, bannière — hors périmètre sauf intégration galerie.
9. Architecture statique sans build, déploiement GitHub Pages/Vercel.

---

## 9. Prochaines étapes

1. Valider les décisions structurantes (§5) et l'ordre des sous-projets (§6).
2. Écrire le plan d'implémentation détaillé de **P0 — Socle de données et API** (tâches, fichiers, tests, critères d'acceptation).
3. Exécuter P0, vérifier la non-régression, puis enchaîner P1 (galerie) avec un second plan.
4. Ne rien implémenter avant validation de ce document.
