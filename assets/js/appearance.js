/* P4 — apparence configurable : applique accent, fond et niveau de motion
   depuis le document admin local (ea_admin_v1.set). */
(function () {
  'use strict';
  function settings() {
    try { var d = JSON.parse(localStorage.getItem('ea_admin_v1') || 'null'); return (d && d.set) || {}; } catch (e) { return {}; }
  }
  function apply() {
    var s = settings();
    var root = document.documentElement;
    if (s.accent) root.style.setProperty('--ac', s.accent);
    root.setAttribute('data-bg', s.bg || 'grid');
    root.setAttribute('data-motion', s.motion || 'full');
  }
  apply();
  window.eaApplyAppearance = apply;
})();
