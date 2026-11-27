/* Fiche projet — rendu depuis assets/js/catalog.js (EA_PROJECTS), avec surcouche
   des modifications enregistrées par l'admin (localStorage ea_admin_v1).
   ES5, aucune dépendance, aucune image externe, aucun style inline. */
(function () {
  'use strict';

  var MAX_HERO_TAGS = 6;
  var SHOT_COUNT = 4;

  var ICON = {
    check: 'M20 6 9 17l-5-5',
    tag: 'M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59A2 2 0 0 0 3.59 11l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83z',
    gear: [
      'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
      'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'
    ],
    chart: ['M3 3v18h18', 'M7 14l4-4 4 3 5-6'],
    external: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'],
    code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
    arrowLeft: ['M19 12H5', 'M12 19l-7-7 7-7']
  };

  function has(object, key) {
    return object != null && Object.prototype.hasOwnProperty.call(object, key);
  }

  function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  function text(value) {
    return String(value == null ? '' : value);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function slugOf(name) {
    if (typeof window.eaSlug === 'function') return window.eaSlug(name);
    return text(name)
      .toLowerCase()
      .replace(/[àâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o').replace(/[ùûü]/g, 'u').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function adminProjects() {
    var data = null;
    try { data = JSON.parse(window.localStorage.getItem('ea_admin_v1')); } catch (e) { data = null; }
    if (!data || !isArray(data.projects)) return [];
    return data.projects.filter(function (project) { return project && project.n; });
  }

  function splitTechnologies(value) {
    if (isArray(value)) {
      return value.map(function (item) { return text(item).trim(); }).filter(Boolean);
    }
    return text(value).split(',').map(function (item) { return item.trim(); }).filter(Boolean);
  }

  function pick(base, override, key, fallback) {
    if (override && has(override, key) && override[key] !== undefined && override[key] !== null) {
      return override[key];
    }
    if (base && has(base, key) && base[key] !== undefined && base[key] !== null) {
      return base[key];
    }
    return fallback;
  }

  /* N'accepte que des visuels locaux : data URI d'image ou chemin assets/.
     Une URL distante est ignorée pour ne jamais charger d'image externe. */
  function safeImage(value) {
    var source = text(value).trim();
    if (!source) return '';
    if (/^data:image\//i.test(source)) return source;
    if (/^(?:\.\/)?assets\//i.test(source)) return source;
    return '';
  }

  function httpUrl(value) {
    var source = text(value).trim();
    if (!source) return '';
    try {
      var parsed = new URL(source);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
    } catch (e) { /* URL invalide : ignorée */ }
    return '';
  }

  function isGithubUrl(value) {
    return /^https?:\/\/github\.com\//i.test(value);
  }

  function trimSlash(value) {
    return text(value).replace(/\/+$/, '');
  }

  function initials(label) {
    var parts = text(label).trim().split(/[\s.\-–—/]+/).filter(Boolean);
    if (!parts.length) return 'EA';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  function buildProject(base, override) {
    base = base || {};
    var name = text(pick(base, override, 'n', base.n)) || 'Projet';
    var summary = text(pick(base, override, 'd', base.d));
    var long = text(pick(base, override, 'long', base.long || summary)) || summary;
    var category = text(pick(base, override, 'cat', base.cat));
    var status = text(pick(base, override, 'st', base.st)) || 'Publié';
    var rawUrl = httpUrl(pick(base, override, 'u', base.u));
    var repo = httpUrl(pick(base, override, 'repo', base.repo));
    if (!repo && isGithubUrl(rawUrl)) repo = rawUrl;
    var url = rawUrl;
    var technologies = splitTechnologies(pick(base, override, 't', base.t));
    var cover = safeImage(pick(base, override, 'cover', base.cover));
    var features = isArray(base.f) ? base.f.slice() : [];
    if (override && isArray(override.f)) features = override.f.slice();
    var impact = isArray(base.impact) ? base.impact.slice() : [];
    if (override && isArray(override.impact)) impact = override.impact.slice();

    var baseU = httpUrl(base && base.u);
    var basePreview = httpUrl(base && base.preview);
    var overridePreview = httpUrl(override && override.preview);
    var overrideU = httpUrl(override && override.u);

    var demo = '';
    if (overridePreview && !isGithubUrl(overridePreview)) demo = overridePreview;
    else if (basePreview && !isGithubUrl(basePreview)) demo = basePreview;
    else if (baseU && !isGithubUrl(baseU)) demo = baseU;
    else if (overrideU && !isGithubUrl(overrideU)) demo = overrideU;
    else if (url && !isGithubUrl(url)) demo = url;
    else if (basePreview) demo = basePreview;
    else if (url) demo = url;

    if (demo && repo && trimSlash(demo) === trimSlash(repo)) {
      if (baseU && trimSlash(baseU) !== trimSlash(repo) && !isGithubUrl(baseU)) demo = baseU;
      else if (basePreview && trimSlash(basePreview) !== trimSlash(repo)) demo = basePreview;
      else demo = '';
    }

    var art = (typeof window.eaProjectArt === 'function')
      ? text(window.eaProjectArt({ n: name, cat: category }))
      : '';
    var image = cover || art;

    var description = long.replace(/\r/g, '');
    var paragraphs = description.split(/\n{2,}/).map(function (paragraph) {
      return paragraph.trim();
    }).filter(function (paragraph) { return paragraph.length > 0; });
    if (!paragraphs.length && summary) paragraphs = [summary];

    return {
      name: name,
      summary: summary,
      description: paragraphs,
      features: features,
      technologies: technologies,
      image: image,
      art: art,
      cover: cover,
      url: url,
      demo: demo,
      repo: repo,
      impact: impact,
      category: category,
      status: status,
      sector: text(pick(base, override, 'sec', base.sec)),
      media: isArray(base.media) ? base.media.slice() : []
    };
  }

  function resolveProject(requested) {
    var wanted = text(requested).trim().toLowerCase();
    if (!wanted) return null;

    var catalog = (isArray(window.EA_PROJECTS)) ? window.EA_PROJECTS : [];
    var admin = adminProjects();
    var base = null;
    var override = null;
    var i;

    for (i = 0; i < catalog.length; i += 1) {
      var candidate = catalog[i];
      if (!candidate) continue;
      var candidateSlug = text(candidate.slug).toLowerCase() || slugOf(candidate.n).toLowerCase();
      if (candidateSlug === wanted || slugOf(candidate.n).toLowerCase() === wanted) {
        base = candidate;
        break;
      }
    }

    if (base) {
      for (i = 0; i < admin.length; i += 1) {
        if (text(admin[i].n).trim().toLowerCase() === text(base.n).trim().toLowerCase()) {
          override = admin[i];
          break;
        }
      }
    } else {
      for (i = 0; i < admin.length; i += 1) {
        if (slugOf(admin[i].n).toLowerCase() === wanted) { override = admin[i]; break; }
      }
      if (override) {
        base = {
          n: override.n,
          cat: override.cat || '',
          st: override.st || 'Publié',
          d: override.d || '',
          long: override.long || override.d || '',
          f: isArray(override.f) ? override.f : [],
          t: override.t || '',
          u: override.u || '',
          preview: override.preview || '',
          cover: override.cover || '',
          repo: override.repo || '',
          impact: isArray(override.impact) ? override.impact : []
        };
      }
    }

    if (!base) return null;
    return buildProject(base, override);
  }

  function createSvg(paths) {
    var list = isArray(paths) ? paths : [paths];
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    list.forEach(function (path) {
      var shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      shape.setAttribute('d', path);
      svg.appendChild(shape);
    });
    return svg;
  }

  function fallbackTechSvg(name) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var hexagon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hexagon.setAttribute('d', 'M12 2 21 7v10l-9 5-9-5V7z');
    svg.appendChild(hexagon);
    var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '12');
    label.setAttribute('y', '15');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '7');
    label.setAttribute('font-weight', '700');
    label.setAttribute('fill', 'currentColor');
    label.setAttribute('stroke', 'none');
    label.textContent = initials(name);
    svg.appendChild(label);
    return svg;
  }

  /* innerHTML n'est utilisé que pour les SVG constants renvoyés par le catalogue
     (eaTechIcon), jamais pour des données utilisateur. */
  function techIconElement(name, className) {
    var host = document.createElement('span');
    host.className = className;
    host.setAttribute('aria-hidden', 'true');
    var markup = '';
    if (typeof window.eaTechIcon === 'function') markup = text(window.eaTechIcon(name));
    if (/^<svg[\s>]/i.test(markup)) {
      host.innerHTML = markup;
    } else {
      host.appendChild(fallbackTechSvg(name));
    }
    return host;
  }

  function tagElement(technology) {
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.appendChild(techIconElement(technology, 'tag-icon'));
    var label = document.createElement('span');
    label.className = 'tag-name';
    label.textContent = technology;
    tag.appendChild(label);
    return tag;
  }

  function techElement(technology) {
    var item = document.createElement('li');
    item.className = 'tech-item';
    item.appendChild(techIconElement(technology, 'tech-icon'));
    var label = document.createElement('span');
    label.className = 'tech-name';
    label.textContent = technology;
    item.appendChild(label);
    return item;
  }

  function featureElement(feature) {
    var item = document.createElement('li');
    item.appendChild(createSvg(ICON.check));
    item.appendChild(document.createTextNode(text(feature)));
    return item;
  }

  function resultElement(icon, value, label) {
    var item = document.createElement('div');
    item.className = 'result-item';
    var iconHost = document.createElement('span');
    iconHost.className = 'result-icon';
    iconHost.setAttribute('aria-hidden', 'true');
    iconHost.appendChild(createSvg(icon));
    item.appendChild(iconHost);
    var resultValue = document.createElement('span');
    resultValue.className = 'result-value value';
    resultValue.textContent = value;
    item.appendChild(resultValue);
    var resultLabel = document.createElement('span');
    resultLabel.className = 'result-label label';
    resultLabel.textContent = label;
    item.appendChild(resultLabel);
    return item;
  }

  function dividerElement() {
    var divider = document.createElement('span');
    divider.className = 'result-divider';
    divider.setAttribute('aria-hidden', 'true');
    return divider;
  }

  function clear(element) {
    if (!element) return;
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function renderHero(project) {
    var title = byId('projectTitle');
    if (title) title.textContent = project.name;
    var subtitle = byId('projectSubtitle');
    if (subtitle) subtitle.textContent = project.summary;
    var logo = byId('projectLogo');
    if (logo) logo.textContent = initials(project.name);

    var tags = byId('projectTags');
    if (!tags) return;
    clear(tags);
    var visible = project.technologies.slice();
    (project.tags || []).forEach(function (tag) {
      var name = tag && (tag.name || tag);
      if (!name) return;
      var exists = visible.some(function (item) { return (item.name || item) === name; });
      if (!exists) visible.push({ name: name, slug: (tag && tag.slug) || '' });
    });
    visible = visible.slice(0, MAX_HERO_TAGS);
    visible.forEach(function (technology) { tags.appendChild(tagElement(technology)); });
    tags.hidden = !visible.length;

    var image = byId('projectImage');
    var visual = byId('projectVisual');
    if (image && project.image) {
      image.src = project.image;
      image.alt = 'Visuel du projet ' + project.name;
      if (visual) visual.hidden = false;
    } else if (visual) {
      visual.hidden = true;
    }

    var stat = byId('featuredStat');
    var value = byId('featuredValue');
    var label = byId('featuredLabel');
    if (stat && value && label) {
      var first = project.impact[0];
      if (first && text(first.value)) {
        value.textContent = text(first.value);
        label.textContent = text(first.label);
      } else {
        value.textContent = project.status;
        label.textContent = 'Statut du projet';
      }
      stat.hidden = false;
    }
  }

  function renderDescription(project) {
    var description = byId('projectDescription');
    if (!description) return;
    clear(description);
    project.description.forEach(function (paragraph) {
      var p = document.createElement('p');
      p.textContent = paragraph;
      description.appendChild(p);
    });
  }

  function renderFeatures(project) {
    var section = byId('featuresSection');
    var list = byId('projectFeatures');
    if (!section || !list) return;
    clear(list);
    var features = project.features.filter(function (feature) { return text(feature).trim() !== ''; });
    if (!features.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    features.forEach(function (feature) {
      list.appendChild(featureElement(feature));
    });
  }

  function renderTechnologies(project) {
    var card = byId('techCard');
    var list = byId('projectTechnologies');
    if (!card || !list) return;
    clear(list);
    if (!project.technologies.length) {
      card.hidden = true;
      return;
    }
    card.hidden = false;
    project.technologies.forEach(function (technology) {
      list.appendChild(techElement(technology));
    });
  }

  function renderResults(project) {
    var card = byId('resultsCard');
    var title = byId('resultsTitleText');
    var grid = byId('projectResults');
    if (!card || !title || !grid) return;
    clear(grid);

    var entries = [];
    if (project.impact.length) {
      title.textContent = 'Résultats et impact';
      project.impact.forEach(function (result) {
        entries.push({
          icon: ICON.chart,
          value: text(result && result.value),
          label: text(result && result.label)
        });
      });
    } else {
      title.textContent = 'Repères du projet';
      entries = [
        { icon: ICON.check, value: project.status, label: 'Statut' },
        { icon: ICON.tag, value: project.category || 'Non précisée', label: 'Catégorie' },
        { icon: ICON.gear, value: String(project.technologies.length), label: 'Technologies' }
      ];
    }

    if (!entries.length) {
      card.hidden = true;
      return;
    }
    card.hidden = false;
    entries.forEach(function (entry, index) {
      if (index > 0) grid.appendChild(dividerElement());
      grid.appendChild(resultElement(entry.icon, entry.value, entry.label));
    });
  }

  function shotSource(project, index) {
    if (typeof window.eaProjectShot === 'function') {
      var shot = text(window.eaProjectShot(project, index));
      if (/^data:image\//i.test(shot)) return shot;
    }
    return '';
  }

  function renderGallery(project) {
    var section = byId('previewSection');
    var grid = byId('projectPreviewGrid');
    if (!section || !grid) return;
    clear(grid);

    var shots = [];
    if (isArray(project.media)) {
      project.media.forEach(function (item) {
        var source = safeImage(item && (item.url || item.storage_path || item));
        if (source && shots.indexOf(source) < 0) shots.push(source);
      });
    }
    if (project.cover && shots.indexOf(project.cover) < 0) shots.push(project.cover);
    var index = 0;
    while (shots.length < SHOT_COUNT) {
      var shot = shotSource(project, index);
      if (!shot) {
        if (!shots.length) {
          section.hidden = true;
          return;
        }
        break;
      }
      shots.push(shot);
      index += 1;
    }
    if (!shots.length) {
      section.hidden = true;
      return;
    }

    section.hidden = false;
    shots.forEach(function (source, position) {
      var image = document.createElement('img');
      image.className = 'preview-img';
      image.src = source;
      image.alt = 'Aperçu ' + (position + 1) + ' du projet ' + project.name;
      image.width = 800;
      image.height = 500;
      image.loading = position === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      grid.appendChild(image);
    });
  }

  function actionButton(href, label, className, icon, external) {
    var link = document.createElement('a');
    link.className = 'btn ' + className;
    link.href = href;
    link.appendChild(createSvg(icon));
    link.appendChild(document.createTextNode(label));
    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  }

  function renderActions(project) {
    var host = byId('projectActions');
    if (!host) return;
    var back = byId('backToProjects');
    var insert = function (node) {
      if (back && back.parentNode === host) host.insertBefore(node, back);
      else host.appendChild(node);
    };
    if (project.demo) {
      insert(actionButton(project.demo, 'Voir la démo en ligne', 'btn-primary', ICON.external, true));
    } else {
      var demoAnchor = actionButton('#projectGallery', 'Voir la démo du projet', 'btn-primary', ICON.external, false);
      demoAnchor.addEventListener('click', function (e) {
        var gal = byId('projectGallery');
        if (gal) {
          e.preventDefault();
          gal.scrollIntoView({ behavior: 'smooth' });
        }
      });
      insert(demoAnchor);
    }
    if (project.repo) {
      insert(actionButton(project.repo, 'Voir le code sur GitHub', 'btn-secondary', ICON.code, true));
    }
  }

  function setMetaDescription(value) {
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', value);
  }

  function renderProject(project) {
    document.title = project.name + ' — Étude de cas | Eucher ABATTI';
    setMetaDescription(project.summary || ('Projet ' + project.name + ' — Eucher ABATTI.'));
    renderHero(project);
    renderDescription(project);
    renderFeatures(project);
    renderTechnologies(project);
    renderResults(project);
    renderGallery(project);
    renderActions(project);
    var detail = byId('projectDetail');
    var notFound = byId('projectNotFound');
    if (detail) detail.hidden = false;
    if (notFound) notFound.hidden = true;
  }

  function showNotFound() {
    var detail = byId('projectDetail');
    var notFound = byId('projectNotFound');
    if (detail) detail.hidden = true;
    if (notFound) notFound.hidden = false;
    document.title = 'Projet introuvable — Eucher ABATTI';
    setMetaDescription('Ce projet n’est pas disponible sur le portfolio d’Eucher ABATTI.');
  }

  var requested = '';
  try {
    requested = new URLSearchParams(window.location.search).get('project') || '';
  } catch (e) {
    requested = '';
  }

  var preview = false;
  try { preview = new URLSearchParams(window.location.search).get('preview') === '1'; } catch (e) { preview = false; }

  function renderLocal() {
    var selected = resolveProject(requested);
    if (selected) renderProject(selected);
    else showNotFound();
  }

  function renderRemote(remote) {
    if (!remote || text(remote.st).toLowerCase() !== 'published') {
      showNotFound();
      return;
    }
    var admin = adminProjects();
    var override = null;
    for (var i = 0; i < admin.length; i += 1) {
      if (text(admin[i].n).trim().toLowerCase() === text(remote.n).trim().toLowerCase()) {
        override = admin[i];
        break;
      }
    }
    var base = {
      n: remote.n,
      d: remote.d,
      long: remote.long,
      cat: remote.cat,
      st: 'Publié',
      t: Array.isArray(remote.t) ? remote.t.join(', ') : remote.t,
      u: remote.u,
      preview: remote.preview || (remote.u && !isGithubUrl(remote.u) ? remote.u : ''),
      repo: remote.repo,
      cover: '',
      media: isArray(remote.media) ? remote.media : [],
      f: remote.f,
      impact: remote.impact,
      role: remote.role,
      sec: remote.sec
    };
    renderProject(buildProject(base, override));
  }

  var api = window.EA_API;
  if (!preview && api && typeof api.getProject === 'function' && api.isEnabled()) {
    api.getProject(requested).then(function (remote) {
      if (remote && !remote.notFound) renderRemote(remote);
      else renderLocal();
    }, renderLocal);
  } else {
    renderLocal();
  }
})();
