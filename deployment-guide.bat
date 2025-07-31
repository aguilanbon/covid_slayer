@echo off
echo 🦠 COVID Slayer - Quick GitHub Deployment Guide 🦠
echo ======================================================
echo.
echo 📋 Step-by-step deployment process:
echo.
echo 1. PUSH TO GITHUB:
echo    git add .
echo    git commit -m "Add deployment configurations"
echo    git push origin main
echo.
echo 2. BACKEND DEPLOYMENT (Railway - FREE):
echo    - Go to https://railway.app
echo    - Click "New Project" ^> "Deploy from GitHub repo"
echo    - Select your repository
echo    - Set Root Directory to "server"
echo    - Add environment variables:
echo      * MONGODB_URI: mongodb+srv://username:password@cluster.mongodb.net/covid_slayer
echo      * JWT_SECRET: generate-a-secure-32-character-string
echo      * GEN_SALT: generate-another-secure-string
echo      * CORS_ORIGINS: https://your-app-name.vercel.app
echo.
echo 3. FRONTEND DEPLOYMENT (Vercel - FREE):
echo    - Go to https://vercel.com
echo    - Click "New Project" ^> Import from GitHub
echo    - Select your repository
echo    - Set Framework: Vite
echo    - Set Root Directory: client
echo    - Add environment variable:
echo      * VITE_API_URL: https://your-backend-url.railway.app/api
echo.
echo 4. DATABASE SETUP (MongoDB Atlas - FREE):
echo    - Go to https://cloud.mongodb.com
echo    - Create free cluster
echo    - Create database user
echo    - Whitelist IPs (0.0.0.0/0 for all)
echo    - Get connection string for MONGODB_URI
echo.
echo 🎯 After deployment:
echo    - Test your live app!
echo    - Share the Vercel URL with users
echo    - Monitor logs in Railway/Vercel dashboards
echo.
echo ✨ Your app will be live at: https://your-app-name.vercel.app
echo.
pause
