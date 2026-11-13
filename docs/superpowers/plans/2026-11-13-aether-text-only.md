# Aether Text-Only Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep Aether as a written assistant while removing its speech input, speech output, voice controls, and bundled MP3s.

**Architecture:** Keep the existing typed command flow in `assets/js/effects.js` and remove browser speech APIs and voice-only UI. Retain the animated bot, written responses, and independent portfolio sound effects.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript; no build system or test runner is configured.

**Spec:** `docs/superpowers/specs/2026-11-13-aether-text-only-design.md`

## Global Constraints

- Preserve Aether's written commands, responses, visual panel, and animation.
- Remove all Aether microphone and speech-synthesis behavior and the MP3 files in `assets/voix/`.
- Keep unrelated portfolio music and sound effects unchanged.
- Do not add dependencies or alter unrelated existing worktree changes.

## Review Focus

- Typed commands and Enter/send still work after microphone removal; smoke-test the panel and one command.
- Aether no longer requests microphone access or emits speech; search for `SpeechRecognition`, `speechSynthesis`, `new Audio`, and `assets/voix` in the relevant implementation.
- Existing portfolio sound controls still work; verify their code remains unchanged and smoke-test the sound toggle.
- The deleted MP3 paths are no longer referenced; search the active source and README.
- Text-only changes remain valid JavaScript and whitespace-clean; run syntax checks and `git diff --check`.

---

### Task 1: Remove Aether voice and retain typed chat

**Files:**
- Modify: `assets/js/effects.js`
- Modify: `assets/css/app.css`
- Modify: `assets/js/ui.js`
- Modify: `assets/js/admin.js`
- Modify: `assets/js/sections.js`
- Modify: `README.md`
- Modify: `docs/ARCHITECTURE.md`
- Modify: `docs/aether-voiceover-script.md`
- Modify: `docs/voix/COMMENT-FAIRE.md`
- Modify: `docs/voix-assets/LISEZ-MOI.txt`
- Delete: all nine `.mp3` files in `assets/voix/`

**Interfaces:**
- Consumes: Existing `go(raw)`, `say(text, cb)`, `window.zeoOpen`, and the Aether panel.
- Produces: Aether's typed input, send button, quick prompts, and written responses, without microphone or speech playback.

- [x] **Step 1: Remove voice-only Aether controls and code**

  In `effects.js`, remove the microphone button/recognition flow, voice toggle/settings/test controls, `speechSynthesis`, MP3 lookup, voice preferences, audio ducking used only for speech, and voice-only commands or status copy. Keep the written input, send button, suggestions, responses, command handling, and tour callback sequence. Update Aether labels and prompts to describe a text assistant. In `app.css`, remove styles used only by the deleted controls and listening/talking states while preserving the bot and text panel. Update the command palette and admin/product labels in `ui.js`, `admin.js`, and `sections.js`.

- [x] **Step 2: Remove bundled MP3 files**

  Delete the nine `.mp3` files under `assets/voix/`; do not remove other portfolio audio assets or the existing user changes in `assets/js/data.js`.

- [x] **Step 3: Update user-facing documentation**

  Update `README.md` and `docs/ARCHITECTURE.md` to describe Aether as text-only and remove setup/use instructions for voice files. Replace the active recording instructions in `docs/aether-voiceover-script.md`, `docs/voix/COMMENT-FAIRE.md`, and `docs/voix-assets/LISEZ-MOI.txt` with brief notices that Aether no longer uses recorded audio.

- [x] **Step 4: Verify syntax, references, and behavior**

  Run `node --check assets\\js\\effects.js`, `node --check assets\\js\\ui.js`, `node --check assets\\js\\admin.js`, and `node --check assets\\js\\sections.js`; expect exit code 0.
  Search active source and README for `SpeechRecognition`, `speechSynthesis`, Aether's `assets/voix` paths, and audio voice controls; expect no live Aether voice feature references.
  Run `git diff --check`; expect no whitespace errors.
  Smoke-test the panel in a browser: open Aether, submit a typed command with both Enter and the send button, and verify written responses; confirm no microphone prompt or speech plays and the portfolio sound toggle still works.
