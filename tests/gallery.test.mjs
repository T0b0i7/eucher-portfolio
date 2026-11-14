// Tests DOM de la galerie publique P1 (API et repli catalogue mockés).
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, GALLERY_SCRIPTS } from './helpers.mjs';

function ok(body, contentRange) {
  return Promise.resolve({
    ok: true,
    status: 200,
    headers: { get: (name) => (String(name).toLowerCase() === 'content-range' ? contentRange || null : null) },
    json: () => Promise.resolve(body),
    text: () => Promise.resolve('')
  });
}
function fail(status) {
  return Promise.resolve({ ok: false, status, headers: { get: () => null }, json: () => Promise.resolve(null), text: () => Promise.resolve('') });
}

function row(overrides = {}) {
  return Object.assign({
    id: 'uuid-1',
    slug: 'akoue-app',
    title: 'Akouè App',
    short_desc: 'Gestion financière',
    status: 'published',
    featured: false,
    sort_order: 1,
    published_at: '2026-11-14T00:00:00Z',
    updated_at: '2026-11-14T00:00:00Z',
    impact: [],
    features: [],
    portfolio_project_categories: [{ portfolio_categories: { slug: 'web', name: 'Web' } }],
    portfolio_project_tags: [],
    portfolio_project_technologies: [{ portfolio_technologies: { slug: 'react', name: 'React', icon: null } }],
    portfolio_media: []
  }, overrides);
}

function galleryFetch(cfg = {}) {
  const calls = [];
  const fetchImpl = (url, options = {}) => {
    const target = String(url);
    if (target.indexOf('/portfolio_categories') >= 0) {
      return ok([{ slug: 'web', name: 'Web' }, { slug: 'mobile', name: 'Mobile' }]);
    }
    if (target.indexOf('/portfolio_tags') >= 0) return ok([{ slug: 'public', name: 'Public' }]);
    if (target.indexOf('/portfolio_technologies') >= 0) return ok([{ slug: 'react', name: 'React' }]);
    if (target.indexOf('/rpc/search_portfolio_projects') >= 0) {
      const body = JSON.parse(options.body || '{}');
      calls.push(body);
      if (cfg.rpcFail) return fail(404);
      if (typeof cfg.rpc === 'function') return cfg.rpc(body, calls.length);
      return ok({ total: 0, items: [] });
    }
    if (target.indexOf('/portfolio_projects') >= 0) {
      if (cfg.listFail) return fail(503);
      return ok(cfg.listRows || [], '0-0/' + (cfg.listRows || []).length);
    }
    return fail(404);
  };
  return { fetchImpl, calls };
}

const flush = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

test('galerie : rendu des cartes et filtres peuplés', async (t) => {
  const mock = galleryFetch({ rpc: () => ok({ total: 2, items: [row(), row({ id: '2', slug: 'clavis', title: 'Clavis' })] }) });
  const page = loadPage('projects.html', GALLERY_SCRIPTS, 'http://localhost/projects.html', { fetch: mock.fetchImpl });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelectorAll('#galleryGrid .gl-card').length, 2);
  assert.match(page.document.getElementById('galleryCount').textContent, /2 projets publiés/);
  assert.ok(page.document.querySelectorAll('#galleryCategory option').length >= 3);
  assert.ok(page.document.querySelectorAll('#galleryTech option').length >= 2);
  assert.equal(page.errors.length, 0, page.errors.join(' | '));
});

test('galerie : état vide explicite', async (t) => {
  const mock = galleryFetch({ rpc: () => ok({ total: 0, items: [] }) });
  const page = loadPage('projects.html', GALLERY_SCRIPTS, 'http://localhost/projects.html', { fetch: mock.fetchImpl });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelectorAll('#galleryGrid .gl-card').length, 0);
  assert.equal(page.document.getElementById('galleryEmpty').hidden, false);
});

test('galerie : le filtre catégorie met à jour la requête et l’URL', async (t) => {
  const mock = galleryFetch({
    rpc: (body) => ok({
      total: body.p_categories && body.p_categories.length ? 1 : 2,
      items: body.p_categories && body.p_categories.length ? [row()] : [row(), row({ id: '2', slug: 'clavis', title: 'Clavis' })]
    })
  });
  const page = loadPage('projects.html', GALLERY_SCRIPTS, 'http://localhost/projects.html', { fetch: mock.fetchImpl });
  t.after(() => page.close());
  await flush();
  const category = page.document.getElementById('galleryCategory');
  category.value = 'web';
  category.dispatchEvent(new page.window.Event('change', { bubbles: true }));
  await flush();
  const last = mock.calls[mock.calls.length - 1];
  assert.deepEqual(last.p_categories, ['web']);
  assert.equal(page.document.querySelectorAll('#galleryGrid .gl-card').length, 1);
  assert.match(page.window.location.search, /cat=web/);
});

test('galerie : « Charger plus » ajoute la page suivante sans doublon', async (t) => {
  const mock = galleryFetch({
    rpc: (body) => {
      if (body.p_offset === 0) return ok({ total: 3, items: [row(), row({ id: '2', slug: 'clavis', title: 'Clavis' })] });
      return ok({ total: 3, items: [row({ id: '3', slug: 'havre', title: 'Havre' })] });
    }
  });
  const page = loadPage('projects.html', GALLERY_SCRIPTS, 'http://localhost/projects.html', { fetch: mock.fetchImpl });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelectorAll('#galleryGrid .gl-card').length, 2);
  assert.equal(page.document.getElementById('galleryMore').hidden, false);
  page.document.getElementById('galleryMore').click();
  await flush();
  assert.equal(page.document.querySelectorAll('#galleryGrid .gl-card').length, 3);
  const slugs = Array.from(page.document.querySelectorAll('#galleryGrid .gl-card')).map((c) => c.getAttribute('href'));
  assert.equal(new Set(slugs).size, 3);
  assert.equal(page.document.getElementById('galleryMore').hidden, true);
});

test('galerie : repli catalogue quand l’API est indisponible', async (t) => {
  const mock = galleryFetch({ rpcFail: true, listFail: true });
  const page = loadPage('projects.html', GALLERY_SCRIPTS, 'http://localhost/projects.html', { fetch: mock.fetchImpl });
  t.after(() => page.close());
  await flush(800);
  assert.equal(page.document.querySelectorAll('#galleryGrid .gl-card').length, 8);
  assert.equal(page.document.getElementById('galleryDegraded').hidden, false);
  assert.equal(page.document.getElementById('galleryError').hidden, true);
});

test('galerie : URL filtrée restaurée au chargement', async (t) => {
  const mock = galleryFetch({ rpc: () => ok({ total: 1, items: [row()] }) });
  const page = loadPage('projects.html', GALLERY_SCRIPTS, 'http://localhost/projects.html?cat=web&sort=alpha', { fetch: mock.fetchImpl });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.getElementById('galleryCategory').value, 'web');
  assert.equal(page.document.getElementById('gallerySort').value, 'alpha');
  const last = mock.calls[mock.calls.length - 1];
  assert.deepEqual(last.p_categories, ['web']);
  assert.equal(last.p_sort, 'alpha');
});
