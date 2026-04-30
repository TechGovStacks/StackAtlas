type LocatorLike = {
	count: () => Promise<number>;
};

type PageLike = {
	evaluate: (pageFunction: () => void) => Promise<unknown>;
	goto: (url: string) => Promise<unknown>;
	keyboard: {
		press: (key: string) => Promise<void>;
	};
	locator: (selector: string) => LocatorLike;
	waitForSelector: (selector: string, options: { state: 'attached' | 'detached' | 'visible'; timeout: number }) => Promise<unknown>;
	waitForTimeout: (timeout: number) => Promise<void>;
};

export async function gotoApp(page: PageLike, path = '/'): Promise<void> {
	await page.goto(path);
	await closeStartupOverlays(page);
}

export async function closeStartupOverlays(page: PageLike): Promise<void> {
	const splash = page.locator('#splash');
	const mainContent = page.locator('#main-content');

	for (let attempt = 0; attempt < 10; attempt += 1) {
		if ((await mainContent.count()) > 0) {
			break;
		}
		if ((await splash.count()) === 0) {
			break;
		}
		await page.keyboard.press('Escape');
		await page.evaluate(() => {
			document.getElementById('splash')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		});
		await page.waitForSelector('#splash', { state: 'detached', timeout: 3000 });
	}

	await page.waitForSelector('#main-content', { state: 'visible', timeout: 10000 });
	await page.waitForSelector('#splash', { state: 'detached', timeout: 3000 }).catch(async () => {
		if ((await splash.count()) > 0) {
			throw new Error('Splash overlay did not close before app assertions started.');
		}
	});

	const betaModal = page.locator('.beta-modal-overlay');
	if ((await betaModal.count()) > 0) {
		await page.keyboard.press('Escape');
		await page.waitForSelector('.beta-modal-overlay', { state: 'detached', timeout: 3000 });
	}
}
