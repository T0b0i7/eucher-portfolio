-- ============================================================================
-- P0 — seed des projets publiés, généré par scripts/build-seed.mjs
-- Source : assets/js/catalog.js. Déterministe, idempotent, sans secret.
-- À appliquer APRÈS les migrations 01, 02 et 03.
-- ============================================================================

begin;

insert into public.portfolio_categories (slug, name) values
  ('mobile', 'Mobile'),
  ('ia', 'IA'),
  ('web', 'Web')
on conflict (slug) do update set name = excluded.name;

insert into public.portfolio_technologies (slug, name) values
  ('expo-54', 'Expo 54'),
  ('react-native', 'React Native'),
  ('typescript', 'TypeScript'),
  ('supabase', 'Supabase'),
  ('react', 'React'),
  ('node-js', 'Node.js'),
  ('trpc', 'tRPC'),
  ('mysql', 'MySQL'),
  ('next-js-16', 'Next.js 16'),
  ('react-19', 'React 19'),
  ('javascript', 'JavaScript'),
  ('html', 'HTML'),
  ('css', 'CSS'),
  ('next-js-13', 'Next.js 13'),
  ('react-18', 'React 18'),
  ('next-js', 'Next.js')
on conflict (slug) do update set name = excluded.name;

-- Projet 1 : Akouè App
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  1, 'akoue-app', 'Akouè App', 'Application mobile de gestion financière personnelle : portefeuilles multiples, suivi des transactions et statistiques pour piloter son budget au quotidien.', 'Akouè App est une application mobile de gestion financière personnelle. Elle réunit plusieurs portefeuilles, le suivi des transactions et des statistiques pour aider à piloter un budget au quotidien.

Elle est développée avec Expo 54 et React Native en TypeScript, avec Supabase côté données.', 'published'::public.portfolio_project_status, false, 1, 'Conception et développement', 'Fintech personnelle', 'https://akoue-app.vercel.app', null, true, false, '[]'::jsonb, '["Portefeuilles multiples","Suivi des transactions","Statistiques pour piloter son budget"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 1);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 1);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 1 and c.slug = 'mobile'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('expo-54', 'react-native', 'typescript', 'supabase')
where p.legacy_id = 1
on conflict do nothing;

-- Projet 2 : NaviGarde IA
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  2, 'navigarde-ia', 'NaviGarde IA', 'Cockpit maritime de supervision : embarcations, alertes, inspections, rapports et bulletins, avec assistance IA et validation humaine.', 'NaviGarde IA est un cockpit maritime de supervision. Il rassemble les embarcations, les alertes, les inspections, les rapports et les bulletins dans une interface unique.

Une assistance IA vient appuyer le travail de supervision, avec une validation humaine avant application. La pile combine React et TypeScript côté interface, Node.js avec tRPC côté services, et MySQL pour les données.', 'published'::public.portfolio_project_status, false, 2, 'Conception et développement', 'Maritime', 'https://t0b0i7.github.io/NaviGarde_IA/', null, true, false, '[]'::jsonb, '["Supervision des embarcations","Gestion des alertes","Inspections et rapports","Bulletins","Assistance IA avec validation humaine"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 2);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 2);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 2 and c.slug = 'ia'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('react', 'typescript', 'node-js', 'trpc', 'mysql')
where p.legacy_id = 2
on conflict do nothing;

-- Projet 3 : Clavis
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  3, 'clavis', 'Clavis', 'Application de test de frappe : modes minutés, citations et zen, clavier interactif, sons mécaniques et statistiques de précision.', 'Clavis est une application de test de frappe. Elle propose des modes minutés, des citations et un mode zen, un clavier interactif, des sons mécaniques et des statistiques de précision.

Elle est construite avec Next.js 16 et React 19 en TypeScript.', 'published'::public.portfolio_project_status, false, 3, 'Conception et développement', 'Productivité', 'https://clavis-azure.vercel.app', null, true, false, '[]'::jsonb, '["Modes minutés, citations et zen","Clavier interactif","Sons mécaniques","Statistiques de précision"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 3);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 3);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 3 and c.slug = 'web'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('next-js-16', 'react-19', 'typescript')
where p.legacy_id = 3
on conflict do nothing;

-- Projet 4 : Havre
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  4, 'havre', 'Havre', 'Site immobilier complet : landing, catalogue de biens, journal éditorial et visite 3D générée depuis un plan.', 'Havre est un site immobilier complet. Il comprend une page d’accueil, un catalogue de biens, un journal éditorial et une visite 3D générée à partir d’un plan.

Il est développé en JavaScript, HTML et CSS.', 'published'::public.portfolio_project_status, false, 4, 'Conception et développement', 'Immobilier', 'https://havre-olive.vercel.app', null, true, false, '[]'::jsonb, '["Page d’accueil","Catalogue de biens","Journal éditorial","Visite 3D générée depuis un plan"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 4);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 4);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 4 and c.slug = 'web'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('javascript', 'html', 'css')
where p.legacy_id = 4
on conflict do nothing;

