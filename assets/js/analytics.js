/**
 * Google Analytics Initialization
 * Loaded after gtag.js script
 */
(function() {
  'use strict';

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  function gtag() {
    dataLayer.push(arguments);
  }

  // Make gtag globally available
  window.gtag = gtag;

  // Initialize with current timestamp
  gtag('js', new Date());

  // Configure with tracking ID (injected via data attribute)
  var script = document.currentScript || document.querySelector('script[data-ga-id]');
  var gaId = script ? script.getAttribute('data-ga-id') : null;

  if (gaId) {
    gtag('config', gaId);
  }
})();
