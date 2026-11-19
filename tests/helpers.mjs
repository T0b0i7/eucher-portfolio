// Harnais de test DOM partagé (jsdom) — outils de développement, jamais déployé.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const INDEX_SCRIPTS = [
  'assets/js/config.js',
  'assets/js/api.js',
  'assets/js/catalog.js',
  'assets/js/data.js',
  'assets/js/sections.js',
  'assets/js/remote.js',
  'assets/js/ui.js',
  'assets/js/effects.js'
];

export const PROJECT_SCRIPTS = [
  'assets/js/config.js',
  'assets/js/api.js',
  'assets/js/catalog.js',
  'assets/js/project-details.js'
];

export const GALLERY_SCRIPTS = [
  'assets/js/config.js',
  'assets/js/api.js',
  'assets/js/catalog.js',
  'assets/js/gallery.js'
];

function jsonResponse(body, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => null },
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body))
  });
}

function installStubs(window, opts) {
  const reduced = !!opts.reducedMotion;
  const mobile = !!opts.mobile;
  window.matchMedia = function (query) {
    return {
      matches: (reduced && /prefers-reduced-motion/.test(query)) ||
        (mobile && /max-width:\s*560px/.test(query)),
      media: query,
      addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}
    };
  };
  window.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
  };
  window.fetch = opts.fetch || (() => jsonResponse(null, 503));
  window.scrollTo = function () {};
  window.print = function () {};
  if (window.HTMLDialogElement) {
    window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
    window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  }
  try {
    Object.defineProperty(window.navigator, 'language', { value: 'fr-FR', configurable: true });
  } catch (e) { /* déjà défini */ }
}

/**
 * Charge une page du dépôt et exécute ses scripts comme un navigateur.
 * @param {string} htmlRel chemin relatif (ex. 'index.html')
 * @param {string[]} scriptFiles scripts externes, dans l'ordre de chargement
 * @param {string} url URL simulée (doit inclure la query pour les fiches)
 * @param {{fetch?: Function, seedLocalStorage?: object, reducedMotion?: boolean}} [opts]
 */
export function loadPage(htmlRel, scriptFiles, url, opts = {}) {
  const html = fs.readFileSync(path.join(repoRoot, htmlRel), 'utf8');
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (e) => errors.push('jsdomError: ' + (e && e.message)));

  const dom = new JSDOM(html, {
    url,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse: (window) => installStubs(window, opts)
  });
  const window = dom.window;
  if (opts.seedLocalStorage) {
    window.localStorage.setItem('ea_admin_v1', JSON.stringify(opts.seedLocalStorage));
  }
  window.addEventListener('error', (e) => errors.push('window.error: ' + (e && e.message)));

  window.document.querySelectorAll('script:not([src])').forEach((script) => {
    const type = (script.getAttribute('type') || '').toLowerCase();
    if (type && type !== 'text/javascript' && type !== 'module') return;
    try {
      window.eval(script.textContent);
    } catch (e) {
      errors.push('inline: ' + e.message);
    }
  });

  for (const rel of scriptFiles) {
    try {
      window.eval(fs.readFileSync(path.join(repoRoot, rel), 'utf8'));
    } catch (e) {
      errors.push(rel + ': ' + e.message);
    }
  }

  return {
    window,
    document: window.document,
    errors,
    close() { window.close(); }
  };
}

export { jsonResponse };
