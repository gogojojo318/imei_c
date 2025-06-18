#!/usr/bin/env bash

set -o errexit

# PuppeteerがChromeをDLできるように
export PUPPETEER_SKIP_DOWNLOAD=false

# PuppeteerとブラウザをDL
yarn install
yarn run postinstall

# PuppeteerのChromeをダウンロード（ここが重要！）
node node_modules/puppeteer/install.js

# Rails の assets:precompile とかあればここで
bundle exec rails assets:precompile

# Puppeteerのパスを確認（デバッグ用）
export PUPPETEER_EXECUTABLE_PATH="$(node -p 'require("puppeteer").executablePath()')"
echo "Using Puppeteer path: $PUPPETEER_EXECUTABLE_PATH"