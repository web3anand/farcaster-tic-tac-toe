# TicTacToe Battle - Deployment Script
# Run this script to deploy your app to Vercel

Write-Host "🚀 Starting TicTacToe Battle Deployment..." -ForegroundColor Green

# Check if Vercel CLI is installed
Write-Host "Checking Vercel CLI..." -ForegroundColor Yellow
try {
    vercel --version
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "🎉 Deployment complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up your game server on Railway or Render" -ForegroundColor White
Write-Host "2. Configure environment variables in Vercel" -ForegroundColor White
Write-Host "3. Complete account association" -ForegroundColor White
Write-Host "4. Test on base.dev/preview" -ForegroundColor White
