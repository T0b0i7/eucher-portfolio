# Synchronisation GitHub (P3)

## 1. Migration

Appliquer `supabase/migrations/2026-11-15-08-p3-github.sql` (tables `portfolio_github_repositories`, `portfolio_github_commits`, classification, RLS). Puis vérifier :

```sql
select count(*) from public.portfolio_github_repositories;
select public.portfolio_classify_commit('feat(galerie): ajouter les filtres'); -- feat
```

## 2. Déployer l’Edge Function

```bash
supabase functions deploy github-sync
supabase secrets set GITHUB_TOKEN=github_pat_xxx
# optionnel webhook :
supabase secrets set GITHUB_WEBHOOK_SECRET=xxx
```

Le token GitHub doit pouvoir **lire les dépôts et commits** (fine-grained : `Contents: read`, `Metadata: read`).

## 3. Associer un dépôt

Dans l’admin, le projet doit avoir `repo_url` = `https://github.com/owner/repo`. L’onglet **GitHub** affiche les projets, le dépôt détecté et le bouton **Synchroniser** (appel `github-sync` avec `projectId`).

## 4. Webhook (optionnel)

Dans GitHub → dépôt → Webhooks : URL `https://<ref>.supabase.co/functions/v1/github-sync`, événement **push**, secret = `GITHUB_WEBHOOK_SECRET`. L’Edge Function vérifie la signature HMAC et rafraîchit les commits.

## 5. Classification

`feat`, `fix`, `refactor`, `docs`, `perf`, `test`, `chore`, `style`, `improvement`, `revert`, `other` — calculée à partir du message de commit (Conventional Commits ou verbes usuels).

## 6. Vérification

```bash
curl -X POST "https://<ref>.supabase.co/functions/v1/github-sync" \
  -H "Authorization: Bearer <ACCESS_TOKEN_OWNER>" -H "Content-Type: application/json" \
  -d '{"projectId":"<uuid>"}'
```

Retour attendu : `{ ok: true, repository, commits }`. La limite de commits est bornée (1–100).
