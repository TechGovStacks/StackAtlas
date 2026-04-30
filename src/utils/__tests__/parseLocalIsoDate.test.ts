import { describe, expect, test } from 'vitest';
import { parseLocalIsoDate } from '../parseLocalIsoDate';

describe('parseLocalIsoDate', () => {
	test('parses a valid ISO date string as local date', () => {
		const result = parseLocalIsoDate('2026-04-23');
		expect(result.getFullYear()).toBe(2026);
		expect(result.getMonth()).toBe(3); // April = index 3
		expect(result.getDate()).toBe(23);
	});

	test('falls back to new Date for unparseable input', () => {
		const result = parseLocalIsoDate('not-a-date');
		expect(result).toBeInstanceOf(Date);
	});

	test('handles first day of year', () => {
		const result = parseLocalIsoDate('2024-01-01');
		expect(result.getFullYear()).toBe(2024);
		expect(result.getMonth()).toBe(0);
		expect(result.getDate()).toBe(1);
	});
});
