// checkers/mineo.js
const { launchBrowser } = require('../helpers/puppeteerHelper.js');

async function checkMineo(imei) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.goto('https://my.mineo.jp/info/GNS010101GNS010101_Init.action');
  await page.type('#GNS010101GNS010101_Init_imei', imei);
  await page.keyboard.press('Enter');

  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('table.table_basic01 tr');
    return Array.from(rows).some(row => row.innerText.includes('状態'));
  }, { timeout: 10000 });

  const rawStatus = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table.table_basic01 tr'));
    for (const row of rows) {
      const th = row.querySelector('th');
      const td = row.querySelector('td');
      if (th && th.textContent.includes('状態')) {
        return td?.innerText.trim() || null;
      }
    }
    return null;
  });

  const result = rawStatus ? rawStatus.charAt(0).replace('-', '－') : '不明';

  await browser.close();
  return result;
}

module.exports = checkMineo;


if (require.main === module) {
  const imei = process.argv[2];
  if (!imei) {
    console.error('IMEIを引数に指定してください');
    process.exit(1);
  }
  checkMineo(imei)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}