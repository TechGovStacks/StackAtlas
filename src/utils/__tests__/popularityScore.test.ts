import { describe, expect, it } from 'vitest';
import type { PopularityMetrics } from '../../types';
import { ageFactor, computePopularityScore, computeRawPopularityScore, normalizeSignal } from '../popularityScore';

describe('popularityScore', () => {
	describe('normalizeSignal', () => {
		it('returns 0 for zero value', () => {
			expect(normalizeSignal(0, 50_000)).toBe(0);
		});

		it('returns 1.0 for value >= ref', () => {
			expect(normalizeSignal(50_000, 50_000)).toBe(1.0);
			expect(normalizeSignal(100_000, 50_000)).toBe(1.0);
		});

		it('scales logarithmically between 0 and 1', () => {
			const normalized = normalizeSignal(5_000, 50_000);
			expect(normalized).toBeGreaterThan(0);
			expect(normalized).toBeLessThan(1.0);
		});

		it('handles npm weekly downloads reference', () => {
			const npm5M = normalizeSignal(5_000_000, 5_000_000);
			expect(npm5M).toBe(1.0);
		});
	});

	describe('computeRawPopularityScore', () => {
		it('returns 0 for empty metrics', () => {
			const metrics: PopularityMetrics = { updatedAt: '2026-04-20' };
			expect(computeRawPopularityScore(metrics)).toBe(0);
		});

		it('computes score from single github signal', () => {
			const metrics: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 50_000,
			};
			const raw = computeRawPopularityScore(metrics);
			expect(raw).toBe(1.0);
		});

		it('uses maximum across multiple signals', () => {
			const metrics: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 5_000,
				npmWeeklyDownloads: 5_000_000,
			};
			const raw = computeRawPopularityScore(metrics);
			// npm dominates at 1.0, bonus doesn't help due to cap
			expect(raw).toBe(1.0);
		});

		it('applies multi-platform bonus', () => {
			// Two items with the same github score
			const metricsSingle: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 1_000,
			};
			const metricsMulti: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 1_000,
				npmWeeklyDownloads: 10_000, // low enough to not dominate
			};

			const rawSingle = computeRawPopularityScore(metricsSingle);
			const rawMulti = computeRawPopularityScore(metricsMulti);

			// Multi should be slightly higher due to bonus only
			expect(rawMulti).toBeGreaterThan(rawSingle);
			// Difference should be small (the multi-platform bonus is max 0.1)
			expect(rawMulti - rawSingle).toBeLessThanOrEqual(0.11);
		});

		it('caps result at 1.0', () => {
			const metrics: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 1_000_000,
				npmWeeklyDownloads: 100_000_000,
			};
			const raw = computeRawPopularityScore(metrics);
			expect(raw).toBeLessThanOrEqual(1.0);
		});
	});

	describe('ageFactor', () => {
		it('returns 1.0 for recent data (≤6 months)', () => {
			const sixMonthsAgo = new Date();
			sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
			const isoDate = sixMonthsAgo.toISOString().split('T')[0];
			expect(ageFactor(isoDate)).toBe(1.0);
		});

		it('returns 0.9 for 9-month-old data', () => {
			const nineMonthsAgo = new Date();
			nineMonthsAgo.setMonth(nineMonthsAgo.getMonth() - 9);
			const isoDate = nineMonthsAgo.toISOString().split('T')[0];
			expect(ageFactor(isoDate)).toBe(0.9);
		});

		it('returns 0.7 for 18-month-old data', () => {
			const eighteenMonthsAgo = new Date();
			eighteenMonthsAgo.setMonth(eighteenMonthsAgo.getMonth() - 18);
			const isoDate = eighteenMonthsAgo.toISOString().split('T')[0];
			expect(ageFactor(isoDate)).toBe(0.7);
		});

		it('returns 0.5 for very old data (>24 months)', () => {
			const veryOld = new Date();
			veryOld.setFullYear(veryOld.getFullYear() - 3);
			const isoDate = veryOld.toISOString().split('T')[0];
			expect(ageFactor(isoDate)).toBe(0.5);
		});

		it('returns 0.8 for undefined date', () => {
			expect(ageFactor()).toBe(0.8);
			expect(ageFactor(undefined)).toBe(0.8);
		});
	});

	describe('computePopularityScore', () => {
		it('returns 0 for empty metrics', () => {
			const metrics: PopularityMetrics = { updatedAt: '2026-04-20' };
			expect(computePopularityScore(metrics)).toBe(0);
		});

		it('returns 100 for very popular recent item', () => {
			const metrics: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 100_000,
			};
			expect(computePopularityScore(metrics)).toBe(100);
		});

		it('scales with age factor', () => {
			const veryOld = new Date();
			veryOld.setFullYear(veryOld.getFullYear() - 3);
			const isoDate = veryOld.toISOString().split('T')[0];

			const metrics: PopularityMetrics = {
				updatedAt: isoDate,
				githubStars: 50_000,
			};

			const score = computePopularityScore(metrics);
			// raw = 1.0, age = 0.5, score = 50
			expect(score).toBe(50);
		});

		it('handles real-world example: nginx', () => {
			const metrics: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 23_500,
				dockerWeeklyPulls: 8_500_000,
			};
			const score = computePopularityScore(metrics);
			expect(score).toBeGreaterThan(80);
			expect(score).toBeLessThanOrEqual(100);
		});

		it('handles real-world example: kubernetes', () => {
			const metrics: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 113_000,
			};
			const score = computePopularityScore(metrics);
			expect(score).toBe(100);
		});

		it('handles real-world example: react', () => {
			const metrics: PopularityMetrics = {
				updatedAt: '2026-04-20',
				githubStars: 230_000,
				npmWeeklyDownloads: 52_000_000,
			};
			const score = computePopularityScore(metrics);
			expect(score).toBe(100);
		});
	});
});
