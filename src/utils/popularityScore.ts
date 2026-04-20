import { computePopularityScore as _computePopularityScore, ageFactor, computeRawPopularityScore, normalizeSignal } from '../config/popularityScore.mjs';
import type { PopularityMetrics } from '../types/index.js';

/**
 * Main export: compute popularity score (0-100) for an item with popularity metrics.
 * Returns 0 if metrics are missing or empty.
 *
 * This is a thin wrapper around the shared implementation in popularityScore.mjs
 * to provide type safety with TypeScript's PopularityMetrics type.
 */
export function computePopularityScore(metrics: PopularityMetrics): number {
	return _computePopularityScore(metrics) ?? 0;
}

// Export helpers for testing
export { ageFactor, computeRawPopularityScore, normalizeSignal };
