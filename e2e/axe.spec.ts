import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test.describe('Accessibility – axe-core', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('full page has no automatically detectable WCAG violations', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('header has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.include('header')
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('search bar has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.include('.search-bar')
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('category grid has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.include('.category-container')
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('footer has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.include('footer')
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('each route contains exactly one #main-content landmark target', async ({ page }) => {
		const routes = ['#/', '#/deps', '#/graphs', '#/news', '#/settings', '#/imprint'];

		for (const route of routes) {
			await page.goto(`/${route}`);
			await expect(page.locator('#main-content')).toHaveCount(1);
		}
	});
});
