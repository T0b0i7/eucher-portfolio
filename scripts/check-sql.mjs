// Contrôles statiques des migrations SQL (aucune connexion base requise).
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from '../tests/helpers.mjs';

const MIGRATIONS_DIR = path.join(repoRoot, 'supabase/migrations');
const files = fs.existsSync(MIGRATIONS_DIR)
  ? fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort()
  : [];

let errors = 0;
const fail = (file, message) => { console.error(`FAIL ${file}: ${message}`); errors += 1; };

for (const file of files) {
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
  const dollars = (sql.match(/\$\$/g) || []).length;
  if (dollars % 2 !== 0) fail(file, 'nombre impair de délimiteurs $$');
  if (!/^\s*(--[^\n]*\n\s*)*/i.test(sql)) fail(file, 'en-tête illisible');

  const tables = [...sql.matchAll(/create table if not exists public\.(\w+)/gi)].map((m) => m[1]);
  for (const table of tables) {
    const rls = new RegExp(`alter table public\\.${table}\\s+enable row level security`, 'i');
    if (!rls.test(sql)) fail(file, `RLS non activée pour ${table}`);
  }

  for (const match of sql.matchAll(/create policy "([^"]+)"\s+on\s+public\.(\w+)/gi)) {
    const name = match[1];
    const table = match[2];
    const at = match.index;
    const drop = new RegExp(`drop policy if exists "${name}" on public\\.${table}`, 'i');
    if (!drop.test(sql.slice(0, at))) fail(file, `policy "${name}" sur ${table} sans drop if exists préalable`);
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
