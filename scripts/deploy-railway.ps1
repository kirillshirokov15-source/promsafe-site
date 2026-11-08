# This script deploys only after all local checks pass.
# It intentionally does not change domain, noindex flags, or CRM settings.
$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $projectRoot
foreach ($required in @('package.json','Dockerfile','app','components','public')) {
  if (!(Test-Path $required)) { throw "Not found: $required. Open the extracted project root." }
}
function Check($name,[ScriptBlock]$operation) {
  Write-Host "`n==> $name" -ForegroundColor Cyan
  & $operation
  if ($LASTEXITCODE -ne 0) { throw "$name failed (exit code $LASTEXITCODE). Deployment cancelled." }
}
Check 'Install dependencies' { npm install }
Check 'Dependency and API tests' { npm run qa }
Check 'Production dependency audit' { npm audit --omit=dev --audit-level=high }
Check 'TypeScript check' { npm run typecheck }
$env:NEXT_PUBLIC_SITE_ENV='staging'
$env:NEXT_PUBLIC_SITE_URL='https://promsafe.ru'
$env:SITE_INDEXING_APPROVED='false'
$env:EXTERNAL_WRITES_ENABLED='false'
$env:NEXT_PUBLIC_LEAD_FORM_ENABLED='false'
$env:NEXT_PUBLIC_LEAD_BACKEND_READY='false'
Check 'Build Next.js (safe staging flags)' { npm run build }
Write-Host "`nLocal checks passed. Railway destination status:" -ForegroundColor Green
Write-Host 'IMPORTANT: local env variables do not automatically change Railway service variables.' -ForegroundColor Yellow
Write-Host 'Before confirming, check the Railway service remains non-indexable and does not accept external writes.' -ForegroundColor Yellow
& railway status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Link this folder to the existing PromSafe project and promsafe-site service.' -ForegroundColor Yellow
  Check 'Railway link' { railway link }
  Check 'Railway status' { railway status }
}
$answer = Read-Host 'Deploy checked source to linked Railway service? (type YES)'
if ($answer -cne 'YES') { Write-Host 'Deployment cancelled.'; exit 0 }
Check 'Railway deploy' { railway up }
Write-Host 'Run post-deploy smoke test from the project root:' -ForegroundColor Cyan
Write-Host 'npm run smoke -- https://promsafe-site-production.up.railway.app' -ForegroundColor Cyan
Write-Host 'Check Railway dashboard and site pages. Do not switch on indexing yet.' -ForegroundColor Green
