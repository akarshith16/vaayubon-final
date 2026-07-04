import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  console.log('Starting prerender...');
  
  const server = http.createServer((req, res) => {
    // Basic static server for dist
    let urlPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, 'dist', urlPath === '/' ? 'index.html' : urlPath);
    if (fs.existsSync(filePath)) {
      if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'text/javascript');
      else if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
      else if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end();
    }
  });
  
  server.listen(0, async () => {
    const port = server.address().port;
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err));
    
    console.log(`Loading http://localhost:${port}/ ...`);
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Give it time for Framer Motion to finish mount
    await new Promise(r => setTimeout(r, 2000));
    
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    console.log('BODY CONTENT LENGTH:', bodyContent.length);
    console.log('BODY PREVIEW:', bodyContent.substring(0, 150));
    
    let html = await page.content();
    html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="India's crop residue, turned into durable, verified carbon removal — permanent biochar CDR that also pays farmers. Explore Vaayubon's removal credits." />`);
    html = html.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="India's crop residue, turned into durable, verified carbon removal — permanent biochar CDR that also pays farmers." />`);
    fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
    
    await browser.close();
    server.close();
    console.log('Prerender complete.');
  });
})();
