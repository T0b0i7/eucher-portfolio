/* Back-office — GitHub (P3). Associe les dépôts et déclenche la synchronisation
   via l'Edge Function github-sync. */
(function () {
  'use strict';
  var state = { rows: [] };
  function sb() { return window.SB || null; }
  function byId(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function msg(text, ok) {
    var box = byId('ghMsg');
    if (!box) return;
    box.textContent = text;
    box.hidden = false;
    box.style.borderColor = ok ? 'var(--ok, #22c55e)' : '#b91c1c';
  }
  function stat(category, stats) {
    var found = stats.filter(function (s) { return s.category === category; })[0];
    return found ? found.commits : 0;
  }

  function render() {
    return '<div class="hd"><div><h1>GitHub</h1><p class="sbt">Associe chaque projet à son dépôt (champ « Lien du projet » ou repo_url), puis synchronise les commits. La classification (feat, fix, docs, perf…) est calculée à la synchronisation.</p></div></div>'
      + '<div id="ghMsg" class="cd" hidden></div>'
      + '<div class="cd"><h3>Dépôts et synchronisation</h3><div id="ghList">Chargement…</div></div>';
  }

  function load() {
    var client = sb();
    if (!client) { var box = byId('ghList'); if (box) box.textContent = 'Client Supabase indisponible.'; return; }
    Promise.all([
      client.from('portfolio_projects').select('id,slug,title,repo_url,status').order('title', { ascending: true }),
      client.from('portfolio_github_repositories').select('project_id,full_name,last_synced_at'),
      client.from('portfolio_github_commit_stats').select('project_id,category,commits')
    ]).then(function (r) {
      if (r[0].error) { msg('Lecture des projets impossible : ' + r[0].error.message, false); return; }
      var repos = r[1].data || [];
      var stats = r[2].data || [];
      state.rows = (r[0].data || []).map(function (p) {
        var repo = repos.filter(function (x) { return x.project_id === p.id; })[0] || null;
        return { project: p, repo: repo, stats: stats.filter(function (s) { return s.project_id === p.id; }) };
      });
      renderList();
      bind();
    }).catch(function (e) { msg('Erreur réseau : ' + (e && e.message || e), false); });
  }

  function renderList() {
    var box = byId('ghList');
    if (!box) return;
    box.innerHTML = state.rows.map(function (row) {
      var p = row.project;
      var linked = row.repo || (p.repo_url ? { full_name: String(p.repo_url).replace(/^https?:\/\/github\.com\//, ''), last_synced_at: null } : null);
      return '<div style="border-top:1px solid var(--ln);padding:10px 0;display:flex;flex-wrap:wrap;gap:10px;align-items:center">'
        + '<b style="flex:1;min-width:180px">' + esc(p.title) + '<small style="display:block;color:var(--mu)">' + esc(p.status) + (linked ? ' · ' + esc(linked.full_name) : ' · aucun dépôt') + '</small></b>'
        + '<span style="font-size:11px;color:var(--mu);min-width:170px">' + (linked && linked.last_synced_at ? 'Sync : ' + esc(new Date(linked.last_synced_at).toLocaleString('fr-FR')) : 'Jamais synchronisé') + '</span>'
        + '<span style="font-size:11px;color:var(--mu);min-width:150px">feat ' + stat('feat', row.stats) + ' · fix ' + stat('fix', row.stats) + ' · docs ' + stat('docs', row.stats) + '</span>'
        + (p.repo_url || linked ? '<button class="bt gh sm" type="button" data-gh="sync" data-id="' + esc(p.id) + '">Synchroniser</button>' : '<small style="color:var(--mu)">Ajoute un lien GitHub au projet</small>')
        + '</div>';
    }).join('') || '<small style="color:var(--mu)">Aucun projet.</small>';
  }

  function sync(projectId) {
    var client = sb();
    if (!client || !client.functions) { msg('Edge Function indisponible (déploie github-sync).', false); return; }
    msg('Synchronisation en cours…', true);
    client.functions.invoke('github-sync', { body: { projectId: projectId } }).then(function (r) {
      if (r.error) { msg('Synchronisation impossible : ' + (r.error.message || r.error), false); return; }
      var d = r.data || {};
      if (d.error) { msg('GitHub : ' + d.error, false); return; }
      msg('Synchronisé : ' + d.repository + ' · ' + d.commits + ' commit(s).', true);
      load();
    }).catch(function (e) { msg('Synchronisation impossible : ' + (e && e.message || e), false); });
  }

  function bind() {
    var root = byId('ct');
    if (!root || root.__ghBound) return;
    root.__ghBound = true;
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-gh]');
      if (button && button.getAttribute('data-gh') === 'sync') sync(button.getAttribute('data-id'));
    });
  }

  window.EA_GITHUB = { render: render, load: load };
})();
