/* Back-office — Apparence (P4). Accent, fond, niveau de motion. */
(function () {
  'use strict';
  function byId(id) { return document.getElementById(id); }
  function current() {
    try { var d = JSON.parse(localStorage.getItem('ea_admin_v1') || 'null'); return (d && d.set) || {}; } catch (e) { return {}; }
  }
  function render() {
    var s = current();
    var accent = s.accent || '#e60012';
    var bg = s.bg === 'plain' || s.bg === 'aurora' ? s.bg : 'grid';
    var motion = s.motion === 'soft' || s.motion === 'off' ? s.motion : 'full';
    return '<div class="hd"><div><h1>Thème & Apparence</h1><p class="sbt">Couleur d’accent, arrière-plan et niveau de motion appliqués aux pages publiques.</p></div>'
      + '<div style="display:flex;gap:10px">'
      + '<button class="bt gh" type="button" data-appearance="preview">Aperçu</button>'
      + '<button class="bt" type="button" data-appearance="save">Enregistrer</button>'
      + '</div></div>'
      + '<div class="two" style="grid-template-columns:1.25fr 1fr;gap:20px">'
      + '<div class="cd">'
      + '<h3 style="margin-bottom:16px">Réglages visuels</h3>'
      + '<div style="display:grid;gap:16px">'
      + '<div>'
      + '<label style="display:block;font-size:12px;color:var(--mu);margin-bottom:8px">Couleur d’accent</label>'
      + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">'
      + '<input id="apAccent" type="color" value="' + accent + '" style="width:46px;height:38px;padding:3px;border-radius:8px;border:1px solid var(--card-border);background:#16161c;cursor:pointer">'
      + '<span id="apHex" style="font-family:monospace;font-size:13px;color:#fff;background:#16161c;border:1px solid var(--card-border);padding:6px 12px;border-radius:8px">' + accent + '</span>'
      + '<div style="display:flex;gap:8px;margin-left:auto">'
      + ['#e60012', '#f97316', '#3b82f6', '#22c55e', '#8b5cf6'].map(function (c) {
        return '<button type="button" data-ap-swatch="' + c + '" aria-label="Couleur ' + c + '" style="width:28px;height:28px;border-radius:50%;background:' + c + ';border:2px solid ' + (accent.toLowerCase() === c ? '#fff' : 'transparent') + ';cursor:pointer"></button>';
      }).join('')
      + '</div></div></div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">'
      + '<label style="display:flex;flex-direction:column;gap:6px"><span>Arrière-plan</span><select id="apBg" style="width:100%"><option value="grid"' + (bg === 'grid' ? ' selected' : '') + '>Grille technique</option><option value="plain"' + (bg === 'plain' ? ' selected' : '') + '>Sombre uni</option><option value="aurora"' + (bg === 'aurora' ? ' selected' : '') + '>Aurora</option></select></label>'
      + '<label style="display:flex;flex-direction:column;gap:6px"><span>Niveau de motion</span><select id="apMotion" style="width:100%"><option value="full"' + (motion === 'full' ? ' selected' : '') + '>Complète</option><option value="soft"' + (motion === 'soft' ? ' selected' : '') + '>Douce</option><option value="off"' + (motion === 'off' ? ' selected' : '') + '>Désactivée</option></select></label>'
      + '</div>'
      + '<small style="color:var(--mu)">L’aperçu enregistre vos réglages puis ouvre le portfolio public dans un nouvel onglet.</small>'
      + '</div></div>'
      + '<div class="cd">'
      + '<h3 style="margin-bottom:16px">Aperçu en direct</h3>'
      + '<div id="apPreviewBox" style="border-radius:12px;padding:22px;border:1px solid var(--card-border);background:#0a0a0e;position:relative;overflow:hidden">'
      + '<div style="font-size:11px;text-transform:uppercase;letter-spacing:1.2px;color:var(--mu);margin-bottom:6px">Portfolio Public</div>'
      + '<div style="font-size:20px;font-weight:700;color:#fff;margin-bottom:8px">Eucher <span id="apPrevName" style="color:' + accent + '">ABATTI</span></div>'
      + '<p style="font-size:13px;color:var(--mu);margin-bottom:16px">AI-Augmented & Agentic Software Engineer</p>'
      + '<span id="apPrevBtn" style="display:inline-block;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;color:#fff;background:' + accent + '">Découvrir mes projets →</span>'
      + '</div></div></div>';
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
  function syncPreview() {
    var acc = (byId('apAccent') || {}).value || '#e60012';
    var hex = byId('apHex');
    var name = byId('apPrevName');
    var btn = byId('apPrevBtn');
    if (hex) hex.textContent = acc;
    if (name) name.style.color = acc;
    if (btn) btn.style.background = acc;
  }
  function bind() {
    var root = byId('ct');
    if (!root || root.__apBound) return;
    root.__apBound = true;
    root.addEventListener('input', function (event) {
      if (event.target && event.target.id === 'apAccent') syncPreview();
    });
    root.addEventListener('click', function (event) {
      var swatch = event.target.closest('[data-ap-swatch]');
      if (swatch) {
        var inp = byId('apAccent');
        if (inp) { inp.value = swatch.getAttribute('data-ap-swatch'); syncPreview(); }
        return;
      }
      var button = event.target.closest('[data-appearance]');
      if (!button) return;
      var action = button.getAttribute('data-appearance');
      if (action === 'save') save(false);
      else if (action === 'preview') save(true);
    });
  }
  window.EA_APPEARANCE = { render: render, load: bind };
})();
