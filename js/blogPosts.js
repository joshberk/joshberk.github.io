const blogPosts = [

  {
    title: "Week 2 - The Birth of Modern Security",
    url: "blog/cryptography/week-2-the_birth_of_modern_security.html",
    date: "2025-08-11",
    discipline: "Cryptography",
    description: "My second week's dive into cryptography, exploring the transition from classical ciphers to modern security. This post unpacks Kerckhoffs's Principle, attack models, and why mathematical rigor is essential.",
    type: "Study Notes"
  },
  {
    title: "Week 1: Foundational Encryption Concepts",
    url: "blog/cryptography/week-1-foundational-encryption-concepts.html",
    date: "2025-08-01",
    discipline: "Cryptography",
    description: "An accessible introduction to key cryptographic concepts, covering encryption, decryption and the differences between symmetric and asymmetric schemes.",
    type: "Study Notes"
  },
  {
    title: "Pivoting to Cryptography With Purpose: Embracing The Rigor",
    url: "blog/cryptography/pivoting-cryptography.html",
    date: "2025-07-01",
    discipline: "Cryptography",
    description: "Reflections on transitioning into cryptography, exploring the need for rigorous security definitions and mathematical foundations.",
    type: "Reflection"
  }
];

function getLatestPosts(count = 3) {
  return blogPosts
  .sort(function (a, b) { return new Date(b.date) - new Date(a.date); })
  .slice(0, count);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
}

function getPostCountByDiscipline(discipline) {
  return blogPosts.filter(function(post) {
    return post.discipline === discipline;
  }).length;
}

function updatePostCounts() {
  const disciplines = {
    'Cryptography': getPostCountByDiscipline('Cryptography'),
    'Malware Reverse Engineering': getPostCountByDiscipline('Malware Reverse Engineering'),
    'OSINT': getPostCountByDiscipline('OSINT'),
    'Others': getPostCountByDiscipline('Others')
  };

  Object.keys(disciplines).forEach(function(discipline) {
    const cards = document.querySelectorAll('.discipline-card');
    cards.forEach(function(card) {
      const title = card.querySelector('h3');
      if (title && title.textContent.trim() === discipline) {
        const countElement = card.querySelector('.post-count');
        const count = disciplines[discipline];
        if (countElement) {
          countElement.textContent = count > 0 ? count + ' post' + (count === 1 ? '' : 's') : 'Coming soon';
        }
      }
    });
  });
}

function renderLatestPosts() {
  const container = document.getElementById('latest-blog-container');
  if (!container) {
    console.warn('Latest blog container not found');
    return;
  }

  const latestPosts = getLatestPosts(3);
  
  container.innerHTML = latestPosts.map(function (post) {
    return `
      <article class="post-card">
        <a href="${post.url}">
          <div class="post-meta">
            <span class="post-discipline">${post.discipline}</span>
            <span class="post-type">${post.type}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <time datetime="${post.date}">${formatDate(post.date)}</time>
        </a>
      </article>
    `;
  }).join('');
}
