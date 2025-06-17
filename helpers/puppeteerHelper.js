const puppeteer = require('puppeteer');

async function launchBrowser() {
  const executablePath = puppeteer.executablePath(); // puppeteerが自動で使うもの

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
