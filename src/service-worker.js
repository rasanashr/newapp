const CACHE_VERSION = 'v1';
const CACHE_NAME = `rasanashr-cache-${CACHE_VERSION}`;

const ASSETS_TO_PRECACHE = [
    '/',
    '/offline',
    '/manifest.json',
    '/favicon.png',
    '/logo.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_PRECACHE))
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;

    // فقط درخواست‌های GET را کش میکنیم
    if (request.method !== 'GET') return;

    // کش APIها
    if (request.url.startsWith('https://rooidadha.ir/wp-json/wp/v2 ')) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                const networkFetchPromise = fetch(request).then(networkResponse => {
                    if (!networkResponse.ok) throw new Error('Network response not OK');

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, networkResponse.clone());
                    });

                    return networkResponse;
                });

                return cachedResponse || networkFetchPromise.catch(() => {
                    return caches.match('/offline');
                });
            })
        );
        return;
    }

    // کش HTMLها
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request).catch(() => caches.match(request)).then(response => {
                return response || caches.match('/offline');
            })
        );
        return;
    }

    // کش تصاویر
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                return cachedResponse || fetch(request).then(response => {
                    if (response.ok) {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, response.clone());
                        });
                    }
                    return response;
                });
            })
        );
        return;
    }

    // پیشفرض
    event.respondWith(caches.match(request).then(r => r || fetch(request)));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});