const puppeteer = require('puppeteer');

async function launchBrowser() {
  const executablePath = process.env.CHROME_EXECUTABLE_PATH || puppeteer.executablePath();

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

async function blockUnnecessaryRequests(page) {
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (
      req.resourceType() === 'image' ||
      req.resourceType() === 'stylesheet' ||
      req.resourceType() === 'font' ||
      url.endsWith('.png') ||
      url.endsWith('.jpg')
    ) {
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
