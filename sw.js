self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("sinhala-math-v1").then((cache) =>
      cache.addAll([
        "./",
        "./index.html",
        "./styles.css",
        "./manifest.webmanifest",
        "./src/app.js",
        "./src/content.js"
      ])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
