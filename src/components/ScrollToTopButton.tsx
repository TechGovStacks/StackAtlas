import { KolButton } from '@public-ui/preact';
import { useEffect, useState } from 'preact/hooks';

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		function onScroll() {
			setVisible(window.scrollY > 200);
		}
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	if (!visible) return null;

	return (
		<div className="scroll-to-top-btn">
			<KolButton _icons="kolicon-chevron-up" _variant="primary" _on={{ onClick: scrollToTop }} _hideLabel />
		</div>
	);
}
