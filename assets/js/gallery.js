/* Galerie publique des projets (P1).
   Lit l'API P0 (RPC de recherche puis repli PostgREST), avec repli final sur
   le catalogue statique. ES5, sans dépendance. */
(function () {
  'use strict';

  var PER_PAGE = 9;
  var api = window.EA_API;
  var state = {
    page: 0,
    items: [],
    total: 0,
    hasMore: false,
    loading: false,
    degraded: false,
    filters: { q: '', cat: '', sub: '', tech: '', tag: '', sort: 'recent' }
  };
  var els = {};
  var debounceTimer = null;
  var allCategories = [];
  var mobileQuery = null;
  var advancedExpanded = false;

  function byId(id) { return document.getElementById(id); }

  function slugify(value) {
    if (typeof window.eaSlug === 'function') return window.eaSlug(value);
    return String(value == null ? '' : value).toLowerCase()
      .replace(/[àâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o').replace(/[ùûü]/g, 'u').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function art(project) {
    if (typeof window.eaProjectArt === 'function') return window.eaProjectArt(project);
    return '';
  }

  function splitTechnologies(value) {
    if (Object.prototype.toString.call(value) === '[object Array]') return value.slice();
    return String(value == null ? '' : value).split(',').map(function (item) { return item.trim(); }).filter(Boolean);
  }

  function clear(element) {
    while (element && element.firstChild) element.removeChild(element.firstChild);
  }

  function readUrl() {
    var params;
    try { params = new URLSearchParams(window.location.search); } catch (e) { return; }
    state.filters.q = params.get('q') || '';
    state.filters.cat = params.get('cat') || '';
    state.filters.sub = params.get('sub') || '';
    state.filters.tech = params.get('tech') || '';
    state.filters.tag = params.get('tag') || '';
    var sort = params.get('sort') || '';
    if (['recent', 'updated', 'alpha', 'oldest', 'featured'].indexOf(sort) >= 0) state.filters.sort = sort;
  }

  function updateUrl() {
    var params = [];
    function add(key, value) { if (value) params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value)); }
    add('q', state.filters.q);
    add('cat', state.filters.cat);
    add('sub', state.filters.sub);
    add('tech', state.filters.tech);
    add('tag', state.filters.tag);
    if (state.filters.sort && state.filters.sort !== 'recent') add('sort', state.filters.sort);
    var url = window.location.pathname + (params.length ? '?' + params.join('&') : '');
    try { window.history.replaceState(null, '', url); } catch (e) { /* file:// */ }
  }

  function syncControls() {
    els.search.value = state.filters.q;
    els.category.value = state.filters.cat || '';
    if (els.sub) els.sub.value = state.filters.sub || '';
    els.tech.value = state.filters.tech || '';
    els.tag.value = state.filters.tag || '';
    els.sort.value = state.filters.sort || 'recent';
  }

  function fillSelect(select, items, allLabel) {
    if (!select) return;
    var current = select.value;
    clear(select);
    var first = document.createElement('option');
    first.value = '';
    first.textContent = allLabel;
    select.appendChild(first);
    (items || []).forEach(function (item) {
      var option = document.createElement('option');
      option.value = item.slug || slugify(item.name);
      option.textContent = item.name || item.slug;
      select.appendChild(option);
    });
    select.value = current;
  }

  function childrenOf(parentSlug) {
    if (!parentSlug) return [];
    return allCategories.filter(function (category) { return category.parent_slug === parentSlug; });
  }

  function fillSubSelect() {
    if (!els.sub) return;
    var children = childrenOf(els.category.value);
    var current = state.filters.sub || els.sub.value;
    fillSelect(els.sub, children, 'Toutes');
    if (children.some(function (category) { return category.slug === current; })) {
      els.sub.value = current;
      state.filters.sub = current;
    } else {
      els.sub.value = '';
      state.filters.sub = '';
    }
    if (els.subField) els.subField.hidden = children.length === 0;
  }

  function syncAdvancedDisclosure() {
    var isMobile = !!(mobileQuery && mobileQuery.matches);
    if (!els.advancedToggle || !els.advancedFields) return;
    els.advancedToggle.hidden = !isMobile;
    els.advancedFields.hidden = isMobile && !advancedExpanded;
    els.advancedToggle.setAttribute('aria-expanded', isMobile ? String(advancedExpanded) : 'true');
    if (els.advancedLabel) els.advancedLabel.textContent = advancedExpanded ? 'Moins de filtres' : 'Plus de filtres';
    if (els.advancedIndicator) els.advancedIndicator.textContent = advancedExpanded ? '−' : '+';
  }

  function initAdvancedDisclosure() {
    advancedExpanded = !!(state.filters.sub || state.filters.tech || state.filters.tag);
    if (typeof window.matchMedia === 'function') {
      mobileQuery = window.matchMedia('(max-width: 560px)');
    }
    syncAdvancedDisclosure();
    if (!mobileQuery) return;
    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', syncAdvancedDisclosure);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(syncAdvancedDisclosure);
    }
  }

  function categoryQueryValues() {
    if (state.filters.sub) return [state.filters.sub];
    if (!state.filters.cat) return [];
    return [state.filters.cat].concat(childrenOf(state.filters.cat).map(function (category) { return category.slug; }));
  }

  function catalogProjects() {
    var projects = (typeof window.eaPublishedProjects === 'function')
      ? window.eaPublishedProjects()
      : (window.EA_PROJECTS || []).filter(function (p) { return p && p.st === 'Publié'; });
    return projects.filter(function (p) { return !/Victoria/i.test(p.n || ''); });
  }

  function loadTaxonomies() {
    var fallback = function () {
      var categories = {};
      var technologies = {};
      catalogProjects().forEach(function (project) {
        if (project.cat) categories[project.cat] = true;
        splitTechnologies(project.t).forEach(function (tech) { technologies[tech] = true; });
      });
      allCategories = Object.keys(categories).map(function (name) { return { slug: slugify(name), name: name, featured: true, parent_slug: null }; });
      fillSelect(els.category, allCategories, 'Toutes');
      fillSelect(els.tech, Object.keys(technologies).map(function (name) { return { slug: slugify(name), name: name }; }), 'Toutes');
      fillSelect(els.tag, [], 'Tous');
      syncControls();
      fillSubSelect();
    };
    if (!api || typeof api.listTaxonomies !== 'function' || !api.isEnabled()) {
      fallback();
      return;
    }
    api.listTaxonomies().then(function (taxonomies) {
      if (!taxonomies) { fallback(); return; }
      allCategories = taxonomies.categories || [];
      var featuredRoots = allCategories.filter(function (category) { return category.featured && !category.parent_slug; });
      var selectedRoot = allCategories.filter(function (category) {
        return category.slug === state.filters.cat && !category.parent_slug;
      })[0];
      if (selectedRoot && !featuredRoots.some(function (category) { return category.slug === selectedRoot.slug; })) {
        featuredRoots.push(selectedRoot);
      }
      fillSelect(els.category, featuredRoots, 'Toutes');
      fillSelect(els.tech, taxonomies.technologies, 'Toutes');
      fillSelect(els.tag, taxonomies.tags, 'Tous');
      syncControls();
      fillSubSelect();
    }, fallback);
  }

  function catalogFallback(page) {
    var filters = state.filters;
    var q = (filters.q || '').toLowerCase();
    var list = catalogProjects().filter(function (project) {
      if (filters.cat && slugify(project.cat) !== filters.cat) return false;
      if (filters.tech) {
        var techs = splitTechnologies(project.t).map(slugify);
        if (techs.indexOf(filters.tech) < 0) return false;
      }
      if (filters.tag) return false;
      if (q) {
        var haystack = [project.n, project.d, project.long, project.t].join(' ').toLowerCase();
        if (haystack.indexOf(q) < 0) return false;
      }
      return true;
    });
    var offset = (page - 1) * PER_PAGE;
    var items = list.slice(offset, offset + PER_PAGE).map(function (project) {
      return {
        n: project.n, d: project.d, cat: project.cat,
        t: splitTechnologies(project.t), slug: project.slug || slugify(project.n),
        u: project.u || '', st: 'published'
      };
    });
    return { items: items, total: list.length, hasMore: offset + items.length < list.length, degraded: true, source: 'catalog' };
  }

  function cardElement(project) {
    var link = document.createElement('a');
    link.className = 'gl-card';
    link.href = 'project.html?project=' + encodeURIComponent(project.slug || slugify(project.n));

    var image = document.createElement('div');
    image.className = 'gl-card-image';
    var visual = art({ n: project.n, cat: project.cat });
    if (visual) image.style.backgroundImage = 'url("' + String(visual).replace(/"/g, '%22') + '")';
    if (project.cat) {
      var badge = document.createElement('span');
      badge.className = 'gl-card-cat';
      badge.textContent = project.cat;
      image.appendChild(badge);
    }
    link.appendChild(image);

    var body = document.createElement('div');
    body.className = 'gl-card-body';
    var title = document.createElement('h2');
    title.className = 'gl-card-title';
    title.textContent = project.n || 'Projet';
    body.appendChild(title);

    var desc = document.createElement('p');
    desc.className = 'gl-card-desc';
    desc.textContent = project.d || '';
    body.appendChild(desc);

    var techs = splitTechnologies(project.t).slice(0, 3);
    if (techs.length) {
      var techBox = document.createElement('div');
      techBox.className = 'gl-card-tech';
      techs.forEach(function (tech) {
        var chip = document.createElement('span');
        chip.textContent = tech;
        techBox.appendChild(chip);
      });
      body.appendChild(techBox);
    }

    var cta = document.createElement('span');
    cta.className = 'gl-card-cta';
    cta.textContent = 'Voir le projet →';
    body.appendChild(cta);
    link.appendChild(body);
    return link;
  }

  function render() {
    clear(els.grid);
    state.items.forEach(function (project) { els.grid.appendChild(cardElement(project)); });
    var count = state.total;
    els.count.textContent = count + (count > 1 ? ' projets publiés' : ' projet publié');
    els.empty.hidden = !(count === 0 && !state.loading);
    els.more.hidden = !state.hasMore;
    els.degraded.hidden = !state.degraded;
    els.error.hidden = true;
  }

  function load(reset) {
    if (state.loading) return;
    state.loading = true;
    var page = reset ? 1 : state.page + 1;
    if (reset) {
      state.items = [];
      state.total = 0;
      state.hasMore = false;
      els.count.textContent = 'Chargement…';
      els.empty.hidden = true;
      els.error.hidden = true;
    }
    var options = {
      page: page,
      perPage: PER_PAGE,
      q: state.filters.q,
      categories: categoryQueryValues(),
      technologies: state.filters.tech ? [state.filters.tech] : [],
      tags: state.filters.tag ? [state.filters.tag] : [],
      sort: state.filters.sort
    };
    var request = (api && typeof api.searchProjects === 'function' && api.isEnabled())
      ? api.searchProjects(options)
      : Promise.resolve(null);
    request.then(function (result) {
      if (!result) result = catalogFallback(page);
      var items = (result.items || []).filter(function (project) {
        return project && (project.st === 'published' || project.st === 'Publié');
      });
      if (reset) state.items = [];
      state.items = state.items.concat(items);
      state.total = Number(result.total || items.length);
      state.hasMore = !!result.hasMore;
      state.degraded = !!result.degraded;
      state.page = page;
      state.loading = false;
      render();
    }).catch(function () {
      state.loading = false;
      els.error.hidden = false;
      els.count.textContent = 'Erreur de chargement';
      els.more.hidden = true;
    });
  }

  function applyFilters() {
    state.filters.q = els.search.value.trim();
    state.filters.cat = els.category.value;
    state.filters.sub = els.sub ? els.sub.value : '';
    state.filters.tech = els.tech.value;
    state.filters.tag = els.tag.value;
    state.filters.sort = els.sort.value || 'recent';
    updateUrl();
    load(true);
  }

  function init() {
    els.search = byId('gallerySearch');
    els.category = byId('galleryCategory');
    els.sub = byId('gallerySub');
    els.tech = byId('galleryTech');
    els.tag = byId('galleryTag');
    els.sort = byId('gallerySort');
    els.grid = byId('galleryGrid');
    els.count = byId('galleryCount');
    els.more = byId('galleryMore');
    els.empty = byId('galleryEmpty');
    els.error = byId('galleryError');
    els.degraded = byId('galleryDegraded');
    els.reset = byId('galleryReset');
    els.subField = byId('gallerySubField');
    els.advancedToggle = byId('galleryAdvancedToggle');
    els.advancedFields = byId('galleryAdvancedFields');
    els.advancedLabel = byId('galleryAdvancedLabel');
    els.advancedIndicator = byId('galleryAdvancedIndicator');
    els.form = byId('galleryFilters');
    if (!els.grid) return;

    readUrl();
    syncControls();
    initAdvancedDisclosure();
    loadTaxonomies();

    if (els.form) els.form.addEventListener('submit', function (event) { event.preventDefault(); applyFilters(); });
    els.search.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyFilters, 300);
      updateUrl();
    });
    if (els.category) els.category.addEventListener('change', function () { fillSubSelect(); applyFilters(); });
    if (els.advancedToggle) {
      els.advancedToggle.addEventListener('click', function () {
        advancedExpanded = !advancedExpanded;
        syncAdvancedDisclosure();
      });
    }
    [els.sub, els.tech, els.tag, els.sort].forEach(function (select) {
      if (select) select.addEventListener('change', applyFilters);
    });
    if (els.reset) {
      els.reset.addEventListener('click', function () {
        state.filters = { q: '', cat: '', sub: '', tech: '', tag: '', sort: 'recent' };
        syncControls();
        fillSubSelect();
        updateUrl();
        load(true);
      });
    }
    els.more.addEventListener('click', function () { load(false); });

    load(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
