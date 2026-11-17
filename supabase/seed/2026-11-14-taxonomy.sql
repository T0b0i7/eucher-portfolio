-- ============================================================================
-- P2a — seed de la taxonomie (généré par scripts/build-taxonomy.mjs)
-- 40 familles, 7 mises en avant, 254 sous-catégories, 42 tags.
-- À appliquer APRÈS les migrations P0 et 2026-11-14-05-p2-taxonomy.sql.
-- ============================================================================

begin;

insert into public.portfolio_categories (slug, name, name_en, featured, sort_order) values
  ('web-development', 'Développement Web', 'Web Development', true, 1),
  ('mobile-development', 'Développement Mobile', 'Mobile Development', true, 2),
  ('desktop-development', 'Développement Desktop', 'Desktop Development', false, 3),
  ('software-engineering', 'Ingénierie logicielle', 'Software Engineering', false, 4),
  ('api-development', 'Développement d’API et intégrations', 'API Development & Integrations', false, 5),
  ('artificial-intelligence', 'Intelligence artificielle', 'Artificial Intelligence', true, 6),
  ('ai-agents-agentic-systems', 'Agents IA et systèmes agentiques', 'AI Agents & Agentic Systems', true, 7),
  ('machine-learning', 'Machine Learning', 'Machine Learning', false, 8),
  ('deep-learning', 'Deep Learning', 'Deep Learning', false, 9),
  ('large-language-models', 'Grands modèles de langage (LLM)', 'Large Language Models (LLM)', false, 10),
  ('ai-automation', 'Automatisation IA', 'AI Automation', false, 11),
  ('ai-media-generation', 'Génération de médias par IA', 'AI Media Generation', false, 12),
  ('database-engineering', 'Bases de données', 'Database Engineering', false, 13),
  ('data-science', 'Science des données', 'Data Science', false, 14),
  ('data-engineering', 'Ingénierie des données', 'Data Engineering', false, 15),
  ('devops-engineering', 'DevOps et infrastructure', 'DevOps Engineering', false, 16),
  ('cloud-computing', 'Cloud', 'Cloud Computing', false, 17),
  ('system-administration', 'Administration système', 'System Administration', false, 18),
  ('site-reliability-engineering', 'Site Reliability Engineering', 'Site Reliability Engineering (SRE)', false, 19),
  ('cybersecurity', 'Cybersécurité', 'Cybersecurity', true, 20),
  ('ethical-hacking', 'Hacking éthique', 'Ethical Hacking', false, 21),
  ('digital-identity-authentication', 'Identité numérique et authentification', 'Digital Identity & Authentication', false, 22),
  ('ui-ux-design', 'Design UI/UX', 'UI/UX Design', true, 23),
  ('graphic-design', 'Design graphique', 'Graphic Design', false, 24),
  ('motion-design', 'Motion Design', 'Motion Design', false, 25),
  ('3d-immersive-experiences', '3D et expériences immersives', '3D & Immersive Experiences', false, 26),
  ('blockchain-web3', 'Blockchain et Web3', 'Blockchain & Web3', false, 27),
  ('internet-of-things', 'Internet des objets (IoT)', 'Internet of Things (IoT)', false, 28),
  ('robotics-embedded-systems', 'Robotique et systèmes embarqués', 'Robotics & Embedded Systems', false, 29),
  ('ar-vr-xr', 'AR / VR / XR', 'AR / VR / XR', false, 30),
  ('saas-software-products', 'SaaS et produits logiciels', 'SaaS & Software Products', true, 31),
  ('fintech', 'FinTech', 'FinTech', false, 32),
  ('edtech', 'EdTech', 'EdTech', false, 33),
  ('healthtech', 'HealthTech', 'HealthTech', false, 34),
  ('business-enterprise-solutions', 'Solutions métiers et entreprise', 'Business & Enterprise Solutions', false, 35),
  ('e-government-civictech', 'E-Gouvernement et CivicTech', 'E-Government & CivicTech', false, 36),
  ('game-development', 'Développement de jeux', 'Game Development', false, 37),
  ('testing-quality-assurance', 'Tests et assurance qualité', 'Testing & Quality Assurance', false, 38),
  ('open-source-projects', 'Projets open source', 'Open Source Projects', false, 39),
  ('technical-research-innovation', 'Recherche technique et innovation', 'Technical Research & Innovation', false, 40)
