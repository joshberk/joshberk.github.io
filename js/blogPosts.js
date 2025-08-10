const blogPosts = [
  {
    title: "Week 1: Foundational Encryption Concepts",
    url: "blog/cryptography/week-1-foundational-encryption-concepts.html",
    date: "2025-08",
    discipline: "Cryptography",
    description: "An accessible introduction to key cryptographic concepts, covering encryption, decryption and the differences between symmetric and asymmetric schemes.",
    type: "Study Notes"
  },
  {
    title: "Pivoting to Cryptography With Purpose: Embracing The Rigor",
    url: "blog/cryptography/pivoting-cryptography.html",
    date: "2025-07",
    discipline: "Cryptography",
    description: "Reflections on transitioning into cryptography, exploring the need for rigorous security definitions and mathematical foundations.",
    type: "Reflection"
  }
];

function getLatestPosts(count = 3) {
  return blogPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
}

function renderLatestPosts() {
  const container = document.getElementById('latest-posts-container');
  if (!container) return;

  const latestPosts = getLatestPosts(3);
  
  container.innerHTML = latestPosts.map(post => `
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
  `).join('');
}