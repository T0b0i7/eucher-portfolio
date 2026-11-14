# Architecture

Portfolio statique en HTML/CSS/JS natifs, servi sans étape de build. Le code reste volontairement en ES5 (hors littéraux de gabarit déjà présents dans `data.js`) et partage des globales entre modules chargés en `defer`.

## Arborescence

```
index.html                     page principale (structure HTML uniquement)
project.html                   fiche « étude de cas » d’un projet
assets/
  css/app.css                  style du site principal
  css/project-details.css      style des fiches projet
  js/config.js                configuration publique Supabase partagée (clé publishable)
  js/api.js                   lecture publique des projets (PostgREST, pagination, filtres, détail)
  js/catalog.js                catalogue public des projets (EA_PROJECTS, eaSlug, eaProjectArt) — repli
  js/data.js                   données de départ (profil, CV, compétences), utilitaires, carrousel
  js/sections.js               rendu public : blog, boutique, parcours, à propos, services, pont admin
  js/remote.js                 lecture du document + formulaire de contact + chargement de l’admin à la demande
  js/ui.js                     intro, HUD, palette Ctrl+K
  js/effects.js                Aether, i18n D18, CV, contact, mode sobre, effets 3D, orbite
  js/project-details.js        rendu de project.html (API puis repli catalogue)
  js/admin.js                  SPA d’administration (chargée seulement à l’ouverture)
  img/                         logo et portrait
supabase/
  schema-complete.sql          installation neuve : tables, RLS, trigger, table admins
  migration-securite.sql       migration idempotente pour une base existante
  migrations/                  P0 : schéma projet normalisé, RLS/Storage, projection
  seed/                        seed des projets généré depuis le catalogue
  import-projects.sql          ancien import, obsolète après la migration de sécurité
tests/                         harnais jsdom + contrôles statiques (dev uniquement)
scripts/                       génération du seed, vérification SQL (dev uniquement)
docs/
  ARCHITECTURE.md
  MIGRATION-P0.md              runbook d’application et de rollback de P0
  aether-voiceover-script.md
  voix/, voix-assets/          anciens scripts vocaux conservés pour référence
  superpowers/specs|plans/     specs et plans de travail
```

## Pages et point d’entrée

- `index.html` charge `config.js` (immédiat) puis `api.js` → `catalog.js` → `data.js` → `sections.js` → `remote.js` → `ui.js` → `effects.js`, tous en `defer`.
- `project.html` charge `config.js`, puis `api.js` → `catalog.js` → `project-details.js` en `defer`.
- `admin.js` n’est jamais chargé au démarrage : `remote.js` l’injecte (avec `@supabase/supabase-js` depuis le CDN) à la première demande, via `Ctrl+Maj+A`, `Alt+Maj+A` ou le bouton « Connexion ».

## Rôle des modules

