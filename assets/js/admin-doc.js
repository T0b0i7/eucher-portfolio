/* Assainissement du document publié vers Supabase (P0).
   Le document complet (brouillons, messages, activité, téléphone) reste privé ;
   seule cette projection est publiée dans public.portfolio.
   UMD : window.EA_DOC dans le navigateur, module.exports pour les tests. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EA_DOC = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function toPublicDocument(document) {
    var source = document && typeof document === 'object' ? document : {};
    var pub = {};
    for (var key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      if (key === 'msgs' || key === 'act') continue;
      pub[key] = source[key];
    }
    if (pub.profile && typeof pub.profile === 'object') {
      var profile = {};
      for (var field in pub.profile) {
        if (Object.prototype.hasOwnProperty.call(pub.profile, field) && field !== 'tel') profile[field] = pub.profile[field];
      }
      pub.profile = profile;
    }
    // Seuls les projets publiés sortent du back-office.
    pub.projects = (Array.isArray(source.projects) ? source.projects : []).filter(function (project) {
      return project && project.st === 'Publié';
    });
    return pub;
  }

  return { toPublicDocument: toPublicDocument };
});
