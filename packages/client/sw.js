var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var _a;
/* eslint no-restricted-globals: ["error", "event"] */
let outputFilesList;
const currentCachesVersion = 1687395133193;

const filelist = ['/', '/index-ssr.html', '/no-cache-no-network.html'];
let cacheCurrentName = 'monopolyChacheV-';
if (typeof outputFilesList !== 'undefined' && Array.isArray(outputFilesList)) {
  const newFile = (_a = [...outputFilesList]) !== null && _a !== void 0 ? _a : [];
  filelist.push(...newFile);
}
if (typeof currentCachesVersion === 'number') {
  cacheCurrentName = `monopolyChacheV-${String(currentCachesVersion)}`;
}
function cacheFirst(request) {
  return __awaiter(this, void 0, void 0, function* () {
    const cache = yield caches.open(cacheCurrentName);
    const cached = yield cache.match(request);
    if (cached) {
      return cached;
    }
    try {
      const response = yield fetch(request);
      yield cache.put(request, response.clone());
      return response;
    } catch (error) {
      if (request.mode === 'navigate' && request.url.includes(location.origin)) {
        return cache.match('/');
      }
    }
    return cache.match('/no-chache-no-network.html');
  });
}
self.addEventListener('install', (event) => {
  const extendableEvent = event;
  extendableEvent.waitUntil(caches.open(cacheCurrentName).then((cache) => cache.addAll(filelist)));
});
self.addEventListener('fetch', (event) => {
  const fetchEvent = event;
  if (!fetchEvent.request.url.includes(location.origin)) return;
  fetchEvent.respondWith(cacheFirst(fetchEvent.request));
});
self.addEventListener('activate', (event) => {
  const extendableEvent = event;
  extendableEvent.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.filter((name) => name !== cacheCurrentName).map((name) => caches.delete(name)),
        ),
      ),
  );
});