on conflict (slug) do update set
  name = excluded.name, name_en = excluded.name_en, featured = excluded.featured, sort_order = excluded.sort_order;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'frontend-development', 'Frontend Development', 'Frontend Development', p.id, false, 1
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'backend-development', 'Backend Development', 'Backend Development', p.id, false, 2
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'full-stack-development', 'Full Stack Development', 'Full Stack Development', p.id, false, 3
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'web-applications', 'Web Applications', 'Web Applications', p.id, false, 4
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'progressive-web-apps-pwa', 'Progressive Web Apps (PWA)', 'Progressive Web Apps (PWA)', p.id, false, 5
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'web-platforms', 'Web Platforms', 'Web Platforms', p.id, false, 6
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'e-commerce', 'E-commerce', 'E-commerce', p.id, false, 7
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cms-headless-cms', 'CMS & Headless CMS', 'CMS & Headless CMS', p.id, false, 8
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'web-portals', 'Web Portals', 'Web Portals', p.id, false, 9
from public.portfolio_categories p where p.slug = 'web-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'android-development', 'Android Development', 'Android Development', p.id, false, 1
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ios-development', 'iOS Development', 'iOS Development', p.id, false, 2
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cross-platform-development', 'Cross-Platform Development', 'Cross-Platform Development', p.id, false, 3
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'react-native', 'React Native', 'React Native', p.id, false, 4
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'flutter', 'Flutter', 'Flutter', p.id, false, 5
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'mobile-applications', 'Mobile Applications', 'Mobile Applications', p.id, false, 6
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'mobile-games', 'Mobile Games', 'Mobile Games', p.id, false, 7
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'wearable-applications', 'Wearable Applications', 'Wearable Applications', p.id, false, 8
from public.portfolio_categories p where p.slug = 'mobile-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'windows-applications', 'Windows Applications', 'Windows Applications', p.id, false, 1
from public.portfolio_categories p where p.slug = 'desktop-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'macos-applications', 'macOS Applications', 'macOS Applications', p.id, false, 2
from public.portfolio_categories p where p.slug = 'desktop-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'linux-applications', 'Linux Applications', 'Linux Applications', p.id, false, 3
from public.portfolio_categories p where p.slug = 'desktop-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cross-platform-desktop', 'Cross-Platform Desktop', 'Cross-Platform Desktop', p.id, false, 4
from public.portfolio_categories p where p.slug = 'desktop-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'electron-applications', 'Electron Applications', 'Electron Applications', p.id, false, 5
from public.portfolio_categories p where p.slug = 'desktop-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'desktop-utilities', 'Desktop Utilities', 'Desktop Utilities', p.id, false, 6
from public.portfolio_categories p where p.slug = 'desktop-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'architecture-logicielle', 'Architecture Logicielle', 'Architecture Logicielle', p.id, false, 1
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'software-design', 'Software Design', 'Software Design', p.id, false, 2
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'microservices', 'Microservices', 'Microservices', p.id, false, 3
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'monolithic-architecture', 'Monolithic Architecture', 'Monolithic Architecture', p.id, false, 4
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'distributed-systems', 'Distributed Systems', 'Distributed Systems', p.id, false, 5
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'event-driven-architecture', 'Event-Driven Architecture', 'Event-Driven Architecture', p.id, false, 6
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'domain-driven-design', 'Domain-Driven Design', 'Domain-Driven Design', p.id, false, 7
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'clean-architecture', 'Clean Architecture', 'Clean Architecture', p.id, false, 8
from public.portfolio_categories p where p.slug = 'software-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'rest-api', 'REST API', 'REST API', p.id, false, 1
from public.portfolio_categories p where p.slug = 'api-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'graphql', 'GraphQL', 'GraphQL', p.id, false, 2
from public.portfolio_categories p where p.slug = 'api-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'websockets', 'WebSockets', 'WebSockets', p.id, false, 3
from public.portfolio_categories p where p.slug = 'api-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'api-integrations', 'API Integrations', 'API Integrations', p.id, false, 4
from public.portfolio_categories p where p.slug = 'api-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'third-party-integrations', 'Third-Party Integrations', 'Third-Party Integrations', p.id, false, 5
from public.portfolio_categories p where p.slug = 'api-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'sdk-development', 'SDK Development', 'SDK Development', p.id, false, 6
from public.portfolio_categories p where p.slug = 'api-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'webhooks', 'Webhooks', 'Webhooks', p.id, false, 7
from public.portfolio_categories p where p.slug = 'api-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-applications', 'AI Applications', 'AI Applications', p.id, false, 1
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-powered-platforms', 'AI-Powered Platforms', 'AI-Powered Platforms', p.id, false, 2
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'generative-ai', 'Generative AI', 'Generative AI', p.id, false, 3
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'conversational-ai', 'Conversational AI', 'Conversational AI', p.id, false, 4
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'multimodal-ai', 'Multimodal AI', 'Multimodal AI', p.id, false, 5
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-assistants', 'AI Assistants', 'AI Assistants', p.id, false, 6
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-integration', 'AI Integration', 'AI Integration', p.id, false, 7
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-solutions', 'AI Solutions', 'AI Solutions', p.id, false, 8
from public.portfolio_categories p where p.slug = 'artificial-intelligence'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'autonomous-ai-agents', 'Autonomous AI Agents', 'Autonomous AI Agents', p.id, false, 1
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'multi-agent-systems', 'Multi-Agent Systems', 'Multi-Agent Systems', p.id, false, 2
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'agentic-workflows', 'Agentic Workflows', 'Agentic Workflows', p.id, false, 3
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-coding-agents', 'AI Coding Agents', 'AI Coding Agents', p.id, false, 4
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-research-agents', 'AI Research Agents', 'AI Research Agents', p.id, false, 5
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-customer-support-agents', 'AI Customer Support Agents', 'AI Customer Support Agents', p.id, false, 6
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'agent-orchestration', 'Agent Orchestration', 'Agent Orchestration', p.id, false, 7
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'tool-calling', 'Tool Calling', 'Tool Calling', p.id, false, 8
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'agent-memory-systems', 'Agent Memory Systems', 'Agent Memory Systems', p.id, false, 9
from public.portfolio_categories p where p.slug = 'ai-agents-agentic-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'supervised-learning', 'Supervised Learning', 'Supervised Learning', p.id, false, 1
from public.portfolio_categories p where p.slug = 'machine-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'unsupervised-learning', 'Unsupervised Learning', 'Unsupervised Learning', p.id, false, 2
from public.portfolio_categories p where p.slug = 'machine-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'reinforcement-learning', 'Reinforcement Learning', 'Reinforcement Learning', p.id, false, 3
from public.portfolio_categories p where p.slug = 'machine-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'predictive-modeling', 'Predictive Modeling', 'Predictive Modeling', p.id, false, 4
from public.portfolio_categories p where p.slug = 'machine-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'classification-models', 'Classification Models', 'Classification Models', p.id, false, 5
from public.portfolio_categories p where p.slug = 'machine-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'recommendation-systems', 'Recommendation Systems', 'Recommendation Systems', p.id, false, 6
from public.portfolio_categories p where p.slug = 'machine-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'anomaly-detection', 'Anomaly Detection', 'Anomaly Detection', p.id, false, 7
from public.portfolio_categories p where p.slug = 'machine-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'neural-networks', 'Neural Networks', 'Neural Networks', p.id, false, 1
from public.portfolio_categories p where p.slug = 'deep-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'computer-vision', 'Computer Vision', 'Computer Vision', p.id, false, 2
from public.portfolio_categories p where p.slug = 'deep-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'natural-language-processing-nlp', 'Natural Language Processing (NLP)', 'Natural Language Processing (NLP)', p.id, false, 3
from public.portfolio_categories p where p.slug = 'deep-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'speech-recognition', 'Speech Recognition', 'Speech Recognition', p.id, false, 4
from public.portfolio_categories p where p.slug = 'deep-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'image-recognition', 'Image Recognition', 'Image Recognition', p.id, false, 5
from public.portfolio_categories p where p.slug = 'deep-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'object-detection', 'Object Detection', 'Object Detection', p.id, false, 6
from public.portfolio_categories p where p.slug = 'deep-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'pattern-recognition', 'Pattern Recognition', 'Pattern Recognition', p.id, false, 7
from public.portfolio_categories p where p.slug = 'deep-learning'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'llm-integration', 'LLM Integration', 'LLM Integration', p.id, false, 1
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'rag-systems', 'RAG Systems', 'RAG Systems', p.id, false, 2
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'fine-tuning', 'Fine-Tuning', 'Fine-Tuning', p.id, false, 3
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'prompt-engineering', 'Prompt Engineering', 'Prompt Engineering', p.id, false, 4
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'embeddings', 'Embeddings', 'Embeddings', p.id, false, 5
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'vector-search', 'Vector Search', 'Vector Search', p.id, false, 6
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'knowledge-bases', 'Knowledge Bases', 'Knowledge Bases', p.id, false, 7
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-chatbots', 'AI Chatbots', 'AI Chatbots', p.id, false, 8
from public.portfolio_categories p where p.slug = 'large-language-models'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'workflow-automation', 'Workflow Automation', 'Workflow Automation', p.id, false, 1
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'intelligent-automation', 'Intelligent Automation', 'Intelligent Automation', p.id, false, 2
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'business-process-automation', 'Business Process Automation', 'Business Process Automation', p.id, false, 3
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-powered-workflows', 'AI-Powered Workflows', 'AI-Powered Workflows', p.id, false, 4
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'document-automation', 'Document Automation', 'Document Automation', p.id, false, 5
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'email-automation', 'Email Automation', 'Email Automation', p.id, false, 6
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-processing-automation', 'Data Processing Automation', 'Data Processing Automation', p.id, false, 7
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-orchestration', 'AI Orchestration', 'AI Orchestration', p.id, false, 8
from public.portfolio_categories p where p.slug = 'ai-automation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-image-generation', 'AI Image Generation', 'AI Image Generation', p.id, false, 1
from public.portfolio_categories p where p.slug = 'ai-media-generation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-video-generation', 'AI Video Generation', 'AI Video Generation', p.id, false, 2
from public.portfolio_categories p where p.slug = 'ai-media-generation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-audio-generation', 'AI Audio Generation', 'AI Audio Generation', p.id, false, 3
from public.portfolio_categories p where p.slug = 'ai-media-generation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-voice-synthesis', 'AI Voice Synthesis', 'AI Voice Synthesis', p.id, false, 4
from public.portfolio_categories p where p.slug = 'ai-media-generation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-music-generation', 'AI Music Generation', 'AI Music Generation', p.id, false, 5
from public.portfolio_categories p where p.slug = 'ai-media-generation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ai-content-generation', 'AI Content Generation', 'AI Content Generation', p.id, false, 6
from public.portfolio_categories p where p.slug = 'ai-media-generation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'sql-databases', 'SQL Databases', 'SQL Databases', p.id, false, 1
from public.portfolio_categories p where p.slug = 'database-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'nosql-databases', 'NoSQL Databases', 'NoSQL Databases', p.id, false, 2
from public.portfolio_categories p where p.slug = 'database-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'database-design', 'Database Design', 'Database Design', p.id, false, 3
from public.portfolio_categories p where p.slug = 'database-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'database-administration', 'Database Administration', 'Database Administration', p.id, false, 4
from public.portfolio_categories p where p.slug = 'database-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'database-optimization', 'Database Optimization', 'Database Optimization', p.id, false, 5
from public.portfolio_categories p where p.slug = 'database-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'database-migration', 'Database Migration', 'Database Migration', p.id, false, 6
from public.portfolio_categories p where p.slug = 'database-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-modeling', 'Data Modeling', 'Data Modeling', p.id, false, 7
from public.portfolio_categories p where p.slug = 'database-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-analysis', 'Data Analysis', 'Data Analysis', p.id, false, 1
from public.portfolio_categories p where p.slug = 'data-science'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'statistical-analysis', 'Statistical Analysis', 'Statistical Analysis', p.id, false, 2
from public.portfolio_categories p where p.slug = 'data-science'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'predictive-analytics', 'Predictive Analytics', 'Predictive Analytics', p.id, false, 3
from public.portfolio_categories p where p.slug = 'data-science'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-mining', 'Data Mining', 'Data Mining', p.id, false, 4
from public.portfolio_categories p where p.slug = 'data-science'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'business-intelligence', 'Business Intelligence', 'Business Intelligence', p.id, false, 5
from public.portfolio_categories p where p.slug = 'data-science'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-visualization', 'Data Visualization', 'Data Visualization', p.id, false, 6
from public.portfolio_categories p where p.slug = 'data-science'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-exploration', 'Data Exploration', 'Data Exploration', p.id, false, 7
from public.portfolio_categories p where p.slug = 'data-science'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'etl-elt-pipelines', 'ETL / ELT Pipelines', 'ETL / ELT Pipelines', p.id, false, 1
from public.portfolio_categories p where p.slug = 'data-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-warehousing', 'Data Warehousing', 'Data Warehousing', p.id, false, 2
from public.portfolio_categories p where p.slug = 'data-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'big-data', 'Big Data', 'Big Data', p.id, false, 3
from public.portfolio_categories p where p.slug = 'data-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-integration', 'Data Integration', 'Data Integration', p.id, false, 4
from public.portfolio_categories p where p.slug = 'data-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-streaming', 'Data Streaming', 'Data Streaming', p.id, false, 5
from public.portfolio_categories p where p.slug = 'data-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-pipelines', 'Data Pipelines', 'Data Pipelines', p.id, false, 6
from public.portfolio_categories p where p.slug = 'data-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'data-processing', 'Data Processing', 'Data Processing', p.id, false, 7
from public.portfolio_categories p where p.slug = 'data-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ci-cd-pipelines', 'CI/CD Pipelines', 'CI/CD Pipelines', p.id, false, 1
from public.portfolio_categories p where p.slug = 'devops-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'infrastructure-automation', 'Infrastructure Automation', 'Infrastructure Automation', p.id, false, 2
from public.portfolio_categories p where p.slug = 'devops-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'configuration-management', 'Configuration Management', 'Configuration Management', p.id, false, 3
from public.portfolio_categories p where p.slug = 'devops-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'containerization', 'Containerization', 'Containerization', p.id, false, 4
from public.portfolio_categories p where p.slug = 'devops-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'docker', 'Docker', 'Docker', p.id, false, 5
from public.portfolio_categories p where p.slug = 'devops-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'kubernetes', 'Kubernetes', 'Kubernetes', p.id, false, 6
from public.portfolio_categories p where p.slug = 'devops-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'monitoring-logging', 'Monitoring & Logging', 'Monitoring & Logging', p.id, false, 7
from public.portfolio_categories p where p.slug = 'devops-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cloud-architecture', 'Cloud Architecture', 'Cloud Architecture', p.id, false, 1
from public.portfolio_categories p where p.slug = 'cloud-computing'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cloud-infrastructure', 'Cloud Infrastructure', 'Cloud Infrastructure', p.id, false, 2
from public.portfolio_categories p where p.slug = 'cloud-computing'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'serverless-computing', 'Serverless Computing', 'Serverless Computing', p.id, false, 3
from public.portfolio_categories p where p.slug = 'cloud-computing'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cloud-deployment', 'Cloud Deployment', 'Cloud Deployment', p.id, false, 4
from public.portfolio_categories p where p.slug = 'cloud-computing'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cloud-storage', 'Cloud Storage', 'Cloud Storage', p.id, false, 5
from public.portfolio_categories p where p.slug = 'cloud-computing'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'linux-administration', 'Linux Administration', 'Linux Administration', p.id, false, 1
from public.portfolio_categories p where p.slug = 'system-administration'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'windows-server', 'Windows Server', 'Windows Server', p.id, false, 2
from public.portfolio_categories p where p.slug = 'system-administration'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'server-management', 'Server Management', 'Server Management', p.id, false, 3
from public.portfolio_categories p where p.slug = 'system-administration'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'network-administration', 'Network Administration', 'Network Administration', p.id, false, 4
from public.portfolio_categories p where p.slug = 'system-administration'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'virtualization', 'Virtualization', 'Virtualization', p.id, false, 5
from public.portfolio_categories p where p.slug = 'system-administration'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'infrastructure-management', 'Infrastructure Management', 'Infrastructure Management', p.id, false, 6
from public.portfolio_categories p where p.slug = 'system-administration'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'high-availability', 'High Availability', 'High Availability', p.id, false, 1
from public.portfolio_categories p where p.slug = 'site-reliability-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'performance-monitoring', 'Performance Monitoring', 'Performance Monitoring', p.id, false, 2
from public.portfolio_categories p where p.slug = 'site-reliability-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'incident-management', 'Incident Management', 'Incident Management', p.id, false, 3
from public.portfolio_categories p where p.slug = 'site-reliability-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'fault-tolerance', 'Fault Tolerance', 'Fault Tolerance', p.id, false, 4
from public.portfolio_categories p where p.slug = 'site-reliability-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'system-observability', 'System Observability', 'System Observability', p.id, false, 5
from public.portfolio_categories p where p.slug = 'site-reliability-engineering'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'application-security', 'Application Security', 'Application Security', p.id, false, 1
from public.portfolio_categories p where p.slug = 'cybersecurity'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'network-security', 'Network Security', 'Network Security', p.id, false, 2
from public.portfolio_categories p where p.slug = 'cybersecurity'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cloud-security', 'Cloud Security', 'Cloud Security', p.id, false, 3
from public.portfolio_categories p where p.slug = 'cybersecurity'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'api-security', 'API Security', 'API Security', p.id, false, 4
from public.portfolio_categories p where p.slug = 'cybersecurity'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'identity-access-management', 'Identity & Access Management', 'Identity & Access Management', p.id, false, 5
from public.portfolio_categories p where p.slug = 'cybersecurity'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'security-auditing', 'Security Auditing', 'Security Auditing', p.id, false, 6
from public.portfolio_categories p where p.slug = 'cybersecurity'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'vulnerability-assessment', 'Vulnerability Assessment', 'Vulnerability Assessment', p.id, false, 7
from public.portfolio_categories p where p.slug = 'cybersecurity'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'penetration-testing', 'Penetration Testing', 'Penetration Testing', p.id, false, 1
from public.portfolio_categories p where p.slug = 'ethical-hacking'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'web-application-testing', 'Web Application Testing', 'Web Application Testing', p.id, false, 2
from public.portfolio_categories p where p.slug = 'ethical-hacking'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'network-testing', 'Network Testing', 'Network Testing', p.id, false, 3
from public.portfolio_categories p where p.slug = 'ethical-hacking'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'security-research', 'Security Research', 'Security Research', p.id, false, 4
from public.portfolio_categories p where p.slug = 'ethical-hacking'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'vulnerability-analysis', 'Vulnerability Analysis', 'Vulnerability Analysis', p.id, false, 5
from public.portfolio_categories p where p.slug = 'ethical-hacking'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'authentication-systems', 'Authentication Systems', 'Authentication Systems', p.id, false, 1
from public.portfolio_categories p where p.slug = 'digital-identity-authentication'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'authorization-rbac', 'Authorization & RBAC', 'Authorization & RBAC', p.id, false, 2
from public.portfolio_categories p where p.slug = 'digital-identity-authentication'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'jwt-authentication', 'JWT Authentication', 'JWT Authentication', p.id, false, 3
from public.portfolio_categories p where p.slug = 'digital-identity-authentication'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'multi-factor-authentication', 'Multi-Factor Authentication', 'Multi-Factor Authentication', p.id, false, 4
from public.portfolio_categories p where p.slug = 'digital-identity-authentication'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'biometric-authentication', 'Biometric Authentication', 'Biometric Authentication', p.id, false, 5
from public.portfolio_categories p where p.slug = 'digital-identity-authentication'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-identity-management', 'Digital Identity Management', 'Digital Identity Management', p.id, false, 6
from public.portfolio_categories p where p.slug = 'digital-identity-authentication'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'user-interface-design', 'User Interface Design', 'User Interface Design', p.id, false, 1
from public.portfolio_categories p where p.slug = 'ui-ux-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'user-experience-design', 'User Experience Design', 'User Experience Design', p.id, false, 2
from public.portfolio_categories p where p.slug = 'ui-ux-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'wireframing', 'Wireframing', 'Wireframing', p.id, false, 3
from public.portfolio_categories p where p.slug = 'ui-ux-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'prototyping', 'Prototyping', 'Prototyping', p.id, false, 4
from public.portfolio_categories p where p.slug = 'ui-ux-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'design-systems', 'Design Systems', 'Design Systems', p.id, false, 5
from public.portfolio_categories p where p.slug = 'ui-ux-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'interaction-design', 'Interaction Design', 'Interaction Design', p.id, false, 6
from public.portfolio_categories p where p.slug = 'ui-ux-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'accessibility-design', 'Accessibility Design', 'Accessibility Design', p.id, false, 7
from public.portfolio_categories p where p.slug = 'ui-ux-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'brand-identity', 'Brand Identity', 'Brand Identity', p.id, false, 1
from public.portfolio_categories p where p.slug = 'graphic-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'logo-design', 'Logo Design', 'Logo Design', p.id, false, 2
from public.portfolio_categories p where p.slug = 'graphic-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'visual-communication', 'Visual Communication', 'Visual Communication', p.id, false, 3
from public.portfolio_categories p where p.slug = 'graphic-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-illustration', 'Digital Illustration', 'Digital Illustration', p.id, false, 4
from public.portfolio_categories p where p.slug = 'graphic-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'social-media-design', 'Social Media Design', 'Social Media Design', p.id, false, 5
from public.portfolio_categories p where p.slug = 'graphic-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'marketing-design', 'Marketing Design', 'Marketing Design', p.id, false, 6
from public.portfolio_categories p where p.slug = 'graphic-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'motion-graphics', 'Motion Graphics', 'Motion Graphics', p.id, false, 1
from public.portfolio_categories p where p.slug = 'motion-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'ui-animations', 'UI Animations', 'UI Animations', p.id, false, 2
from public.portfolio_categories p where p.slug = 'motion-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'micro-interactions', 'Micro-Interactions', 'Micro-Interactions', p.id, false, 3
from public.portfolio_categories p where p.slug = 'motion-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select '2d-animation', '2D Animation', '2D Animation', p.id, false, 4
from public.portfolio_categories p where p.slug = 'motion-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select '3d-animation', '3D Animation', '3D Animation', p.id, false, 5
from public.portfolio_categories p where p.slug = 'motion-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'interactive-animations', 'Interactive Animations', 'Interactive Animations', p.id, false, 6
from public.portfolio_categories p where p.slug = 'motion-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'scroll-animations', 'Scroll Animations', 'Scroll Animations', p.id, false, 7
from public.portfolio_categories p where p.slug = 'motion-design'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select '3d-web-experiences', '3D Web Experiences', '3D Web Experiences', p.id, false, 1
from public.portfolio_categories p where p.slug = '3d-immersive-experiences'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'three-js', 'Three.js', 'Three.js', p.id, false, 2
from public.portfolio_categories p where p.slug = '3d-immersive-experiences'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'webgl', 'WebGL', 'WebGL', p.id, false, 3
from public.portfolio_categories p where p.slug = '3d-immersive-experiences'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'react-three-fiber', 'React Three Fiber', 'React Three Fiber', p.id, false, 4
from public.portfolio_categories p where p.slug = '3d-immersive-experiences'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'augmented-reality-ar', 'Augmented Reality (AR)', 'Augmented Reality (AR)', p.id, false, 5
from public.portfolio_categories p where p.slug = '3d-immersive-experiences'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'virtual-reality-vr', 'Virtual Reality (VR)', 'Virtual Reality (VR)', p.id, false, 6
from public.portfolio_categories p where p.slug = '3d-immersive-experiences'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'spatial-computing', 'Spatial Computing', 'Spatial Computing', p.id, false, 7
from public.portfolio_categories p where p.slug = '3d-immersive-experiences'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'blockchain-applications', 'Blockchain Applications', 'Blockchain Applications', p.id, false, 1
from public.portfolio_categories p where p.slug = 'blockchain-web3'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'smart-contracts', 'Smart Contracts', 'Smart Contracts', p.id, false, 2
from public.portfolio_categories p where p.slug = 'blockchain-web3'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'decentralized-applications', 'Decentralized Applications', 'Decentralized Applications', p.id, false, 3
from public.portfolio_categories p where p.slug = 'blockchain-web3'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cryptocurrency-platforms', 'Cryptocurrency Platforms', 'Cryptocurrency Platforms', p.id, false, 4
from public.portfolio_categories p where p.slug = 'blockchain-web3'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'web3-integration', 'Web3 Integration', 'Web3 Integration', p.id, false, 5
from public.portfolio_categories p where p.slug = 'blockchain-web3'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-wallets', 'Digital Wallets', 'Digital Wallets', p.id, false, 6
from public.portfolio_categories p where p.slug = 'blockchain-web3'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'connected-devices', 'Connected Devices', 'Connected Devices', p.id, false, 1
from public.portfolio_categories p where p.slug = 'internet-of-things'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'smart-home', 'Smart Home', 'Smart Home', p.id, false, 2
from public.portfolio_categories p where p.slug = 'internet-of-things'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'iot-platforms', 'IoT Platforms', 'IoT Platforms', p.id, false, 3
from public.portfolio_categories p where p.slug = 'internet-of-things'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'sensor-integration', 'Sensor Integration', 'Sensor Integration', p.id, false, 4
from public.portfolio_categories p where p.slug = 'internet-of-things'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'embedded-systems', 'Embedded Systems', 'Embedded Systems', p.id, false, 5
from public.portfolio_categories p where p.slug = 'internet-of-things'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'robotics-software', 'Robotics Software', 'Robotics Software', p.id, false, 1
from public.portfolio_categories p where p.slug = 'robotics-embedded-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'embedded-programming', 'Embedded Programming', 'Embedded Programming', p.id, false, 2
from public.portfolio_categories p where p.slug = 'robotics-embedded-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'automation-robotics', 'Automation Robotics', 'Automation Robotics', p.id, false, 3
from public.portfolio_categories p where p.slug = 'robotics-embedded-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'hardware-integration', 'Hardware Integration', 'Hardware Integration', p.id, false, 4
from public.portfolio_categories p where p.slug = 'robotics-embedded-systems'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'augmented-reality', 'Augmented Reality', 'Augmented Reality', p.id, false, 1
from public.portfolio_categories p where p.slug = 'ar-vr-xr'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'virtual-reality', 'Virtual Reality', 'Virtual Reality', p.id, false, 2
from public.portfolio_categories p where p.slug = 'ar-vr-xr'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'mixed-reality', 'Mixed Reality', 'Mixed Reality', p.id, false, 3
from public.portfolio_categories p where p.slug = 'ar-vr-xr'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'extended-reality', 'Extended Reality', 'Extended Reality', p.id, false, 4
from public.portfolio_categories p where p.slug = 'ar-vr-xr'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'interactive-3d-environments', 'Interactive 3D Environments', 'Interactive 3D Environments', p.id, false, 5
from public.portfolio_categories p where p.slug = 'ar-vr-xr'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'saas-platforms', 'SaaS Platforms', 'SaaS Platforms', p.id, false, 1
from public.portfolio_categories p where p.slug = 'saas-software-products'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'multi-tenant-applications', 'Multi-Tenant Applications', 'Multi-Tenant Applications', p.id, false, 2
from public.portfolio_categories p where p.slug = 'saas-software-products'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'subscription-platforms', 'Subscription Platforms', 'Subscription Platforms', p.id, false, 3
from public.portfolio_categories p where p.slug = 'saas-software-products'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'b2b-software', 'B2B Software', 'B2B Software', p.id, false, 4
from public.portfolio_categories p where p.slug = 'saas-software-products'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'b2c-applications', 'B2C Applications', 'B2C Applications', p.id, false, 5
from public.portfolio_categories p where p.slug = 'saas-software-products'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-banking', 'Digital Banking', 'Digital Banking', p.id, false, 1
from public.portfolio_categories p where p.slug = 'fintech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-payments', 'Digital Payments', 'Digital Payments', p.id, false, 2
from public.portfolio_categories p where p.slug = 'fintech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'personal-finance', 'Personal Finance', 'Personal Finance', p.id, false, 3
from public.portfolio_categories p where p.slug = 'fintech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'financial-management', 'Financial Management', 'Financial Management', p.id, false, 4
from public.portfolio_categories p where p.slug = 'fintech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'budgeting-applications', 'Budgeting Applications', 'Budgeting Applications', p.id, false, 5
from public.portfolio_categories p where p.slug = 'fintech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'accounting-software', 'Accounting Software', 'Accounting Software', p.id, false, 6
from public.portfolio_categories p where p.slug = 'fintech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'e-learning-platforms', 'E-Learning Platforms', 'E-Learning Platforms', p.id, false, 1
from public.portfolio_categories p where p.slug = 'edtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'learning-management-systems', 'Learning Management Systems', 'Learning Management Systems', p.id, false, 2
from public.portfolio_categories p where p.slug = 'edtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'educational-applications', 'Educational Applications', 'Educational Applications', p.id, false, 3
from public.portfolio_categories p where p.slug = 'edtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'online-examination-systems', 'Online Examination Systems', 'Online Examination Systems', p.id, false, 4
from public.portfolio_categories p where p.slug = 'edtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-learning-tools', 'Digital Learning Tools', 'Digital Learning Tools', p.id, false, 5
from public.portfolio_categories p where p.slug = 'edtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'healthcare-applications', 'Healthcare Applications', 'Healthcare Applications', p.id, false, 1
from public.portfolio_categories p where p.slug = 'healthtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'hospital-management', 'Hospital Management', 'Hospital Management', p.id, false, 2
from public.portfolio_categories p where p.slug = 'healthtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'medical-information-systems', 'Medical Information Systems', 'Medical Information Systems', p.id, false, 3
from public.portfolio_categories p where p.slug = 'healthtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'appointment-management', 'Appointment Management', 'Appointment Management', p.id, false, 4
from public.portfolio_categories p where p.slug = 'healthtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'telemedicine', 'Telemedicine', 'Telemedicine', p.id, false, 5
from public.portfolio_categories p where p.slug = 'healthtech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'erp-systems', 'ERP Systems', 'ERP Systems', p.id, false, 1
from public.portfolio_categories p where p.slug = 'business-enterprise-solutions'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'crm-systems', 'CRM Systems', 'CRM Systems', p.id, false, 2
from public.portfolio_categories p where p.slug = 'business-enterprise-solutions'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'hr-management', 'HR Management', 'HR Management', p.id, false, 3
from public.portfolio_categories p where p.slug = 'business-enterprise-solutions'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'inventory-management', 'Inventory Management', 'Inventory Management', p.id, false, 4
from public.portfolio_categories p where p.slug = 'business-enterprise-solutions'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'project-management', 'Project Management', 'Project Management', p.id, false, 5
from public.portfolio_categories p where p.slug = 'business-enterprise-solutions'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'document-management', 'Document Management', 'Document Management', p.id, false, 6
from public.portfolio_categories p where p.slug = 'business-enterprise-solutions'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'workflow-management', 'Workflow Management', 'Workflow Management', p.id, false, 7
from public.portfolio_categories p where p.slug = 'business-enterprise-solutions'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-public-services', 'Digital Public Services', 'Digital Public Services', p.id, false, 1
from public.portfolio_categories p where p.slug = 'e-government-civictech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'administrative-platforms', 'Administrative Platforms', 'Administrative Platforms', p.id, false, 2
from public.portfolio_categories p where p.slug = 'e-government-civictech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'digital-governance', 'Digital Governance', 'Digital Governance', p.id, false, 3
from public.portfolio_categories p where p.slug = 'e-government-civictech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'citizen-services', 'Citizen Services', 'Citizen Services', p.id, false, 4
from public.portfolio_categories p where p.slug = 'e-government-civictech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'public-information-systems', 'Public Information Systems', 'Public Information Systems', p.id, false, 5
from public.portfolio_categories p where p.slug = 'e-government-civictech'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select '2d-games', '2D Games', '2D Games', p.id, false, 1
from public.portfolio_categories p where p.slug = 'game-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select '3d-games', '3D Games', '3D Games', p.id, false, 2
from public.portfolio_categories p where p.slug = 'game-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'game-engines', 'Game Engines', 'Game Engines', p.id, false, 3
from public.portfolio_categories p where p.slug = 'game-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'multiplayer-games', 'Multiplayer Games', 'Multiplayer Games', p.id, false, 4
from public.portfolio_categories p where p.slug = 'game-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'game-ai', 'Game AI', 'Game AI', p.id, false, 5
from public.portfolio_categories p where p.slug = 'game-development'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'unit-testing', 'Unit Testing', 'Unit Testing', p.id, false, 1
from public.portfolio_categories p where p.slug = 'testing-quality-assurance'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'integration-testing', 'Integration Testing', 'Integration Testing', p.id, false, 2
from public.portfolio_categories p where p.slug = 'testing-quality-assurance'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'end-to-end-testing', 'End-to-End Testing', 'End-to-End Testing', p.id, false, 3
from public.portfolio_categories p where p.slug = 'testing-quality-assurance'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'automated-testing', 'Automated Testing', 'Automated Testing', p.id, false, 4
from public.portfolio_categories p where p.slug = 'testing-quality-assurance'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'performance-testing', 'Performance Testing', 'Performance Testing', p.id, false, 5
from public.portfolio_categories p where p.slug = 'testing-quality-assurance'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'quality-assurance', 'Quality Assurance', 'Quality Assurance', p.id, false, 6
from public.portfolio_categories p where p.slug = 'testing-quality-assurance'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'developer-tools', 'Developer Tools', 'Developer Tools', p.id, false, 1
from public.portfolio_categories p where p.slug = 'open-source-projects'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'open-source-libraries', 'Open Source Libraries', 'Open Source Libraries', p.id, false, 2
from public.portfolio_categories p where p.slug = 'open-source-projects'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'frameworks', 'Frameworks', 'Frameworks', p.id, false, 3
from public.portfolio_categories p where p.slug = 'open-source-projects'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'cli-tools', 'CLI Tools', 'CLI Tools', p.id, false, 4
from public.portfolio_categories p where p.slug = 'open-source-projects'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'developer-utilities', 'Developer Utilities', 'Developer Utilities', p.id, false, 5
from public.portfolio_categories p where p.slug = 'open-source-projects'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'proof-of-concept-poc', 'Proof of Concept (PoC)', 'Proof of Concept (PoC)', p.id, false, 1
from public.portfolio_categories p where p.slug = 'technical-research-innovation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'technical-experiments', 'Technical Experiments', 'Technical Experiments', p.id, false, 2
from public.portfolio_categories p where p.slug = 'technical-research-innovation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'research-projects', 'Research Projects', 'Research Projects', p.id, false, 3
from public.portfolio_categories p where p.slug = 'technical-research-innovation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'technology-prototypes', 'Technology Prototypes', 'Technology Prototypes', p.id, false, 4
from public.portfolio_categories p where p.slug = 'technical-research-innovation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_categories (slug, name, name_en, parent_id, featured, sort_order)
select 'emerging-technologies', 'Emerging Technologies', 'Emerging Technologies', p.id, false, 5
from public.portfolio_categories p where p.slug = 'technical-research-innovation'
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order, featured = false;

