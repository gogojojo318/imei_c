// checkers/au.js
const { launchBrowser, blockUnnecessaryRequests } = require('../helpers/puppeteerHelper');


async function checkAu(imei) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await blockUnnecessaryRequests(page);

  await page.goto('https://my.au.com/cmn/WCV009001/WCE009001.hc', { waitUntil: 'domcontentloaded' });
  await page.type('#imei', imei);
  await page.click('.btnPrimary');

  await page.waitForFunction(() => {
    const items = Array.from(document.querySelectorAll('.list_item'));
    return items.some(li => {
      const h = li.querySelector('.list_heading');
      const d = li.querySelector('.list_details');
      return h && /状態/.test(h.textContent) && d && /[〇○×△－ー-]/.test(d.textContent);
    });
  }, { timeout: 60000 });

  const result = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.list_item'));
    for (const li of items) {
      const h = li.querySelector('.list_heading');
      const d = li.querySelector('.list_details');
      if (h && /状態/.test(h.textContent) && d) {
        let c = d.textContent.match(/[〇○×△－ー-]/)?.[0];
        if (c === 'ー' || c === '-') c = '－';
        return c;
      }
    }
    return '不明';
  });

  await browser.close();
  return result;
}

// CLI実行用のコードを追加
if (require.main === module) {
  const imei = process.argv[2];
  if (!imei) {
    console.error('IMEIを引数に指定してください');
    process.exit(1);
  }
  checkAu(imei)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = checkAu;
