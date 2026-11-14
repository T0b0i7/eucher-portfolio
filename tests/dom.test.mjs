// Non-régression DOM du portfolio : accueil (8 projets) et fiches projet.
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, INDEX_SCRIPTS, PROJECT_SCRIPTS } from './helpers.mjs';

const EXPECTED = [
  'Akouè App',
  'NaviGarde IA',
  'Clavis',
  'Havre',
  'Cauris Group International',
  'Savekari Beauty',
  'Portefolio.OS',
  'Vigilance BJ'
];

test('accueil : le carrousel affiche les 8 projets publiés et 8 pastilles', (t) => {
  const page = loadPage('index.html', INDEX_SCRIPTS, 'http://localhost/index.html');
  t.after(() => page.close());
  const cards = page.document.querySelectorAll('#projectCarousel .project-card');
  assert.equal(cards.length, 8, 'nombre de cartes');
  const names = Array.from(cards).map((c) => c.querySelector('.project-title').textContent.trim());
  for (const name of EXPECTED) assert.ok(names.includes(name), 'carte manquante : ' + name);
  assert.equal(page.document.querySelectorAll('#projectDots button').length, 8, 'pastilles');
  assert.equal(page.errors.length, 0, page.errors.join(' | '));
});

test('fiche projet : rendu complet pour akoue-app', async (t) => {
  const page = loadPage('project.html', PROJECT_SCRIPTS, 'http://localhost/project.html?project=akoue-app');
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelector('.hero-title').textContent.trim(), 'Akouè App');
  assert.equal(page.document.querySelectorAll('#projectPreviewGrid img').length, 4, 'galerie');
  assert.equal(page.document.querySelector('#projectNotFound').hidden, true);
  assert.equal(page.errors.length, 0, page.errors.join(' | '));
});

test('fiche projet : slug inconnu affiche la page introuvable', async (t) => {
  const page = loadPage('project.html', PROJECT_SCRIPTS, 'http://localhost/project.html?project=inconnu-xyz');
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelector('#projectNotFound').hidden, false);
  assert.equal(page.document.querySelector('#projectDetail').hidden, true);
});

function apiRow(overrides = {}) {
  return Object.assign({
    id: 'api-1',
    slug: 'projet-api',
    title: 'Projet API',
    short_desc: 'Depuis l’API',
    long_desc: 'Description API.',
    status: 'published',
    featured: false,
    sort_order: 1,
    role: 'Conception',
    sector: 'Web',
    demo_url: 'https://example.com',
    repo_url: null,
    demo_visible: true,
    repo_visible: false,
    published_at: '2026-11-14T00:00:00Z',
    updated_at: '2026-11-14T00:00:00Z',
    impact: [],
    features: ['Fonction API'],
    portfolio_project_categories: [{ portfolio_categories: { slug: 'web', name: 'Web' } }],
    portfolio_project_tags: [{ portfolio_tags: { slug: 'web', name: 'Web' } }],
    portfolio_project_technologies: [{ portfolio_technologies: { slug: 'react', name: 'React', icon: null } }],
    portfolio_media: []
  }, overrides);
}

function apiFetch(rows, fail) {
  return (url) => {
    const decoded = decodeURIComponent(String(url));
    if (fail) return Promise.reject(new Error('offline'));
    if (decoded.indexOf('/rest/v1/portfolio_projects?') >= 0) {
      return Promise.resolve({
        ok: true,
        status: 200,
        headers: { get: (name) => (/content-range/i.test(name) ? '0-' + Math.max(0, rows.length - 1) + '/' + rows.length : null) },
        json: () => Promise.resolve(rows),
        text: () => Promise.resolve('')
      });
    }
    return Promise.resolve({ ok: false, status: 503, headers: { get: () => null }, json: () => Promise.resolve(null), text: () => Promise.resolve('') });
  };
}

const flush = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));

test('accueil : carrousel alimenté par l’API et brouillons ignorés', async (t) => {
  const rows = [apiRow(), apiRow({ id: 'api-2', slug: 'brouillon', title: 'Brouillon API', status: 'draft' })];
  const page = loadPage('index.html', INDEX_SCRIPTS, 'http://localhost/index.html', { fetch: apiFetch(rows) });
  t.after(() => page.close());
  await flush();
  const cards = page.document.querySelectorAll('#projectCarousel .project-card');
  assert.equal(cards.length, 1, 'un seul projet publié attendu');
  assert.match(page.document.getElementById('projectCarousel').textContent, /Projet API/);
  assert.doesNotMatch(page.document.getElementById('projectCarousel').textContent, /Brouillon API/);
  assert.equal(page.document.body.dataset.dataSource, 'api');
});

test('accueil : repli catalogue quand l’API échoue', async (t) => {
  const page = loadPage('index.html', INDEX_SCRIPTS, 'http://localhost/index.html', { fetch: apiFetch([], true) });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelectorAll('#projectCarousel .project-card').length, 8);
  assert.equal(page.document.body.dataset.dataSource, 'catalog');
});

test('fiche projet : projet servi par l’API hors catalogue', async (t) => {
  const page = loadPage('project.html', PROJECT_SCRIPTS, 'http://localhost/project.html?project=projet-api', { fetch: apiFetch([apiRow()]) });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelector('.hero-title').textContent.trim(), 'Projet API');
  assert.equal(page.document.querySelector('#projectNotFound').hidden, true);
});

test('fiche projet : API introuvable mais catalogue connu -> repli local', async (t) => {
  const page = loadPage('project.html', PROJECT_SCRIPTS, 'http://localhost/project.html?project=akoue-app', { fetch: apiFetch([]) });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelector('.hero-title').textContent.trim(), 'Akouè App');
  assert.equal(page.document.querySelector('#projectNotFound').hidden, true);
});

test('fiche projet : un brouillon renvoyé par erreur n’est pas affiché', async (t) => {
  const page = loadPage('project.html', PROJECT_SCRIPTS, 'http://localhost/project.html?project=projet-api', { fetch: apiFetch([apiRow({ status: 'draft' })]) });
  t.after(() => page.close());
  await flush();
  assert.equal(page.document.querySelector('#projectNotFound').hidden, false);
  assert.equal(page.document.querySelector('#projectDetail').hidden, true);
});
