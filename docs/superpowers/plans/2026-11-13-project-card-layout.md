# Project Card Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep project technology tags fixed inside their cards and enlarge the project carousel cards without losing responsive behavior.

**Architecture:** Make focused changes to the existing carousel rules in `assets/css/app.css` and scope the mouse-parallax selector in `assets/js/data.js` so project stack tags do not move. Place tags in the card-content flow and increase card/image dimensions at desktop and tablet breakpoints while keeping the active card fluid on mobile.

**Tech Stack:** HTML, CSS, existing static-site browser workflow.

**Spec:** Approved conversational design (2026-11-13): all carousel cards become larger, technology tags remain stationary inside each card, and side-card focus styling remains.

## Global Constraints

- Preserve the existing active/previous/next carousel behavior and focus styling.
- Keep technology tags inside card content and prevent them from floating or overlapping the image.
- Keep the active card within the viewport on mobile.
- Keep existing parallax effects for unrelated home elements; project stack tags do not move with the pointer.
- Do not change project content or navigation.

## Review Focus

- All three tags must wrap without escaping the card at 320px; verify at a 320px viewport.
- The technology tags must stay within the card content and not move with the global `.tag` animation or mouse parallax; verify position/animation and inline translation after a pointer move.
- The enlarged active and neighboring cards must remain visible in the carousel at 1024px; verify at a 1024px viewport.
- The active card must remain larger than the dimmed side cards at 1440px; verify at a 1440px viewport.
- The single-card mobile carousel must remain centered and navigable at 768px; verify at a 768px viewport.

---

### Task 1: Adjust project card and tag layout

**Files:**
- Modify: `assets/css/app.css`
- Modify: `assets/js/data.js`

**Interfaces:**
- Consumes: Existing `.project-card`, `.project-card.active`, `.project-card.prev`, `.project-card.next`, `.card-image`, `.card-content`, and `.tags` styles, plus the existing mouse-parallax element query.
- Produces: Larger responsive project cards with technology tags positioned in normal card-content flow.

- [x] **Step 1: Keep project tags stationary**

  Update `.tags` to use static positioning, retain its wrapping layout, and add spacing below it so tags remain inside the card and do not overlap the project title. Keep `.tags .tag` animation and transform disabled. In `assets/js/data.js`, scope the mouse-parallax tag selector to `#home .tag` so project stack tags do not receive inline translations.

- [x] **Step 2: Enlarge cards and preview images at desktop and tablet sizes**

  Set desktop base/active widths to 400px/450px and `card-image` height to 220px. At `max-width: 1200px`, set base/active widths to 340px/400px. Update horizontal margins to half the respective widths and adjust vertical margins as needed. Preserve the active/side transforms, opacity, blur, and focus styling.

- [x] **Step 3: Preserve the mobile layout**

  Keep the mobile active card at `width: 100%`, set `max-width: 450px`, and center it with `left: 50%` plus `translateX(-50%)`; remove the fixed half-width margin so narrower screens do not overflow.

- [x] **Step 4: Verify responsive appearance and stationary tags**

  Inspect the carousel at 320px, 768px, 1024px, and 1440px. Confirm tags remain fixed inside the cards after pointer movement, wrap without horizontal page overflow, the active card remains emphasized, and the cards are visibly larger than before.

  Run: `git diff --check`

  Expected: no whitespace errors; no horizontal page overflow at the listed viewport widths.
