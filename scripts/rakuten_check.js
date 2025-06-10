const puppeteer = require('puppeteer-core');
const imei = process.argv[2];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // 環境に応じて
  });

  const page = await browser.newPage();

  await page.goto('https://network.mobile.rakuten.co.jp/restriction/', {
    waitUntil: 'networkidle2',
  });

  // IMEI入力
  await page.waitForSelector('#imei');
  await page.type('#imei', imei);

  // ボタンが活性化するのを待ってクリック
  await page.waitForFunction(() => {
    const btn = document.querySelector('#search');
    return btn && !btn.classList.contains('is-disabled');
  });
  await page.click('#search');

  // 結果が表示されるまで待機
  await page.waitForSelector('#search-result', { timeout: 10000 });

  // 判定記号を抽出して全角に変換
const resultRaw = await page.$eval('#search-result', el => el.textContent.trim());
const result = resultRaw.replace(/-/g, '－');  // ← ここで変換
console.log(`${result}`);

  await browser.close();
})();
