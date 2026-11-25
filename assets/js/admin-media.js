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
    return '<div class="hd"><div><h1>Médiathèque & Fichiers</h1><p class="sbt">Couvertures et galeries des projets publiés (Supabase Storage bucket « media » + portfolio_media).</p></div></div>'
      + '<div id="mediaMsg" class="cd" hidden style="margin-bottom:16px"></div>'
      + '<div id="mediaStats" style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px"></div>'
      + '<div class="cd" style="margin-bottom:20px">'
      + '<h3 style="margin-bottom:14px">Ajouter des images</h3>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;align-items:end">'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Projet</span><select id="mediaProject" style="width:100%;min-width:0"></select></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Type</span><select id="mediaKind" style="width:100%;min-width:0"><option value="gallery">Galerie</option><option value="cover">Couverture</option></select></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Texte alternatif</span><input id="mediaAlt" placeholder="Description de l’image" style="width:100%;min-width:0"></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Fichiers</span><input id="mediaFiles" type="file" accept="image/*" multiple style="width:100%;min-width:0;padding:8px"></label>'
      + '</div>'
      + '<div style="display:flex;justify-content:flex-end;margin-top:14px">'
      + '<button class="bt" type="button" data-media="upload">+ Téléverser les images</button>'
      + '</div></div>'
      + '<div class="cd"><h3>Images du projet</h3><div id="mediaGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-top:12px">Chargement…</div></div>';
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
    var stats = byId('mediaStats');
    if (stats) {
      var covers = state.media.filter(function (m) { return m.kind === 'cover'; }).length;
      var galleries = state.media.length - covers;
      stats.innerHTML = '<div class="tax-badge-stat"><b>' + state.media.length + '</b> Fichiers</div>'
        + '<div class="tax-badge-stat"><b style="color:var(--ac)">' + covers + '</b> Couvertures</div>'
        + '<div class="tax-badge-stat"><b>' + galleries + '</b> Galeries</div>'
        + '<div class="tax-badge-stat"><b>' + state.projects.length + '</b> Projets publiés</div>';
    }
    var grid = byId('mediaGrid');
    if (!grid) return;
    var project = currentProject();
    var list = state.media.filter(function (m) { return !project || m.project_id === project.id; });
    grid.innerHTML = list.length ? list.map(function (m) {
      var isCover = m.kind === 'cover';
      return '<figure style="margin:0;border:1px solid rgba(255,255,255,0.08);border-radius:12px;background:#16161c;overflow:hidden;display:flex;flex-direction:column">'
        + '<div style="position:relative;background:#0a0a0e">'
        + '<img src="' + esc(m.url) + '" alt="' + esc(m.alt || '') + '" loading="lazy" style="display:block;width:100%;height:130px;object-fit:cover">'
        + '<span style="position:absolute;top:8px;left:8px;padding:3px 9px;border-radius:99px;font-size:10px;font-weight:700;text-transform:uppercase;background:' + (isCover ? 'var(--ac)' : 'rgba(59,130,246,0.9)') + ';color:#fff">' + esc(isCover ? 'Couverture' : 'Galerie') + '</span>'
        + '</div>'
        + '<figcaption style="padding:10px 12px;font-size:12px;color:#d0d0dc;flex:1">' + esc(m.alt || 'Sans description') + '</figcaption>'
        + '<div style="padding:0 12px 12px"><button class="bt gh sm" type="button" data-media="remove" data-id="' + esc(m.id) + '" data-path="' + esc(m.storage_path || '') + '" style="width:100%;justify-content:center">Supprimer</button></div></figure>';
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
