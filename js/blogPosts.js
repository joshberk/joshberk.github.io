let blogPosts = [];
let postsPromise = null;

async function fetchBlogPosts() {
  if (blogPosts.length) {
    return blogPosts;
  }
  if (!postsPromise) {
    postsPromise = fetch('/blog/posts.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        blogPosts = data;
        return blogPosts;
      })
      .catch((err) => {
        console.error('Error loading blog posts:', err);
        blogPosts = [];
        return blogPosts;
      });
  }
  return postsPromise;
}

async function getLatestPosts(count = 3) {
  await fetchBlogPosts();
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

async function updatePostCounts() {
  await fetchBlogPosts();
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
