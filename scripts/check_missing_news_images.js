const fs = require('fs');
const path = require('path');
const root = process.cwd();
const jsonPath = path.join(root, 'src', 'data', 'news.json');
if (!fs.existsSync(jsonPath)) {
  console.error('news.json not found:', jsonPath);
  process.exit(2);
}
const raw = fs.readFileSync(jsonPath, 'utf8');
let parsed;
try {
  parsed = JSON.parse(raw);
} catch (e) {
  console.error('Failed to parse news.json:', e.message);
  process.exit(2);
}
const imgs = new Set();
parsed.forEach(it => {
  if (it.images && Array.isArray(it.images)) it.images.forEach(i => imgs.add(i.replace(/^\//, '')));
  if (it.image) imgs.add(it.image.replace(/^\//, ''));
});
const missing = [];
for (const i of imgs) {
  const full = path.join(root, 'public', i);
  if (!fs.existsSync(full)) missing.push(i);
}
console.log('MISSING_COUNT:', missing.length);
missing.forEach(m => console.log('MISSING:', m));

if (missing.length) process.exit(1);
process.exit(0);
