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
const insertCurrentYear = () => {
  document.getElementById('year').textContent = new Date().getFullYear();
};

document.addEventListener('DOMContentLoaded', () => {
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

    // Track whether accessing localStorage is safe
    let storageAvailable = true;

    // On initial load, read the saved preference from localStorage
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch (err) {
      storageAvailable = false;
      applyTheme('light');
      themeToggle.setAttribute('aria-pressed', 'false');
    }

    if (storageAvailable) {
      if (savedTheme) {
        applyTheme(savedTheme);
        themeToggle.setAttribute('aria-pressed', savedTheme === 'dark' ? 'true' : 'false');
      } else {
        // Default to light theme if nothing saved
        applyTheme('light');
        themeToggle.setAttribute('aria-pressed', 'false');
      }
    }

    // Toggle the theme when the user clicks the button
    themeToggle.addEventListener('click', () => {
      const next = themeToggle.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
      themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
      applyTheme(next);
      if (storageAvailable) {
        try {
          localStorage.setItem('theme', next);
        } catch (err) {
          storageAvailable = false;
          applyTheme('light');
          themeToggle.setAttribute('aria-pressed', 'false');
        }
      }
    });
  }
});
