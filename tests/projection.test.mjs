// Vérification statique de la projection document → tables (P0).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const PROJECTION = path.join(repoRoot, 'supabase/migrations/2026-11-14-03-p0-projection.sql');

function sql() {
  return fs.existsSync(PROJECTION) ? fs.readFileSync(PROJECTION, 'utf8').toLowerCase().replace(/\s+/g, ' ') : '';
}

test('projection : fonction et trigger dédiés, ancien trigger legacy non remplacé', () => {
  const text = sql();
  assert.match(text, /create or replace function public\.sync_portfolio_projects\(\)/);
  assert.match(text, /create trigger trg_sync_portfolio_projects/);
  assert.doesNotMatch(text, /create or replace function public\.sync_portfolio_tables\(/);
});

test('projection : upsert par legacy_id et slug stable', () => {
  const text = sql();
  assert.match(text, /insert into public\.portfolio_projects \(\s*legacy_id, slug/);
  assert.match(text, /on conflict \(legacy_id\) do update/);
  assert.match(text, /public\.portfolio_slugify\(/);
  assert.match(text, /published_at = coalesce\(public\.portfolio_projects\.published_at/);
});

test('projection : statuts mappés vers l’enum, jamais de publié implicite', () => {
  const text = sql();
  assert.match(text, /'publie' then 'published'::public\.portfolio_project_status/);
  assert.match(text, /when 'archive' then 'archived'::public\.portfolio_project_status/);
  assert.match(text, /else 'draft'::public\.portfolio_project_status/);
});

test('projection : relations purgées puis réinsérées', () => {
  const text = sql();
  for (const table of ['portfolio_project_categories', 'portfolio_project_tags', 'portfolio_project_technologies']) {
    assert.match(text, new RegExp(`delete from public\\.${table} where project_id = v_id`));
  }
  assert.match(text, /insert into public\.portfolio_project_categories/);
  assert.match(text, /insert into public\.portfolio_project_technologies/);
});

test('projection : slug préservé au renommage, repo conservé si absent du document', () => {
  const text = sql();
  assert.match(text, /slug = public\.portfolio_projects\.slug/);
  assert.match(text, /repo_url = coalesce\(excluded\.repo_url, public\.portfolio_projects\.repo_url\)/);
  assert.match(text, /repo_visible = case/);
});

test('projection : casts tolérants et garde de type sur le document', () => {
  const text = sql();
  assert.match(text, /~ '\^\[0-9\]\+\$'/);
  assert.match(text, /jsonb_typeof\(doc->'projects'\) = 'array'/);
  assert.doesNotMatch(text, /nullif\(proj->>'id', ''\)::int/);
});

test('projection : suppression des projets legacy absents du document', () => {
  const text = sql();
  assert.match(text, /delete from public\.portfolio_projects p/);
  assert.match(text, /jsonb_array_elements\(arr\) with ordinality/);
  assert.match(text, /not exists \(/);
});

test('projection : catégories multiples et tags (tableaux ou CSV)', () => {
  const text = sql();
  assert.match(text, /jsonb_typeof\(proj->'cats'\) = 'array'/);
  assert.match(text, /jsonb_typeof\(proj->'tags'\) = 'array'/);
  assert.match(text, /foreach v_cat in array v_cats/);
  assert.match(text, /foreach v_tag in array v_tags/);
});

test('projection : rejoue la projection sur la ligne existante', () => {
  const text = sql();
  assert.match(text, /update public\.portfolio set data = data where id = 1/);
});
