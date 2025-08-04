const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

test('index.html includes expected title', async () => {
  const filePath = path.join(__dirname, '..', 'index.html');
  const content = await fs.readFile(filePath, 'utf8');
  assert.match(
    content,
    /<title>Joshua Offe Berkoh \| Cryptography & Cybersecurity<\/title>/,
  );
});
