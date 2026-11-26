/* Sélecteur de langue FR / EN et traductions pour projects.html et project.html */
(function () {
  'use strict';

  var MAP = {
    'Tous les projets — Eucher ABATTI': 'All projects — Eucher ABATTI',
    'Tous les projets publiés d’Eucher ABATTI : filtrez par catégorie, technologie ou tag, et explorez les études de cas.': 'All published projects by Eucher ABATTI: filter by category, technology or tag, and explore case studies.',
    'Détails du projet — Eucher ABATTI': 'Project details — Eucher ABATTI',
    'Détails d’un projet d’Eucher ABATTI, AI-Augmented & Agentic Software Engineer.': 'Project details by Eucher ABATTI, AI-Augmented & Agentic Software Engineer.',
    '← Retour au portfolio': '← Back to portfolio',
    'PORTFOLIO · BIBLIOTHÈQUE': 'PORTFOLIO · LIBRARY',
    'Tous mes projets': 'All my projects',
    'Filtrez, cherchez et explorez l’ensemble des réalisations publiées.': 'Filter, search and explore all published work.',
    'Rechercher': 'Search',
    'Nom, technologie, mot-clé…': 'Name, technology, keyword…',
    'Catégorie': 'Category',
    'Sous-catégorie': 'Subcategory',
    'Technologie': 'Technology',
    'Tag': 'Tag',
    'Toutes': 'All',
    'Tous': 'All',
    'Trier par': 'Sort by',
    'Plus récents': 'Most recent',
    'Dernière mise à jour': 'Last updated',
    'Plus anciens': 'Oldest',
    'Mis en avant': 'Featured',
    'Réinitialiser': 'Reset',
    'Chargement…': 'Loading…',
    'Recherche simple — index de recherche non activé': 'Basic search — search index not enabled',
    'Aucun projet ne correspond à ces filtres.': 'No projects match these filters.',
    'Impossible de charger les projets pour le moment. Réessaie dans un instant.': 'Unable to load projects right now. Please try again in a moment.',
    'Charger plus de projets': 'Load more projects',
    '← Accueil': '← Home',
    'Retour aux projets': 'Back to projects',
    'À propos du projet': 'About the project',
    'Fonctionnalités clés': 'Key features',
    'Repères du projet': 'Project highlights',
    'Aperçu du projet': 'Project preview',
    'PROJET INTROUVABLE': 'PROJECT NOT FOUND',
    'Ce projet n’est pas disponible.': 'This project is not available.',
    'Retour à l’accueil': 'Back to home',
    'Filtrer les projets': 'Filter projects',
    'Informations du projet': 'Project information',
    'Technologies du projet': 'Project technologies'
  };

  var ORIG_TEXT = new WeakMap();
  var LANG = 'fr';
  try {
    var saved = localStorage.getItem('ea_lang');
    LANG = saved === 'en' || saved === 'fr' ? saved : ((navigator.language || 'fr').slice(0, 2).toLowerCase() === 'en' ? 'en' : 'fr');
  } catch (e) {}

  function tr(s) {
    if (LANG !== 'en' || !s) return s;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    if (!m) return s;
    var core = m[2];
    if (MAP[core]) return m[1] + MAP[core] + m[3];
    if (/^(\d+)\s+projets?\s+affiché/i.test(core)) {
      return m[1] + core.replace(/(\d+)\s+projets?\s+affichés?\s+sur\s+(\d+)/i, 'Showing $1 of $2 projects').replace(/(\d+)\s+projet\s+affiché\s+sur\s+(\d+)/i, 'Showing $1 of $2 project') + m[3];
    }
    return s;
  }

  function applyTree(root) {
    if (!root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node, list = [];
    while ((node = w.nextNode())) list.push(node);
    list.forEach(function (n) {
      var p = n.parentNode;
      if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName)) return;
      if (p.closest && p.closest('[data-notr], #projectTitle')) return;
      var v = n.nodeValue;
      var rec = ORIG_TEXT.get(n);
      if (!rec || (v !== rec.cur && v !== rec.fr)) {
        rec = { fr: v, cur: v };
        ORIG_TEXT.set(n, rec);
      }
      var next = LANG === 'en' ? tr(rec.fr) : rec.fr;
      if (next !== v) n.nodeValue = next;
      rec.cur = next;
    });
    if (root.querySelectorAll) {
      root.querySelectorAll('[placeholder],[aria-label]').forEach(function (el) {
        if (el.closest && el.closest('[data-notr]')) return;
        el.__fr = el.__fr || {};
        ['placeholder', 'aria-label'].forEach(function (attr) {
          if (!el.hasAttribute(attr)) return;
          var v = el.getAttribute(attr);
          var rec = el.__fr[attr];
          if (!rec || (v !== rec.cur && v !== rec.fr)) {
            rec = { fr: v, cur: v };
            el.__fr[attr] = rec;
          }
          var next = LANG === 'en' ? tr(rec.fr) : rec.fr;
          if (next !== v) el.setAttribute(attr, next);
          rec.cur = next;
        });
      });
    }
  }

  var T0 = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  var M0 = metaDesc ? metaDesc.content : '';

  function setSubLang(l) {
    LANG = l === 'en' ? 'en' : 'fr';
    window.LANG = LANG;
    try { localStorage.setItem('ea_lang', LANG); } catch (e) {}
    document.documentElement.lang = LANG;
    document.title = LANG === 'en' ? tr(T0) : T0;
    if (metaDesc && M0) metaDesc.content = LANG === 'en' ? tr(M0) : M0;
    applyTree(document.body);
    document.querySelectorAll('.sub-lang button[data-l]').forEach(function (b) {
      var on = b.getAttribute('data-l') === LANG;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    var lv = document.getElementById('subLangLive');
    if (lv) lv.textContent = LANG === 'en' ? 'Language switched to English.' : 'Langue passée en français.';
  }

  function injectSwitcher() {
    var target = document.querySelector('.gl-header') || document.querySelector('.back-btn');
    if (!target || document.querySelector('.sub-lang')) return;
    var style = document.createElement('style');
    style.textContent = '.sub-lang{display:inline-flex;align-items:center;gap:4px;background:#121216;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:3px;margin-left:auto}.sub-lang button{background:none;border:0;color:#a0a0ab;font:700 12px Inter,sans-serif;padding:5px 10px;border-radius:999px;cursor:pointer}.sub-lang button.on{background:#e60012;color:#fff}.sub-lang button:focus-visible{outline:2px solid #fff;outline-offset:2px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}';
    document.head.appendChild(style);
    var box = document.createElement('div');
    box.className = 'sub-lang';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Sélecteur de langue');
    box.setAttribute('data-notr', '1');
    box.innerHTML = '<button type="button" data-l="fr" aria-pressed="true">FR</button><button type="button" data-l="en" aria-pressed="false">EN</button><span id="subLangLive" class="sr-only" aria-live="polite"></span>';
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-l]');
      if (b) setSubLang(b.getAttribute('data-l'));
    });
    if (target.classList.contains('gl-header')) {
      var back = target.querySelector('.gl-back');
      if (back) target.insertBefore(box, back);
      else target.appendChild(box);
    } else {
      var wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px';
      target.parentNode.insertBefore(wrap, target);
      wrap.appendChild(target);
      wrap.appendChild(box);
    }
  }

  function init() {
    injectSwitcher();
    setSubLang(LANG);
    if (typeof MutationObserver === 'function') {
      new MutationObserver(function () {
        if (LANG === 'en') applyTree(document.body);
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
