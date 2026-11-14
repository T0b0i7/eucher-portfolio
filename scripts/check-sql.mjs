// Contrôles statiques des migrations SQL (aucune connexion base requise).
// Autonome : ne dépend pas de jsdom ni du harnais de tests.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIGRATIONS_DIR = path.join(repoRoot, 'supabase/migrations');
const files = fs.existsSync(MIGRATIONS_DIR)
  ? fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort()
  : [];

let errors = 0;
const fail = (file, message) => { console.error(`FAIL ${file}: ${message}`); errors += 1; };
const LEGACY_TABLES = ['projects', 'categories', 'tags', 'technologies', 'project_categories', 'project_tags', 'project_technologies', 'project_media'];

for (const file of files) {
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
  const dollars = (sql.match(/\$\$/g) || []).length;
  if (dollars % 2 !== 0) fail(file, 'nombre impair de délimiteurs $$');
  if (!/^\s*(--[^\n]*\n\s*)*/i.test(sql)) fail(file, 'en-tête illisible');

  const tables = [...sql.matchAll(/create table if not exists public\.(\w+)/gi)].map((m) => m[1]);
  for (const table of tables) {
    if (LEGACY_TABLES.includes(table)) {
      fail(file, `collision avec la table legacy public.${table} (préfixe portfolio_ obligatoire)`);
    }
    const rls = new RegExp(`alter table public\\.${table}\\s+enable row level security`, 'i');
    if (!rls.test(sql)) fail(file, `RLS non activée pour ${table}`);
  }

  for (const match of sql.matchAll(/create policy "([^"]+)"\s+on\s+(public|storage)\.(\w+)/gi)) {
    const name = match[1];
    const schema = match[2];
    const table = match[3];
    const at = match.index;
    const drop = new RegExp(`drop policy if exists "${name}" on ${schema}\\.${table}`, 'i');
    if (!drop.test(sql.slice(0, at))) fail(file, `policy "${name}" sur ${schema}.${table} sans drop if exists préalable`);
  }
}

if (files.length === 0) {
  console.error('FAIL aucune migration trouvée dans supabase/migrations/');
  process.exit(1);
}

if (errors) {
  console.error(`\n${errors} problème(s) SQL.`);
  process.exit(1);
}
console.log(`OK — ${files.length} migration(s) vérifiée(s).`);
