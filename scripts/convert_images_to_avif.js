const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
  const avifPath = filePath.replace(ext, '.avif');
  if (fs.existsSync(avifPath)) return;
  try {
    await sharp(filePath)
      .avif({ quality: 60 })
      .toFile(avifPath);
    console.log('Created', path.relative(PUBLIC_DIR, avifPath));
  } catch (err) {
    console.error('Failed', filePath, err.message);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const name of list) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      // skip node_modules or .git
      if (name === 'node_modules' || name === '.git') continue;
      walk(full);
    } else {
      convertFile(full);
    }
  }
}

(async function main(){
  console.log('Scanning', PUBLIC_DIR);
  walk(PUBLIC_DIR);
})();
