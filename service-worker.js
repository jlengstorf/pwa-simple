const CACHE_VERSION = 'sample-pwa-v1';
const OFFLINE_IMAGE = './offline.png';
const OFFLINE_PAGE = './offline.html';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // Download all required resources to render the app.
      return cache.addAll([
        './index.html',
        './scripts.js',
        './styles.css',
        OFFLINE_IMAGE,
        OFFLINE_PAGE,
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  const fetchAndCache = request =>
    caches.open(CACHE_VERSION).then(cache =>
      // Load the response from the network.
      fetch(request).then(response => {
        // Add the response to the cache.
        cache.put(request, response.clone());
        return response;
      })
    );

  event.respondWith(
    caches
      // Check for cached data.
      .match(event.request)
      // Return the cached data OR hit the network.
      .then(data => data || fetchAndCache(event.request))
      .catch(() => {
        const url = new URL(event.request.url);

        // Show the fallback image for failed GIF requests.
        if (url.pathname.match(/\.gif$/)) {
          return caches.match(OFFLINE_IMAGE);
        }

        // If anything else is loaded, show an offline page.
        return caches.match(OFFLINE_PAGE);
      })
  );
});
