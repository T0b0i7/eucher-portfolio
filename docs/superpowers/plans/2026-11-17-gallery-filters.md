# Galerie de projets : filtres plus légers — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the gallery's prominent category choices from 12 to the 7 families currently relevant to published projects and shorten the mobile filter panel without deleting taxonomy data.

**Architecture:** Keep `taxonomy.json` as the complete taxonomy source and use its `featured` flags to control the public root-category list. Use a mobile-only disclosure for secondary controls, preserving desktop layout, existing filter requests, and URL behavior.

**Tech Stack:** Static HTML/CSS/ES5 JavaScript, Node.js built-in test runner, jsdom, generated Supabase SQL seed.

**Spec:** `docs/superpowers/specs/2026-11-17-gallery-filters-design.md`

## Global Constraints

- Keep all 40 category families, 254 subcategories, 42 tags, and project associations in the source taxonomy.
- Feature only Développement Web, Développement Mobile, Intelligence artificielle, Agents IA et systèmes agentiques, SaaS et produits logiciels, Design UI/UX, and Cybersécurité in the gallery's root-category filter.
- On mobile, keep search, category, and sort visible; place subcategory, technology, tag, and reset under « Plus de filtres ».
- Hide the subcategory control until a category with subcategories is selected.
- Keep the desktop filter layout and existing search, URL, filtering, and reset behavior.
- Provide generated Supabase seed updates but do not apply them to a remote database.
- Do not modify the existing translation changes in the original checkout.

## Review Focus

- A bookmarked URL selects a category no longer featured; keep that filter visible and applied rather than showing « Toutes » for a filtered result.
- The category changes after a subcategory is selected; clear any subcategory that is no longer a child of the selected category.
- A selected category has no child categories; do not expose an empty subcategory control.
- Taxonomy loading fails or falls back to the static catalog; leave the filters usable and keep subcategory hidden.
- The mobile disclosure opens and closes; keep the controlled region's visibility and `aria-expanded` synchronized.

---

### Task 1: Curate featured gallery categories

**Files:**
- Modify: `assets/data/taxonomy.json`
- Modify: `scripts/build-taxonomy.mjs`
- Modify: `supabase/seed/2026-11-14-taxonomy.sql` (regenerate)
- Modify: `tests/taxonomy.test.mjs`
- Create: `docs/superpowers/specs/2026-11-17-gallery-filters-design.md`
- Create: `docs/superpowers/plans/2026-11-17-gallery-filters.md`

**Interfaces:**
- Consumes: `assets/data/project-taxonomy.json` as the list of categories assigned to published projects.
- Produces: Seven root categories with `featured: true`; all other taxonomy records remain present and available.

- [ ] **Step 1: Write a failing taxonomy test**

Add a test named `taxonomy: only the seven active gallery families are featured`. Assert that the featured root slugs equal:
`web-development`, `mobile-development`, `artificial-intelligence`, `ai-agents-agentic-systems`, `saas-software-products`, `ui-ux-design`, and `cybersecurity`.
Also assert each slug appears in at least one current project's category mapping and the source still contains 40 roots and 254 child categories.

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --test tests/taxonomy.test.mjs`
Expected: FAIL because the source currently features 12 root families.

- [ ] **Step 3: Update the taxonomy source and seed generator**

Set `featured` to true only for the seven specified root slugs in `assets/data/taxonomy.json`. In `scripts/build-taxonomy.mjs`, derive the featured count in the generated SQL header instead of hard-coding `12`. Regenerate the seed with `node scripts/build-taxonomy.mjs`.

- [ ] **Step 4: Verify taxonomy and SQL**

Run: `node --test tests/taxonomy.test.mjs`
Expected: PASS with exactly seven featured roots; all 40 roots and 254 children remain.

Run: `npm run check:sql`
Expected: PASS. Confirm the regenerated seed still updates `featured` on conflict and does not delete taxonomy rows.

- [ ] **Step 5: Commit the taxonomy change**

Stage only this task's files and commit with the required trailer:

```powershell
git add assets/data/taxonomy.json scripts/build-taxonomy.mjs supabase/seed/2026-11-14-taxonomy.sql tests/taxonomy.test.mjs docs/superpowers/specs/2026-11-17-gallery-filters-design.md docs/superpowers/plans/2026-11-17-gallery-filters.md
git commit -m "feat: focus gallery category filters" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

### Task 2: Add mobile progressive disclosure

**Files:**
- Modify: `projects.html`
- Modify: `assets/js/gallery.js`
- Modify: `assets/css/gallery.css`
- Modify: `tests/helpers.mjs`
- Modify: `tests/gallery.test.mjs`

**Interfaces:**
- Consumes: The seven featured roots from Task 1 and the existing `EA_API.listTaxonomies` / `searchProjects` contracts.
- Produces: A mobile « Plus de filtres » button with `aria-expanded` and `aria-controls`; advanced controls contain subcategory, technology, tag, and reset.

- [ ] **Step 1: Add failing gallery tests**

Add tests that assert:
- At a 390 px viewport, « Plus de filtres » starts collapsed, its controlled region is hidden, and clicking it updates both visibility and `aria-expanded`.
- At desktop width, the advanced fields remain visible and the disclosure button is hidden.
- The subcategory field is hidden with no selected category, appears when a selected category has children, clears when the category changes, and stays hidden for a category with no children.
- A URL selecting an unfeatured category retains a visible selected option and still sends that category to the search API.
- Reset clears search, category, subcategory, technology, tag, sort, and URL parameters.
- The existing API-failure fallback keeps the gallery usable and the subcategory field hidden.

Add a `mobile` option to the jsdom helper so tests can configure `matchMedia('(max-width: 560px)')` before `gallery.js` initializes.

- [ ] **Step 2: Run the targeted tests and confirm they fail**

Run: `node --test tests/gallery.test.mjs`
Expected: FAIL on missing disclosure behavior and the always-visible subcategory field.

- [ ] **Step 3: Implement the disclosure and conditional subcategory**

In `projects.html`, group the advanced controls under a button-controlled region. In `gallery.js`, initialize the disclosure from the 560 px breakpoint, keep its state and ARIA attributes synchronized, preserve a selected unfeatured category from an existing URL, and hide/clear subcategory state when it is not valid for the selected category. In `gallery.css`, preserve the current desktop grid and style the mobile disclosure and its visible focus state.

- [ ] **Step 4: Verify focused and full tests**

Run: `node --test tests/gallery.test.mjs`
Expected: PASS for mobile, desktop, URL, reset, and fallback cases.

Run: `npm test`
Expected: PASS for the complete test suite.

- [ ] **Step 5: Verify the rendered gallery**

At 390 × 844, confirm that search, category, and sort are available before expanding « Plus de filtres », and that the first project is visible sooner than before. At desktop width, confirm the existing filter layout is preserved.

- [ ] **Step 6: Commit the mobile filter change**

Stage only this task's five files and commit with the required trailer:

```powershell
git add projects.html assets/js/gallery.js assets/css/gallery.css tests/helpers.mjs tests/gallery.test.mjs
git commit -m "feat: collapse secondary mobile project filters" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```
