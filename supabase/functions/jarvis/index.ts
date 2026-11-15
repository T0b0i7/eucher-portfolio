// Supabase Edge Function — JARVIS (P8) : orchestrateur tool-calling.
// Model adapter OpenAI-compatible : OPENAI_BASE_URL (défaut api.openai.com/v1),
// OPENAI_API_KEY, OPENAI_MODEL. Sécurité : JWT + is_owner() obligatoires.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

function tools() {
  return [
    {
      type: 'function',
      function: {
        name: 'search_catalog',
        description: 'Recherche dans tous les dépôts GitHub synchronisés (nom, description, langage, topics), avec filtres.',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            language: { type: 'string' },
            only_private: { type: 'boolean' },
            only_public: { type: 'boolean' },
            only_archived: { type: 'boolean' },
            only_unpublished: { type: 'boolean' },
            limit: { type: 'integer', minimum: 1, maximum: 20 }
          }
        }
      }
    },
    {
      type: 'function',
      function: {
        name: 'get_repository',
        description: 'Renvoie le détail d’un dépôt du catalogue : README, langages, branches, releases, activité.',
        parameters: { type: 'object', properties: { full_name: { type: 'string' } }, required: ['full_name'] }
      }
    },
    {
      type: 'function',
      function: {
        name: 'prepare_project_page',
        description: 'Prépare une proposition de fiche portfolio (titre, résumé, description, technologies, catégories suggérées) à partir d’un dépôt. Ne publie rien.',
        parameters: {
          type: 'object',
          properties: { full_name: { type: 'string' } },
          required: ['full_name']
        }
      }
    }
  ];
}

async function runTool(admin, name, args) {
  if (name === 'search_catalog') {
    let q = admin.from('portfolio_github_catalog').select('id,full_name,name,description,language,topics,private,archived,pushed_at,published_project_id').limit(Math.min(args.limit || 10, 20));
    if (args.language) q = q.ilike('language', args.language);
    if (args.only_private) q = q.eq('private', true);
    if (args.only_public) q = q.eq('private', false);
    if (args.only_archived) q = q.eq('archived', true);
    if (args.only_unpublished) q = q.is('published_project_id', null);
    if (args.query) q = q.or(`name.ilike.%${args.query}%,description.ilike.%${args.query}%,full_name.ilike.%${args.query}%`);
    const { data, error } = await q;
    if (error) return { error: error.message };
    return { count: (data || []).length, repos: data || [] };
  }
  if (name === 'get_repository') {
    const { data, error } = await admin.from('portfolio_github_catalog').select('*').eq('full_name', args.full_name).maybeSingle();
    if (error) return { error: error.message };
    if (!data) return { error: 'Dépôt inconnu du catalogue' };
    return {
      full_name: data.full_name, description: data.description, private: data.private, archived: data.archived,
      language: data.language, topics: data.topics, languages: data.languages, branches: data.branches,
      releases: data.releases, pushed_at: data.pushed_at, html_url: data.html_url,
      readme_excerpt: (data.readme || '').slice(0, 5000),
      published_project_id: data.published_project_id
    };
  }
  if (name === 'prepare_project_page') {
    const { data } = await admin.from('portfolio_github_catalog').select('*').eq('full_name', args.full_name).maybeSingle();
    if (!data) return { error: 'Dépôt inconnu' };
    const topics = data.topics || [];
    const langs = Object.keys(data.languages || {});
    const stack = Array.from(new Set([data.language, ...langs, ...topics].filter(Boolean)));
    return {
      draft: {
        title: data.name,
        short_description: (data.description || '').slice(0, 160),
        long_description: (data.readme || '').replace(/[#*`>]/g, '').replace(/\n{3,}/g, '\n\n').slice(0, 2500),
        technologies: stack,
        github_url: data.html_url,
        suggested_categories: stack.slice(0, 5),
        visibility: data.private ? 'private' : 'public',
        archived: data.archived
      },
      requires_confirmation: true,
      note: 'Proposition uniquement — aucune publication effectuée.'
    };
  }
  return { error: 'Outil inconnu : ' + name };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Méthode non autorisée' }, 405);
  const admin = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '');
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return json({ error: 'Non autorisé' }, 401);
  const userClient = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_ANON_KEY') || '', { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userData || !userData.user) return json({ error: 'Non autorisé' }, 401);
  const { data: owner } = await userClient.rpc('is_owner');
  if (owner !== true) return json({ error: 'Non autorisé' }, 401);

  const body = await req.json().catch(() => ({}));
  if (body.tool) { try { const result = await runTool(admin, String(body.tool), body.args || {}); return json({ ok: true, tool: body.tool, result }); } catch (e) { return json({ error: String(e.message || e) }, 500); } }
  const message = String(body.message || '').slice(0, 4000);
  if (!message) return json({ error: 'Message requis' }, 400);
  const apiKey = Deno.env.get('OPENAI_API_KEY') || '';
  if (!apiKey) return json({ error: 'LLM non configuré (OPENAI_API_KEY manquant)' }, 503);
  const base = (Deno.env.get('OPENAI_BASE_URL') || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini';

  const messages = [
    { role: 'system', content: 'Tu es JARVIS, agent personnel de TobiDev. Tu réponds en français, de façon concise et professionnelle. Tu disposes du catalogue GitHub du propriétaire (dépôts publics, privés et archivés). Tu ne publies jamais rien : toute publication exige une confirmation explicite. Utilise les outils pour répondre avec des données réelles, et cite les noms complets des dépôts.' },
    ...(Array.isArray(body.history) ? body.history.slice(-10) : []),
    { role: 'user', content: message }
  ];
  const actions = [];
  for (let step = 0; step < 5; step += 1) {
    const response = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, tools: tools(), tool_choice: 'auto', temperature: 0.2 })
    });
    if (!response.ok) return json({ error: `LLM ${response.status}`, detail: (await response.text()).slice(0, 500) }, 502);
    const data = await response.json();
    const choice = data.choices && data.choices[0];
    const msg = choice && choice.message;
    if (!msg) return json({ error: 'Réponse LLM vide' }, 502);
    messages.push(msg);
    const calls = msg.tool_calls || [];
    if (!calls.length) return json({ ok: true, answer: msg.content || '', actions, model });
    for (const call of calls) {
      let args = {};
      try { args = JSON.parse(call.function.arguments || '{}'); } catch (_) { args = {}; }
      const result = await runTool(admin, call.function.name, args);
      actions.push({ tool: call.function.name, input: args, result_summary: result.error ? result.error : 'ok' });
      messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(result).slice(0, 12000) });
    }
  }
  return json({ ok: true, answer: 'Limite d’étapes atteinte — précise la demande.', actions, model });
});
