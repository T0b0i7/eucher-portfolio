-- ============================================================================
-- SCRIPT SQL DE PUBLICATION DES PROJETS DANS SUPABASE
-- Projets ciblés :
--   1. devwell-cli (ID: 10)
--   2. la-clinique-du-boulevard-lagunaire (ID: 11)
--   3. portfolio-rebuild / Monograph (ID: 12)
--   4. Projet-Grace-Branco / Crea Soul Studio (ID: 13)
--   5. Portefolio.OS (ID: 8 - Déjà existant, conservé)
--
-- Exécutez ce script dans l'éditeur SQL de votre tableau de bord Supabase :
-- https://supabase.com/dashboard/project/pwpfoqgiltdgdlaazdjc/sql/new
-- ============================================================================

begin;

-- Mise à jour du document maître dans public.portfolio (ID: 1)
-- Le trigger existant (trg_sync_portfolio_projects) projettera automatiquement
-- tous les projets vers public.portfolio_projects, public.portfolio_categories et public.portfolio_technologies.
update public.portfolio
set data = jsonb_build_object(
  'projects',
  jsonb_build_array(
    -- 1. Akoué App
    jsonb_build_object(
      'id', 1,
      'n', 'Akoué App',
      'd', 'Application mobile de gestion financière personnelle : portefeuilles multiples, suivi des transactions et statistiques pour piloter son budget au quotidien.',
      'cat', 'Mobile',
      'st', 'Publié',
      't', 'Expo 54, React Native, TypeScript, Supabase',
      'u', 'https://akoue-app.vercel.app',
      'preview', 'https://akoue-app.vercel.app',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 2. NaviGarde IA
    jsonb_build_object(
      'id', 2,
      'n', 'NaviGarde IA',
      'd', 'Cockpit maritime de supervision : embarcations, alertes, inspections, rapports et bulletins, avec assistance IA et validation humaine.',
      'cat', 'IA',
      'st', 'Publié',
      't', 'React, TypeScript, Node.js, tRPC, MySQL',
      'u', 'https://t0b0i7.github.io/NaviGarde_IA/',
      'preview', 'https://t0b0i7.github.io/NaviGarde_IA/',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 3. Clavis
    jsonb_build_object(
      'id', 3,
      'n', 'Clavis',
      'd', 'Application de test de frappe : modes minutés, citations et zen, clavier interactif, sons mécaniques et statistiques de précision.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'Next.js 16, React 19, TypeScript',
      'u', 'https://clavis-azure.vercel.app',
      'preview', 'https://clavis-azure.vercel.app',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 4. Havre
    jsonb_build_object(
      'id', 4,
      'n', 'Havre',
      'd', 'Site immobilier complet : landing, catalogue de biens, journal éditorial et visite 3D générée depuis un plan.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'JavaScript, HTML, CSS',
      'u', 'https://havre-olive.vercel.app',
      'preview', 'https://havre-olive.vercel.app',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 5. Cauris Group International
    jsonb_build_object(
      'id', 5,
      'n', 'Cauris Group International',
      'd', 'Site corporate multi-pages : accueil, à propos, services, projets, blog et contact, avec composants réutilisables et styles normés.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'Next.js 13, React 18, TypeScript',
      'u', 'https://github.com/T0b0i7/cauris-group-international-site-web-corporate',
      'preview', '',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 6. Savekari Beauty
    jsonb_build_object(
      'id', 6,
      'n', 'Savekari Beauty',
      'd', 'Portfolio numérique et catalogue produits pour une marque de beauté : histoire, valeurs, produits phares et commande directe par WhatsApp.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'Next.js, React, TypeScript',
      'u', 'https://github.com/T0b0i7/savekari-beauty',
      'preview', '',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 8. Portefolio.OS
    jsonb_build_object(
      'id', 8,
      'n', 'Portefolio.OS',
      'd', 'Template de portfolio prêt à personnaliser : structure modulaire, sections réutilisables et base de design system.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'Next.js, React, TypeScript',
      'u', 'https://portefolio-os-bice.vercel.app',
      'preview', 'https://portefolio-os-bice.vercel.app',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 9. Vigilance BJ
    jsonb_build_object(
      'id', 9,
      'n', 'Vigilance BJ',
      'd', 'Plateforme collaborative de signalement anonyme des menaces numériques au Bénin : arnaques, faux profils, harcèlement et phishing.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'Next.js, React, TypeScript, Supabase',
      'u', 'https://vigilance-bj.vercel.app',
      'preview', 'https://vigilance-bj.vercel.app',
      'cover', '',
      'don', 'Non',
      'dl', ''
    ),
    -- 10. devwell-cli (NOUVEAU PUBLIÉ)
    jsonb_build_object(
      'id', 10,
      'slug', 'devwell-cli',
      'n', 'Devwell CLI',
      'd', 'Boîte à outils pratique en ligne de commande pour assainir vos dépôts : audit de variables d’environnement (.env), bilan de santé de projet (doctor) et gestion des branches Git.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'TypeScript, Node.js, CLI, Git, dotenv',
      'u', 'https://github.com/T0b0i7/devwell-cli',
      'preview', 'https://devwell-vert.vercel.app',
      'cover', 'https://opengraph.githubassets.com/1/T0b0i7/devwell-cli',
      'don', 'Non',
      'dl', ''
    ),
    -- 11. la-clinique-du-boulevard-lagunaire (NOUVEAU PUBLIÉ)
    jsonb_build_object(
      'id', 11,
      'slug', 'la-clinique-du-boulevard-lagunaire',
      'n', 'Clinique du Boulevard Lagunaire',
      'd', 'Site web vitrine de la Clinique du Boulevard Lagunaire à Porto-Novo (Bénin) : présentation des spécialités médicales, urgences 24h/7j, chirurgie, orthopédie et laboratoire.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'HTML, CSS, JavaScript',
      'u', 'https://github.com/T0b0i7/la-clinique-du-boulevard-lagunaire',
      'preview', 'https://t0b0i7.github.io/la-clinique-du-boulevard-lagunaire/',
      'cover', 'https://opengraph.githubassets.com/1/T0b0i7/la-clinique-du-boulevard-lagunaire',
      'don', 'Non',
      'dl', ''
    ),
    -- 12. portfolio-rebuild (Monograph) (NOUVEAU PUBLIÉ)
    jsonb_build_object(
      'id', 12,
      'slug', 'portfolio-rebuild',
      'n', 'Monograph Portfolio',
      'd', 'Template de portfolio open-source 100 % statique optimisé pour GitHub Pages : Server Components, palette Ctrl+K, carrousel de projets et bascule jour/nuit fluide.',
      'cat', 'Web',
      'st', 'Publié',
      't', 'Next.js 16, React 19, TypeScript, Tailwind CSS',
      'u', 'https://github.com/T0b0i7/portfolio-rebuild',
      'preview', 'https://t0b0i7.github.io/portfolio-rebuild/',
      'cover', 'https://opengraph.githubassets.com/1/T0b0i7/portfolio-rebuild',
      'don', 'Non',
      'dl', ''
    ),
    -- 13. Projet-Grace-Branco (Crea Soul Studio) (NOUVEAU PUBLIÉ)
    jsonb_build_object(
      'id', 13,
      'slug', 'projet-grace-branco',
      'n', 'Crea Soul Studio',
      'd', 'Portfolio créatif et vitrine interactive de photographie et modélisation, avec transitions dynamiques, design responsive épuré et animations Framer Motion.',
      'cat', 'Design',
      'st', 'Publié',
      't', 'React, TypeScript, Vite, Tailwind CSS, Framer Motion',
      'u', 'https://github.com/T0b0i7/Projet-Grace-Branco',
      'preview', 'https://github.com/T0b0i7/Projet-Grace-Branco',
      'cover', 'https://opengraph.githubassets.com/1/T0b0i7/Projet-Grace-Branco',
      'don', 'Non',
      'dl', ''
    )
  )
),
updated_at = now()
where id = 1;

commit;

-- Vérification immédiate du résultat :
select id, legacy_id, slug, title, status, demo_url, repo_url 
from public.portfolio_projects 
order by sort_order asc, legacy_id asc;
