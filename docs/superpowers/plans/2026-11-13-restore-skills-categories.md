# Restore Skills Categories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the categorized skill cards shown in the user's reference image.

**Architecture:** Keep `drawSk()` in `assets/js/data.js` as the sole renderer. Remove the legacy flat markup and its premature call from `data.js`, then render once from `sections.js` after `E()` and saved-data application are available.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript; browser smoke test.

**Spec:** `docs/superpowers/specs/2026-11-13-skills-section-rendering-design.md`

## Global Constraints

- Preserve current skill names, categories, and admin-managed skill data.
- Keep existing colors, typography, and responsive styles.
- Limit the code change to skills initialization in `data.js` and `sections.js`.

## Review Focus

- Script order: `sections.js` must not replace the grouped output from `data.js`; verify category headings render after a fresh load.
- Skill data: all active skills must remain grouped; compare rendered cards and headings against the data passed to `drawSk()`.
- Responsive layout: cards remain compact and visible on desktop and mobile; inspect both viewport sizes.

---

### Task 1: Keep the categorized skills renderer

**Files:**
- Modify: `assets/js/data.js` (remove the legacy flat-list assignment and premature render call)
- Modify: `assets/js/sections.js` (render skills after applying saved data)

**Interfaces:**
- Consumes: `drawSk()`, `reveal()`, and skill data in `assets/js/data.js`.
- Produces: A skills section with the existing category headings and icon cards, including admin-managed skills.

- [x] **Step 1: Move skill rendering after initialization**

  Remove the direct legacy `#sk.innerHTML = S.map(...)` and the grouped-render call wrapped in `try/catch` in `data.js`. Move the render and reveal call to after `applyData()` in `sections.js`, and keep `drawSk()` as the only skills renderer.

- [x] **Step 2: Verify the rendered section**

  Open the current local page in a fresh browser context. Confirm category headings and icon cards appear, the flat 12-item list does not replace them, and the cards stay readable at desktop and mobile widths.

- [x] **Step 3: Run syntax and whitespace checks**

  Run `node --check assets\\js\\sections.js` and `git diff --check`; both must pass.
