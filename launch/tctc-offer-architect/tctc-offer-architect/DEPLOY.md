# Deployment Guide — TCTC Offer Architect

This document explains how to set the Gemini API key in your deployed Cloud Function, deploy the code, and verify the health of the function. I cannot access your Google Cloud/Firebase account, so these are the exact steps and scripts you can run locally to complete the work.

Prerequisites
- `firebase` CLI installed and authenticated (run `firebase login`).
- `gcloud` CLI installed and authenticated (run `gcloud auth login`) — recommended for setting secrets.
- You must have owner or editor access to the GCP project used by this repo.

Quick plan
1. Deploy function with the GEMINI_API_KEY available at runtime.
2. Verify the function sees the key using the health-check endpoint.
3. Test the frontend at `https://tctc-offer-architect.web.app`.

Option A — Console (easiest)
1. Open Firebase Console → Functions → select `generateOffer` → Edit (or open Google Cloud Console → Cloud Functions).
2. In Environment variables (or Variables & Secrets) add:
   - `GEMINI_API_KEY` = your API key
   - `GEMINI_MODEL` = `gemini-2.5-pro` (optional)
3. Save and deploy from the console.

Option B — CLI (gcloud) — update env vars directly
Run this PowerShell command (replace `<YOUR_KEY>` and optionally add `--project` if needed):

```powershell
gcloud functions deploy generateOffer `
  --region=us-central1 `
  --runtime=nodejs22 `
  --entry-point=generateOffer `
  --trigger-http `
  --update-env-vars "GEMINI_API_KEY=<YOUR_KEY>,GEMINI_MODEL=gemini-2.5-pro"
```

Option C — CLI (recommended for production): Secret Manager + deploy binding
1. Create a secret and upload the key:

```powershell
# Replace PROJECT_ID with your project
$PROJECT=book-learning-module
$KEY="<YOUR_KEY>"
$KEY | gcloud secrets create gemini-api-key --data-file=- --project=$PROJECT
```

2. Deploy the function binding the secret:

```powershell
gcloud functions deploy generateOffer --region=us-central1 --runtime=nodejs22 --entry-point=generateOffer --trigger-http --set-secrets "GEMINI_API_KEY=projects/$PROJECT/secrets/gemini-api-key:latest"
```

Verify health (after deploy)
Use the health-check GET endpoint I added to `generateOffer`.

PowerShell (direct Cloud Function URL shown in your logs):
```powershell
Invoke-RestMethod -Method GET -Uri "https://us-central1-book-learning-module.cloudfunctions.net/generateOffer"
# Or if you deployed hosting and rewrites:
Invoke-RestMethod -Method GET -Uri "https://tctc-offer-architect.web.app/api/generateOffer"
```

Expected JSON: { "healthy": true, "hasGeminiKey": true, "geminiModel": "gemini-2.5-pro" }

If `hasGeminiKey` is false: the runtime still does not see the key. Revisit the Console or the `gcloud` command.

Check function logs
```powershell
firebase functions:log --only generateOffer
```
Or use Google Cloud Console → Logging → Logs Explorer, filter by function name `generateOffer`.

If you want me to produce a one-line deploy script you can run locally, use the included `scripts/deploy-functions.ps1` helper.

Security note
- Do not commit API keys to the repository. Use Secret Manager or environment variables from the Console. The repo's `functions/.gitignore` excludes `*.local`.
