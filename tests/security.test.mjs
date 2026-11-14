// Vérifications statiques du durcissement (P5).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const config = JSON.parse(fs.readFileSync(path.join(repoRoot, 'vercel.json'), 'utf8'));
const headers = (config.headers || []).flatMap((rule) => rule.headers || []);
const keys = new Set(headers.map((h) => h.key));

test('p5 : en-têtes de sécurité Vercel', () => {
  for (const key of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy']) {
    assert.ok(keys.has(key), 'en-tête manquant : ' + key);
  }
  const nosniff = headers.find((h) => h.key === 'X-Content-Type-Options');
  assert.equal(nosniff.value, 'nosniff');
  assert.ok(headers.some((h) => h.key === 'Cache-Control' && /max-age=/.test(h.value)));
});
