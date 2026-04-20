import { expect, test, type Page } from '@playwright/test';

type LanguageExpectations = {
	htmlLang: string;
	headerSubtitle: string;
	searchRegionAria: string;
	sovereigntyGaugeAriaPrefix: string;
	allSublayersOption: string;
	languagesSublayerLabel: string;
	frameworksSublayerLabel: string;
	emptyStateTitle: string;
	missingKeyFallback: string;
};

const EXPECTED: Record<'de' | 'en' | 'fr', LanguageExpectations> = {
	de: {
		htmlLang: 'de',
		headerSubtitle: 'Interaktive Übersicht von Technologien, Standards und Komponenten für die digitale Verwaltung.',
		searchRegionAria: 'Suche und Filter',
		sovereigntyGaugeAriaPrefix: 'Souveränitäts-Score-Anzeige:',
		allSublayersOption: 'Alle Unterschichten',
		languagesSublayerLabel: 'Sprachen',
		frameworksSublayerLabel: 'Frameworks & Bibliotheken',
		emptyStateTitle: 'Keine Einträge gefunden',
		missingKeyFallback: 'Übersetzung nicht verfügbar',
	},
	en: {
		htmlLang: 'en',
		headerSubtitle: 'Interactive overview of technologies, standards and components for digital public administration.',
		searchRegionAria: 'Search and filter',
		sovereigntyGaugeAriaPrefix: 'Sovereignty score gauge:',
		allSublayersOption: 'All Sublayers',
		languagesSublayerLabel: 'Languages',
		frameworksSublayerLabel: 'Frameworks & Libraries',
		emptyStateTitle: 'No entries found',
		missingKeyFallback: 'Übersetzung nicht verfügbar',
	},
	fr: {
		htmlLang: 'fr',
		headerSubtitle: 'Vue d’ensemble interactive des technologies, standards et composants pour l’administration numérique.',
		searchRegionAria: 'Recherche et filtres',
		sovereigntyGaugeAriaPrefix: 'Jauge du score de souveraineté :',
		allSublayersOption: 'Toutes les sous-couches',
		languagesSublayerLabel: 'Langages',
		frameworksSublayerLabel: 'Frameworks et bibliothèques',
		emptyStateTitle: 'Aucune entrée trouvée',
		missingKeyFallback: 'Übersetzung nicht verfügbar',
	},
};

async function expectLocalizedSublayerOption(page: Page, locale: 'de' | 'en' | 'fr') {
	const expected = EXPECTED[locale];
	const layerSelect = page.locator('kol-single-select.filter-bar__select--layer select').first();
	await expect(layerSelect).toBeVisible();

	// Trigger selected layer so sublayer select is rendered.
	await layerSelect.selectOption('building-blocks');

	const sublayerAllOption = page.locator('kol-single-select.filter-bar__select--sublayer select option').first();
	await expect(sublayerAllOption).toHaveText(expected.allSublayersOption);
	await expect(page.locator('kol-single-select.filter-bar__select--sublayer select option')).toContainText([
		expected.languagesSublayerLabel,
		expected.frameworksSublayerLabel,
	]);

	if (locale !== 'en') {
		await expect(sublayerAllOption).not.toHaveText('All Sublayers');
	}
}

async function expectCoreTranslations(page: Page, locale: 'de' | 'en' | 'fr') {
	const expected = EXPECTED[locale];

	await expect(page.locator('html')).toHaveAttribute('lang', expected.htmlLang);
	await expect(page.locator('.header__subtitle')).toHaveText(expected.headerSubtitle);
	await expect(page.getByRole('region', { name: expected.searchRegionAria })).toBeVisible();
	await expect(page.locator('.sovereignty-gauge').first()).toHaveAttribute('aria-label', new RegExp(`^${expected.sovereigntyGaugeAriaPrefix}`));
	await expectLocalizedSublayerOption(page, locale);

	await page.locator('kol-input-text input').fill('zzzzzzzzzzzzzzzzzz');
	await expect(page.locator('.empty-state__title')).toHaveText(expected.emptyStateTitle);
}

async function changeLanguage(page: Page, language: 'de' | 'en' | 'fr') {
	await page.evaluate(async (lng) => {
		const i18n = (window as typeof window & { __STACKATLAS_I18N__?: { changeLanguage: (value: string) => Promise<void> } }).__STACKATLAS_I18N__;
		if (!i18n) {
			throw new Error('i18n instance is not exposed on window');
		}
		await i18n.changeLanguage(lng);
	}, language);
}

test.describe('i18n language detection and fallbacks', () => {
	test.describe('browser locale detection', () => {
		test.use({ locale: 'en-US' });
		test('starts in English for en-US', async ({ page }) => {
			await page.goto('/');
			await expectCoreTranslations(page, 'en');
			await expect(page).toHaveScreenshot('i18n-en-initial.png', { fullPage: true });
		});
	});

	test.describe('browser locale detection (French)', () => {
		test.use({ locale: 'fr-FR' });
		test('starts in French for fr-FR', async ({ page }) => {
			await page.goto('/');
			await expectCoreTranslations(page, 'fr');
			await expect(page).toHaveScreenshot('i18n-fr-initial.png', { fullPage: true });
		});
	});

	test.describe('fallback locale detection', () => {
		test.use({ locale: 'es-ES' });
		test('falls back to German for unsupported es-ES', async ({ page }) => {
			await page.goto('/');
			await expectCoreTranslations(page, 'de');
			await expect(page).toHaveScreenshot('i18n-de-fallback-initial.png', { fullPage: true });
		});
	});

	test('manually switches DE/EN/FR and persists after reload', async ({ page }) => {
		await page.goto('/');

		await changeLanguage(page, 'de');
		await expectCoreTranslations(page, 'de');

		await changeLanguage(page, 'en');
		await expectCoreTranslations(page, 'en');

		await changeLanguage(page, 'fr');
		await expectCoreTranslations(page, 'fr');

		await page.reload();
		await expectCoreTranslations(page, 'fr');
		await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
		await expect(page).toHaveScreenshot('i18n-fr-after-reload.png', { fullPage: true });
	});

	test('returns a defined fallback string for missing translation keys', async ({ page }) => {
		await page.goto('/');
		const missingKeyValue = await page.evaluate(() => {
			const i18n = (window as typeof window & { __STACKATLAS_I18N__?: { t: (key: string) => string } }).__STACKATLAS_I18N__;
			if (!i18n) {
				throw new Error('i18n instance is not exposed on window');
			}
			return i18n.t('results.this_key_does_not_exist_anywhere');
		});

		expect(missingKeyValue).toBe(EXPECTED.de.missingKeyFallback);
		expect(missingKeyValue).not.toContain('this_key_does_not_exist_anywhere');
	});
});
