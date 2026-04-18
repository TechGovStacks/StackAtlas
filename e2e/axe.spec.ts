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

	test('filter region has no axe violations', async ({ page }) => {
		await expect(page.getByRole('region', { name: /search|suche|recherche/i })).toBeVisible();

		const results = await new AxeBuilder({ page })
			.include('section.filter-bar[aria-label]')
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('main landmark has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.include('main')
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

	test('home page has no duplicate ids and unique landmark regions', async ({ page }) => {
		const duplicateIds = await page.evaluate(() => {
			const ids = Array.from(document.querySelectorAll('[id]'))
				.map((element) => element.id)
				.filter(Boolean);
			const counts = new Map<string, number>();

			for (const id of ids) {
				counts.set(id, (counts.get(id) ?? 0) + 1);
			}

			return Array.from(counts.entries())
				.filter(([, count]) => count > 1)
				.map(([id]) => id);
		});

		expect(duplicateIds).toEqual([]);
		await expect(page.getByRole('banner')).toHaveCount(1);
		await expect(page.getByRole('main')).toHaveCount(1);
		await expect(page.getByRole('contentinfo')).toHaveCount(1);

		const duplicateRegionNames = await page.evaluate(() => {
			const regions = Array.from(document.querySelectorAll('section[aria-label], [role="region"][aria-label]'));
			const labels = regions
				.map((region) => region.getAttribute('aria-label')?.trim() ?? '')
				.filter(Boolean);
			const counts = new Map<string, number>();

			for (const label of labels) {
				counts.set(label, (counts.get(label) ?? 0) + 1);
			}

			return Array.from(counts.entries())
				.filter(([, count]) => count > 1)
				.map(([label]) => label);
		});

		expect(duplicateRegionNames).toEqual([]);
	});
});
