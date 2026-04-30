export function normalizeLanguageCode<T extends string>(language: string | undefined, supportedLanguages: readonly T[], fallbackLanguage: T): T {
	const normalizedLanguage = language?.trim().toLowerCase();

	if (!normalizedLanguage) {
		return fallbackLanguage;
	}

	const exactMatch = supportedLanguages.find((supportedLanguage) => supportedLanguage === normalizedLanguage);

	if (exactMatch) {
		return exactMatch;
	}

	const baseLanguage = normalizedLanguage.split('-')[0];
	return supportedLanguages.find((supportedLanguage) => supportedLanguage === baseLanguage) ?? fallbackLanguage;
}
