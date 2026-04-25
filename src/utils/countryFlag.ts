/**
 * Converts a 2-letter ISO country code to a flag emoji.
 *
 * @param code - The 2-letter ISO country code (e.g., 'DE', 'US').
 * @returns The flag emoji or an empty string if the code is invalid.
 */
export function countryToFlagEmoji(code?: string): string {
	if (!code || !/^[a-z]{2}$/i.test(code)) return '';
	return [...code.toUpperCase()]
		.map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
		.join('');
}

