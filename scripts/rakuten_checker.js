const puppeteer = require('puppeteer');
const { launchBrowser, blockUnnecessaryRequests } = require('../helpers/puppeteerHelper');

async function checkRakuten(imei) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  await blockUnnecessaryRequests(page);

  await page.goto('https://network.mobile.rakuten.co.jp/restriction/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('#imei');
  await page.type('#imei', imei);

  await page.waitForFunction(() => {
    const btn = document.querySelector('#search');
    return btn && !btn.classList.contains('is-disabled');
  });
  await page.click('#search');

  await page.waitForSelector('#search-result', { timeout: 10000 });
  const resultRaw = await page.$eval('#search-result', el => el.textContent.trim());
  const result = resultRaw.replace(/-/g, '－');

  await browser.close();
  return result;
}

module.exports = checkRakuten;

if (require.main === module) {
  const imei = process.argv[2];
  if (!imei) {
    console.error('IMEIを引数に指定してください');
    process.exit(1);
  }
  checkRakuten(imei)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
