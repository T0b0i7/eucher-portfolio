# Back-office project form simplification

## Intent

Make adding or editing a portfolio project feel quick and focused without losing the existing project data or changing the Supabase schema.

## Goals

- Keep the existing single-modal workflow.
- Put the fields needed for a normal project entry first: name, description, main category, technologies, project URL, preview URL, cover image, and status.
- Collapse optional metadata by default: taxonomy categories, tags, featured/order/date, project donations, English description, and translation.
- Keep all advanced values visible and editable for existing projects.
- Preserve current defaults, validation, stored fields, and public/private project behavior.
- Give the modal a clear accessible name and predictable keyboard focus.
- Avoid changing the portfolio's visual identity or adding dependencies.

## Non-goals

- Redesigning the full admin dashboard or its navigation.
- Changing how projects are stored, categorized, published, or synchronized.
- Adding a multi-step wizard or allowing incomplete drafts through a new quick-add path.

## Approaches considered

1. **One modal with collapsed advanced options (proposed):** preserve the current flow and data model while reducing the initial choices. Lowest behavioral risk.
2. **Two-step wizard:** separates project details from publishing settings, but adds navigation and state to a small workflow.
3. **Quick-add followed by a full editor:** fastest initial entry, but introduces incomplete records and a second save/edit path.

The proposed approach is the smallest change that directly addresses the reported friction while retaining the current editing model.

## Proposed interaction

```text
Nouveau projet
  Nom du projet *
  Description
  Catégorie principale
  Technologies
  Lien du projet
  Lien de preview
  Image de couverture
  Statut
  [Options avancées ▸]
  [Annuler] [Enregistrer]
```

When expanded, advanced options expose the existing taxonomy categories and tags, featured flag, display order, publication date, donations, English description, and translation action. The existing `cat` field remains the main category; `cats` remains the additional taxonomy selection, so old project data and consumers are not silently reinterpreted.

Opening the modal should name it from its heading, move focus into it, keep keyboard focus within the dialog, support Escape to cancel, and return focus to the control that opened it. After saving, focus should move to a stable control in the rendered view.

## Constraints and acceptance checks

- Existing project records open with every field, including advanced values, intact.
- Creating and editing projects retain the current payload shape and validation rules.
- Advanced options start collapsed and can be expanded without losing entered values.
- A keyboard-only pass can open, complete, cancel, and save the modal with a visible, logical focus path.
- Existing project, taxonomy, and admin tests continue to pass.

## Approval

This design is proposed for approval before implementation.
