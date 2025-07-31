#!/bin/bash
# Script to fix Rollup optional dependencies issue

echo "Fixing Rollup optional dependencies..."

# Remove problematic files
rm -rf node_modules package-lock.json

# Install with specific flags to ensure optional deps are included
npm install --include=optional --legacy-peer-deps --no-audit

echo "Dependencies installed successfully!"
