# Skills Section Rendering Design

## Intent

Restore the categorized skills section shown in the user's reference image:
red category headings and compact, icon-led skill cards. The current section
instead falls back to a flat list of 12 skills.

## Root Cause

`assets/js/data.js` writes a legacy flat list, then tries to render the
categorized skills immediately. That attempt runs before `E()` is declared in
`assets/js/sections.js`, throws, and is swallowed by a `try/catch`. The later
skills redraw only happens when saved admin data contains skills, so a fresh
load can leave the flat list in place.

## Chosen Approach

Remove the legacy flat-list assignment and the too-early grouped-render attempt
from `assets/js/data.js`. Run the existing `drawSk()` once in `sections.js`
after `applyData()` has loaded any saved skills and after `E()` is available.
This keeps `drawSk()` as the single renderer and preserves admin-managed data.

## Goals and Constraints

- Match the reference: grouped categories, red headings, compact icon cards.
- Preserve the current skills and admin-managed skill data.
- Keep existing colors, typography, and responsive styles.
- Keep the change limited to skills initialization in `data.js` and
  `sections.js`.

## Non-goals

- Changing skill names, categories, or proficiency levels.
- Redesigning the section or changing its copy, animations, or surrounding
  sections.
- Modifying unrelated local changes.

## Acceptance

- A fresh page load displays all skills grouped under their category headings.
- Skill icons and card labels remain visible on desktop and mobile.
- JavaScript syntax and browser rendering checks pass.
