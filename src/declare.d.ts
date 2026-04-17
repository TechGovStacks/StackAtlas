declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.scss';
declare module '*.css';
declare module '*.md';
declare module '*.mdx';
declare module 'uno.css';

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly BASE_URL: string;
	readonly VITE_COMMIT_SHA?: string;
	readonly VITE_APP_VERSION?: string;
	readonly VITE_ASSET_BASE_URL?: string;
	readonly VITE_BRAND_URL?: string;
	readonly VITE_ENABLE_PWA?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
	glob: <T = unknown>(pattern: string, options?: { eager?: boolean }) => Record<string, T>;
}
