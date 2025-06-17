const puppeteer = require('puppeteer');

async function launchBrowser() {
  const executablePath = puppeteer.executablePath();

  return await puppeteer.launch({
    headless: 'new',
    executablePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-zygote'
    ]
  });
}

// ← これを追加
function blockUnnecessaryRequests(page) {
  return page.setRequestInterception(true).then(() => {
    page.on('request', (req) => {
      const url = req.url();
      const resourceType = req.resourceType();

      if (
        ['image', 'stylesheet', 'font', 'media'].includes(resourceType) ||
        /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i.test(url)
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
  });
}

// ← exportに追加
module.exports = {
  launchBrowser,
  blockUnnecessaryRequests,
};
