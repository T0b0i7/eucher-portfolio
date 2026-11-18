import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { INDEX_SCRIPTS, loadPage, repoRoot } from './helpers.mjs';

const adminScript = fs.readFileSync(path.join(repoRoot, 'assets/js/admin.js'), 'utf8');

function projectFixture() {
  return {
    id: 101,
    n: 'Portfolio Admin',
    d: 'Un outil de gestion de projets.',
    cat: 'Web',
    st: 'Publié',
    t: 'React, TypeScript',
    u: '',
    preview: '',
    cover: '/assets/project-cover.webp',
    cats: ['frontend'],
    tags: ['featured'],
    featured: true,
    sort: 4,
    published_at: '2026-01-15',
    don: 'Oui',
    dl: 'https://example.test/donate',
    en: { d: 'A project management tool.' }
  };
}

function fakeSupabase(taxonomyMode = 'full') {
  function query(table) {
    const results = {
      portfolio: { data: { id: 1 }, error: null },
      portfolio_categories: {
        data: taxonomyMode === 'empty' ? [] : taxonomyMode === 'partial' ? [
          { slug: 'frontend', name: 'Frontend' }
        ] : [
          { slug: 'frontend', name: 'Frontend' },
          { slug: 'backend', name: 'Backend' }
        ],
        error: null
      },
      portfolio_tags: {
        data: taxonomyMode === 'empty' ? [] : taxonomyMode === 'partial' ? [
          { slug: 'featured', name: 'Featured' }
        ] : [
          { slug: 'featured', name: 'Featured' },
          { slug: 'new-tag', name: 'New tag' }
        ],
        error: null
      },
      portfolio_technologies: { data: [], error: null },
      messages: { data: [], error: null },
      portfolio_drafts: { data: null, error: null }
    };
    const result = results[table] || { data: [], error: null };
    const chain = {
      select() { return chain; },
      eq() { return chain; },
      order() { return chain; },
      limit() { return chain; },
      maybeSingle() { return Promise.resolve(result); },
      then(resolve, reject) { return Promise.resolve(result).then(resolve, reject); },
      catch(reject) { return Promise.resolve(result).catch(reject); }
    };
    return chain;
  }

  return {
    auth: {
      getSession: () => Promise.resolve({
        data: { session: { user: { id: 'test-owner', user_metadata: {} } } }
      }),
      onAuthStateChange() {}
    },
    rpc: () => Promise.resolve({ data: true, error: null }),
    from: query
  };
}

async function loadAdmin(t, project = projectFixture(), options = {}) {
  const page = loadPage('index.html', INDEX_SCRIPTS, 'http://localhost/index.html');
  t.after(() => page.close());

  const { window, document } = page;
  const data = {
    profile: { ...window.SEED_PROFILE },
    projects: [project],
    skills: window.SEED_SKILLS.map((skill) => ({ ...skill })),
    exp: window.SEED_EXP.map((item) => ({ ...item })),
    edu: window.SEED_EDU.map((item) => ({ ...item })),
    cvV: 3,
    msgs: [],
    set: { accent: '#e60012', online: true },
    posts: [],
    services: [],
    steps: [],
    shop: [],
    shopV: 3,
    act: [],
    projV: 1,
    impV: 1,
    projectMediaV: 1,
    mockV: 1,
    msgV: 2,
    upd: Date.now()
  };
  window.localStorage.setItem('ea_admin_v1', JSON.stringify(data));
  window.eaPush = () => {};
  window.supabase = { createClient: () => fakeSupabase(options.taxonomyMode) };
  window.eval(adminScript);
  window.__requestAdmin();
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.ok(document.querySelector('#adm.open'), 'the simulated owner session opens the admin');
  document.querySelector('#sb [data-v="proj"]').click();
  return page;
}

function openProjectEditor(document, action, id) {
  const selector = id === undefined
    ? `[data-a="${action}"]`
    : `[data-a="${action}"][data-i="${id}"]`;
  document.querySelector(`#ct ${selector}`).click();
  return document.querySelector('#md');
}

test('project creation shows core fields and starts advanced options collapsed', async (t) => {
  const { document } = await loadAdmin(t);
  const modal = openProjectEditor(document, 'addp');
  const dialog = modal.querySelector('[role="dialog"]');
  const advanced = dialog.querySelector('details');

  assert.ok(advanced, 'the project form groups optional fields in a disclosure');
  assert.equal(advanced.open, false);
  for (const key of ['n', 'd', 'cat', 't', 'u', 'preview', 'cover', 'st']) {
    assert.ok(dialog.querySelector(`[data-k="${key}"]`), `the core field ${key} is rendered`);
    assert.equal(dialog.querySelector(`[data-k="${key}"]`).closest('details'), null);
  }
  for (const key of ['cats', 'tags', 'featured', 'sort', 'published_at', 'don', 'dl', 'en_d']) {
    assert.ok(advanced.querySelector(`[data-k="${key}"]`), `the advanced field ${key} is rendered`);
  }
  assert.ok(advanced.querySelector('[data-a="tren"]'), 'the translation action is advanced');
});

