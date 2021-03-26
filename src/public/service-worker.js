const cacheName = 'v1';
const cacheAssets = [
    '/css/style.css',
    '/js/main.js',
    '/offline'
];

// install & cache the items in the array above in the cache "v1"
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    
    e.waitUntil(
      caches.open(cacheName)
        .then(cache => {
          console.log('service worker: caching files');
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// If the SW is activated the old cache items will be deleted if there is a new cache
self.addEventListener('activate', e => {
    console.log('Service Worker: activated');
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if(cache !== cacheName) {
              console.log('service worker: clear old cache');
              return caches.delete(cache);
            }
          })
        )
      })
    )
});


self.addEventListener("fetch", (event) => {
  const req = event.request
  // console.log(req)
  
  event.respondWith(
    caches.open(cacheName).then(cache => {
        return cache.match(event.request)
            .then(response => {
                if(response) {
                    
                return response
                }
                return fetch(event.request)
                .then(response => {
                    cache.put(event.request, response.clone())
                    return response
                })
            }).catch((err) => {
                return caches.open(cacheName).then(cache => cache.match('/offline'))
            })
    })
)
          
})