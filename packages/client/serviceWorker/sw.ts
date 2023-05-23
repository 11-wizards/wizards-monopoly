let outputFilesList, currentCachesVersion;

const filelist: string[] = ['/', '/index.html', '/no-cache-no-network.html'];

let cacheCurrentName: string = 'monopolyChacheV-';

if (typeof outputFilesList !== 'undefined' && Array.isArray(outputFilesList)) {
  const newFile = [...outputFilesList] ?? [];
  filelist.push(...newFile);
}

if (typeof currentCachesVersion === 'number') {
  cacheCurrentName = 'monopolyChacheV-' + currentCachesVersion;
}

self.addEventListener('install', (event: Event) => {
  const extendableEvent = event as ExtendableEvent;
  extendableEvent.waitUntil(
    caches.open(cacheCurrentName).then((cache: Cache) => {
      return cache.addAll(filelist);
    }),
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

async function cacheFirst(request: Request): Promise<Cache | Response> {
  const cache: Cache = await caches.open(cacheCurrentName);
  try {
    const response: Response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached: Response = await cache.match(request);
    if (cached) {
      return cached;
    } else if (request.mode === 'navigate' && request.url.includes(location.origin)) {
      return cache.match('/');
    }
  }
  return cache.match('/no-chache-no-network.html');
}