test('editing preserves advanced metadata and checkbox-array serialization', async (t) => {
  const { document, window } = await loadAdmin(t);
  const modal = openProjectEditor(document, 'editp', 101);
  const advanced = modal.querySelector('details');
  advanced.open = true;

  assert.deepEqual(
    [...modal.querySelectorAll('[data-k="cats"]')].map((input) => ({ value: input.value, checked: input.checked })),
    [{ value: 'frontend', checked: true }, { value: 'backend', checked: false }]
  );
  assert.equal(modal.querySelector('[data-k="tags"][value="featured"]').checked, true);
  assert.equal(modal.querySelector('[data-k="featured"]').value, 'Oui');
  assert.equal(modal.querySelector('[data-k="sort"]').value, '4');
  assert.equal(modal.querySelector('[data-k="published_at"]').value, '2026-01-15');
  assert.equal(modal.querySelector('[data-k="don"]').value, 'Oui');
  assert.equal(modal.querySelector('[data-k="dl"]').value, 'https://example.test/donate');
  assert.equal(modal.querySelector('[data-k="en_d"]').value, 'A project management tool.');
  assert.equal(modal.querySelector('[data-k="cover"]').value, '/assets/project-cover.webp');

  modal.querySelector('[data-k="cats"][value="frontend"]').checked = false;
  modal.querySelector('[data-k="cats"][value="backend"]').checked = true;
  modal.querySelector('[data-k="tags"][value="featured"]').checked = false;
  modal.querySelector('[data-k="tags"][value="new-tag"]').checked = true;
  modal.querySelector('[data-a="ms"]').click();

  const saved = JSON.parse(window.localStorage.getItem('ea_admin_v1')).projects[0];
  assert.deepEqual(saved.cats, ['backend']);
  assert.deepEqual(saved.tags, ['new-tag']);
  assert.equal(saved.featured, true);
  assert.equal(saved.sort, 4);
  assert.equal(saved.published_at, '2026-01-15');
  assert.equal(saved.don, 'Oui');
  assert.equal(saved.dl, 'https://example.test/donate');
  assert.equal(saved.en.d, 'A project management tool.');
  assert.equal(saved.cover, '/assets/project-cover.webp');
});

test('editing preserves selected categories and tags missing from a partial taxonomy cache', async (t) => {
  const project = projectFixture();
  project.cats = ['legacy-category'];
  project.tags = ['legacy-tag'];
  const { document, window } = await loadAdmin(t, project, { taxonomyMode: 'partial' });
  const modal = openProjectEditor(document, 'editp', 101);
  modal.querySelector('details').open = true;

  const category = modal.querySelector('[data-k="cats"][value="legacy-category"]');
  const tag = modal.querySelector('[data-k="tags"][value="legacy-tag"]');
  assert.ok(category, 'the stored category remains available when absent from the cache');
  assert.ok(tag, 'the stored tag remains available when absent from the cache');
  assert.equal(category.checked, true);
  assert.equal(tag.checked, true);
  modal.querySelector('[data-a="ms"]').click();

  const saved = JSON.parse(window.localStorage.getItem('ea_admin_v1')).projects[0];
  assert.deepEqual(saved.cats, ['legacy-category']);
  assert.deepEqual(saved.tags, ['legacy-tag']);
});

test('saving with no taxonomy selections keeps category and tag arrays empty', async (t) => {
  const project = projectFixture();
  project.cats = [];
  project.tags = [];
  const { document, window } = await loadAdmin(t, project);
  const modal = openProjectEditor(document, 'editp', 101);
  modal.querySelector('details').open = true;
  modal.querySelector('[data-a="ms"]').click();

  const saved = JSON.parse(window.localStorage.getItem('ea_admin_v1')).projects[0];
  assert.deepEqual(saved.cats, []);
  assert.deepEqual(saved.tags, []);
});

test('editing keeps category and tag values editable when taxonomy cache is empty', async (t) => {
  const project = projectFixture();
  project.cats = ['legacy-category', 'another-category'];
  project.tags = ['legacy-tag'];
  const { document, window } = await loadAdmin(t, project, { taxonomyMode: 'empty' });
  const modal = openProjectEditor(document, 'editp', 101);
  const advanced = modal.querySelector('details');
  advanced.open = true;

  assert.equal(modal.querySelector('[data-k="cats"]').type, 'text');
  assert.equal(modal.querySelector('[data-k="cats"]').value, 'legacy-category,another-category');
  assert.equal(modal.querySelector('[data-k="tags"]').type, 'text');
  assert.equal(modal.querySelector('[data-k="tags"]').value, 'legacy-tag');
  modal.querySelector('[data-a="ms"]').click();

  const saved = JSON.parse(window.localStorage.getItem('ea_admin_v1')).projects[0];
  assert.deepEqual(saved.cats, ['legacy-category', 'another-category']);
  assert.deepEqual(saved.tags, ['legacy-tag']);
});

test('project modal is labelled, focuses its first field, closes on Escape, and restores focus', async (t) => {
  const { document, window } = await loadAdmin(t);
  const trigger = document.querySelector('#ct [data-a="addp"]');
  trigger.focus();

  let modal = openProjectEditor(document, 'addp');
  let dialog = modal.querySelector('[role="dialog"]');
  assert.equal(dialog.getAttribute('aria-labelledby'), dialog.querySelector('h3').id);
  assert.equal(document.activeElement, dialog.querySelector('[data-k="n"]'));

  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
  assert.equal(document.activeElement, dialog.querySelector('[data-a="ms"]'));
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
  assert.equal(document.activeElement, dialog.querySelector('[data-k="n"]'));

  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert.equal(modal.classList.contains('open'), false);
  assert.equal(document.activeElement, trigger);

  trigger.focus();
  modal = openProjectEditor(document, 'addp');
  modal.querySelector('[data-a="mx"]').click();
  assert.equal(modal.classList.contains('open'), false);
  assert.equal(document.activeElement, trigger);

  trigger.focus();
  modal = openProjectEditor(document, 'addp');
  modal.querySelector('[data-k="n"]').value = 'New project';
  modal.querySelector('[data-a="ms"]').click();
  assert.equal(modal.classList.contains('open'), false);
  assert.equal(document.activeElement, document.querySelector('#ct [data-a="addp"]'));
});
