const puppeteer = require('puppeteer');

const imei = process.argv[2]; // コマンドライン引数から取得

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // 画像・スタイル・フォントなど不要なリクエストをブロックして高速化
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto('https://my.au.com/cmn/WCV009001/WCE009001.hc');

  // IMEI入力と送信
  await page.type('#imei', imei);
  await page.click('.btnPrimary');

  // ページが書き換わるまで結果部分を待つ（Navigationは起きない想定）
  await page.waitForSelector('.list_details', { timeout: 10000 });

  // 結果をテキストで取得
  const rawText = await page.evaluate(() => {
    const elems = document.querySelectorAll('.list_details');
    for (const el of elems) {
      const text = el.innerText.trim();
      if (text.match(/^[〇×△－]/)) {  // 判定文字のいずれかで始まる行を探す
        return text;
      }
    }
    return null;
  });

  // 判定「ー」を大文字の「－」に統一して先頭1文字抽出
  let result = rawText ? rawText.trim().charAt(0) : '不明';
  if (result === 'ー') {
    result = '－';
  }

  console.log(result);

  await browser.close();
})();
