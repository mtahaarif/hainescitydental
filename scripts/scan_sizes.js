const fs = require('fs');
const path = require('path');

function walk(dir) {
  const res = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) res.push(...walk(full));
    else res.push(full);
  }
  return res;
}

function human(n){
  if(n<1024) return n+" B";
  if(n<1024*1024) return (n/1024).toFixed(1)+" KB";
  if(n<1024*1024*1024) return (n/1024/1024).toFixed(1)+" MB";
  return (n/1024/1024/1024).toFixed(1)+" GB";
}

const targets = ['public','node_modules','.next'];
const root = process.cwd();
let allFiles=[];
for(const t of targets){
  const p = path.join(root, t);
  if(fs.existsSync(p)){
    try{ allFiles.push(...walk(p)); }catch(e){ console.error('walk fail',p,e.message); }
  }
}
const stats = allFiles.map(f=>({f, size: fs.statSync(f).size}));
stats.sort((a,b)=>b.size-a.size);
console.log('Top 40 largest files in public/node_modules/.next:');
for(let i=0;i<Math.min(40,stats.length);i++){
  console.log(human(stats[i].size).padEnd(10), path.relative(root, stats[i].f));
}

// summarize directories sizes
function dirSize(dir){
  let total=0;
  if(!fs.existsSync(dir)) return 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for(const it of items){
    const full=path.join(dir,it.name);
    if(it.isDirectory()) total+=dirSize(full);
    else total+=fs.statSync(full).size;
  }
  return total;
}
console.log('\nDirectory totals:');
for(const t of targets){
  const p=path.join(root,t);
  if(fs.existsSync(p)){
    console.log(human(dirSize(p)).padEnd(10), t);
  }
}
