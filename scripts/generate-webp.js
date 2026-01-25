const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'public');
const patterns = [
  'our-practice-*.jpg',
  'banner*.jpg',
];

// widths to generate for responsive srcset
const widths = [480, 768, 1024, 1536];

function globSync(pattern){
  const re = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$', 'i');
  return fs.readdirSync(pub).filter(f => re.test(f));
}

async function convertResponsive(file){
  const infile = path.join(pub, file);
  const ext = path.extname(file);
  const name = path.basename(file, ext);

  for(const w of widths){
    const outJpg = path.join(pub, `${name}-${w}.jpg`);
    const outWebp = path.join(pub, `${name}-${w}.webp`);
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
  for(const pat of patterns){
    const files = globSync(pat);
    for(const f of files) await convertResponsive(f);
  }
}

run();
