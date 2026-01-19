$envFile = "../../.env"
$projectName = "chatly-landing"
$appPath = "apps/landing-page"
$repo = "zain-099/chatly"

# 1. Create/Link Project
Write-Host "Setting up $projectName..."
Set-Location $appPath
# Attempt to link (will create if --yes)
cmd /c "vercel link --project $projectName --yes"

# 2. Add Env Vars
Write-Host "Adding Env Vars..."
$lines = Get-Content $envFile
foreach ($line in $lines) {
  if ($line -match "^#" -or $line -eq "") { continue }
  $parts = $line.Split("=", 2)
  if ($parts.Length -eq 2) {
    $key = $parts[0].Trim()
    $val = $parts[1].Trim()
    $val = $val -replace '^"|"$', ""
        
    Write-Host "Adding $key"
    # Pipe value to stdin for standard 'vercel env add' which prompts for value (or we use argument if supported, but piping is safer for secrets)
    # Usage: vercel env add <name> [environment] < value
    # But in PS, piping string is: $val | ...
    cmd /c "echo $val | vercel env add $key production"
  }
}

# 3. Git Connect
Write-Host "Connecting Git..."
cmd /c "vercel git connect git@github.com:$repo.git --project $projectName --yes"

Write-Host "Done setting up $projectName"
Set-Location ../..
