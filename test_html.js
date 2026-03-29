const { JSDOM } = require("jsdom");
const html = require('fs').readFileSync('pod-execution-model.unencrypted.html', 'utf8');
const dom = new JSDOM(html);
const slides = dom.window.document.querySelectorAll('.slide');
console.log('JSDOM parsed slide count:', slides.length);
