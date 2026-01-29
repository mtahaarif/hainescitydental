const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const backupDir = path.join(root, 'image_backups');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const e of entries){
    const full = path.join(dir, e.name);
    if(e.isDirectory()) walk(full);
    else if(full.endsWith('.bak')){
      const rel = path.relative(publicDir, full);
      const dest = path.join(backupDir, rel);
      const destDir = path.dirname(dest);
      if(!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.renameSync(full, dest);
      try{ execSync(`git rm -f -- "${full}"`, { stdio: 'ignore' }); }catch(e){ /* ignore */ }
      console.log('Moved', rel);
    }
  }
}
walk(publicDir);
try{ execSync('git add -A && git commit -m "chore: move image .bak backups out of public to reduce bundle" && git push origin optimize-images', { stdio: 'inherit' }); }catch(e){ console.error('commit/push failed', e.message); }
