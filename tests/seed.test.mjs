// Vérifie le générateur de seed et sa sortie SQL.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const SCRIPT = path.join(repoRoot, 'scripts/build-seed.mjs');

function generate() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ea-seed-'));
  const out = path.join(dir, 'seed.sql');
  execFileSync(process.execPath, [SCRIPT, out], { cwd: repoRoot, stdio: 'pipe' });
  return { sql: fs.readFileSync(out, 'utf8'), out };
}

test('seed : génère les 8 projets publiés avec leurs slugs', () => {
  const { sql } = generate();
  const inserts = sql.match(/insert into public\.projects/g) || [];
  assert.equal(inserts.length, 8);
  for (const slug of [
    'akoue-app', 'navigarde-ia', 'clavis', 'havre',
    'cauris-group-international', 'savekari-beauty', 'portefolio-os', 'vigilance-bj'
  ]) {
    assert.ok(sql.includes("'" + slug + "'"), 'slug manquant : ' + slug);
  }
  assert.match(sql, /on conflict \(legacy_id\) do update/);
  assert.match(sql, /'published'::public\.project_status/);
});

test('seed : catégories et technologies dérivées puis reliées', () => {
  const { sql } = generate();
  assert.match(sql, /insert into public\.categories/);
  assert.match(sql, /insert into public\.technologies/);
  assert.match(sql, /insert into public\.project_categories/);
  assert.match(sql, /insert into public\.project_technologies/);
  assert.match(sql, /on conflict \(slug\) do update/);
  assert.match(sql, /on conflict do nothing/);
});

test('seed : ne contient aucun secret et produit du SQL lisible', () => {
  const { sql } = generate();
  assert.ok(!/service_role|eyJhbGciOi|GITHUB_TOKEN/i.test(sql), 'secret détecté dans le seed');
  assert.ok(sql.includes("'Akouè App'"));
  assert.ok(sql.trim().startsWith('--'));
});

test('seed : génération déterministe (deux exécutions identiques)', () => {
  const first = generate().sql;
  const second = generate().sql;
  assert.equal(first, second);
});
