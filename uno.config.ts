import presetMini from '@unocss/preset-mini';
import { defineConfig } from 'unocss';

export default defineConfig({
	presets: [presetMini()],
	theme: {
		colors: {
			// Brand colours (direct HEX values)
			primary: '#003d82',
			'primary-dark': '#002d62',
			'primary-light': '#1a56a0',
			accent: '#0070cb',

			// Neutral palette
			bg: '#f6f7f8',
			'bg-white': '#fff',
			surface: '#fff',
			border: '#d0d3d9',
			'border-light': '#e8eaed',

			// Text
			text: '#1d2129',
			'text-muted': '#6b7280',
			'white-text': '#fff',
		},
		spacing: {
			0: '0',
			1: '0.25rem',
			2: '0.5rem',
			3: '0.75rem',
			4: '1rem',
			6: '1.5rem',
			8: '2rem',
			12: '3rem',
			14: '3.5rem',
		},
		borderRadius: {
			sm: '2px',
			md: '4px',
			lg: '8px',
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			md: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '2rem',
		},
		lineHeight: {
			body: '1.6',
			heading: '1.2',
			tight: '1.3',
		},
		boxShadow: {
			card: '0 1px 3px rgb(0 0 0 / 8%), 0 1px 2px rgb(0 0 0 / 5%)',
			'card-hover': '0 8px 16px rgb(0 0 0 / 10%)',
			elevated: '0 2px 8px rgb(0 0 0 / 8%)',
		},
		fontFamily: {
			body: `'Fira Sans', system-ui, -apple-system, sans-serif`,
			mono: `'Fira Code', 'Courier New', monospace`,
		},
	},
	shortcuts: [
		// Responsive container queries & max-width utilities
		['container-max', 'max-w-6xl mx-auto'],
		['container-full', 'w-full'],

		// Layout helpers
		['flex-center', 'flex items-center justify-center'],
		['flex-between', 'flex items-center justify-between'],
		['flex-col-gap', 'flex flex-col gap-4'],
		['grid-auto', 'grid auto-cols-fr'],

		// Typography alignment (layout-only, colors in SCSS)
		['text-left', 'text-left'],
		['text-center', 'text-center'],
		['text-right', 'text-right'],

		// Responsive text sizes (layout helper, actual styling in SCSS)
		['text-responsive-base', 'text-base md:text-lg'],
		['text-responsive-lg', 'text-lg md:text-xl'],

		// Aspect ratios & sizing
		['aspect-square', 'aspect-square'],
		['aspect-video', 'aspect-video'],

		// Common spacing patterns
		['space-stack', 'flex flex-col gap-4'],
		['space-sticky', 'sticky top-0 z-10'],

		// Visually hidden
		['visually-hidden', 'absolute w-1 h-1 p-0 -m-1 overflow-hidden clip-[rect(0,0,0,0)] border-0 whitespace-nowrap'],
	],
	safelist: [
		// Brand colors
		'bg-primary',
		'bg-primary-dark',
		'bg-primary-light',
		'bg-accent',
		'text-primary',
		'text-primary-light',
		'text-accent',
		'border-primary',
		'border-primary-dark',
		'border-accent',
		'ring-primary',
		'ring-accent',

		// Text colors
		'text-white-text',
		'text-text-primary',
		'text-text-muted',

		// White opacity variants
		'bg-white/8',
		'bg-white/10',
		'bg-white/12',
		'bg-white/60',
		'text-white/45',
		'text-white/50',
		'text-white/55',
		'text-white/60',
		'text-white/65',
		'text-white/75',
		'text-white/80',
		'text-white/82',
		'border-white/12',

		// Neutral colors
		'bg-neutral-bg',
		'bg-neutral-bg-white',
		'bg-neutral-surface',
		'border-neutral-border',
		'border-neutral-border-light',

		// Animations
		'animate-slide-up',
	],
});
