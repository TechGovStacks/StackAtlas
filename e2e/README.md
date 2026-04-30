# E2E Test Helpers

## How to write helpers

- Use only public Playwright APIs (`test`, `expect`, fixtures, and helper functions).
- Place shared helpers in this folder as plain TypeScript functions or as Playwright fixtures.
- Do **not** use or reimplement Playwright internals, monkey-patch, or proxy `test`/`expect`.
- Example helper:

```ts
// helpers.ts
import { expect, Page } from '@playwright/test';

export async function expectSplashGone(page: Page) {
	await page.waitForSelector('#splash', { state: 'detached', timeout: 3000 });
}
```

- Import helpers in your test files as needed.

## Why?

- Using only public APIs ensures your tests are stable and maintainable across Playwright upgrades.
- Internal API usage is unsupported and may break at any time.
