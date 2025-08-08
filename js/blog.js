document.addEventListener('DOMContentLoaded', () => {
  const filterCards = document.querySelectorAll('.category-card');
  const postsContainer = document.getElementById('posts');
  let postsData = [];

  function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.tabIndex = 0;

    const title = document.createElement('h3');
    const link = document.createElement('a');
    link.href = post.url;
    link.textContent = post.title;
    title.appendChild(link);

    const date = document.createElement('span');
    date.className = 'post-date';
    date.textContent = post.date;

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = post.category;

    const summary = document.createElement('p');
    summary.textContent = post.summary;

    article.appendChild(title);
    article.appendChild(date);
    article.appendChild(badge);
    article.appendChild(summary);

    return article;
  }

  function renderPosts(category) {
    postsContainer.innerHTML = '';
    if (category === 'All') {
      const categories = ['Cryptography', 'Open Source Intelligence', 'Malware Reverse Engineering', 'Others'];
      categories.forEach(cat => {
        const group = postsData.filter(p => p.category === cat);
        if (group.length) {
          const section = document.createElement('section');
          section.className = 'category-section';

          const heading = document.createElement('h2');
          heading.textContent = cat;
          section.appendChild(heading);

          const list = document.createElement('div');
          list.className = 'blog-list';
          group.forEach(post => list.appendChild(createPostCard(post)));
          section.appendChild(list);

          postsContainer.appendChild(section);
        }
      });
    } else {
      const group = postsData.filter(p => p.category === category);
      const section = document.createElement('section');
      section.className = 'category-section';

      const heading = document.createElement('h2');
      heading.textContent = category;
      section.appendChild(heading);

      if (group.length) {
        const list = document.createElement('div');
        list.className = 'blog-list';
        group.forEach(post => list.appendChild(createPostCard(post)));
        section.appendChild(list);
      } else {
        const msg = document.createElement('p');
        msg.textContent = 'No posts available.';
        section.appendChild(msg);
      }

      postsContainer.appendChild(section);
    }
  }

  filterCards.forEach(card => {
    card.addEventListener('click', () => {
      const selected = card.dataset.category;
      filterCards.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
      card.setAttribute('aria-pressed', 'true');
      renderPosts(selected);
    });
  });

  fetch('assets/data/posts.json')
    .then(res => res.json())
    .then(data => {
      postsData = data;
      renderPosts('All');
    });
});

