import { expect, test } from '@playwright/test';

test.describe('StackAtlas App', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('renders header with title', async ({ page }) => {
		await expect(page.locator('h1')).toHaveText('StackAtlas');
		await expect(page.locator('header p')).toContainText('ecosystem');
	});

	test('renders search bar', async ({ page }) => {
		await expect(page.locator('.search-bar')).toBeVisible();
	});

	test('renders article cards', async ({ page }) => {
		await expect(page.locator('.articles-grid')).toBeVisible();
		const cards = page.locator('.article-card');
		await expect(cards.first()).toBeVisible();
	});

	test('renders category filter buttons', async ({ page }) => {
		const filterButtons = page.locator('.category-filters kol-button');
		await expect(filterButtons).not.toHaveCount(0);
	});

	test('renders footer', async ({ page }) => {
		await expect(page.locator('footer')).toBeVisible();
		await expect(page.locator('footer p')).toContainText('StackAtlas');
	});

	test('screenshot – full page on load', async ({ page }) => {
		await expect(page.locator('.article-card').first()).toBeVisible();
		await expect(page).toHaveScreenshot('full-page.png', { fullPage: true });
	});

	test('dependency edges are keyboard operable via button list without SVG hitboxes', async ({ page }) => {
		await page.goto('/#/graphs');

		const edgeButtons = page.locator('.dependency-graph__edge-list .dependency-graph__edge-button');
		await expect(edgeButtons.first()).toBeVisible();
		await expect(edgeButtons).not.toHaveCount(0);
		await expect(page.locator('.dependency-graph__edge-hitbox')).toHaveCount(0);
		await expect(page.locator('.dependency-graph__edge-list > li')).toHaveCount(await edgeButtons.count());

		const edgeButtonCount = await edgeButtons.count();
		for (let index = 0; index < edgeButtonCount; index += 1) {
			const currentButton = edgeButtons.nth(index);
			const currentEdgeId = await currentButton.getAttribute('data-edge-id');

			await currentButton.focus();
			await page.keyboard.press('Enter');

			await expect(page.locator('.dependency-graph__edge-button[aria-current=\"true\"]')).toHaveCount(1);
			await expect(currentButton).toHaveAttribute('aria-current', 'true');
			await expect(page.locator(`.dependency-graph__edge-button[data-edge-id=\"${currentEdgeId}\"]`)).toHaveAttribute('aria-current', 'true');
		}
	});

	test('screenshot – header', async ({ page }) => {
		const header = page.locator('header');
		await expect(header).toHaveScreenshot('header.png');
	});

	test('screenshot – search bar', async ({ page }) => {
		const searchBar = page.locator('.search-bar');
		await expect(searchBar).toHaveScreenshot('search-bar.png');
	});

	test('screenshot – category filters', async ({ page }) => {
		const filters = page.locator('.category-filters');
		await expect(filters).toHaveScreenshot('category-filters.png');
	});

	test('screenshot – articles grid', async ({ page }) => {
		const grid = page.locator('.articles-grid');
		await expect(grid).toHaveScreenshot('articles-grid.png');
	});

	test('screenshot – footer', async ({ page }) => {
		const footer = page.locator('footer');
		await expect(footer).toHaveScreenshot('footer.png');
	});
});
