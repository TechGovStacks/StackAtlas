import { useEffect } from 'preact/hooks';

const ROUTE_ANNOUNCER_ID = 'route-announcer';

interface RouteAnnouncementOptions {
	pageTitle: string;
	skipHeadingFocus?: boolean;
}

export function useRouteAnnouncement({ pageTitle, skipHeadingFocus = false }: RouteAnnouncementOptions) {
	useEffect(() => {
		document.title = `${pageTitle} | StackAtlas`;

		// Updates the live region element rendered by RouteAnnouncementRegion
		const liveRegion = document.getElementById(ROUTE_ANNOUNCER_ID);
		if (liveRegion) {
			liveRegion.textContent = pageTitle;
		}

		if (!skipHeadingFocus) {
			setTimeout(() => {
				const mainHeading = document.querySelector('main h1');
				if (mainHeading instanceof HTMLElement) {
					mainHeading.setAttribute('tabindex', '-1');
					mainHeading.focus();
					mainHeading.addEventListener(
						'blur',
						() => {
							mainHeading.removeAttribute('tabindex');
						},
						{ once: true },
					);
				}
			}, 0);
		}
	}, [pageTitle, skipHeadingFocus]);
}

/**
 * Render this in your app layout to support route announcements
 */
export function RouteAnnouncementRegion() {
	return <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" id={ROUTE_ANNOUNCER_ID} aria-label="Page change announcements" />;
}
