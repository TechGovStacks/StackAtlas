import type { JSX } from 'preact';
import { useLocation } from 'preact-iso';

interface RouterLinkProps extends Omit<JSX.HTMLAttributes<HTMLAnchorElement>, 'href'> {
	href: string;
}

export function RouterLink({ href, onClick, ...props }: RouterLinkProps) {
	const { route } = useLocation();

	const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
		const targetUrl = new window.URL(href, window.location.href);
		if (targetUrl.origin !== window.location.origin) return;
		event.preventDefault();
		route(targetUrl.pathname + targetUrl.search + targetUrl.hash);
	};

	return <a {...props} href={href} onClick={handleClick} />;
}
