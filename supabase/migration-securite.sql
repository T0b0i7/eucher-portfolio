-- ============================================================================
-- MIGRATION DE SÉCURITÉ — base Supabase EXISTANTE
-- Fichier idempotent : peut être réexécuté sans erreur (SQL Editor → Run).
--
-- À exécuter APRÈS avoir déployé le nouveau assets/js/admin.js et
-- assets/js/remote.js. Une seule fois suffit ; le relancer ne casse rien.
--
-- Corrige :
--   1. l'escalade de privilèges de is_owner() (user_metadata.user_name est
--      modifiable par n'importe quel utilisateur connecté via auth.updateUser) ;
--   2. la fuite des messages privés (msgs), de l'activité (act) et du téléphone
--      (profile.tel), poussés jusqu'ici en clair dans public.portfolio ;
--   3. la lecture publique des tables profile et settings (e-mail, téléphone…) ;
--   4. l'absence de contrôle sur les insertions dans messages (spam).
--
-- NE PAS utiliser supabase/import-projects.sql tel quel après cette migration :
--   ce script fait un upsert de public.portfolio (id=1) avec un document PARTIEL
--   (uniquement 'projects'). Le trigger sync_portfolio_tables() réécrit alors
--   TOUTES les tables normalisées à partir de ce document partiel : les autres
--   clés (profile, settings, exp, skills, posts…) sont écrasées, et le téléphone
--   peut être réintroduit. Le rendre obsolète est volontaire ; le fichier n'est
--   pas modifié ici.
-- ============================================================================

begin;

-- ----------------------------------------------------------------------------
-- 1. Table des administrateurs : source de vérité de l'ownership.
--    Créée AVANT la redéfinition de is_owner().
--    Aucune policy d'écriture : les lignes s'ajoutent uniquement en SQL
--    (bootstrap ci-dessous, ou requête manuelle du propriétaire).
-- ----------------------------------------------------------------------------
create table if not exists public.admins (
  uid         uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

alter table public.admins enable row level security;

drop policy if exists "admins lecture soi" on public.admins;
create policy "admins lecture soi" on public.admins for select to authenticated
  using (uid = auth.uid());

grant select on public.admins to authenticated;

-- ----------------------------------------------------------------------------
-- 2. Bootstrap du propriétaire.
--    Prérequis : le propriétaire doit s'être connecté AU MOINS UNE FOIS avec
--    GitHub, sinon aucune ligne de auth.users ne porte user_name = 'T0b0i7'.
--    Si le compte n'existe pas encore : se connecter une fois via GitHub sur
--    le site, puis relancer uniquement cette requête INSERT.
--    Idempotent : on conflict (uid) do nothing.
-- ----------------------------------------------------------------------------
insert into public.admins (uid)
select id
from auth.users
where lower(coalesce(
        raw_user_meta_data ->> 'user_name',
        raw_user_meta_data ->> 'preferred_username',
        ''
      )) = 't0b0i7'
on conflict (uid) do nothing;

-- ----------------------------------------------------------------------------
-- 3. is_owner() : vérification serveur, plus aucune lecture de user_metadata.
--    security definer : la fonction lit public.admins même sous RLS, mais elle
--    n'expose que le booléen. search_path figé pour éviter tout détournement.
-- ----------------------------------------------------------------------------
create or replace function public.is_owner() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where uid = auth.uid());
$$;

-- ----------------------------------------------------------------------------
-- 4. Suppression de la lecture publique sur profile et settings.
--    RLS activée + aucune policy SELECT publique = 0 ligne visible par anon.
--    Le propriétaire garde l'accès via sa policy "ecriture proprietaire".
-- ----------------------------------------------------------------------------
alter table public.profile  enable row level security;
alter table public.settings enable row level security;

drop policy if exists "lecture publique" on public.profile;
drop policy if exists "lecture publique" on public.settings;

-- ----------------------------------------------------------------------------
-- 5. Formulaire de contact : insert public mais contrôles anti-spam.
--    Colonnes réelles : name, email (not null), subject, body (cf. schema).
--    L'ancienne policy permissive est supprimée avant recréation.
-- ----------------------------------------------------------------------------
drop policy if exists "messages envoi public" on public.messages;
create policy "messages envoi public" on public.messages for insert to anon, authenticated
  with check (
    length(btrim(coalesce(name, ''))) between 2 and 120
    and position('@' in coalesce(email, '')) > 1
    and length(coalesce(subject, '')) <= 200
    and length(coalesce(body, '')) between 1 and 5000
  );

