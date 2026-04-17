const CACHE = 'opticart-v4';
const ASSETS = [
  './intro.html',
  './signup.html',
  './screen1.html',
  './screen2.html',
  './screen3.html',
  './screen4.html',
  './missions.html',
  './deals.html',
  './lists.html',
  './recipes.html',
  './profile.html',
  './cart.html',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-maskable.svg',
  './data/grocery.js',
  './data/grocery.json',
  './js/storage.js',
  './js/ai-filter.js',
];

// Install: cache all app shell assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for app shell, network-first for everything else
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isLocal = ASSETS.some(a => url.pathname.endsWith(a.replace('./', '')));

  if (isLocal) {
    // Cache-first for app shell
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  } else {
    // Network-first for external (fonts, CDN)
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
