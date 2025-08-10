const fs = require('fs');
const path = require('path');

// Files to update with basic CSP
const htmlFiles = [
  'index.html',
  'blog.html',
  path.join('blog', 'cryptography', 'pivoting-cryptography.html'),
  path.join('blog', 'cryptography', 'week-1-foundational-encryption-concepts.html')
];

// Simple CSP that allows self-hosted scripts to work
const cspPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://www.google-analytics.com",
  "img-src 'self' https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "object-src 'none'",
  "base-uri 'self'"
].join('; ');

console.log('Generated Basic CSP Policy:');
console.log(cspPolicy);
console.log('\n');

// Update HTML files
htmlFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.log(`Warning: ${file} not found, skipping...`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Update CSP meta tag
  content = content.replace(
    /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)("\s*\/?>)/,
    `$1${cspPolicy}$3`
  );

  // Remove any nonce attributes from script tags
  content = content.replace(/\s*nonce="[^"]*"/g, '');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});

console.log('\n✓ Applied basic CSP policy');
console.log('✓ Removed all nonce attributes');
console.log('\nNOTE: This uses unsafe-inline for compatibility but is less secure than hash/nonce approaches.');