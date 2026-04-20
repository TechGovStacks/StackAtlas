import { describe, expect, it } from 'vitest';
import { ITEMS } from '../../data/catalog.js';

describe('sublayer classification migration', () => {
	it('contains no item with the legacy sublayer "entwicklung"', () => {
		const legacyItems = ITEMS.filter((item) => item.sublayer === 'entwicklung');
		expect(legacyItems).toEqual([]);
	});
});
