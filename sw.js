let lastCache = 'restaurant-app-v1';
// install service worker
self.addEventListener('install', event => {
  //working 
  console.log('Installing service worker');

  // wait until promise is finished.
  event.waitUntil(
    caches.open(lastCache).then(cache => {
      console.log('Service Worker: caching');
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/responsive.css',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
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
        '/img/10.jpg'
      ])
    })
  );
});

// activate s w to clean up old cache
self.addEventListener('activate', event => {
  console.log('Service Working: clearing old cache');
  event.waitUntil(
    // loop through currenr cache
    //all cache
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // delete cache if it doesnt match current cache
          return cacheName.startsWith('restaurant-') && cacheName != lastCache;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// call fetch event and respond to cache
self.addEventListener('fetch', event => {
  console.log('Service Worker: fetching...');

  // check if live site is available
  //fetch if not live
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});


//Referenced from Youtube video crash course