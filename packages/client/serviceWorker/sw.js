let filelist = ['/', '/index.html', '/no-chache-no-network.html'];

let cacheCurrentName = 'monopolyChacheV-';

if (typeof outputFilesList !== 'undefined' && Array.isArray(outputFilesList)) {
  filelist = [...filelist, ...outputFilesList];
}

if (typeof currentCachesVersion === 'number') {
  cacheCurrentName = 'monopolyChacheV-' + currentCachesVersion;
}


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheCurrentName).then((cache) => {
      return cache.addAll(filelist);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.includes(location.origin)) return;
  event.respondWith(cacheFirst(event.request));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.filter((name) => name !== cacheCurrentName).map((name) => caches.delete(name)),
    )
    ),
  );
});

async function cacheFirst(request) {
  const cache = await caches.open(cacheCurrentName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    } else if (request.mode === 'navigate' && request.url.includes(location.origin)) {
      return cache.match('/');
    }
  }
  return cache.match('/no-chache-no-network.html');
}
