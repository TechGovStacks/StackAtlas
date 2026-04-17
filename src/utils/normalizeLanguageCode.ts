export function normalizeLanguageCode<T extends string>(language: string | undefined, supportedLanguages: readonly T[], fallbackLanguage: T): T {
	const baseLanguage = language?.split('-')[0]?.toLowerCase();

	if (baseLanguage && supportedLanguages.includes(baseLanguage as T)) {
		return baseLanguage as T;
	}

	return fallbackLanguage;
}
