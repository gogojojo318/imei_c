#!/usr/bin/env bash

echo "🛠 Installing Node dependencies..."
yarn install

echo "🌐 Installing Puppeteer Chromium..."
yarn exec puppeteer browsers install chrome
