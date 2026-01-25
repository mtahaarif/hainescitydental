const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const NEWS_JSON = path.join(process.cwd(), 'src', 'data', 'news.json');
const PUBLIC_NEWS = path.join(process.cwd(), 'public', 'news');
const EXTRACTED_UPLOADS = 'E:/hainescitydental/extracted/wp-content/uploads';
const TARGET_TITLE = '2019 Christmas Party at the Disney Springs';

if (!fs.existsSync(NEWS_JSON)) {
  console.error('news.json not found at', NEWS_JSON);
  process.exit(1);
}
let items = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));

const filesInPublic = fs.existsSync(PUBLIC_NEWS) ? fs.readdirSync(PUBLIC_NEWS) : [];

function findPublicMatch(base) {
  if (!base) return null;
  const b = base.toLowerCase();
  for (const f of filesInPublic) {
    const lf = f.toLowerCase();
    if (lf === b || lf.endsWith(b) || lf.includes(b)) return f;
  }
  return null;
}

function findInExtracted(base) {
  let found = null;
  const baseLower = base.toLowerCase();
  const variants = new Set([baseLower]);
  try { variants.add(decodeURIComponent(baseLower)); } catch(e){}
  variants.add(baseLower.replace(/(-\d+x\d+)(?:-[^.]*)?(?=\.[^.]+$)/, ''));
  variants.add(baseLower.replace(/-scaled(?=\.[^.]+$)/, ''));
  variants.add(baseLower.split('-')[0]);

  function walk(dir) {
    if (found) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { walk(p); if (found) return; }
      else if (e.isFile()) {
        const name = e.name.toLowerCase();
        for (const v of variants) {
          if (name === v || name.endsWith(v) || name.includes(v)) { found = p; return; }
        }
        for (const ext of ['.jpg','.jpeg','.png','.webp']) {
          if (baseLower.indexOf(ext) !== -1) {
            const idx = baseLower.indexOf(ext);
            const root = baseLower.slice(0, idx + ext.length);
            if (name === root || name.endsWith(root)) { found = p; return; }
          }
        }
      }
    }
  }
  walk(EXTRACTED_UPLOADS);
  return found;
}

const item = items.find(i => (i.title||'').trim() === TARGET_TITLE);
if (!item) { console.error('Item not found:', TARGET_TITLE); process.exit(2); }

const $ = cheerio.load(item.html || '', { decodeEntities: false });
const srcs = $('img').toArray().map(el => $(el).attr('src') || $(el).attr('data-src') || '').filter(Boolean);
const resolved = [];
for (let src of srcs) {
  const base = path.basename((src||'').split('?')[0]);
  let match = findPublicMatch(base);
  if (!match) {
    const strip = base.replace(/(-\d+x\d+)(?:-[^.]*)?(?=\.[^.]+$)/, '');
    match = findPublicMatch(strip);
  }
  if (!match) {
    const found = findInExtracted(base);
    if (found) {
      const destName = path.basename(found);
      const dest = path.join(PUBLIC_NEWS, destName);
      try {
        fs.mkdirSync(PUBLIC_NEWS, { recursive: true });
        fs.copyFileSync(found, dest);
        filesInPublic.push(destName);
        match = destName;
        console.log('Copied from extracted:', found, '->', dest);
      } catch (e) { console.warn('Copy failed', found, e.message); }
    }
  }
  if (match) {
    const web = `/news/${match}`;
    if (!resolved.includes(web)) resolved.push(web);
  } else {
    console.warn('No match for', base, '— keeping remote URL');
    if (!resolved.includes(src)) resolved.push(src);
  }
}

if (resolved.length) {
  item.images = resolved;
  if (!item.image) item.image = resolved[0];
  fs.writeFileSync(NEWS_JSON, JSON.stringify(items, null, 2), 'utf8');
  console.log('Updated item images with', resolved.length, 'entries');
  resolved.forEach(r => console.log('  ', r));
  process.exit(0);
} else {
  console.log('No images resolved for item.');
  process.exit(0);
}
