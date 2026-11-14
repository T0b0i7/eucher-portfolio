// Vérifications statiques du socle GitHub (P3).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './helpers.mjs';

const sql = fs.readFileSync(path.join(repoRoot, 'supabase/migrations/2026-11-15-08-p3-github.sql'), 'utf8')
  .toLowerCase().replace(/\s+/g, ' ');
const fn = fs.readFileSync(path.join(repoRoot, 'supabase/functions/github-sync/index.ts'), 'utf8');

test('github : dépôts, commits et classification', () => {
  assert.match(sql, /portfolio_github_repositories/);
  assert.match(sql, /portfolio_github_commits/);
  assert.match(sql, /portfolio_classify_commit/);
  ['feat', 'fix', 'refactor', 'docs', 'perf', 'chore', 'improvement'].forEach((category) => {
    assert.match(sql, new RegExp("'" + category + "'"));
  });
  assert.match(sql, /category text not null/);
  assert.match(sql, /unique \(repository_id, sha\)/);
});

test('github : RLS propriétaire et lecture publique des seuls publiés', () => {
  assert.match(sql, /enable row level security/);
  assert.match(sql, /github_repos_owner_write/);
  assert.match(sql, /github_commits_owner_write/);
  assert.match(sql, /status = 'published'/);
  assert.match(sql, /is_owner\(\)/);
});

test('github : Edge Function de synchronisation', () => {
  assert.match(fn, /Deno\.serve/);
  assert.match(fn, /GITHUB_TOKEN|GITHUB_APP/);
  assert.match(fn, /api\.github\.com/);
  assert.match(fn, /authorization/i);
  assert.match(fn, /supabase|createClient/i);
  assert.match(fn, /portfolio_github_repositories/);
  assert.match(fn, /portfolio_github_commits/);
});
