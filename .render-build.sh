#!/usr/bin/env bash
set -o errexit

echo "🛠 Installing Node dependencies..."
yarn install

echo "🌐 Installing Puppeteer Chromium..."
yarn exec puppeteer browsers install chrome

echo "💎 Installing Ruby gems..."
bundle install

echo "🔧 Regenerating binstubs for bundler..."
bundle binstubs bundler --force
