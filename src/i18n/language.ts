import { LanguageCode } from '../types';

export const FALLBACK_LANGUAGE: LanguageCode = 'de';
export const SUPPORTED_LANGUAGES: LanguageCode[] = ['de', 'en', 'fr'];
const SUPPORTED_LANGUAGE_SET = new Set<LanguageCode>(SUPPORTED_LANGUAGES);

export function normalizeLanguage(language?: string): LanguageCode {
	const baseLanguage = language?.split('-')[0]?.toLowerCase() as LanguageCode | undefined;

	if (baseLanguage && SUPPORTED_LANGUAGE_SET.has(baseLanguage)) {
		return baseLanguage;
	}

	return FALLBACK_LANGUAGE;
}
