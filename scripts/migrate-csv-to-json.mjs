#!/usr/bin/env node
/**
 * Migrates data/items.csv → data/items/[slug].json (one file per item).
 *
 * Layer mapping (old CSV categories → new 5 Splash layers):
 *   Infrastruktur  → infrastructure
 *   Plattform      → platform
 *   Betrieb        → building-blocks
 *   Zugang         → applications
 *
 * Items whose CSV sub-category is "Sicherheit" and whose maturity is
 * "graduated" are additionally candidates for "sovereign-standards" — but
 * to avoid losing data the migration writes the layer from the CSV mapping
 * above and leaves re-categorisation to a manual editorial pass.
 *
 * Run:  node scripts/migrate-csv-to-json.mjs
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INPUT_CSV = join(ROOT, 'data', 'items.csv');
const OUTPUT_DIR = join(ROOT, 'data', 'items');

// ---------------------------------------------------------------------------
// Layer mapping
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const LAYER_MAP = {
	betrieb: 'building-blocks',
	infrastruktur: 'infrastructure',
	plattform: 'platform',
	zugang: 'applications',
};

function resolveLayer(rawCategory) {
	const key = (rawCategory || '')
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '');
	for (const [fragment, layer] of Object.entries(LAYER_MAP)) {
		const normFragment = fragment.normalize('NFD').replace(/\p{Diacritic}/gu, '');
		if (key.includes(normFragment)) return layer;
	}
	return 'platform'; // safe default
}

// ---------------------------------------------------------------------------
// CSV parser
// ---------------------------------------------------------------------------

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
	const [headerLine, ...dataLines] = csv.trim().split('\n');
	const headers = parseLine(headerLine);
	return dataLines.filter(Boolean).map((line) => Object.fromEntries(headers.map((h, i) => [h, parseLine(line)[i] ?? ''])));
}

// ---------------------------------------------------------------------------
// Slug helper
// ---------------------------------------------------------------------------

function toSlug(name) {
	return name
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// Sovereignty criteria inference from CSV fields
// ---------------------------------------------------------------------------

function inferSovereigntyCriteria(row) {
	const oss = row.oss === 'true' || row.oss === '1';
	const license = (row.license || '').toLowerCase();
	const hq = (row.headquarters || row.crunchbase_country || '').toLowerCase();
	const stars = parseInt(row.github_stars || '0', 10);
	const hasAuditDate = Boolean(row.last_audit_date && row.last_audit_date.trim());
	const maturity = (row.graduated || row.incubation || row.accepted || '').trim();

	const euCountries = [
		'de',
		'germany',
		'fr',
		'france',
		'at',
		'austria',
		'nl',
		'netherlands',
		'be',
		'belgium',
		'se',
		'sweden',
		'fi',
		'finland',
		'dk',
		'denmark',
		'es',
		'spain',
		'it',
		'italy',
		'pl',
		'poland',
		'pt',
		'portugal',
		'ie',
		'ireland',
		'eu',
	];
	const euHeadquartered = euCountries.some((c) => hq.includes(c));

	const permissiveLicenses = ['mit', 'apache', 'bsd', 'isc', 'mpl', 'lgpl', 'gpl', 'agpl', 'eupl', 'cc0', 'public-domain', 'unlicense'];
	const permissiveLicense = oss && permissiveLicenses.some((l) => license.includes(l));
	const owner = (row.owner_type || row.owner || row.maintainer_type || '').toLowerCase();

	let ownerType;
	if (owner.includes('consortium') || owner.includes('konsortium')) ownerType = 'independentConsortium';
	else if (owner.includes('corporation') || owner.includes('company') || owner.includes('enterprise') || owner.includes('konzern')) ownerType = 'corporation';
	else if (owner.includes('community')) ownerType = 'community';
	else if (owner.includes('one-man') || owner.includes('one man') || owner.includes('single maintainer')) ownerType = 'oneManShow';

	return {
		openSource: oss,
		euHeadquartered,
		hasAudit: hasAuditDate,
		permissiveLicense,
		matureProject: Boolean(maturity),
		// User-Sovereignty Scoring v2 fields — defaults; refine via scripts/backfill-sovereignty-criteria.mjs
		selfHostable: oss,
		dataPortability: oss,
		openStandards: false,
		noTelemetryByDefault: oss,
		...(ownerType ? { ownerType } : {}),
	};
}

// ---------------------------------------------------------------------------
// CSV row → Item JSON
// ---------------------------------------------------------------------------

function toItem(row, usedSlugs) {
	const name = (row.name || '').trim();
	if (!name) return null;

	let slug = toSlug(name);
	// Ensure uniqueness
	if (usedSlugs.has(slug)) {
		let counter = 2;
		while (usedSlugs.has(`${slug}-${counter}`)) counter++;
		slug = `${slug}-${counter}`;
	}
	usedSlugs.add(slug);

	const layer = resolveLayer(row.category);
	const sublayerRaw = (row.subcategory || '').trim();
	const sublayer = sublayerRaw ? toSlug(sublayerRaw) : undefined;

	const tags = (row.tag || '')
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);

	const oss = row.oss === 'true' || row.oss === '1';

	let maturity = undefined;
	if (row.graduated && row.graduated.trim()) maturity = 'graduated';
	else if (row.incubation && row.incubation.trim()) maturity = 'incubation';
	else if (row.accepted && row.accepted.trim()) maturity = 'sandbox';

	const sovereigntyCriteria = inferSovereigntyCriteria(row);

	const item = {
		id: slug,
		name,
		layer,
		...(sublayer ? { sublayer } : {}),
		description: { de: (row.description || '').trim(), en: '' },
		...(row.homepage ? { homepage: row.homepage.trim() } : {}),
		...(row.logo ? { logo: row.logo.trim() } : {}),
		tags,
		...(row.license ? { license: row.license.trim() } : {}),
		oss,
		...(maturity ? { maturity } : {}),
		sovereigntyCriteria,
		...(row.github_repo || row.github_stars
			? {
					github: {
						...(row.github_repo ? { repo: row.github_repo.trim() } : {}),
						...(row.github_stars ? { stars: parseInt(row.github_stars, 10) } : {}),
					},
				}
			: {}),
		...(row.last_audit_date || row.last_audit_url
			? {
					audit: {
						...(row.last_audit_date ? { lastDate: row.last_audit_date.trim() } : {}),
						...(row.last_audit_url ? { url: row.last_audit_url.trim() } : {}),
					},
				}
			: {}),
	};

	return { slug, item };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

mkdirSync(OUTPUT_DIR, { recursive: true });

const csv = readFileSync(INPUT_CSV, 'utf-8');
const rows = parseCSV(csv);

let written = 0;
let skipped = 0;
let overwritten = 0;
const usedSlugs = new Set();

for (const row of rows) {
	const result = toItem(row, usedSlugs);
	if (!result) {
		skipped++;
		continue;
	}
	const { slug, item } = result;
	const outPath = join(OUTPUT_DIR, `${slug}.json`);
	const exists = existsSync(outPath);
	writeFileSync(outPath, JSON.stringify(item, null, '\t') + '\n', 'utf-8');
	if (exists) overwritten++;
	else written++;
}

console.log(`✅  Migration complete`);
console.log(`   Written:    ${written}`);
console.log(`   Overwritten:${overwritten}`);
console.log(`   Skipped:    ${skipped}`);
console.log(`   Output dir: ${OUTPUT_DIR}`);
