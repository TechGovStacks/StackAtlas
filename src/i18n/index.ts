import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { FALLBACK_LANGUAGE, normalizeLanguage, SUPPORTED_LANGUAGES } from './language';
import bgCommon from './locales/bg/common.json';
import csCommon from './locales/cs/common.json';
import daCommon from './locales/da/common.json';
import deCommon from './locales/de/common.json';
import elCommon from './locales/el/common.json';
import enGbCommon from './locales/en-gb/common.json';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import etCommon from './locales/et/common.json';
import fiCommon from './locales/fi/common.json';
import frCommon from './locales/fr/common.json';
import gaCommon from './locales/ga/common.json';
import hrCommon from './locales/hr/common.json';
import huCommon from './locales/hu/common.json';
import itCommon from './locales/it/common.json';
import ltCommon from './locales/lt/common.json';
import lvCommon from './locales/lv/common.json';
import mtCommon from './locales/mt/common.json';
import nlCommon from './locales/nl/common.json';
import noCommon from './locales/no/common.json';
import plCommon from './locales/pl/common.json';
import ptCommon from './locales/pt/common.json';
import roCommon from './locales/ro/common.json';
import skCommon from './locales/sk/common.json';
import slCommon from './locales/sl/common.json';
import svCommon from './locales/sv/common.json';
import ukCommon from './locales/uk/common.json';

const MISSING_TRANSLATION_FALLBACK = 'Übersetzung nicht verfügbar';

if (typeof window !== 'undefined') {
	(window as typeof window & { __STACKATLAS_I18N__?: typeof i18next }).__STACKATLAS_I18N__ = i18next;
}

export const i18nReady = i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			bg: { common: bgCommon },
			cs: { common: csCommon },
			da: { common: daCommon },
			de: { common: deCommon },
			el: { common: elCommon },
			en: { common: enCommon },
			'en-gb': { common: enGbCommon },
			es: { common: esCommon },
			et: { common: etCommon },
			fi: { common: fiCommon },
			fr: { common: frCommon },
			ga: { common: gaCommon },
			hr: { common: hrCommon },
			hu: { common: huCommon },
			it: { common: itCommon },
			lt: { common: ltCommon },
			lv: { common: lvCommon },
			mt: { common: mtCommon },
			nl: { common: nlCommon },
			no: { common: noCommon },
			pl: { common: plCommon },
			pt: { common: ptCommon },
			ro: { common: roCommon },
			sk: { common: skCommon },
			sl: { common: slCommon },
			sv: { common: svCommon },
			uk: { common: ukCommon },
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
