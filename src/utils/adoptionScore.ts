import {
	ADOPTION_NORMALIZATION_ANCHOR,
	ADOPTION_NORMALIZATION_PERCENTILE,
	CONTRIBUTOR_LOW_COVERAGE_BOOST,
	DIVERSITY_MAX_FACTOR,
	DIVERSITY_MIN_FACTOR,
	HIGH_SOVEREIGNTY_SOFT_FLOOR_SCORE,
	HIGH_SOVEREIGNTY_THRESHOLD,
	LOW_COVERAGE_THRESHOLD,
	MAINTAINER_LOW_COVERAGE_BOOST,
	ROLE_WEIGHTS,
	SIZE_DAMP_REFERENCE,
	SOVEREIGNTY_THRESHOLD,
	STATUS_WEIGHTS,
	TRANSITIVE_WEIGHT,
} from '../config/adoptionScoringWeights.mjs';
import type { AdoptionResult, Item, ParticipantRole, Stack } from '../types/index.js';

/**
 * SIZE_DAMP: Normalize contribution by stack size.
 * Larger stacks (more items) have their contributions dampened.
 * Formula: 1 / (1 + log10(max(1, stack.items.length / 20)))
 */
function sizedampening(stackSize: number): number {
	const normalized = Math.max(1, stackSize / SIZE_DAMP_REFERENCE);
	return 1 / (1 + Math.log10(normalized));
}

function getLowCoverageRoleBoost(role: ParticipantRole): number {
	if (role === 'maintainer') {
		return MAINTAINER_LOW_COVERAGE_BOOST;
	}

	if (role === 'contributor') {
		return CONTRIBUTOR_LOW_COVERAGE_BOOST;
	}

	return 0;
}

/**
 * Compute geographic diversity using Simpson's Diversity Index (SDI).
 * SDI = 1 - Σ p_c²
 * where p_c is the proportion of items from country c.
 * Result in [0, 1]: 0 = mono-culture, 1 = perfect diversity.
 * Stacks without country go into bucket "_unknown".
 */
function computeDiversity(stacks: Stack[], itemId: string): number {
	const countryFreq = new Map<string, number>();
	let totalCount = 0;

	for (const stack of stacks) {
		const found = stack.items.some((si) => si.itemId === itemId);
		if (!found) continue;

		const country = stack.country || '_unknown';
		countryFreq.set(country, (countryFreq.get(country) || 0) + 1);
		totalCount++;
	}

	if (totalCount === 0) return 0;

	let sumSquares = 0;
	for (const freq of countryFreq.values()) {
		const p = freq / totalCount;
		sumSquares += p * p;
	}

	return 1 - sumSquares;
}

/**
 * Build a reverse dependency map: for each item, which items depend on it?
 */
function buildReverseDependencyMap(items: Item[]): Map<string, string[]> {
	const reverseMap = new Map<string, string[]>();

	for (const item of items) {
		if (!item.dependencies) continue;
		for (const dep of item.dependencies) {
			const target = dep.targetItemId;
			if (!reverseMap.has(target)) {
				reverseMap.set(target, []);
			}
			reverseMap.get(target)!.push(item.id);
		}
	}

	return reverseMap;
}

/**
 * Compute direct stack coverage: sum of (role weight × status weight × size dampening)
 * across all stacks where this item appears.
 *
 * In low-coverage situations, maintainer/contributor receive a calibrated boost to
 * reflect intentional ownership and influence.
 */
function computeDirectCoverage(
	itemId: string,
	stacks: Stack[],
	itemSovereigntyScore: number | undefined,
): { coverage: number; sovereignCoverage: number; stackIds: string[] } {
	let directCoverage = 0;
	let sovereignCoverage = 0;
	const stackIds: string[] = [];

	for (const stack of stacks) {
		const stackItem = stack.items.find((si) => si.itemId === itemId);
		if (!stackItem) continue;

		stackIds.push(stack.id);

		const roleWeight = ROLE_WEIGHTS[stackItem.role];
		const statusWeight = STATUS_WEIGHTS[stackItem.status];
		const sizeWeight = sizedampening(stack.items.length);

		let contribution = roleWeight * statusWeight * sizeWeight;
		if (directCoverage < LOW_COVERAGE_THRESHOLD) {
			const lowCoverageBoost = getLowCoverageRoleBoost(stackItem.role);
			contribution *= 1 + lowCoverageBoost;
		}

		directCoverage += contribution;

		// Sovereign adoption: only if stack is sovereignly-rated AND item ≥ threshold
		if (itemSovereigntyScore !== undefined && itemSovereigntyScore >= SOVEREIGNTY_THRESHOLD) {
			sovereignCoverage += contribution;
		}
	}

	return { coverage: directCoverage, sovereignCoverage, stackIds };
}

type ItemCacheEntry = {
	coverage: number;
	sovereignCoverage: number;
	stackIds: string[];
	diversity: number;
};

/**
 * Compute transitive coverage using a pre-built cache of direct coverages.
 * Avoids re-running computeDirectCoverage for every dependent on every item.
 */
