$envFile = "../../.env"
$apps = @("apps/viewer", "apps/landing-page")

foreach ($app in $apps) {
    Write-Host "Processing $app..."
    Set-Location $app
    
    # Read Env keys from file
    $lines = Get-Content $envFile
    foreach ($line in $lines) {
        if ($line -match "^#" -or $line -eq "") { continue }
        $parts = $line.Split("=", 2)
        if ($parts.Length -eq 2) {
            $key = $parts[0].Trim()
            $val = $parts[1].Trim()
            $val = $val -replace '^"|"$', ""
            
            # Remove existing (ignore error if missing)
            Write-Host "Removing $key..."
            cmd /c "vercel env rm $key production --yes" 2>$null

            # Add cleanly (Write to temp file with NO newline, then pipe)
            $tempFile = "temp_env_val.txt"
            [System.IO.File]::WriteAllText($PWD.Path + "/$tempFile", $val)
            
            Write-Host "Adding $key cleanly..."
            # Use cmd to redirect input from file
            cmd /c "vercel env add $key production < $tempFile"
            
            Remove-Item $tempFile
        }
    }
    Set-Location ../..
}
Write-Host "Env Vars Fixed!"
