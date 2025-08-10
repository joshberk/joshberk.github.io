const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Generate a cryptographically secure random nonce
function generateSecureNonce() {
  return crypto.randomBytes(32).toString('base64');
}

// Files to update with CSP nonce
const htmlFiles = [
  'index.html',
  'blog.html',
  path.join('blog', 'cryptography', 'pivoting-cryptography.html'),
  path.join('blog', 'cryptography', 'week-1-foundational-encryption-concepts.html')
];

// Generate a new nonce for this build
const nonce = generateSecureNonce();
console.log(`Generated nonce: ${nonce}`);

// Build the CSP policy with the new nonce
const cspPolicy = [
  "default-src 'self'",
  `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com`,
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

  // Update all script tags to use the new nonce
  content = content.replace(
    /<script([^>]*)\ssrc="js\/[^"]*"([^>]*)>/g,
    `<script$1 src="js/main.js" nonce="${nonce}"$2>`
  );

  // Fix the regex to properly handle different script tags
  content = content.replace(
    /<script([^>]*)\ssrc="(js\/[^"]*)"([^>]*)>/g,
    `<script$1 src="$2" nonce="${nonce}"$3>`
  );

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});

console.log(`\n✓ Generated cryptographically secure nonce: ${nonce.substring(0, 8)}...`);
console.log('✓ Updated CSP policies');
console.log('✓ Added nonce attributes to script tags');
console.log('\nNOTE: This nonce should be regenerated for each page request in a real server environment.');