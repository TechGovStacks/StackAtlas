import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { FALLBACK_LANGUAGE, normalizeLanguage, SUPPORTED_LANGUAGES } from './language';
import deCommon from './locales/de/common.json';
import enCommon from './locales/en/common.json';
import frCommon from './locales/fr/common.json';

const MISSING_TRANSLATION_FALLBACK = 'Übersetzung nicht verfügbar';

if (typeof window !== 'undefined') {
	(window as typeof window & { __STACKATLAS_I18N__?: typeof i18next }).__STACKATLAS_I18N__ = i18next;
}

export const i18nReady = i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			de: { common: deCommon },
			en: { common: enCommon },
			fr: { common: frCommon },
		},
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
