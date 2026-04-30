const LOCAL_VERSION_FALLBACK = '0.0.0-dev';

export function getAppVersion(): string {
	return import.meta.env.VITE_APP_VERSION ?? LOCAL_VERSION_FALLBACK;
}
