$envFile = "../../.env"
$projectName = "chatly-viewer"
$appPath = "apps/viewer"
$repo = "zain-099/chatly"

# 1. Create/Link Project
Write-Host "Setting up $projectName..."
Set-Location $appPath
# Attempt to link (will create if --yes and scope is clear, or fail if not found, we'll see)
# We use cmd /c to ensure it runs properly in PS
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
        # Remove quotes if present
        $val = $val -replace '^"|"$', ""
        
        Write-Host "Adding $key"
        # We pipe "y" because vercel env add might ask to overwrite
        $val | cmd /c "vercel env add $key production --project $projectName"
    }
}

# 3. Git Connect
Write-Host "Connecting Git..."
cmd /c "vercel git connect git@github.com:$repo.git --project $projectName --yes"

# 4. Settings (Optional: Set Root Directory if possible via CLI, else User must check)
# Vercel CLI doesn't easily set Root Directory. We rely on Vercel detecting it or User setting it.
# However, for Monorepo, if we link from apps/viewer, Vercel might set it as root?
# No, Git Connect links the Repo. The "Root Directory" setting is crucial.
# We will inspect project config later.

Write-Host "Done setting up $projectName"
Set-Location ../..
