/* Back-office — écran Taxonomie (P2b).
   CRUD des familles, sous-catégories, tags et technologies via Supabase (RLS propriétaire).
   Exposé sous window.EA_TAX, rendu par admin.js (vue `tax`). */
(function () {
  'use strict';

  var state = { categories: [], tags: [], technologies: [], loaded: false, bound: false, filterQ: '', activeCreator: 'root', activeVocab: 'tags' };
  var msgTimer = null;

  function sb() { return window.SB || null; }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function slugify(value) {
    return String(value == null ? '' : value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function byId(id) { return document.getElementById(id); }

  function showMsg(text, ok) {
    var box = byId('taxMsg');
    if (!box) return;
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;padding:4px 0">'
      + '<span style="width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:' + (ok ? 'rgba(16,185,129,0.2)' : 'rgba(230,0,18,0.2)') + ';color:' + (ok ? '#10b981' : '#e60012') + ';font-weight:700">' + (ok ? '✓' : '✕') + '</span>'
      + '<span style="font-weight:500;font-size:13px;color:#ffffff">' + esc(text) + '</span>'
      + '</div>';
    box.hidden = false;
    box.style.borderLeft = '3px solid ' + (ok ? 'var(--ok, #10b981)' : 'var(--ac, #e60012)');
    clearTimeout(msgTimer);
    msgTimer = setTimeout(function () { box.hidden = true; }, 5000);
  }

  function render() {
    return '<div class="hd"><div><h1>Catégories & Tags (Taxonomie)</h1><p class="sbt">Structurez le classement de vos projets : familles principales, sous-catégories, tags et pile technologique.</p></div></div>'
      + '<div id="taxMsg" class="cd" hidden style="margin-bottom:16px"></div>'
      + '<div id="taxStats" class="tax-stats-bar"></div>'
      + '<div class="two" style="grid-template-columns:1.35fr 1fr;gap:20px">'
      + '<div class="cd">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">'
      + '<h3 style="margin:0"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>Familles & Sous-catégories</h3>'
      + '<input id="taxFilterInput" placeholder="Rechercher une catégorie…" style="width:190px;font-size:12px;padding:6px 12px;background:#16161c;border:1px solid rgba(255,255,255,0.08);border-radius:8px">'
      + '</div>'
      + '<div style="background:#16161c;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px;margin-bottom:16px">'
      + '<div class="tax-tab-switch" style="display:flex;gap:6px;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:10px">'
      + '<button class="tax-tab-btn' + (state.activeCreator === 'root' ? ' on' : '') + '" data-c-tab="root" type="button">+ Famille principale</button>'
      + '<button class="tax-tab-btn' + (state.activeCreator === 'child' ? ' on' : '') + '" data-c-tab="child" type="button">+ Sous-catégorie</button>'
      + '</div>'
      + '<div id="taxFormRoot" style="' + (state.activeCreator === 'root' ? 'display:block' : 'display:none') + '">'
      + '<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:12px">'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Nom de la famille</span><input id="taxName" placeholder="Ex. Développement Web" style="width:100%;min-width:0"></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Slug</span><input id="taxSlug" placeholder="auto (optionnel)" style="width:100%;min-width:0"></label>'
      + '</div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:12px;flex-wrap:wrap">'
      + '<label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#ffffff"><input id="taxFeatured" type="checkbox"> <span>⭐ En vedette</span></label>'
      + '<button class="bt sm" data-tax="add-root" type="button">+ Créer</button>'
      + '</div>'
      + '</div>'
      + '<div id="taxFormChild" style="' + (state.activeCreator === 'child' ? 'display:block' : 'display:none') + '">'
      + '<div style="display:grid;grid-template-columns:1fr 1.3fr;gap:12px">'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Famille parente</span><select id="taxParent" style="width:100%;min-width:0"></select></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px;min-width:0"><span>Nom de la sous-catégorie</span><input id="taxChildName" placeholder="Ex. Frontend Development" style="width:100%;min-width:0"></label>'
      + '</div>'
      + '<div style="display:flex;justify-content:flex-end;margin-top:12px">'
      + '<button class="bt sm" data-tax="add-child" type="button">+ Sous-catégorie</button>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<div id="taxCatList">Chargement…</div>'
      + '</div>'
      + '<div class="cd">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:12px">'
      + '<div class="tax-tab-switch" style="display:flex;gap:8px">'
      + '<button class="tax-tab-btn' + (state.activeVocab === 'tags' ? ' on' : '') + '" data-v-tab="tags" type="button">🏷️ Tags (<span id="taxTagCount">0</span>)</button>'
      + '<button class="tax-tab-btn' + (state.activeVocab === 'techs' ? ' on' : '') + '" data-v-tab="techs" type="button">&lt;&gt; Technologies (<span id="taxTechCount">0</span>)</button>'
      + '</div>'
      + '</div>'
      + '<div id="taxVocabTags" style="' + (state.activeVocab === 'tags' ? 'display:block' : 'display:none') + '">'
      + '<div class="row" style="gap:8px;margin-bottom:14px"><input id="taxTagName" placeholder="Nouveau tag (ex. IA, Mobile, Supabase)... Appuyez sur Entrée" style="flex:1"><button class="bt sm" data-tax="add-tag" type="button">+ Ajouter</button></div>'
      + '<div id="taxTagList" class="tax-pill-cloud"></div>'
      + '</div>'
      + '<div id="taxVocabTechs" style="' + (state.activeVocab === 'techs' ? 'display:block' : 'display:none') + '">'
      + '<div class="row" style="gap:8px;margin-bottom:14px"><input id="taxTechName" placeholder="Nouvelle technologie (ex. React, TypeScript)... Appuyez sur Entrée" style="flex:1"><button class="bt sm" data-tax="add-tech" type="button">+ Ajouter</button></div>'
      + '<div id="taxTechList" class="tax-pill-cloud"></div>'
      + '</div>'
      + '</div>'
      + '</div>';
  }

  function load() {
    var client = sb();
    if (!client) { var list = byId('taxCatList'); if (list) list.textContent = 'Client Supabase indisponible.'; return; }
    Promise.all([
      client.from('portfolio_categories').select('id,slug,name,name_en,parent_id,featured,enabled,sort_order').order('sort_order', { ascending: true }),
      client.from('portfolio_tags').select('id,slug,name').order('name', { ascending: true }),
      client.from('portfolio_technologies').select('id,slug,name').order('name', { ascending: true })
    ]).then(function (results) {
      if (results[0].error) { showMsg('Lecture des catégories impossible : ' + results[0].error.message, false); return; }
      state.categories = results[0].data || [];
      state.tags = (results[1].data || []);
      state.technologies = (results[2].data || []);
      state.loaded = true;
      renderStats();
      renderLists();
      bindEvents();
    }).catch(function (error) {
      showMsg('Erreur réseau : ' + (error && error.message || error), false);
    });
  }

  function parents() {
    return state.categories.filter(function (category) { return !category.parent_id; });
  }
  function childrenOf(id) {
    return state.categories.filter(function (category) { return category.parent_id === id; });
  }

  function renderStats() {
    var box = byId('taxStats');
    var tagCountEl = byId('taxTagCount');
    var techCountEl = byId('taxTechCount');
    if (tagCountEl) tagCountEl.textContent = state.tags.length;
    if (techCountEl) techCountEl.textContent = state.technologies.length;

    if (!box) return;
    var roots = parents();
    var allKids = state.categories.filter(function (c) { return !!c.parent_id; });
    var featCount = roots.filter(function (c) { return c.featured; }).length;
    box.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px">'
      + '<div class="tax-badge-stat"><b>' + roots.length + '</b> Familles</div>'
      + '<div class="tax-badge-stat"><b style="color:var(--ac)">' + featCount + '</b> En vedette</div>'
      + '<div class="tax-badge-stat"><b>' + allKids.length + '</b> Sous-catégories</div>'
      + '<div class="tax-badge-stat"><b>' + state.tags.length + '</b> Tags</div>'
      + '<div class="tax-badge-stat"><b>' + state.technologies.length + '</b> Technologies</div>'
      + '</div>';
  }

  function renderLists() {
    var catList = byId('taxCatList');
    var parentSelect = byId('taxParent');
    if (parentSelect) {
      parentSelect.innerHTML = parents().map(function (category) {
        return '<option value="' + esc(category.id) + '">' + esc(category.name) + '</option>';
      }).join('');
    }
    if (catList) {
      var roots = parents();
      var q = (state.filterQ || '').toLowerCase().trim();
      if (q) {
        roots = roots.filter(function (r) {
          var kids = childrenOf(r.id);
          var kidMatch = kids.some(function (k) { return (k.name + ' ' + k.slug).toLowerCase().indexOf(q) >= 0; });
          return (r.name + ' ' + r.slug).toLowerCase().indexOf(q) >= 0 || kidMatch;
        });
      }

      if (!roots.length) {
        catList.innerHTML = '<div style="text-align:center;padding:24px;color:var(--mu)">Aucune catégorie trouvée.</div>';
      } else {
        catList.innerHTML = roots.map(function (category) {
          var kids = childrenOf(category.id);
          return '<div class="tax-cat-item" data-cat-row="' + esc(category.id) + '">'
            + '<div class="tax-cat-head">'
            + '<div style="display:flex;align-items:center;gap:10px;flex:1;min-width:180px">'
            + '<span class="tax-cat-folder">'
            + '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>'
            + '</span>'
            + '<div><b style="color:#ffffff;font-size:14px">' + esc(category.name) + '</b>'
            + '<small style="color:var(--mu);display:block;font-size:11px;font-family:monospace">' + esc(category.slug) + '</small></div>'
            + '</div>'
            + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end">'
            + '<label class="tax-check-label"><input type="checkbox" data-tax="featured" data-id="' + esc(category.id) + '"' + (category.featured ? ' checked' : '') + '> <span>⭐ Vedette</span></label>'
            + '<label class="tax-check-label"><input type="checkbox" data-tax="enabled" data-id="' + esc(category.id) + '"' + (category.enabled === false ? '' : ' checked') + '> <span>Actif</span></label>'
            + '<button class="bt gh sm" type="button" data-tax="toggle-kids" data-id="' + esc(category.id) + '" style="font-size:11px;padding:4px 10px">'
            + '<span>Sous-catégories (' + kids.length + ')</span> <small>▼</small>'
            + '</button>'
            + '<button class="bt gh sm" type="button" data-tax="rename" data-id="' + esc(category.id) + '" title="Renommer" style="padding:4px 8px;font-size:11px">✎</button>'
            + '<button class="bt gh sm tax-btn-del" type="button" data-tax="remove" data-id="' + esc(category.id) + '" title="Supprimer" style="padding:4px 8px;font-size:11px">✕</button>'
            + '</div>'
            + '</div>'
            + '<div id="taxkids-' + esc(category.id) + '" class="tax-kids-box" style="display:none">'
            + (kids.length ? kids.map(function (kid) {
                return '<div class="tax-kid-row">'
                  + '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:140px">'
                  + '<span style="color:var(--mu);font-size:12px">└─</span>'
                  + '<span style="color:#e0e0e8;font-size:13px;font-weight:500">' + esc(kid.name) + '</span>'
                  + '<small style="color:var(--mu);font-size:11px;font-family:monospace">(' + esc(kid.slug) + ')</small>'
                  + '</div>'
                  + '<div style="display:flex;align-items:center;gap:8px">'
                  + '<label class="tax-check-label"><input type="checkbox" data-tax="enabled" data-id="' + esc(kid.id) + '"' + (kid.enabled === false ? '' : ' checked') + '> <span style="font-size:11px">Actif</span></label>'
                  + '<button class="bt gh sm" type="button" data-tax="rename" data-id="' + esc(kid.id) + '" style="padding:2px 7px;font-size:10px">✎</button>'
                  + '<button class="bt gh sm tax-btn-del" type="button" data-tax="remove" data-id="' + esc(kid.id) + '" style="padding:2px 7px;font-size:10px">✕</button>'
                  + '</div>'
                  + '</div>';
              }).join('') : '<div style="padding:6px 0;color:var(--mu);font-size:12px">Aucune sous-catégorie.</div>')
            + '</div></div>';
        }).join('');
      }
    }

    var tagList = byId('taxTagList');
    if (tagList) {
      tagList.innerHTML = state.tags.length ? state.tags.map(function (tag) {
        return '<span class="tax-pill-item">'
          + '<span class="tax-pill-prefix">#</span>'
          + '<span class="tax-pill-name">' + esc(tag.name) + '</span>'
          + '<button class="tax-pill-del" type="button" data-tax="del-tag" data-id="' + esc(tag.id) + '" title="Supprimer">×</button>'
          + '</span>';
      }).join('') : '<small style="color:var(--mu)">Aucun tag enregistré.</small>';
    }

    var techList = byId('taxTechList');
    if (techList) {
      techList.innerHTML = state.technologies.length ? state.technologies.map(function (tech) {
        return '<span class="tax-pill-item tax-pill-tech">'
          + '<span class="tax-pill-prefix">&lt;&gt;</span>'
          + '<span class="tax-pill-name">' + esc(tech.name) + '</span>'
          + '<button class="tax-pill-del" type="button" data-tax="del-tech" data-id="' + esc(tech.id) + '" title="Supprimer">×</button>'
          + '</span>';
      }).join('') : '<small style="color:var(--mu)">Aucune technologie enregistrée.</small>';
    }
  }

  function bindEvents() {
    var rootEl = byId('ct');
    if (rootEl && !rootEl.__taxSwitchBound) {
      rootEl.__taxSwitchBound = true;
      rootEl.addEventListener('click', function (e) {
        var cTab = e.target.closest('[data-c-tab]');
        if (cTab) {
          var targetTab = cTab.dataset.cTab;
          state.activeCreator = targetTab;
          rootEl.querySelectorAll('[data-c-tab]').forEach(function (b) { b.classList.toggle('on', b.dataset.cTab === targetTab); });
          var fRoot = byId('taxFormRoot');
          var fChild = byId('taxFormChild');
          if (fRoot) fRoot.style.display = targetTab === 'root' ? 'flex' : 'none';
          if (fChild) fChild.style.display = targetTab === 'child' ? 'flex' : 'none';
          return;
        }
        var vTab = e.target.closest('[data-v-tab]');
        if (vTab) {
          var targetVTab = vTab.dataset.vTab;
          state.activeVocab = targetVTab;
          rootEl.querySelectorAll('[data-v-tab]').forEach(function (b) { b.classList.toggle('on', b.dataset.vTab === targetVTab); });
          var vTags = byId('taxVocabTags');
          var vTechs = byId('taxVocabTechs');
          if (vTags) vTags.style.display = targetVTab === 'tags' ? 'block' : 'none';
          if (vTechs) vTechs.style.display = targetVTab === 'techs' ? 'block' : 'none';
          return;
        }
      });
    }

    var filterInput = byId('taxFilterInput');
    if (filterInput && !filterInput.__bound) {
      filterInput.__bound = true;
      filterInput.addEventListener('input', function () {
        state.filterQ = filterInput.value || '';
        renderLists();
      });
    }

    var tagInput = byId('taxTagName');
    if (tagInput && !tagInput.__enterBound) {
      tagInput.__enterBound = true;
      tagInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); addTag(); }
      });
    }

    var techInput = byId('taxTechName');
    if (techInput && !techInput.__enterBound) {
      techInput.__enterBound = true;
      techInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); addTech(); }
      });
    }

    var list = byId('taxCatList');
    if (list && !list.__taxBound) {
      list.__taxBound = true;
      list.addEventListener('click', function (event) {
        var button = event.target.closest('[data-tax]');
        if (!button) return;
        var action = button.getAttribute('data-tax');
        var id = button.getAttribute('data-id');
        if (action === 'toggle-kids') {
          var box = byId('taxkids-' + id);
          if (box) {
            var isClosed = box.style.display === 'none';
            box.style.display = isClosed ? 'block' : 'none';
            var arrow = button.querySelector('small');
            if (arrow) arrow.textContent = isClosed ? '▲' : '▼';
          }
        } else if (action === 'rename') renameCategory(id);
        else if (action === 'remove') removeCategory(id);
        else if (action === 'featured' || action === 'enabled') {
          var column = action === 'featured' ? 'featured' : 'enabled';
          updateCategory(id, column, !!button.checked);
        }
      });
    }

    var root = byId('ct');
    if (root && !root.__taxActionsBound) {
      root.__taxActionsBound = true;
      root.addEventListener('click', function (event) {
        var button = event.target.closest('[data-tax]');
        if (!button) return;
        var action = button.getAttribute('data-tax');
        if (action === 'add-root') addRoot();
        else if (action === 'add-child') addChild();
        else if (action === 'add-tag') addTag();
        else if (action === 'add-tech') addTech();
        else if (action === 'del-tag') removeTag(button.getAttribute('data-id'));
        else if (action === 'del-tech') removeTech(button.getAttribute('data-id'));
      });
    }
  }

  function insertCategory(payload) {
    return sb().from('portfolio_categories').insert(payload).then(function (result) {
      if (result.error) { showMsg('Enregistrement impossible : ' + result.error.message, false); return false; }
      return true;
    });
  }

  function addRoot() {
    var name = (byId('taxName') || {}).value || '';
    var slug = (byId('taxSlug') || {}).value || '';
    name = name.trim();
    if (!name) { showMsg('Le nom est obligatoire.', false); return; }
    slug = slugify(slug || name);
    if (!slug) { showMsg('Slug invalide.', false); return; }
    var maxOrder = parents().reduce(function (max, category) { return Math.max(max, category.sort_order || 0); }, 0);
    insertCategory({ slug: slug, name: name, name_en: name, featured: !!(byId('taxFeatured') || {}).checked, enabled: true, sort_order: maxOrder + 1 }).then(function (ok) {
      if (!ok) return;
      showMsg('Famille « ' + name + ' » ajoutée avec succès.', true);
      var n = byId('taxName'); if (n) n.value = '';
      var s = byId('taxSlug'); if (s) s.value = '';
      var f = byId('taxFeatured'); if (f) f.checked = false;
      load();
    });
  }

  function addChild() {
    var parent = (byId('taxParent') || {}).value;
    var name = ((byId('taxChildName') || {}).value || '').trim();
    if (!parent || !name) { showMsg('Veuillez choisir une famille parente et un nom.', false); return; }
    var slug = slugify(name);
    var maxOrder = childrenOf(parent).reduce(function (max, category) { return Math.max(max, category.sort_order || 0); }, 0);
    insertCategory({ slug: slug, name: name, name_en: name, parent_id: parent, featured: false, enabled: true, sort_order: maxOrder + 1 }).then(function (ok) {
      if (!ok) return;
      showMsg('Sous-catégorie « ' + name + ' » ajoutée.', true);
      var c = byId('taxChildName'); if (c) c.value = '';
      load();
    });
  }

  function updateCategory(id, column, value) {
    var patch = {}; patch[column] = value;
    sb().from('portfolio_categories').update(patch).eq('id', id).then(function (result) {
      if (result.error) { showMsg('Mise à jour impossible : ' + result.error.message, false); load(); return; }
      showMsg('Catégorie mise à jour.', true);
      renderStats();
    });
  }

  function renameCategory(id) {
    var row = state.categories.filter(function (category) { return category.id === id; })[0];
    if (!row) return;
    var name = window.prompt('Nouveau nom pour la catégorie :', row.name);
    if (name === null) return;
    name = name.trim();
    if (!name) return;
    sb().from('portfolio_categories').update({ name: name, name_en: name }).eq('id', id).then(function (result) {
      if (result.error) { showMsg('Renommage impossible : ' + result.error.message, false); return; }
      showMsg('Catégorie renommée en « ' + name + ' ».', true);
      load();
    });
  }

  function removeCategory(id) {
    var row = state.categories.filter(function (category) { return category.id === id; })[0];
    if (!row) return;
    var kids = childrenOf(id).length;
    if (kids) { showMsg('Veuillez d’abord supprimer les ' + kids + ' sous-catégories de « ' + row.name + ' ».', false); return; }
    if (!window.confirm('Supprimer « ' + row.name + ' » ? Les projets classés dans cette catégorie perdront cette référence.')) return;
    sb().from('portfolio_categories').delete().eq('id', id).then(function (result) {
      if (result.error) { showMsg('Suppression impossible : ' + result.error.message, false); return; }
      showMsg('Catégorie « ' + row.name + ' » supprimée.', true);
      load();
    });
  }

  function simpleInsert(table, payload, label) {
    sb().from(table).insert(payload).then(function (result) {
      if (result.error) { showMsg('Ajout impossible : ' + result.error.message, false); return; }
      showMsg(label + ' ajouté avec succès.', true);
      load();
    });
  }
  function addTag() {
    var input = byId('taxTagName'); var name = (input.value || '').trim();
    if (!name) return;
    simpleInsert('portfolio_tags', { slug: slugify(name), name: name }, 'Tag');
    input.value = '';
  }
  function addTech() {
    var input = byId('taxTechName'); var name = (input.value || '').trim();
    if (!name) return;
    simpleInsert('portfolio_technologies', { slug: slugify(name), name: name }, 'Technologie');
    input.value = '';
  }
  function removeRow(table, id, label) {
    if (!window.confirm('Supprimer ce ' + label + ' ? Les projets associés perdront ce tag.')) return;
    sb().from(table).delete().eq('id', id).then(function (result) {
      if (result.error) { showMsg('Suppression impossible : ' + result.error.message, false); return; }
      showMsg(label + ' supprimé.', true);
      load();
    });
  }
  function removeTag(id) { removeRow('portfolio_tags', id, 'tag'); }
  function removeTech(id) { removeRow('portfolio_technologies', id, 'technologie'); }

  window.EA_TAX = { render: render, load: load };
})();