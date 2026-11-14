import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const js = fs.readFileSync(path.join(repoRoot, 'assets/js/appearance.js'), 'utf8');
const css = fs.readFileSync(path.join(repoRoot, 'assets/css/appearance.css'), 'utf8');
const admin = fs.readFileSync(path.join(repoRoot, 'assets/js/admin-appearance.js'), 'utf8');
const index = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');

test('p4 : apparence appliquée aux pages publiques', () => {
  assert.match(js, /data-bg/);
  assert.match(js, /data-motion/);
  assert.match(js, /--ac/);
  assert.match(css, /data-motion="off"/);
  assert.match(css, /data-bg="aurora"/);
  assert.match(index, /appearance\.css/);
  assert.match(index, /appearance\.js/);
});

test('p4 : réglages admin et aperçu', () => {
  assert.match(admin, /window\.EA_APPEARANCE/);
  assert.match(admin, /EA_ADMIN_SETTINGS/);
  assert.match(admin, /index\.html/);
});
