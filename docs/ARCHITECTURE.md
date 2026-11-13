# Architecture

Portfolio statique servi par GitHub Pages, sans étape de build.

## Arborescence

```
index.html              structure HTML uniquement
assets/
  css/app.css           tout le style
  js/data.js            données de départ, logos, sons, utilitaires
  js/sections.js        rendu public : projets, blog, boutique, parcours, à propos
  js/remote.js          accès REST Supabase (lecture publique, contact) et chargement à la demande de l'admin
  js/admin.js           espace d'administration (chargé seulement à l'ouverture)
  js/ui.js              intro, langue, contact, palette Ctrl+K
  js/effects.js         animations, orbite, curseur, décor
  img/                  logo.png, portrait.jpg
supabase/
  schema-complete.sql   tables, RLS, trigger de synchronisation
docs/
  ARCHITECTURE.md
  voix/                 anciens scripts vocaux conservés pour référence
```

## Ordre de chargement

`data.js` → `sections.js` → `remote.js` → `ui.js` → `effects.js`, tous en `defer`.
`admin.js` n'est pas chargé au démarrage : `remote.js` l'injecte à la première demande (`Ctrl+Maj+A` ou bouton de connexion).
Les fichiers partagent la portée globale : ne pas changer l'ordre sans vérifier les dépendances.

## Flux de données

1. `sections.js` lit `localStorage` (`ea_admin_v1`) pour peindre la page.
2. `admin.js` lit Supabase au chargement (`eaLoad`) et remplace le cache local.
3. Toute modification admin passe par `save()` : cache local immédiat, puis `portfolio` dans Supabase (debounce 700 ms).
4. Un trigger Postgres décompose le document JSON dans les tables `profile`, `projects`, `skills`, etc.
5. Le formulaire de contact écrit directement dans `messages`.

## Règles

- `index.html` ne contient ni style, ni script inline, ni image base64.
- Un seul module touche `localStorage` : `admin.js`.
- Un seul module touche Supabase : `admin.js`.
- Les textes visibles sont en français dans le HTML, traduits par `ui.js`.
- Aether accepte uniquement les commandes écrites; il n’utilise ni micro ni lecture audio.

## Déploiement

`git push` sur `main` : GitHub Pages publie en une minute environ. Le fichier `.nojekyll` empêche Jekyll de filtrer les assets.
