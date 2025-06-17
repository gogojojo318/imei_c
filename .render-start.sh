#!/bin/bash
set -e

echo "Setting CHROME_EXECUTABLE_PATH environment variable..."
export CHROME_EXECUTABLE_PATH=$(node -e "console.log(require('puppeteer').executablePath())")

echo "Starting app..."
node scripts/au_checker.js
