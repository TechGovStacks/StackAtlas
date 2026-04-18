import { useState, useEffect } from 'preact/hooks';

export type ThemeValue = 'auto' | 'light' | 'dark' | 'high-contrast';

export function useTheme() {
	const [theme, setThemeState] = useState<ThemeValue>('auto');

	useEffect(() => {
		const stored = localStorage.getItem('theme') as ThemeValue | null;
		const initialTheme = stored || 'auto';
		setThemeState(initialTheme);
	}, []);

	const setTheme = (newTheme: ThemeValue) => {
		setThemeState(newTheme);
		localStorage.setItem('theme', newTheme);

		const html = document.documentElement;
		let effectiveTheme = newTheme;

		if (newTheme === 'auto') {
			effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			html.removeAttribute('data-theme');
		} else {
			html.setAttribute('data-theme', newTheme);
		}
	};

	return { theme, setTheme };
}
