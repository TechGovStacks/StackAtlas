/* eslint-disable no-undef */

self.addEventListener('push', (event) => {
	if (!event.data) return;
	const data = event.data.json();
	const title = data.title ?? 'StackAtlas';
	event.waitUntil(
		self.registration.showNotification(title, {
			body: data.body ?? '',
			icon: data.icon ?? '/icons/pwa-192x192.png',
			badge: data.badge ?? '/icons/pwa-192x192.png',
			data: data.data ?? {},
			tag: data.tag,
			requireInteraction: data.requireInteraction ?? false,
		}),
	);
});

self.addEventListener('notificationclick', (event) => {
	event.notification.close();
	event.waitUntil(
		self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
			const defaultUrl = self.registration.scope;
			const requestedUrl = event.notification.data?.url;
			const url = typeof requestedUrl === 'string' && requestedUrl.length > 0 ? requestedUrl : defaultUrl;
			if (clientList.length > 0) {
				const firstClient = clientList[0];
				if ('navigate' in firstClient && typeof firstClient.navigate === 'function') {
					return firstClient.navigate(url).then(() => firstClient.focus());
				}
				return firstClient.focus();
			}
			return self.clients.openWindow(url);
		}),
	);
});
