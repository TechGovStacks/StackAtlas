import { ComponentType } from 'preact';
import { describe, expect, test } from 'vitest';
import { NewsEntry } from '../../types/news';
import { filterNewsEntries, sortNewsEntries } from '../newsUtils';

function makeEntry(date: string, tags: string[] = [], featured = false): NewsEntry {
	return {
		Content: (() => null) as unknown as ComponentType,
		date,
		featured,
		focus: undefined,
		slug: `slug-${date}`,
		summary: 'summary',
		tags,
		title: `title-${date}`,
	};
}

const entries: NewsEntry[] = [
	makeEntry('2026-04-01', ['demo', 'markdown']),
	makeEntry('2026-04-22', ['scoring']),
	makeEntry('2026-04-23', ['scoring', 'adoption'], true),
	makeEntry('2026-04-24', ['vergleichsgruppen']),
];

describe('sortNewsEntries', () => {
	test('sorts newest first by default', () => {
		const sorted = sortNewsEntries(entries, 'newest');
		expect(sorted[0].date).toBe('2026-04-24');
		expect(sorted[sorted.length - 1].date).toBe('2026-04-01');
	});

	test('sorts oldest first', () => {
		const sorted = sortNewsEntries(entries, 'oldest');
		expect(sorted[0].date).toBe('2026-04-01');
		expect(sorted[sorted.length - 1].date).toBe('2026-04-24');
	});

	test('does not mutate original array', () => {
		const original = [...entries];
		sortNewsEntries(entries, 'oldest');
		expect(entries).toEqual(original);
	});
});

describe('filterNewsEntries', () => {
	test('returns all entries when activeTag is null', () => {
		expect(filterNewsEntries(entries, null)).toHaveLength(entries.length);
	});

	test('filters by tag', () => {
		const result = filterNewsEntries(entries, 'scoring');
		expect(result).toHaveLength(2);
		expect(result.every((e) => e.tags.includes('scoring'))).toBe(true);
	});

	test('returns empty array when no entries match the tag', () => {
		expect(filterNewsEntries(entries, 'nonexistent')).toHaveLength(0);
	});
});
