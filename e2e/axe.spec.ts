import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa'];
const FILTER_REGION_NAME_PATTERN = /search and filter|suche und filter|recherche et filtres/i;

test.describe('Accessibility – axe-core', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('full page has no automatically detectable WCAG violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

		expect(results.violations).toEqual([]);
	});

	test('header has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).include('[role="banner"]').withTags(WCAG_TAGS).analyze();

		expect(results.violations).toEqual([]);
	});

	test('filter region has no axe violations', async ({ page }) => {
		await expect(page.getByRole('region', { name: FILTER_REGION_NAME_PATTERN })).toBeVisible();

		const results = await new AxeBuilder({ page }).include('[role="region"][aria-label]').withTags(WCAG_TAGS).analyze();

		expect(results.violations).toEqual([]);
	});

	test('main landmark has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).include('[role="main"]').withTags(WCAG_TAGS).analyze();

		expect(results.violations).toEqual([]);
	});

	test('footer has no axe violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).include('[role="contentinfo"]').withTags(WCAG_TAGS).analyze();

		expect(results.violations).toEqual([]);
	});

	test('each route contains exactly one #main-content landmark target', async ({ page }) => {
		const routes = ['#/', '#/deps', '#/graphs', '#/news', '#/settings', '#/imprint'];

		for (const route of routes) {
			await page.goto(`/${route}`);
			await expect(page.locator('#main-content')).toHaveCount(1);
		}
	});

	test('all routes have no duplicate ids and unique landmark regions', async ({ page }) => {
		const routes = ['#/', '#/deps', '#/graphs', '#/news', '#/settings', '#/imprint'];

		for (const route of routes) {
			await page.goto(`/${route}`);

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

			expect.soft(duplicateIds, `duplicate ids on route ${route}`).toEqual([]);
			await expect.soft(page.getByRole('banner'), `banner count on route ${route}`).toHaveCount(1);
			await expect.soft(page.getByRole('main'), `main count on route ${route}`).toHaveCount(1);
			await expect.soft(page.getByRole('contentinfo'), `contentinfo count on route ${route}`).toHaveCount(1);

			const duplicateRegionNames = await page.evaluate(() => {
				const regions = Array.from(document.querySelectorAll('[role="region"][aria-label]'));
				const labels = regions.map((region) => region.getAttribute('aria-label')?.trim() ?? '').filter(Boolean);
				const counts = new Map<string, number>();

				for (const label of labels) {
					counts.set(label, (counts.get(label) ?? 0) + 1);
				}

				return Array.from(counts.entries())
					.filter(([, count]) => count > 1)
					.map(([label]) => label);
			});

			expect.soft(duplicateRegionNames, `duplicate region names on route ${route}`).toEqual([]);
		}
	});
});
