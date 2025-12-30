/**
 * Main JavaScript for Joshua Berkoh's Jekyll site with Hacker theme
 * Preserves core functionality while adapting to Jekyll structure
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize theme functionality
  initializeTheme();

  // Initialize any terminal-like effects
  initializeTerminalEffects();

  // Initialize scroll effects for any navigation if present
  initializeScrollEffects();

  // Add current year to footer
  insertCurrentYear();

  // Initialize blog page functionality
  initializeBlogFilters();
  initializeBlogViewToggle();
});

/**
 * Theme toggle functionality - adapted for hacker theme
 */
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
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

  // Initialize theme from localStorage or default
  const savedTheme = safeGet('theme') || 'dark'; // Default to dark for hacker theme
  applyTheme(savedTheme);
  themeToggle.setAttribute('aria-pressed', savedTheme === 'light' ? 'true' : 'false');

  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    const current = themeToggle.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
    applyTheme(next);
    safeSet('theme', next);
  });
}

/**
 * Terminal-like typing effects and cursor animations
 */
function initializeTerminalEffects() {
  // Add cursor effect to specific elements
  const elements = document.querySelectorAll('.terminal-text, .typing-effect');
  elements.forEach(element => {
    element.classList.add('cursor');
  });
  
  // Typewriter effect for hero text
  const heroTitle = document.querySelector('.hero-section h1');
  if (heroTitle && heroTitle.textContent) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('cursor');
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          heroTitle.classList.remove('cursor');
        }, 2000);
      }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }
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
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
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
 * Matrix-like digital rain effect (optional enhancement)
 */
function initializeMatrixEffect() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  const matrixArray = matrix.split("");
  
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = [];
  
  for(let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    
    for(let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 35);
  
  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/**
 * Terminal command simulation for interactive elements
 */
function initializeTerminalCommands() {
  const terminal = document.querySelector('.terminal');
  if (!terminal) return;

  const commands = {
    'help': 'Available commands: about, skills, contact, blog, clear',
    'about': 'PhD candidate in Information Technology focusing on applied cryptography',
    'skills': 'Python, JavaScript, Rust, Cryptography, Security Analysis',
    'blog': 'Visit /blog for latest posts on cryptography and cybersecurity',
    'clear': ''
  };

  const input = terminal.querySelector('.terminal-input');
  const output = terminal.querySelector('.terminal-output');

  if (!input || !output) return;

  const sanitizeHTML = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.toLowerCase().trim();
      const response = commands[command] || `Command not found: ${command}. Type 'help' for available commands.`;

      if (command === 'clear') {
        output.innerHTML = '';
      } else {
        output.innerHTML += `<div class="terminal-line">$ ${sanitizeHTML(input.value)}</div>`;
        if (response) {
          output.innerHTML += `<div class="terminal-response">${sanitizeHTML(response)}</div>`;
        }
      }

      input.value = '';
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
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
  const threatDetectionNotice = document.getElementById('threat-detection-notice');

  if (!filterButtons.length || !posts.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show/hide category notices
      if (cryptographyNotice) {
        cryptographyNotice.style.display = filter === 'cryptography' ? 'block' : 'none';
      }
      if (threatDetectionNotice) {
        threatDetectionNotice.style.display = filter === 'threat-detection' ? 'block' : 'none';
      }

      // Filter posts
      let visibleCount = 0;

      posts.forEach(post => {
        const category = post.dataset.category || '';
        const tags = post.dataset.tags || '';

        const matchesFilter =
          filter === 'all' ||
          category.toLowerCase().includes(filter.toLowerCase()) ||
          tags.toLowerCase().includes(filter.toLowerCase());

        if (matchesFilter) {
          post.classList.remove('hidden');
          post.style.display = '';
          visibleCount++;
        } else {
          post.classList.add('hidden');
          post.style.display = 'none';
        }
      });

      // Update visible count
      if (visibleCountEl) {
        visibleCountEl.textContent = visibleCount;
      }

      // Show/hide no posts message
      if (noPostsMessage) {
        noPostsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      // Re-trigger animations
      posts.forEach((post, index) => {
        if (!post.classList.contains('hidden')) {
          post.style.animation = 'none';
          post.offsetHeight; // Trigger reflow
          post.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.05}s`;
        }
      });
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
  const savedView = localStorage.getItem('blogView') || 'grid';
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
