/* Couche de lecture publique des projets (P0).
   UMD : window.EA_API dans le navigateur, module.exports pour les tests Node.
   Aucun secret supplémentaire : uniquement la clé publishable Supabase déjà
   présente dans la page. ES5, sans dépendance. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    var cfg = root.EA_SUPABASE;
    root.EA_API = (cfg && cfg.url && cfg.key)
      ? api.createApi({ url: cfg.url, key: cfg.key })
      : api.createApi({});
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DEFAULT_ORDER = 'featured.desc,sort_order.asc,published_at.desc';
  var ORDERS = {
    recent: 'published_at.desc',
    updated: 'updated_at.desc',
    oldest: 'published_at.asc',
    alpha: 'title.asc',
    featured: DEFAULT_ORDER
  };
  var BASE_SELECT = [
    'id', 'slug', 'title', 'short_desc', 'long_desc', 'status', 'featured', 'sort_order',
    'role', 'sector', 'demo_url', 'repo_url', 'demo_visible', 'repo_visible',
    'published_at', 'updated_at', 'impact', 'features',
    'portfolio_project_categories(portfolio_categories(slug,name))',
    'portfolio_project_tags(portfolio_tags(slug,name))',
    'portfolio_project_technologies(portfolio_technologies(slug,name,icon))',
    'portfolio_media(url,storage_path,alt,caption,kind,sort_order)'
  ].join(',');

  function createApi(config) {
    var cfg = config || {};
    var base = String(cfg.url || '').replace(/\/+$/, '') + '/rest/v1';
    var key = String(cfg.key || '');
    var fetchImpl = cfg.fetchImpl || (typeof fetch === 'function' ? fetch : null);
    var timeoutMs = cfg.timeoutMs || 8000;

    function isEnabled() {
      return !!(cfg.url && cfg.key && fetchImpl);
    }

    function headers(extra) {
      var result = { apikey: key, Authorization: 'Bearer ' + key, Accept: 'application/json' };
      if (extra) {
        for (var name in extra) {
          if (Object.prototype.hasOwnProperty.call(extra, name)) result[name] = extra[name];
        }
      }
      return result;
    }

    function request(path, params, extraHeaders) {
      if (!isEnabled()) return Promise.resolve(null);
      var query = [];
      for (var name in params) {
        if (!Object.prototype.hasOwnProperty.call(params, name)) continue;
        var value = params[name];
        if (value === null || value === undefined || value === '') continue;
        query.push(encodeURIComponent(name) + '=' + encodeURIComponent(String(value)));
      }
      var url = base + path + (query.length ? '?' + query.join('&') : '');
      var options = { method: 'GET', headers: headers(extraHeaders) };
      var controller = null;
      var timer = null;
      if (typeof AbortController !== 'undefined') {
        controller = new AbortController();
        options.signal = controller.signal;
      }
      var pending = new Promise(function (resolve, reject) {
        if (timer === null && controller) {
          timer = setTimeout(function () { controller.abort(); }, timeoutMs);
        }
        fetchImpl(url, options).then(resolve, reject);
      });
      return pending.then(function (response) {
        if (!response || !response.ok) return null;
        return response.json().then(function (body) {
          return { body: body, headers: response.headers };
        });
      }).catch(function () {
        return null;
      }).then(function (result) {
        if (timer) { clearTimeout(timer); timer = null; }
        return result;
      });
    }

    function parseTotal(headers, fallback) {
      try {
        var raw = headers && headers.get ? headers.get('content-range') : null;
        if (!raw) return fallback;
        var match = /^(?:(\d+)-(\d+)|\*)\/(\d+|\*)$/.exec(String(raw).trim());
        if (!match) return fallback;
        return match[3] === '*' ? fallback : Number(match[3]);
      } catch (e) {
        return fallback;
      }
    }

    function safeSlug(value) {
      return String(value == null ? '' : value).trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    }

    function safeQuery(value) {
      return String(value == null ? '' : value).replace(/[(),*%=\\]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function mapTaxonomy(row) {
      return row ? { slug: row.slug, name: row.name, icon: row.icon || null } : null;
    }

    function mapProject(row) {
      if (!row) return null;
      var categories = (row.portfolio_project_categories || []).map(function (link) {
        return mapTaxonomy(link && link.portfolio_categories);
      }).filter(Boolean);
      var tags = (row.portfolio_project_tags || []).map(function (link) {
        return mapTaxonomy(link && link.portfolio_tags);
      }).filter(Boolean);
      var technologies = (row.portfolio_project_technologies || []).map(function (link) {
        return mapTaxonomy(link && link.portfolio_technologies);
      }).filter(Boolean);
      var media = (row.portfolio_media || []).slice().sort(function (a, b) {
        return (a && a.sort_order ? a.sort_order : 0) - (b && b.sort_order ? b.sort_order : 0);
      }).map(function (item) {
        return {
          url: item.url || item.storage_path || '',
          alt: item.alt || '',
          caption: item.caption || '',
          kind: item.kind || 'gallery',
          sort_order: item.sort_order || 0
        };
      });
      return {
        id: row.id,
        slug: row.slug,
        n: row.title,
        d: row.short_desc || '',
        long: row.long_desc || '',
        cat: categories.length ? categories[0].name : '',
        categories: categories,
        tags: tags,
        sec: row.sector || '',
        role: row.role || '',
        st: row.status,
        featured: !!row.featured,
        sort_order: row.sort_order || 0,
        t: technologies.map(function (tech) { return tech.name; }),
        technologies: technologies,
        u: row.demo_url || '',
        repo: row.repo_url || '',
        demo_visible: row.demo_visible !== false,
        repo_visible: !!row.repo_visible,
        published_at: row.published_at || null,
        updated_at: row.updated_at || null,
        impact: Array.isArray(row.impact) ? row.impact : [],
        f: Array.isArray(row.features) ? row.features : [],
        media: media,
        source: 'api'
      };
    }

    function listProjects(options) {
      var opts = options || {};
      var page = Math.max(1, parseInt(opts.page, 10) || 1);
      var perPage = Math.min(48, Math.max(1, parseInt(opts.perPage, 10) || 12));
      var categories = (opts.categories || []).map(safeSlug).filter(Boolean);
      var technologies = (opts.technologies || []).map(safeSlug).filter(Boolean);
      var tags = (opts.tags || []).map(safeSlug).filter(Boolean);
      var select = BASE_SELECT;
      if (categories.length) select = select.replace('portfolio_project_categories(', 'portfolio_project_categories!inner(');
      if (technologies.length) select = select.replace('portfolio_project_technologies(', 'portfolio_project_technologies!inner(');
      if (tags.length) select = select.replace('portfolio_project_tags(', 'portfolio_project_tags!inner(');

      var params = {
        select: select,
        status: 'eq.published',
        order: ORDERS[opts.sort] || DEFAULT_ORDER,
        limit: perPage,
        offset: (page - 1) * perPage
      };
      if (opts.featured === true) params.featured = 'eq.true';
      var term = safeQuery(opts.q);
      if (term) {
        params.or = '(title.ilike.*' + term + '*,short_desc.ilike.*' + term + '*)';
      }
      if (categories.length) params['portfolio_project_categories.portfolio_categories.slug'] = 'in.(' + categories.join(',') + ')';
      if (technologies.length) params['portfolio_project_technologies.portfolio_technologies.slug'] = 'in.(' + technologies.join(',') + ')';
      if (tags.length) params['portfolio_project_tags.portfolio_tags.slug'] = 'in.(' + tags.join(',') + ')';

      return request('/portfolio_projects', params, { Prefer: 'count=exact' }).then(function (result) {
        if (!result || !Array.isArray(result.body)) return null;
        var items = result.body.map(mapProject).filter(Boolean);
        var total = parseTotal(result.headers, (page - 1) * perPage + items.length);
        return {
          items: items,
          total: total,
          hasMore: (page - 1) * perPage + items.length < total,
          source: 'api'
        };
      });
    }

    function getProject(slug) {
      if (!slug) return Promise.resolve({ notFound: true });
      return request('/portfolio_projects', {
        select: BASE_SELECT,
        status: 'eq.published',
        slug: 'eq.' + String(slug).trim(),
        limit: 1
      }).then(function (result) {
        if (!result || !Array.isArray(result.body)) return null;
        if (!result.body.length) return { notFound: true };
        return mapProject(result.body[0]);
      });
    }

    function listTaxonomies() {
      return Promise.all([
        request('/portfolio_categories', { select: 'slug,name', enabled: 'eq.true', order: 'sort_order.asc,name.asc' }),
        request('/portfolio_tags', { select: 'slug,name', order: 'name.asc' }),
        request('/portfolio_technologies', { select: 'slug,name,icon', order: 'name.asc' })
      ]).then(function (results) {
        var out = { categories: [], tags: [], technologies: [] };
        if (results[0] && Array.isArray(results[0].body)) out.categories = results[0].body;
        if (results[1] && Array.isArray(results[1].body)) out.tags = results[1].body;
        if (results[2] && Array.isArray(results[2].body)) out.technologies = results[2].body;
        return out;
      });
    }

    return {
      isEnabled: isEnabled,
      listProjects: listProjects,
      getProject: getProject,
      listTaxonomies: listTaxonomies
    };
  }

  return { createApi: createApi };
});
