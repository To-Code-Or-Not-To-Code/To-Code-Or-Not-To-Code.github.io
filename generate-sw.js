/*
Copyright 2015, 2019 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 2;
const CACHE_NAME = `v${OFFLINE_VERSION}`;
// Customize this with a different URL if needed.
const OFFLINE_URL = "index.html";

// Add to Cache function
const addResourcesToCache = async (resources) => {
    // Generate cache named the constant CACHE_NAME
    const c = await caches.open(CACHE_NAME);

    // Await for adding the resources to the cache
    await c.addAll(resources);
};

// Add in cache when there is a "Cache Miss"

const putInCache = async (request, response) => {
    const c = await cache.open(CACHE_NAME);
    await c.put(request, response);
};

// Implement the cache miss trigger and add a fallback

const cacheFirst = async ({ request, fallbackURL }) => {
    const responseFromCache = await caches.match(request);

    if (responseFromCache) {
        return responseFromCache;
    }

    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackURL);

        if (fallbackResponse) {
            return fallbackResponse;
        }

        // Fallback failed

        return new Response("Network Error Occured", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
};

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [`v${OFFLINE_VERSION}`];
    const keys = await caches.keys();
    const cachesToDelete = keyList.filter(
        (key) => !cacheKeepList.includes(key)
    );
    await Promise.all(cachesToDelete.map(deleteCache));
};

/*self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            // Setting {cache: 'reload'} in the new request will ensure that the response
            // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
            await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
        })()
    );
});*/

// Executed when Service worker gets installed
self.addEventListener("install", (event) => {
    // Waits until the everything has been added to cache
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/style.css",
            "/app.js",
            "/thankyou.html",
            "/thankyou.js",
            "/manifest.webmanifest",
            "/favicon.ico",
            "/CSS.html",
            "/HTML.html",
            "/JS.html",
            "/JSON.html",
            "/Python.html",
            "/XML.html",
            "/layer1.svg",
            "/layer2.svg",
            "/Alt favicons/android-chrome-192x192.png",
            "/Alt favicons/android-chrome-512x512.png",
            "/Alt favicons/apple-touch-icon.png",
            "/Alt favicons/favicon-16x16.png",
            "/Alt favicons/favicon-32x32.png",
            "/Alt favicons/favicon.png",
            "/Alt favicons/icon-192x192.png",
            "/Alt favicons/icon-256x256.png",
            "/Alt favicons/icon-384x384.png",
            "/Alt favicons/icon-512x512.png",
            "/Fonts/segoepr.ttf",
            "/Fonts/segoeprb.ttf",
            "/Fonts/SegoePrint-Bold.eot",
            "/Fonts/SegoePrint-Bold.svg",
            "/Fonts/SegoePrint-Bold.ttf",
            "/Fonts/SegoePrint-Bold.woff",
            "/Fonts/SegoePrint-Bold.woff2",
            "/Fonts/SegoePrint.eot",
            "/Fonts/SegoePrint.svg",
            "/Fonts/SegoePrint.ttf",
            "/Fonts/SegoePrint.woff",
            "/Fonts/SegoePrint.woff2",
            "/network error.png",
        ])
    );
});

// When finished installing it will take control
self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    event.waitUntil(deleteOldCaches);

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

/*self.addEventListener("fetch", (event) => {
    // We only want to call event.respondWith() if this is a navigation request
    // for an HTML page.
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    // First, try to use the navigation preload response if it's supported.
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    // catch is only triggered if an exception is thrown, which is likely
                    // due to a network error.
                    // If fetch() returns a valid HTTP response with a response code in
                    // the 4xx or 5xx range, the catch() will NOT be called.
                    console.log(
                        "Fetch failed; returning offline page instead.",
                        error
                    );

                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(OFFLINE_URL);
                    return cachedResponse;
                }
            })()
        );
    }

    // If our if() condition is false, then this fetch handler won't intercept the
    // request. If there are any other fetch handlers registered, they will get a
    // chance to call event.respondWith(). If no fetch handlers call
    // event.respondWith(), the request will be handled by the browser as if there
    // were no service worker involvement.
});*/

// Have it look up the resource in the cache when items are being fetched to speed up
self.addEventListener("fetch", (event) => {
    event.respondWith(
        cacheFirst({
            request: event.request,
            fallbackURL: "/network error.png",
        })
    );
});
