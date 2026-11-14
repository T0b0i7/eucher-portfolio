// Vérifications statiques de l'écran Médias (P2b3).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const media = fs.readFileSync(path.join(repoRoot, 'assets/js/admin-media.js'), 'utf8');
const admin = fs.readFileSync(path.join(repoRoot, 'assets/js/admin.js'), 'utf8');
const remote = fs.readFileSync(path.join(repoRoot, 'assets/js/remote.js'), 'utf8');
const details = fs.readFileSync(path.join(repoRoot, 'assets/js/project-details.js'), 'utf8');

test('médias : upload Storage et table portfolio_media', () => {
  assert.match(media, /window\.EA_MEDIA\s*=\s*\{/);
  assert.match(media, /storage\.from\('media'\)/);
  assert.match(media, /\.upload\(/);
  assert.match(media, /getPublicUrl/);
  assert.match(media, /portfolio_media/);
  assert.match(media, /\.insert\(/);
  assert.match(media, /\.remove\(/);
});

test('médias : onglet admin et chargement à la demande', () => {
  assert.match(admin, /\['media','folder','Médias'\]/);
  assert.match(admin, /window\.EA_MEDIA\.render\(\)/);
  assert.match(admin, /V==='media'&&window\.EA_MEDIA/);
  assert.match(remote, /admin-media\.js/);
});

test('médias : galerie publique depuis portfolio_media', () => {
  assert.match(details, /media: isArray\(base\.media\)/);
  assert.match(details, /media: isArray\(remote\.media\)/);
  assert.match(details, /project\.media\.forEach/);
});
