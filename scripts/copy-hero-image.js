const fs = require('fs');
const path = require('path');

const src = 'E:\\hainescitydental\\extracted\\wp-content\\uploads\\2023\\12\\55.jpg';
const destDir = path.join(__dirname, '..', 'public', 'images');
const dest = path.join(destDir, '55.jpg');

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }

try {
  ensureDir(destDir);
  fs.copyFileSync(src, dest);
  console.log('Copied', src, '->', dest);
} catch (err) {
  console.error('Failed to copy image:', err.message);
  process.exit(1);
}
