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

  function msg(text, ok) {
    var box = byId('catMsg');
    if (!box) return;
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px">'
      + '<span style="width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:' + (ok ? 'rgba(16,185,129,0.2)' : 'rgba(230,0,18,0.2)') + ';color:' + (ok ? '#10b981' : '#e60012') + ';font-weight:700">' + (ok ? '✓' : '✕') + '</span>'
      + '<span style="font-weight:500;font-size:13px;color:#ffffff">' + esc(text) + '</span>'
      + '</div>';
    box.hidden = false;
    box.style.borderLeft = '3px solid ' + (ok ? 'var(--ok, #10b981)' : 'var(--ac, #e60012)');
  }

  function render() {
    return '<div class="hd"><div><h1>Catalogue GitHub</h1><p class="sbt">Inventaire universel de tous vos dépôts GitHub synchronisés. Gérez la visibilité et visualisez les statistiques de code.</p></div>'
      + '<button class="bt sm" type="button" data-cat="sync" style="display:inline-flex;align-items:center;gap:8px">'
      + '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>'
      + '<span>Synchroniser GitHub</span>'
      + '</button></div>'
      + '<div id="catMsg" class="cd" hidden style="margin-bottom:16px"></div>'
      + '<div id="catKpis" class="cat-kpi-bar"></div>'
      + '<div class="cd" style="margin-bottom:20px">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px">'
      + '<h3 style="margin:0"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>Filtres et Recherche</h3>'
      + '<div id="catMeta" class="cat-count-badge"></div>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:minmax(220px,2fr) repeat(4,minmax(130px,1fr));gap:12px;align-items:end" class="cat-filters-grid">'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Recherche rapide</span><input id="catQ" placeholder="Rechercher par nom, description, tag..." style="width:100%;min-width:0"></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Visibilité</span><select id="catVis" style="width:100%;min-width:0"><option value="">Toutes</option><option value="public">🌐 Publics</option><option value="private">🔒 Privés</option></select></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Statut portfolio</span><select id="catStatus" style="width:100%;min-width:0"><option value="">Tous les statuts</option><option value="published">⭐ Publiés</option><option value="unpublished">Non publiés</option><option value="archived">📦 Archivés</option></select></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Langage</span><select id="catLang" style="width:100%;min-width:0"><option value="">Tous</option></select></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Trier par</span><select id="catSort" style="width:100%;min-width:0"><option value="updated">Dernière activité</option><option value="name">Nom alphabétique</option><option value="stars">Étoiles ★</option></select></label>'
      + '</div></div>'
      + '<div class="cd"><div id="catList">Chargement du catalogue…</div></div>'
      + '<div id="catDetail" class="cd cat-detail-modal" hidden style="margin-top:20px"></div>';
  }

  function load() {
    var client = sb();
    if (!client) { var l = byId('catList'); if (l) l.textContent = 'Client Supabase indisponible.'; return; }
    client.from('portfolio_github_catalog').select('*').order('pushed_at', { ascending: false, nullsFirst: false }).then(function (r) {
      if (r.error) { msg('Lecture impossible : ' + r.error.message, false); return; }
      state.rows = r.data || [];
      renderKpis();
      fillLanguages();
      renderList();
      bind();
    }).catch(function (e) { msg('Erreur réseau : ' + (e && e.message || e), false); });
  }

  function renderKpis() {
    var box = byId('catKpis');
    if (!box) return;
    var total = state.rows.length;
    var privates = state.rows.filter(function (r) { return r.private; }).length;
    var publics = total - privates;
    var published = state.rows.filter(function (r) { return r.published_project_id; }).length;
    var archived = state.rows.filter(function (r) { return r.archived; }).length;

    box.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:14px;margin-bottom:20px">'
      + '<div class="cd st" style="padding:14px 18px"><span class="ico" style="background:#22222b;width:42px;height:42px"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></span><div><small>Total Dépôts</small><b>' + total + '</b></div></div>'
      + '<div class="cd st" style="padding:14px 18px"><span class="ico" style="background:rgba(59,130,246,0.2);color:#3b82f6;width:42px;height:42px"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span><div><small>Publics</small><b>' + publics + '</b></div></div>'
      + '<div class="cd st" style="padding:14px 18px"><span class="ico" style="background:rgba(139,92,246,0.2);color:#8b5cf6;width:42px;height:42px"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span><div><small>Privés</small><b>' + privates + '</b></div></div>'
      + '<div class="cd st" style="padding:14px 18px"><span class="ico" style="background:rgba(16,185,129,0.2);color:#10b981;width:42px;height:42px"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span><div><small>Publiés sur portfolio</small><b style="color:#10b981">' + published + '</b></div></div>'
      + (archived ? '<div class="cd st" style="padding:14px 18px"><span class="ico" style="background:rgba(245,165,36,0.2);color:#f5a524;width:42px;height:42px"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg></span><div><small>Archivés</small><b>' + archived + '</b></div></div>' : '')
      + '</div>';
  }

  function fillLanguages() {
    var select = byId('catLang');
    if (!select) return;
    var current = select.value;
    var langs = [];
    state.rows.forEach(function (row) { if (row.language && langs.indexOf(row.language) < 0) langs.push(row.language); });
    langs.sort();
    select.innerHTML = '<option value="">Tous les langages</option>' + langs.map(function (l) { return '<option value="' + esc(l) + '">' + esc(l) + '</option>'; }).join('');
    select.value = current;
  }

  function filtered() {
    var q = state.q.toLowerCase().trim();
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

  function getLangColor(lang) {
    var colors = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3776ab',
      HTML: '#e34f26',
      CSS: '#1572b6',
      PHP: '#777bb4',
      Rust: '#dea584',
      Go: '#00add8',
      Dart: '#0175c2',
      C: '#555555',
      'C++': '#f34b7d',
      Shell: '#89e051'
    };
    return colors[lang] || '#a0a0ab';
  }

  function renderList() {
    var box = byId('catList');
    var meta = byId('catMeta');
    if (!box) return;
    var rows = filtered();
    if (meta) {
      meta.innerHTML = '<span style="background:#1a1a22;padding:4px 10px;border-radius:99px;border:1px solid rgba(255,255,255,0.06);color:#e0e0e8;font-size:12px;font-weight:600">'
        + rows.length + ' <span style="color:var(--mu);font-weight:400">/ ' + state.rows.length + ' dépôts</span></span>';
    }
    box.innerHTML = rows.length ? rows.map(function (row) {
      var badges = (row.private ? '<span class="cat-pill cat-pill-private">🔒 Privé</span> ' : '<span class="cat-pill cat-pill-public">🌐 Public</span> ')
        + (row.archived ? '<span class="cat-pill cat-pill-archived">📦 Archivé</span> ' : '')
        + (row.published_project_id ? '<span class="cat-pill cat-pill-pub">⭐ Publié</span>' : '<span class="cat-pill cat-pill-unpub">Non publié</span>');

      var langBadge = row.language ? '<span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#ffffff;font-weight:500">'
        + '<span style="width:8px;height:8px;border-radius:50%;background:' + getLangColor(row.language) + '"></span>'
        + esc(row.language) + '</span>' : '';

      return '<div class="cat-item-row">'
        + '<div style="display:flex;align-items:flex-start;gap:12px;flex:2;min-width:240px">'
        + '<span class="cat-repo-icon">'
        + '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
        + '</span>'
        + '<div style="min-width:0">'
        + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
        + '<b style="color:#ffffff;font-size:15px;letter-spacing:-0.2px">' + esc(row.name) + '</b>'
        + (row.html_url ? '<a href="' + esc(row.html_url) + '" target="_blank" rel="noopener" style="color:var(--mu);font-size:12px;display:inline-flex;align-items:center" title="Ouvrir sur GitHub">↗</a>' : '')
        + '</div>'
        + '<small style="display:block;color:var(--mu);font-size:12px;margin:2px 0 6px">' + esc(row.description || 'Aucune description fournie.') + '</small>'
        + '<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">'
        + langBadge
        + '<span style="font-size:11px;color:var(--mu);display:inline-flex;align-items:center;gap:4px">★ ' + (row.stargazers_count || 0) + '</span>'
        + (row.forks_count ? '<span style="font-size:11px;color:var(--mu)">⑂ ' + row.forks_count + '</span>' : '')
        + '<span style="font-size:11px;color:var(--mu)">Mis à jour le ' + esc(row.pushed_at ? new Date(row.pushed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—') + '</span>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end">'
        + '<div>' + badges + '</div>'
        + '<button class="bt gh sm" type="button" data-cat="detail" data-id="' + esc(row.id) + '" style="font-weight:600">Détails</button>'
        + '</div>'
        + '</div>';
    }).join('') : '<div style="text-align:center;padding:36px;color:var(--mu)">Aucun dépôt ne correspond aux critères de recherche.</div>';
  }

  function renderDetail(row) {
    var box = byId('catDetail');
    if (!box) return;
    var readme = row.readme ? '<pre style="max-height:260px;overflow:auto;white-space:pre-wrap;font-size:12px;background:#09090d;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;color:#d0d0d8;font-family:ui-monospace,Menlo,Consolas,monospace;line-height:1.6">' + esc(row.readme.slice(0, 4000)) + '</pre>' : '<small style="color:var(--mu)">Aucun README synchronisé pour ce dépôt.</small>';
    var branches = (row.branches || []).map(function (b) { return '<span class="tag" style="background:#16161c;border-color:rgba(255,255,255,0.1)">' + esc(b.name) + '</span>'; }).join(' ') || '—';
    var releases = (row.releases || []).map(function (r) { return '<span class="tag" style="background:rgba(230,0,18,0.1);color:#ff6b6b;border-color:rgba(230,0,18,0.25)">' + esc(r.tag || r.name) + '</span>'; }).join(' ') || '—';

    box.hidden = false;
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:14px">'
      + '<div>'
      + '<h3 style="margin:0 0 6px;font-size:18px"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>' + esc(row.full_name) + '</h3>'
      + '<p style="color:var(--mu);margin:0;font-size:13px">' + esc(row.description || 'Sans description') + '</p>'
      + '</div>'
      + '<button class="bt gh sm" type="button" data-cat="close">Fermer ✕</button>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;background:#16161c;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;margin-bottom:16px">'
      + '<div style="font-size:12px"><span style="color:var(--mu);display:block">Visibilité</span><b style="color:#ffffff">' + (row.private ? '🔒 Privé' : '🌐 Public') + '</b></div>'
      + '<div style="font-size:12px"><span style="color:var(--mu);display:block">Archivé</span><b style="color:#ffffff">' + (row.archived ? 'Oui' : 'Non') + '</b></div>'
      + '<div style="font-size:12px"><span style="color:var(--mu);display:block">Statut synchro</span><b style="color:' + (row.sync_status === 'synced' ? 'var(--ok)' : '#ffffff') + '">' + esc(row.sync_status || 'Inconnu') + '</b></div>'
      + '<div style="font-size:12px"><span style="color:var(--mu);display:block">Dernière synchro</span><b style="color:#ffffff">' + esc(row.synced_at ? new Date(row.synced_at).toLocaleString('fr-FR') : '—') + '</b></div>'
      + '</div>'
      + '<div style="margin-bottom:14px"><span style="font-size:12px;color:var(--mu);display:block;margin-bottom:6px">Langages détectés :</span><b style="font-size:13px;color:#ffffff">' + esc(Object.keys(row.languages || {}).join(', ') || row.language || '—') + '</b></div>'
      + '<div style="margin-bottom:14px"><span style="font-size:12px;color:var(--mu);display:block;margin-bottom:6px">Branches actives :</span><div>' + branches + '</div></div>'
      + '<div style="margin-bottom:16px"><span style="font-size:12px;color:var(--mu);display:block;margin-bottom:6px">Releases / Tags :</span><div>' + releases + '</div></div>'
      + '<div style="margin-bottom:18px"><span style="font-size:12px;color:var(--mu);display:block;margin-bottom:4px">Dépôt distant :</span><a href="' + esc(row.html_url || '#') + '" target="_blank" rel="noopener" style="color:var(--ac);font-size:13px;font-weight:600">' + esc(row.html_url || '') + ' ↗</a></div>'
      + '<b style="font-size:12px;color:var(--mu);display:block;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Aperçu du README.md</b>'
      + readme;

    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function syncAll() {
    var client = sb();
    if (!client || !client.functions) { msg('Edge Function indisponible (github-inventory).', false); return; }
    msg('Synchronisation du catalogue en cours…', true);
    client.functions.invoke('github-inventory', { body: {} }).then(function (r) {
      if (r.error) { msg('Erreur lors de la synchronisation : ' + (r.error.message || r.error), false); return; }
      msg('Synchronisation réussie ! Rechargement…', true);
      load();
    }).catch(function (e) { msg('Synchronisation impossible : ' + (e && e.message || e), false); });
  }

  function bind() {
    var root = byId('ct');
    if (!root || root.__catBound) return;
    root.__catBound = true;

    ['catQ', 'catVis', 'catStatus', 'catLang', 'catSort'].forEach(function (id) {
      var el = byId(id);
      if (!el) return;
      var ev = id === 'catQ' ? 'input' : 'change';
      el.addEventListener(ev, function () {
        state.q = (byId('catQ') || {}).value || '';
        state.visibility = (byId('catVis') || {}).value || '';
        state.status = (byId('catStatus') || {}).value || '';
        state.language = (byId('catLang') || {}).value || '';
        state.sort = (byId('catSort') || {}).value || 'updated';
        renderList();
      });
    });

    root.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-cat]');
      if (!btn) return;
      var act = btn.getAttribute('data-cat');
      if (act === 'sync') syncAll();
      else if (act === 'detail') {
        var id = btn.getAttribute('data-id');
        var found = state.rows.filter(function (x) { return String(x.id) === String(id); })[0];
        if (found) renderDetail(found);
      } else if (act === 'close') {
        var d = byId('catDetail');
        if (d) d.hidden = true;
      }
    });
  }

  window.EA_CATALOG = { render: render, load: load };
})();