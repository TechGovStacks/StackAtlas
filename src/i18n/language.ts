import { LanguageCode } from '../types';
import { normalizeLanguageCode } from '../utils/normalizeLanguageCode';

export const FALLBACK_LANGUAGE: LanguageCode = 'de';
export const SUPPORTED_LANGUAGES: LanguageCode[] = ['da', 'de', 'en', 'es', 'fr', 'it', 'no', 'sv'];

export function normalizeLanguage(language?: string): LanguageCode {
	return normalizeLanguageCode(language, SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE);
}
