const test = require('node:test');
const assert = require('node:assert/strict');

const { updatePostCounts, blogPosts } = require('../js/blogPosts.js');

test('updatePostCounts sets correct text for each discipline card', () => {
  const counts = {
    Cryptography: blogPosts.filter(p => p.discipline === 'Cryptography').length,
    'Malware Reverse Engineering': 0,
    OSINT: 0,
    Others: 0
  };

  function makeCard(title) {
    const h3 = { textContent: title };
    const countElement = { textContent: '' };
    return {
      querySelector(selector) {
        if (selector === 'h3') return h3;
        if (selector === '.post-count') return countElement;
        return null;
      }
    };
  }

  const cards = [
    makeCard('Cryptography'),
    makeCard('Malware Reverse Engineering'),
    makeCard('OSINT'),
    makeCard('Others')
  ];

  global.document = {
    querySelectorAll() {
      return cards;
    }
  };

  updatePostCounts();

  assert.equal(cards[0].querySelector('.post-count').textContent, `${counts.Cryptography} posts`);
  assert.equal(cards[1].querySelector('.post-count').textContent, 'Coming soon');
  assert.equal(cards[2].querySelector('.post-count').textContent, 'Coming soon');
  assert.equal(cards[3].querySelector('.post-count').textContent, 'Coming soon');

  delete global.document;
});
