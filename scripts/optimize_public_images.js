#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..', 'public');
if (!fs.existsSync(root)) { console.error('public folder not found'); process.exit(1); }

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full));
    else files.push(full);
  }
  return files;
}

(async function(){
  const all = walk(root);
  // target large bitmap images (jpg, png)
  const targets = all.filter(f => /\.(jpe?g|png)$/i.test(f)).map(f => ({ path: f, size: fs.statSync(f).size }));
  targets.sort((a,b)=>b.size-a.size);

  console.log('Found', targets.length, 'jpg/png files; optimizing largest first');

  let converted = 0;
  for (const t of targets) {
    if (t.size < 150 * 1024) continue; // skip small files
    const dir = path.dirname(t.path);
    const base = path.basename(t.path, path.extname(t.path));
    const avifPath = path.join(dir, base + '.avif');
    const webpPath = path.join(dir, base + '.webp');
    const bakPath = t.path + '.bak';

    try {
      // create backup if not exists
      if (!fs.existsSync(bakPath)) fs.copyFileSync(t.path, bakPath);

      // generate avif if missing
      if (!fs.existsSync(avifPath)) {
        await sharp(t.path).avif({ quality: 60 }).toFile(avifPath);
        console.log('Created AVIF:', path.relative(root, avifPath));
        converted++;
      }

      // generate webp if missing
      if (!fs.existsSync(webpPath)) {
        await sharp(t.path).webp({ quality: 70 }).toFile(webpPath);
        console.log('Created WEBP:', path.relative(root, webpPath));
        converted++;
      }

      // recompress original to reduce size (overwrite) but keep backup
      const meta = await sharp(t.path).metadata();
      if (meta.format === 'jpeg') {
        await sharp(t.path).jpeg({ quality: 80, mozjpeg: true }).toFile(t.path + '.tmp');
        fs.renameSync(t.path + '.tmp', t.path);
        console.log('Recompressed JPG:', path.relative(root, t.path));
      } else if (meta.format === 'png') {
        // for png, create optimized PNG via webp/avif; keep original but try pngquant-like compress via sharp png compression
        await sharp(t.path).png({ quality: 80, compressionLevel: 9 }).toFile(t.path + '.tmp');
        fs.renameSync(t.path + '.tmp', t.path);
        console.log('Recompressed PNG:', path.relative(root, t.path));
      }

    } catch (e) {
      console.error('Error optimizing', t.path, e.message);
    }
  }

  console.log('Optimization complete. Converted/created assets count:', converted);
  process.exit(0);
})();
