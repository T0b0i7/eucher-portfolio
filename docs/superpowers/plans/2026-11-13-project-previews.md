# Project Covers and Previews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add live-preview links for seven deployed projects, let the user upload one cover image per project, preserve Savekari unchanged, and remove Victoria's project entry.

**Architecture:** Add a dedicated `preview` property beside the existing project/repository URL and cover in admin data, with an idempotent migration for saved projects. Reuse the existing cover upload, increasing its maximum dimension to 1280 pixels and optimizing the stored image. Render uploaded covers and a separate safe preview link on project cards while preserving the existing details modal.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js syntax checks, and existing browser tools. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-13-project-previews-design.md`

## Global Constraints

- Support one user-uploaded cover per project; do not generate or add cover images.
- Resize uploaded covers to a maximum dimension of 1280 pixels and optimize them for storage.
- Store live preview URLs in a dedicated `preview` field; preserve each existing `u` project/repository URL.
- Add preview defaults only when saved values are empty, except set Cauris to its user-specified URL.
- Leave Savekari Beauty and its project data unchanged.
- Remove Victoria Ahouéfa Camillia from admin and public project lists; do not alter its GitHub repository.
- Preserve the `Voir le projet` detail action and do not label a repository URL as a live preview.
- Add no dependencies.

## Review Focus

- Existing saved data: migration is idempotent and preserves nonempty custom covers and previews. Test with an older saved-project fixture.
- Link behavior: a preview click opens the expected URL in a new tab and is not intercepted by the card's detail handler. Test the preview and detail actions independently.
- Missing and invalid media: an absent or failed cover uses the existing mock without a broken-image icon; a project without a preview has no preview action.
- Preview URL input: reject non-HTTP(S) URLs and escape values used in markup. Test that `javascript:` produces no preview action.
- Project exceptions: Savekari stays unchanged; Victoria is absent from both public cards and admin data, while its external repository remains untouched.
- Responsive/accessibility behavior: uploaded covers crop consistently, have project-name alt text, and remain usable at 375px and 1440px widths.

---

### Task 1: Add preview data and migrate saved projects

**Files:**
- Modify: `assets/js/admin.js` (project seeds, edit form, and saved-data migration)
- Modify: `assets/js/sections.js` (public project mapping)

**Interfaces:**
- Consumes: the seven preview URLs listed in the design spec.
- Produces: project records with separate `u`, `preview`, and `cover` values.
- `u` remains the existing project/repository URL; `preview` contains only a live demo URL.

- [x] **Step 1: Add explicit preview defaults**

  Add the seven approved `preview` URLs to the project seed data. Keep each existing `u` value unchanged. Set Cauris to the exact URL supplied by the user. Remove Victoria from the new-install project seeds.

- [x] **Step 2: Add the preview field to project editing**

  Add a `Lien de preview` text field bound to `preview` in `pform()`. Keep the existing `Lien du projet` field bound to `u`.

- [x] **Step 3: Migrate existing saved project records**

  Add an idempotent `projectMediaV` migration in `load()`. On its first run, remove the Victoria entry, fill eligible projects' empty `preview` values from the approved defaults, set Cauris's `preview` to the exact URL supplied by the user, preserve each existing `u` and all cover values, leave Savekari untouched, set `projectMediaV` to `1`, and call the existing `save()`.

- [x] **Step 4: Pass the preview URL through public project mapping**

  In `applyData()`, include `preview` in each mapped project while retaining `cover` and `u`. Keep the preview defaults available to public rendering before the lazy-loaded admin migration runs, and exclude Victoria from the public mapping.

- [x] **Step 5: Verify seed and migration behavior**

  In an isolated local browser profile, verify the seven default preview URLs, confirm Victoria is removed and Savekari is unchanged, and load a fixture with custom nonempty `u`, `preview`, and `cover` values to confirm the migration preserves them.

---

### Task 2: Display uploaded covers and preview actions

**Files:**
- Modify: `assets/js/admin.js` (cover upload resizing and encoding)
- Modify: `assets/js/data.js` (active project-card renderer and delegated detail action handler)
- Modify: `assets/js/sections.js` (remove the URL validator now shared by the renderer)
- Modify: `assets/css/app.css` (cover image and preview action layout)
- Modify: `assets/js/effects.js` (English label translation)

**Interfaces:**
- Consumes: `P[].cover` and `P[].preview` populated by Task 1.
- Produces: cards with an accessible image, a conditional `Voir l’aperçu` link, and the unchanged `Voir le projet` detail action.

- [x] **Step 1: Improve cover upload resolution**

  Replace the existing 160-pixel resize limit with a 1280-pixel maximum dimension. Encode the canvas as WebP at quality `0.82`, falling back to PNG if the browser does not support WebP. Preserve the existing single-file upload and form preview behavior.

- [x] **Step 2: Render uploaded covers with a safe fallback**

  Update the active project-card renderer in `data.js` to use the uploaded `cover` image inside `.shot`, with the project name as `alt` text and `object-fit: cover`. Keep the existing mock preview when no cover is set or an image fails to load.

- [x] **Step 3: Add the external preview action**

  Render `Voir l’aperçu` only for a valid HTTP(S) `preview` URL, escape the URL before putting it in markup, and use `target="_blank"` and `rel="noopener"`. The delegated click handler in `data.js` must ignore the preview anchor. Keep `Voir le projet` opening the detail modal. Add the English translation `View preview`.

- [x] **Step 4: Style and verify project cards**

  Keep the image ratio at 16:9 and adapt the action layout to the existing responsive card styles.

  In a local browser, verify:
  - each of the seven eligible projects has the matching preview URL and opens it in a new tab;
  - a `javascript:` preview value produces no preview action;
  - an uploaded cover appears on the card, is cropped consistently, and has the project name as alt text;
  - missing or failed covers use the existing mock without a broken-image icon;
  - clicking a preview does not open the details modal, while `Voir le projet` still does;
  - Savekari remains unchanged and has no live-preview action;
  - Victoria appears in neither public cards nor admin project data;
  - the console has no errors or warnings at 375px and 1440px.

  Browser checks confirmed 16:9 covers/actions at 375px and 1440px, eight public cards with seven default previews, no Victoria card, and no Savekari preview action. A regression with old saved data was reproduced before the fix; the public fallback now handles it before the lazy-loaded admin migration runs. Console checks at 375px and 1440px reported no errors or warnings. External navigation was blocked by the test environment; `target="_blank"` and `rel="noopener noreferrer"` were inspected. The upload fixture verified 1280×640 WebP output and the broken-cover fallback.

- [x] **Step 5: Run final source checks**

  Run `node --check assets\js\admin.js`, `node --check assets\js\sections.js`, `node --check assets\js\data.js`, `node --check assets\js\effects.js`, and `git diff --check`; all must pass.
