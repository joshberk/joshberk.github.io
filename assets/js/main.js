/**
 * Main JavaScript for Joshua Berkoh's Jekyll site
 * Handles theme switching, blog filters, and lightweight UI effects.
 */

document.addEventListener('DOMContentLoaded', function () {
  const page = document.body.dataset.page || 'default';

  // Initialize theme functionality
  initializeTheme();

  // Initialize scroll effects for any navigation if present
  initializeScrollEffects();
  initializeMobileNavigation();

  // Add current year to footer
  insertCurrentYear();

  if (page === 'home') {
    initializeTerminalEffects();
  }

  if (page === 'blog') {
    initializeBlogFilters();
    initializeBlogViewToggle();
  }

  // Investigation portfolio: client-side search + status filtering (self-guards if absent)
  initializeInvestigationFilters();
});

/**
 * Investigation portfolio search + status filter.
 * No-ops on pages that do not have the investigation list.
 */
function initializeInvestigationFilters() {
  const list = document.getElementById('investigation-list');
  if (!list) return;

  const cards = Array.from(list.querySelectorAll('.investigation-card'));
  const searchInput = document.getElementById('investigation-search');
  const filterButtons = document.querySelectorAll('[data-inv-filter]');
  const noResults = document.getElementById('inv-no-results');

  let activeFilter = 'all';
  let query = '';

  const apply = () => {
    let visible = 0;
    cards.forEach(card => {
      const status = card.dataset.status || '';
      const haystack = card.dataset.search || '';
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'completed' && status === 'completed') ||
        (activeFilter === 'in-progress' && status !== 'completed');
      const matchesQuery = query === '' || haystack.indexOf(query) !== -1;
      if (matchesFilter && matchesQuery) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });
    if (noResults) noResults.classList.toggle('hidden', visible !== 0);
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      query = e.target.value.toLowerCase().trim();
      apply();
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.invFilter;
      apply();
    });
  });
}

/**
 * Small-screen navigation toggle.
 */
function initializeMobileNavigation() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeNav();
  });
}

/**
 * Theme toggle functionality
 */
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.textContent = 'Light';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
      return;
    }

    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = 'Dark';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  };

  // Safe localStorage operations
  const safeGet = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  };

  const safeSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      return false;
    }
  };

  // Initialize theme from localStorage or default (light is the primary design)
  const savedTheme = safeGet('theme') || 'light';
  applyTheme(savedTheme);
  themeToggle.setAttribute('aria-pressed', savedTheme === 'dark' ? 'true' : 'false');

  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    const current = themeToggle.getAttribute('aria-pressed') === 'true' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    applyTheme(next);
    safeSet('theme', next);
  });
}

/**
 * Terminal-like typing effects and cursor animations
 *
 * The typewriter animates only the static prefix "Hi, I'm " and then
 * re-attaches the existing accent <span> so its CSS styling is preserved.
 * DOM nodes are built with createTextNode (no innerHTML) to prevent XSS.
 */
function initializeTerminalEffects() {
  // Add cursor effect to specific elements
  const elements = document.querySelectorAll('.terminal-text, .typing-effect');
  elements.forEach(element => {
    element.classList.add('cursor');
  });

  // Typewriter effect: animate the prefix, then restore the styled accent span
  const heroTitle = document.querySelector('.hero-section h1');
  if (!heroTitle) return;

  const accentSpan = heroTitle.querySelector('.accent-text');
  if (!accentSpan) return;

  // Capture the prefix text node that precedes the accent span
  const prefix = "Hi, I'm ";

  // Clear the title, preserving the accent span in memory
  heroTitle.innerHTML = '';
  heroTitle.classList.add('cursor');

  let i = 0;
  const typeWriter = () => {
    if (i < prefix.length) {
      // createTextNode prevents any XSS from the prefix string
      heroTitle.appendChild(document.createTextNode(prefix.charAt(i)));
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Re-attach the original styled span and restore normal title state
      heroTitle.appendChild(accentSpan);
      setTimeout(() => heroTitle.classList.remove('cursor'), 2000);
    }
  };

  setTimeout(typeWriter, 1000);
}

/**
 * Scroll effects and navigation highlighting
 */
function initializeScrollEffects() {
  const navbar = document.querySelector('.navbar, nav');
  if (!navbar) return;
  
  // Add scroll effect to navigation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      let target = null;
      try {
        target = document.querySelector(href);
      } catch (err) {
        return;
      }

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Insert current year into footer
 */
function insertCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Blog page filtering functionality
 */
function initializeBlogFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const posts = document.querySelectorAll('.post-card, .featured-post');
  const visibleCountEl = document.getElementById('visible-count');
  const noPostsMessage = document.getElementById('no-posts');
  const cryptographyNotice = document.getElementById('cryptography-notice');

  const setHidden = (el, hidden) => {
    if (!el) return;
    el.classList.toggle('hidden', hidden);
  };

  // Ensure notices are hidden on initial render regardless of CSP inline-style behavior.
  setHidden(cryptographyNotice, true);
  setHidden(noPostsMessage, true);

  if (!filterButtons.length || !posts.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show the cryptography notice as a banner above its posts (series is paused).
      setHidden(cryptographyNotice, filter !== 'cryptography');

      // Filter posts
      let visibleCount = 0;

      posts.forEach(post => {
        const type = post.dataset.type || '';
        const discipline = post.dataset.discipline || '';
        const tags = post.dataset.tags || '';

        const matchesFilter =
          filter === 'all' ||
          type.toLowerCase().includes(filter.toLowerCase()) ||
          discipline.toLowerCase().includes(filter.toLowerCase()) ||
          tags.toLowerCase().includes(filter.toLowerCase());

        if (matchesFilter) {
          post.classList.remove('hidden');
          visibleCount++;
        } else {
          post.classList.add('hidden');
        }
      });

      // Update visible count
      if (visibleCountEl) {
        visibleCountEl.textContent = visibleCount;
      }

      // Show/hide no posts message
      setHidden(noPostsMessage, visibleCount !== 0);
    });
  });
}

/**
 * Blog page view toggle (grid/list)
 */
function initializeBlogViewToggle() {
  const viewButtons = document.querySelectorAll('.view-btn');
  const postsContainer = document.getElementById('posts-container');

  if (!viewButtons.length || !postsContainer) return;

  // Load saved view preference
  let savedView = 'grid';
  try {
    savedView = localStorage.getItem('blogView') || 'grid';
  } catch (e) {
    savedView = 'grid';
  }
  applyView(savedView);

  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;

      // Update active button state
      viewButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Apply view
      applyView(view);

      // Save preference
      try {
        localStorage.setItem('blogView', view);
      } catch (e) {
        // Ignore storage errors
      }
    });
  });

  function applyView(view) {
    if (view === 'list') {
      postsContainer.classList.add('list-view');
    } else {
      postsContainer.classList.remove('list-view');
    }

    // Update active button
    viewButtons.forEach(btn => {
      if (btn.dataset.view === view) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}
