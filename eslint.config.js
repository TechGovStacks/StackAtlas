import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
				console: 'readonly',
				HTMLElement: 'readonly',
				HTMLDivElement: 'readonly',
				CustomEvent: 'readonly',
				performance: 'readonly',
				setInterval: 'readonly',
				setTimeout: 'readonly',
				URLSearchParams: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
		},
	},
	{
		ignores: ['assets/**', 'dist/**', 'node_modules/**'],
	},
];
