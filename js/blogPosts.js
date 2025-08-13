let blogPosts = [];
let postsLoaded = false;

async function loadBlogPosts() {
  if (postsLoaded) {
    return blogPosts;
  }
  
  try {
    const response = await fetch('/data/blogPosts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    blogPosts = await response.json();
    postsLoaded = true;
    return blogPosts;
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    // Fallback to empty array to prevent errors
    blogPosts = [];
    postsLoaded = true;
    return blogPosts;
  }
}

async function getLatestPosts(count = 3) {
  await loadBlogPosts();
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

async function getPostCountByDiscipline(discipline) {
  await loadBlogPosts();
  return blogPosts.filter(function(post) {
    return post.discipline === discipline;
  }).length;
}

async function updatePostCounts() {
  const counts = {
    'Cryptography': await getPostCountByDiscipline('Cryptography'),
    'Malware Reverse Engineering': await getPostCountByDiscipline('Malware Reverse Engineering'),
    'OSINT': await getPostCountByDiscipline('OSINT'),
    'Others': await getPostCountByDiscipline('Others')
  };

  const cards = document.querySelectorAll('.discipline-card');
  cards.forEach(function(card) {
    const title = card.querySelector('h3');
    if (!title) return;

    const discipline = title.textContent.trim();
    const countElement = card.querySelector('.post-count');
    if (!countElement) return;

    const count = counts[discipline] || 0;
    countElement.textContent = count > 0 ? count + ' post' + (count === 1 ? '' : 's') : 'Coming soon';
  });
}

async function renderLatestPosts() {
  const container = document.getElementById('latest-blog-container');
  if (!container) {
    console.warn('Latest blog container not found');
    return;
  }

  const latestPosts = await getLatestPosts(3);
  
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

// Exports for testing in Node environments
if (typeof module !== 'undefined') {
  module.exports = { 
    blogPosts, 
    getPostCountByDiscipline, 
    updatePostCounts,
    loadBlogPosts,
    getLatestPosts,
    renderLatestPosts
  };
}
