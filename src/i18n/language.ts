import { LanguageCode } from '../types';
import { normalizeLanguageCode } from '../utils/normalizeLanguageCode';

export const FALLBACK_LANGUAGE: LanguageCode = 'de';
export const SUPPORTED_LANGUAGES: LanguageCode[] = [
	'bg',
	'cs',
	'da',
	'de',
	'el',
	'en',
	'en-gb',
	'es',
	'et',
	'fi',
	'fr',
	'ga',
	'hr',
	'hu',
	'it',
	'lt',
	'lv',
	'mt',
	'nl',
	'no',
	'pl',
	'pt',
	'ro',
	'sk',
	'sl',
	'sv',
	'uk',
];

export function normalizeLanguage(language?: string): LanguageCode {
	return normalizeLanguageCode(language, SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE);
}
