const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const DEST = path.join(__dirname, 'dist');

// 不需要复制进发布目录的文件/文件夹
const IGNORE = new Set([
  '.git', '.github', 'node_modules', 'dist',
  'package.json', 'package-lock.json', 'edgeone.json', 'build.js'
]);

function walk(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    if (IGNORE.has(name)) continue;
    const s = path.join(src, name);
    const d = path.join(dest, name);
    const st = fs.statSync(s);
    if (st.isDirectory()) {
      walk(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

walk(SRC, DEST);
console.log('✓ Static files copied to dist/');
