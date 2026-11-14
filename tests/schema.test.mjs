// Vérification statique du schéma P0 (les migrations ne sont pas exécutées ici).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const SCHEMA = path.join(repoRoot, 'supabase/migrations/2026-11-14-01-p0-schema.sql');
const RLS = path.join(repoRoot, 'supabase/migrations/2026-11-14-02-p0-rls-storage.sql');
const PROJECTION = path.join(repoRoot, 'supabase/migrations/2026-11-14-03-p0-projection.sql');

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function normalize(sql) {
  return sql.toLowerCase().replace(/\s+/g, ' ');
}

test('schéma : les tables éditoriales existent', () => {
  const sql = normalize(readIfExists(SCHEMA));
  for (const table of [
    'projects', 'categories', 'tags', 'technologies',
    'project_categories', 'project_tags', 'project_technologies', 'project_media'
  ]) {
    assert.match(sql, new RegExp('create table if not exists public\\.' + table + '\\b'), 'table manquante : ' + table);
  }
});

test('schéma : colonnes projet requises et contraintes', () => {
  const sql = normalize(readIfExists(SCHEMA));
  const projectBlock = sql.slice(sql.indexOf('create table if not exists public.projects'), sql.indexOf('create table if not exists public.categories'));
  for (const fragment of [
    'id uuid primary key',
    'legacy_id integer unique',
    'slug text not null unique',
    'title text not null',
    'short_desc text',
    'long_desc text',
    'status public.project_status not null default \'draft\'',
    'featured boolean not null default false',
    'sort_order integer not null default 0',
    'demo_url text',
    'repo_url text',
    'demo_visible boolean not null default true',
    'repo_visible boolean not null default false',
    'impact jsonb not null default \'[]\'::jsonb',
    'features jsonb not null default \'[]\'::jsonb',
    'published_at timestamptz',
    'created_at timestamptz not null default now()',
    'updated_at timestamptz not null default now()',
    'search_vector tsvector generated always as'
  ]) {
    assert.ok(projectBlock.includes(fragment), 'fragment manquant : ' + fragment);
  }
});

test('schéma : enums, slugify et trigger updated_at', () => {
  const sql = normalize(readIfExists(SCHEMA));
  assert.match(sql, /create type public\.project_status as enum \('draft', 'published', 'archived'\)/);
  assert.match(sql, /create type public\.media_kind as enum \('cover', 'gallery'\)/);
  assert.match(sql, /create or replace function public\.slugify\(/);
  assert.match(sql, /create or replace function public\.set_updated_at\(/);
  assert.match(sql, /create trigger projects_set_updated_at/);
});

test('schéma : jonctions et index de performance', () => {
  const sql = normalize(readIfExists(SCHEMA));
  assert.match(sql, /create table if not exists public\.project_categories \( ?project_id uuid/);
  assert.match(sql, /primary key \(project_id, category_id\)/);
  assert.match(sql, /primary key \(project_id, tag_id\)/);
  assert.match(sql, /primary key \(project_id, technology_id\)/);
  assert.match(sql, /create index if not exists projects_status_idx/);
  assert.match(sql, /create index if not exists projects_search_idx on public\.projects using gin \(search_vector\)/);
  assert.match(sql, /create index if not exists projects_trgm_idx/);
});

test('schéma : RLS activée sur les 8 tables', () => {
  const sql = normalize(readIfExists(SCHEMA));
  for (const table of [
    'projects', 'categories', 'tags', 'technologies',
    'project_categories', 'project_tags', 'project_technologies', 'project_media'
  ]) {
    assert.ok(
      sql.includes('alter table public.' + table + ' enable row level security'),
      'RLS manquante : ' + table
    );
  }
});
