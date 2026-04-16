import type { ComponentChildren } from 'preact';
import { LocationProvider } from 'preact-iso';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

interface HashLocationProviderProps {
	children: ComponentChildren;
}

function normalizeRoute(input: string): string {
	let route = input.replace(/^#/, '');
	if (!route) route = '/';
	if (!route.startsWith('/')) route = `/${route}`;
	return route;
}

function getHashRoute(): string {
	return normalizeRoute(window.location.hash);
}

function parseRoute(route: string) {
	const normalized = normalizeRoute(route);
	const url = new window.URL(normalized, window.location.origin);
	return {
		url: `${url.pathname}${url.search}`,
		path: url.pathname.replace(/\/+$/g, '') || '/',
		query: Object.fromEntries(url.searchParams),
	};
}

export function HashLocationProvider({ children }: HashLocationProviderProps) {
	const [route, setRoute] = useState<string>(() => getHashRoute());
	const wasPushRef = useRef(false);

	useEffect(() => {
		const onHashChange = () => {
			setRoute(getHashRoute());
		};

		window.addEventListener('hashchange', onHashChange);

		if (!window.location.hash) {
			window.location.replace(`${window.location.pathname}${window.location.search}#/`);
			setRoute(getHashRoute());
		}

		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);

	const value = useMemo(() => {
		const parsed = parseRoute(route);
		return {
			...parsed,
			route: (nextUrl: string, replace?: boolean) => {
				const nextRoute = normalizeRoute(nextUrl);
				wasPushRef.current = !replace;
				const nextHash = `#${nextRoute}`;
				if (replace) {
					window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
					setRoute(nextRoute);
					return;
				}
				if (window.location.hash === nextHash) {
					setRoute(nextRoute);
					return;
				}
				window.location.hash = nextRoute;
			},
			wasPush: wasPushRef.current,
		};
	}, [route]);

	return <LocationProvider.ctx.Provider value={value}>{children}</LocationProvider.ctx.Provider>;
}