insert into public.portfolio_tags (slug, name) values
  ('finance', 'Finance'),
  ('mobile', 'Mobile'),
  ('offline-first', 'Offline-first'),
  ('authentication', 'Authentication'),
  ('maritime', 'Maritime'),
  ('supervision', 'Supervision'),
  ('human-in-the-loop', 'Human-in-the-loop'),
  ('typing', 'Typing'),
  ('productivity', 'Productivity'),
  ('immobilier', 'Immobilier'),
  ('3d', '3D'),
  ('editorial', 'Editorial'),
  ('corporate', 'Corporate'),
  ('e-commerce', 'E-commerce'),
  ('beauty', 'Beauty'),
  ('whatsapp', 'WhatsApp'),
  ('template', 'Template'),
  ('design-system', 'Design System'),
  ('cybersecurity', 'Cybersecurity'),
  ('civictech', 'CivicTech'),
  ('anonymity', 'Anonymity'),
  ('education', 'Education'),
  ('health', 'Health'),
  ('erp', 'ERP'),
  ('crm', 'CRM'),
  ('api', 'API'),
  ('open-source', 'Open Source'),
  ('pwa', 'PWA'),
  ('accessibility', 'Accessibility'),
  ('motion', 'Motion'),
  ('webgl', 'WebGL'),
  ('iot', 'IoT'),
  ('blockchain', 'Blockchain'),
  ('ai', 'AI'),
  ('llm', 'LLM'),
  ('rag', 'RAG'),
  ('agents', 'Agents'),
  ('automation', 'Automation'),
  ('data', 'Data'),
  ('cloud', 'Cloud'),
  ('devops', 'DevOps'),
  ('seo', 'SEO')
