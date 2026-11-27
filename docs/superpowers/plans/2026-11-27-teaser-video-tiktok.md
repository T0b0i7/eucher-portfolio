# Teaser Vidéo TikTok & Smartphone Mockup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permettre d'associer un lien vidéo promotionnel (TikTok, YouTube Shorts ou MP4) à un projet et d'afficher un bouton « 🎬 Teaser vidéo » sur sa fiche ouvrant une visionneuse interactive dans un cadre smartphone vertical (9:16).

**Architecture:** 
1. Le backoffice (`assets/js/admin.js`) capture et persiste le champ `video_url` dans le document JSON maître et Supabase.
2. La fiche projet (`assets/js/project-details.js`) analyse l'URL (TikTok, Shorts ou MP4 direct), injecte le bouton d'action et orchestre le modal mockup smartphone accessible.
3. Les styles CSS responsive garantissent un rendu mobile/desktop immersif sans alourdir le chargement initial.

**Tech Stack:** Vanilla JavaScript ES5/ES6, CSS3 backdrop-filter & custom properties, TikTok Embed API / YouTube iframe / HTML5 Video, Node.js test runner.

---

## Global Constraints
- Rétrocompatibilité totale avec les projets existants n'ayant pas de vidéo (aucun changement visuel si `video_url` est vide).
- Aucun script tiers bloquant au chargement de la page : le lecteur vidéo n'est instancié qu'à l'ouverture de la modale (lazy loading).
- Maintien du score de tests : 115/115 tests au vert (`npm test`).

---

### Task 1: Backoffice — Ajout du champ `video_url`
**Files:**
- Modify: `assets/js/admin.js`

- [ ] Dans `pform(id, prefill)`, ajouter le champ `{ k: 'video_url', l: 'Lien vidéo / TikTok (Teaser)' }` juste après `preview`.
- [ ] Dans le callback de soumission, normaliser `o.video_url = String(o.video_url || '').trim()`.
- [ ] S'assurer que le champ est persisté et synchronisé avec `portfolio` et `portfolio_drafts`.

---

### Task 2: Fiche projet — Intégration du bouton et de la visionneuse smartphone
**Files:**
- Modify: `assets/js/project-details.js`
- Modify: `assets/js/subpage-i18n.js`

- [ ] Dans `assets/js/subpage-i18n.js`, ajouter les traductions :
  - `'🎬 Teaser vidéo': '🎬 Video teaser'`
  - `'Fermer le teaser': 'Close teaser'`
- [ ] Dans `assets/js/project-details.js` :
  - Mapper `video_url` dans `buildProject` et `renderRemote`.
  - Implémenter le parseur `parseVideoUrl(url)` détectant TikTok (oEmbed / iframe `tiktok.com/embed/v2/<id>`), YouTube Shorts (`youtube.com/embed/<id>`), et fichiers directs `.mp4`.
  - Implémenter la fonction `openVideoTeaser(videoUrl, projectName)` créant le modal smartphone vertical avec overlay flouté, bouton fermer, support clavier `Escape` et focus trap.
  - Dans `renderActions(project)`, si `project.video_url` est présent, insérer le bouton `actionButton(null, '🎬 Teaser vidéo', 'btn-secondary btn-teaser', ICON.video, false)`.

---

### Task 3: Styles CSS — Cadre Smartphone & Responsive
**Files:**
- Modify: `assets/css/appearance.css` ou section dédiée dans `assets/js/project-details.js`

- [ ] Définir la structure `.phone-modal-backdrop`, `.phone-mockup`, `.phone-notch`, `.phone-screen`, `.phone-close`.
- [ ] Ratio 9:16 fluide adapté sur desktop (340px-380px max) et mobile (90vw / 80vh).
- [ ] Animations d'entrée / sortie douces et backdrop flouté (`backdrop-filter: blur(10px)`).

---

### Task 4: Tests de non-régression & Déploiement
**Files:**
- Modify: `tests/dom.test.mjs`

- [ ] Ajouter un test unitaire vérifiant l'affichage du bouton teaser lorsque `video_url` est défini et l'ouverture du modal smartphone.
- [ ] Exécuter `npm test` pour valider les 115+ tests.
- [ ] Commiter et pousser sur `origin main`.