| Module | Rôle |
| --- | --- |
| `config.js` | Configuration publique Supabase (`url`, clé publishable, owner) partagée par les deux pages. Aucun secret. |
| `api.js` | Couche de lecture publique : `listProjects` (pagination, catégories, technologies, recherche, tri), `getProject(slug)`, `listTaxonomies`. Interroge PostgREST et ne renvoie que les projets `published` ; erreurs silencieuses (null) pour laisser le repli. |
| `catalog.js` | Repli statique des 8 projets publiés : textes, technologies, URL, rôle, secteur, `repo` GitHub quand il existe, icônes technos (`eaTechIcon`), visuels générés (`eaProjectArt`, `eaProjectShot`). Sert aussi de premier rendu et de secours quand l’API est indisponible. |
| `data.js` | Construit `P` depuis `catalog.js`, puis remplace le carrousel par les projets de l’API quand elle répond (`document.body.dataset.dataSource` = `api` ou `catalog`). Expose les seeds profil/CV/compétences, l’échappement `E`, les sons, la modale projet et le carrousel (dont le balayage tactile). |
| `sections.js` | Peint blog, boutique, parcours, à propos et services depuis `localStorage`, applique les réglages du document (`applyData`) et rappelle les rendus. |
| `remote.js` | Lit le document public `portfolio` au boot, écrit le cache `ea_admin_v1` puis relance le rendu. Expose `eaSend` (contact) uniquement si une clé Supabase existe. Charge l’admin à la demande. |
| `ui.js` | Intro, HUD date/heure/section, mode fête, palette Ctrl+K. |
| `effects.js` | Aether, traduction FR/EN (`D18`, `regTr`, `setLang`), CV imprimable, formulaire de contact, mode sobre (`setCalm`, bouton `#calmb`) et effets 3D/orbite. |
| `project-details.js` | Tente `EA_API.getProject(slug)` puis, à défaut, résout dans `EA_PROJECTS` avec surcouche des modifications `ea_admin_v1.projects`, et rend la fiche : hero, tags iconifiés, visuel + stat, description, fonctionnalités, technologies, repères/résultats, galerie d’aperçus générés et boutons d’action. Un brouillon reçu par erreur n’est jamais affiché. |
| `admin.js` | SPA admin : authentification GitHub, chargement du cache, édition, messages, export, et écriture du document. |

## Flux de données

1. Au chargement de `index.html`, `catalog.js` fournit un premier rendu immédiat (8 projets), puis `data.js` interroge `EA_API.listProjects()` : si les tables P0 répondent, le carrousel est remplacé par les projets `published` de la base et `document.body.dataset.dataSource` passe à `api` ; sinon (erreur, base non migrée) le catalogue reste affiché (`catalog`) avec un avertissement console.
2. `remote.js` appelle `eaLoad()` : `GET /rest/v1/portfolio?id=eq.1&select=data`. Si le document public contient des projets, il remplace le cache local puis relance `applyData` et les rendus (projets, blog, boutique, parcours, à propos…). C’est le **seul** chargement du document au boot : `effects.js` ne le refait plus. Pendant P0, le document reste la source d’écriture du back-office.
3. Dans l’admin, `save()` met à jour `ea_admin_v1` puis appelle `eaPush` : `remotePush()` pousse une copie **assainie** du document (sans `msgs`, sans `act`, sans `profile.tel`) vers `portfolio`, avec un debounce de 700 ms.
4. Le trigger historique `sync_portfolio_tables` décompose ce document dans les tables « legacy » (`profile`, `settings`, `projects`, `skills`, `experiences`, `education`, `posts`, `products`, `services`, `steps`, `activity`).
5. Le trigger `trg_sync_project_tables` (P0) projette les projets du document vers le **modèle de lecture normalisé** : `projects`, `categories`, `technologies` et leurs jonctions, avec slug stable, statut mappé, dates et déduplication. Toute écriture du document met donc les tables P0 à jour automatiquement.
6. Le formulaire de contact appelle `eaSend()` → insertion dans `messages`. Sans clé Supabase, `eaSend` n’existe pas et le bouton garde son repli `mailto:`.
7. `project.html` interroge d’abord l’API (`getProject(slug)`) ; en cas d’échec ou de base non migrée, il retombe sur `EA_PROJECTS` + cache local. Un projet `draft`/`archived` reçu par erreur est traité comme introuvable.
8. La migration P0 est décrite dans `docs/MIGRATION-P0.md` (ordre, vérifications, rollback). Les écritures directes en tables et la fin du document JSON sont prévues en P2.

## Règles

