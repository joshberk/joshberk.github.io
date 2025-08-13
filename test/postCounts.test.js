const test = require('node:test');
const assert = require('node:assert/strict');

const { updatePostCounts, loadBlogPosts } = require('../js/blogPosts.js');

test('updatePostCounts sets correct text for each discipline card', async () => {
  // Mock the fetch for testing
  global.fetch = async () => ({
    ok: true,
    json: async () => [
      {
        title: "Test Post 1",
        url: "blog/cryptography/test1.html",
        date: "2025-08-11",
        discipline: "Cryptography",
        description: "Test post 1",
        type: "Study Notes"
      },
      {
        title: "Test Post 2",
        url: "blog/cryptography/test2.html",
        date: "2025-08-01",
        discipline: "Cryptography",
        description: "Test post 2",
        type: "Study Notes"
      },
      {
        title: "Test Post 3",
        url: "blog/cryptography/test3.html",
        date: "2025-07-01",
        discipline: "Cryptography",
        description: "Test post 3",
        type: "Reflection"
      }
    ]
  });

  const counts = {
    Cryptography: 3,
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

  await updatePostCounts();

  assert.equal(cards[0].querySelector('.post-count').textContent, `${counts.Cryptography} posts`);
  assert.equal(cards[1].querySelector('.post-count').textContent, 'Coming soon');
  assert.equal(cards[2].querySelector('.post-count').textContent, 'Coming soon');
  assert.equal(cards[3].querySelector('.post-count').textContent, 'Coming soon');

  delete global.document;
  delete global.fetch;
});
