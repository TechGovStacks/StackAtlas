import type { AdoptionResult } from '../types/index.js';

// Overall score weights (exported so UI can display the derivation without hardcoding)
export const SOVEREIGNTY_WEIGHT = 0.6;
export const SOVEREIGN_ADOPTION_WEIGHT = 0.25;
export const ADOPTION_WEIGHT = 0.15;

/**
 * Compute overall score as a weighted combination of:
 * - 60% sovereignty score
 * - 25% sovereign adoption score
 * - 15% adoption score
 *
 * All inputs are expected to be normalized to [0, 100].
 * Result is clamped to [0, 100].
 */
export function computeOverallScore(sovereigntyScore: number, adoption: AdoptionResult): number {
	const combined =
		SOVEREIGNTY_WEIGHT * sovereigntyScore + SOVEREIGN_ADOPTION_WEIGHT * adoption.sovereignAdoptionScore + ADOPTION_WEIGHT * adoption.adoptionScore;

	return Math.round(Math.max(0, Math.min(100, combined)));
}

/**
 * Update adoption result with computed overall score.
 */
export function enrichAdoptionWithOverallScore(adoption: AdoptionResult, sovereigntyScore: number): AdoptionResult {
	return {
		...adoption,
		overallScore: computeOverallScore(sovereigntyScore, adoption),
	};
}
