#!/usr/bin/env node

/**
 * Fetches logo URLs from public sources and creates a JSON map.
 *
 * Sources (in priority order):
 *   1. Simple Icons CDN (https://cdn.simpleicons.org/{slug}) — 3300+ brand SVGs
 *   2. Existing external URLs already in the CSV
 *   3. Wikidata P154 (logo image) / P18 (image)
 *   4. Wikipedia page image
 *
 * Usage:
 *   node scripts/fetch-external-logos.mjs [--update] [--dry-run]
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INPUT_CSV = join(ROOT, 'data', 'items.csv');
const OUTPUT_JSON = join(ROOT, 'src', 'data', 'logo-urls.json');

const ARGS = {
	update: process.argv.includes('--update'),
	dryRun: process.argv.includes('--dry-run'),
};

const SIMPLE_ICONS_CDN = 'https://cdn.simpleicons.org';
const SIMPLE_ICONS_INDEX = 'https://cdn.jsdelivr.net/npm/simple-icons/_data/simple-icons.json';
const USER_AGENT = 'accessible-d-stack-landscape/1.0';
const DELAY_MS = 250;

// ─── Manual overrides for items whose CSV name doesn't match Simple Icons ────

const SLUG_OVERRIDES = {
	'c++': 'cplusplus',
	cassandra: 'apachecassandra',
	couchdb: 'apachecouchdb',
	css: 'css3',
	hbase: 'apachehbase',
	'huggingface transformers': 'huggingface',
	'javascript (ecma script)': 'javascript',
	'mysql server': 'mysql',
	nextjs: 'nextdotjs',
	'node-red': 'nodered',
	'open id connect (oidc)': 'openid',
	'open authorization (oauth)': 'auth0',
	'open neural network exchange': 'onnx',
	openapi: 'openapiinitiative',
	'openshift origin (okd)': 'redhatopenshift',
	qdrant: 'qdrant',
	nqdrant: 'qdrant',
	scylla: 'scylladb',
	'swift (programming language)': 'swift',
	'extensible markup language (xml)': 'xml',
};

// ─── CSV Parser ──────────────────────────────────────────────────────────────

function parseLine(line) {
	const fields = [];
	let current = '';
	let quoted = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (ch === '"') {
			if (quoted && line[i + 1] === '"') {
				current += '"';
				i++;
			} else {
				quoted = !quoted;
			}
		} else if (ch === ',' && !quoted) {
			fields.push(current.trim());
			current = '';
		} else {
			current += ch;
		}
	}
	fields.push(current.trim());
	return fields;
}

function parseCSV(csv) {
	const lines = csv.trim().split('\n');
	const headers = parseLine(lines[0]);
	return lines
		.slice(1)
		.filter(Boolean)
		.map((line) => {
			const values = parseLine(line);
			return Object.fromEntries(headers.map((h, idx) => [h, values[idx] || '']));
		});
}

// ─── HTTP helpers ────────────────────────────────────────────────────────────

async function httpFetch(url, method = 'HEAD', timeoutMs = 8000) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			method,
			signal: controller.signal,
			headers: { 'User-Agent': USER_AGENT },
			redirect: 'follow',
		});
		clearTimeout(timer);
		return res;
	} catch {
		clearTimeout(timer);
		return null;
	}
}

async function httpGetJson(url) {
	const res = await httpFetch(url, 'GET', 10_000);
	if (!res?.ok) return null;
	return res.json();
}

async function isUrlAccessible(url) {
	const head = await httpFetch(url, 'HEAD');
	if (head?.ok) return true;
	const get = await httpFetch(url, 'GET');
	return get?.ok === true;
}

// ─── Simple Icons ────────────────────────────────────────────────────────────

async function loadSimpleIconsIndex() {
	console.log('  Loading Simple Icons index …');
	const data = await httpGetJson(SIMPLE_ICONS_INDEX);
	if (!Array.isArray(data)) throw new Error('Failed to fetch Simple Icons index');

	/** @type {Map<string, string>} title (lowercase) → slug */
	const byTitle = new Map();
	/** @type {Map<string, string>} alias (lowercase) → slug */
	const byAlias = new Map();

	for (const icon of data) {
		const slug = icon.slug || icon.title.toLowerCase().replace(/[^a-z0-9]/g, '');
		byTitle.set(icon.title.toLowerCase(), slug);
		if (icon.aliases?.aka) {
			for (const alias of icon.aliases.aka) {
				byAlias.set(alias.toLowerCase(), slug);
			}
		}
	}
	console.log(`  Loaded ${data.length} icons\n`);
	return { byTitle, byAlias };
}