on conflict (slug) do update set name = excluded.name;

-- Projet : akoue-app
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'akoue-app');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'akoue-app');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'akoue-app' and c.slug in ('mobile-development', 'fintech', 'saas-software-products', 'cross-platform-development', 'mobile-applications', 'personal-finance')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'akoue-app' and t.slug in ('finance', 'mobile', 'offline-first', 'authentication')
on conflict do nothing;

-- Projet : navigarde-ia
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'navigarde-ia');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'navigarde-ia');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'navigarde-ia' and c.slug in ('artificial-intelligence', 'ai-agents-agentic-systems', 'web-development', 'ai-powered-platforms', 'agentic-workflows', 'web-applications')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'navigarde-ia' and t.slug in ('maritime', 'supervision', 'human-in-the-loop')
on conflict do nothing;

-- Projet : clavis
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'clavis');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'clavis');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'clavis' and c.slug in ('web-development', 'ui-ux-design', 'web-applications', 'frontend-development', 'interaction-design')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'clavis' and t.slug in ('typing', 'productivity', 'design-system')
on conflict do nothing;

-- Projet : havre
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'havre');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'havre');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'havre' and c.slug in ('web-development', 'business-enterprise-solutions', 'web-applications', 'web-platforms')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'havre' and t.slug in ('immobilier', '3d', 'editorial')
on conflict do nothing;

