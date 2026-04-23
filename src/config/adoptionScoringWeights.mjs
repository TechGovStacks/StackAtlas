/**
 * Shared adoption-scoring constants.
 *
 * This file is intentionally plain ESM (.mjs) so it can be imported both by
 * the Node.js build script (scripts/generate-data.mjs) and by the TypeScript
 * runtime utility (src/utils/adoptionScore.ts via the companion .d.mts file).
 * Keeping a single source here ensures the build-time data generation and the
 * app's runtime scoring always use identical weights.
 */

/** Role weights: influence of different participation types */
export const ROLE_WEIGHTS = Object.freeze({
	maintainer: 1.0,
	contributor: 0.8,
	funder: 0.4,
	consumer: 0.5,
});

/** Status weights: significance of the item's usage status */
export const STATUS_WEIGHTS = Object.freeze({
	recommended: 1.0,
	approved: 0.7,
	deprecated: 0.1,
});

/** Transitive dependency weight: items that are prerequisites get this fraction of coverage */
export const TRANSITIVE_WEIGHT = 0.3;

/** Minimum diversity factor (geographic spread multiplier, range 0.6–1.0) */
export const DIVERSITY_MIN_FACTOR = 0.6;

/** Additional diversity factor (added on top of min when diversity = 1.0) */
export const DIVERSITY_MAX_FACTOR = 0.4;

/** Sovereignty score threshold for "sovereign adoption" counting */
export const SOVEREIGNTY_THRESHOLD = 61;

/** Reference stack size for log-based size dampening */
export const SIZE_DAMP_REFERENCE = 20;

/** Low-coverage threshold: below this direct coverage we apply role-sensitive lift */
export const LOW_COVERAGE_THRESHOLD = 1.2;

/** Extra lift for maintainer roles under low direct coverage */
export const MAINTAINER_LOW_COVERAGE_BOOST = 0.2;

/** Extra lift for contributor roles under low direct coverage */
export const CONTRIBUTOR_LOW_COVERAGE_BOOST = 0.05;

/** Percentile anchor for robust normalization (0..1) */
export const ADOPTION_NORMALIZATION_PERCENTILE = 0.95;

/** Minimum denominator anchor to avoid over-compression */
export const ADOPTION_NORMALIZATION_ANCHOR = 0.45;

/** Sovereignty threshold where soft floor can apply */
export const HIGH_SOVEREIGNTY_THRESHOLD = 80;

/** Minimum adoption score for high-sovereignty items with non-zero adoption */
export const HIGH_SOVEREIGNTY_SOFT_FLOOR_SCORE = 50;

/** Context floor for maintainer role in active stack views */
export const MAINTAINER_CONTEXT_MIN_ADOPTION = 80;
export const MAINTAINER_CONTEXT_MIN_SOVEREIGN_ADOPTION = 80;

/** Context floor for contributor role in active stack views */
export const CONTRIBUTOR_CONTEXT_MIN_ADOPTION = 55;
export const CONTRIBUTOR_CONTEXT_MIN_SOVEREIGN_ADOPTION = 50;

/**
 * Popularity blending weights: how much external popularity signals contribute
 * to the adoption score segment of the overall score.
 */
export const POPULARITY_ADOPTION_BLEND = 0.3; // 30% Popularity in Adoption-Blending
export const POPULARITY_ADOPTION_WEIGHT = 0.7; // 70% bisheriger Adoption Score

/**
 * Platform-specific reference values for log-normalization.
 * These represent the "very popular" threshold for each platform.
 */
export const POPULARITY_REF_GITHUB_STARS = 50_000;
export const POPULARITY_REF_NPM_WEEKLY = 5_000_000;
export const POPULARITY_REF_DOCKER_WEEKLY = 1_000_000;
export const POPULARITY_REF_PYPI_WEEKLY = 5_000_000;
