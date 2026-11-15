# Spec — GitHub universel, catalogue centralisé et agent JARVIS

**Date :** 2026-11-15 · **Statut :** analyse validée, implémentation par phases

## 1. Analyse de l'existant

| Brique | État | Réutilisable |
|---|---|---|
| Portfolio public (P0–P2) | Projets publiés uniquement, galerie + taxonomie + médias | Oui, inchangé |
| Admin (taxonomie, projets, médias, apparence) | SPA vanilla + Supabase | Oui, on ajoute des écrans |
| GitHub P3 | `portfolio_github_repositories` liée 1-1 à un projet publié, `github-sync` par projet, webhook push | Partiellement : à généraliser |
| Bot actuel | Palette Ctrl+K / commandes locales, pas d'IA, pas d'outils | Remplacé par un panneau JARVIS |
| Données | Document JSON + tables `portfolio_*` | Conservé ; le catalogue GitHub est **indépendant** |

**Verrous actuels à lever :**
1. La table GitHub exige un `project_id` → impossible de stocker un dépôt non publié.
2. La sync est par projet → pas d'inventaire de compte.
3. Aucune notion de brouillon de fiche générée depuis un dépôt.
4. Aucun orchestrateur d'agent, aucun journal d'actions, aucune validation avant publication.

## 2. Architecture cible (séparation stricte)

```
GitHub API ──► connecteur (PAT fine-grained, serveur uniquement)
                 │
                 ▼
        service de synchronisation (Edge Function github-inventory)
                 │  inventaire complet, incrémental, paginé
                 ▼
     catalogue centralisé  portfolio_github_catalog (indépendant des projets)
                 │
      ┌──────────┴───────────┐
      ▼                      ▼
analyseur de dépôt      interface catalogue admin
(README, langages,      (recherche, filtres, statuts)
 structure, activité)            │
      │                          ▼
      ▼                  brouillon de fiche (draft)
générateur de contenu ──► validation explicite ──► publication portfolio
      ▲
      │ outils
orchestrateur JARVIS ──► journal d'actions / confirmations
      │
      ▼
interface conversation + étapes + annulation
```

**Règles :**
- Le catalogue GitHub ne publie **jamais** automatiquement.
- Un dépôt privé n'est jamais lisible par `anon` (RLS propriétaire uniquement).
- Toute action sensible (publication, suppression, mise à jour majeure) exige une confirmation explicite.
- Les outils de l'agent sont des RPC/Edge Functions à permissions minimales, tracées dans un journal.
- Le portfolio public ne lit que `portfolio_projects` publiés (inchangé).

## 3. Modèle de données ajouté

- `portfolio_github_catalog` : `id` (GitHub repo id), `full_name` unique, `name`, `owner_login`, `description`, `private`, `archived`, `fork`, `disabled`, `language`, `topics`, `default_branch`, `html_url`, `homepage`, `stargazers_count`, `forks_count`, `open_issues_count`, dates GitHub, `readme`, `languages jsonb`, `branches jsonb`, `releases jsonb`, `sync_status`, `sync_error`, `synced_at`, `published_project_id` nullable.
- `portfolio_agent_conversations` / `portfolio_agent_messages` : historique JARVIS.
- `portfolio_agent_actions` : plan, outil, entrée, sortie, statut (pending/running/done/failed/cancelled), confirmation requise.
- `portfolio_project_drafts` (ou réutilisation de `portfolio_drafts`) : contenu généré en attente de validation.

## 4. Phases

- **P6 — Catalogue universel** : migration catalogue + Edge Function `github-inventory` (tous dépôts accessibles, pagination, archivés/privés, langages, branches, releases, README), admin catalogue (recherche/filtres/tri/détail), statut de publication. Aucune publication automatique.
- **P7 — Analyse & génération** : service d'analyse (README, structure, stack, activité, qualité) et générateur de fiche Atlas + propositions catégories/tags ; brouillon + aperçu + validation.
- **P8 — Orchestrateur JARVIS** : Edge Function LLM (tool-calling), outils lecture (catalogue, GitHub, analyse), outils écriture (brouillon, taxonomie, publication) avec confirmations, journal, reprise, annulation.
- **P9 — Interface JARVIS** : panneau conversation, étapes en temps réel, historique, confirmations, erreurs, annulation.
- **P10 — Durcissement** : quotas, audit, tests E2E, rotation des tokens.

## 5. Sécurité

- PAT GitHub fine-grained (Contents/Administration/Metadata read) stocké en secret Supabase ; jamais exposé au navigateur.
- RLS : catalogue, conversations et actions propriétaire uniquement ; aucune policy `anon`.
- Edge Functions : vérification JWT + `is_owner()` systématique, journal d'audit, limites de taille/pagination.
- Publication : double contrôle (génération → confirmation humaine → écriture publiée).
- Données privées : jamais dans `portfolio_public`/document public ; révision avant toute publication.

## 6. Critères d'acceptation

1. L'inventaire contient 100 % des dépôts accessibles (publics, privés autorisés, archivés), y compris créés plus tard.
2. Aucun dépôt non publié n'apparaît côté public.
3. Le catalogue admin permet recherche, filtres (visibilité, statut, langage), tri et détail.
4. Une commande JARVIS « publie Akouè » produit un brouillon complet, un aperçu, puis attend confirmation avant publication.
5. Toute action d'écriture est journalisée, annulable si non confirmée.
6. Aucune régression P0–P5 (tests existants verts).
