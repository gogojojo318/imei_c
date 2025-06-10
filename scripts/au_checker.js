const puppeteer = require('puppeteer');

const imei = process.argv[2];
if (!imei) {
  console.error('IMEI番号を指定してください');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://my.au.com/cmn/WCV009001/WCE009001.hc');

  await page.waitForSelector('input#imei');
  await page.type('input#imei', imei);

  let newPagePromise = new Promise(resolve => 
    browser.once('targetcreated', async target => {
      if (target.type() === 'page') {
        const newPage = await target.page();
        await newPage.waitForLoadState?.('domcontentloaded').catch(() => {});
        resolve(newPage);
      }
    })
  );

  await page.evaluate(() => {
    if (typeof execSubmit === 'function' && typeof checkImei === 'function') {
      execSubmit('nextForm', checkImei, null);
    } else {
      throw new Error('execSubmitまたはcheckImeiが定義されていません');
    }
  });

  const newPage = await newPagePromise;

  await newPage.waitForSelector('.list_details', { timeout: 30000 });
  const result = await newPage.$eval('.list_details', el => el.innerText.trim());
  

  console.log('判定結果:', result);

  await browser.close();
})();
