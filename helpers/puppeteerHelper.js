const puppeteer = require('puppeteer');

async function launchBrowser() {
  const executablePath = process.env.CHROME_EXECUTABLE_PATH || puppeteer.executablePath(); // fallback対応

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
