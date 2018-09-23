
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('filesCached').then(function(cache) {
            return cache.addAll([
                '/',
                '/css/styles.css',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/index.html',
                '/restaurant.html'
            ]);
        })
    );
});

// Code taken from https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response

// The Offline Cookbook by Jake Archibald
// Stale-while-revalidate
// Web Fundamentals
// This code was chosen for its ability to cache the map and load the cached map when offline.
// Files are only cached when the user clicks into content enabling the fetch to cache data from the network.
// Content not visited while on the network does not cache, and therefore will not load while offline.

// TODO: Review other types of service worker fetch listeners
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('filesCached').then(function(cache) {
        return cache.match(event.request).then(function(response) {
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          return response || fetchPromise;
        })
      })
    );
  });