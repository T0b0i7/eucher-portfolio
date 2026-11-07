-- Base de données du portfolio (Supabase)
-- À coller dans Supabase → SQL Editor → New query → Run.
-- Remplace T0b0i7 par ton pseudo GitHub si nécessaire.

-- 1. Contenu du portfolio : une seule ligne (id = 1) contenant tout le JSON
create table if not exists public.portfolio (
  id          int primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 2. Messages reçus depuis le formulaire de contact
create table if not exists public.messages (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  subject     text,
  body        text,
  read        boolean not null default false
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- 3. Propriétaire : seul le compte GitHub T0b0i7 peut écrire
create or replace function public.is_owner()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'user_metadata' ->> 'user_name', '') = 'T0b0i7'
      or coalesce(auth.jwt() -> 'user_metadata' ->> 'preferred_username', '') = 'T0b0i7';
$$;

-- 4. Sécurité au niveau des lignes
alter table public.portfolio enable row level security;
alter table public.messages  enable row level security;

drop policy if exists "portfolio lecture publique" on public.portfolio;
create policy "portfolio lecture publique"
  on public.portfolio for select
  using (true);

drop policy if exists "portfolio ecriture proprietaire" on public.portfolio;
create policy "portfolio ecriture proprietaire"
  on public.portfolio for all
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());

drop policy if exists "messages envoi public" on public.messages;
create policy "messages envoi public"
  on public.messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "messages lecture proprietaire" on public.messages;
create policy "messages lecture proprietaire"
  on public.messages for select
  to authenticated
  using (public.is_owner());

drop policy if exists "messages maj proprietaire" on public.messages;
create policy "messages maj proprietaire"
  on public.messages for update
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());

drop policy if exists "messages suppression proprietaire" on public.messages;
create policy "messages suppression proprietaire"
  on public.messages for delete
  to authenticated
  using (public.is_owner());

-- 5. Droits explicites
grant usage on schema public to anon, authenticated;
grant select on public.portfolio to anon, authenticated;
grant insert, update, delete on public.portfolio to authenticated;
grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;
grant usage, select on sequence public.messages_id_seq to anon, authenticated;
