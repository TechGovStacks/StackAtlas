/// <reference lib="WebWorker" />
/* eslint-disable no-undef */
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

clientsClaim();

// Pflicht für das Update-Prompt: auf SKIP_WAITING von vite-plugin-pwa reagieren
self.addEventListener('message', (event: ExtendableMessageEvent) => {
	if (event.data?.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

// SPA-Fallback: alle Navigations-Requests auf die gecachte index.html leiten
registerRoute(new NavigationRoute(createHandlerBoundToURL('./index.html')));

async function cacheFirst(cacheName: string, request: Request): Promise<Response> {
	const cached = await caches.match(request);
	if (cached) return cached;
	const response = await fetch(request);
	if (response.ok || response.type === 'opaque') {
		const cache = await caches.open(cacheName);
		await cache.put(request, response.clone());
	}
	return response;
}

async function networkFirst(cacheName: string, request: Request): Promise<Response> {
	const cache = await caches.open(cacheName);
	try {
		const response = await fetch(request);
		if (response.ok || response.type === 'opaque') {
			await cache.put(request, response.clone());
		}
		return response;
	} catch {
		const cached = await cache.match(request);
		return cached ?? Response.error();
	}
}

// Offline-First: Fonts (CacheFirst, 1 Jahr)
registerRoute(
	({ url }) => url.hostname.startsWith('fonts.'),
	({ request }) => cacheFirst('fonts-cache', request),
);

// Offline-First: Logo-CDN (CacheFirst, 30 Tage)
registerRoute(
	({ url }) => url.hostname === 'cdn.simpleicons.org',
	({ request }) => cacheFirst('logo-cache', request),
);

// Offline-First: API/externe Requests (NetworkFirst)
registerRoute(
	({ request, url }) => request.mode !== 'navigate' && url.origin !== self.location.origin,
	({ request }) => networkFirst('external-cache', request),
);

// Handle notification clicks – App-Fenster öffnen/fokussieren
self.addEventListener('notificationclick', (event) => {
	event.notification.close();

	event.waitUntil(
		self.clients
			.matchAll({
				type: 'window',
				includeUncontrolled: true,
			})
			.then((clientList) => {
				const defaultUrl = self.registration.scope;
				const requestedUrl = event.notification.data?.url;
				const url = typeof requestedUrl === 'string' && requestedUrl.length > 0 ? requestedUrl : defaultUrl;

				if (clientList.length > 0) {
					const firstClient = clientList[0];
					if ('navigate' in firstClient && typeof firstClient.navigate === 'function') {
						return firstClient.navigate(url).then(() => firstClient.focus());
					}
					return firstClient.focus();
				} else {
					return self.clients.openWindow(url);
				}
			}),
	);
});