function findSimpleIconSlug(name, index) {
	const lower = name.toLowerCase();

	// 1. Manual override
	if (SLUG_OVERRIDES[lower]) return SLUG_OVERRIDES[lower];

	// 2. Exact title match
	if (index.byTitle.has(lower)) return index.byTitle.get(lower);

	// 3. Alias match
	if (index.byAlias.has(lower)) return index.byAlias.get(lower);

	// 4. Try without parenthetical suffix: "Docker Swarm" → "Docker"
	const withoutParens = lower.replace(/\s*\(.*\)$/, '').trim();
	if (withoutParens !== lower && index.byTitle.has(withoutParens)) return index.byTitle.get(withoutParens);

	// 5. Try first word: "GitHub Actions" → "github" → matches "githubactions"
	const firstWord = lower.split(/[\s\-]/)[0];
	if (firstWord.length > 2 && index.byTitle.has(firstWord)) return index.byTitle.get(firstWord);

	// 6. Try joined alphanumeric (how Simple Icons generates slugs)
	const joined = lower.replace(/[^a-z0-9]/g, '');
	for (const [, slug] of index.byTitle) {
		if (slug === joined) return slug;
	}

	return null;
}

// ─── Wikidata / Wikipedia fallback ───────────────────────────────────────────

async function searchWikidataLogo(name) {
	const url =
		'https://www.wikidata.org/w/api.php?' +
		new URLSearchParams({
			action: 'wbsearchentities',
			search: name,
			language: 'en',
			limit: '3',
			format: 'json',
			origin: '*',
		});

	const data = await httpGetJson(url);
	if (!data?.search?.length) return null;

	for (const result of data.search) {
		const entityUrl =
			'https://www.wikidata.org/w/api.php?' +
			new URLSearchParams({
				action: 'wbgetentities',
				ids: result.id,
				props: 'claims',
				format: 'json',
				origin: '*',
			});

		const entityData = await httpGetJson(entityUrl);
		const entity = entityData?.entities?.[result.id];
		if (!entity) continue;

		for (const prop of ['P154', 'P18']) {
			const filename = entity.claims?.[prop]?.[0]?.mainsnak?.datavalue?.value;
			if (filename) {
				const encoded = encodeURIComponent(filename.replace(/ /g, '_'));
				return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}`;
			}
		}
	}
	return null;
}

async function searchWikipediaImage(name) {
	const searchUrl =
		'https://en.wikipedia.org/w/api.php?' +
		new URLSearchParams({
			action: 'query',
			list: 'search',
			srsearch: name,
			srlimit: '3',
			format: 'json',
			origin: '*',
		});

	const searchData = await httpGetJson(searchUrl);
	if (!searchData?.query?.search?.length) return null;

	for (const result of searchData.query.search) {
		const imageUrl =
			'https://en.wikipedia.org/w/api.php?' +
			new URLSearchParams({
				action: 'query',
				pageids: String(result.pageid),
				prop: 'pageimages',
				piprop: 'original',
				format: 'json',
				origin: '*',
			});

		const imageData = await httpGetJson(imageUrl);
		const original = imageData?.query?.pages?.[String(result.pageid)]?.original?.source;
		if (original) {
			const lc = original.toLowerCase();
			if (lc.includes('screenshot') || lc.includes('map_of') || lc.includes('photo_of')) continue;
			return original;
		}
	}
	return null;
}

// Additional Wikidata search terms for items whose CSV name is too ambiguous
const WIKIDATA_SEARCH_HINTS = {
	java: 'Java programming language',
	wifi: 'Wi-Fi',
	gecko: 'Gecko browser engine',
	blink: 'Blink browser engine',
	go: 'Go programming language',
	r: 'R programming language',
	swift: 'Swift programming language',
	rust: 'Rust programming language',
};

// ─── Resolution pipeline ────────────────────────────────────────────────────

async function resolveLogoUrl(item, simpleIconsIndex) {
	const name = (item.name || '').trim();
	const csvLogo = (item.logo || '').trim();

	// 1. Simple Icons (instant, no HTTP validation needed — CDN is reliable)
	const slug = findSimpleIconSlug(name, simpleIconsIndex);
	if (slug) {
		return { url: `${SIMPLE_ICONS_CDN}/${slug}`, source: 'simple-icons' };
	}

	// 2. Existing external URL from CSV
	if (/^https?:\/\//.test(csvLogo)) {
		if (await isUrlAccessible(csvLogo)) {
			return { url: csvLogo, source: 'csv' };
		}
	}

	// 3. Wikidata logo (P154) — try with hint first, then original name
	const searchName = WIKIDATA_SEARCH_HINTS[name.toLowerCase()] || name;
	const wdUrl = await searchWikidataLogo(searchName);
	if (wdUrl && (await isUrlAccessible(wdUrl))) {
		return { url: wdUrl, source: 'wikidata' };
	}
	// If hint differs from name, also try the original name
	if (searchName !== name) {
		const wdUrl2 = await searchWikidataLogo(name);
		if (wdUrl2 && (await isUrlAccessible(wdUrl2))) {
			return { url: wdUrl2, source: 'wikidata' };
		}
	}

	// 4. Wikipedia page image — same hint strategy
	const wpUrl = await searchWikipediaImage(searchName);
	if (wpUrl && (await isUrlAccessible(wpUrl))) {
		return { url: wpUrl, source: 'wikipedia' };
	}
	if (searchName !== name) {
		const wpUrl2 = await searchWikipediaImage(name);
		if (wpUrl2 && (await isUrlAccessible(wpUrl2))) {
			return { url: wpUrl2, source: 'wikipedia' };
		}
	}

	return null;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
	console.log('🔍 Resolving external logo URLs …\n');

	const csv = readFileSync(INPUT_CSV, 'utf-8');
	const items = parseCSV(csv);

	let existing = {};
	try {
		existing = JSON.parse(readFileSync(OUTPUT_JSON, 'utf-8'));
	} catch {
		/* first run */
	}

	const simpleIconsIndex = await loadSimpleIconsIndex();
	const logoMap = {};
	const stats = { total: items.length, simpleIcons: 0, csv: 0, wikidata: 0, wikipedia: 0, missing: 0 };

	for (const item of items) {
		const name = (item.name || '').trim();
		if (!name) continue;

		// Skip already-verified entries unless --update
		if (existing[name]?.verified && !ARGS.update) {
			logoMap[name] = existing[name];
			continue;
		}

		process.stdout.write(`  ${name} … `);

		const result = await resolveLogoUrl(item, simpleIconsIndex);

		if (result) {
			logoMap[name] = {
				url: result.url,
				source: result.source,
				verified: true,
				accessed: new Date().toISOString().split('T')[0],
			};
			stats[result.source === 'simple-icons' ? 'simpleIcons' : result.source] =
				(stats[result.source === 'simple-icons' ? 'simpleIcons' : result.source] || 0) + 1;
			console.log(`✅ ${result.source}`);
		} else {
			logoMap[name] = { url: null, source: null, verified: false, accessed: new Date().toISOString().split('T')[0] };
			stats.missing++;
			console.log('❌ not found');
		}

		// Rate-limit API calls (Simple Icons needs no delay, but Wikidata does)
		if (!result || result.source !== 'simple-icons') {
			await new Promise((r) => setTimeout(r, DELAY_MS));
		}
	}

	if (!ARGS.dryRun) {
		writeFileSync(OUTPUT_JSON, JSON.stringify(logoMap, null, '\t'), 'utf-8');
		console.log(`\n✅ Written to ${OUTPUT_JSON}`);
	}

	console.log(`\n📊 Summary:`);
	console.log(`   Total:        ${stats.total}`);
	console.log(`   Simple Icons: ${stats.simpleIcons}`);
	console.log(`   CSV (extern): ${stats.csv}`);
	console.log(`   Wikidata:     ${stats.wikidata}`);
	console.log(`   Wikipedia:    ${stats.wikipedia}`);
	console.log(`   Missing:      ${stats.missing}`);

	if (ARGS.dryRun) console.log('\n💡 Dry-run — no files written.');
}

main().catch(console.error);
