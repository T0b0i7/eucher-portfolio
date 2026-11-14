/* Back-office — Apparence (P4). Accent, fond, niveau de motion. */
(function () {
  'use strict';
  function byId(id) { return document.getElementById(id); }
  function current() {
    try { var d = JSON.parse(localStorage.getItem('ea_admin_v1') || 'null'); return (d && d.set) || {}; } catch (e) { return {}; }
  }
  function render() {
    var s = current();
    return '<div class="hd"><div><h1>Apparence</h1><p class="sbt">Accent, fond et niveau de motion appliqués aux pages publiques (accueil, galerie, fiches projet).</p></div></div>'
      + '<div class="cd"><h3>Thème</h3>'
      + '<div class="row" style="flex-wrap:wrap;gap:12px;align-items:flex-end">'
      + '<label>Accent<input id="apAccent" type="color" value="' + (s.accent || '#e60012') + '"></label>'
      + '<label>Fond<select id="apBg"><option value="grid"' + (s.bg !== 'plain' && s.bg !== 'aurora' ? ' selected' : '') + '>Grille technique</option><option value="plain"' + (s.bg === 'plain' ? ' selected' : '') + '>Sombre uni</option><option value="aurora"' + (s.bg === 'aurora' ? ' selected' : '') + '>Aurora</option></select></label>'
      + '<label>Motion<select id="apMotion"><option value="full"' + (s.motion !== 'soft' && s.motion !== 'off' ? ' selected' : '') + '>Complète</option><option value="soft"' + (s.motion === 'soft' ? ' selected' : '') + '>Douce</option><option value="off"' + (s.motion === 'off' ? ' selected' : '') + '>Désactivée</option></select></label>'
      + '<button class="bt sm" type="button" data-appearance="save">Enregistrer</button>'
      + '<button class="bt gh sm" type="button" data-appearance="preview">Aperçu</button>'
      + '</div><small style="color:var(--mu);display:block;margin-top:10px">L’aperçu ouvre l’accueil dans un nouvel onglet après enregistrement.</small></div>';
  }
  function save(reload) {
    var patch = {
      accent: (byId('apAccent') || {}).value || '#e60012',
      bg: (byId('apBg') || {}).value || 'grid',
      motion: (byId('apMotion') || {}).value || 'full'
    };
    if (typeof window.EA_ADMIN_SETTINGS === 'function') window.EA_ADMIN_SETTINGS(patch);
    if (typeof window.eaApplyAppearance === 'function') window.eaApplyAppearance();
    if (reload) window.open('index.html', '_blank');
  }
  function bind() {
    var root = byId('ct');
    if (!root || root.__apBound) return;
    root.__apBound = true;
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-appearance]');
      if (!button) return;
      var action = button.getAttribute('data-appearance');
      if (action === 'save') save(false);
      else if (action === 'preview') save(true);
    });
  }
  window.EA_APPEARANCE = { render: render, load: bind };
})();
