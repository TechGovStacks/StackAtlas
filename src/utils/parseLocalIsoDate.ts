/**
 * Parses a local ISO date string (YYYY-MM-DD) into a Date object.
 * Falls back to native Date parsing if the string doesn't match ISO format.
 *
 * @param value - The date string to parse (expected format: YYYY-MM-DD)
 * @returns A Date object, or an invalid Date if parsing fails
 */
export function parseLocalIsoDate(value: string): Date {
	// Try ISO format YYYY-MM-DD first
	const parts = value.split('-');
	if (parts.length === 3) {
		const year = Number(parts[0]);
		const month = Number(parts[1]);
		const day = Number(parts[2]);

		// Check all parts are valid numbers (not NaN) and within reasonable ranges
		if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
			const date = new Date(year, month - 1, day);
			// Validate the date is actually valid (e.g., catches Feb 30, Apr 31, etc.)
			if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
				return date;
			}
		}
	}

	// Fallback to native Date parsing
	return new Date(value);
}
