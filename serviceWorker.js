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