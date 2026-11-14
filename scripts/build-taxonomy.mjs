// Génère le seed SQL de la taxonomie (40 familles, sous-catégories, tags) et
// les jonctions projets ↔ catégories/tags. Déterministe, sans réseau.
// Usage : node scripts/build-taxonomy.mjs [chemin-de-sortie]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const taxonomyPath = path.join(repoRoot, 'assets/data/taxonomy.json');
const mappingPath = path.join(repoRoot, 'assets/data/project-taxonomy.json');
const outPath = process.argv[2] || path.join(repoRoot, 'supabase/seed/2026-11-14-taxonomy.sql');

const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

function slugify(value) {
  return String(value == null ? '' : value).normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
const q = (value) => (value === null || value === undefined ? 'null' : "'" + String(value).replace(/'/g, "''") + "'");

// --- Validation du référentiel ---
const roots = taxonomy.categories || [];
if (roots.length !== 40) throw new Error('La taxonomie doit contenir 40 catégories racines (trouvé ' + roots.length + ')');
const rootSlugs = new Set();
const allCategorySlugs = new Set();
const children = [];

roots.forEach((category, index) => {
  if (!category.slug || !/^[a-z0-9-]+$/.test(category.slug)) throw new Error('Slug racine invalide : ' + category.slug);
  if (rootSlugs.has(category.slug)) throw new Error('Slug racine dupliqué : ' + category.slug);
  if (allCategorySlugs.has(category.slug)) throw new Error('Slug racine en collision avec une sous-catégorie : ' + category.slug);
  rootSlugs.add(category.slug);
  allCategorySlugs.add(category.slug);
  (category.children || []).forEach((child, childIndex) => {
    const slug = slugify(child);
    if (!slug) throw new Error('Sous-catégorie sans slug : ' + child);
    if (allCategorySlugs.has(slug)) throw new Error('Sous-catégorie dupliquée (slug global) : ' + slug);
    allCategorySlugs.add(slug);
    children.push({ slug, name: child, parent: category.slug, sort: childIndex + 1 });
  });
});

const tagSlugs = new Set((taxonomy.tags || []).map(slugify));
if (tagSlugs.size < 30) throw new Error('Au moins 30 tags attendus');

const mapped = mapping.projects || {};
Object.keys(mapped).forEach((projectSlug) => {
  const entry = mapped[projectSlug];
  ['categories', 'subcategories', 'tags'].forEach((key) => {
    (entry[key] || []).forEach((slug) => {
      if (key === 'tags') {
        if (!tagSlugs.has(slug)) throw new Error('Tag inconnu pour ' + projectSlug + ' : ' + slug);
      } else if (!allCategorySlugs.has(slug)) {
        throw new Error('Catégorie inconnue pour ' + projectSlug + ' : ' + slug);
      }
    });
  });
});

// --- Génération SQL ---
const lines = [];
lines.push('-- ============================================================================');
lines.push('-- P2a — seed de la taxonomie (généré par scripts/build-taxonomy.mjs)');
lines.push('-- ' + roots.length + ' familles, 12 mises en avant, ' + children.length + ' sous-catégories, ' + tagSlugs.size + ' tags.');
lines.push('-- À appliquer APRÈS les migrations P0 et 2026-11-14-05-p2-taxonomy.sql.');
lines.push('-- ============================================================================');
lines.push('');
lines.push('begin;');
lines.push('');

lines.push('insert into public.portfolio_categories (slug, name, name_en, featured, sort_order) values');
lines.push(roots.map((category, index) => '  (' + [q(category.slug), q(category.name), q(category.name_en || category.name), category.featured ? 'true' : 'false', String(index + 1)].join(', ') + ')').join(',\n'));
lines.push('on conflict (slug) do update set');
lines.push('  name = excluded.name, name_en = excluded.name_en, featured = excluded.featured, sort_order = excluded.sort_order;');
lines.push('');

children.forEach((child) => {
  lines.push('insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)');
  lines.push('select ' + [q(child.slug), q(child.name), q(child.name), 'p.id', 'false', String(child.sort)].join(', '));
  lines.push('from public.portfolio_categories p where p.slug = ' + q(child.parent));
  lines.push('on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;');
  lines.push('');
});

lines.push('insert into public.portfolio_tags (slug, name) values');
lines.push([...tagSlugs].map((slug) => {
  const original = (taxonomy.tags || []).find((tag) => slugify(tag) === slug) || slug;
  return '  (' + q(slug) + ', ' + q(original) + ')';
}).join(',\n'));
lines.push('on conflict (slug) do update set name = excluded.name;');
lines.push('');

Object.keys(mapped).forEach((projectSlug) => {
  const entry = mapped[projectSlug];
  const categorySlugs = [...(entry.categories || []), ...(entry.subcategories || [])];
  lines.push('-- Projet : ' + projectSlug);
  lines.push('delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = ' + q(projectSlug) + ');');
  lines.push('delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = ' + q(projectSlug) + ');');
  lines.push('insert into public.portfolio_project_categories (project_id, category_id)');
  lines.push('select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c');
  lines.push('where p.slug = ' + q(projectSlug) + ' and c.slug in (' + categorySlugs.map(q).join(', ') + ')');
  lines.push('on conflict do nothing;');
  lines.push('');
  lines.push('insert into public.portfolio_project_tags (project_id, tag_id)');
  lines.push('select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t');
  lines.push('where p.slug = ' + q(projectSlug) + ' and t.slug in (' + (entry.tags || []).map(q).join(', ') + ')');
  lines.push('on conflict do nothing;');
  lines.push('');
});

lines.push('commit;');
lines.push('');
lines.push('-- Vérifications :');
lines.push('--   select count(*) from public.portfolio_categories where parent_id is null; -- 40');
lines.push('--   select count(*) from public.portfolio_categories where featured;         -- 12');
lines.push('--   select count(*) from public.portfolio_categories;                       -- ' + (roots.length + children.length));
lines.push('--   select count(*) from public.portfolio_tags;                             -- ' + tagSlugs.size);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
console.log(`Taxonomie générée : ${path.relative(repoRoot, outPath)} (${roots.length} familles, ${children.length} sous-catégories, ${tagSlugs.size} tags, ${Object.keys(mapped).length} projets)`);
