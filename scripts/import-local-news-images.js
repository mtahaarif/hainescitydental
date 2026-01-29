const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '..');
const EXTRACTED_ROOT = 'E:/hainescitydental/extracted/wp-content/uploads';
const PUBLIC_NEWS = path.join(SITE_ROOT, 'public', 'news');
const NEWS_JSON = path.join(SITE_ROOT, 'src', 'data', 'news.json');

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

function basenameNoSize(filename) {
  // remove WP size suffixes like -1024x768, -300x225, -scaled, -1, etc
  return filename.replace(/(-\d+x\d+)|(-scaled)|(-\d+)(?=\.)/g, '');
}

if (!fs.existsSync(EXTRACTED_ROOT)) {
  console.error('Extracted uploads folder not found:', EXTRACTED_ROOT);
  process.exit(1);
}

if (!fs.existsSync(NEWS_JSON)) {
  console.error('news.json not found at', NEWS_JSON);
  process.exit(1);
}

if (!fs.existsSync(PUBLIC_NEWS)) fs.mkdirSync(PUBLIC_NEWS, { recursive: true });

const allFiles = walk(EXTRACTED_ROOT).map(p => ({
  p,
  name: path.basename(p),
  stat: fs.statSync(p)
}));

const news = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));

function findBestMatch(remoteName) {
  const target = basenameNoSize(remoteName).toLowerCase();
  // find candidates whose basename without size equals target (case-insensitive)
  const candidates = allFiles.filter(f => basenameNoSize(f.name).toLowerCase() === target);
  if (candidates.length === 0) return null;
  // choose by largest file size
  candidates.sort((a, b) => b.stat.size - a.stat.size);
  return candidates[0];
}

function ensureCopied(match) {
  if (!match) return null;
  const dest = path.join(PUBLIC_NEWS, match.name);
  if (!fs.existsSync(dest)) fs.copyFileSync(match.p, dest);
  return '/news/' + match.name;
}

// collect all referenced filenames from image, images[], and html URLs
const referenced = new Set();
for (const item of news) {
  if (item.image) referenced.add(path.basename(item.image));
  if (Array.isArray(item.images)) item.images.forEach(i => referenced.add(path.basename(i)));
  if (item.html) {
    // extract filenames from href/src/srcset
    const re = /uploads\/[0-9]{4}\/[0-9]{2}\/([^\"'>\s]+)/g;
    let m;
    while ((m = re.exec(item.html))) referenced.add(m[1]);
  }
}

const map = {};
for (const fname of referenced) {
  const match = findBestMatch(fname);
  if (match) {
    const local = ensureCopied(match);
    map[fname] = local;
    console.log('Copied', match.p, '->', local);
  } else {
    console.warn('No local match for', fname);
  }
}

// update news.json entries
for (const item of news) {
  if (item.image) {
    const b = path.basename(item.image);
    if (map[b]) item.image = map[b];
  }
  if (Array.isArray(item.images)) {
    item.images = item.images.map(i => {
      const b = path.basename(i);
      return map[b] || i;
    });
  }
  if (item.html) {
    // replace remote uploads urls with local /news/
    item.html = item.html.replace(/https?:\/\/[\w\.\-]+\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/([^\"'>\s]+)/g, (m, f) => {
      return map[f] || ('/news/' + f);
    });
  }
}

fs.writeFileSync(NEWS_JSON, JSON.stringify(news, null, 2));
console.log('Updated', NEWS_JSON);
console.log('Done.');
