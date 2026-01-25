const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const NEWS_JSON = path.join(process.cwd(), 'src', 'data', 'news.json');
const PUBLIC_NEWS = path.join(process.cwd(), 'public', 'news');

if (!fs.existsSync(NEWS_JSON)) {
  console.error('news.json not found at', NEWS_JSON);
  process.exit(1);
}

const raw = fs.readFileSync(NEWS_JSON, 'utf8');
let items;
try {
  items = JSON.parse(raw);
} catch (e) {
  console.error('Failed to parse news.json:', e.message);
  process.exit(2);
}

const files = fs.existsSync(PUBLIC_NEWS) ? fs.readdirSync(PUBLIC_NEWS) : [];
function matchFileByBase(base) {
  if (!base) return null;
  const b = base.toLowerCase();
  for (const f of files) {
    const lf = f.toLowerCase();
    if (lf === b || lf.endsWith(b) || lf.includes(b)) return f;
  }
  return null;
}

let updated = 0;
for (const it of items) {
  const html = it.html || '';
  const $ = cheerio.load(html, { decodeEntities: false });
  const srcs = $('img')
    .toArray()
    .map((el) => $(el).attr('src') || $(el).attr('data-src') || '')
    .filter(Boolean);

  const found = [];
  for (let src of srcs) {
    const base = path.basename((src || '').split('?')[0]);
    let hit = matchFileByBase(base);
    if (!hit) {
      // try stripping WP size suffixes
      const strip = base.replace(/(-\d+x\d+)(?:-[^.]*)?(?=\.[^.]+$)/, '');
      hit = matchFileByBase(strip);
    }
    if (hit) {
      const web = `/news/${hit}`;
      if (!found.includes(web)) found.push(web);
    }
  }

  if (found.length) {
    it.images = found;
    if (!it.image) it.image = found[0];
    updated++;
  }
}

fs.writeFileSync(NEWS_JSON, JSON.stringify(items, null, 2), 'utf8');
console.log('Updated', updated, 'items in', NEWS_JSON);
process.exit(0);
