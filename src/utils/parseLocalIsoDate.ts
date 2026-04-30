export function parseLocalIsoDate(value: string): Date {
	const [year, month, day] = value.split('-').map(Number);

	if (!year || !month || !day) {
		return new Date(value);
	}

	return new Date(year, month - 1, day);
}
