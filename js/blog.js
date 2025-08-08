// JavaScript for handling blog category filtering and deep linking via query params.
// Reads the `category` parameter from the URL, activates the corresponding
// filter pill and adjusts the page title accordingly.
document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.category-pill');
  const posts = document.querySelectorAll('.blog-card');
  const baseTitle = 'Blog | Joshua Offe Berkoh';

  const filterPosts = (category) => {
    pills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === category || (!category && pill.dataset.category === 'All'));
    });

    posts.forEach(post => {
      const cats = post.dataset.categories ? post.dataset.categories.split(',').map(c => c.trim()) : [];
      if (!category || category === 'All' || cats.includes(category)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });

    if (category && category !== 'All') {
      document.title = `Blog | ${category} | Joshua Offe Berkoh`;
    } else {
      document.title = baseTitle;
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const category = pill.dataset.category;
      const params = new URLSearchParams(window.location.search);
      if (category && category !== 'All') {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      history.replaceState(null, '', newUrl);
      filterPosts(category);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const initial = params.get('category') || 'All';
  filterPosts(initial);
});
