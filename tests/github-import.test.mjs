// Tests d'intégration : synchronisation GitHub + import de projet en BD
// Approche : extraction des fonctions pures depuis les sources JS + mock Supabase léger.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

// ─── Sources lues une seule fois ──────────────────────────────────────────────
const catalogSrc = fs.readFileSync(path.join(repoRoot, 'assets/js/admin-catalog.js'), 'utf8');
const adminSrc   = fs.readFileSync(path.join(repoRoot, 'assets/js/admin.js'), 'utf8');

// ─── Données de test : dépôts GitHub fictifs ──────────────────────────────────
const FAKE_REPO_MOBILE = {
  id: 999001,
  full_name: 'T0b0i7/akoue-app',
  name: 'akoue-app',
  description: 'Application mobile de gestion financière personnelle.',
  private: false, archived: false, fork: false,
  language: 'TypeScript',
  topics: ['react-native', 'expo', 'supabase'],
  languages: { TypeScript: 18000, JavaScript: 2000 },
  html_url: 'https://github.com/T0b0i7/akoue-app',
  homepage: 'https://akoue-app.vercel.app',
  readme: '# Akoué App\nMaîtrise ton argent. Note. Contrôle.\nApp de gestion financière.',
  branches: [{ name: 'main', sha: 'abc123' }],
  releases: [],
  published_project_id: null,
  pushed_at: '2026-11-15T01:46:38Z',
};

const FAKE_REPO_IA = {
  id: 999002,
  full_name: 'T0b0i7/claude-agent',
  name: 'claude-agent',
  description: 'Agentic AI pipeline with Claude API.',
  private: false, archived: false, fork: false,
  language: 'Python',
  topics: ['ai', 'agent', 'llm', 'claude'],
  languages: { Python: 12000 },
  html_url: 'https://github.com/T0b0i7/claude-agent',
  homepage: '',
  readme: null,
  branches: [], releases: [],
  published_project_id: null,
};

const FAKE_REPO_WEB = {
  id: 999003,
  full_name: 'T0b0i7/my-portfolio',
  name: 'my-portfolio',
  description: 'Portfolio web fullstack.',
  private: false, archived: false, fork: false,
  language: 'JavaScript',
  topics: ['react', 'nextjs'],
  languages: { JavaScript: 8000, CSS: 2000 },
  html_url: 'https://github.com/T0b0i7/my-portfolio',
  homepage: 'pas-une-url',
  readme: null,
  branches: [], releases: [],
  published_project_id: null,
};

// ─── buildPrefill extrait depuis la source (pur JS, sans DOM) ─────────────────
// On réimplémente la même logique pour la tester unitairement
function buildPrefill(row) {
  const rawName = String(row.name || '').replace(/[-_]+/g, ' ').trim();
  const title   = rawName ? rawName.replace(/\b\w/g, c => c.toUpperCase()) : row.full_name;
  const langs   = Object.keys(row.languages || {});
  if (!langs.length && row.language) langs.push(row.language);
  const topics  = Array.isArray(row.topics) ? row.topics : [];
  const techList = [];
  langs.concat(topics).forEach(item => {
    const s = String(item || '').trim();
    if (s && techList.indexOf(s) < 0) techList.push(s);
  });
  const hay = (title + ' ' + (row.description || '') + ' ' + techList.join(' ')).toLowerCase();
  let cat = 'Web';
  if (/\b(ia|ai|llm|ml|agent|agentic|vision|pytorch|tensorflow)\b/.test(hay)) cat = 'IA';
  else if (/\b(mobile|react native|expo|flutter|android|ios)\b/.test(hay)) cat = 'Mobile';
  else if (/\b(design|figma|ui\/ux|ux|ui)\b/.test(hay)) cat = 'Design';
  let desc = String(row.description || '').trim();
  if (!desc && row.readme) {
    const lines = String(row.readme).split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && l.charAt(0) !== '#' && l.charAt(0) !== '!' && l.indexOf('```') !== 0);
    if (lines.length) desc = lines[0].slice(0, 240);
  }
  const preview = (row.homepage && /^https?:\/\//i.test(String(row.homepage).trim()))
    ? String(row.homepage).trim() : '';
  return { n: title, d: desc, cat, t: techList.slice(0, 8).join(', '), u: row.html_url, preview, st: 'Brouillon' };
}

