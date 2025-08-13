const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const includeRegex = /<!--#include\s+virtual="([^"]+)"\s*-->/g;

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(includeRegex, (_m, includePath) => {
    const resolved = includePath.startsWith('/')
      ? path.join(root, includePath)
      : path.resolve(path.dirname(file), includePath);
    return fs.readFileSync(resolved, 'utf8');
  });
  fs.writeFileSync(file, content);
  console.log(`Processed ${path.relative(root, file)}`);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'includes', 'scripts', '.git'].includes(entry.name)) continue;
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

walk(root);
