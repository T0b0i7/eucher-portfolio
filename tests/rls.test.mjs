// Vérification statique des policies RLS et du bucket Storage (P0).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const RLS = path.join(repoRoot, 'supabase/migrations/2026-11-14-02-p0-rls-storage.sql');

function sql() {
  return fs.existsSync(RLS) ? fs.readFileSync(RLS, 'utf8').toLowerCase().replace(/\s+/g, ' ') : '';
}

test('RLS : lecture publique des projets limitée aux publiés', () => {
  const text = sql();
  assert.match(text, /create policy "projets lecture publique" on public\.portfolio_projects for select to anon, authenticated using \(status = 'published'\)/);
  assert.doesNotMatch(text, /create policy "projets lecture publique"[^;]*using \(true\)/);
});

test('RLS : écriture des projets réservée au propriétaire', () => {
  const text = sql();
  assert.match(text, /create policy "projets ecriture proprietaire" on public\.portfolio_projects for all to authenticated using \(public\.is_owner\(\)\) with check \(public\.is_owner\(\)\)/);
});

test('RLS : relations publiques seulement si le projet est publié', () => {
  const text = sql();
  assert.match(text, /create policy "relations lecture publique" on public\.portfolio_project_categories/);
  assert.match(text, /p\.status = 'published'/);
  assert.match(text, /create policy "medias lecture publique" on public\.portfolio_media/);
});

test('RLS : catégories activées et taxonomies lisibles', () => {
  const text = sql();
  assert.match(text, /create policy "portfolio_categories lecture publique" on public\.portfolio_categories for select to anon, authenticated using \(enabled = true\)/);
  assert.match(text, /create policy "portfolio_tags lecture publique" on public\.portfolio_tags/);
  assert.match(text, /create policy "portfolio_technologies lecture publique" on public\.portfolio_technologies/);
});

test('Storage : bucket média public en lecture, écriture admin', () => {
  const text = sql();
  assert.match(text, /insert into storage\.buckets \(id, name, public\) values \('media', 'media', true\)/);
  assert.match(text, /create policy "media lecture publique" on storage\.objects/);
  assert.match(text, /bucket_id = 'media'/);
  assert.match(text, /create policy "media ecriture proprietaire" on storage\.objects/);
});

test('Brouillons : aucune lecture publique, uniquement le propriétaire', () => {
  const text = sql();
  assert.match(text, /create policy "brouillons proprietaire" on public\.portfolio_drafts for all to authenticated/);
  assert.match(text, /public\.is_owner\(\)/);
  assert.doesNotMatch(text, /create policy "[^"]+" on public\.portfolio_drafts for select to anon/);
});