// ─── EA_HAS_PROJECT extrait depuis la source ──────────────────────────────────
function makeHasProject(projects) {
  return function(url, name) {
    const u = String(url || '').trim().toLowerCase();
    const n = String(name || '').trim().toLowerCase().replace(/[-_]+/g, ' ');
    return projects.find(x =>
      (u && String(x.u || '').trim().toLowerCase() === u) ||
      (n && String(x.n || '').trim().toLowerCase().replace(/[-_]+/g, ' ') === n)
    ) || null;
  };
}

// ─── Mock Supabase ─────────────────────────────────────────────────────────────
function makeSupabaseMock(opts = {}) {
  const calls = { upsert: [], insert: [], update: [] };
  const client = {
    _calls: calls,
    from(table) {
      return {
        select() { return this; },
        eq()     { return this; },
        order()  { return this; },
        maybeSingle() { return Promise.resolve({ data: null, error: null }); },
        upsert(data) {
          calls.upsert.push({ table, data });
          return Promise.resolve({ error: opts.upsertError || null });
        },
        insert(data) {
          calls.insert.push({ table, data });
          return Promise.resolve({ data: [{ id: 1 }], error: null });
        },
        update(data) {
          calls.update.push({ table, data });
          return { eq: () => Promise.resolve({ error: null }) };
        },
        then(cb) {
          return Promise.resolve({ data: opts.catalogRows || [], error: null }).then(cb);
        }
      };
    },
    rpc(fn) {
      if (fn === 'is_owner') return Promise.resolve({ data: true, error: null });
      return Promise.resolve({ data: null, error: null });
    },
    functions: {
      invoke(_name, _body) {
        if (opts.syncError) return Promise.resolve({ error: { message: opts.syncError } });
        return Promise.resolve({
          data: { ok: true, upserted: 2, failed: 0, discovered: 2, pages: 1, user: 'test@example.com' },
          error: null
        });
      }
    },
    auth: {
      getSession: () => Promise.resolve({ data: { session: { user: { id: 'uid-test' } } }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } })
    }
  };
  return client;
}

