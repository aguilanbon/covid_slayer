#!/bin/bash
# Fix for Railway Rollup deployment issue

echo "Cleaning previous installations..."
rm -rf node_modules package-lock.json || true

echo "Installing dependencies with optional packages..."
npm install --include=optional --legacy-peer-deps --no-audit

echo "Building application..."
npm run build
