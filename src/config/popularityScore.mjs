/**
 * Shared popularity scoring functions.
 *
 * This file is intentionally plain ESM (.mjs) so it can be imported both by
 * the Node.js build script (scripts/generate-data.mjs) and by the TypeScript
 * runtime utility (src/utils/popularityScore.ts via the companion .d.mts file).
 * Keeping a single source here ensures the build-time data generation and the
 * app's runtime scoring always use identical logic.
 */

import { POPULARITY_REF_DOCKER_WEEKLY, POPULARITY_REF_GITHUB_STARS, POPULARITY_REF_NPM_WEEKLY, POPULARITY_REF_PYPI_WEEKLY } from './adoptionScoringWeights.mjs';

/** Default age factor for metrics with unknown update date */
export const DEFAULT_METRICS_AGE_FACTOR = 0.8;

/**
 * Normalize a raw popularity signal to [0, 1] using logarithmic scaling.
 * Clamps negative values to 0 for safety.
 */
export function normalizeSignal(value, ref) {
	return Math.min(1.0, Math.log1p(Math.max(0, value)) / Math.log1p(ref));
}

/**
 * Compute raw popularity score from all available metrics.
 * Uses the maximum normalized signal, with a small bonus for multi-platform presence.
 * Returns a value in [0, 1].
 */
export function computeRawPopularityScore(metrics) {
	const signals = [];

	if (metrics.githubStars !== undefined) {
		signals.push(normalizeSignal(metrics.githubStars, POPULARITY_REF_GITHUB_STARS));
	}
	if (metrics.npmWeeklyDownloads !== undefined) {
		signals.push(normalizeSignal(metrics.npmWeeklyDownloads, POPULARITY_REF_NPM_WEEKLY));
	}
	if (metrics.dockerWeeklyPulls !== undefined) {
		signals.push(normalizeSignal(metrics.dockerWeeklyPulls, POPULARITY_REF_DOCKER_WEEKLY));
	}
	if (metrics.pypiWeeklyDownloads !== undefined) {
		signals.push(normalizeSignal(metrics.pypiWeeklyDownloads, POPULARITY_REF_PYPI_WEEKLY));
	}

	if (signals.length === 0) return 0;

	const maxSignal = Math.max(...signals);
	const multiPlatformBonus = Math.max(0, Math.min(0.1, (signals.filter((s) => s > 0).length - 1) * 0.05));

	return Math.min(1.0, maxSignal + multiPlatformBonus);
}

/**
 * Compute age factor based on how recent the metrics are.
 * Newer data (≤6 months) gets full weight (1.0).
 * Data older than 24 months gets half weight (0.5).
 */
export function ageFactor(updatedAt) {
	if (!updatedAt) return DEFAULT_METRICS_AGE_FACTOR;

	const updated = new Date(updatedAt);
	const now = new Date();
	const ageMs = now.getTime() - updated.getTime();
	const ageMonths = ageMs / (1000 * 60 * 60 * 24 * 30.44);

	if (ageMonths <= 6) return 1.0;
	if (ageMonths <= 12) return 0.9;
	if (ageMonths <= 24) return 0.7;
	return 0.5;
}

/**
 * Compute popularity score (0-100) from metrics.
 * Returns 0 if metrics are missing or empty.
 */
export function computePopularityScore(metrics) {
	if (!metrics) return undefined;
	const raw = computeRawPopularityScore(metrics);
	const age = ageFactor(metrics.updatedAt);
	return Math.round(raw * age * 100);
}
