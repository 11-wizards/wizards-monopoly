/* eslint no-restricted-globals: ["error", "event"] */
let outputFilesList;
let currentCachesVersion;

const filelist: string[] = ['/', '/index-ssr.html', '/no-cache-no-network.html'];

let cacheCurrentName = 'monopolyChacheV-';

if (typeof outputFilesList !== 'undefined' && Array.isArray(outputFilesList)) {
  const newFile = [...outputFilesList] ?? [];
  filelist.push(...newFile);
}

if (typeof currentCachesVersion === 'number') {
  cacheCurrentName = `monopolyChacheV-${String(currentCachesVersion)}`;
}

async function cacheFirst(request: Request): Promise<Cache | Response> {
  const cache: Cache = await caches.open(cacheCurrentName);
  const cached: Response = await cache.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response: Response = await fetch(request);
    await cache.put(request, response.clone());

    return response;
  } catch (error) {
    if (request.mode === 'navigate' && request.url.includes(location.origin)) {
      return cache.match('/');
    }
  }

  return cache.match('/no-chache-no-network.html');
}

self.addEventListener('install', (event: Event) => {
  const extendableEvent = event as ExtendableEvent;
  extendableEvent.waitUntil(
    caches.open(cacheCurrentName).then((cache: Cache) => cache.addAll(filelist)),
  );
});

self.addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as FetchEvent;
  if (!fetchEvent.request.url.includes(location.origin)) return;
  fetchEvent.respondWith(cacheFirst(fetchEvent.request));
});

self.addEventListener('activate', (event: Event) => {
  const extendableEvent = event as ExtendableEvent;
  extendableEvent.waitUntil(
    caches
      .keys()
      .then((cacheNames: string[]) =>
        Promise.all(
          cacheNames
            .filter((name: string) => name !== cacheCurrentName)
            .map((name: string) => caches.delete(name)),
        ),
      ),
  );
});
