const puppeteer = require('puppeteer');

async function launchBrowser() {
  const executablePath = process.env.CHROME_EXECUTABLE_PATH || puppeteer.executablePath();

  return await puppeteer.launch({
    headless: 'new', // または true
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
