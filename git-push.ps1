Write-Host "Pushing Node.js version compatibility fix to GitHub..." -ForegroundColor Green
Write-Host ""

# Add all changes
Write-Host "Adding changes..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Fix Node.js version compatibility - allow Node v23+ for deployment success"

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "Push completed successfully!" -ForegroundColor Green
Write-Host "Check Vercel for deployment status." -ForegroundColor Cyan
