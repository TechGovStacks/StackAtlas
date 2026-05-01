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
				// Focus on existing window
				if (clientList.length > 0) {
					clientList[0].focus();
				} else {
					// Open new window - use the data.url if available, otherwise fall back to root
					const url = (event.notification.data && event.notification.data.url) || '/';
					self.clients.openWindow(url);
				}
			}),
	);
});
