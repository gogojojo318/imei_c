#!/usr/bin/env bash

set -o errexit

# PuppeteerがChromeをDLできるように
export PUPPETEER_SKIP_DOWNLOAD=false

# PuppeteerとブラウザをDL
yarn install
yarn run postinstall

# Puppeteerのパスを確認（デバッグ用）
export PUPPETEER_EXECUTABLE_PATH="$(node -p 'require("puppeteer").executablePath()')"
echo "Using Puppeteer path: $PUPPETEER_EXECUTABLE_PATH"
