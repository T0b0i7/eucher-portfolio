// Non-régression DOM du portfolio : accueil (8 projets) et fiches projet.
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, INDEX_SCRIPTS, PROJECT_SCRIPTS } from './helpers.mjs';

const EXPECTED = [
  'Akouè App',
  'NaviGarde IA',
  'Clavis',
  'Havre',
  'Cauris Group International',
  'Savekari Beauty',
  'Portefolio.OS',
  'Vigilance BJ'
];

test('accueil : le carrousel affiche les 8 projets publiés et 8 pastilles', (t) => {
  const page = loadPage('index.html', INDEX_SCRIPTS, 'http://localhost/index.html');
  t.after(() => page.close());
  const cards = page.document.querySelectorAll('#projectCarousel .project-card');
  assert.equal(cards.length, 8, 'nombre de cartes');
  const names = Array.from(cards).map((c) => c.querySelector('.project-title').textContent.trim());
  for (const name of EXPECTED) assert.ok(names.includes(name), 'carte manquante : ' + name);
  assert.equal(page.document.querySelectorAll('#projectDots button').length, 8, 'pastilles');
  assert.equal(page.errors.length, 0, page.errors.join(' | '));
});

test('fiche projet : rendu complet pour akoue-app', (t) => {
  const page = loadPage('project.html', PROJECT_SCRIPTS, 'http://localhost/project.html?project=akoue-app');
  t.after(() => page.close());
  assert.equal(page.document.querySelector('.hero-title').textContent.trim(), 'Akouè App');
  assert.equal(page.document.querySelectorAll('#projectPreviewGrid img').length, 4, 'galerie');
  assert.equal(page.document.querySelector('#projectNotFound').hidden, true);
  assert.equal(page.errors.length, 0, page.errors.join(' | '));
});

test('fiche projet : slug inconnu affiche la page introuvable', (t) => {
  const page = loadPage('project.html', PROJECT_SCRIPTS, 'http://localhost/project.html?project=inconnu-xyz');
  t.after(() => page.close());
  assert.equal(page.document.querySelector('#projectNotFound').hidden, false);
  assert.equal(page.document.querySelector('#projectDetail').hidden, true);
});
