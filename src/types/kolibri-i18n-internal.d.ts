declare module '@kolibri-i18n-internal' {
	export interface KolibriI18nInstance {
		setLanguage(lng: string): void;
		addTranslations(translations: unknown): void;
	}
	// minified export name in dist/esm — corresponds to getI18nInstance
	export const g: () => KolibriI18nInstance | undefined;
}