-- Projet 5 : Cauris Group International
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  5, 'cauris-group-international', 'Cauris Group International', 'Site corporate multi-pages : accueil, à propos, services, projets, blog et contact, avec composants réutilisables et styles normés.', 'Cauris Group International est un site corporate multi-pages. Il regroupe une page d’accueil, une page à propos, les services, les projets, le blog et le contact, avec des composants réutilisables et des styles normés.

Le site est développé avec Next.js 13 et React 18 en TypeScript.', 'published'::public.portfolio_project_status, false, 5, 'Conception et développement', 'Corporate', 'https://github.com/T0b0i7/cauris-group-international-site-web-corporate', 'https://github.com/T0b0i7/cauris-group-international-site-web-corporate', true, true, '[]'::jsonb, '["Pages accueil, à propos, services, projets, blog et contact","Composants réutilisables","Styles normés"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 5);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 5);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 5 and c.slug = 'web'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('next-js-13', 'react-18', 'typescript')
where p.legacy_id = 5
on conflict do nothing;

-- Projet 6 : Savekari Beauty
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  6, 'savekari-beauty', 'Savekari Beauty', 'Portfolio numérique et catalogue produits pour une marque de beauté : histoire, valeurs, produits phares et commande directe par WhatsApp.', 'Savekari Beauty est un portfolio numérique et un catalogue produits pour une marque de beauté. Il présente l’histoire de la marque, ses valeurs et ses produits phares, avec une commande directe par WhatsApp.

Il est développé avec Next.js, React et TypeScript.', 'published'::public.portfolio_project_status, false, 6, 'Conception et développement', 'Beauté et commerce', 'https://github.com/T0b0i7/savekari-beauty', 'https://github.com/T0b0i7/savekari-beauty', true, true, '[]'::jsonb, '["Portfolio de la marque","Catalogue produits","Histoire et valeurs","Commande directe par WhatsApp"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 6);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 6);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 6 and c.slug = 'web'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('next-js', 'react', 'typescript')
where p.legacy_id = 6
on conflict do nothing;

-- Projet 8 : Portefolio.OS
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  8, 'portefolio-os', 'Portefolio.OS', 'Template de portfolio prêt à personnaliser : structure modulaire, sections réutilisables et base de design system.', 'Portefolio.OS est un template de portfolio prêt à personnaliser. Il repose sur une structure modulaire, des sections réutilisables et une base de design system.

Il est développé avec Next.js, React et TypeScript.', 'published'::public.portfolio_project_status, false, 7, 'Conception et développement', 'Outils de développement', 'https://portefolio-os-bice.vercel.app', null, true, false, '[]'::jsonb, '["Structure modulaire","Sections réutilisables","Base de design system"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 8);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 8);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 8 and c.slug = 'web'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('next-js', 'react', 'typescript')
where p.legacy_id = 8
on conflict do nothing;

-- Projet 9 : Vigilance BJ
insert into public.portfolio_projects (
  legacy_id, slug, title, short_desc, long_desc, status, featured, sort_order,
  role, sector, demo_url, repo_url, demo_visible, repo_visible, impact, features, published_at
) values (
  9, 'vigilance-bj', 'Vigilance BJ', 'Plateforme collaborative de signalement anonyme des menaces numériques au Bénin : arnaques, faux profils, harcèlement et phishing.', 'Vigilance BJ est une plateforme collaborative de signalement anonyme des menaces numériques au Bénin. Elle couvre les arnaques, les faux profils, le harcèlement et le phishing.

Elle est développée avec Next.js, React, TypeScript et Supabase.', 'published'::public.portfolio_project_status, false, 8, 'Conception et développement', 'Cybersécurité citoyenne', 'https://vigilance-bj.vercel.app', null, true, false, '[]'::jsonb, '["Signalement anonyme","Menaces numériques : arnaques, faux profils, harcèlement et phishing","Plateforme collaborative"]'::jsonb, '2026-11-14T00:00:00Z'
) on conflict (legacy_id) do update set
  slug = excluded.slug, title = excluded.title, short_desc = excluded.short_desc,
  long_desc = excluded.long_desc, status = excluded.status, sort_order = excluded.sort_order,
  role = excluded.role, sector = excluded.sector, demo_url = excluded.demo_url,
  repo_url = excluded.repo_url, demo_visible = excluded.demo_visible,
  repo_visible = excluded.repo_visible, impact = excluded.impact, features = excluded.features,
  published_at = coalesce(public.portfolio_projects.published_at, excluded.published_at), updated_at = now();

delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where legacy_id = 9);
delete from public.portfolio_project_technologies where project_id = (select id from public.portfolio_projects where legacy_id = 9);

insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.legacy_id = 9 and c.slug = 'web'
on conflict do nothing;

insert into public.portfolio_project_technologies (project_id, technology_id)
select p.id, t.id from public.portfolio_projects p join public.portfolio_technologies t
  on t.slug in ('next-js', 'react', 'typescript', 'supabase')
where p.legacy_id = 9
on conflict do nothing;

commit;

-- Vérification attendue après application :
--   select count(*) from public.portfolio_projects;            -- 8
--   select count(*) from public.portfolio_categories;          -- 3
--   select count(*) from public.portfolio_technologies;        -- 16
--   select count(*) from public.portfolio_project_technologies;
