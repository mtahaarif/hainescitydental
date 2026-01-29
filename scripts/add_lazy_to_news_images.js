const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../src/data/news.json');
let content = fs.readFileSync(file, 'utf8');

// Add loading="lazy" to <img ...> occurrences that do not already have loading= or data-src
const updated = content.replace(/<img(?![^>]*loading=)(?![^>]*data-src)([^>]*?)/gi, '<img loading="lazy"$1');

if (updated === content) {
  console.log('No changes necessary');
  process.exit(0);
}

fs.writeFileSync(file, updated, 'utf8');
console.log('Updated news.json: added loading="lazy" to img tags');
