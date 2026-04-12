import { OwnerType, SovereigntyCriteria, SovereigntyScoreCategory, SovereigntyScoreResult } from '../types';

// Base weights sum to 90; max owner bonus is 10 → total maximum = 100 (no hard cap needed)
const WEIGHTS: Record<keyof Omit<SovereigntyCriteria, 'ownerType'>, number> = {
	openSource: 25,
	euHeadquartered: 20,
	hasAudit: 20,
	permissiveLicense: 10,
	matureProject: 10,
	largeEcosystem: 5,
};

const OWNER_WEIGHTS: Record<OwnerType, number> = {
	independentConsortium: 10,
	community: 7,
	corporation: 3,
	oneManShow: 0,
};

// Hybrid Scoring Scale: 6 Categories
const SCORE_CATEGORIES: Array<{
	category: SovereigntyScoreCategory;
	min: number;
	max: number;
	color: string;
}> = [
	{ category: 'insufficient', min: 0, max: 30, color: '#D32F2F' }, // Red
	{ category: 'minimal', min: 31, max: 45, color: '#F57C00' }, // Orange
	{ category: 'adequate', min: 46, max: 60, color: '#F9A825' }, // Yellow
	{ category: 'good', min: 61, max: 75, color: '#7CB342' }, // Light Green
	{ category: 'excellent', min: 76, max: 90, color: '#388E3C' }, // Green
	{ category: 'outstanding', min: 91, max: 100, color: '#1B5E20' }, // Dark Green
];

export function computeOwnerScore(ownerType?: OwnerType): number {
	if (!ownerType) return 0;
	return OWNER_WEIGHTS[ownerType];
}

export function computeSovereigntyScore(criteria: SovereigntyCriteria): number {
	const baseScore = (Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>).reduce((sum, key) => {
		return sum + (criteria[key] ? WEIGHTS[key] : 0);
	}, 0);

	return baseScore + computeOwnerScore(criteria.ownerType);
}

/**
 * Get the category for a numeric score.
 * @param score - Numeric score (0-100)
 * @returns The category that the score falls into
 */
export function getScoreCategory(score: number): SovereigntyScoreCategory {
	const clampedScore = Math.max(0, Math.min(100, score));
	const categoryData = SCORE_CATEGORIES.find((c) => clampedScore >= c.min && clampedScore <= c.max);
	return categoryData?.category || 'insufficient';
}

/**
 * Calculate the percentile position within a category.
 * Returns 0-100 where 0 = lowest in category, 100 = highest in category
 * @param score - Numeric score (0-100)
 * @returns Percentile within the category (0-100)
 */
export function getScorePercentileInCategory(score: number): number {
	const clampedScore = Math.max(0, Math.min(100, score));
	const categoryData = SCORE_CATEGORIES.find((c) => clampedScore >= c.min && clampedScore <= c.max);

	if (!categoryData) return 0;

	const range = categoryData.max - categoryData.min;
	if (range === 0) return 50; // Shouldn't happen but safety check

	const positionInRange = clampedScore - categoryData.min;
	return Math.round((positionInRange / range) * 100);
}

/**
 * Get the color code for a score category.
 * @param score - Numeric score (0-100)
 * @returns Hex color code for the category
 */
export function getScoreCategoryColor(score: number): string {
	const clampedScore = Math.max(0, Math.min(100, score));
	const categoryData = SCORE_CATEGORIES.find((c) => clampedScore >= c.min && clampedScore <= c.max);
	return categoryData?.color || '#999999';
}

/**
 * Compute complete sovereignty score result with category and visualization data.
 * This is the main function to use for getting full scoring information.
 * @param criteria - The sovereignty criteria to evaluate
 * @returns Complete score result with category, color, and percentile
 */
export function computeSovereigntyScoreResult(criteria: SovereigntyCriteria): SovereigntyScoreResult {
	const score = computeSovereigntyScore(criteria);

	return {
		score,
		category: getScoreCategory(score),
		color: getScoreCategoryColor(score),
		percentileInCategory: getScorePercentileInCategory(score),
	};
}
