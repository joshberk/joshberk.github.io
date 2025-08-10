const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Files to update with CSP hashes
const htmlFiles = [
  'index.html',
  'blog.html',
  path.join('blog', 'cryptography', 'pivoting-cryptography.html'),
  path.join('blog', 'cryptography', 'week-1-foundational-encryption-concepts.html')
];

// JavaScript files to generate hashes for
const scriptFiles = [
  'js/analytics.js',
  'js/blogPosts.js',
  'js/main.js'
];

// Generate SHA-256 hash for script content
function generateScriptHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const hash = crypto.createHash('sha256').update(content).digest('base64');
  return `'sha256-${hash}'`;
}

// Generate hashes for all script files
const scriptHashes = scriptFiles.map(file => {
  const hash = generateScriptHash(file);
  console.log(`${file}: ${hash}`);
  return hash;
});

// Build the script-src directive with hashes and strict-dynamic
const scriptSrc = [
  "'self'",
  "'strict-dynamic'",
  ...scriptHashes,
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com"
].join(' ');

// Complete CSP policy
const cspPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "connect-src 'self' https://www.google-analytics.com",
  "img-src 'self' https://www.google-analytics.com",
  "style-src 'self'",
  "object-src 'none'",
  "base-uri 'self'"
].join('; ');

console.log('\nGenerated CSP Policy:');
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

  // Remove nonce attributes from all script tags
  content = content.replace(/\s*nonce="[^"]*"/g, '');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});

console.log('\nCSP implementation complete!');
console.log('✓ Generated SHA-256 hashes for local scripts');
console.log('✓ Added strict-dynamic for better XSS protection');
console.log('✓ Removed all nonce attributes');
console.log('✓ Added object-src and base-uri restrictions');