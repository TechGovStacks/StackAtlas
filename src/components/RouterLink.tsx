import type { JSX } from 'preact';
import { useLocation } from 'preact-iso';

interface RouterLinkProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'href' | 'ref'> {
	href: string;
}

export function RouterLink({ href, onClick, ...props }: RouterLinkProps) {
	const { route } = useLocation();

	const normalizedHref = href.startsWith('/') ? href : `/${href.replace(/^\/?/, '')}`;
	const hashHref = `#${normalizedHref}`;

	const handleClick = (event: JSX.TargetedMouseEvent<HTMLElement>) => {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
		const targetUrl = new window.URL(normalizedHref, window.location.origin);
		if (targetUrl.origin !== window.location.origin) return;
		event.preventDefault();
		route(targetUrl.pathname + targetUrl.search + targetUrl.hash);
	};

	return (
		<a {...props} href={hashHref} onClick={handleClick}>
			{props.children}
		</a>
	);
}
