const CACHE = 'louise-tracker-v1';
const FILES = ['./'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request).then(function(networkResponse) {
        return caches.open(CACHE).then(function(cache) {
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(function() {
      return caches.match('./');
    })
  );
});
