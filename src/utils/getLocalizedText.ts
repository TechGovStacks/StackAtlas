import { FALLBACK_LANGUAGE, normalizeLanguage } from '../i18n/language';
import { LanguageCode, LocalizableText, LocalizedText } from '../types';

function isLocalizedText(value: LocalizableText): value is LocalizedText {
	return typeof value === 'object' && value !== null && ('de' in value || 'en' in value);
}

function getLanguageCandidates(language: string): LanguageCode[] {
	const normalizedLanguage = normalizeLanguage(language);
	const candidates: LanguageCode[] = [normalizedLanguage];

	if (normalizedLanguage.includes('-')) {
		const baseLanguage = normalizedLanguage.split('-')[0] as LanguageCode;
		candidates.push(baseLanguage);
	}

	if (!candidates.includes('en')) {
		candidates.push('en');
	}

	if (!candidates.includes(FALLBACK_LANGUAGE)) {
		candidates.push(FALLBACK_LANGUAGE);
	}

	return candidates;
}

export function getLocalizedText(value: LocalizableText, lng: string, fallback: LanguageCode = FALLBACK_LANGUAGE): string {
	if (!isLocalizedText(value)) {
		return value;
	}

	const fallbackCandidates = getLanguageCandidates(lng);

	if (!fallbackCandidates.includes(fallback)) {
		fallbackCandidates.push(fallback);
	}

	for (const candidate of fallbackCandidates) {
		const localizedValue = value[candidate];
		if (localizedValue != null) {
			return localizedValue;
		}
	}

	return '';
}
