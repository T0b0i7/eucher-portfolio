/* Back-office — écran Médias (P2b3). Upload des images de projet vers
   Supabase Storage (bucket media) + portfolio_media, et suppression. */
(function () {
  'use strict';
  var state = { projects: [], media: [], loaded: false };
  function sb() { return window.SB || null; }
  function byId(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function msg(text, ok) {
    var box = byId('mediaMsg');
    if (!box) return;
    box.textContent = text;
    box.hidden = false;
    box.style.borderColor = ok ? 'var(--ok, #22c55e)' : '#b91c1c';
  }
  function currentProject() {
    var select = byId('mediaProject');
    return state.projects.filter(function (p) { return p.id === (select && select.value); })[0] || null;
  }

  function render() {
    return '<div class="hd"><div><h1>Médias</h1><p class="sbt">Couvertures et galeries des projets publiés. Les fichiers sont stockés dans Supabase Storage (bucket public « media ») et référencés dans portfolio_media.</p></div></div>'
      + '<div id="mediaMsg" class="cd" hidden></div>'
      + '<div class="cd"><h3>Ajouter des images</h3>'
      + '<div class="row" style="flex-wrap:wrap;gap:8px;align-items:flex-end">'
      + '<label style="flex:1;min-width:180px">Projet<select id="mediaProject"></select></label>'
      + '<label style="flex:1;min-width:140px">Type<select id="mediaKind"><option value="gallery">Galerie</option><option value="cover">Couverture</option></select></label>'
      + '<label style="flex:1;min-width:140px">Texte alternatif<input id="mediaAlt" placeholder="Description de l’image"></label>'
      + '<label style="flex:1;min-width:180px">Fichiers<input id="mediaFiles" type="file" accept="image/*" multiple></label>'
      + '<button class="bt sm" type="button" data-media="upload">Téléverser</button>'
      + '</div></div>'
      + '<div class="cd"><h3>Images du projet</h3><div id="mediaGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-top:10px">Chargement…</div></div>';
  }

  function load() {
    var client = sb();
    if (!client) { var g = byId('mediaGrid'); if (g) g.textContent = 'Client Supabase indisponible.'; return; }
    Promise.all([
      client.from('portfolio_projects').select('id,slug,title').eq('status', 'published').order('title', { ascending: true }),
      client.from('portfolio_media').select('*').order('sort_order', { ascending: true })
    ]).then(function (r) {
      if (r[0].error) { msg('Lecture des projets impossible : ' + r[0].error.message, false); return; }
      state.projects = r[0].data || [];
      state.media = r[1].data || [];
      fillProjects();
      renderMedia();
      bind();
    }).catch(function (e) { msg('Erreur réseau : ' + (e && e.message || e), false); });
  }

  function fillProjects() {
    var select = byId('mediaProject');
    if (!select) return;
    var current = select.value;
    select.innerHTML = state.projects.map(function (p) {
      return '<option value="' + esc(p.id) + '">' + esc(p.title) + '</option>';
    }).join('');
    if (current) select.value = current;
  }

  function renderMedia() {
    var grid = byId('mediaGrid');
    if (!grid) return;
    var project = currentProject();
    var list = state.media.filter(function (m) { return !project || m.project_id === project.id; });
    grid.innerHTML = list.length ? list.map(function (m) {
      return '<figure style="margin:0;border:1px solid var(--ln);background:#0b0b0b">'
        + '<img src="' + esc(m.url) + '" alt="' + esc(m.alt || '') + '" loading="lazy" style="display:block;width:100%;height:110px;object-fit:cover">'
        + '<figcaption style="padding:6px;font-size:11px;color:var(--mu)">' + esc(m.kind) + ' · ' + esc(m.alt || 'sans texte') + '</figcaption>'
        + '<button class="bt gh sm" type="button" data-media="remove" data-id="' + esc(m.id) + '" data-path="' + esc(m.storage_path || '') + '" style="margin:6px">Supprimer</button></figure>';
    }).join('') : '<small style="color:var(--mu)">Aucune image pour ce projet.</small>';
  }

  function safeName(name) {
    return String(name || 'image').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  }

  function upload() {
    var files = (byId('mediaFiles') || {}).files || [];
    var project = currentProject();
    if (!project) { msg('Choisis un projet.', false); return; }
    if (!files.length) { msg('Choisis au moins une image.', false); return; }
    var kind = (byId('mediaKind') || {}).value || 'gallery';
    var alt = ((byId('mediaAlt') || {}).value || '').trim();
    var client = sb();
    var jobs = [];
    for (var i = 0; i < files.length; i += 1) {
      (function (file, index) {
        var path = 'projects/' + project.slug + '/' + Date.now() + '-' + index + '-' + safeName(file.name);
        jobs.push(client.storage.from('media').upload(path, file, { upsert: false, contentType: file.type || 'image/jpeg' }).then(function (up) {
          if (up.error) throw up.error;
          var pub = client.storage.from('media').getPublicUrl(path);
          return client.from('portfolio_media').insert({
            project_id: project.id,
            kind: kind,
            storage_path: path,
            url: pub.data.publicUrl,
            alt: alt || file.name,
            sort_order: state.media.length + index
          });
        }));
      })(files[i], i);
    }
    Promise.all(jobs).then(function (results) {
      var errors = results.filter(function (r) { return r && r.error; });
      msg(errors.length ? 'Certaines images ont échoué : ' + errors[0].error.message : files.length + ' image(s) ajoutée(s).', !errors.length);
      load();
    }).catch(function (e) { msg('Téléversement impossible : ' + (e && e.message || e), false); });
  }

  function remove(id, path) {
    if (!window.confirm('Supprimer cette image ?')) return;
    var client = sb();
    var p = path ? client.storage.from('media').remove([path]).catch(function () {}) : Promise.resolve();
    p.then(function () { return client.from('portfolio_media').delete().eq('id', id); }).then(function (r) {
      if (r && r.error) { msg('Suppression impossible : ' + r.error.message, false); return; }
      msg('Image supprimée.', true);
      load();
    });
  }

  function bind() {
    var root = byId('ct');
    if (!root || root.__mediaBound) return;
    root.__mediaBound = true;
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-media]');
      if (!button) return;
      if (button.getAttribute('data-media') === 'upload') upload();
      else if (button.getAttribute('data-media') === 'remove') remove(button.getAttribute('data-id'), button.getAttribute('data-path'));
    });
    var select = byId('mediaProject');
    if (select) select.addEventListener('change', renderMedia);
  }

  window.EA_MEDIA = { render: render, load: load };
})();
