// grocery.js — thin loader
// Fetches grocery.json from GitHub Pages and populates window.GROCERY_DB.
// All pages await window.GROCERY_DB_READY before using the data.

(function () {
  const HOSTED_URL =
    'https://cypetee.github.io/opticart_ai/data/grocery.json';

  // Resolve relative path when running locally (same origin)
  const LOCAL_URL = (function () {
    try {
      const base = document.currentScript
        ? document.currentScript.src.replace(/grocery\.js$/, '')
        : window.location.origin + '/data/';
      return base + 'grocery.json';
    } catch (_) {
      return './data/grocery.json';
    }
  })();

  window.GROCERY_DB_READY = fetch(LOCAL_URL)
    .catch(function () { return fetch(HOSTED_URL); })
    .then(function (r) {
      if (!r.ok) throw new Error('Failed to load grocery data: ' + r.status);
      return r.json();
    })
    .then(function (data) {
      window.GROCERY_DB = data;
      return data;
    })
    .catch(function (err) {
      console.error('grocery.js loader error:', err);
      window.GROCERY_DB = { items: [], recipes: [], categories: [] };
      return window.GROCERY_DB;
    });
})();
