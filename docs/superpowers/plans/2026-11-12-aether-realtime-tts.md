# Aether Real-Time TTS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Aether's local MP3/browser speech playback with a Vercel endpoint that prefers ElevenLabs and falls back to Edge TTS.

**Architecture:** `say()` cleans plain text, cancels prior work, and posts `{ text }` to `/api/tts`. The Node.js Serverless Function validates same-origin requests, caps input, applies a shared Upstash per-IP limit, tries ElevenLabs Flash v2.5, and falls back to `msedge-tts` using `fr-FR-HenriNeural`. Both engines return MP3 bytes; failures are explicit and generic.

**Tech Stack:** Node.js 24, Vercel Node.js Serverless Functions, CommonJS, `msedge-tts@2.1.1`, `@upstash/ratelimit@2.2.0`, `@upstash/redis@1.41.0`, Node built-in `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-12-aether-realtime-tts-design.md`

## Global Constraints

- ElevenLabs is attempted first only when both `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` are set.
- The ElevenLabs model is `eleven_flash_v2_5`; the Edge voice is `fr-FR-HenriNeural`.
- `POST /api/tts` accepts `{ "text": "..." }`, returns `audio/mpeg` on success, and emits a generic error body on failure.
- Reject invalid methods, missing or cross-origin `Origin` headers, empty text, and text over 1200 characters.
- Apply an Upstash shared sliding-window rate limit of 30 requests per IP per 10 minutes; fail closed if rate-limit configuration or service is unavailable.
- Never send provider errors, credentials, or stack traces to the browser.
- Do not add a browser `speechSynthesis` fallback or local MP3 lookup to Aether's playback path.
- Quiet messages and voice-disabled mode do not issue synthesis requests.
- Existing audio assets remain untouched.
- Edge TTS is an online best-effort fallback; do not describe it as guaranteed free or unlimited.

## Review Focus

- Provider credentials absent or partial: Edge is attempted, with no credential data exposed.
- ElevenLabs timeout, non-2xx response, or invalid/empty audio: Edge is attempted before failing.
- Edge TTS error or empty stream: return a generic 502, never an empty success.
- Missing Upstash configuration, Redis failure, or missing client IP: deny synthesis rather than bypassing the shared limit.
- Rapid consecutive utterances, voice toggle off, or microphone interruption: abort pending fetch, stop playback, and release the old object URL.

---

### Task 1: Add and test the Vercel TTS endpoint

**Files:**
- Create: `package.json`
- Create: `pnpm-lock.yaml`
- Create: `api/tts.js`
- Create: `api/tts.test.js`
- Create: `.gitignore` (ignore `.env*` while allowing `.env.example`)

**Interfaces:**
- Consumes: Vercel Node handler `(req, res)`, environment variables `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN`.
- Produces: `POST /api/tts` JSON `{ text: string }` -> status 200 and `audio/mpeg` bytes; validation errors use 400/413/415, wrong methods 405, rate limiting 429, and unavailable providers 502/503 with `{ error: { code, message } }`.
- Export a Vercel-compatible CommonJS handler and a testable `createHandler({ elevenLabsSynthesize, edgeSynthesize, rateLimit })` factory. Provider functions accept validated text and return non-empty `Buffer` data.

- [ ] **Step 1: Add failing `node:test` cases in `api/tts.test.js`**

  Assert method, content-type, and origin rejection (including a missing `Origin`); empty, non-string, and >1200-character text rejection; 429 when the shared limiter denies; ElevenLabs-first success with `audio/mpeg`; fallback after missing ElevenLabs configuration, provider rejection, and timeout; and generic 502 when both providers fail.

- [ ] **Step 2: Run the focused tests**

  Run: `node --test api/tts.test.js`
  Expected: FAIL because the API handler is not implemented.

- [ ] **Step 3: Add the minimal package manifest and lockfile**

  Pin `packageManager` to the installed pnpm version. Add exact runtime dependencies `msedge-tts@2.1.1`, `@upstash/ratelimit@2.2.0`, and `@upstash/redis@1.41.0`; add `"test": "node --test"`. Inspect dependency lifecycle scripts before installation; `msedge-tts` declares a pnpm-only preinstall guard. Use pnpm as the Vercel package manager.

- [ ] **Step 4: Implement the handler and provider functions in `api/tts.js`**

  Validate method, JSON content type/body, a required `Origin` matching the request origin (scheme and host), text type/non-emptiness/1200-character maximum, and a verified Vercel client IP. Apply an Upstash sliding window of 30 requests per 10 minutes before provider calls; fail closed on missing IP, missing Upstash env, or limiter errors. Use a bounded timeout for ElevenLabs `POST https://api.elevenlabs.io/v1/text-to-speech/{voiceId}?output_format=mp3_24000_48`, with `xi-api-key`, model `eleven_flash_v2_5`, and the validated text. On missing credentials or any provider/network/audio failure, initialize `MsEdgeTTS`, set `fr-FR-HenriNeural` with `OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3`, consume the stream with a bounded timeout, and combine chunks into a non-empty Buffer. Return bytes only with `Content-Type: audio/mpeg` and `Cache-Control: no-store`; errors are generic JSON and never include upstream details.

