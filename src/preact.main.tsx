import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { KERN_V2 } from '@public-ui/theme-kern';
import i18next from 'i18next';

import { render } from 'preact';
import App from './App';
import { i18nReady } from './i18n';
import { normalizeLanguage } from './i18n/language';
import { LanguageCode } from './types';

/**
 * Splash minimum display time (ms).
 * Derived from CSS timing: layer-3 (0s) + layer-4 (1.2s) + sovereign (2.4s) + sov-duration (1.5s) + 1s hold
 * + title-delay (6.5s) + title-fade (0.8s) + hold (~1.2s) = ~8.5s
 */
const SPLASH_MIN_MS = 8500;
const splashStart = performance.now();
let splashDismissed = false;

type KolibriLanguage = NonNullable<NonNullable<Parameters<typeof register>[2]>['translation']>['name'];

const KOLIBRI_FALLBACK_LANGUAGE: KolibriLanguage = 'en';
const APP_TO_KOLIBRI_LANGUAGE: Readonly<Record<LanguageCode, KolibriLanguage>> = {
	da: 'da',
	de: 'de',
	en: 'en',
	es: 'es',
	fr: 'fr',
	it: 'it',
	no: 'no',
	sv: 'sv',
};
const warnedKolibriFallbackLanguages = new Set<string>();

function mapAppLanguageToKolibriLanguage(language: string): KolibriLanguage {
	const normalizedLanguage = normalizeLanguage(language);
	const kolibriLanguage = APP_TO_KOLIBRI_LANGUAGE[normalizedLanguage] ?? KOLIBRI_FALLBACK_LANGUAGE;

	if (kolibriLanguage === KOLIBRI_FALLBACK_LANGUAGE && normalizedLanguage !== KOLIBRI_FALLBACK_LANGUAGE) {
		if (!warnedKolibriFallbackLanguages.has(normalizedLanguage)) {
			warnedKolibriFallbackLanguages.add(normalizedLanguage);
			console.warn(
				`KoliBri locale fallback active: app language "${normalizedLanguage}" is not natively supported. Using "${KOLIBRI_FALLBACK_LANGUAGE}" for KoliBri translations.`,
			);
		}
	}

	return kolibriLanguage;
}

function syncKoliBriLanguage(language: string): Promise<void[]> {
	const kolibriLanguage = mapAppLanguageToKolibriLanguage(language);
	return register([KERN_V2, DEFAULT], defineCustomElements, { translation: { name: kolibriLanguage } });
}

function dismissSplash(): void {
	if (splashDismissed) return;
	splashDismissed = true;

	const splash = document.getElementById('splash');
	if (!splash) return;

	const status = document.getElementById('splash-status');
	if (status) status.textContent = 'Anwendung bereit';

	splash.classList.add('splash--exiting');
	splash.style.display = 'none';
	splash.style.visibility = 'hidden';
	splash.style.pointerEvents = 'none';

	const cleanup = () => {
		try {
			splash.remove();
		} catch {
			// ignore
		}
	};
	splash.addEventListener('transitionend', cleanup, { once: true });
	setTimeout(cleanup, 600);
}

let renderApp: (() => void) | null = null;

// Register click and keyboard handlers FIRST
document.addEventListener('click', (e) => {
	const splash = document.getElementById('splash');
	if (splash?.contains(e.target as HTMLElement)) {
		dismissSplash();
		renderApp?.();
	}
});

document.addEventListener('keydown', (e: globalThis.KeyboardEvent) => {
	if (e.key === 'Escape') {
		dismissSplash();
		renderApp?.();
	}
});

// Safety timeout to dismiss splash after max 10 seconds regardless
setTimeout(dismissSplash, 10000);

i18next.on('languageChanged', (language: string) => {
	void syncKoliBriLanguage(language).catch((error: unknown) => {
		console.warn('Unable to synchronize KoliBri translations:', error);
	});
});

Promise.all([
	Promise.race([
		i18nReady.then(() => syncKoliBriLanguage(i18next.resolvedLanguage ?? i18next.language ?? globalThis.navigator.language)),
		new Promise<void>((_, reject) => setTimeout(() => reject(new Error('KoliBri registration timeout')), 3000)),
	]),
	new Promise<void>((resolve) => {
		renderApp = resolve;
		setTimeout(resolve, SPLASH_MIN_MS);
	}),
])
	.then(() => {
		renderApp = null;
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			render(<App />, htmlElement);
		}

		const elapsed = performance.now() - splashStart;
		const remaining = Math.max(0, SPLASH_MIN_MS - elapsed);
		setTimeout(dismissSplash, remaining);
	})
	.catch((error) => {
		console.error('Error during app initialization:', error);
		// Force splash to disappear even if there's an error
		dismissSplash();
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			render(<App />, htmlElement);
		}
	});
