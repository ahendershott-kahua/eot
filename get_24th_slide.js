const { JSDOM } = require("jsdom");
const html = require('fs').readFileSync('pod-execution-model.unencrypted.html', 'utf8');
const dom = new JSDOM(html);
const slides = dom.window.document.querySelectorAll('.slide');
console.log('Slide 24 (index 23) outer HTML:', slides[23].outerHTML.substring(0, 300));
console.log('Slide 25 (index 24) outer HTML:', slides[24].outerHTML.substring(0, 300));
