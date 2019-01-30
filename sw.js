var dataCacheName = 'myPortfolio';
var cacheName = 'myPortfolioPWA';
var filesToCache = [
  '/static/css/style.css',
  '/static/images/awwards.png',
  '/static/images/blog.png',
  '/static/images/code.jpg',
  '/static/images/favicon.png',
  '/static/images/gallery.png',
  '/static/images/mobg.jpg',
  '/static/images/moringahub.png',
  '/static/images/neighborhood.png',
  '/static/images/newshighlight.png',
  '/static/images/select-icon.png',
  '/static/images/triangletracker.png',
  '/static/parallax.js',
  '/index.html',
  'https://fonts.googleapis.com/css?family=Merriweather|Volkhov|Abril+Fatface|Tinos',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

self.addEventListener('install', function(e) {
  console.log('[sw] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log(' Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[sw] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(fetch(event.request));
});