const CACHE_NAME = 'rasa-cache-v1';

// Assets to cache
const ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the resource is in the cache, return it
        if (response) {
          return response;
        }

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
