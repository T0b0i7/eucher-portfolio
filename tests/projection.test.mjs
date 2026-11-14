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
  assert.match(text, /create or replace function public\.sync_project_tables\(\)/);
  assert.match(text, /create trigger trg_sync_project_tables/);
  assert.doesNotMatch(text, /create or replace function public\.sync_portfolio_tables\(/);
});

test('projection : upsert par legacy_id et slug stable', () => {
  const text = sql();
  assert.match(text, /insert into public\.projects \(\s*legacy_id, slug/);
  assert.match(text, /on conflict \(legacy_id\) do update/);
  assert.match(text, /public\.slugify\(/);
  assert.match(text, /published_at = coalesce\(public\.projects\.published_at/);
});

test('projection : statuts mappés vers l’enum, jamais de publié implicite', () => {
  const text = sql();
  assert.match(text, /'publie' then 'published'::public\.project_status/);
  assert.match(text, /when 'archive' then 'archived'::public\.project_status/);
  assert.match(text, /else 'draft'::public\.project_status/);
});

test('projection : relations purgées puis réinsérées', () => {
  const text = sql();
  for (const table of ['project_categories', 'project_tags', 'project_technologies']) {
    assert.match(text, new RegExp(`delete from public\\.${table} where project_id = v_id`));
  }
  assert.match(text, /insert into public\.project_categories/);
  assert.match(text, /insert into public\.project_technologies/);
});

test('projection : suppression des projets legacy absents du document', () => {
  const text = sql();
  assert.match(text, /delete from public\.projects p/);
  assert.match(text, /jsonb_array_elements\(arr\) with ordinality/);
  assert.match(text, /not exists \(/);
});

test('projection : rejoue la projection sur la ligne existante', () => {
  const text = sql();
  assert.match(text, /update public\.portfolio set data = data where id = 1/);
});
