#!/usr/bin/env bash

echo "🔧 Installing dependencies with yarn..."
yarn install

echo "🌐 Installing Puppeteer Chromium..."
yarn exec puppeteer browsers install chrome