function computeTransitiveCoverage(
	itemId: string,
	reverseDeps: Map<string, string[]>,
	itemCache: Map<string, ItemCacheEntry>,
): { coverage: number; sovereignCoverage: number } {
	let transitiveCoverage = 0;
	let sovereignTransitiveCoverage = 0;

	const dependents = reverseDeps.get(itemId) || [];
	for (const dependentId of dependents) {
		const cached = itemCache.get(dependentId);
		if (!cached) continue;

		transitiveCoverage += TRANSITIVE_WEIGHT * cached.coverage;
		sovereignTransitiveCoverage += TRANSITIVE_WEIGHT * cached.sovereignCoverage;
	}

	return { coverage: transitiveCoverage, sovereignCoverage: sovereignTransitiveCoverage };
}

/**
 * Compute adoption score (0-100) with all weightings, log dampening, and diversity.
 */
function computeRawAdoptionScore(directCoverage: number, transitiveCoverage: number, diversity: number): number {
	const totalCoverage = directCoverage + transitiveCoverage;
	const withDiversity = Math.log1p(totalCoverage) * (DIVERSITY_MIN_FACTOR + DIVERSITY_MAX_FACTOR * diversity);
	return withDiversity;
}

function computePercentile(values: number[], percentile: number): number {
	if (values.length === 0) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	const clampedPercentile = Math.max(0, Math.min(1, percentile));
	const index = Math.ceil(clampedPercentile * sorted.length) - 1;
	return sorted[Math.max(0, Math.min(sorted.length - 1, index))];
}

function normalizeRawScore(raw: number, denominator: number): number {
	if (denominator <= 0) return 0;
	return Math.round(Math.max(0, Math.min(100, (100 * raw) / denominator)));
}

/**
 * Main export: compute adoption scores for all items.
 * Returns a map of itemId → AdoptionResult.
 */
export function computeAdoptionScores(items: Item[], stacks: Stack[], reverseDeps?: Map<string, string[]>): Map<string, AdoptionResult> {
	const reverseMap = reverseDeps || buildReverseDependencyMap(items);

	// Pre-pass: compute direct coverage and geographic diversity for every item
	// once and store in a cache. This avoids redundant stack traversals both in
	// the scoring loop and in computeTransitiveCoverage (which looks up dependents
	// from the same cache instead of re-running computeDirectCoverage).
	const itemCache = new Map<string, ItemCacheEntry>();
	for (const item of items) {
		const { coverage, sovereignCoverage, stackIds } = computeDirectCoverage(item.id, stacks, item.sovereigntyScore);
		const diversity = computeDiversity(stacks, item.id);
		itemCache.set(item.id, { coverage, sovereignCoverage, stackIds, diversity });
	}

	// First pass: compute all raw scores using the cache
	const rawScores = new Map<
		string,
		{
			adoption: number;
			sovereignAdoption: number;
			direct: number;
			transitive: number;
			diversity: number;
			stackIds: string[];
		}
	>();

	for (const item of items) {
		const { coverage: directCov, sovereignCoverage: directSovCov, stackIds, diversity } = itemCache.get(item.id)!;
		const { coverage: transitiveCov, sovereignCoverage: transitiveSovCov } = computeTransitiveCoverage(item.id, reverseMap, itemCache);

		const adoption = computeRawAdoptionScore(directCov, transitiveCov, diversity);
		const sovereignAdoption = computeRawAdoptionScore(directSovCov, transitiveSovCov, diversity);

		rawScores.set(item.id, {
			adoption,
			sovereignAdoption,
			direct: directCov,
			transitive: transitiveCov,
			diversity,
			stackIds,
		});
	}

	// Second pass: normalize to [0, 100] using percentile anchors for robustness
	const adoptionRawValues = Array.from(rawScores.values()).map((entry) => entry.adoption);
	const sovereignAdoptionRawValues = Array.from(rawScores.values()).map((entry) => entry.sovereignAdoption);

	const adoptionDenominator = Math.max(computePercentile(adoptionRawValues, ADOPTION_NORMALIZATION_PERCENTILE), ADOPTION_NORMALIZATION_ANCHOR);
	const sovereignAdoptionDenominator = Math.max(
		computePercentile(sovereignAdoptionRawValues, ADOPTION_NORMALIZATION_PERCENTILE),
		ADOPTION_NORMALIZATION_ANCHOR,
	);

	const results = new Map<string, AdoptionResult>();

	for (const item of items) {
		const raw = rawScores.get(item.id);
		if (!raw) continue;

		let adoptionScore = normalizeRawScore(raw.adoption, adoptionDenominator);
		const sovereignAdoptionScore = normalizeRawScore(raw.sovereignAdoption, sovereignAdoptionDenominator);

		if (item.sovereigntyScore !== undefined && item.sovereigntyScore >= HIGH_SOVEREIGNTY_THRESHOLD && raw.adoption > 0) {
			adoptionScore = Math.max(adoptionScore, HIGH_SOVEREIGNTY_SOFT_FLOOR_SCORE);
		}

		results.set(item.id, {
			adoptionScore,
			sovereignAdoptionScore,
			overallScore: 0, // Will be set by overallScore.ts
			directCoverage: raw.direct,
			transitiveCoverage: raw.transitive,
			diversity: raw.diversity,
			usedInStacks: raw.stackIds,
		});
	}

	return results;
}
