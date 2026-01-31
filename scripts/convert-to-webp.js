const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const mappings = {
  'cosmeticdentistry.webp': 'public/banner01-1536x768.jpg',
  'generaldentisry.webp': 'public/banner02-1536x768.jpg',
  'implantdentistry.webp': 'public/banner03-1536x768.jpg',
  'periodontaltherapy.webp': 'public/banner04-1536x736.jpg',
  'sedationdentistry.webp': 'public/banner05-1536x768.jpg',
  'orthodontics.webp': 'public/our-practice-1-1536.jpg',
  'repositionsjaw.webp': 'public/our-practice-2-1536.jpg',
};

async function convert() {
  for (const [target, src] of Object.entries(mappings)) {
    const srcPath = path.join(process.cwd(), src);
    const outPath = path.join(process.cwd(), 'public', target);

    if (!fs.existsSync(srcPath)) {
      console.warn(`source not found: ${srcPath}, skipping ${target}`);
      continue;
    }

    try {
      await sharp(srcPath).webp({ quality: 85 }).toFile(outPath);
      console.log(`converted ${src} -> public/${target}`);
    } catch (err) {
      console.error(`failed to convert ${src} -> ${target}:`, err.message || err);
    }
  }
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
