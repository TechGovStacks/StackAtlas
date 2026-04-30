import preact from '@preact/preset-vite';
import UnoCSS from '@unocss/vite';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function markdownItPlugin(): Plugin {
	// html: true passes through raw HTML tags in content (safe: content is git-managed, not user-input)
	// Note: relative image paths (e.g. ./img.png) are not processed by Vite's asset pipeline.
	// All images in this project must use absolute URLs or paths relative to the public/ directory.
	const md = new MarkdownIt({ html: true }).use(taskLists);
	return {
		name: 'vite-markdown-it',
		enforce: 'pre',
		transform(code, id) {
			const [path] = id.split('?');
			if (!path.endsWith('.md') && !path.endsWith('.mdx')) return;
			const { data: frontmatter, content } = matter(code);
			const html = md.render(content);
			return {
				code: [
					`import { h } from 'preact';`,
					`export const metadata = ${JSON.stringify(frontmatter)};`,
					`const __html = ${JSON.stringify(html)};`,
					`export default function Content() { return h('div', { dangerouslySetInnerHTML: { __html } }); }`,
				].join('\n'),
				map: null,
			};
		},
	};
}

const isPwaEnabled = process.env.VITE_ENABLE_PWA !== 'false';
const { version: appVersion } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as { version: string };

export default defineConfig({
	base: './',
	build: {
		dynamicImportVarsOptions: {
			exclude: [],
		},
		emptyOutDir: true,
	},
	plugins: [
		markdownItPlugin(),
		preact(),
		UnoCSS(),
		VitePWA({
			registerType: isPwaEnabled ? 'prompt' : undefined,
			includeAssets: isPwaEnabled ? ['favicon.ico', 'icons/*.png', 'assets/**/*', 'logos/*.svg'] : [],
			manifest: {
				name: 'StackAtlas',
				short_name: 'StackAtlas',
				version: appVersion,
				description: 'Interaktive Technologie-Landkarte für ein barrierefreies digitales Ökosystem',
				theme_color: '#003d82',
				background_color: '#003d82',
				display: 'standalone',
				orientation: 'portrait',
				start_url: './',
				categories: ['education', 'government', 'utilities'],
				lang: 'de',
				dir: 'ltr',
				icons: [
					{
						src: 'icons/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icons/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'icons/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
			workbox: {
				cacheId: 'stackatlas',
				maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff}'],
				navigateFallback: 'index.html',
				cleanupOutdatedCaches: true,
				skipWaiting: false,
				clientsClaim: true,
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.mode === 'navigate',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'pages-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 60 * 60 * 24 * 30,
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\./,
						handler: 'CacheFirst',
						options: {
							cacheName: 'fonts-cache',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
						},
					},
					{
						urlPattern: /^https:\/\/cdn\.simpleicons\.org\//,
						handler: 'CacheFirst',
						options: {
							cacheName: 'logo-cache',
							expiration: {
								maxEntries: 200,
								maxAgeSeconds: 60 * 60 * 24 * 30,
							},
						},
					},
				],
			},
		}),
	],
	define: {
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(appVersion),
	},
});
