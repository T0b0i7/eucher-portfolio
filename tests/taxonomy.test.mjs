// Vérifie le référentiel de taxonomie et son générateur SQL.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const TAXONOMY = path.join(repoRoot, 'assets/data/taxonomy.json');
const MAPPING = path.join(repoRoot, 'assets/data/project-taxonomy.json');
const SCRIPT = path.join(repoRoot, 'scripts/build-taxonomy.mjs');

function slugify(value) {
  return String(value == null ? '' : value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
const mapping = JSON.parse(fs.readFileSync(MAPPING, 'utf8'));

function allCategorySlugs() {
  const set = new Set(taxonomy.categories.map((c) => c.slug));
  taxonomy.categories.forEach((c) => (c.children || []).forEach((child) => set.add(slugify(child))));
  return set;
}

test('taxonomy: only the seven active gallery families are featured', () => {
  assert.equal(taxonomy.categories.length, 40);
  const featuredSlugs = taxonomy.categories.filter((c) => c.featured).map((c) => c.slug).sort();
  assert.deepEqual(featuredSlugs, [
    'web-development',
    'mobile-development',
    'artificial-intelligence',
    'ai-agents-agentic-systems',
    'saas-software-products',
    'ui-ux-design',
    'cybersecurity'
  ].sort());
  const mappedCategories = new Set(Object.values(mapping.projects).flatMap((project) => project.categories || []));
  featuredSlugs.forEach((slug) => assert.ok(mappedCategories.has(slug), 'famille sans projet publié : ' + slug));
  const childCount = taxonomy.categories.reduce((sum, c) => sum + (c.children || []).length, 0);
  assert.equal(childCount, 254);
  assert.equal(taxonomy.tags.length, 42);
  const slugs = taxonomy.categories.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'slugs racines dupliqués');
});

test('taxonomie : aucun slug de sous-catégorie dupliqué', () => {
  const seen = new Set();
  taxonomy.categories.forEach((c) => (c.children || []).forEach((child) => {
    const slug = slugify(child);
    assert.ok(!seen.has(slug), 'doublon : ' + slug);
    seen.add(slug);
  }));
});

test('mapping projets : toutes les catégories et tous les tags existent', () => {
  const categories = allCategorySlugs();
  const tags = new Set(taxonomy.tags.map(slugify));
  Object.keys(mapping.projects).forEach((project) => {
    const entry = mapping.projects[project];
    [...(entry.categories || []), ...(entry.subcategories || [])].forEach((slug) => {
      assert.ok(categories.has(slug), 'catégorie inconnue (' + project + ') : ' + slug);
    });
    (entry.tags || []).forEach((slug) => {
      assert.ok(tags.has(slug), 'tag inconnu (' + project + ') : ' + slug);
    });
  });
});

test('générateur : SQL déterministe avec upserts et jonctions', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ea-taxonomy-'));
  const out = path.join(dir, 'taxonomy.sql');
  execFileSync(process.execPath, [SCRIPT, out], { cwd: repoRoot, stdio: 'pipe' });
  const sql = fs.readFileSync(out, 'utf8');
  assert.match(sql, /insert into public\.portfolio_categories/);
  assert.match(sql, /on conflict \(slug\) do update/);
  assert.match(sql, /parent_id/);
  assert.match(sql, /insert into public\.portfolio_project_categories/);
  assert.match(sql, /insert into public\.portfolio_project_tags/);
  assert.match(sql, /'akoue-app'/);
  assert.match(sql, /'web-development'/);
  const second = path.join(dir, 'taxonomy-2.sql');
  execFileSync(process.execPath, [SCRIPT, second], { cwd: repoRoot, stdio: 'pipe' });
  assert.equal(sql, fs.readFileSync(second, 'utf8'));
});
