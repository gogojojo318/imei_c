#!/usr/bin/env bash
set -e

echo "🚀 Starting app..."

# Puppeteer の実行パスを環境変数に設定
export CHROME_EXECUTABLE_PATH=$(node -e "console.log(require('puppeteer').executablePath())")

# Rails + Node.js の起動例（React や API サーバなどに応じて調整）
# 例1: Node.js アプリだけなら
# node index.js

# 例2: Rails + Webpacker などを同時に動かすなら
bundle exec rails server -b 0.0.0.0
