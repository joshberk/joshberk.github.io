document.addEventListener('DOMContentLoaded', () => {
  const filterContainer = document.querySelector('.category-filter');
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

    if (!category || category === 'All') {
      const categories = [...new Set(postsData.map(p => p.category))];
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

  function setActiveCard(category) {
    filterContainer.querySelectorAll('.category-card').forEach(card => {
      const active = card.dataset.category === category || (!category && card.dataset.category === 'All');
      card.setAttribute('aria-pressed', active ? 'true' : 'false');
      card.classList.toggle('active', active);
    });
  }

  filterContainer.addEventListener('click', e => {
    const card = e.target.closest('.category-card');
    if (!card) return;
    e.preventDefault();
    const selected = card.dataset.category;
    const params = new URLSearchParams(window.location.search);

    if (selected && selected !== 'All') {
      params.set('category', selected);
    } else {
      params.delete('category');
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
    history.replaceState(null, '', newUrl);
    setActiveCard(selected);
    renderPosts(selected);
  });

  postsData = Array.isArray(window.posts)
    ? window.posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const params = new URLSearchParams(window.location.search);
  const initial = params.get('category') || 'All';
  setActiveCard(initial);
  renderPosts(initial);
});
