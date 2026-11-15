/* P6 — catalogue GitHub admin : recherche, filtres, tri, détail dépôt. */
(function () {
  'use strict';
  var state = { rows: [], q: '', visibility: '', status: '', language: '', sort: 'updated', selected: null };
  function sb() { return window.SB || null; }
  function byId(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function render() {
    return '<div class="hd"><div><h1>Catalogue GitHub</h1><p class="sbt">Tous les dépôts synchronisés (publics, privés, archivés). La publication reste manuelle.</p></div><button class="bt sm" type="button" data-cat="sync">Synchroniser GitHub</button></div>'
      + '<div id="catMsg" class="cd" hidden></div>'
      + '<div class="cd"><div class="row" style="flex-wrap:wrap;gap:8px;align-items:flex-end">'
      + '<label style="flex:2;min-width:180px">Recherche<input id="catQ" placeholder="nom, description, langage"></label>'
      + '<label>Visibilité<select id="catVis"><option value="">Toutes</option><option value="public">Publiques</option><option value="private">Privés</option></select></label>'
      + '<label>Statut<select id="catStatus"><option value="">Tous</option><option value="published">Publiés</option><option value="unpublished">Non publiés</option><option value="archived">Archivés</option></select></label>'
      + '<label>Langage<select id="catLang"><option value="">Tous</option></select></label>'
      + '<label>Tri<select id="catSort"><option value="updated">Dernière activité GitHub</option><option value="name">Nom A→Z</option><option value="stars">Étoiles</option></select></label>'
      + '</div><div id="catMeta" style="margin-top:10px;color:var(--mu);font-size:12px"></div></div>'
      + '<div class="cd"><div id="catList">Chargement…</div></div>'
      + '<div id="catDetail" class="cd" hidden></div>';
  }
  function load() {
    var client = sb();
    if (!client) { var l = byId('catList'); if (l) l.textContent = 'Client Supabase indisponible.'; return; }
    client.from('portfolio_github_catalog').select('*').order('pushed_at', { ascending: false, nullsFirst: false }).then(function (r) {
      if (r.error) { msg('Lecture impossible : ' + r.error.message, false); return; }
      state.rows = r.data || [];
      fillLanguages();
      renderList();
      bind();
    }).catch(function (e) { msg('Erreur réseau : ' + (e && e.message || e), false); });
  }
  function fillLanguages() {
    var select = byId('catLang');
    if (!select) return;
    var current = select.value;
    var langs = [];
    state.rows.forEach(function (row) { if (row.language && langs.indexOf(row.language) < 0) langs.push(row.language); });
    langs.sort();
    select.innerHTML = '<option value="">Tous</option>' + langs.map(function (l) { return '<option value="' + esc(l) + '">' + esc(l) + '</option>'; }).join('');
    select.value = current;
  }
  function filtered() {
    var q = state.q.toLowerCase();
    var rows = state.rows.filter(function (row) {
      if (state.visibility === 'public' && row.private) return false;
      if (state.visibility === 'private' && !row.private) return false;
      if (state.status === 'archived' && !row.archived) return false;
      if (state.status === 'published' && !row.published_project_id) return false;
      if (state.status === 'unpublished' && row.published_project_id) return false;
      if (state.status !== 'archived' && state.status !== 'published' && state.status !== 'unpublished' && row.archived) return false;
      if (state.language && row.language !== state.language) return false;
      if (q) {
        var hay = [row.full_name, row.name, row.description, row.language, (row.topics || []).join(' ')].join(' ').toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    rows.sort(function (a, b) {
      if (state.sort === 'name') return String(a.name).localeCompare(String(b.name));
      if (state.sort === 'stars') return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      return String(b.pushed_at || b.github_updated_at || '').localeCompare(String(a.pushed_at || a.github_updated_at || ''));
    });
    return rows;
  }
  function renderList() {
    var box = byId('catList');
    var meta = byId('catMeta');
    if (!box) return;
    var rows = filtered();
    if (meta) meta.textContent = rows.length + ' dépôt(s) affiché(s) sur ' + state.rows.length;
    box.innerHTML = rows.length ? rows.map(function (row) {
      var badges = (row.private ? '<span class="tag" style="border-color:#7c3aed;color:#c4b5fd">privé</span> ' : '')
        + (row.archived ? '<span class="tag" style="border-color:#f59e0b;color:#fbbf24">archivé</span> ' : '')
        + (row.published_project_id ? '<span class="tag" style="border-color:#22c55e;color:#86efac">publié</span>' : '<span class="tag" style="color:var(--mu)">non publié</span>');
      return '<div style="border-top:1px solid var(--ln);padding:10px 0;display:flex;flex-wrap:wrap;gap:10px;align-items:center">'
        + '<b style="flex:1;min-width:220px">' + esc(row.name) + '<small style="display:block;color:var(--mu)">' + esc(row.full_name) + (row.language ? ' · ' + esc(row.language) : '') + '</small></b>'
        + '<span style="min-width:150px;font-size:11px">' + badges + '</span>'
        + '<span style="font-size:11px;color:var(--mu);min-width:120px">' + esc(row.pushed_at ? new Date(row.pushed_at).toLocaleDateString('fr-FR') : '—') + ' · ★ ' + (row.stargazers_count || 0) + '</span>'
        + '<button class="bt gh sm" type="button" data-cat="detail" data-id="' + esc(row.id) + '">Détail</button>'
        + '</div>';
    }).join('') : '<small style="color:var(--mu)">Aucun dépôt ne correspond.</small>';
  }
  function renderDetail(row) {
    var box = byId('catDetail');
    if (!box) return;
    var readme = row.readme ? '<pre style="max-height:220px;overflow:auto;white-space:pre-wrap;font-size:12px;background:#0b0b0b;border:1px solid var(--ln);padding:10px">' + esc(row.readme.slice(0, 4000)) + '</pre>' : '<small style="color:var(--mu)">Aucun README synchronisé.</small>';
    var branches = (row.branches || []).map(function (b) { return '<span class="tag">' + esc(b.name) + '</span>'; }).join(' ') || '—';
    var releases = (row.releases || []).map(function (r) { return '<span class="tag">' + esc(r.tag || r.name) + '</span>'; }).join(' ') || '—';
    box.hidden = false;
    box.innerHTML = '<div class="row" style="justify-content:space-between"><h3>' + esc(row.full_name) + '</h3><button class="bt gh sm" type="button" data-cat="close">Fermer</button></div>'
      + '<p style="color:var(--mu)">' + esc(row.description || 'Sans description') + '</p>'
      + '<p style="font-size:12px">Visibilité : <b>' + (row.private ? 'privé' : 'public') + '</b> · Archivé : <b>' + (row.archived ? 'oui' : 'non') + '</b> · Sync : ' + esc(row.sync_status) + ' · ' + esc(row.synced_at ? new Date(row.synced_at).toLocaleString('fr-FR') : '—') + '</p>'
      + '<p style="font-size:12px">Langages : ' + esc(Object.keys(row.languages || {}).join(', ') || row.language || '—') + '</p>'
      + '<p style="font-size:12px">Branches : ' + branches + '</p><p style="font-size:12px">Releases : ' + releases + '</p>'
      + '<p style="font-size:12px">Dépôt : <a href="' + esc(row.html_url || '#') + '" target="_blank" rel="noopener">' + esc(row.html_url || '') + '</a></p>'
      + readme;
  }
  function syncAll() {
    var client = sb();
    if (!client || !client.functions) { msg('Edge Function indisponible.', false); return; }
    msg('Synchronisation de tous les dépôts…', true);
    client.functions.invoke('github-inventory', { body: { details: true } }).then(function (r) {
      if (r.error) { msg('Synchronisation impossible : ' + (r.error.message || r.error), false); return; }
      msg('Inventaire : ' + (r.data.discovered || 0) + ' dépôt(s), ' + (r.data.upserted || 0) + ' mis à jour.', true);
      load();
    }).catch(function (e) { msg('Synchronisation impossible : ' + (e && e.message || e), false); });
  }
  function msg(text, ok) {
    var box = byId('catMsg');
    if (!box) return;
    box.textContent = text;
    box.hidden = false;
    box.style.borderColor = ok ? 'var(--ok, #22c55e)' : '#b91c1c';
  }
  function bind() {
    var root = byId('ct');
    if (!root || root.__catBound) return;
    root.__catBound = true;
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-cat]');
      if (!button) return;
      var action = button.getAttribute('data-cat');
      if (action === 'sync') syncAll();
      else if (action === 'close') { var d = byId('catDetail'); if (d) d.hidden = true; }
      else if (action === 'detail') {
        var row = state.rows.filter(function (x) { return String(x.id) === button.getAttribute('data-id'); })[0];
        if (row) renderDetail(row);
      }
    });
    ['catQ', 'catVis', 'catStatus', 'catLang', 'catSort'].forEach(function (id) {
      var el = byId(id);
      if (!el) return;
      el.addEventListener(id === 'catQ' ? 'input' : 'change', function () {
        state.q = (byId('catQ') || {}).value || '';
        state.visibility = (byId('catVis') || {}).value || '';
        state.status = (byId('catStatus') || {}).value || '';
        state.language = (byId('catLang') || {}).value || '';
        state.sort = (byId('catSort') || {}).value || 'updated';
        renderList();
      });
    });
  }
  window.EA_CATALOG = { render: render, load: load };
})();