- [ ] **Step 5: Run endpoint tests and syntax checks**

  Run: `pnpm test`
  Expected: PASS for all endpoint scenarios without network calls.
  Run: `node --check api/tts.js`
  Expected: exit code 0.

### Task 2: Route Aether playback through `/api/tts`

**Files:**
- Modify: `assets/js/effects.js`
- Create: `assets/js/tts-client.js`
- Create: `assets/js/tts-client.test.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: `POST /api/tts` from Task 1; existing `VOICE`, `quiet`, `say(text, cb, quiet)`, `stopSpeak()`, state animation, and audio ducking.
- Produces: sanitized text posted as JSON; one active `AbortController`, `Audio`, and object URL at a time; playback completion/error calls the existing finish path exactly once.

- [ ] **Step 1: Add failing client tests**

  Test plain-text cleanup removes HTML tags and Markdown syntax while retaining spoken link labels; disabled and quiet calls do not POST; successive utterances abort the earlier request and pause/release its audio; a successful MP3 response creates and plays one audio object; fetch/audio errors finish cleanly without browser speech synthesis. Keep these tests against the isolated client module using injected `fetch`, `Audio`, and URL dependencies.

- [ ] **Step 2: Run focused client tests**

  Run: `node --test assets/js/tts-client.test.js`
  Expected: FAIL for the new client behavior.

- [ ] **Step 3: Add the testable browser client and update `say()` and `stopSpeak()`**

  Implement `assets/js/tts-client.js` as a small browser/CommonJS module so its cleanup, cancellation, fetch, and playback behavior can be unit-tested. Load it before `effects.js` in `index.html`. Remove `h32`, `PACK`, local MP3 lookup, and all `speechSynthesis` use from Aether playback and calm-mode cancellation. Replace the browser voice selector and speed/pitch controls with a concise note that the voice is managed by the server; keep the voice toggle, settings panel, and test-voice button. Remove obsolete `VS`/`ea_zeo_vs` state and browser-voice translations. In `say()`, use a plain-text cleanup helper for HTML/Markdown and delegate enabled, non-quiet speech to the client. Before a new request, abort the prior fetch, pause and clear active Audio, and revoke its object URL. Preserve `onplay`/`onended`, `fin()` idempotence, `duck()`, bubbles, and callback progression. On failures, keep the visible text and end the talk state without claiming audio played.

- [ ] **Step 4: Run client tests and syntax checks**

  Run: `pnpm test`
  Expected: PASS for API and client tests.
  Run: `node --check assets/js/effects.js`
  Expected: exit code 0.
  Search: `rg "speechSynthesis|h32\\(|assets/voix" assets\\js\\effects.js`
  Expected: no matches in Aether playback code.

### Task 3: Document setup and verify the Vercel flow

**Files:**
- Modify: `README.md`
- Modify: `docs/aether-voiceover-script.md`
- Modify: `docs/superpowers/specs/2026-11-11-aether-voice-design.md`
- Create: `.env.example`

**Interfaces:**
- Consumes: Task 1 environment variable names and Task 2 playback behavior.
- Produces: reproducible local Vercel setup and deployment variable checklist.

- [ ] **Step 1: Document the env template and setup**

  Add placeholder-only entries for `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` in `.env.example`. Document creating an Upstash Redis database, adding those values to Vercel Project Settings > Environment Variables, keeping secrets out of Git, installing with pnpm, and running `pnpm exec vercel dev`. Explain that missing/failed ElevenLabs attempts Edge TTS, Edge is best effort rather than guaranteed free/unlimited, and if both engines fail the endpoint returns a generic error.

- [ ] **Step 2: Update voice guide and README**

  Remove obsolete claims that recorded local MP3s are the active playback path; explain that Aether sends cleaned text to the server endpoint and receives synthesized audio, while voice selection is controlled by ElevenLabs environment settings. Update the older design document so it no longer describes the superseded hybrid playback path.

- [ ] **Step 3: Run the full local verification**

  Run: `pnpm test`
  Expected: all tests pass.
  Run: `node --check api/tts.js; node --check assets/js/effects.js`
  Expected: exit code 0 for both.
  Run: `git diff --check`
  Expected: no whitespace errors.
  Run: `pnpm exec vercel dev`
  Expected: the site loads locally; with configured test credentials, `POST /api/tts` returns non-empty bytes and `Content-Type: audio/mpeg`. Verify one ElevenLabs success and one forced ElevenLabs failure that reaches Edge TTS; do not print secret values.
