// helpers/puppeteerHelper.js
const puppeteer = require('puppeteer');

async function launchBrowser() {
  return await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.CHROME_EXECUTABLE_PATH || undefined,
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

async function blockUnnecessaryRequests(page) {
  await page.setRequestInterception(true);
  page.on('request', req => {
    const type = req.resourceType();
    if (['image', 'stylesheet', 'font'].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });
}

module.exports = {
  launchBrowser,
  blockUnnecessaryRequests
};
