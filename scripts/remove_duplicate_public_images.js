#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..', 'public');
if (!fs.existsSync(root)) {
  console.error('public directory not found');
  process.exit(1);
}

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

const all = walk(root);
const map = new Map();
for (const f of all) {
  const name = path.basename(f);
  if (!map.has(name)) map.set(name, []);
  map.get(name).push(f);
}

const duplicates = [];
for (const [name, paths] of map.entries()) {
  if (paths.length > 1) duplicates.push({ name, paths });
}

if (duplicates.length === 0) {
  console.log('No duplicate filenames found in public/');
  process.exit(0);
}

console.log(`Found ${duplicates.length} duplicated filenames. Processing...`);
let removed = 0;
for (const d of duplicates) {
  // choose the path with the greatest depth (most specific) to keep
  const sorted = d.paths.slice().sort((a,b)=>{
    const da = a.split(path.sep).length;
    const db = b.split(path.sep).length;
    if (da !== db) return db - da; // deeper first
    return a.localeCompare(b);
  });
  const keeper = sorted[0];
  const toRemove = sorted.slice(1);
  console.log(`Keeping: ${path.relative(root, keeper)}  (for ${d.name})`);
  for (const rem of toRemove) {
    try {
      console.log('Removing duplicate:', path.relative(root, rem));
      // use git rm if tracked, else fs.unlink
      try {
        execSync(`git rm -f -- "${rem}"`, { stdio: 'inherit' });
      } catch (gitErr) {
        try { fs.unlinkSync(rem); console.log('Unlinked', rem); } catch (e) { console.error('Failed to remove', rem, e.message); }
      }
      removed++;
    } catch (e) {
      console.error('Error removing', rem, e.message);
    }
  }
}

console.log(`Finished. Removed ${removed} files.`);
if (removed > 0) {
  try { execSync('git commit -m "chore: remove duplicate public images to reduce bundle size"', { stdio: 'inherit' });
    execSync('git push origin optimize-images', { stdio: 'inherit' });
  } catch (e) {
    console.error('Git commit/push failed:', e.message);
  }
}
