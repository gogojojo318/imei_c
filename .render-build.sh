#!/usr/bin/env bash

echo "🛠 Installing Node dependencies..."
yarn install

echo "🌐 Installing Puppeteer Chromium..."
yarn exec puppeteer browsers install chrome

# PuppeteerがChromeをインストールした後に設定ファイルを書き換える必要がある
echo "📄 Writing Puppeteer config..."
cat <<EOF > .puppeteerrc.js
module.exports = {
  executablePath: '/opt/render/.cache/puppeteer/chrome/linux-137.0.7151.70/chrome-linux64/chrome'
};
EOF

# バンドラーのbinstubが壊れている場合に備えて再生成
bundle binstubs bundler --force
