const VERSION = "1.0.5";
const STATIC_CACHE = `static-v${VERSION}`;
const DYNAMIC_CACHE = `dynamic-v${VERSION}`;
const installList = [
  "/",
  "/style.css",
  "/style-media.css",
  "/main.js",
  "/py.webp",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
  "/guilty_dog.jpg",
  "/offline.html",
];

const limitCacheSize = async (cache, size) => {
  const keys = await cache.keys();
  if (keys.length > size) {
    await cache.delete(keys[0]);
    await limitCacheSize(cache, size);
  }
};

// As installing, cache all
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      return cache.addAll(installList);
    })()
  );
});

// As activating, delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      );
    })()
  );
});

self.addEventListener("fetch", (event) => {
  // For non-GET requests, do the default
  if (event.request.method != "GET") return;
  // For GET requests, prevent the default and handle the request
  event.respondWith(
    (async () => {
      // First, try to get response from caches
      const cachedRes = await caches.match(event.request);
      if (cachedRes) return cachedRes;

      // Fetch
      let res;
      try {
        res = await fetch(event.request);
      } catch (error) {
        // HTML Fallback
        if (event.request.url.indexOf(".html") > -1)
          return caches.match("/fallback.html");
        if (!(res instanceof Response)) return new Response();
      }

      if (res.status !== 200) return res;

      // cache the response and limit the cache size
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(event.request, res.clone());
      await limitCacheSize(cache, 15);
      return res;
    })()
  );
});
