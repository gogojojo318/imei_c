#!/usr/bin/env bash

set -e

echo "🛠 Installing Node dependencies..."
yarn install

echo "🌐 Installing Puppeteer Chromium..."
# Puppeteer のダウンロード先を明示的に指定し、実行可能パスを環境変数に通す
export PUPPETEER_CACHE_DIR=.cache
export PUPPETEER_DOWNLOAD_PATH=.cache
export CHROME_BIN="/opt/render/.cache/puppeteer/chrome/linux-137.0.7151.70/chrome-linux64/chrome"

# Puppeteer に必要な Chromium をインストール（再試行も含め）
yarn exec puppeteer browsers install chrome || true

# Ruby / Rails 関連のセットアップ（必要なら binstubs も）
echo "🔧 Rebuilding bundler binstub..."
bundle binstubs bundler --force

echo "✅ Build script completed"
