const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Files to update with the generated nonce
const files = [
  'index.html',
  'blog.html',
  path.join('blog', 'pivoting-cryptography.html'),
  path.join('blog', 'week-1-foundational-encryption-concepts.html')
];

// Generate a base64 nonce
const nonce = crypto.randomBytes(16).toString('base64');

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');

  // Update CSP meta tag
  content = content.replace(
    /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)("\s*\/?>)/,
    (match, start, cspContent, end) => {
      const updated = cspContent.replace(
        /script-src[^;]*;/,
        `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com;`
      );
      return `${start}${updated}${end}`;
    }
  );

  // Update script tags
  content = content.replace(/<script[^>]*>/g, (tag) => {
    if (tag.includes('nonce=')) {
      return tag.replace(/nonce="[^"]*"/, `nonce="${nonce}"`);
    }
    return tag.replace('<script', `<script nonce="${nonce}"`);
  });

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});

console.log(`Generated nonce: ${nonce}`);
