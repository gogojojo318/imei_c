const puppeteer = require('puppeteer');

const imei = process.argv[2]; // コマンドライン引数

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // 不要リソースをブロック
  await page.setRequestInterception(true);
  page.on('request', req => {
    const t = req.resourceType();
    if (['image','stylesheet','font'].includes(t)) req.abort();
    else req.continue();
  });

  await page.goto('https://my.au.com/cmn/WCV009001/WCE009001.hc', {
    waitUntil: 'domcontentloaded', timeout: 60000
  });

  // IMEIを入力して送信
  await page.type('#imei', imei);
  await page.click('.btnPrimary');

  // 「状態」の .list_details が出るまで待機
  await page.waitForFunction(() => {
    const items = Array.from(document.querySelectorAll('.list_item'));
    // 「状態」見出しの子 list_details がテキストを含んでいるか
    return items.some(li => {
      const h = li.querySelector('.list_heading');
      const d = li.querySelector('.list_details');
      return h && /状態/.test(h.textContent) && d && /[〇○×△－]/.test(d.textContent);
    });
  }, { timeout: 60000 });

  // 状態のテキストだけを取得
  const raw = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.list_item'));
    for (const li of items) {
      const h = li.querySelector('.list_heading');
      if (h && /状態/.test(h.textContent)) {
        const d = li.querySelector('.list_details');
        if (!d) return null;
        // 先頭の「○/×/△/－/ー/-」を拾う
        const m = d.textContent.match(/[〇○×△－ー-]/);
        if (m) {
          // 似たハイフンは全角マイナスに統一
          let c = m[0];
          if (c === 'ー' || c === '-') c = '－';
          return c;
        }
      }
    }
    return null;
  });

  const result = raw || '不明';
  console.log(result);
  await browser.close();
})();
