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
