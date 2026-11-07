# Connexion GitHub pour l’espace admin

Seul le compte GitHub que tu autorises peut ouvrir l’espace admin. La page ne peut pas faire cette vérification toute seule : elle a besoin d’un petit serveur (le Worker de ce dossier) qui garde ton secret GitHub.

## Étapes

1. **Héberge le site** (Netlify, Vercel, Cloudflare Pages ou GitHub Pages) et note son adresse, par exemple `https://mon-portfolio.pages.dev`.
2. **Crée une OAuth App GitHub** : GitHub, Settings, Developer settings, OAuth Apps, New OAuth App.
   - Homepage URL : l’adresse de ton site.
   - Authorization callback URL : l’adresse exacte de ta page d’accueil (la même que ci-dessus, avec le `/` final si c’est ce que ton hébergeur affiche).
   - Note le *Client ID* et génère un *Client secret*.
3. **Crée un Worker Cloudflare** (gratuit) et colle-y le contenu de `worker.js`. Ajoute ses variables :
   - `GITHUB_CLIENT_ID` : le Client ID
   - `GITHUB_CLIENT_SECRET` : le Client secret (type « secret »)
   - `ALLOWED_USER` : ton nom d’utilisateur GitHub
   - `SECRET` : une longue chaîne aléatoire (type « secret »)
   - `SITE_ORIGIN` : l’adresse de ton site, sans `/` final
4. **Remplis la configuration dans `index.html`**, tout en bas du fichier, juste avant la dernière balise `<script>` :
   `window.EA_AUTH={clientId:'TON_CLIENT_ID',api:'https://ton-worker.workers.dev'};`
5. Ouvre ton site et appuie sur `Ctrl + Maj + A` : le bouton « Se connecter avec GitHub » apparaît. La session dure 8 heures au maximum et s’arrête quand tu fermes l’onglet.

## À savoir

- Tant que la configuration est vide, personne ne peut ouvrir l’espace admin depuis le ZIP.
- Cette connexion ne fonctionne que sur un site hébergé (Netlify, Vercel, Cloudflare Pages ou GitHub Pages), avec le Worker configuré : elle ne peut pas s’exécuter en ouvrant simplement `index.html`.
- Tes contenus restent enregistrés dans ton navigateur : la connexion protège l’accès à l’interface, pas un serveur de données.
