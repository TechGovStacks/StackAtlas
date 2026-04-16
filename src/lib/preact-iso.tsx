import type { JSX } from 'preact';
import { ComponentChild, ComponentChildren, ComponentType, FunctionComponent, VNode, createContext, h, toChildArray } from 'preact';
import { useContext, useEffect, useMemo, useState } from 'preact/hooks';

type RouteDefinition = {
	component: ComponentType;
	default?: boolean;
	path?: string;
};

type LocationContextValue = {
	navigate: (href: string, replace?: boolean) => void;
	url: globalThis.URL;
};

const LocationContext = createContext<LocationContextValue | null>(null);

function getCurrentUrl(): globalThis.URL {
	return new window.URL(window.location.href);
}

export const LocationProvider: FunctionComponent<{ children: ComponentChildren }> = ({ children }) => {
	const [url, setUrl] = useState<globalThis.URL>(() => getCurrentUrl());

	useEffect(() => {
		const onPopState = () => setUrl(getCurrentUrl());
		window.addEventListener('popstate', onPopState);
		return () => window.removeEventListener('popstate', onPopState);
	}, []);

	const value = useMemo<LocationContextValue>(
		() => ({
			navigate: (href, replace = false) => {
				const nextUrl = new window.URL(href, window.location.href);
				const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
				if (replace) {
					window.history.replaceState(null, '', nextPath);
				} else {
					window.history.pushState(null, '', nextPath);
				}
				setUrl(getCurrentUrl());
			},
			url,
		}),
		[url],
	);

	return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export const Route: FunctionComponent<RouteDefinition> = () => null;

export const Router: FunctionComponent<{ children: ComponentChildren }> = ({ children }) => {
	const location = useContext(LocationContext);
	if (!location) {
		throw new Error('Router must be used within a LocationProvider.');
	}

	const pathname = location.url.pathname.replace(/\/$/, '') || '/';
	let fallback: RouteDefinition | null = null;

	for (const child of toChildArray(children)) {
		const vnode = child as VNode<RouteDefinition>;
		if (!vnode?.props) continue;
		const route = vnode.props;
		if (route.default) fallback = route;
		if (route.path === pathname) {
			return h(route.component, {});
		}
	}

	if (fallback) {
		return h(fallback.component, {});
	}

	return null;
};

type LinkProps = JSX.HTMLAttributes<HTMLElement> & {
	href: string;
};

export const Link: FunctionComponent<LinkProps> = ({ href, onClick, ...props }) => {
	const location = useContext(LocationContext);

	const handleClick = (event: JSX.TargetedMouseEvent<HTMLElement>) => {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (!location) return;
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
		const targetUrl = new window.URL(href, window.location.href);
		if (targetUrl.origin !== window.location.origin) return;
		event.preventDefault();
		location.navigate(href);
	};

	return (
		<a {...props} href={href} onClick={handleClick}>
			{props.children}
		</a>
	);
};

export function useLocation() {
	const location = useContext(LocationContext);
	if (!location) {
		throw new Error('useLocation must be used within a LocationProvider.');
	}
	return location;
}

export type { ComponentChild, RouteDefinition as RouteProps };
