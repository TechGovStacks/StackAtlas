import mdx from '@mdx-js/rollup';
import preact from '@preact/preset-vite';
import UnoCSS from '@unocss/vite';
import { readFileSync } from 'node:fs';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
		}),
		preact(),
		UnoCSS(),
		VitePWA({
			registerType: isPwaEnabled ? 'prompt' : undefined,
			includeAssets: isPwaEnabled ? ['favicon.svg', 'icons/*.png', 'assets/**/*'] : [],
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
				cleanupOutdatedCaches: true,
				skipWaiting: false,
				clientsClaim: true,
				runtimeCaching: [
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
