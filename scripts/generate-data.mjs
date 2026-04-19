#!/usr/bin/env node
/**
 * Reads all JSON files from:
 *   data/layers/      → LAYERS
 *   data/items/       → ITEMS   (logo resolved via src/data/logo-urls.json)
 *   data/stacks/      → STACKS
 *
 * Writes: src/data/items.generated.ts
 *
 * Run:  node scripts/generate-data.mjs
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
	DIVERSITY_MAX_FACTOR,
	DIVERSITY_MIN_FACTOR,
	ROLE_WEIGHTS,
	SIZE_DAMP_REFERENCE,
	SOVEREIGNTY_THRESHOLD,
	STATUS_WEIGHTS,
	TRANSITIVE_WEIGHT,
} from '../src/config/adoptionScoringWeights.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');
const LOGO_URLS_JSON = join(ROOT, 'src', 'data', 'logo-urls.json');
const OUTPUT_TS = join(ROOT, 'src', 'data', 'items.generated.ts');
const FALLBACK_LOGO = 'assets/broken-logo.svg';

// User-Sovereignty Scoring v2 (2026-04)
// Base weights sum to 90; max owner bonus is 10 → total maximum = 100 (no hard cap needed).
// IMPORTANT: keep this in sync with src/utils/sovereigntyScore.ts WEIGHTS.
const SOVEREIGNTY_WEIGHTS = {
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

const OWNER_WEIGHTS = {
	independentConsortium: 10,
	community: 7,
	corporation: 3,
	oneManShow: 0,
};

// ---------------------------------------------------------------------------
// Logo resolution (same logic as generate-articles.mjs)
// ---------------------------------------------------------------------------

let logoUrls = {};
try {
	logoUrls = JSON.parse(readFileSync(LOGO_URLS_JSON, 'utf-8'));
} catch {
	console.warn('⚠️  Could not load logo-urls.json, will use item logo field and fallback only');
}

function resolveLogo(item) {
	const csvLogo = (item.logo || '').trim();
	const name = typeof item.name === 'string' ? item.name : (item.name?.de ?? '');

	if (csvLogo && /^https?:\/\//.test(csvLogo)) return csvLogo;
	if (csvLogo) return '/' + csvLogo.replace(/^\/+/, '');
	if (logoUrls[name]?.verified && logoUrls[name]?.url) return logoUrls[name].url;
	return FALLBACK_LOGO;
}

function computeSovereigntyScore(criteria = {}) {
	const baseScore = Object.entries(SOVEREIGNTY_WEIGHTS).reduce((sum, [key, weight]) => sum + (criteria[key] ? weight : 0), 0);
	const ownerScore = criteria.ownerType ? (OWNER_WEIGHTS[criteria.ownerType] ?? 0) : 0;
	return baseScore + ownerScore;
}

// ---------------------------------------------------------------------------
// Adoption Score Calculation (Stack Frequency)
// Constants are imported from src/config/adoptionScoringWeights.mjs so this
// build script and the runtime utility (src/utils/adoptionScore.ts) always
// use identical weights without duplication.
// ---------------------------------------------------------------------------

function sizeDampening(stackSize) {
	const normalized = Math.max(1, stackSize / SIZE_DAMP_REFERENCE);
	return 1 / (1 + Math.log10(normalized));
}

function computeDiversity(stacks, itemId) {
	const countryFreq = {};
	let totalCount = 0;

	for (const stack of stacks) {
		const found = stack.items.some((si) => si.itemId === itemId);
		if (!found) continue;

		const country = stack.country || '_unknown';
		countryFreq[country] = (countryFreq[country] || 0) + 1;
		totalCount++;
	}

	if (totalCount === 0) return 0;

	let sumSquares = 0;
	for (const freq of Object.values(countryFreq)) {
		const p = freq / totalCount;
		sumSquares += p * p;
	}

	return 1 - sumSquares;
}

function computeDirectCoverage(itemId, stacks, itemSovereigntyScore) {
	let directCoverage = 0;
	let sovereignCoverage = 0;
	const stackIds = [];

	for (const stack of stacks) {
		const stackItem = stack.items.find((si) => si.itemId === itemId);
		if (!stackItem) continue;

		stackIds.push(stack.id);

		const roleWeight = ROLE_WEIGHTS[stackItem.role];
		const statusWeight = STATUS_WEIGHTS[stackItem.status];
		const sizeWeight = sizeDampening(stack.items.length);

		const contribution = roleWeight * statusWeight * sizeWeight;
		directCoverage += contribution;

		if (
			itemSovereigntyScore !== undefined &&
			itemSovereigntyScore >= SOVEREIGNTY_THRESHOLD
		) {
			sovereignCoverage += contribution;
		}
	}

	return { coverage: directCoverage, sovereignCoverage, stackIds };
}

function computeTransitiveCoverage(itemId, reverseDeps, stacks, itemMap) {
	let transitiveCoverage = 0;
	let sovereignTransitiveCoverage = 0;

	const dependents = (reverseDeps[itemId] || []).map((d) => d.sourceItemId);
	for (const dependentId of dependents) {
		const dependent = itemMap[dependentId];
		if (!dependent) continue;

		const { coverage, sovereignCoverage } = computeDirectCoverage(
			dependentId,
			stacks,
			dependent.sovereigntyScore
		);

		transitiveCoverage += TRANSITIVE_WEIGHT * coverage;
		sovereignTransitiveCoverage += TRANSITIVE_WEIGHT * sovereignCoverage;
	}

	return { coverage: transitiveCoverage, sovereignCoverage: sovereignTransitiveCoverage };
}

function computeRawAdoptionScore(directCoverage, transitiveCoverage, diversity) {
	const totalCoverage = directCoverage + transitiveCoverage;
	const withDiversity =
		Math.log1p(totalCoverage) * (DIVERSITY_MIN_FACTOR + DIVERSITY_MAX_FACTOR * diversity);
	return withDiversity;
}

function computeAdoptionScores(items, stacks, reverseDeps) {
	const itemMap = {};
	for (const item of items) {
		itemMap[item.id] = item;
	}

	// First pass: compute all raw scores
	const rawScores = {};

	for (const item of items) {
		const diversity = computeDiversity(stacks, item.id);
		const { coverage: directCov, sovereignCoverage: directSovCov, stackIds } =
			computeDirectCoverage(item.id, stacks, item.sovereigntyScore);
		const { coverage: transitiveCov, sovereignCoverage: transitiveSovCov } =
			computeTransitiveCoverage(item.id, reverseDeps, stacks, itemMap);

		const adoption = computeRawAdoptionScore(directCov, transitiveCov, diversity);
		const sovereignAdoption = computeRawAdoptionScore(
			directSovCov,
			transitiveSovCov,
			diversity
		);

		rawScores[item.id] = {
			adoption,
			sovereignAdoption,
			direct: directCov,
			transitive: transitiveCov,
			diversity,
			stackIds,
		};
	}

	// Second pass: normalize to [0, 100]
	let maxAdoption = 0;
	let maxSovereignAdoption = 0;

	for (const raw of Object.values(rawScores)) {
		maxAdoption = Math.max(maxAdoption, raw.adoption);
		maxSovereignAdoption = Math.max(maxSovereignAdoption, raw.sovereignAdoption);
	}

	if (maxAdoption === 0) maxAdoption = 1;
	if (maxSovereignAdoption === 0) maxSovereignAdoption = 1;

	const results = {};

	for (const item of items) {
		const raw = rawScores[item.id];
		if (!raw) continue;

		const adoptionScore = Math.round((100 * raw.adoption) / maxAdoption);
		const sovereignAdoptionScore = Math.round(
			(100 * raw.sovereignAdoption) / maxSovereignAdoption
		);

		results[item.id] = {
			adoptionScore,
			sovereignAdoptionScore,
			overallScore: 0, // Will be computed in next step
			directCoverage: raw.direct,
			transitiveCoverage: raw.transitive,
			diversity: raw.diversity,
			usedInStacks: raw.stackIds,
		};
	}

	return results;
}

function computeOverallScore(sovereigntyScore, adoption) {
	const SOVEREIGNTY_WEIGHT = 0.6;
	const SOVEREIGN_ADOPTION_WEIGHT = 0.25;
	const ADOPTION_WEIGHT = 0.15;

	const combined =
		SOVEREIGNTY_WEIGHT * sovereigntyScore +
		SOVEREIGN_ADOPTION_WEIGHT * adoption.sovereignAdoptionScore +
		ADOPTION_WEIGHT * adoption.adoptionScore;

	return Math.round(Math.max(0, Math.min(100, combined)));
}

function buildDependencyIndexes(rawItems) {
	const dependencyGraph = {};
	const reverseDependencies = {};

	for (const item of rawItems) {
		const sourceId = item.id;
		if (!sourceId) continue;

		const normalizedDependencies = (item.dependencies ?? []).map((dependency) => ({
			targetItemId: dependency.targetItemId,
			type: dependency.type,
			scope: dependency.scope ?? 'required',
		}));

		dependencyGraph[sourceId] = normalizedDependencies;

		for (const dependency of normalizedDependencies) {
			const targetId = dependency.targetItemId;
			if (!reverseDependencies[targetId]) reverseDependencies[targetId] = [];
			reverseDependencies[targetId].push({
				sourceItemId: sourceId,
				type: dependency.type,
				scope: dependency.scope,
			});
		}
	}

	for (const targetId of Object.keys(reverseDependencies)) {
		reverseDependencies[targetId].sort((left, right) => left.sourceItemId.localeCompare(right.sourceItemId));
	}

	return {
		dependencyGraph,
		reverseDependencies,
	};
}

// ---------------------------------------------------------------------------
// Read all JSON files from a directory (ignores .gitkeep.json and _*)
// ---------------------------------------------------------------------------

function readJsonDir(dir) {
	let files;
	try {
		files = readdirSync(dir);
	} catch {
		return [];
	}
	return files
		.filter((f) => f.endsWith('.json') && !f.startsWith('.') && !f.startsWith('_'))
		.map((f) => {
			try {
				return JSON.parse(readFileSync(join(dir, f), 'utf-8'));
			} catch (e) {
				console.warn(`⚠️  Could not parse ${join(dir, f)}: ${e.message}`);
				return null;
			}
		})
		.filter(Boolean);
}

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

const layers = readJsonDir(join(DATA_DIR, 'layers')).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

const rawItems = readJsonDir(join(DATA_DIR, 'items'));
const items = rawItems.map((item) => ({
	...item,
	logo: resolveLogo(item),
	sovereigntyScore: computeSovereigntyScore(item.sovereigntyCriteria),
}));

const { dependencyGraph, reverseDependencies } = buildDependencyIndexes(items);
const stacks = readJsonDir(join(DATA_DIR, 'stacks'));

// Compute adoption scores and overall scores
const adoptionScores = computeAdoptionScores(items, stacks, reverseDependencies);

// Enrich items with adoption and overall scores
for (const item of items) {
	const adoption = adoptionScores[item.id];
	if (adoption) {
		item.adoption = adoption;
		item.adoption.overallScore = computeOverallScore(item.sovereigntyScore, adoption);
	}
}

// Compute stack metrics (average scores)
function computeStackMetrics(stack, itemMap) {
	let totalSovereignty = 0;
	let totalAdoption = 0;
	let totalOverall = 0;
	let count = 0;

	for (const stackItem of stack.items) {
		const item = itemMap[stackItem.itemId];
		if (!item) continue;

		count++;

		if (item.sovereigntyScore !== undefined) {
			totalSovereignty += item.sovereigntyScore;
		}

		if (item.adoption) {
			totalAdoption += item.adoption.adoptionScore;
			totalOverall += item.adoption.overallScore;
		}
	}

	return {
		avgSovereigntyScore: count > 0 ? Math.round(totalSovereignty / count) : 0,
		avgAdoptionScore: count > 0 ? Math.round(totalAdoption / count) : 0,
		avgOverallScore: count > 0 ? Math.round(totalOverall / count) : 0,
	};
}

const itemMap = {};
for (const item of items) {
	itemMap[item.id] = item;
}

for (const stack of stacks) {
	const metrics = computeStackMetrics(stack, itemMap);
	stack.avgSovereigntyScore = metrics.avgSovereigntyScore;
	stack.avgAdoptionScore = metrics.avgAdoptionScore;
	stack.avgOverallScore = metrics.avgOverallScore;
}

// ---------------------------------------------------------------------------
// Generate TypeScript output
// ---------------------------------------------------------------------------

function serialize(value) {
	return JSON.stringify(value, null, '\t')
		.split('\n')
		.map((l, i) => (i === 0 ? l : '\t' + l))
		.join('\n');
}

const output = `// GENERATED FILE - DO NOT EDIT MANUALLY
// Generated from: data/layers/ + data/items/ + data/stacks/
// Logo fallback via: src/data/logo-urls.json
// Generated at: ${new Date().toISOString()}

import type { Item, Layer, Stack } from '../types';

const ASSET_BASE_URL = (import.meta.env.VITE_ASSET_BASE_URL ?? '').replace(/\\/+$/, '');

function withAssetBaseUrl(logo?: string): string | undefined {
\tif (!logo || /^https?:\\/\\//.test(logo)) return logo;
\tconst normalizedPath = \`/\${logo.replace(/^\\/+/, '')}\`;
\treturn ASSET_BASE_URL ? \`\${ASSET_BASE_URL}\${normalizedPath}\` : normalizedPath;
}

export const LAYERS: Layer[] = ${serialize(layers)};

const RAW_ITEMS: Item[] = ${serialize(items)};

export const ITEMS: Item[] = RAW_ITEMS.map((item) => ({
\t...item,
\tlogo: withAssetBaseUrl(item.logo),
}));

export const DEPENDENCY_GRAPH = ${serialize(dependencyGraph)} as const;

export const REVERSE_DEPENDENCIES = ${serialize(reverseDependencies)} as const;

export const STACKS: Stack[] = ${serialize(stacks)};
`;

writeFileSync(OUTPUT_TS, output, 'utf-8');

const layerCounts = items.reduce((acc, item) => {
	acc[item.layer] = (acc[item.layer] ?? 0) + 1;
	return acc;
}, {});

console.log(`✅  Generated ${OUTPUT_TS.replace(ROOT, '.')}`);
console.log(`   Layers:    ${layers.length}`);
console.log(`   Items:     ${items.length}`);
console.log(`   Stacks:    ${stacks.length}`);
console.log('');
console.log('   Items per layer:');
for (const [layer, count] of Object.entries(layerCounts)) {
	console.log(`     ${layer.padEnd(20)} ${count}`);
}
