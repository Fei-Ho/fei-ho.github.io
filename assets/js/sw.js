// install the service worker and cache the files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('sweetheart').then(cache =>
      cache.addAll([
        '/',
        '/photo_gallery.html',
        '/main.css',
        '/canvas.js'
      ])
    )
  )
})
// fetch from the cache if available and then
// check network for new version to cache, otherwise get from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      const fetchRequest = event.request.clone()
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        const responseToCache = response.clone()
        caches.open('sweetheart')
          .then(cache => {
            cache.put(event.request, responseToCache)
          })
        return response
      })
    })
  )
})