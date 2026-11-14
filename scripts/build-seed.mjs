// Génère le seed SQL des projets depuis assets/js/catalog.js.
// Usage : node scripts/build-seed.mjs [chemin-de-sortie]
// Aucun secret, aucune connexion réseau : la sortie est appliquée à la main
// dans Supabase (SQL Editor) après les migrations P0.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(repoRoot, 'assets/js/catalog.js');
const outPath = process.argv[2] || path.join(repoRoot, 'supabase/seed/2026-11-14-projects.sql');
const PUBLISHED_AT = '2026-11-14T00:00:00Z';

const sandbox = { window: {}, console: { log() {}, warn() {}, error() {} } };
vm.runInNewContext(fs.readFileSync(catalogPath, 'utf8'), sandbox, { filename: 'catalog.js' });

const slugify = typeof sandbox.window.eaSlug === 'function'
  ? sandbox.window.eaSlug
  : (name) => String(name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const projects = (sandbox.window.EA_PROJECTS || []).filter((p) => p && p.st === 'Publié');
if (!projects.length) {
  console.error('Aucun projet publié dans catalog.js');
  process.exit(1);
}

const q = (value) => (value === null || value === undefined ? 'null' : "'" + String(value).replace(/'/g, "''") + "'");
const json = (value) => "'" + JSON.stringify(value).replace(/'/g, "''") + "'::jsonb";
const techsOf = (project) => String(project.t || '').split(',').map((t) => t.trim()).filter(Boolean);

const categories = [...new Set(projects.map((p) => (p.cat || '').trim()).filter(Boolean))];
const technologies = [...new Set(projects.flatMap(techsOf))];

const lines = [];
lines.push('-- ============================================================================');
lines.push('-- P0 — seed des projets publiés, généré par scripts/build-seed.mjs');
lines.push('-- Source : assets/js/catalog.js. Déterministe, idempotent, sans secret.');
lines.push('-- À appliquer APRÈS les migrations 01, 02 et 03.');
lines.push('-- ============================================================================');
lines.push('');
lines.push('begin;');
lines.push('');

lines.push('insert into public.categories (slug, name) values');
lines.push(categories.map((c) => `  (${q(slugify(c))}, ${q(c)})`).join(',\n'));
lines.push('on conflict (slug) do update set name = excluded.name;');
lines.push('');

lines.push('insert into public.technologies (slug, name) values');
lines.push(technologies.map((t) => `  (${q(slugify(t))}, ${q(t)})`).join(',\n'));
lines.push('on conflict (slug) do update set name = excluded.name;');
lines.push('');

projects.forEach((project, index) => {
  const legacyId = index + 1;
  const slug = project.slug || slugify(project.n);
  const values = [
    String(legacyId),
    q(slug),
    q(project.n),
    q(project.d || ''),
    q(project.long || project.d || ''),
    "'published'::public.project_status",
    'false',
    String(index + 1),
    q(project.role || ''),
    q(project.sec || ''),
    q(project.u || ''),
    q(project.repo || null),
    'true',
    project.repo ? 'true' : 'false',
    json(project.impact || []),
    json(project.f || []),
    q(PUBLISHED_AT)
  ];
  lines.push(`-- Projet ${legacyId} : ${project.n}`);
  lines.push('insert into public.projects (');
  lines.push('  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,');
  lines.push('  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at');
  lines.push(') values (');
  lines.push('  ' + values.join(', '));
  lines.push(') on conflict (legacy_id) do update set');
  lines.push('  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,');
  lines.push('  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,');
  lines.push('  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,');
  lines.push('  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,');
  lines.push('  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,');
  lines.push('  published_at = coalesce(public.projects.published_at, excluded.published_at), updated_at = now();');
  lines.push('');
  lines.push(`delete from public.project_categories where project_id = (select id from public.projects where legacy_id = ${legacyId});`);
  lines.push(`delete from public.project_technologies where project_id = (select id from public.projects where legacy_id = ${legacyId});`);
  lines.push('');
  if (project.cat) {
    lines.push('insert into public.project_categories (project_id, category_id)');
    lines.push('select p.id, c.id from public.projects p, public.categories c');
    lines.push(`where p.legacy_id = ${legacyId} and c.slug = ${q(slugify(project.cat))}`);
    lines.push('on conflict do nothing;');
    lines.push('');
  }
  const techs = techsOf(project);
  if (techs.length) {
    lines.push('insert into public.project_technologies (project_id, technology_id)');
    lines.push('select p.id, t.id from public.projects p join public.technologies t');
    lines.push(`  on t.slug in (${techs.map((t) => q(slugify(t))).join(', ')})`);
    lines.push(`where p.legacy_id = ${legacyId}`);
    lines.push('on conflict do nothing;');
    lines.push('');
  }
});

lines.push('commit;');
lines.push('');
lines.push('-- Vérification attendue après application :');
lines.push(`--   select count(*) from public.projects;            -- ${projects.length}`);
lines.push(`--   select count(*) from public.categories;          -- ${categories.length}`);
lines.push(`--   select count(*) from public.technologies;        -- ${technologies.length}`);
lines.push("--   select count(*) from public.project_technologies;");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
console.log(`Seed écrit : ${path.relative(repoRoot, outPath)} (${projects.length} projets, ${categories.length} catégories, ${technologies.length} technologies)`);
