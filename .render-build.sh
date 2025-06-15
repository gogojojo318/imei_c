#!/usr/bin/env bash
set -e

echo "📦 Installing Node.js dependencies..."
yarn install

echo "🌐 Installing Puppeteer Chromium..."
export PUPPETEER_CACHE_DIR=.cache
export PUPPETEER_DOWNLOAD_PATH=.cache
yarn exec puppeteer browsers install chrome

echo "🔍 Setting CHROME_EXECUTABLE_PATH environment variable..."
export CHROME_EXECUTABLE_PATH=$(node -e "console.log(require('puppeteer').executablePath())")

echo "🔧 Rebuilding bundler binstub..."
bundle binstubs bundler --force

echo "✅ Build script finished!"
