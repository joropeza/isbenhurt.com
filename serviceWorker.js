var CACHE_NAME = 'isbenhurt-v1';
var urlsToCache = [
    '/index.html',
    '/index.css',
    '/yes.html',
    '/favicon.ico',
    '/terribleTowel.jpg'
];

self.addEventListener('install', function (event) {
    console.log('installing...');
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];

    console.log('activating...');
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

self.addEventListener('fetch', function(event) {
    console.log('attempting to fetch');
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
              console.log('cached data', response);
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
