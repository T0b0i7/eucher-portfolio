// Tests unitaires de la couche API publique (fetch mocké, aucune base requise).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { repoRoot } from './helpers.mjs';

function loadApi() {
  const code = fs.readFileSync(path.join(repoRoot, 'assets/js/api.js'), 'utf8');
  const sandbox = { module: { exports: {} }, exports: {}, console };
  vm.runInNewContext(code, sandbox, { filename: 'api.js' });
  return sandbox.module.exports;
}

const { createApi } = loadApi();

function response(body, contentRange) {
  return Promise.resolve({
    ok: true,
    status: 200,
    headers: { get: (name) => (String(name).toLowerCase() === 'content-range' ? contentRange || null : null) },
    json: () => Promise.resolve(body),
    text: () => Promise.resolve('')
  });
}

function failResponse(status) {
  return Promise.resolve({
    ok: false,
    status,
    headers: { get: () => null },
    json: () => Promise.resolve(null),
    text: () => Promise.resolve('')
  });
}

function projectRow(overrides = {}) {
  return Object.assign({
    id: 'uuid-1',
    slug: 'akoue-app',
    title: 'Akouè App',
    short_desc: 'Gestion financière',
    long_desc: 'Description longue.',
    status: 'published',
    featured: true,
    sort_order: 1,
    demo_url: 'https://akoue-app.vercel.app',
    repo_url: null,
    demo_visible: true,
    repo_visible: false,
    published_at: '2026-11-14T00:00:00Z',
    updated_at: '2026-11-14T00:00:00Z',
    impact: [],
    features: ['Portefeuilles'],
    portfolio_project_categories: [{ portfolio_categories: { slug: 'mobile', name: 'Mobile' } }],
    portfolio_project_tags: [{ portfolio_tags: { slug: 'mobile', name: 'Mobile' } }],
    portfolio_project_technologies: [{ portfolio_technologies: { slug: 'react-native', name: 'React Native', icon: 'react' } }],
    project_media: []
  }, overrides);
}

function apiWith(handler, key = 'publishable-key') {
  return createApi({ url: 'https://demo.supabase.co', key, fetchImpl: handler, timeoutMs: 50 });
}

test('listProjects : requête paginée des seuls projets publiés', async () => {
  let captured;
  const api = apiWith((url, options) => { captured = { url, options }; return response([projectRow()], '0-0/1'); });
  const result = await api.listProjects();
  const decoded = decodeURIComponent(captured.url);
  assert.match(decoded, /status=eq\.published/);
  assert.match(decoded, /order=featured\.desc,sort_order\.asc,published_at\.desc/);
  assert.match(decoded, /limit=12/);
  assert.match(decoded, /offset=0/);
  assert.match(decoded, /select=.*portfolio_project_technologies/);
  assert.equal(result.total, 1);
  assert.equal(result.hasMore, false);
  assert.equal(result.items[0].slug, 'akoue-app');
});

test('listProjects : filtres catégories et technologies combinables', async () => {
  let projectsUrl;
  const api = apiWith((url) => {
    const target = String(url);
    if (target.indexOf('/portfolio_categories') >= 0) {
      return response([{ id: 'cat-web' }, { id: 'cat-ia' }]);
    }
    if (target.indexOf('/portfolio_technologies') >= 0) return response([{ id: 'tech-react' }]);
    if (target.indexOf('/portfolio_projects') >= 0) { projectsUrl = target; return response([], '0-0/0'); }
    return response([]);
  });
  await api.listProjects({ categories: ['web', 'ia'], technologies: ['react'], page: 2, perPage: 6 });
  const decoded = decodeURIComponent(projectsUrl || '');
  assert.match(decoded, /portfolio_project_categories\.category_id=in\.\(cat-web,cat-ia\)/);
  assert.match(decoded, /portfolio_project_technologies\.technology_id=in\.\(tech-react\)/);
  assert.match(decoded, /portfolio_project_categories!inner/);
  assert.match(decoded, /limit=6/);
  assert.match(decoded, /offset=6/);
});

