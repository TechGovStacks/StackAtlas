import preact from '@preact/preset-vite';
import UnoCSS from '@unocss/vite';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve as resolvePath } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const KOLIBRI_ESM_DIR = './node_modules/@public-ui/components/dist/esm';
const kolibriI18nInternalFile = (() => {
	try {
		return readdirSync(KOLIBRI_ESM_DIR).find(
			(f) => f.startsWith('i18n-') && f.endsWith('.js') && readFileSync(`${KOLIBRI_ESM_DIR}/${f}`, 'utf-8').includes('class I18nService'),
		);
	} catch {
		return undefined;
	}
})();

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
	resolve: {
		alias: kolibriI18nInternalFile ? { '@kolibri-i18n-internal': resolvePath(`${KOLIBRI_ESM_DIR}/${kolibriI18nInternalFile}`) } : {},
	},
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
			strategies: 'generateSW',
			devOptions: {
				enabled: true,
				type: 'module',
			},
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
				maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
				skipWaiting: false,
				navigateFallback: 'index.html',
				importScripts: ['push-sw.js'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'fonts-cache',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 365 * 24 * 60 * 60,
							},
							cacheableResponse: { statuses: [0, 200] },
						},
					},
					{
						urlPattern: /^https:\/\/cdn\.simpleicons\.org\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'logo-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 30 * 24 * 60 * 60,
							},
							cacheableResponse: { statuses: [0, 200] },
						},
					},
					{
						urlPattern: ({ sameOrigin, request }) => !sameOrigin && request.mode !== 'navigate',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'external-cache',
							networkTimeoutSeconds: 10,
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 24 * 60 * 60,
							},
							cacheableResponse: { statuses: [0, 200] },
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
