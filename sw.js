const CACHE_NAME = 'djsam-player-v3' // Updated version number
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  // Cache essential images
  './images/original.gif',
  './images/proxy_form.gif',
  './images/djgroove.png',
  './images/Dj Sam in action.jpg',
  './images/djsam micro.jpg',
  './images/djsam_pic.jpg',
  './images/djsamm1.jpeg',
  // Cache essential music files for offline playback
  './music/bintouinama.mp3',
  './music/DjSaM afrobeats.mp3',
  './music/DjMaitreSam.mp3',
  // Font Awesome CSS
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service worker installing...')
  // Skip waiting to activate immediately
  self.skipWaiting()

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.log('Cache addAll error: ', error)
        // Cache essential files even if some fail
        return cache.addAll([
          './',
          './index.html',
          './style.css',
          './script.js',
          './manifest.json',
        ])
      }),
  )
})

// Fetch event - network first for HTML/CSS/JS, cache first for media
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Network first strategy for main app files (to get updates immediately)
  if (
    request.destination === 'document' ||
    request.url.includes('.html') ||
    request.url.includes('.css') ||
    request.url.includes('.js') ||
    request.url.includes('manifest.json')
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If fetch succeeds, update cache and return response
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // If fetch fails, return from cache
          return caches.match(request)
        }),
    )
  }
  // Cache first strategy for images and music (for performance)
  else {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response
        }
        return fetch(request).then((response) => {
          // Cache the fetched resource
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
      }),
    )
  }
})

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  console.log('Service worker activating...')
  // Take control of all pages immediately
  self.clients.claim()

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.command === 'skipWaiting') {
    self.skipWaiting()
  }
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  return new Promise((resolve) => {
    // Sync any offline actions when connection is restored
    console.log('Background sync triggered')
    resolve()
  })
}

// Push notifications (optional feature)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New music available!',
    icon: './images/djgroove.png',
    badge: './images/djgroove.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Listen Now',
        icon: './images/djgroove.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: './images/djgroove.png',
      },
    ],
  }

  event.waitUntil(self.registration.showNotification('DJ Maitre Sam', options))
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('./'))
  }
})
