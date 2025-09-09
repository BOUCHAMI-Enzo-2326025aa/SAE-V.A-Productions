self.addEventListener("install", (event) => {
    console.log("Service worker installed");
    event.waitUntil(
      caches.open("v1").then((cache) => {
        return cache.addAll([
          "/",
          "/manifest.json",
          "/icons/logo-192.png",
          "/icons/logo-512.png",
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });