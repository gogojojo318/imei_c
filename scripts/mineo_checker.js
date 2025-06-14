const puppeteer = require('puppeteer');

const imei = process.argv[2];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://my.mineo.jp/info/GNS010101GNS010101_Init.action');

  // IMEI入力
  await page.type('#GNS010101GNS010101_Init_imei', imei);

  // Enterキーでフォーム送信
  await page.keyboard.press('Enter');

  // 「状態」セルが表示されるまで待機（最大10秒）
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('table.table_basic01 tr');
    return Array.from(rows).some(row => row.innerText.includes('状態'));
  }, { timeout: 10000 });

  // 状態を取得
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

  // 結果1文字目を抽出し、- を全角に変換
  const result = rawStatus ? rawStatus.charAt(0).replace('-', '－') : '不明';

  console.log(result);

  await browser.close();
})();