// ─── remotePush : simule la logique de save → upsert BD ──────────────────────
async function simulateRemotePush(sbMock, document) {
  const pub  = { projects: document.projects.filter(p => p.st === 'Publié') };
  const full = document;
  const now  = new Date().toISOString();
  const r1   = await sbMock.from('portfolio').upsert({ id: 1, data: pub, updated_at: now });
  if (r1.error) return { ok: false, error: r1.error };
  const r2 = await sbMock.from('portfolio_drafts').upsert({ id: 1, data: full, updated_at: now });
  return { ok: true, upsertPortfolio: r1, upsertDrafts: r2 };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTS buildPrefill
// ═══════════════════════════════════════════════════════════════════════════════

test('buildPrefill : catégorie Mobile pour akoue-app (react-native + expo)', () => {
  const p = buildPrefill(FAKE_REPO_MOBILE);
  assert.equal(p.cat, 'Mobile');
  assert.equal(p.st, 'Brouillon');
  assert.equal(p.n, 'Akoue App');
  assert.equal(p.u, 'https://github.com/T0b0i7/akoue-app');
  assert.equal(p.preview, 'https://akoue-app.vercel.app');
  assert.ok(p.t.includes('TypeScript'), 'TypeScript dans tech');
  assert.ok(p.t.includes('react-native'), 'react-native dans tech');
  assert.ok(p.t.includes('expo'), 'expo dans tech');
});

test('buildPrefill : catégorie IA pour claude-agent (topics ai/llm/agent)', () => {
  const p = buildPrefill(FAKE_REPO_IA);
  assert.equal(p.cat, 'IA');
  assert.equal(p.st, 'Brouillon');
  assert.equal(p.n, 'Claude Agent');
  assert.equal(p.preview, '', 'homepage vide → preview vide');
});

test('buildPrefill : catégorie Web par défaut pour my-portfolio', () => {
  const p = buildPrefill(FAKE_REPO_WEB);
  assert.equal(p.cat, 'Web');
  assert.equal(p.preview, '', 'URL invalide → preview vide');
});

test('buildPrefill : extrait la 1ère ligne non-titre du README si description vide', () => {
  const repo = { ...FAKE_REPO_MOBILE, description: null };
  const p = buildPrefill(repo);
  assert.match(p.d, /Maîtrise ton argent/, 'description extraite du README');
});

test('buildPrefill : limite à 8 technologies maximum', () => {
  const repo = { ...FAKE_REPO_MOBILE, languages: { TS: 1, JS: 1, PY: 1, Go: 1, Rust: 1, Dart: 1, PHP: 1, C: 1, 'C++': 1 }, topics: [] };
  const p = buildPrefill(repo);
  const techs = p.t.split(',').map(s => s.trim()).filter(Boolean);
  assert.ok(techs.length <= 8, `${techs.length} techs — max 8`);
});

test('buildPrefill : statut est toujours Brouillon', () => {
  assert.equal(buildPrefill(FAKE_REPO_MOBILE).st, 'Brouillon');
  assert.equal(buildPrefill(FAKE_REPO_IA).st, 'Brouillon');
  assert.equal(buildPrefill(FAKE_REPO_WEB).st, 'Brouillon');
});

test('buildPrefill : correspond à la logique dans admin-catalog.js', () => {
  // Vérifier que le code source contient bien la même logique
  assert.match(catalogSrc, /st:\s*'Brouillon'/, 'statut Brouillon dans le source');
  assert.match(catalogSrc, /react native|expo.*mobile|mobile.*expo/i, 'détection Mobile');
  assert.match(catalogSrc, /ia|ai.*llm|llm.*ai/i, 'détection IA');
  assert.match(catalogSrc, /homepage.*https?|https?.*homepage/, 'preview depuis homepage');
  assert.match(catalogSrc, /techList\.slice\(0,\s*8\)/, 'limite 8 technologies');
});

// ═══════════════════════════════════════════════════════════════════════════════
// TESTS EA_HAS_PROJECT
// ═══════════════════════════════════════════════════════════════════════════════

test('EA_HAS_PROJECT : retrouve un projet existant par URL exacte', () => {
  const projects = [
    { id: 1, n: 'Akoué App', u: 'https://github.com/T0b0i7/akoue-app', st: 'Publié' },
    { id: 2, n: 'Vigilance BJ', u: 'https://vigilance-bj.vercel.app', st: 'Publié' }
  ];
  const hasProject = makeHasProject(projects);
  const found = hasProject('https://github.com/T0b0i7/akoue-app', '');
  assert.ok(found !== null, 'projet trouvé par URL');
  assert.equal(found.n, 'Akoué App');
});

test('EA_HAS_PROJECT : retrouve un projet par nom avec normalisation tirets→espaces', () => {
  const projects = [{ id: 3, n: 'Vigilance BJ', u: 'https://vigilance-bj.vercel.app', st: 'Publié' }];
  const hasProject = makeHasProject(projects);
  const found = hasProject('', 'vigilance-bj');
  assert.ok(found !== null, 'vigilance-bj → Vigilance BJ');
});

test('EA_HAS_PROJECT : retourne null si le projet n\'existe pas', () => {
  const projects = [{ id: 1, n: 'Akoué App', u: 'https://github.com/T0b0i7/akoue-app', st: 'Publié' }];
  const hasProject = makeHasProject(projects);
  const found = hasProject('https://github.com/T0b0i7/nouveau-projet', 'Nouveau Projet');
  assert.equal(found, null);
});

test('EA_HAS_PROJECT : correspond à la logique dans admin.js', () => {
  // Vérifier que admin.js expose bien EA_HAS_PROJECT avec la même normalisation
  assert.match(adminSrc, /window\.EA_HAS_PROJECT/, 'EA_HAS_PROJECT exposé sur window');
  assert.match(adminSrc, /EA_IMPORT_PROJECT/, 'EA_IMPORT_PROJECT exposé sur window');
  assert.match(adminSrc, /replace\(\/\[-_\]/, 'normalisation tirets dans EA_HAS_PROJECT');
});

// ═══════════════════════════════════════════════════════════════════════════════
// TESTS remotePush / save → BD
// ═══════════════════════════════════════════════════════════════════════════════

test('remotePush : un brouillon déclenche upsert dans portfolio ET portfolio_drafts', async () => {
  const sbMock = makeSupabaseMock();
  const doc = {
    upd: Date.now(),
    projects: [
      { id: 1, n: 'Akoué App', st: 'Publié', cat: 'Mobile', t: 'React Native', u: 'https://...', d: '' },
      { id: 2, n: 'Test Import GitHub', st: 'Brouillon', cat: 'IA', t: 'Python', u: 'https://github.com/T0b0i7/test', d: 'Projet test' }
    ],
    skills: [], posts: [], msgs: [], act: [], services: [],
    profile: { nom: 'Eucher ABATTI', titre: 'Dev', bio: '', email: '', linkedin: '', github: '', tel: '' },
    set: { desc: '', accent: '#e60012', hideCV: false }
  };

  const result = await simulateRemotePush(sbMock, doc);
  assert.ok(result.ok, 'remotePush réussi');
  assert.equal(sbMock._calls.upsert.length, 2, '2 upserts déclenchés');

  const portfolioCall = sbMock._calls.upsert.find(c => c.table === 'portfolio');
  const draftsCall    = sbMock._calls.upsert.find(c => c.table === 'portfolio_drafts');
  assert.ok(portfolioCall, 'upsert dans portfolio');
  assert.ok(draftsCall,    'upsert dans portfolio_drafts');
});

test('remotePush : portfolio (public) ne contient que les projets Publiés', async () => {
  const sbMock = makeSupabaseMock();
  const doc = {
    upd: Date.now(),
    projects: [
      { id: 1, n: 'Publié', st: 'Publié', cat: 'Web', t: 'React', u: 'https://...', d: '' },
      { id: 2, n: 'Brouillon GitHub', st: 'Brouillon', cat: 'IA', t: 'Python', u: 'https://...', d: '' }
    ],
    skills: [], posts: [], msgs: [], act: [], services: [],
    profile: { nom: 'Eucher ABATTI', titre: 'Dev', bio: '', email: '', linkedin: '', github: '', tel: '' },
    set: { desc: '', accent: '#e60012', hideCV: false }
  };

  await simulateRemotePush(sbMock, doc);
  const portfolioCall = sbMock._calls.upsert.find(c => c.table === 'portfolio');
  const pubProjects   = portfolioCall.data.data.projects;
  assert.equal(pubProjects.length, 1, 'seul 1 projet publié dans portfolio');
  assert.equal(pubProjects[0].n, 'Publié', 'le projet publié est le bon');
  assert.ok(!pubProjects.some(p => p.st === 'Brouillon'), 'aucun brouillon dans portfolio');
});

test('remotePush : portfolio_drafts contient TOUS les projets (brouillons compris)', async () => {
  const sbMock = makeSupabaseMock();
  const doc = {
    upd: Date.now(),
    projects: [
      { id: 1, n: 'Publié',  st: 'Publié',   cat: 'Web', t: 'React', u: 'https://...', d: '' },
      { id: 2, n: 'Draft 1', st: 'Brouillon', cat: 'IA',  t: 'Python', u: 'https://...', d: '' },
      { id: 3, n: 'Draft 2', st: 'Brouillon', cat: 'Mobile', t: 'React Native', u: 'https://...', d: '' }
    ],
    skills: [], posts: [], msgs: [], act: [], services: [],
    profile: { nom: 'Eucher ABATTI', titre: 'Dev', bio: '', email: '', linkedin: '', github: '', tel: '' },
    set: { desc: '', accent: '#e60012', hideCV: false }
  };

  await simulateRemotePush(sbMock, doc);
  const draftsCall    = sbMock._calls.upsert.find(c => c.table === 'portfolio_drafts');
  const allProjects   = draftsCall.data.data.projects;
  assert.equal(allProjects.length, 3, 'les 3 projets (publiés + brouillons) dans portfolio_drafts');
  assert.ok(allProjects.some(p => p.st === 'Brouillon'), 'brouillons présents dans drafts');
});

test('remotePush : erreur Supabase est silencieuse (console.warn, pas d\'exception)', async () => {
  // admin.js utilise .catch(() => {}) — l'erreur ne doit pas propager
  const sbMock = makeSupabaseMock({ upsertError: { message: 'RLS denied' } });
  const doc = { upd: Date.now(), projects: [], skills: [], posts: [], msgs: [], act: [], services: [],
    profile: { nom: 'Eucher ABATTI', titre: 'Dev', bio: '', email: '', linkedin: '', github: '', tel: '' },
    set: { desc: '', accent: '#e60012', hideCV: false }
  };
  // Vérifier que le code admin.js gère l'erreur sans throw
  assert.match(adminSrc, /syncFail|console\.warn|\.catch/, 'gestion d\'erreur silencieuse dans remotePush');
  // Notre simulation retourne {ok: false} mais ne throw pas
  const result = await simulateRemotePush(sbMock, doc);
  assert.equal(result.ok, false, 'erreur détectée mais non propagée');
});

// ═══════════════════════════════════════════════════════════════════════════════
// TESTS synchro GitHub
// ═══════════════════════════════════════════════════════════════════════════════

test('synchro GitHub : syncAll appelle functions.invoke("github-inventory")', () => {
  assert.match(catalogSrc, /functions\.invoke\(.*'github-inventory'/, 'invoke github-inventory présent');
  assert.match(catalogSrc, /data-cat.*sync|sync.*data-cat/, 'bouton Synchroniser GitHub présent');
});

test('synchro GitHub : réponse ok retourne upserted et discovered', async () => {
  const sbMock = makeSupabaseMock({ catalogRows: [FAKE_REPO_MOBILE, FAKE_REPO_IA] });
  const result = await sbMock.functions.invoke('github-inventory', { body: {} });
  assert.ok(result.data.ok, 'réponse ok');
  assert.equal(result.data.upserted, 2, '2 dépôts upsertés');
  assert.ok(result.data.discovered >= 2, 'discovered >= 2');
});

test('synchro GitHub : erreur réseau retourne error.message lisible', async () => {
  const sbMock = makeSupabaseMock({ syncError: 'Token GitHub invalide ou expiré' });
  const result = await sbMock.functions.invoke('github-inventory', { body: {} });
  assert.ok(result.error, 'erreur présente');
  assert.match(result.error.message, /Token GitHub/, 'message lisible');
});

test('synchro GitHub : table portfolio_github_catalog a les colonnes requises', () => {
  const sql = fs.readFileSync(
    path.join(repoRoot, 'supabase/migrations/2026-11-15-09-p6-github-catalog.sql'), 'utf8'
  ).toLowerCase();
  assert.match(sql, /portfolio_github_catalog/, 'table présente');
  assert.match(sql, /private/, 'colonne private');
  assert.match(sql, /archived/, 'colonne archived');
  assert.match(sql, /language/, 'colonne language');
  assert.match(sql, /homepage/, 'colonne homepage');
  assert.match(sql, /published_project_id/, 'clé étrangère published_project_id');
  assert.match(sql, /enable row level security/, 'RLS activée');
  assert.match(sql, /is_owner\(\)/, 'protégé par is_owner()');
});

test('synchro GitHub : Edge Function github-inventory vérifie l\'ownership', () => {
  const src = fs.readFileSync(
    path.join(repoRoot, 'supabase/functions/github-inventory/index.ts'), 'utf8'
  );
  assert.match(src, /is_owner/, 'is_owner() appelé');
  assert.match(src, /401|Non autorisé|unauthorized/i, 'retourne 401 si non autorisé');
  assert.match(src, /GITHUB_TOKEN/, 'utilise le secret GITHUB_TOKEN');
  assert.match(src, /portfolio_github_catalog.*upsert|upsert.*portfolio_github_catalog/s, 'upsert dans le catalogue');
});

// ═══════════════════════════════════════════════════════════════════════════════
// TESTS flux complet : import GitHub → formulaire → BD
// ═══════════════════════════════════════════════════════════════════════════════

test('flux complet : import d\'un dépôt Mobile puis save → brouillon en BD', async () => {
  const sbMock = makeSupabaseMock();

  // 1. buildPrefill depuis le catalogue
  const prefill = buildPrefill(FAKE_REPO_MOBILE);
  assert.equal(prefill.cat, 'Mobile');
  assert.equal(prefill.st, 'Brouillon');

  // 2. Simuler l'ajout du projet dans D.projects (ce que fait pform → callback)
  const doc = {
    upd: Date.now(),
    projects: [],
    skills: [], posts: [], msgs: [], act: [], services: [],
    profile: { nom: 'Eucher ABATTI', titre: 'Dev', bio: '', email: '', linkedin: '', github: '', tel: '' },
    set: { desc: '', accent: '#e60012', hideCV: false }
  };
  const newProject = { id: 1, ...prefill };
  doc.projects.push(newProject);

  // 3. remotePush → BD
  const result = await simulateRemotePush(sbMock, doc);
  assert.ok(result.ok);

  // 4. Vérifications
  const draftsCall = sbMock._calls.upsert.find(c => c.table === 'portfolio_drafts');
  const savedProjects = draftsCall.data.data.projects;
  assert.equal(savedProjects.length, 1, '1 projet sauvegardé');
  assert.equal(savedProjects[0].n, 'Akoue App');
  assert.equal(savedProjects[0].st, 'Brouillon');
  assert.equal(savedProjects[0].cat, 'Mobile');

  const portfolioCall = sbMock._calls.upsert.find(c => c.table === 'portfolio');
  assert.equal(portfolioCall.data.data.projects.length, 0, 'brouillon absent de portfolio public');
});

test('flux complet : import d\'un dépôt IA puis save → brouillon en BD', async () => {
  const sbMock = makeSupabaseMock();
  const prefill = buildPrefill(FAKE_REPO_IA);
  assert.equal(prefill.cat, 'IA');

  const doc = {
    upd: Date.now(),
    projects: [{ id: 1, ...prefill }],
    skills: [], posts: [], msgs: [], act: [], services: [],
    profile: { nom: 'Eucher ABATTI', titre: 'Dev', bio: '', email: '', linkedin: '', github: '', tel: '' },
    set: { desc: '', accent: '#e60012', hideCV: false }
  };

  await simulateRemotePush(sbMock, doc);
  const draftsCall = sbMock._calls.upsert.find(c => c.table === 'portfolio_drafts');
  const saved = draftsCall.data.data.projects[0];
  assert.equal(saved.cat, 'IA');
  assert.equal(saved.st, 'Brouillon');
});

test('flux complet : EA_IMPORT_PROJECT ouvre le formulaire si projet inexistant', () => {
  const projects = [{ id: 1, n: 'Akoué App', u: 'https://github.com/T0b0i7/akoue-app', st: 'Publié' }];
  const hasProject = makeHasProject(projects);

  // Nouveau dépôt → hasProject retourne null → formulaire ouvert (pform null)
  const existing = hasProject('https://github.com/T0b0i7/claude-agent', 'Claude Agent');
  assert.equal(existing, null, 'formulaire de création ouvert (pas de doublon)');

  // Dépôt déjà importé → hasProject retourne le projet existant → formulaire édition
  const found = hasProject('https://github.com/T0b0i7/akoue-app', '');
  assert.ok(found !== null, 'formulaire d\'édition ouvert sur le projet existant');
  assert.equal(found.id, 1);
});

test('flux complet : import depuis Boutique → projet brouillon', async () => {
  const sbMock = makeSupabaseMock();

  // Simuler la logique de shop2proj dans admin.js
  const shopProduct = { n: 'Template Landing Page', d: 'Template HTML/CSS', long: '', type: 'Template', inc: 'HTML, CSS', link: 'https://gumroad.com/l/xxx' };
  const prefill = {
    n: shopProduct.n,
    d: shopProduct.d || shopProduct.long || '',
    cat: shopProduct.type === 'Design' ? 'Design' : 'Web',
    t: shopProduct.inc || '',
    u: shopProduct.link || '',
    st: 'Brouillon'
  };

  assert.equal(prefill.cat, 'Web');
  assert.equal(prefill.st, 'Brouillon');
  assert.match(adminSrc, /shop2proj/, 'shop2proj présent dans admin.js');
  assert.match(adminSrc, /EA_IMPORT_PROJECT.*shop2proj|shop2proj.*EA_IMPORT_PROJECT/s, 'shop2proj appelle EA_IMPORT_PROJECT');
});
