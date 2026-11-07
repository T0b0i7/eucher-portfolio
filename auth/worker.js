// Authentification GitHub pour l’espace admin (Cloudflare Worker).
// Variables à définir dans le Worker :
//   GITHUB_CLIENT_ID      identifiant de ton OAuth App GitHub
//   GITHUB_CLIENT_SECRET  secret de ton OAuth App (à stocker en « secret »)
//   ALLOWED_USER          ton nom d’utilisateur GitHub (le seul compte autorisé)
//   SECRET                longue chaîne aléatoire (à stocker en « secret »)
//   SITE_ORIGIN           adresse de ton site, par exemple https://mon-portfolio.pages.dev
const enc = new TextEncoder();
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
const key = (secret, usage) => crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, usage);

async function sign(payload, secret) {
  const body = b64u(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign('HMAC', await key(secret, ['sign']), enc.encode(body));
  return body + '.' + b64u(sig);
}
async function check(token, secret) {
  const [body, sig] = String(token || '').split('.');
  if (!body || !sig) return null;
  const ok = await crypto.subtle.verify('HMAC', await key(secret, ['verify']), fromB64u(sig), enc.encode(body));
  if (!ok) return null;
  const p = JSON.parse(new TextDecoder().decode(fromB64u(body)));
  return p.exp > Date.now() ? p : null;
}

export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.SITE_ORIGIN,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Vary': 'Origin',
    };
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const path = new URL(req.url).pathname;

    if (path.endsWith('/auth') && req.method === 'POST') {
      const { code } = await req.json().catch(() => ({}));
      if (!code) return json({ error: 'code manquant' }, 400);
      const r = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
      });
      const t = await r.json();
      if (!t.access_token) return json({ error: 'code refusé par GitHub' }, 401);
      const u = await (await fetch('https://api.github.com/user', {
        headers: { Authorization: 'Bearer ' + t.access_token, 'User-Agent': 'portfolio-admin', Accept: 'application/vnd.github+json' },
      })).json();
      if (!u.login || u.login.toLowerCase() !== String(env.ALLOWED_USER).toLowerCase()) return json({ error: 'compte non autorisé' }, 403);
      return json({ token: await sign({ u: u.login, exp: Date.now() + 8 * 3600 * 1000 }, env.SECRET), login: u.login });
    }

    if (path.endsWith('/verify')) {
      const p = await check((req.headers.get('Authorization') || '').replace(/^Bearer /, ''), env.SECRET);
      return p ? json({ ok: true, login: p.u }) : json({ ok: false }, 401);
    }
    return json({ error: 'introuvable' }, 404);
  },
};
