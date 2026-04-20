import {
	POPULARITY_REF_DOCKER_WEEKLY,
	POPULARITY_REF_GITHUB_STARS,
	POPULARITY_REF_NPM_WEEKLY,
	POPULARITY_REF_PYPI_WEEKLY,
} from '../config/adoptionScoringWeights.mjs';
import type { PopularityMetrics } from '../types/index.js';

/**
 * Normalize a raw popularity signal to [0, 1] using logarithmic scaling.
 * At value = ref, returns 1.0 (capped).
 * At value = 0, returns 0.0.
 * Formula: min(1.0, log1p(value) / log1p(ref))
 */
function normalizeSignal(value: number, ref: number): number {
	return Math.min(1.0, Math.log1p(value) / Math.log1p(ref));
}

/**
 * Compute raw popularity score from all available metrics.
 * Uses the maximum normalized signal, with a small bonus for multi-platform presence.
 * Returns a value in [0, 1].
 */
function computeRawPopularityScore(metrics: PopularityMetrics): number {
	const signals: number[] = [];

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
function ageFactor(updatedAt?: string): number {
	if (!updatedAt) return 0.8;

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
 * Main export: compute popularity score (0-100).
 * Returns 0 if metrics are missing or empty.
 */
export function computePopularityScore(metrics: PopularityMetrics): number {
	const raw = computeRawPopularityScore(metrics);
	const age = ageFactor(metrics.updatedAt);
	return Math.round(raw * age * 100);
}

// Export for testing
export { ageFactor, computeRawPopularityScore, normalizeSignal };
