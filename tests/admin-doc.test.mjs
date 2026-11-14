// Tests du document assaini publié (brouillons, messages, téléphone).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { repoRoot } from './helpers.mjs';

function loadDoc() {
  const code = fs.readFileSync(path.join(repoRoot, 'assets/js/admin-doc.js'), 'utf8');
  const sandbox = { module: { exports: {} }, exports: {}, console };
  vm.runInNewContext(code, sandbox, { filename: 'admin-doc.js' });
  return sandbox.module.exports;
}

function sample() {
  return {
    profile: { nom: 'Eucher', tel: '+229 00', email: 'e@x.tld' },
    projects: [
      { id: 1, n: 'Publié 1', st: 'Publié' },
      { id: 2, n: 'Brouillon', st: 'Brouillon' },
      { id: 3, n: 'Archivé', st: 'Archivé' }
    ],
    msgs: [{ from: 'secret', txt: 'privé' }],
    act: [{ a: 'log' }],
    set: { online: true },
    posts: [{ t: 'article' }]
  };
}

test('document public : seuls les projets publiés sont publiés', () => {
  const { toPublicDocument } = loadDoc();
  const pub = toPublicDocument(sample());
  assert.equal(pub.projects.length, 1);
  assert.equal(pub.projects[0].n, 'Publié 1');
  assert.ok(!pub.projects.some((p) => p.st !== 'Publié'));
});

test('document public : messages, activité et téléphone exclus', () => {
  const { toPublicDocument } = loadDoc();
  const pub = toPublicDocument(sample());
  assert.equal(pub.msgs, undefined);
  assert.equal(pub.act, undefined);
  assert.equal(pub.profile.tel, undefined);
  assert.equal(pub.profile.email, 'e@x.tld');
});

test('document public : le reste du document est conservé', () => {
  const { toPublicDocument } = loadDoc();
  const pub = toPublicDocument(sample());
  assert.equal(pub.set.online, true);
  assert.equal(pub.posts.length, 1);
  assert.equal(pub.posts[0].t, 'article');
  assert.equal(pub.profile.nom, 'Eucher');
});

test('document public : tolère un document vide ou incomplet', () => {
  const { toPublicDocument } = loadDoc();
  assert.equal(toPublicDocument(null).projects.length, 0);
  assert.equal(toPublicDocument({}).projects.length, 0);
});
