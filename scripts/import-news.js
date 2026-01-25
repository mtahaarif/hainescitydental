#!/usr/bin/env node
const fs = require('fs/promises');
const path = require('path');
const fetch = global.fetch || require('node-fetch');
const cheerio = require('cheerio');

async function run() {
  const url = 'https://hainescitydental.vercel.app/news';
  console.log('Fetching', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'HainesCityDentalImporter/1.0' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const html = await res.text();

  const $ = cheerio.load(html);

  const items = [];

  // Generic heuristics: find article elements or list items with links
  const articleEls = $('article');
  if (articleEls.length === 0) {
    // fallback selectors
    $('div.post, .news-item, .entry').each((i, el) => articleEls.push(el));
  }

  $(articleEls).each((i, el) => {
    const $el = $(el);
    const link = $el.find('a').first();
    const title = $el.find('h1, h2, h3').first().text().trim() || link.text().trim();
    const href = link.attr('href') || '';
    const date = $el.find('time').attr('datetime') || $el.find('.date, .posted-on').text().trim() || '';
    const excerpt = $el.find('p').first().text().trim() || '';
    const img = $el.find('img').first().attr('src') || '';

    if (title) {
      items.push({ id: `import-${i}-${Date.now()}`, title, href, date, excerpt, image: img });
    }
  });

  // If still empty, try scanning linked list in the main container
  if (items.length === 0) {
    const links = $('main a, #content a, .entry a').slice(0, 20);
    links.each((i, a) => {
      const $a = $(a);
      const title = $a.text().trim();
      const href = $a.attr('href') || '';
      if (title) items.push({ id: `link-${i}-${Date.now()}`, title, href, date: '', excerpt: '', image: '' });
    });
  }

  const outDir = path.resolve(__dirname, '..', 'src', 'data');
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, 'news.json');
  await fs.writeFile(outFile, JSON.stringify(items, null, 2), 'utf8');
  console.log('Wrote', outFile, 'with', items.length, 'items');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