- **Plusieurs modules lisent `localStorage`** : `sections.js`, `effects.js` (i18n, CV, contact), `project-details.js`, `admin.js`. `ui.js` ne lit que les globales déjà chargées.
- **Seul `admin.js` modifie le document** `ea_admin_v1` ; `remote.js` se contente d’y écrire la copie reçue de Supabase.
- **Accès Supabase** : `api.js` en lecture publique (projets publiés, taxonomies) ; `remote.js` pour le document public et le contact ; `admin.js` pour l’écriture authentifiée (document et messages). `effects.js` passe uniquement par `eaSend` exposé par `remote.js` ; aucun autre module ne crée de client Supabase.
- **Pas de build, pas de bundler** : les fichiers sont servis tels quels et partagent la portée globale (`P`, `S2`, `BP`, `M`, `sfx`, etc.). Ne pas changer l’ordre de chargement sans vérifier ces dépendances.
- **i18n** : les textes français vivent dans le HTML et les modules ; `effects.js` porte le dictionnaire `D18` et traduit le DOM, y compris les attributs (`placeholder`, `aria-label`, `title`, `alt`). L’admin fournit les versions anglaises du contenu et `regTr()` les enregistre.
- **Aether est textuel uniquement** : ni micro ni lecture audio ; le mode sobre masque `#zeo` et `#zp` via `body.calm`.

## Sécurité

- Table `public.admins(uid)` : source de vérité de l’ownership. `is_owner()` est `security definer` et teste l’existence de `auth.uid()` dans cette table — plus aucun champ du JWT modifiable (`user_metadata.user_name`) n’entre dans la décision.
- RLS activée sur toutes les tables. Le document `portfolio` est lisible publiquement ; son écriture est réservée au propriétaire. `profile` et `settings` ne sont plus lisibles publiquement ; `projects`, `posts` et `products` restent lisibles pour les lignes au statut « Publié ».
- Le document public est assaini avant publication : `msgs` (messages privés), `act` (activité) et `profile.tel` (téléphone) sont exclus. Les messages se consultent uniquement dans l’admin, via la table `messages` protégée.
- L’insertion dans `messages` est limitée par une policy : nom entre 2 et 120 caractères, e-mail contenant `@`, sujet ≤ 200, message entre 1 et 5000 caractères.
- Migration à exécuter **une fois** sur une base existante : `supabase/migration-securite.sql` (idempotent), après déploiement du nouveau `admin.js`/`remote.js` ; puis se connecter avec GitHub. Pour une base neuve : `supabase/schema-complete.sql`. Le bootstrap de la table `admins` est expliqué en tête de la migration et se rejoue manuellement si le compte GitHub n’existait pas encore.
- P0 ajoute ses propres policies (`supabase/migrations/`) : lecture publique des seuls projets `published`, relations et médias visibles seulement si le projet est publié, écriture réservée au propriétaire, bucket `media` public en lecture. Le runbook et le rollback sont dans `docs/MIGRATION-P0.md`.

## Responsive et accessibilité

- Breakpoints principaux : 1200, 1100, 1000, 950, 900, 768, 700, 480, 420, 380, 360, plus paysage et impression. Navigation burger à partir de 900 px.
- Carrousel : balayage tactile (Pointer Events avec repli Touch Events) sur `#carouselSection`, seuil de 40 px, geste vertical laissé au défilement, clic sur lien/bouton ignoré, autoplay mis en pause au survol, au focus clavier et en mode sobre. Pastilles tactiles à zone de 44 px, visuel conservé.
- Cibles tactiles principales ≥ 44 px (menu, HUD, boutons, liens de contact) ; `prefers-reduced-motion` neutralise les animations ; les effets 3D/hover sont désactivés sur pointeur grossier.
- Les fiches projet suivent leur propre responsive (1024 / 768 / 400) : hero empilé, technologies sur une colonne, galerie en carrousel horizontal à défilement aimanté.

## Déploiement

- **GitHub Pages** : pousser sur `main`. Le fichier `.nojekyll` empêche Jekyll de filtrer les assets.
- **Vercel** : importer le dépôt ; `.vercelignore` exclut les fichiers qui ne servent pas au site statique.
- Aucune variable d’environnement n’est nécessaire : la configuration publique Supabase est dans `assets/js/config.js` et la sécurité repose sur la RLS et la table `admins`, pas sur le secret de cette clé.