-- ----------------------------------------------------------------------------
-- 6. Nettoyage des données déjà exposées dans le document public.
--    Les suppressions sont conditionnées : réexécuter le script ne réécrit
--    pas la ligne inutilement.
--    Note : ces UPDATE déclenchent le trigger sync_portfolio_tables(), qui
--    resynchronise les tables normalisées depuis le document assaini.
-- ----------------------------------------------------------------------------
-- 6a. Messages privés + journal d'activité : ne doivent plus être publics.
update public.portfolio
set data = data - 'msgs' - 'act'
where data ? 'msgs' or data ? 'act';

-- 6b. Téléphone : réservé au CV local (README), à retirer du document public.
update public.portfolio
set data = jsonb_set(data, '{profile}', (data -> 'profile') - 'tel')
where data -> 'profile' ? 'tel';

-- ----------------------------------------------------------------------------
-- 7. Rafraîchissement du cache de schéma de l'API REST.
-- ----------------------------------------------------------------------------
notify pgrst, 'reload schema';

commit;

-- ============================================================================
-- VÉRIFICATIONS À EXÉCUTER APRÈS LA MIGRATION (copier/coller une par une)
-- ============================================================================
--
-- V1. Le propriétaire est-il bien enregistré comme admin ? (attendu : 1 ligne)
--   select uid, created_at from public.admins;
--
-- V2. Si V1 renvoie 0 ligne : le compte GitHub n'a jamais été créé dans auth.
--     Se connecter une fois via GitHub sur le site, puis relancer le bootstrap :
--   insert into public.admins (uid)
--   select id from auth.users
--   where lower(coalesce(raw_user_meta_data->>'user_name',
--                         raw_user_meta_data->>'preferred_username','')) = 't0b0i7'
--   on conflict (uid) do nothing;
--
-- V3. is_owner() ne dépend plus du JWT (attendu : fonction citant public.admins) :
--   select pg_get_functiondef('public.is_owner()'::regprocedure);
--
-- V4. Plus de lecture publique de profile/settings (attendu : 0 ligne) :
--   select policyname, cmd, roles, qual from pg_policies
--   where schemaname = 'public' and tablename in ('profile','settings')
--     and cmd = 'SELECT' and 'anon' = any (roles::text[]);
--
-- V5. Le document public ne contient plus msgs / act / profile.tel
--     (attendu : msgs = false, act = false, tel = false) :
--   select data ? 'msgs' as msgs,
--          data ? 'act'  as act,
--          data -> 'profile' ? 'tel' as tel
--   from public.portfolio where id = 1;
--
-- V6. La policy insert messages applique bien les contrôles (attendu : with_check non vide) :
--   select policyname, with_check from pg_policies
--   where schemaname = 'public' and tablename = 'messages' and cmd = 'INSERT';
--
-- V7. Test fonctionnel des contrôles (doit échouer : nom trop court) :
--   insert into public.messages (name, email, subject, body) values ('a','a@b.c','t','x');
--   -- attendu : ERROR: new row violates row-level security policy for table "messages"
--
-- V8. Test fonctionnel (doit réussir) :
--   insert into public.messages (name, email, subject, body)
--   values ('Test sécurité','test@example.com','Vérification','Message de test');
--   -- puis supprimer la ligne de test :
--   delete from public.messages where name = 'Test sécurité';
--
-- ============================================================================
-- GESTION DES ADMINISTRATEURS (SQL uniquement, jamais depuis le navigateur)
-- ============================================================================
-- Ajouter un admin par e-mail :
--   insert into public.admins (uid)
--   select id from auth.users where lower(email) = lower('adresse@exemple.com')
--   on conflict (uid) do nothing;
--
-- Révoquer un admin :
--   delete from public.admins where uid = '<uuid>';
--
-- Vérifier qui est admin :
--   select a.uid, u.email, a.created_at
--   from public.admins a join auth.users u on u.id = a.uid;
