#!/usr/bin/env node
const fs = require('fs/promises');
const path = require('path');
const fetch = global.fetch || require('node-fetch');
const cheerio = require('cheerio');

async function run() {
  const url = 'https://www.hainescitydental.com/news/';
  console.log('Fetching', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'HainesCityDentalImporter/1.0' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const html = await res.text();

  const $ = cheerio.load(html);

  const items = [];
  // Try several heuristics to collect news items.
  // 1) If the page has multiple <article> elements, treat each as an item.
  let found = false;
  const articleEls = $('article');
  if (articleEls.length > 0) {
    found = true;
    $(articleEls).each((i, el) => {
      const $el = $(el);
      // If the article contains multiple headings, split it into sections
      const headings = $el.find('h1, h2, h3, h4');
      if (headings.length > 1) {
        let current = null;
        // Use the article's entry-content if present, otherwise the article itself
        const container = $el.find('.entry-content, .post-content').first() || $el;
        container.children().each((j, node) => {
          const tag = node.tagName && node.tagName.toLowerCase();
          if (/h[1-6]/i.test(tag)) {
            if (current) items.push(current);
            current = { id: `article-section-${i}-${items.length}-${Date.now()}`, title: $(node).text().trim(), href: '', date: '', excerpt: '', image: '' };
          } else if (current) {
            if (tag === 'p' || tag === 'div') {
              const txt = $(node).text().trim();
              if (txt && !current.excerpt) current.excerpt = txt;
            }
            const imgEl = $(node).find && $(node).find('img').first();
            if (imgEl && imgEl.length && !current.image) {
              let src = imgEl.attr('src') || '';
              try { src = new URL(src, url).toString(); } catch (e) {}
              if (src) current.image = src;
            }
          }
        });
        if (current) items.push(current);
      } else {
        const title = $el.find('h1, h2, h3').first().text().trim();
        const link = $el.find('a').first().attr('href') || '';
        const date = $el.find('time').attr('datetime') || $el.find('.date, .posted-on').text().trim() || '';
        const excerpt = $el.find('p').first().text().trim() || '';
        let img = $el.find('img').first().attr('src') || '';
        if (img) {
          try { img = new URL(img, url).toString(); } catch (e) {}
        }
        if (title) items.push({ id: `article-${i}-${Date.now()}`, title, href: link, date, excerpt, image: img });
      }
    });
  }

  // 2) If the page appears to be a single article that contains many headings/images
  //    (as is the case on the live site snapshot), split the main entry-content by headings.
  if (!found) {
    const container = $('main .entry-content, .entry-content, #main, #content').first();
    if (container && container.length) {
      let current = null;
      container.children().each((i, node) => {
        const tag = node.tagName && node.tagName.toLowerCase();
        if (/h[1-6]/i.test(tag)) {
          // start a new item
          if (current) items.push(current);
          const title = $(node).text().trim();
          current = { id: `section-${items.length}-${Date.now()}`, title, href: '', date: '', excerpt: '', image: '' };
        } else if (current) {
          // accumulate excerpt text
          if (tag === 'p' || tag === 'div') {
            const txt = $(node).text().trim();
            if (txt && !current.excerpt) current.excerpt = txt;
          }
          // collect first image inside this section
          const imgEl = $(node).find && $(node).find('img').first();
          if (imgEl && imgEl.length && !current.image) {
            let src = imgEl.attr('src') || '';
            try { src = new URL(src, url).toString(); } catch (e) {}
            if (src) current.image = src;
          }
        }
      });
      if (current) items.push(current);
    }
  }

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

  // Ensure public/news directory exists and download images
  const publicNews = path.resolve(__dirname, '..', 'public', 'news');
  await fs.mkdir(publicNews, { recursive: true });

  for (let it of items) {
    if (it.image) {
      try {
        const imgUrl = it.image;
        const parsed = new URL(imgUrl);
        const filename = path.basename(parsed.pathname);
        const dest = path.join(publicNews, filename);
        // download if not exists
        try {
          await fs.access(dest);
        } catch (e) {
          console.log('Downloading image', imgUrl);
          const r = await fetch(imgUrl, { headers: { 'User-Agent': 'HainesCityDentalImporter/1.0' } });
          if (r.ok) {
            const buf = Buffer.from(await r.arrayBuffer());
            await fs.writeFile(dest, buf);
          } else {
            console.warn('Image fetch failed', imgUrl, r.status);
          }
        }
        it.image = '/news/' + filename;
      } catch (e) {
        console.warn('Failed processing image', it.image, e && e.message);
        it.image = '';
      }
    }
  }

  await fs.writeFile(outFile, JSON.stringify(items, null, 2), 'utf8');
  console.log('Wrote', outFile, 'with', items.length, 'items');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
