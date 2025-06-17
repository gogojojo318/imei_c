// helpers/puppeteerHelper.js

const puppeteer = require('puppeteer'); // puppeteer-core ではない！

async function launchBrowser() {
  return await puppeteer.launch({
    headless: 'new', // または true
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
    const resourceType = req.resourceType();
    if (['image', 'stylesheet', 'font'].includes(resourceType)) {
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
