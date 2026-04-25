import { expect, test } from 'vitest';
import { countryToFlagEmoji } from '../countryFlag';

test('countryToFlagEmoji converts valid 2-char codes', () => {
	expect(countryToFlagEmoji('DE')).toBe('🇩🇪');
	expect(countryToFlagEmoji('EU')).toBe('🇪🇺');
	expect(countryToFlagEmoji('US')).toBe('🇺🇸');
	expect(countryToFlagEmoji('FR')).toBe('🇫🇷');
});

test('countryToFlagEmoji handles lowercase codes', () => {
	expect(countryToFlagEmoji('de')).toBe('🇩🇪');
	expect(countryToFlagEmoji('us')).toBe('🇺🇸');
});

test('countryToFlagEmoji returns empty string for invalid codes', () => {
	expect(countryToFlagEmoji()).toBe('');
	expect(countryToFlagEmoji('')).toBe('');
	expect(countryToFlagEmoji('D')).toBe('');
	expect(countryToFlagEmoji('DEU')).toBe('');
	expect(countryToFlagEmoji('123')).toBe('');
	expect(countryToFlagEmoji(null as unknown as string)).toBe('');
});
