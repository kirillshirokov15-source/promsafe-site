# Safely copies the complete site to a NEW GitHub branch; does not alter main or Railway.
$ErrorActionPreference = 'Stop'
$sourceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
if (!(Test-Path (Join-Path $sourceRoot 'package.json'))) { throw 'Not a PromSafe project root.' }
$repo = 'https://github.com/kirillshirokov15-source/promsafe-site.git'
$branch = 'promsafe-v8-1-tech-' + (Get-Date -Format 'yyyyMMdd-HHmmss')
$target = Join-Path ([IO.Path]::GetTempPath()) ('promsafe-git-' + [Guid]::NewGuid().ToString('N').Substring(0,8))
function RunGit {
    param([string[]]$GitArgs)
    & git @GitArgs
    if ($LASTEXITCODE -ne 0) { throw ('git ' + ($GitArgs -join ' ') + ' failed.') }
}
Write-Host 'Creating a safe working copy of the existing repository...' -ForegroundColor Cyan
RunGit -GitArgs @('clone','--branch','main',$repo,$target)
RunGit -GitArgs @('-C',$target,'checkout','-b',$branch)
# The older repository has a partial copy in a nested directory, not a complete root project.
if (Test-Path (Join-Path $target 'promsafe-site')) {
    RunGit -GitArgs @('-C',$target,'rm','-r','--ignore-unmatch','promsafe-site')
}
foreach ($item in Get-ChildItem -LiteralPath $sourceRoot -Force) {
    if ($item.Name -in @('.git','node_modules','.next','out','coverage','.env','.env.local','package-lock.json')) { continue }
    Copy-Item -LiteralPath $item.FullName -Destination (Join-Path $target $item.Name) -Recurse -Force
}
# A freshly generated package-lock should be committed if it exists.
if (Test-Path (Join-Path $sourceRoot 'package-lock.json')) {
    Copy-Item -LiteralPath (Join-Path $sourceRoot 'package-lock.json') -Destination $target -Force
}
RunGit -GitArgs @('-C',$target,'add','-A')
RunGit -GitArgs @('-C',$target,'commit','-m','PromSafe V8.1: technical QA and security hardening')
Write-Host 'The original main branch remains untouched.' -ForegroundColor Green
$ok = Read-Host "Push the prepared branch $branch to GitHub? Type YES"
if ($ok -cne 'YES') { Write-Host "Working copy retained: $target"; exit 0 }
RunGit -GitArgs @('-C',$target,'push','--set-upstream','origin',$branch)
Write-Host "GitHub branch published: $branch" -ForegroundColor Green
Write-Host "Create a pull request from this branch into main after CI checks pass."
