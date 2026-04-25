import { useEffect, useRef, useState } from 'preact/hooks';

interface RouteAnnouncementOptions {
	pageTitle: string;
	skipHeadingFocus?: boolean;
}

export function useRouteAnnouncement({ pageTitle, skipHeadingFocus = false }: RouteAnnouncementOptions) {
	const liveRegionRef = useRef<HTMLDivElement>(null);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		// Update document title
		document.title = `${pageTitle} | StackAtlas`;

		// Announce page change to screenreaders
		if (liveRegionRef.current) {
			liveRegionRef.current.textContent = pageTitle;
		}

		// Focus main heading if available and not skipped, but not on first render
		if (!skipHeadingFocus && !isFirstRender) {
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
		if (isFirstRender) setIsFirstRender(false);
	}, [pageTitle, skipHeadingFocus, isFirstRender]);

	return liveRegionRef;
}

/**
 * Render this in your app layout to support route announcements
 */
export function RouteAnnouncementRegion() {
	return <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" id="route-announcer" aria-label="Page change announcements" />;
}
