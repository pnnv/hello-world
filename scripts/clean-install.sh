#!/bin/bash

echo "🧹 Removing node_modules and lock files..."
rm -rf node_modules
rm -rf .next
rm -rf package-lock.json

echo "📦 Installing dependencies fresh..."
npm install

echo "✅ Clean install complete!"
