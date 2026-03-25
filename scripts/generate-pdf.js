#!/usr/bin/env node

/**
 * Generate PDF from Pod Execution Model slides
 * 
 * Usage:
 *   npm run generate-pdf
 *   
 * Requirements:
 *   npm install  (installs puppeteer which bundles Chromium)
 * 
 * What it does:
 *   1. Starts a local HTTP server on port 8765
 *   2. Opens the presentation in headless Chrome
 *   3. Forces all slides visible and injects Kahua logo top-right
 *   4. Prints to PDF at 1920x1080 (one slide per page)
 *   5. Saves to pod-execution-model.pdf
 */

const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const PROJECT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(PROJECT_DIR, 'pod-execution-model.pdf');
const HTML_FILE = 'pod-execution-model.unencrypted.html';

// Simple static file server
function startServer() {
    return new Promise((resolve) => {
        const mimeTypes = {
            '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
            '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
        };
        const server = http.createServer((req, res) => {
            const filePath = path.join(PROJECT_DIR, req.url === '/' ? 'index.html' : req.url);
            const ext = path.extname(filePath);
            fs.readFile(filePath, (err, data) => {
                if (err) { res.writeHead(404); res.end('Not found'); return; }
                res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
                res.end(data);
            });
        });
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
            resolve(server);
        });
    });
}

(async () => {
    const server = await startServer();

    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(`http://localhost:${PORT}/${HTML_FILE}`, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 2000));

        const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
        console.log(`Found ${totalSlides} slides`);

        await page.evaluate(() => {
            // Fix container
            const container = document.querySelector('.slideshow-container');
            if (container) container.style.cssText = 'height: auto !important; overflow: visible !important; position: relative !important;';
            document.body.style.cssText = 'height: auto !important; overflow: visible !important;';
            document.documentElement.style.cssText = 'height: auto !important; overflow: visible !important;';

            // Hide nav, corner-brand, draft labels
            document.querySelectorAll('.nav-bar, .corner-brand').forEach(el => el.style.display = 'none');
            document.querySelectorAll('body > div').forEach(el => {
                if (el.textContent.includes('CURRENT DRAFT') && !el.classList.contains('slideshow-container')) {
                    el.style.display = 'none';
                }
            });

            // Get logo source
            const logoImg = document.querySelector('.kahua-logo img');
            const logoSrc = logoImg ? logoImg.src : null;

            // Force every slide visible and add logo
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.cssText = `
                    display: flex !important; position: relative !important;
                    opacity: 1 !important; visibility: visible !important;
                    transform: none !important; width: 100% !important;
                    height: 1080px !important; min-height: 1080px !important;
                    max-height: 1080px !important; page-break-after: always !important;
                    break-after: page !important; overflow: hidden !important;
                    top: auto !important; left: auto !important;
                `;

                // Kahua logo top-right
                const logoDiv = document.createElement('div');
                logoDiv.style.cssText = 'position: absolute; top: 48px; right: 80px; z-index: 10;';
                if (logoSrc) {
                    logoDiv.innerHTML = `<img src="${logoSrc}" style="height: 44px;">`;
                } else {
                    logoDiv.innerHTML = `
                        <svg width="50" height="40" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="44" r="30" fill="none" stroke="#007D99" stroke-width="3"/>
                            <circle cx="90" cy="44" r="30" fill="none" stroke="#007D99" stroke-width="3" stroke-dasharray="4 3"/>
                            <circle cx="70" cy="74" r="30" fill="none" stroke="#D94F5C" stroke-width="3"/>
                            <circle cx="70" cy="52" r="5" fill="#007D99"/>
                        </svg>`;
                }
                slide.appendChild(logoDiv);
            });

            // Kill animations
            const style = document.createElement('style');
            style.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
            document.head.appendChild(style);
        });

        await new Promise(r => setTimeout(r, 1000));

        await page.pdf({
            path: OUTPUT_FILE,
            width: '1920px',
            height: '1080px',
            printBackground: true,
            preferCSSPageSize: false,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
        });

        const stats = fs.statSync(OUTPUT_FILE);
        console.log(`✅ PDF generated: ${OUTPUT_FILE}`);
        console.log(`   ${totalSlides} slides, ${(stats.size / 1024 / 1024).toFixed(1)}MB`);

        await browser.close();
    } finally {
        server.close();
    }
})();
