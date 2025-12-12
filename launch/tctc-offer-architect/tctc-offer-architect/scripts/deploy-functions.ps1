<#
PowerShell helper to deploy the generateOffer function and configure GEMINI_API_KEY.

Usage: run in project root (where firebase.json lives). This script will ask for the key.
It supports two modes:
  1) update-env-vars (quick): updates env vars directly on the function
  2) secret-manager (recommended): stores key in Secret Manager and binds it to the function

Note: This script runs `gcloud` and `firebase` commands — you must be authenticated.
#>

param(
  [string]$ProjectId = "book-learning-module",
  [string]$Region = "us-central1",
  [string]$FunctionName = "generateOffer"
)

Write-Host "Deployment helper for $FunctionName in project $ProjectId (region $Region)"

$mode = Read-Host "Choose mode: (1) update-env-vars (quick) or (2) secret-manager (recommended). Enter 1 or 2"
if ($mode -ne '1' -and $mode -ne '2') { Write-Error "Invalid mode"; exit 1 }

$geminiKey = Read-Host -Prompt "Paste your GEMINI API key (input hidden)" -AsSecureString
# convert to plaintext for the gcloud commands only
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($geminiKey)
$keyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto($ptr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)

if ($mode -eq '1') {
  Write-Host "Using update-env-vars deployment (quick)"
  $envArg = "GEMINI_API_KEY=$keyPlain,GEMINI_MODEL=gemini-2.5-pro"
  & gcloud functions deploy $FunctionName --region=$Region --runtime=nodejs22 --entry-point=$FunctionName --trigger-http --update-env-vars $envArg --project=$ProjectId
  if ($LASTEXITCODE -ne 0) { Write-Error "gcloud deploy failed"; exit $LASTEXITCODE }
} else {
  Write-Host "Using Secret Manager flow (recommended)"
  # Create secret (idempotent)
  $secretId = "gemini-api-key"
  # Check if secret exists
  $exists = (& gcloud secrets list --filter="name:$secretId" --project=$ProjectId --format="value(name)" ) 2>$null
  if (-not $exists) {
    Write-Host "Creating secret $secretId"
    $keyPlain | gcloud secrets create $secretId --data-file=- --project=$ProjectId
  } else {
    Write-Host "Secret exists — adding new version"
    $keyPlain | gcloud secrets versions add $secretId --data-file=- --project=$ProjectId
  }

  # Deploy function referencing the secret
  $secretRef = "projects/$ProjectId/secrets/$secretId:latest"
  & gcloud functions deploy $FunctionName --region=$Region --runtime=nodejs22 --entry-point=$FunctionName --trigger-http --set-secrets "GEMINI_API_KEY=$secretRef" --project=$ProjectId
  if ($LASTEXITCODE -ne 0) { Write-Error "gcloud deploy failed"; exit $LASTEXITCODE }
}

Write-Host "Deployment finished. Run the health check to verify:"
Write-Host ("Invoke-RestMethod -Method GET -Uri `"https://us-central1-{0}.cloudfunctions.net/{1}`"" -f $ProjectId, $FunctionName)
