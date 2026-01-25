const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'public');
const files = [
  'our-practice-1.png',
  'our-practice-2.png',
  'our-practice-3.png',
];

async function run(){
  for(const fname of files){
    const infile = path.join(pub, fname);
    if(!fs.existsSync(infile)){
      console.warn('Missing', infile);
      continue;
    }
    const outJpeg = path.join(pub, fname.replace(/\.png$/i, '.jpg'));
    try{
      console.log('Processing', infile, '->', outJpeg);
      await sharp(infile)
        .resize({ width: 1200 })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(outJpeg);
      console.log('Wrote', outJpeg);
    }catch(err){
      console.error('Failed', fname, err);
    }
  }
}

run();
