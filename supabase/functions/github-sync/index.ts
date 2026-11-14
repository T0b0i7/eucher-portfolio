// Supabase Edge Function — synchronisation GitHub (P3)
// Déploiement : supabase functions deploy github-sync --no-verify-jwt? NON :
// on vérifie le JWT puis is_owner() côté base.
// Secrets : SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (auto),
//           GITHUB_TOKEN (PAT fine-grained, lecture des dépôts et commits).
//
// Entrées :
//  - POST { projectId?: uuid, repo?: "owner/name", limit?: number }
//  - ou webhook GitHub "push" avec header x-hub-signature-256 + GITHUB_WEBHOOK_SECRET.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-hub-signature-256, x-github-event',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}

function classify(message) {
  const m = String(message || '').toLowerCase().trim();
  if (!m) return 'other';
  if (/^(revert|rollback)/.test(m)) return 'revert';
  if (/^[a-z]+(\([^)]*\))?!?:\s*(feat|feature)/.test(m) || /^(feat|feature|add|ajout|nouveau)\b/.test(m)) return 'feat';
  if (/^[a-z]+(\([^)]*\))?!?:\s*(fix|bugfix|hotfix)/.test(m) || /^(fix|bugfix|hotfix|corrige|correction)\b/.test(m)) return 'fix';
  if (/^[a-z]+(\([^)]*\))?!?:\s*refactor/.test(m) || /^(refactor|refacto|renomme|rename)\b/.test(m)) return 'refactor';
  if (/^[a-z]+(\([^)]*\))?!?:\s*docs?/.test(m) || /^(docs?|doc|documentation)\b/.test(m)) return 'docs';
  if (/^[a-z]+(\([^)]*\))?!?:\s*perf/.test(m) || /^(perf|performance|optim)\b/.test(m)) return 'perf';
  if (/^[a-z]+(\([^)]*\))?!?:\s*(test|tests)/.test(m) || /^(test|tests|testing)\b/.test(m)) return 'test';
  if (/^[a-z]+(\([^)]*\))?!?:\s*(ci|build|chore|deps|bump)/.test(m) || /^(ci|build|chore|deps|bump|release)\b/.test(m)) return 'chore';
  if (/^[a-z]+(\([^)]*\))?!?:\s*style/.test(m) || /^(style|format|lint)\b/.test(m)) return 'style';
  if (/^[a-z]+(\([^)]*\))?!?:\s*(improve|improvement)/.test(m) || /^(improve|improvement|amelior|amélior|enhance)\b/.test(m)) return 'improvement';
  return 'other';
}

function repoFromUrl(url) {
  const match = String(url || '').match(/github\.com\/([^/]+\/[^/#?]+)/i);
  return match ? match[1].replace(/\.git$/, '') : '';
}

async function verifyOwner(req, admin) {
  const auth = req.headers.get('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const userClient = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_ANON_KEY') || '', {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userData || !userData.user) return null;
  const { data: owner, error } = await admin.rpc('is_owner');
  if (error || owner !== true) return null;
  return userData.user;
}

async function github(path) {
  const token = Deno.env.get('GITHUB_TOKEN') || '';
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'tobidev-portfolio-sync' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${res.status} sur ${path}`);
  return res.json();
}

async function syncRepository(admin, project, fullName, limit) {
  const repo = await github(`/repos/${fullName}`);
  const commits = await github(`/repos/${fullName}/commits?per_page=${Math.min(Math.max(limit || 30, 1), 100)}`);
  const { data: repository, error: repoError } = await admin
    .from('portfolio_github_repositories')
    .upsert({
      project_id: project.id,
      full_name: repo.full_name,
      default_branch: repo.default_branch,
      html_url: repo.html_url,
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, { onConflict: 'project_id' })
    .select('id')
    .single();
  if (repoError) throw repoError;

  const rows = commits.map((commit) => ({
    repository_id: repository.id,
    sha: commit.sha,
    message: String(commit.commit && commit.commit.message || '').slice(0, 2000),
    author_name: commit.commit && commit.commit.author && commit.commit.author.name || null,
    author_login: commit.author && commit.author.login || null,
    committed_at: commit.commit && commit.commit.author && commit.commit.author.date || null,
    html_url: commit.html_url || null,
    category: classify(commit.commit && commit.commit.message)
  }));
  if (rows.length) {
    const { error } = await admin.from('portfolio_github_commits').upsert(rows, { onConflict: 'repository_id,sha' });
    if (error) throw error;
  }
  return { repository: repo.full_name, commits: rows.length };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Méthode non autorisée' }, 405);

  const admin = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '');
  let payload = {};
  try { payload = await req.json(); } catch (_) { payload = {}; }

  // Webhook GitHub signé (optionnel)
  const event = req.headers.get('x-github-event');
  if (event) {
    const secret = Deno.env.get('GITHUB_WEBHOOK_SECRET') || '';
    const signature = req.headers.get('x-hub-signature-256') || '';
    if (secret && signature) {
      const body = JSON.stringify(payload);
      const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
      const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
      const expected = 'sha256=' + Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
      if (expected !== signature) return json({ error: 'Signature invalide' }, 401);
    }
    if (event === 'push' && payload.repository) {
      const fullName = payload.repository.full_name;
      const { data: repoRow } = await admin.from('portfolio_github_repositories').select('project_id').eq('full_name', fullName).maybeSingle();
      if (!repoRow) return json({ ignored: 'dépôt non associé' }, 202);
      const { data: project } = await admin.from('portfolio_projects').select('id').eq('id', repoRow.project_id).maybeSingle();
      if (!project) return json({ ignored: 'projet absent' }, 202);
      try {
        const result = await syncRepository(admin, project, fullName, 30);
        return json({ ok: true, ...result });
      } catch (error) {
        return json({ error: String(error.message || error) }, 502);
      }
    }
    return json({ ignored: event }, 202);
  }

  const user = await verifyOwner(req, admin);
  if (!user) return json({ error: 'Non autorisé' }, 401);

  const limit = Number(payload.limit || 30);
  let project = null;
  if (payload.projectId) {
    const { data } = await admin.from('portfolio_projects').select('id,slug,title,repo_url').eq('id', payload.projectId).maybeSingle();
    project = data;
  }
  if (!project && payload.repo) {
    const { data } = await admin.from('portfolio_projects').select('id,slug,title,repo_url').ilike('repo_url', `%${payload.repo}%`).limit(1).maybeSingle();
    project = data;
  }
  const fullName = String(payload.repo || repoFromUrl(project && project.repo_url));
  if (!project || !fullName) return json({ error: 'Projet ou dépôt introuvable (repo_url manquant ?)' }, 400);

  try {
    const result = await syncRepository(admin, project, fullName, limit);
    return json({ ok: true, user: user.email || user.id, ...result });
  } catch (error) {
    return json({ error: String(error.message || error) }, 502);
  }
});
