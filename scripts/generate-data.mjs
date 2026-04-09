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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');
const LOGO_URLS_JSON = join(ROOT, 'src', 'data', 'logo-urls.json');
const OUTPUT_TS = join(ROOT, 'src', 'data', 'items.generated.ts');
const FALLBACK_LOGO = 'assets/broken-logo.svg';

const SOVEREIGNTY_WEIGHTS = {
	openSource: 30,
	euHeadquartered: 25,
	hasAudit: 20,
	permissiveLicense: 10,
	matureProject: 10,
	largeEcosystem: 5,
};

const OWNER_WEIGHTS = {
	independentConsortium: 20,
	community: 15,
	corporation: 5,
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
	return Math.min(100, baseScore + ownerScore);
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

const stacks = readJsonDir(join(DATA_DIR, 'stacks'));

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
