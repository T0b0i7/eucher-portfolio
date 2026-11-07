# Déployer la connexion GitHub

## 1. Créer l’OAuth App GitHub
GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.

- Homepage URL : `https://ton-site.example`
- Authorization callback URL : `https://ton-site.example/` (ou l’URL exacte de `index.html`)

Note le Client ID, puis génère un Client secret.

## 2. Déployer le Worker
```bash
npm install -g wrangler
cd auth
wrangler login
wrangler deploy
```

Renseigne les secrets (jamais dans le fichier) :
```bash
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put SECRET
```

Puis dans `wrangler.toml`, remplace :
- `ALLOWED_USER` par ton pseudo GitHub
- `SITE_ORIGIN` par l’URL de ton site, sans `/` final

Redéploie après modification :
```bash
wrangler deploy
```

## 3. Configurer le site
Dans `index.html`, remplace la ligne `window.EA_AUTH` :
```js
window.EA_AUTH={clientId:'TON_CLIENT_ID',api:'https://portfolio-auth.TON-SOUS-DOMAINE.workers.dev'};
```

## 4. Vérifier
Ouvre le site, clique sur `🔒 Connexion`, connecte-toi avec le compte GitHub autorisé.
La session dure 8 heures et se ferme avec l’onglet.

## Test local
- Site : `python -m http.server 8000`
- Worker : `wrangler dev --port 8787`
- Callback GitHub : `http://localhost:8000/`
- `window.EA_AUTH.api = 'http://localhost:8787'`

## Rappel
Les contenus de l’admin restent dans `localStorage`. La connexion protège l’interface, pas un serveur de données.
