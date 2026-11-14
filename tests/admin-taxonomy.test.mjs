// Vérifications statiques du back-office Taxonomie (P2b).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const adminTax = fs.readFileSync(path.join(repoRoot, 'assets/js/admin-taxonomy.js'), 'utf8');
const admin = fs.readFileSync(path.join(repoRoot, 'assets/js/admin.js'), 'utf8');
const remote = fs.readFileSync(path.join(repoRoot, 'assets/js/remote.js'), 'utf8');

test('admin taxonomie : écran et actions CRUD', () => {
  assert.match(adminTax, /window\.EA_TAX\s*=\s*\{/);
  assert.match(adminTax, /portfolio_categories/);
  assert.match(adminTax, /portfolio_tags/);
  assert.match(adminTax, /portfolio_technologies/);
  assert.match(adminTax, /\.insert\(/);
  assert.match(adminTax, /\.update\(/);
  assert.match(adminTax, /\.delete\(/);
  assert.match(adminTax, /function esc\(/);
});

test('admin taxonomie : navigation et chargement à la demande', () => {
  assert.match(admin, /\['tax','code','Taxonomie'\]/);
  assert.match(admin, /tax:function\(\)\{return window\.EA_TAX/);
  assert.match(admin, /if\(V==='tax'&&window\.EA_TAX\)window\.EA_TAX\.load\(\)/);
  assert.match(remote, /assets\/js\/admin-taxonomy\.js/);
});

test('admin projets : cats et tags normalisés en tableaux', () => {
  assert.match(admin, /o\[k\]=String\(o\[k\]\|\|''\)\.split\(','\)/);
});
