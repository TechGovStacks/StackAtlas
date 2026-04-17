import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES, normalizeLanguage } from '../i18n/language';
import { LanguageCode, LocalizableText, LocalizedText } from '../types';

function isLocalizedText(value: LocalizableText): value is LocalizedText {
	return typeof value === 'object' && value !== null && ('de' in value || 'en' in value);
}

export function getLocalizedText(value: LocalizableText, lng: string, fallback: LanguageCode = FALLBACK_LANGUAGE): string {
	if (!isLocalizedText(value)) {
		return value;
	}

	const normalizedLng = normalizeLanguage(lng);

	if (SUPPORTED_LANGUAGES.includes(normalizedLng) && value[normalizedLng] != null) {
		return value[normalizedLng] ?? value[fallback] ?? '';
	}

	return value[fallback] ?? '';
}
