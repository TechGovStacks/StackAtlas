import type { ComponentChildren } from 'preact';
import { LocationProvider } from 'preact-iso';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

interface HashLocationProviderProps {
	children: ComponentChildren;
}

const ROUTE_ALIASES: Readonly<Record<string, string>> = {
	'/einstellungen': '/settings',
	'/impressum': '/imprint',
	'/neuigkeiten': '/news',
	'/stacks-galerie': '/stacks',
};

function canonicalizeRoute(input: string): string {
	const normalizedRoute = normalizeRoute(input);
	const url = new window.URL(normalizedRoute, window.location.origin);
	const normalizedPath = url.pathname.replace(/\/+$/g, '') || '/';
	const canonicalPath = ROUTE_ALIASES[normalizedPath] ?? normalizedPath;
	return `${canonicalPath}${url.search}`;
}

function normalizeRoute(input: string): string {
	let route = input.replace(/^#/, '');
	if (!route) route = '/';
	if (!route.startsWith('/')) route = `/${route}`;
	return route;
}

function getHashRoute(): string {
	return canonicalizeRoute(window.location.hash);
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
			const currentRoute = normalizeRoute(window.location.hash);
			const canonicalRoute = canonicalizeRoute(window.location.hash);
			if (currentRoute !== canonicalRoute) {
				window.location.replace(`${window.location.pathname}${window.location.search}#${canonicalRoute}`);
				return;
			}
			setRoute(currentRoute);
		};

		window.addEventListener('hashchange', onHashChange);

		if (!window.location.hash) {
			window.location.replace(`${window.location.pathname}${window.location.search}#/`);
			return () => window.removeEventListener('hashchange', onHashChange);
		}
		onHashChange();

		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);

	const value = useMemo(() => {
		const parsed = parseRoute(route);
		return {
			...parsed,
			route: (nextUrl: string, replace?: boolean) => {
				const nextRoute = canonicalizeRoute(nextUrl);
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
