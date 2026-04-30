import { useEffect, useState } from 'preact/hooks';

export type ThemeValue = 'auto' | 'light' | 'dark' | 'high-contrast';

export function useTheme() {
	const [theme, setThemeState] = useState<ThemeValue>('auto');

	useEffect(() => {
		const stored = (typeof window !== 'undefined' ? localStorage?.getItem('theme') : null) as ThemeValue | null;
		const initialTheme = stored || 'auto';
		setThemeState(initialTheme);

		// Apply the theme to the document
		if (typeof document !== 'undefined') {
			const html = document.documentElement;
			if (initialTheme === 'auto') {
				html.removeAttribute('data-theme');
			} else {
				html.setAttribute('data-theme', initialTheme);
			}
		}
	}, []);

	const setTheme = (newTheme: ThemeValue) => {
		setThemeState(newTheme);
		if (typeof window !== 'undefined') {
			localStorage?.setItem('theme', newTheme);
		}

		if (typeof document !== 'undefined') {
			const html = document.documentElement;

			if (newTheme === 'auto') {
				html.removeAttribute('data-theme');
			} else {
				html.setAttribute('data-theme', newTheme);
			}
		}
	};

	return { theme, setTheme };
}
