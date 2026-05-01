/// <reference lib="WebWorker" />
/* eslint-disable no-undef */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

// Workbox precaching - this will be replaced by vite-plugin-pwa with the actual manifest
precacheAndRoute(self.__WB_MANIFEST);

// Auto-claim clients
clientsClaim();

// Handle notification clicks - open the app
self.addEventListener('notificationclick', (event) => {
	event.notification.close();

	// Check if the app is already open
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

				// Focus on existing window
				if (clientList.length > 0) {
					const firstClient = clientList[0];
					if ('navigate' in firstClient && typeof firstClient.navigate === 'function') {
						void firstClient.navigate(url);
					}
					return firstClient.focus();
				} else {
					// Open new window - use the data.url if available, otherwise fall back to service worker scope
					return self.clients.openWindow(url);
				}
			}),
	);
});
