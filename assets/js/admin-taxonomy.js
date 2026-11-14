/* Back-office — écran Taxonomie (P2b).
   CRUD des familles, sous-catégories, tags et technologies via Supabase (RLS propriétaire).
   Exposé sous window.EA_TAX, rendu par admin.js (vue `tax`). */
(function () {
  'use strict';

  var state = { categories: [], tags: [], technologies: [], loaded: false, bound: false };
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
    box.textContent = text;
    box.hidden = false;
    box.style.borderColor = ok ? 'var(--ok, #22c55e)' : '#b91c1c';
    clearTimeout(msgTimer);
    msgTimer = setTimeout(function () { box.hidden = true; }, 5000);
  }

  function render() {
    return '<div class="hd"><div><h1>Taxonomie</h1><p class="sbt">Familles, sous-catégories, tags et technologies. Seules les familles « mises en avant » apparaissent dans la galerie publique ; les 40 familles restent disponibles ici.</p></div></div>'
      + '<div id="taxMsg" class="cd" hidden></div>'
      + '<div class="two">'
      + '<div class="cd"><h3>Familles et sous-catégories</h3>'
      + '<div class="row" style="flex-wrap:wrap;gap:8px;align-items:flex-end">'
      + '<label style="flex:1;min-width:140px">Nom<input id="taxName" placeholder="Ex. Développement Web"></label>'
      + '<label style="flex:1;min-width:120px">Slug<input id="taxSlug" placeholder="auto"></label>'
      + '<label style="display:flex;align-items:center;gap:6px;padding-bottom:8px"><input id="taxFeatured" type="checkbox"> Mise en avant</label>'
      + '<button class="bt sm" data-tax="add-root" type="button">Ajouter une famille</button>'
      + '</div>'
      + '<div class="row" style="flex-wrap:wrap;gap:8px;align-items:flex-end;margin-top:10px">'
      + '<label style="flex:1;min-width:150px">Famille parente<select id="taxParent"></select></label>'
      + '<label style="flex:1;min-width:140px">Nom de la sous-catégorie<input id="taxChildName" placeholder="Ex. Frontend Development"></label>'
      + '<button class="bt gh sm" data-tax="add-child" type="button">Ajouter la sous-catégorie</button>'
      + '</div>'
      + '<div id="taxCatList" style="margin-top:14px">Chargement…</div>'
      + '</div>'
      + '<div class="col">'
      + '<div class="cd"><h3>Tags</h3><div class="row" style="gap:8px"><input id="taxTagName" placeholder="Ex. Finance" style="flex:1"><button class="bt sm" data-tax="add-tag" type="button">Ajouter</button></div><div id="taxTagList"></div></div>'
      + '<div class="cd"><h3>Technologies</h3><div class="row" style="gap:8px"><input id="taxTechName" placeholder="Ex. React" style="flex:1"><button class="bt sm" data-tax="add-tech" type="button">Ajouter</button></div><div id="taxTechList"></div></div>'
      + '</div></div>';
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
      if (!roots.length) { catList.textContent = 'Aucune famille.'; }
      else {
        catList.innerHTML = roots.map(function (category) {
          var kids = childrenOf(category.id);
          return '<div style="border-top:1px solid var(--ln);padding:10px 0" data-cat-row="' + esc(category.id) + '">'
            + '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">'
            + '<b style="flex:1;min-width:150px">' + esc(category.name) + '<small style="color:var(--mu);display:block">' + esc(category.slug) + '</small></b>'
            + '<label style="display:flex;gap:5px;align-items:center;font-size:12px"><input type="checkbox" data-tax="featured" data-id="' + esc(category.id) + '"' + (category.featured ? ' checked' : '') + '> Featured</label>'
            + '<label style="display:flex;gap:5px;align-items:center;font-size:12px"><input type="checkbox" data-tax="enabled" data-id="' + esc(category.id) + '"' + (category.enabled === false ? '' : ' checked') + '> Active</label>'
            + '<button class="bt gh sm" type="button" data-tax="toggle-kids" data-id="' + esc(category.id) + '">Sous-catégories (' + kids.length + ')</button>'
            + '<button class="bt gh sm" type="button" data-tax="rename" data-id="' + esc(category.id) + '">Renommer</button>'
            + '<button class="bt gh sm" type="button" data-tax="remove" data-id="' + esc(category.id) + '">Supprimer</button>'
            + '</div>'
            + '<div id="taxkids-' + esc(category.id) + '" style="display:none;margin:8px 0 0 18px">'
            + kids.map(function (kid) {
              return '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:4px 0">'
                + '<span style="flex:1;min-width:140px">↳ ' + esc(kid.name) + ' <small style="color:var(--mu)">' + esc(kid.slug) + '</small></span>'
                + '<label style="display:flex;gap:5px;align-items:center;font-size:12px"><input type="checkbox" data-tax="enabled" data-id="' + esc(kid.id) + '"' + (kid.enabled === false ? '' : ' checked') + '> Active</label>'
                + '<button class="bt gh sm" type="button" data-tax="rename" data-id="' + esc(kid.id) + '">Renommer</button>'
                + '<button class="bt gh sm" type="button" data-tax="remove" data-id="' + esc(kid.id) + '">Supprimer</button>'
                + '</div>';
            }).join('')
            + '</div></div>';
        }).join('');
      }
    }
    var tagList = byId('taxTagList');
    if (tagList) {
      tagList.innerHTML = state.tags.length ? state.tags.map(function (tag) {
        return '<div style="display:flex;gap:8px;align-items:center;padding:4px 0"><span style="flex:1">' + esc(tag.name) + ' <small style="color:var(--mu)">' + esc(tag.slug) + '</small></span><button class="bt gh sm" type="button" data-tax="del-tag" data-id="' + esc(tag.id) + '">Suppr.</button></div>';
      }).join('') : '<small style="color:var(--mu)">Aucun tag.</small>';
    }
    var techList = byId('taxTechList');
    if (techList) {
      techList.innerHTML = state.technologies.length ? state.technologies.map(function (tech) {
        return '<div style="display:flex;gap:8px;align-items:center;padding:4px 0"><span style="flex:1">' + esc(tech.name) + ' <small style="color:var(--mu)">' + esc(tech.slug) + '</small></span><button class="bt gh sm" type="button" data-tax="del-tech" data-id="' + esc(tech.id) + '">Suppr.</button></div>';
      }).join('') : '<small style="color:var(--mu)">Aucune technologie.</small>';
    }
  }

  function bindEvents() {
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
          if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
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
      showMsg('Famille « ' + name + ' » ajoutée.', true);
      load();
    });
  }

  function addChild() {
    var parent = (byId('taxParent') || {}).value;
    var name = ((byId('taxChildName') || {}).value || '').trim();
    if (!parent || !name) { showMsg('Choisis une famille et un nom.', false); return; }
    var slug = slugify(name);
    var maxOrder = childrenOf(parent).reduce(function (max, category) { return Math.max(max, category.sort_order || 0); }, 0);
    insertCategory({ slug: slug, name: name, name_en: name, parent_id: parent, featured: false, enabled: true, sort_order: maxOrder + 1 }).then(function (ok) {
      if (!ok) return;
      showMsg('Sous-catégorie « ' + name + ' » ajoutée.', true);
      load();
    });
  }

  function updateCategory(id, column, value) {
    var patch = {}; patch[column] = value;
    sb().from('portfolio_categories').update(patch).eq('id', id).then(function (result) {
      if (result.error) { showMsg('Mise à jour impossible : ' + result.error.message, false); load(); return; }
      showMsg('Catégorie mise à jour.', true);
    });
  }

  function renameCategory(id) {
    var row = state.categories.filter(function (category) { return category.id === id; })[0];
    if (!row) return;
    var name = window.prompt('Nouveau nom', row.name);
    if (name === null) return;
    name = name.trim();
    if (!name) return;
    sb().from('portfolio_categories').update({ name: name, name_en: name }).eq('id', id).then(function (result) {
      if (result.error) { showMsg('Renommage impossible : ' + result.error.message, false); return; }
      showMsg('Catégorie renommée.', true);
      load();
    });
  }

  function removeCategory(id) {
    var row = state.categories.filter(function (category) { return category.id === id; })[0];
    if (!row) return;
    var kids = childrenOf(id).length;
    if (kids) { showMsg('Supprime d’abord les ' + kids + ' sous-catégories de « ' + row.name + ' ».', false); return; }
    if (!window.confirm('Supprimer « ' + row.name + ' » ? Les projets classés dans cette catégorie perdront ce classement.')) return;
    sb().from('portfolio_categories').delete().eq('id', id).then(function (result) {
      if (result.error) { showMsg('Suppression impossible : ' + result.error.message, false); return; }
      showMsg('Catégorie supprimée.', true);
      load();
    });
  }

  function simpleInsert(table, payload, label) {
    sb().from(table).insert(payload).then(function (result) {
      if (result.error) { showMsg('Ajout impossible : ' + result.error.message, false); return; }
      showMsg(label + ' ajouté.', true);
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
    if (!window.confirm('Supprimer ce/te ' + label + ' ? Les projets liés perdront ce classement.')) return;
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
