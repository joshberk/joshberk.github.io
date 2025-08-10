/*
 * Main JavaScript file for interactivity on the portfolio site.
 *
 * This script adds a scroll effect on the navigation bar, toggles the
 * mobile menu, closes the menu when a navigation link is clicked and
 * highlights the active navigation item based on scroll position. It
 * intentionally avoids any external libraries to remain self contained
 * and lightweight.
 */

/**
 * Populate the footer with the current year.
 */
function insertCurrentYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

/**
 * Initialize the expandable About Me section functionality.
 */
function initializeAboutExpander() {
  const expandableContent = document.getElementById('about-expandable');
  const toggleButton = document.getElementById('read-more-btn');

  if (!expandableContent || !toggleButton) {
    console.warn('Read more elements not found:', {
      expandableContent: !!expandableContent,
      toggleButton: !!toggleButton
    });
    return;
  }

  const toggleText = toggleButton.querySelector('.read-more-text');
  const toggleIcon = toggleButton.querySelector('.read-more-icon');

  if (!toggleText || !toggleIcon) {
    console.warn('Toggle button child elements not found:', {
      toggleText: !!toggleText,
      toggleIcon: !!toggleIcon
    });
    return;
  }

  let isExpanded = false;

  function toggleExpansion() {
    isExpanded = !isExpanded;

    if (isExpanded) {
      expandableContent.hidden = false;
      expandableContent.classList.add('expanded');
      toggleText.textContent = 'Read Less';
      toggleIcon.textContent = '▲';
      toggleButton.setAttribute('aria-expanded', 'true');
    } else {
      expandableContent.hidden = true;
      expandableContent.classList.remove('expanded');
      toggleText.textContent = 'Read More';
      toggleIcon.textContent = '▼';
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  }

  toggleButton.addEventListener('click', toggleExpansion);
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-controls', 'about-expandable');
  expandableContent.hidden = true;
}


document.addEventListener('DOMContentLoaded', function () {
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.navbar ul');
// Select only navigation links within the menu list, excluding brand links
const navLinks = document.querySelectorAll('.navbar ul li a');
const hamburger = document.querySelector('.hamburger');
const sections = document.querySelectorAll('main section');

// Mark the top section as active on initial load
const heroLink = document.querySelector('.navbar a[href="#hero"]');
if (heroLink && document.getElementById('hero')) {
  heroLink.classList.add('active');
}

insertCurrentYear();

// Render latest blog posts if container exists
if (typeof renderLatestPosts === 'function') {
  renderLatestPosts();
} else {
  console.warn('renderLatestPosts function not found. Check if blogPosts.js is loaded.');
}

// Initialize expandable About section
initializeAboutExpander();

// Add background and shadow when scrolled beyond a certain amount
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger && navMenu) {
  // Ensure the button points to the navigation menu for accessibility
  hamburger.setAttribute('aria-controls', navMenu.id);

  // Toggle the mobile navigation menu
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close the mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// IntersectionObserver to highlight the active navigation link
if ('IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          const targetId = link.getAttribute('href').substring(1);
          if (targetId === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// --------------------------------------------------
// Theme Toggle Functionality
//
// Allow visitors to switch between light and dark modes. The
// interface uses a simple button in the navigation bar. When
// clicked, the button toggles the `data-theme` attribute on the
// document element, updates its own icon and accessible label, and
// persists the choice in localStorage so it remains consistent
// across page loads.
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  /**
   * Apply the requested theme to the document and adjust the
   * toggle button accordingly.
   *
   * @param {string} theme Either 'light' or 'dark'
   */
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      // Set a data attribute so CSS selectors can apply dark variables
      document.documentElement.setAttribute('data-theme', 'dark');
      // Display a sun icon to indicate a return to light mode is possible
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to day mode');
    } else {
      // Remove the attribute to fall back to the default (light) theme
      document.documentElement.removeAttribute('data-theme');
      // Display a moon icon to indicate a switch to dark mode is possible
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to night mode');
    }
  };

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

  const savedTheme = safeGet('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
    themeToggle.setAttribute('aria-pressed', savedTheme === 'dark' ? 'true' : 'false');
  } else {
    applyTheme('light');
    themeToggle.setAttribute('aria-pressed', 'false');
  }


  themeToggle.addEventListener('click', () => {
    const next = themeToggle.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    applyTheme(next);
    if (!safeSet('theme', next)) {
      applyTheme('light');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  });
}

});

