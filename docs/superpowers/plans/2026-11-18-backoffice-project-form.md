# Back-office Project Form Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce the effort to add or edit a project by keeping common fields visible and grouping optional metadata under a collapsed disclosure, while preserving existing project behavior.

**Architecture:** Keep the existing `formM` modal and `pform` data model. Add a field grouping flag to the existing descriptors, render advanced fields in native `<details>`, and improve the shared modal's accessible name and keyboard focus behavior. Use the existing jsdom test setup with a local Supabase stub to exercise the real admin script.

**Tech Stack:** HTML, CSS, JavaScript, Node.js test runner, jsdom.

**Spec:** `docs/superpowers/specs/2026-11-18-backoffice-project-form-design.md`

## Global Constraints

- Keep the existing single-modal workflow.
- Preserve current defaults, validation, stored fields, and public/private project behavior.
- The existing `cat` field remains the main category; `cats` remains the additional taxonomy selection.
- Avoid changing the portfolio's visual identity or adding dependencies.

## Review Focus

- Editing a project with populated optional fields must keep each value visible and editable after expanding advanced options.
- An empty taxonomy cache must retain the current editable fallback and must not drop category or tag values.
- Category and tag checkbox selections must still serialize to arrays; no selections must remain empty.
- Escape and cancel must close the modal and restore focus; successful save must leave focus in the rendered project view.
- The image input and preview data must remain attached to the same `cover` field.

---

### Task 1: Simplify and make the project modal accessible

**Files:**
- Modify: `assets/js/admin.js` — group `pform` fields, expose a collapsed advanced section, and manage modal labeling/focus.
- Modify: `assets/css/admin-reference.css` — style the native disclosure and preserve existing admin visual tokens.
- Create: `tests/admin-project-form.test.mjs` — focused jsdom behavior tests.

**Interfaces:**
- Consumes: Existing `formM(title, fields, values, onSave)`, `pform(id)`, `loadPage`, and the `ea_admin_v1` project document.
- Produces: The same project record shape and save callback behavior; advanced field descriptors use `advanced: true`.

- [x] **Step 1: Write failing tests** in `tests/admin-project-form.test.mjs`:
  - `project creation shows core fields and starts advanced options collapsed`
  - `editing preserves advanced metadata and checkbox-array serialization`
  - Partial and empty taxonomy caches keep stored category and tag values editable and unchanged.
  - Saving with no checked taxonomy options keeps both arrays empty.
  - `project modal is labelled, focuses its first field, closes on Escape, and restores focus`
  - Use the real `admin.js` in jsdom with a stubbed authenticated Supabase client; do not connect to a real account or service.

- [x] **Step 2: Run the focused tests and confirm they fail** because the current modal has no advanced disclosure or focus lifecycle.

  Run: `node --test tests/admin-project-form.test.mjs`
  Expected: FAIL on the missing disclosure and dialog focus behavior.

- [x] **Step 3: Implement progressive disclosure and modal accessibility**:
  - Mark `cats`, `tags`, `featured`, `sort`, `published_at`, `don`, `dl`, `en_d`, and translation as advanced in `pform`.
  - Keep name, description, main category, technologies, project URL, preview, cover, and status visible by default.
  - Render advanced fields in a closed native `<details>` section without changing their `data-k` names or save normalization.
  - Give the modal an accessible name tied to its heading; focus the first field when it opens, keep Tab focus inside, close it on Escape, and restore focus on cancel. After save rerenders the view, focus a stable project-view control.
  - Add styling for the disclosure using existing admin colors, focus indicators, and spacing.

- [x] **Step 4: Run focused tests and confirm they pass.**

  Run: `node --test tests/admin-project-form.test.mjs`
  Expected: PASS for all project form and modal cases.

- [x] **Step 5: Run the full repository test suite and syntax checks.**

  Run: `npm test`
  Expected: all tests pass, including the new project-form tests.

  Run: `node --check assets/js/admin.js`
  Expected: exit code 0.

  Run: `git diff --check`
  Expected: no whitespace errors.
