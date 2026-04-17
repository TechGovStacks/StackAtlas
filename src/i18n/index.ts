import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { FALLBACK_LANGUAGE, normalizeLanguage, SUPPORTED_LANGUAGES } from './language';
import daCommon from './locales/da/common.json';
import deCommon from './locales/de/common.json';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import frCommon from './locales/fr/common.json';
import itCommon from './locales/it/common.json';
import noCommon from './locales/no/common.json';
import svCommon from './locales/sv/common.json';

const MISSING_TRANSLATION_FALLBACK = 'Übersetzung nicht verfügbar';

const BASE_RESOURCES = {
	da: { common: daCommon },
	de: { common: deCommon },
	en: { common: enCommon },
	es: { common: esCommon },
	fr: { common: frCommon },
	it: { common: itCommon },
	no: { common: noCommon },
	sv: { common: svCommon },
} as const;

const RESOURCE_ALIAS_MAP: Record<string, keyof typeof BASE_RESOURCES> = {
	bg: 'en',
	cs: 'en',
	da: 'da',
	de: 'de',
	el: 'en',
	en: 'en',
	'en-gb': 'en',
	es: 'es',
	et: 'en',
	fi: 'en',
	fr: 'fr',
	ga: 'en',
	hr: 'en',
	hu: 'en',
	it: 'it',
	lt: 'en',
	lv: 'en',
	mt: 'en',
	nl: 'en',
	no: 'no',
	pl: 'en',
	pt: 'en',
	ro: 'en',
	sk: 'en',
	sl: 'en',
	sv: 'sv',
	uk: 'en',
};

const resources = Object.fromEntries(
	SUPPORTED_LANGUAGES.map((language) => {
		const alias = RESOURCE_ALIAS_MAP[language] ?? 'en';
		return [language, BASE_RESOURCES[alias]];
	}),
);

if (typeof window !== 'undefined') {
	(window as typeof window & { __STACKATLAS_I18N__?: typeof i18next }).__STACKATLAS_I18N__ = i18next;
}

export const i18nReady = i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		defaultNS: 'common',
		ns: ['common'],
		supportedLngs: SUPPORTED_LANGUAGES,
		fallbackLng: FALLBACK_LANGUAGE,
		parseMissingKeyHandler: () => MISSING_TRANSLATION_FALLBACK,
		detection: {
			caches: ['localStorage'],
			lookupQuerystring: 'lng',
			// Erst bei initialem Laden ohne Query/Storage greift bewusst `navigator`, damit die Gerätesprache verwendet wird.
			order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
		},
		interpolation: {
			escapeValue: false,
		},
	})
	.then(() => {
		const lng = i18next.resolvedLanguage ?? i18next.language;

		if (lng) {
			document.documentElement.lang = normalizeLanguage(lng);
		}
	});

i18next.on('languageChanged', (lng: string) => {
	if (lng) {
		document.documentElement.lang = normalizeLanguage(lng);
	}
});
