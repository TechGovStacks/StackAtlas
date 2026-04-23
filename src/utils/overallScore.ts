import {
	CONTRIBUTOR_CONTEXT_MIN_ADOPTION,
	CONTRIBUTOR_CONTEXT_MIN_SOVEREIGN_ADOPTION,
	MAINTAINER_CONTEXT_MIN_ADOPTION,
	MAINTAINER_CONTEXT_MIN_SOVEREIGN_ADOPTION,
	POPULARITY_ADOPTION_BLEND,
	POPULARITY_ADOPTION_WEIGHT,
} from '../config/adoptionScoringWeights.mjs';
import type { AdoptionResult, StackItem } from '../types/index.js';

// Overall score weights (exported so UI can display the derivation without hardcoding)
export const SOVEREIGNTY_WEIGHT = 0.6;
export const SOVEREIGN_ADOPTION_WEIGHT = 0.25;
export const ADOPTION_WEIGHT = 0.15;

/**
 * Compute overall score as a weighted combination of:
 * - 60% sovereignty score
 * - 25% sovereign adoption score
 * - 15% adoption score (optionally blended with popularity score)
 *
 * If popularityScore is present, adoption score is blended:
 *   blendedAdoption = 0.7 × adoptionScore + 0.3 × popularityScore
 *
 * All inputs are expected to be normalized to [0, 100].
 * Result is clamped to [0, 100].
 */
export function computeOverallScore(sovereigntyScore: number, adoption: AdoptionResult): number {
	let adoptionScoreToUse = adoption.adoptionScore;

	// If popularity score is available, blend it with adoption score
	if (adoption.popularityScore !== undefined) {
		adoptionScoreToUse = POPULARITY_ADOPTION_WEIGHT * adoption.adoptionScore + POPULARITY_ADOPTION_BLEND * adoption.popularityScore;
	}

	const combined = SOVEREIGNTY_WEIGHT * sovereigntyScore + SOVEREIGN_ADOPTION_WEIGHT * adoption.sovereignAdoptionScore + ADOPTION_WEIGHT * adoptionScoreToUse;

	return Math.round(Math.max(0, Math.min(100, combined)));
}

export function withStackRoleAdoptionContext(adoption: AdoptionResult, stackItem?: StackItem): AdoptionResult {
	if (!stackItem || stackItem.status === 'deprecated') {
		return adoption;
	}

	if (stackItem.role === 'maintainer') {
		return {
			...adoption,
			adoptionScore: Math.max(adoption.adoptionScore, MAINTAINER_CONTEXT_MIN_ADOPTION),
			sovereignAdoptionScore: Math.max(adoption.sovereignAdoptionScore, MAINTAINER_CONTEXT_MIN_SOVEREIGN_ADOPTION),
		};
	}

	if (stackItem.role === 'contributor') {
		return {
			...adoption,
			adoptionScore: Math.max(adoption.adoptionScore, CONTRIBUTOR_CONTEXT_MIN_ADOPTION),
			sovereignAdoptionScore: Math.max(adoption.sovereignAdoptionScore, CONTRIBUTOR_CONTEXT_MIN_SOVEREIGN_ADOPTION),
		};
	}

	return adoption;
}

export function computeContextualOverallScore(sovereigntyScore: number, adoption: AdoptionResult, stackItem?: StackItem): number {
	return computeOverallScore(sovereigntyScore, withStackRoleAdoptionContext(adoption, stackItem));
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
