const puppeteer = require('puppeteer');

const imei = process.argv[2]; // コマンドライン引数

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // 高速化：不要なリクエストをブロック
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    if (['image', 'stylesheet', 'font'].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto('https://my.au.com/cmn/WCV009001/WCE009001.hc');

  await page.type('#imei', imei);
  await page.click('.btnPrimary');

  await page.waitForSelector('.list_details', { timeout: 60000 });

  const rawText = await page.evaluate(() => {
  const elems = document.querySelectorAll('.list_details');
  for (const el of elems) {
    const text = el.textContent.trim();
    const matched = text.match(/[〇×△－]/);
    if (matched) {
      return matched[0];
    }
  }
  return null;
}); 

  let result = rawText ? rawText.trim().charAt(0) : '不明';
  if (result === 'ー') {
    result = '－';
  }

  console.log(result);

  await browser.close();
})();
