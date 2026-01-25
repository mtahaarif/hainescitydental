const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'public');

// widths to generate for responsive srcset
const widths = [480, 768, 1024, 1536];

function isSourceImage(filename){
  return /\.(jpe?g|png)$/i.test(filename) &&
    !/-(480|768|1024|1536)(\.(jpg|jpeg|png|webp))$/i.test(filename) &&
    !/-(\d+x\d+)(\.(jpg|jpeg|png|webp))$/i.test(filename) &&
    !/\.webp$/i.test(filename);
}

function walkDir(dir){
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for(const ent of list){
    const p = path.join(dir, ent.name);
    if(ent.isDirectory()) results.push(...walkDir(p));
    else if(ent.isFile() && isSourceImage(ent.name)) results.push(p);
  }
  return results;
}

async function convertResponsive(infile){
  const ext = path.extname(infile);
  const dir = path.dirname(infile);
  const name = path.basename(infile, ext);

  for(const w of widths){
    const outJpg = path.join(dir, `${name}-${w}.jpg`);
    const outWebp = path.join(dir, `${name}-${w}.webp`);
    try{
      await sharp(infile)
        .resize({ width: w })
        .jpeg({ quality: 80 })
        .toFile(outJpg);
      console.log('Wrote', outJpg);
    }catch(e){
      console.error('Failed JPG', infile, w, e.message);
    }
    try{
      await sharp(infile)
        .resize({ width: w })
        .webp({ quality: 75 })
        .toFile(outWebp);
      console.log('Wrote', outWebp);
    }catch(e){
      console.error('Failed WEBP', infile, w, e.message);
    }
  }
}

async function run(){
  const files = walkDir(pub);
  for(const f of files){
    await convertResponsive(f);
  }
}

run();
