#!/bin/bash

# COVID Slayer Deployment Script
echo "🦠 COVID Slayer Deployment Setup 🦠"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the root directory of the project"
    exit 1
fi

echo "📋 Prerequisites Check..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
else
    echo "✅ Node.js found: $(node --version)"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
else
    echo "✅ npm found: $(npm --version)"
fi

echo ""
echo "🏗️  Installing dependencies..."
npm run install-all

echo ""
echo "🔧 Setting up environment files..."

# Server environment
if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    echo "📝 Created server/.env from template"
    echo "⚠️  Please edit server/.env and add your actual values!"
fi

# Client environment
if [ ! -f "client/.env" ]; then
    cp client/.env.example client/.env
    echo "📝 Created client/.env from template"
fi

echo ""
echo "🧪 Building client..."
cd client && npm run build
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Edit server/.env with your MongoDB URI and secrets"
echo "2. Edit client/.env with your API URL (if needed)"
echo "3. Deploy your backend to Railway/Render/Heroku"
echo "4. Deploy your frontend to Vercel/Netlify"
echo "5. Update the CORS_ORIGINS in your backend with your frontend URL"
echo ""
echo "🚀 For local development, run: npm run dev"
echo "📖 See README.md for detailed deployment instructions"
