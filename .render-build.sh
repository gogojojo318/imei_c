#!/usr/bin/env bash

echo "🛠 Installing Node dependencies..."
yarn install

echo "🌐 Installing Puppeteer Chromium..."
yarn exec puppeteer browsers install chrome


# PuppeteerのChromiumインストール
yarn install
yarn exec puppeteer browsers install chrome

# バンドラーのbinstubが壊れている場合に備えて再生成
bundle binstubs bundler --force
