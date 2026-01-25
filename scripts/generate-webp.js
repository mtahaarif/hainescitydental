const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'public');
const patterns = [
  'our-practice-*.jpg',
  'banner*.jpg',
];

function globSync(pattern){
  const re = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$', 'i');
  return fs.readdirSync(pub).filter(f => re.test(f));
}

async function convert(file){
  const infile = path.join(pub, file);
  const out = path.join(pub, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  try{
    await sharp(infile).webp({ quality: 75 }).toFile(out);
    console.log('Wrote', out);
  }catch(e){
    console.error('Failed', infile, e.message);
  }
}

async function run(){
  for(const pat of patterns){
    const files = globSync(pat);
    for(const f of files) await convert(f);
  }
}

run();