-- Projet : cauris-group-international
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'cauris-group-international');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'cauris-group-international');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'cauris-group-international' and c.slug in ('web-development', 'business-enterprise-solutions', 'web-platforms', 'web-applications')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'cauris-group-international' and t.slug in ('corporate', 'seo')
on conflict do nothing;

-- Projet : savekari-beauty
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'savekari-beauty');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'savekari-beauty');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'savekari-beauty' and c.slug in ('web-development', 'saas-software-products', 'e-commerce', 'web-applications')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'savekari-beauty' and t.slug in ('beauty', 'whatsapp', 'e-commerce')
on conflict do nothing;

-- Projet : portefolio-os
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'portefolio-os');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'portefolio-os');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'portefolio-os' and c.slug in ('saas-software-products', 'web-development', 'ui-ux-design', 'saas-platforms', 'design-systems', 'web-platforms')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'portefolio-os' and t.slug in ('template', 'design-system', 'open-source')
on conflict do nothing;

-- Projet : vigilance-bj
delete from public.portfolio_project_categories where project_id = (select id from public.portfolio_projects where slug = 'vigilance-bj');
delete from public.portfolio_project_tags where project_id = (select id from public.portfolio_projects where slug = 'vigilance-bj');
insert into public.portfolio_project_categories (project_id, category_id)
select p.id, c.id from public.portfolio_projects p, public.portfolio_categories c
where p.slug = 'vigilance-bj' and c.slug in ('cybersecurity', 'e-government-civictech', 'web-development', 'application-security', 'citizen-services', 'web-applications')
on conflict do nothing;

insert into public.portfolio_project_tags (project_id, tag_id)
select p.id, t.id from public.portfolio_projects p, public.portfolio_tags t
where p.slug = 'vigilance-bj' and t.slug in ('cybersecurity', 'civictech', 'anonymity')
on conflict do nothing;

commit;

-- Vérifications :
--   select count(*) from public.portfolio_categories where parent_id is null; -- 40
--   select count(*) from public.portfolio_categories where featured;         -- 12
--   select count(*) from public.portfolio_categories;                       -- 294
--   select count(*) from public.portfolio_tags;                             -- 42
