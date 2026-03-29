const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('file://' + __dirname + '/pod-execution-model.unencrypted.html');
    const ct = await page.evaluate(() => document.querySelectorAll('.slide').length);
    console.log('Slides in DOM:', ct);
    const activeHTML = await page.evaluate(() => document.querySelectorAll('.slide')[23].outerHTML);
    console.log('Slide 24 HTML:\n', activeHTML);
    await browser.close();
})();
