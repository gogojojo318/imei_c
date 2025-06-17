#!/bin/bash
set -e

echo "Installing Node.js dependencies..."
yarn install

echo "Setting Puppeteer cache dir..."
export PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
export PUPPETEER_DOWNLOAD_PATH=/opt/render/.cache/puppeteer

echo "Installing Chromium for Puppeteer..."
npx puppeteer browsers install chrome

echo "Setting CHROME_EXECUTABLE_PATH..."
export CHROME_EXECUTABLE_PATH=$(node -e "console.log(require('puppeteer').executablePath())")

echo "Starting app..."
node scripts/au_checker.js
