# Project Covers and Previews Design

## Intent

Let portfolio visitors see one cover image for each project and open deployed
projects directly from their cards. The user will upload the cover images
through the existing admin form.

## Current State

- Project cards render generated SVG mockups instead of their saved `cover`.
- The admin form stores a cover and a general project URL (`u`), but those URLs
  mix deployed sites and GitHub repositories. The public card renderer does not
  use covers or expose a distinct live-preview URL.
- The admin cover upload currently shrinks images to a maximum of 160 pixels,
  which is too small for project-card covers.
- The seeded list has live URLs for six projects; Cauris Group International
  now has a live preview URL supplied by the user.
- Savekari Beauty remains unchanged for now. Its existing GitHub link is not
  presented as a live preview.
- The user asked to remove Victoria Ahouéfa Camillia from the portfolio and
  confirmed its project entry should also be removed from administration.

## Goals

- Support one user-uploaded cover image per project through the existing admin
  field, resized to a maximum dimension of 1280 pixels and optimized for
  storage.
- Add a direct `Voir l’aperçu` link to each project with a live preview; open
  it in a new tab with safe link attributes.
- Add a dedicated `preview` field to project records and the admin form. Keep
  the existing `u` project/repository URL unchanged.
- Preserve the existing `Voir le projet` details flow.
- Remove Victoria Ahouéfa Camillia from the public and admin project lists,
  including existing saved portfolio data, without changing its external
  GitHub repository.
- Preserve the existing admin cover and project URL fields.

## Explicit Scope Decisions

- Support one user-uploaded cover for each project through the admin form.
- Use these live preview URLs:
  - Akouè App: `https://akoue-app.vercel.app`
  - NaviGarde IA: `https://t0b0i7.github.io/NaviGarde_IA/`
  - Clavis: `https://clavis-azure.vercel.app`
  - Havre: `https://havre-olive.vercel.app`
  - Cauris Group International:
    `https://t0b0i7.github.io/cauris-group-international-site-web-corporate/`
  - Portefolio.OS: `https://portefolio-os-bice.vercel.app`
  - Vigilance BJ: `https://vigilance-bj.vercel.app`
- Populate the new `preview` field for these projects without overwriting their
  existing `u` values.
- Leave Savekari Beauty exactly as it is until a live preview is available.
  Keep its existing GitHub URL in `u`, leave `preview` empty, and leave its
  cover unchanged. It is a temporary exception to the cover-and-live-preview
  goal.
- Remove Victoria's public and admin entries, including the saved project
  record; do not alter its source repository.

## Approaches Considered

1. **Live-preview links and user-uploaded covers (chosen):** link only to
   deployed sites, and let the user upload one cover per project through the
   existing admin form. This avoids invented images and mislabeled repository
   links while reusing the existing workflow.
2. **Captured screenshots:** automatically use each live site as its cover,
   but the user wants to choose and add the covers themselves.
3. **Generated covers:** fills cards without user uploads, but does not use the
   project's actual cover image and is not the user's preference.

## UI and Data Behavior

- Each card displays its uploaded cover with a consistent 16:9 crop.
- Until the user uploads a cover, retain the existing mock preview without a
  broken-image state.
- The preview link is a separate, clearly labeled action; it does not replace
  the detail modal.
- Only `preview` powers the live-preview action; a GitHub URL in `u` is never
  mislabeled as a demo.
- Show the preview action only for HTTP(S) URLs and escape values used in
  markup.
- The image uses the project's name as alternative text.
- Existing saved project records receive preview URLs only when those fields
  are empty; existing user covers and other values are preserved.
- The explicitly supplied Cauris preview URL takes precedence for Cauris's
  `preview` field; its existing `u` repository URL remains unchanged.
- Savekari retains its current visual and link behavior until the user supplies
  a live preview.

## Non-goals

- Deploying or modifying the projects themselves.
- Treating a GitHub repository as a live preview.
- Changing Savekari Beauty or deleting any external repository.
- Redesigning unrelated portfolio sections or changing the admin workflow.

## Acceptance Criteria

- Each of the seven deployed projects has a dedicated `preview` URL and can
  display one user-uploaded cover at sufficient resolution.
- Each of those cards opens the matching live preview in a new tab, without
  changing the project's existing `u` URL.
- The details action still opens the existing project detail view.
- Victoria no longer appears in the public project cards or admin project list.
- Savekari remains unchanged.
- Project cards remain readable and functional on desktop and mobile, with no
  broken images or browser console errors. The admin accepts a single cover
  image per project, scales it to at most 1280 pixels, and stores an optimized
  image.
