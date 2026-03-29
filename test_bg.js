const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('file://' + __dirname + '/pod-execution-model.unencrypted.html');
    const bgs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.slide')).map(s => {
            return s.getAttribute('style') + ' | ' + s.style.backgroundColor;
        });
    });
    console.log(bgs.filter(b => b.includes('rgb')));
    await browser.close();
})();
