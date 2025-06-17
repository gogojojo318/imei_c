#!/usr/bin/env bash

set -o errexit

# Puppeteerとブラウザのインストール（Chrome含む）
yarn install
npx puppeteer browsers install chrome

# PuppeteerのChromeパスをデバッグ表示
echo "Using Puppeteer path: $(node -p 'require(\"puppeteer\").executablePath()')"

# Ruby側の準備（必要に応じて）
bundle install
bundle exec rails db:migrate
bundle exec rails assets:precompile
