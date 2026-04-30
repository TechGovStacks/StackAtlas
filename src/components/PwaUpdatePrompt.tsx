import { KolButton } from '@public-ui/preact';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/preact';

const UPDATE_NOTIFICATION_TAG = 'pwa-update';

async function closeUpdateNotification(registration: ServiceWorkerRegistration) {
	const notifications = await registration.getNotifications({ tag: UPDATE_NOTIFICATION_TAG });
	notifications.forEach((n) => n.close());
}

export function PwaUpdatePrompt() {
	const { t } = useTranslation();

	const {
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegisteredSW(swUrl, registration) {
			if (registration) {
				// Check for updates every 15 minutes
				setInterval(
					() => {
						registration.update();
					},
					15 * 60 * 1000,
				);
			}
			console.log(`[PWA] Service Worker registered: ${swUrl}`);
		},
		onRegisterError(error) {
			console.error('[PWA] Service Worker registration failed:', error);
		},
	});

	// Background-Notification anzeigen, wenn Update verfügbar und App im Hintergrund.
	// Auch auf visibilitychange reagieren, falls der Nutzer die App erst nach Erkennen des
	// Updates in den Hintergrund legt.
	useEffect(() => {
		const showNotification = () => {
			if (!needRefresh || !('Notification' in window) || Notification.permission !== 'granted' || !document.hidden) return;

			void navigator.serviceWorker.ready.then((registration) => {
				registration.showNotification(t('pwa.notificationTitle'), {
					body: t('pwa.notificationBody'),
					icon: '/icons/pwa-192x192.png',
					badge: '/icons/pwa-192x192.png',
					tag: UPDATE_NOTIFICATION_TAG,
					requireInteraction: true,
				});
			});
		};

		showNotification();
		document.addEventListener('visibilitychange', showNotification);
		return () => document.removeEventListener('visibilitychange', showNotification);
	}, [needRefresh, t]);

	async function close() {
		// Permission beim ersten „Später"-Klick anfragen – an User-Geste gebunden
		if ('Notification' in window && Notification.permission === 'default') {
			await Notification.requestPermission();
		}
		const registration = await navigator.serviceWorker.ready;
		await closeUpdateNotification(registration);
		setNeedRefresh(false);
	}

	async function update() {
		const registration = await navigator.serviceWorker.ready;
		await closeUpdateNotification(registration);
		updateServiceWorker(true);
	}

	if (!needRefresh) return null;

	return (
		<div className="pwa-update-prompt" role="alert" aria-live="assertive">
			<p className="pwa-update-prompt__text">{t('pwa.updateAvailable')}</p>
			<div className="pwa-update-prompt__actions">
				<KolButton _label={t('pwa.update')} _variant="primary" _on={{ onClick: () => void update() }} />
				<KolButton _label={t('pwa.dismiss')} _variant="tertiary" _on={{ onClick: () => void close() }} />
			</div>
		</div>
	);
}
