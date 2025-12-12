# Copilot instructions for TCTC Offer Architect

This repo contains a small Firebase-hosted frontend and a Firebase Cloud Function that generates offers via Gemini (Google Generative Language API).

- **Where to look**: `functions/index.js` (backend logic + system prompt), `functions/package.json` (dev scripts), `firebase.json` (hosting + rewrite to function), `public/` (frontend), and `The-Arch-Ledger.md` (developer notes & local run steps).

- **Big picture**: Frontend lives in `public/` (static site). API calls to `/api/**` are rewritten to the Cloud Function `generateOffer` (see `firebase.json` rewrites). The function assembles system/user prompts and calls Gemini; it returns JSON `{ offer }`.

- **Key environment variables**:
  - `GEMINI_API_KEY` — required at runtime for the Gemini API. Must not be committed to source.
  - Optional: `GEMINI_MODEL` — override default model (default `gemini-2.5-flash`).

- **Important runtime notes**:
  - `functions/package.json` sets `engines.node` to `22` — use Node 22 when testing or deploying.
  - The function uses global `fetch` (Node 18+/22), so no extra HTTP client is required.
  - `firebase.json` has a `predeploy` hook that runs `npm --prefix "$RESOURCE_DIR" run lint` — ensure lint passes before deploy.

- **Common developer flows**:
  - Install and login: `npm install -g firebase-tools` then `firebase login`.
  - Backend only (emulator):
    ```powershell
    cd functions
    npm install
    npm run serve     # runs firebase emulators:start --only functions
    ```
  - Deploy functions: `cd functions && npm run deploy` (runs `firebase deploy --only functions`).
  - Deploy full site (hosting + functions): use `firebase deploy` from repo root after ensuring env vars and lint pass.

- **Where to change behavior**:
  - CORS / allowed origins: modify `ALLOWED_ORIGINS` in `functions/index.js` to add or remove hostnames used by the frontend.
  - System prompt and prompt types: `SYSTEM_PROMPT` and the `switch(promptType)` in `functions/index.js` define output structure and special modes (e.g., `sigil`, `linkedin`, `curriculum`, `alchemyScript`). Use these examples when adding new prompt modes.

- **Security & secrets**:
  - Do NOT hard-code `GEMINI_API_KEY` into `public/index.html` or commit it to the repo. Use Cloud Functions environment variables, Secrets Manager, or CI/CD secrets when deploying.
  - Local dev notes in `The-Arch-Ledger.md` mention temporarily placing an API key into `public/index.html` for quick local testing — avoid committing that.

- **Patterns & expectations for PRs**:
  - Keep Cloud Function changes focused and preserve the exact output structure where external consumers depend on it (the function returns `{ offer }`).
  - Update `functions/package.json` scripts if you add new build steps; keep `lint` as a required predeploy step.
  - When changing prompt wording or response structure, include a short example request/response in the PR description.

- **Files to reference in PR/code navigation**:
  - `functions/index.js` — main logic, system prompt, promptType cases, Gemini API call.
  - `functions/package.json` — scripts (serve, shell, deploy), Node engine, dev deps.
  - `firebase.json` — hosting targets, rewrites to `generateOffer`, and `predeploy` lint hook.
  - `public/` — production static files served by hosting.

If anything above is unclear, tell me which area (local dev, deploy, prompt modes, or secrets) you want expanded and I will iterate.
