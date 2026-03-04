const CACHE_NAME = 'music-notepad-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  // Note: To make the app work completely offline (e.g., in a car), 
  // you would eventually need to download the VexFlow and Tone.js 
  // files to your folder and list them here instead of using the web CDNs.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});