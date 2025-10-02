@echo off
echo Pushing Node.js version compatibility fix...
git add .
git commit -m "Fix Node.js version compatibility - allow Node v23+ for deployment success"
git push origin main
echo.
echo Push completed! Check Vercel for successful deployment.
pause
