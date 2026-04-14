import { OwnerType, ParticipantRole, SovereigntyCriteria, SovereigntyScoreCategory, SovereigntyScoreResult, StackItem } from '../types';

// User-Sovereignty Scoring v2 (2026-04)
// Base weights sum to 90; max owner bonus is 10 → total maximum = 100 (no hard cap needed).
// The weights prioritize what the *user* needs to stay sovereign:
// can they run it themselves, get their data out, and avoid vendor lock-in.
const WEIGHTS: Record<keyof Omit<SovereigntyCriteria, 'ownerType'>, number> = {
	selfHostable: 20,
	dataPortability: 15,
	openSource: 15,
	openStandards: 10,
	permissiveLicense: 10,
	hasAudit: 5,
	matureProject: 5,
	noTelemetryByDefault: 5,
	euHeadquartered: 5,
};

// Maintainer-Context Adjustment (2026-04)
// When a stack owner holds the `maintainer` role for an item, the sovereignty
// calculus shifts: even if the item is not publicly accessible or open source,
// the maintaining organisation inherently has full control over source code,
// hosting, data format, protocols and telemetry — closed access is then a
// deliberate security choice, not a sovereignty gap. We therefore treat the
// six "controllability" criteria as satisfied when scoring from the
// maintainer's perspective. Factual criteria (audit, maturity, EU HQ, owner
// type) remain untouched because they describe the item itself, not the
// relationship.
const MAINTAINER_CONTEXT_OVERRIDES: ReadonlyArray<keyof Omit<SovereigntyCriteria, 'ownerType'>> = [
	'openSource',
	'permissiveLicense',
	'selfHostable',
	'dataPortability',
	'openStandards',
	'noTelemetryByDefault',
];

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
 * Returns true when a stack-context role inherits full control over the item.
 * Currently only the `maintainer` role triggers the sovereignty boost.
 */
export function roleGrantsMaintainerSovereignty(role?: ParticipantRole): boolean {
	return role === 'maintainer';
}

/**
 * Applies the maintainer-context override to sovereignty criteria:
 * controllability-focused flags are treated as satisfied because the
 * maintaining organisation inherently holds those capabilities. Factual
 * criteria (audit, maturity, EU HQ, owner type) are preserved.
 */
export function applyMaintainerContext(criteria: SovereigntyCriteria): SovereigntyCriteria {
	const adjusted: SovereigntyCriteria = { ...criteria };
	for (const key of MAINTAINER_CONTEXT_OVERRIDES) {
		adjusted[key] = true;
	}
	return adjusted;
}

/**
 * Returns the list of criteria keys that were lifted to true by the
 * maintainer-context override. Used by the UI to visually mark which
 * criteria are contextually granted rather than factually true.
 */
export function getMaintainerBoostedCriteria(criteria: SovereigntyCriteria): Array<keyof Omit<SovereigntyCriteria, 'ownerType'>> {
	return MAINTAINER_CONTEXT_OVERRIDES.filter((key) => !criteria[key]);
}

/**
 * Compute the effective sovereignty score in the context of a stack role.
 * - For `maintainer` role: applies the maintainer-context override so that
 *   items the stack owner fully controls are rated as fully sovereign, even
 *   when they are not publicly accessible or open source.
 * - For all other roles (or when no stack context is provided): returns the
 *   unchanged raw sovereignty score.
 */
export function computeEffectiveSovereigntyScore(criteria: SovereigntyCriteria, stackItem?: Pick<StackItem, 'role'>): number {
	if (roleGrantsMaintainerSovereignty(stackItem?.role)) {
		return computeSovereigntyScore(applyMaintainerContext(criteria));
	}
	return computeSovereigntyScore(criteria);
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

/**
 * Context-aware variant of {@link computeSovereigntyScoreResult}. When the
 * stack role grants full maintainer sovereignty, the result reflects the
 * boosted score and also reports the raw score alongside the list of
 * criteria that were contextually satisfied, so the UI can explain the
 * adjustment transparently.
 */
export function computeEffectiveSovereigntyScoreResult(
	criteria: SovereigntyCriteria,
	stackItem?: Pick<StackItem, 'role'>,
): SovereigntyScoreResult & {
	rawScore: number;
	maintainerBoosted: boolean;
	boostedCriteria: Array<keyof Omit<SovereigntyCriteria, 'ownerType'>>;
} {
	const rawScore = computeSovereigntyScore(criteria);
	const maintainerBoosted = roleGrantsMaintainerSovereignty(stackItem?.role);
	const effectiveCriteria = maintainerBoosted ? applyMaintainerContext(criteria) : criteria;
	const score = computeSovereigntyScore(effectiveCriteria);

	return {
		score,
		category: getScoreCategory(score),
		color: getScoreCategoryColor(score),
		percentileInCategory: getScorePercentileInCategory(score),
		rawScore,
		maintainerBoosted,
		boostedCriteria: maintainerBoosted ? getMaintainerBoostedCriteria(criteria) : [],
	};
}
