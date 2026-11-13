# Aether real-time TTS design

## Intent

Replace local MP3 lookup and browser speech synthesis with server-generated
French audio. Keep ElevenLabs as the preferred voice and use Edge TTS as a
best-effort fallback when ElevenLabs is unavailable or rejects a request.

## Approaches

- **ElevenLabs only**: simplest provider setup, but no speech when the API key,
  quota, or service is unavailable.
- **ElevenLabs with Edge TTS fallback (selected)**: preserves the custom voice
  when available and attempts a second provider otherwise. Edge TTS depends on
  an online service and does not guarantee unlimited or free availability.
- **Browser speech synthesis**: avoids a server endpoint but has device-specific
  voices and does not provide the requested consistent voice.

## Contract

- The browser sends `POST /api/tts` with JSON `{ "text": "..." }`.
- The request must include an `Origin` matching the request host, contain plain
  text, and remain within a bounded length. Missing or mismatched origins are
  rejected, as are invalid methods and payloads.
- Successful requests return an MP3 byte stream with `Content-Type: audio/mpeg`.
- Provider failures return a generic error response; internal details and
  credentials are never sent to the browser.
- The client aborts an in-flight request and stops current playback before
  starting a newer utterance. Quiet messages and disabled voice do not call TTS.

## Provider and abuse controls

- Use ElevenLabs first when both `ELEVENLABS_API_KEY` and
  `ELEVENLABS_VOICE_ID` are configured. Prefer a low-latency multilingual
  model. Fall back on missing configuration, provider errors, and timeouts.
- Use `fr-FR-HenriNeural` through an Edge TTS Node package as the fallback.
- Apply a shared per-IP rate limit using a hosted Redis-compatible store, plus
  strict text length limits. This protects the public endpoint from basic abuse;
  it does not guarantee provider quotas or prevent all automated traffic.
- Keep provider credentials and rate-limit credentials only in Vercel
  environment variables. Never commit `.env` files.
- If both providers fail, return an explicit generic 502 response; never return
  a success-shaped empty or non-audio response.

## Scope and constraints

- Create the Vercel Serverless Function at `api/tts.js` and the minimal Node
  package manifest required for its runtime dependencies.
- Update `assets/js/effects.js` to sanitize text, request the MP3, cancel stale
  work, play the response, and preserve the existing voice toggle, voice test,
  and quiet-message behavior. Remove the browser voice selector and speed and
  pitch controls, which cannot control the server-selected voice.
- Keep the playback client in a small testable `assets/js/tts-client.js`
  browser module, loaded before `effects.js`, so request cancellation and audio
  cleanup can be covered without booting the portfolio animation code.
- Remove local MP3 lookup and `speechSynthesis` fallback from Aether's playback
  path. Existing MP3 assets are not removed by this design.
- Document local `vercel dev` setup and required Vercel environment variables.
- No claim of unlimited or guaranteed free synthesis: both services remain
  external dependencies.

## Open implementation calls

- Select and verify a maintained Edge TTS npm package and its Node/Vercel
  compatibility before adding it.
- Use a hosted shared rate-limit backend compatible with Vercel serverless and
  document its required environment variables.
