-- Base de données complète du portfolio (Supabase)
-- À coller dans Supabase → SQL Editor → Run.
-- Ce script remplace supabase/schema.sql.

-- 1. Source de vérité utilisée par le site (un seul document JSON)
create table if not exists public.portfolio (
  id          int primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 2. Profil (ligne unique)
create table if not exists public.profile (
  id              int primary key default 1,
  nom             text,
  titre           text,
  slogan          text,
  bio             text,
  email           text,
  phone           text,
  city            text,
  linkedin        text,
  github          text,
  languages       text,
  interests       text,
  hook_client     text,
  about_client    text,
  proof           text,
  hook_client_en  text,
  about_client_en text,
  updated_at      timestamptz default now()
);

create table if not exists public.settings (
  id int primary key default 1,
  site_title text, site_description text, domain text, ticker text,
  online boolean default true, maintenance boolean default false,
  sound boolean default true, accent text default '#e60012',
  available_badge boolean default false, hide_journey boolean default false,
  show_services boolean default true, show_blog boolean default true,
  show_shop boolean default true, show_bot boolean default true,
  show_orbit boolean default true, show_palette boolean default true,
  donate_link text, momo text, donate_amounts text, whatsapp text,
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id              int primary key,
  name            text not null,
  description     text,
  description_en  text,
  category        text,
  status          text,
  tech            text,
  url             text,
  donate          boolean default false,
  donate_link     text,
  cover           text,
  position        int
);

alter table public.projects add column if not exists cover text;

create table if not exists public.skills (
  id        int primary key,
  name      text not null,
  category  text,
  level     int default 80,
  position  int
);

create table if not exists public.experiences (
  id          int primary key,
  title       text,
  org         text,
  place       text,
  period      text,
  period_en   text,
  details     text,
  details_en  text,
  keywords    text,
  kpis        text,
  kpis_en     text,
  logo        text,
  position    int
);

create table if not exists public.education (
  id        int primary key,
  title     text,
  org       text,
  place     text,
  period    text,
  details   text,
  position  int
);

create table if not exists public.posts (
  id            int primary key,
  title         text,
  category      text,
  tags          text,
  excerpt       text,
  body          text,
  status        text,
  published_on  date,
  position      int
);

create table if not exists public.products (
  id        int primary key,
  name      text,
  type      text,
  short     text,
  long      text,
  includes  text,
  price     numeric(12,2),
  currency  text default 'FCFA',
  link      text,
  license   text,
  status    text,
  image     text,
  position  int
);

create table if not exists public.services (
  id           int primary key,
  title        text,
  description  text,
  position     int
);

create table if not exists public.steps (
  id           int primary key,
  title        text,
  description  text,
  position     int
);

create table if not exists public.activity (
  id      bigserial primary key,
  at      timestamptz not null default now(),
  title   text,
  detail  text,
  icon    text,
  color   text
);

create table if not exists public.messages (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  subject     text,
  body        text,
  read        boolean not null default false
);

create or replace function public.sync_portfolio_tables() returns trigger
language plpgsql security definer set search_path = public as $$
declare d jsonb := coalesce(new.data, '{}'::jsonb);
begin
  insert into public.profile (id,nom,titre,slogan,bio,email,phone,city,linkedin,github,languages,interests,hook_client,about_client,proof,hook_client_en,about_client_en,updated_at)
  values (1,
    d->'profile'->>'nom', d->'profile'->>'titre', d->'profile'->>'slogan', d->'profile'->>'bio',
    d->'profile'->>'email', d->'profile'->>'tel', d->'profile'->>'ville', d->'profile'->>'linkedin', d->'profile'->>'github',
    d->'profile'->>'langues', d->'profile'->>'interets', d->'profile'->>'hook_c', d->'profile'->>'about_c', d->'profile'->>'proof',
    d->'profile'->>'en_hook_c', d->'profile'->>'en_about_c', now())
  on conflict (id) do update set
    nom=excluded.nom, titre=excluded.titre, slogan=excluded.slogan, bio=excluded.bio,
    email=excluded.email, phone=excluded.phone, city=excluded.city, linkedin=excluded.linkedin, github=excluded.github,
    languages=excluded.languages, interests=excluded.interests, hook_client=excluded.hook_client,
    about_client=excluded.about_client, proof=excluded.proof, hook_client_en=excluded.hook_client_en,
    about_client_en=excluded.about_client_en, updated_at=now();

  insert into public.settings (id,site_title,ticker,online,maintenance,accent,whatsapp,donate_link)
  values (1, d->'set'->>'titre', d->'set'->>'ticker',
    coalesce((d->'set'->>'online')::boolean,true),
    coalesce((d->'set'->>'maint')::boolean,false),
    coalesce(d->'set'->>'accent','#e60012'),
    d->'set'->>'wa', d->'set'->>'dlink')
  on conflict (id) do update set site_title=excluded.site_title, ticker=excluded.ticker,
    online=excluded.online, maintenance=excluded.maintenance, accent=excluded.accent,
    whatsapp=excluded.whatsapp, donate_link=excluded.donate_link, updated_at=now();

  update public.settings set site_description=d->'set'->>'desc', domain=d->'set'->>'domain',
    sound=coalesce((d->'set'->>'sound')::boolean,true),
    available_badge=coalesce((d->'set'->>'avail')::boolean,false),
    hide_journey=coalesce((d->'set'->>'no_journey')::boolean,false),
    show_services=coalesce((d->'set'->>'sh_svc')::boolean,true),
    show_blog=coalesce((d->'set'->>'sh_blog')::boolean,true),
    show_shop=coalesce((d->'set'->>'sh_shop')::boolean,true),
    show_bot=coalesce((d->'set'->>'sh_bot')::boolean,true),
    show_orbit=coalesce((d->'set'->>'sh_orbit')::boolean,true),
    show_palette=coalesce((d->'set'->>'sh_pal')::boolean,true),
    momo=d->'set'->>'momo', donate_amounts=d->'set'->>'damounts'
  where id=1;

  delete from public.projects;
  insert into public.projects (id,name,description,description_en,category,status,tech,url,donate,donate_link,cover,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'n', x->>'d', x->'en'->>'d',
         x->>'cat', x->>'st', x->>'t', x->>'u', coalesce(x->>'don','Non')='Oui', x->>'dl', x->>'cover',
         row_number() over ()
  from jsonb_array_elements(coalesce(d->'projects','[]'::jsonb)) x;

  delete from public.skills;
  insert into public.skills (id,name,category,level,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'n', x->>'cat',
         coalesce((x->>'lv')::int,80), row_number() over ()
  from jsonb_array_elements(coalesce(d->'skills','[]'::jsonb)) x;

  delete from public.experiences;
  insert into public.experiences (id,title,org,place,period,period_en,details,details_en,keywords,kpis,kpis_en,logo,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'t', x->>'o', x->>'l', x->>'p',
         x->'en'->>'p', x->>'d', x->'en'->>'d', x->>'s', x->>'k', x->'en'->>'k', x->>'logo',
         row_number() over ()
  from jsonb_array_elements(coalesce(d->'exp','[]'::jsonb)) x;

  delete from public.education;
  insert into public.education (id,title,org,place,period,details,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'t', x->>'o', x->>'l', x->>'p',
         x->>'d', row_number() over ()
  from jsonb_array_elements(coalesce(d->'edu','[]'::jsonb)) x;

  delete from public.posts;
  insert into public.posts (id,title,category,tags,excerpt,body,status,published_on,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'t', x->>'cat', x->>'tags',
         x->>'ex', x->>'body', x->>'st', nullif(x->>'d','')::date, row_number() over ()
  from jsonb_array_elements(coalesce(d->'posts','[]'::jsonb)) x;

  delete from public.products;
  insert into public.products (id,name,type,short,long,includes,price,currency,link,license,status,image,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'n', x->>'type', x->>'d',
         x->>'long', x->>'inc', nullif(x->>'price','')::numeric, coalesce(x->>'cur','FCFA'),
         x->>'link', x->>'lic', x->>'st', x->>'img', row_number() over ()
  from jsonb_array_elements(coalesce(d->'shop','[]'::jsonb)) x;

  delete from public.services;
  insert into public.services (id,title,description,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'t', x->>'d', row_number() over ()
  from jsonb_array_elements(coalesce(d->'services','[]'::jsonb)) x;

  delete from public.steps;
  insert into public.steps (id,title,description,position)
  select coalesce((x->>'id')::int, row_number() over ()::int), x->>'t', x->>'d', row_number() over ()
  from jsonb_array_elements(coalesce(d->'steps','[]'::jsonb)) x;

  delete from public.activity;
  insert into public.activity (at,title,detail,icon,color)
  select to_timestamp((x->>'t')::bigint / 1000.0), x->>'a', x->>'b', x->>'i', x->>'c'
  from jsonb_array_elements(coalesce(d->'act','[]'::jsonb)) x;

  return new;
end;
$$;

drop trigger if exists trg_sync_portfolio on public.portfolio;
create trigger trg_sync_portfolio
after insert or update on public.portfolio
for each row execute function public.sync_portfolio_tables();

create or replace function public.is_owner() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() -> 'user_metadata' ->> 'user_name', '') = 'T0b0i7'
      or coalesce(auth.jwt() -> 'user_metadata' ->> 'preferred_username', '') = 'T0b0i7';
$$;

alter table public.portfolio   enable row level security;
alter table public.profile     enable row level security;
alter table public.settings    enable row level security;
alter table public.projects    enable row level security;
alter table public.skills      enable row level security;
alter table public.experiences enable row level security;
alter table public.education   enable row level security;
alter table public.posts       enable row level security;
alter table public.products    enable row level security;
alter table public.services    enable row level security;
alter table public.steps       enable row level security;
alter table public.activity    enable row level security;
alter table public.messages    enable row level security;

drop policy if exists "portfolio lecture publique" on public.portfolio;
create policy "portfolio lecture publique" on public.portfolio for select using (true);

drop policy if exists "portfolio ecriture proprietaire" on public.portfolio;
create policy "portfolio ecriture proprietaire" on public.portfolio for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

do $$
declare t text; cond text;
begin
  foreach t in array array['profile','settings','skills','experiences','education','services','steps','projects','posts','products','activity'] loop
    cond := case when t in ('projects','posts','products') then 'status = ''Publié'''
                 when t = 'activity' then 'false'
                 else 'true' end;
    execute format('drop policy if exists "lecture publique" on public.%I', t);
    if cond <> 'false' then
      execute format('create policy "lecture publique" on public.%I for select using (%s)', t, cond);
    end if;
    execute format('drop policy if exists "ecriture proprietaire" on public.%I', t);
    execute format('create policy "ecriture proprietaire" on public.%I for all to authenticated using (public.is_owner()) with check (public.is_owner())', t);
  end loop;
end $$;

drop policy if exists "messages envoi public" on public.messages;
create policy "messages envoi public" on public.messages for insert to anon, authenticated with check (true);
drop policy if exists "messages proprietaire" on public.messages;
create policy "messages proprietaire" on public.messages for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

grant usage on schema public to anon, authenticated;
grant select on public.portfolio to anon, authenticated;
grant insert, update, delete on public.portfolio to authenticated;
grant select on public.profile, public.settings, public.projects, public.skills, public.experiences,
  public.education, public.posts, public.products, public.services, public.steps
  to anon, authenticated;
grant select, insert, update, delete on public.profile, public.settings, public.projects, public.skills,
  public.experiences, public.education, public.posts, public.products, public.services,
  public.steps, public.activity to authenticated;
grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;
grant usage, select on sequence public.messages_id_seq to anon, authenticated;
grant usage, select on sequence public.activity_id_seq to authenticated;

create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists projects_status_idx on public.projects (status, position);
create index if not exists posts_status_idx on public.posts (status, published_on desc);
create index if not exists products_status_idx on public.products (status, position);

create or replace view public.public_projects with (security_invoker = true) as
  select * from public.projects where status = 'Publié' order by position;
create or replace view public.public_posts with (security_invoker = true) as
  select * from public.posts where status = 'Publié' order by published_on desc;
create or replace view public.public_products with (security_invoker = true) as
  select * from public.products where status = 'Publié' order by position;
