const CACHE_NAME = 'rasa-cache-v2';
const STATIC_CACHE_NAME = 'rasa-static-v2';

// Static assets to cache
const STATIC_ASSETS = [
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.svg'
];

// Check if the request is for content that should be network-first
function isContentRequest(request) {
  return request.mode === 'navigate' || 
         request.url.includes('/api/') || 
         request.url.endsWith('/');
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // For content requests, try network first, then cache
    isContentRequest(event.request) ?
      fetch(event.request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return caches.match(event.request);
          }
          // Cache the new response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
      :
      // For static assets, try cache first, then network
      caches.match(event.request)
        .then(response => {

        // If not in cache, fetch from the network
        return fetch(event.request).then(networkResponse => {
          // Check if we received a valid, same-origin response
          // We should not cache opaque (cross-origin) responses as we can't verify their status
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // If the response is valid, clone it and cache it
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      })
      .catch(() => {
        // If the fetch fails (e.g., user is offline) and it's a navigation request, 
        // serve the offline page from the cache.
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        // For other failed requests (like images, API calls), we don't return anything,
        // letting the browser handle the network error. This prevents the "non-Response" error.
      })
  );
});
