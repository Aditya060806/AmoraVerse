#!/bin/bash

# AmoraVerse Vercel Deployment Script

echo "🚀 Starting AmoraVerse deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not installed"
    echo "Please run: npm i -g vercel"
    exit 1
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel first"
    vercel login
fi

# Build frontend
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your application is now available on Vercel"
    echo "📝 Remember to configure environment variables in Vercel project settings:"
    echo "   - VITE_API_URL"
    echo "   - OPENAI_API_KEY (optional)"
    echo "   - ANTHROPIC_API_KEY (optional)"
else
    echo "❌ Deployment failed"
    exit 1
fi 