test('listProjects : recherche texte et tri explicite', async () => {
  let captured;
  const api = apiWith((url) => { captured = url; return response([], '0-0/0'); });
  await api.listProjects({ q: 'clavis', sort: 'alpha' });
  const decoded = decodeURIComponent(captured);
  assert.match(decoded, /or=\(title\.ilike\.\*clavis\*,short_desc\.ilike\.\*clavis\*\)/);
  assert.match(decoded, /order=title\.asc/);
});

test('listProjects : erreur réseau -> null (le repli catalogue est géré par l’appelant)', async () => {
  const api = apiWith(() => Promise.reject(new Error('offline')));
  assert.equal(await api.listProjects(), null);
});

test('getProject : résolution par slug et projet introuvable', async () => {
  let captured;
  const api = apiWith((url) => {
    captured = url;
    return captured.includes('slug=eq.akoue-app') ? response([projectRow()]) : response([]);
  });
  const found = await api.getProject('akoue-app');
  assert.equal(found.n, 'Akouè App');
  assert.equal(found.categories[0].slug, 'mobile');
  assert.equal(found.technologies[0].name, 'React Native');
  assert.equal(decodeURIComponent(captured).includes('status=eq.published'), true);
  const missing = await api.getProject('inconnu');
  assert.equal(missing.notFound, true);
});

test('listProjects : neutralise les caractères dangereux des filtres', async () => {
  let captured;
  const api = apiWith((url) => { captured = url; return response([], '0-0/0'); });
  await api.listProjects({ categories: ['web),x'], q: 'foo) or 1=1' });
  const decoded = decodeURIComponent(captured);
  assert.match(decoded, /in\.\(webx\)/);
  assert.doesNotMatch(decoded, /1=1/);
});

test('listProjects : Content-Range */N (page hors bornes) donne le total', async () => {
  const api = apiWith(() => response([], '*/42'));
  const result = await api.listProjects({ page: 9 });
  assert.equal(result.total, 42);
  assert.equal(result.hasMore, false);
});

test('searchProjects : appelle la RPC avec les filtres et mappe le résultat', async () => {
  let captured;
  const api = apiWith((url, options) => {
    captured = { url, options };
    return response({ total: 2, items: [projectRow(), projectRow({ id: 'uuid-2', slug: 'clavis', title: 'Clavis' })] });
  });
  const result = await api.searchProjects({ q: 'clavis', categories: ['web'], technologies: ['react'], sort: 'alpha', page: 2, perPage: 12 });
  assert.match(captured.url, /\/rpc\/search_portfolio_projects$/);
  const body = JSON.parse(captured.options.body);
  assert.equal(body.p_q, 'clavis');
  assert.deepEqual(body.p_categories, ['web']);
  assert.deepEqual(body.p_technologies, ['react']);
  assert.equal(body.p_sort, 'alpha');
  assert.equal(body.p_offset, 12);
  assert.equal(result.total, 2);
  assert.equal(result.items.length, 2);
  assert.equal(result.degraded, false);
});

test('searchProjects : RPC indisponible -> repli listProjects dégradé', async () => {
  const api = apiWith((url) => {
    if (url.indexOf('/rpc/') >= 0) return failResponse(404);
    return response([projectRow()], '0-0/1');
  });
  const result = await api.searchProjects({ q: 'clavis' });
  assert.equal(result.degraded, true);
  assert.equal(result.items.length, 1);
  assert.equal(result.total, 1);
});

test('searchProjects : aucun brouillon dans les résultats', async () => {
  const api = apiWith(() => response({
    total: 2,
    items: [projectRow(), projectRow({ id: 'uuid-2', slug: 'brouillon', status: 'draft' })]
  }));
  const result = await api.searchProjects({});
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].st, 'published');
});

test('isEnabled : faux sans clé Supabase', () => {
  const api = createApi({ url: '', key: '', fetchImpl: () => response([]) });
  assert.equal(api.isEnabled(), false);
});
