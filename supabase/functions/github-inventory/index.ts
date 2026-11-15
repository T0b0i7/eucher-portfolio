// Supabase Edge Function — inventaire GitHub universel (P6)
// Synchronise TOUS les dépôts accessibles au token : publics, privés, archivés,
// forks. Aucune publication automatique : le catalogue reste privé (RLS owner).
// Secrets : GITHUB_TOKEN, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}
async function gh(path) {
  const token = Deno.env.get('GITHUB_TOKEN') || '';
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'User-Agent': 'tobidev-inventory' }
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ${res.status} ${path}`);
  return res.json();
}
async function verifyOwner(req, admin) {
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const userClient = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_ANON_KEY') || '', {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
  const { data, error } = await userClient.auth.getUser(token);
  if (error || !data || !data.user) return null;
  const { data: owner } = await userClient.rpc('is_owner');
  return owner === true ? data.user : null;
}
async function mapRepo(admin, repo, withDetails) {
  const base = {
    id: repo.id,
    full_name: repo.full_name,
    name: repo.name,
    owner_login: repo.owner && repo.owner.login || null,
    description: repo.description || null,
    private: !!repo.private,
    archived: !!repo.archived,
    fork: !!repo.fork,
    disabled: !!repo.disabled,
    language: repo.language || null,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    default_branch: repo.default_branch || null,
    html_url: repo.html_url || null,
    homepage: repo.homepage || null,
    stargazers_count: repo.stargazers_count || 0,
    forks_count: repo.forks_count || 0,
    open_issues_count: repo.open_issues_count || 0,
    github_created_at: repo.created_at || null,
    github_updated_at: repo.updated_at || null,
    pushed_at: repo.pushed_at || null,
    sync_status: 'synced',
    sync_error: null,
    synced_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  if (!withDetails) return base;
  try {
    if (repo.full_name && repo.size !== undefined) {
      const langs = await gh(`/repos/${repo.full_name}/languages`);
      base.languages = langs || {};
      const readme = await gh(`/repos/${repo.full_name}/readme`);
      base.readme = readme && readme.content
        ? atob(readme.content.replace(/\n/g, '')).slice(0, 20000)
        : null;
      const branches = await gh(`/repos/${repo.full_name}/branches?per_page=100`);
      base.branches = Array.isArray(branches) ? branches.map((b) => ({ name: b.name, sha: b.commit && b.commit.sha })) : [];
      const releases = await gh(`/repos/${repo.full_name}/releases?per_page=20`);
      base.releases = Array.isArray(releases) ? releases.map((r) => ({ tag: r.tag_name, name: r.name, published_at: r.published_at, url: r.html_url })) : [];
    }
  } catch (error) {
    base.sync_status = 'partial';
    base.sync_error = String(error.message || error).slice(0, 500);
  }
  return base;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Méthode non autorisée' }, 405);
  const admin = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '');
  const user = await verifyOwner(req, admin);
  if (!user) return json({ error: 'Non autorisé' }, 401);

  let payload = {};
  try { payload = await req.json(); } catch (_) { payload = {}; }
  const withDetails = payload.details !== false;
  const maxPages = Math.min(Math.max(Number(payload.pages || 10), 1), 50);
  const repos = [];
  let page = 1;
  while (page <= maxPages) {
    const batch = await gh(`/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member&visibility=all&sort=updated`);
    if (!Array.isArray(batch) || !batch.length) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  let upserted = 0;
  let failed = 0;
  const rows = [];
  for (const repo of repos) {
    try {
      rows.push(await mapRepo(admin, repo, withDetails));
    } catch (error) {
      failed += 1;
    }
  }
  for (let i = 0; i < rows.length; i += 25) {
    const chunk = rows.slice(i, i + 25);
    const { error } = await admin.from('portfolio_github_catalog').upsert(chunk, { onConflict: 'id' });
    if (error) { failed += chunk.length; } else { upserted += chunk.length; }
  }

  return json({
    ok: true,
    user: user.email || user.id,
    discovered: repos.length,
    upserted,
    failed,
    details: withDetails,
    pages: page - 1
  });
});
