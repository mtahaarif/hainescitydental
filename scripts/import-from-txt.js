const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Config — adjust if needed
const TXT_PATH = path.join(process.cwd(), 'wordpressnewspage.txt');
const EXTRACTED_UPLOADS = 'E:/hainescitydental/extracted/wp-content/uploads';
const PUBLIC_NEWS = path.join(process.cwd(), 'public', 'news');
const OUT_JSON = path.join(process.cwd(), 'src', 'data', 'news.json');

if (!fs.existsSync(TXT_PATH)) {
  console.error('wordpressnewspage.txt not found at', TXT_PATH);
  process.exit(2);
}

if (!fs.existsSync(EXTRACTED_UPLOADS)) {
  console.error('Extracted uploads folder not found at', EXTRACTED_UPLOADS);
  process.exit(3);
}

if (!fs.existsSync(PUBLIC_NEWS)) fs.mkdirSync(PUBLIC_NEWS, { recursive: true });

const raw = fs.readFileSync(TXT_PATH, 'utf8');
const $ = cheerio.load(raw, { decodeEntities: false });

const items = [];

// Walk top-level nodes and group by heading
const bodyChildren = $('body').length ? $('body').children().toArray() : $.root().children().toArray();
let current = null;

function pushCurrent() {
  if (!current) return;
  if (!current.title && current.images.length === 0) return;
  // build item
  items.push({
    id: current.id || (`news-${items.length}`),
    title: current.title || `News ${items.length + 1}`,
    date: current.date || '',
    excerpt: current.excerpt || '',
    image: current.images.length ? current.images[0] : '',
    images: current.images,
    html: current.html || '',
  });
  current = null;
}

// helper: find file in extracted uploads by basename (first match)
function findInUploads(base) {
  let found = null;
  const baseLower = base.toLowerCase();
  // generate candidate variants to handle WP responsive suffixes like -1024x768, -300x225, -scaled, etc.
  const variants = new Set();
  variants.add(baseLower);
  try {
    const decoded = decodeURIComponent(baseLower);
    variants.add(decoded);
  } catch (e) {}
  // strip size suffixes: e.g. IMG_1743.jpg-1024x842.jpeg -> IMG_1743.jpg
  const stripSize = baseLower.replace(/(-\d+x\d+)(?:-[^.]*)?(?=\.[^.]+$)/, '');
  variants.add(stripSize);
  // also strip everything after the first dash to handle cases like name-1024x768.jpg
  const firstDash = baseLower.split('-')[0];
  if (firstDash) variants.add(firstDash);
  const walk = (dir) => {
    if (found) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(p);
        if (found) return;
      } else if (e.isFile()) {
        const name = e.name.toLowerCase();
        // match against all variants
        for (const v of variants) {
          if (name === v || name.endsWith(v)) { found = p; return; }
        }
      }
    }
  };
  walk(EXTRACTED_UPLOADS);
  return found;
}

for (const el of bodyChildren) {
  const tag = el.tagName ? el.tagName.toLowerCase() : null;
  if (tag && ['h1','h2','h3','h4','strong','b'].includes(tag)) {
    // new section
    pushCurrent();
    current = { title: $(el).text().trim(), images: [], html: '' };
    continue;
  }

  // images inside current section
  const imgs = $(el).find ? $(el).find('img').toArray() : [];
  if (imgs.length && !current) {
    // create anonymous section if images appear before a heading
    current = { title: '', images: [], html: '' };
  }
  for (const im of imgs) {
    const src = $(im).attr('src') || $(im).attr('data-src') || '';
    if (!src) continue;
    const base = path.basename(src.split('?')[0]);
    // prefer files already present in PUBLIC_NEWS
    const destName = base;
    const publicPath = path.join(PUBLIC_NEWS, destName);
    if (fs.existsSync(publicPath)) {
      const webPath = `/news/${destName}`;
      if (!current.images.includes(webPath)) current.images.push(webPath);
      current.html += $.html(im);
      continue;
    }

    // locate file in extracted uploads
    const found = findInUploads(base);
    if (found) {
      const dest = path.join(PUBLIC_NEWS, destName);
      try {
        fs.copyFileSync(found, dest);
        const webPath = `/news/${destName}`;
        if (!current.images.includes(webPath)) current.images.push(webPath);
        // append HTML for content
        current.html += $.html(im);
        console.log('Copied', found, '->', dest);
      } catch (e) {
        console.warn('Failed to copy', found, e.message);
      }
    } else {
      console.warn('Image not found in extracted uploads:', base);
    }
  }

  // also capture text nodes as excerpt/html when within a current
  if (current) {
    const htmlFragment = $.html(el).trim();
    if (htmlFragment) current.html += htmlFragment;
  }
}

// finalize last section
pushCurrent();

// write JSON
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(items, null, 2), 'utf8');
console.log('Wrote', OUT_JSON, 'with', items.length, 'items');
process.exit(0);
