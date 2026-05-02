import { g as getKolibriI18nInstance } from '@kolibri-i18n-internal';
import { isInitialized, register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { KERN_V2 } from '@public-ui/theme-kern';
import i18next from 'i18next';

import { render } from 'preact';
import App from './App';
import { i18nReady } from './i18n';
import { EXTRA_KOLIBRI_TRANSLATIONS } from './i18n/kolibri-translations';
import { normalizeLanguage } from './i18n/language';
import { LanguageCode } from './types';
import { logger } from './utils/logger';

const SPLASH_FALLBACK_MS = 9000;
const SPLASH_REDUCED_MOTION_MS = 1200;
const SPLASH_SKIP_PREVIEW_MS = 1000;
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

function syncKoliBriLanguage(language: string): Promise<void[]> | void {
	const kolibriLanguage = mapAppLanguageToKolibriLanguage(language);
	if (isInitialized()) {
		getKolibriI18nInstance()?.setLanguage(kolibriLanguage as string);
		return;
	}
	return register([DEFAULT, KERN_V2], defineCustomElements, { translation: { name: kolibriLanguage } }).then((result) => {
		getKolibriI18nInstance()?.addTranslations(EXTRA_KOLIBRI_TRANSLATIONS);
		return result;
	});
}

function dismissSplash(): void {
	if (splashDismissed) return;
	splashDismissed = true;

	const splash = document.getElementById('splash');
	if (!splash) return;

	const status = document.getElementById('splash-status');
	if (status) status.textContent = 'Anwendung bereit';

	splash.classList.add('splash--exiting');
	splash.style.pointerEvents = 'none';

	const cleanup = () => {
		try {
			splash.remove();
		} catch (e) {
			logger.debug('splash element removal failed', e);
		}
	};
	splash.addEventListener('transitionend', cleanup, { once: true });
	setTimeout(cleanup, 600);
}

function waitForSplashCompletion(): Promise<void> {
	return new Promise<void>((resolve) => {
		const splash = document.getElementById('splash');
		if (!splash) {
			resolve();
			return;
		}

		const title = splash.querySelector('.splash__title');
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let done = false;

		const finish = () => {
			if (done) {
				return;
			}
			done = true;
			splash.removeEventListener('click', finish);
			document.removeEventListener('keydown', onKeydown);
			title?.removeEventListener('animationend', finish);
			window.clearTimeout(fallbackTimer);
			resolve();
		};
		const finishWithSkipPreview = () => {
			if (done) {
				return;
			}
			done = true;
			splash.removeEventListener('click', finishWithSkipPreview);
			document.removeEventListener('keydown', onKeydown);
			title?.removeEventListener('animationend', finish);
			window.clearTimeout(fallbackTimer);
			splash.classList.add('splash--skip-preview');
			window.setTimeout(resolve, SPLASH_SKIP_PREVIEW_MS);
		};

		const onKeydown = (event: globalThis.KeyboardEvent) => {
			if (event.key === 'Escape') {
				finishWithSkipPreview();
			}
		};

		splash.addEventListener('click', finishWithSkipPreview);
		document.addEventListener('keydown', onKeydown);

		if (!prefersReducedMotion) {
			title?.addEventListener('animationend', finish);
		}

		const fallbackTimer = window.setTimeout(finish, prefersReducedMotion ? SPLASH_REDUCED_MOTION_MS : SPLASH_FALLBACK_MS);
	});
}

i18next.on('languageChanged', (language: string) => {
	const result = syncKoliBriLanguage(language);
	if (result) {
		void result.catch((error: unknown) => {
			console.warn('Unable to synchronize KoliBri translations:', error);
		});
	}
});

Promise.all([
	Promise.race([
		i18nReady.then(() => syncKoliBriLanguage(i18next.resolvedLanguage ?? i18next.language ?? globalThis.navigator.language) ?? Promise.resolve([])),
		new Promise<void>((_, reject) => setTimeout(() => reject(new Error('KoliBri registration timeout')), 3000)),
	]),
	waitForSplashCompletion(),
])
	.then(() => {
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			render(<App />, htmlElement);
		}
		dismissSplash();
	})
	.catch((error) => {
		console.error('Error during app initialization:', error);
		dismissSplash();
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			render(<App />, htmlElement);
		}
	});
