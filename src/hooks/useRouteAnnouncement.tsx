import { useEffect, useRef } from 'preact/hooks';

interface RouteAnnouncementOptions {
	pageTitle: string;
	skipHeadingFocus?: boolean;
}

export function useRouteAnnouncement({ pageTitle, skipHeadingFocus = false }: RouteAnnouncementOptions) {
	const isFirstRenderRef = useRef(true);

	useEffect(() => {
		document.title = `${pageTitle} | StackAtlas`;

		// Schreibt in das von RouteAnnouncementRegion gerenderte Live-Region-Element
		const liveRegion = document.getElementById('route-announcer');
		if (liveRegion) {
			liveRegion.textContent = pageTitle;
		}

		if (!skipHeadingFocus && !isFirstRenderRef.current) {
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
		if (isFirstRenderRef.current) isFirstRenderRef.current = false;
	}, [pageTitle, skipHeadingFocus]);
}

/**
 * Render this in your app layout to support route announcements
 */
export function RouteAnnouncementRegion() {
	return <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" id="route-announcer" aria-label="Page change announcements" />;
}
