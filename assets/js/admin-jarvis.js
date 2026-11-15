/* P9 — Interface JARVIS (admin) : conversation, actions, historique,
   confirmations et annulation. Appelle l'Edge Function `jarvis`. */
(function () {
  'use strict';
  var KEY = 'ea_jarvis_history_v1';
  var state = { busy: false, controller: null, history: [] };
  function sb() { return window.SB || null; }
  function byId(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function loadHistory() {
    try { state.history = JSON.parse(localStorage.getItem(KEY) || '[]').slice(-30); } catch (e) { state.history = []; }
  }
  function saveHistory() {
    try { localStorage.setItem(KEY, JSON.stringify(state.history.slice(-30))); } catch (e) {}
  }
  function render() {
    loadHistory();
    return '<div class="hd"><div><h1>JARVIS</h1><p class="sbt">Agent personnel : interroge le catalogue GitHub, prépare des fiches, analyse tes dépôts. Aucune publication sans confirmation.</p></div><button class="bt gh sm" type="button" data-jarvis="clear">Effacer l’historique</button></div>'
      + '<div class="cd" style="display:flex;flex-direction:column;height:min(62vh,640px);padding:0;overflow:hidden">'
      + '<div id="jvLog" style="flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:radial-gradient(circle at 10% 0,rgba(230,0,18,.12),transparent 55%)"></div>'
      + '<div style="display:flex;gap:8px;padding:12px;border-top:1px solid var(--ln);background:#0a0a0a">'
      + '<input id="jvInput" placeholder="Ex. Montre-moi mes projets React Native non publiés…" style="flex:1;min-height:44px;background:#070707;border:2px solid #333;color:#fff;padding:10px 12px" autocomplete="off">'
      + '<button class="bt" type="button" data-jarvis="send" style="min-height:44px">Envoyer</button>'
      + '<button class="bt gh" type="button" data-jarvis="cancel" style="min-height:44px">Stop</button>'
      + '</div></div>'
      + '<div class="row" style="flex-wrap:wrap;gap:8px;margin-top:10px">'
      + '<button class="bt gh sm" type="button" data-jarvis="quick" data-q="Montre-moi tous mes dépôts non publiés.">Dépôts non publiés</button>'
      + '<button class="bt gh sm" type="button" data-jarvis="quick" data-q="Analyse mes dépôts GitHub et propose ceux à ajouter au portfolio.">Audit du catalogue</button>'
      + '<button class="bt gh sm" type="button" data-jarvis="quick" data-q="Prépare une fiche portfolio pour le dépôt T0b0i7/savekari-beauty.">Préparer une fiche</button>'
      + '</div>';
  }
  function bubble(role, text, extra) {
    var colors = { user: 'var(--ac, #e60012)', jarvis: '#222', error: '#7f1d1d', tool: '#1e293b' };
    var align = role === 'user' ? 'flex-end' : 'flex-start';
    var bg = colors[role] || '#222';
    return '<div style="display:flex;justify-content:' + align + '"><div style="max-width:85%;background:' + bg + ';border:1px solid #333;padding:10px 12px;border-radius:8px;white-space:pre-wrap;line-height:1.55;font-size:13px">'
      + '<b style="display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:4px">' + (role === 'user' ? 'Vous' : role === 'error' ? 'Erreur' : role === 'tool' ? 'Outil' : 'JARVIS') + '</b>'
      + esc(text) + (extra ? '<div style="margin-top:8px;color:#9ca3af;font-size:11px">' + esc(extra) + '</div>' : '') + '</div></div>';
  }
  function paint() {
    var log = byId('jvLog');
    if (!log) return;
    log.innerHTML = state.history.length ? state.history.map(function (m) { return bubble(m.role, m.text, m.extra); }).join('') : '<small style="color:var(--mu)">Pose une question ou utilise une action rapide. JARVIS s’appuie sur le catalogue GitHub synchronisé.</small>';
    log.scrollTop = log.scrollHeight;
  }
  async function callJarvis(body, signal) {
    var client = sb();
    var session = await client.auth.getSession();
    var token = session && session.data && session.data.session && session.data.session.access_token;
    if (!token) throw new Error('Session expirée — reconnecte-toi.');
    var url = String((window.EA_SUPABASE || {}).url || '').replace(/\/$/, '') + '/functions/v1/jarvis';
    var res = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: signal });
    var data = await res.json().catch(function () { return {}; });
    if (!res.ok) throw new Error(data.error || ('HTTP ' + res.status) + (data.detail ? ' — ' + data.detail : ''));
    return data;
  }
  async function send(text) {
    text = String(text || '').trim();
    if (!text || state.busy) return;
    state.busy = true;
    state.controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    state.history.push({ role: 'user', text: text });
    if (byId('jvInput')) byId('jvInput').value = '';
    paint();
    try {
      var data;
      if (text.indexOf('/tool ') === 0) {
        var parts = text.slice(6).split(' ');
        var payload = {};
        try { payload = parts.slice(1).join(' ') ? JSON.parse(parts.slice(1).join(' ')) : {}; } catch (e) { payload = {}; }
        data = await callJarvis({ tool: parts[0], args: payload }, state.controller && state.controller.signal);
        state.history.push({ role: 'tool', text: JSON.stringify(data.result || data).slice(0, 4000) });
      } else {
        data = await callJarvis({ message: text }, state.controller && state.controller.signal);
        state.history.push({ role: 'jarvis', text: data.answer || '(réponse vide)', extra: (data.actions || []).map(function (a) { return a.tool + ' · ' + a.result_summary; }).join('\n') });
      }
    } catch (error) {
      var msg = String(error && error.message || error);
      if (/abort/i.test(msg)) msg = 'Opération annulée.';
      state.history.push({ role: 'error', text: msg });
    } finally {
      state.busy = false;
      state.controller = null;
      saveHistory();
      paint();
    }
  }
  function bind() {
    var root = byId('ct');
    if (!root || root.__jvBound) return;
    root.__jvBound = true;
    root.addEventListener('click', function (event) {
      var b = event.target.closest('[data-jarvis]');
      if (!b) return;
      var action = b.getAttribute('data-jarvis');
      if (action === 'send') send((byId('jvInput') || {}).value);
      else if (action === 'cancel') { if (state.controller) state.controller.abort(); }
      else if (action === 'clear') { state.history = []; saveHistory(); paint(); }
      else if (action === 'quick') send(b.getAttribute('data-q'));
    });
    var input = byId('jvInput');
    if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); send(input.value); } });
    paint();
  }
  window.EA_JARVIS = { render: render, load: bind };
})();
