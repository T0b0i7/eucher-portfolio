// Vérification statique de la fonction de recherche P1 (migration 04).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const FILE = path.join(repoRoot, 'supabase/migrations/2026-11-14-06-p2-search-hierarchy.sql');

function sql() {
  return fs.existsSync(FILE) ? fs.readFileSync(FILE, 'utf8').toLowerCase().replace(/\s+/g, ' ') : '';
}

test('recherche : fonction SQL avec filtres, tri et pagination bornée', () => {
  const text = sql();
  assert.match(text, /create or replace function public\.search_portfolio_projects\(/);
  assert.match(text, /returns jsonb/);
  assert.match(text, /security invoker/);
  assert.match(text, /p_categories text\[\]/);
  assert.match(text, /p_technologies text\[\]/);
  assert.match(text, /p_tags text\[\]/);
  assert.match(text, /p_sort text/);
  assert.match(text, /least\(coalesce\(p_limit/);
  assert.match(text, /offset greatest\(0, coalesce\(p_offset/);
});

test('recherche : uniquement les projets publiés, hiérarchie et recherche multi-entités', () => {
  const text = sql();
  assert.match(text, /status = 'published'/);
  assert.match(text, /websearch_to_tsquery\('french', p_q\)/);
  assert.match(text, /portfolio_project_tags/);
  assert.match(text, /portfolio_project_technologies/);
  assert.match(text, /ilike '%' \|\| p_q \|\| '%'/);
  assert.match(text, /c\.parent_id in \(select id from public\.portfolio_categories where slug = any\(p_categories\)\)/);
});

test('recherche : réponse { total, items } avec relations', () => {
  const text = sql();
  assert.match(text, /'total'/);
  assert.match(text, /'items'/);
  assert.match(text, /'portfolio_project_categories'/);
  assert.match(text, /'portfolio_project_tags'/);
  assert.match(text, /'portfolio_project_technologies'/);
  assert.match(text, /'portfolio_media'/);
});
