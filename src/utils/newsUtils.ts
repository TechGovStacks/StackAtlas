import { NewsEntry } from '../types/news';

export function sortNewsEntries(entries: NewsEntry[], sortOrder: 'newest' | 'oldest'): NewsEntry[] {
	return [...entries].sort((a, b) => (sortOrder === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
}

export function filterNewsEntries(entries: NewsEntry[], activeTag: string | null): NewsEntry[] {
	if (!activeTag) return entries;
	return entries.filter((e) => e.tags.includes(activeTag));
}
