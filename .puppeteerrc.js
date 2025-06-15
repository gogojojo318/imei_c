const path = require("path");

module.exports = {
  executablePath: path.resolve(
    __dirname,
    ".cache/puppeteer/chrome/linux-137.0.7151.70/chrome-linux64/chrome"
  ),
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};
