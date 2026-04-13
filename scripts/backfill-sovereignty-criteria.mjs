#!/usr/bin/env node
/**
 * Backfill script for User-Sovereignty Scoring v2.
 *
 * Populates the four new sovereignty criteria
 *   - selfHostable
 *   - dataPortability
 *   - openStandards
 *   - noTelemetryByDefault
 * and refreshes the three previously empty legacy criteria
 *   - permissiveLicense
 *   - euHeadquartered
 *   - (largeEcosystem is REMOVED from the schema in v2)
 *
 * Strategy: heuristics (layer, oss, license string, homepage domain) + curated per-id overrides.
 * Run: node scripts/backfill-sovereignty-criteria.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ITEMS_DIR = join(process.cwd(), 'data', 'items');

// ---------------------------------------------------------------------------
// Curated knowledge tables
// ---------------------------------------------------------------------------

/** Items that look open but are practically SaaS-only (cannot be run by the user). */
const NOT_SELF_HOSTABLE = new Set([
	'circleci',
	'github-actions',
]);

/** Items whose default deployment phones home / collects telemetry (even if OSS). */
const HAS_DEFAULT_TELEMETRY = new Set([
	'nextjs', // Next.js telemetry on by default
	'gitlab', // GitLab CE collects usage ping by default
	'circleci',
	'github-actions',
	'docker-swarm', // Docker Desktop telemetry; OSS engine itself is fine, kept conservative
	'angular', // Angular CLI analytics prompt (opt-in newer, historically default)
	'flutter', // Flutter analytics enabled by default
	'huggingface-transformers', // Hub telemetry by default
]);

/**
 * Items that store user data in proprietary, non-portable formats.
 * Most OSS infra/platform/standards are portable by nature.
 */
const NOT_DATA_PORTABLE = new Set([
	'circleci',
	'github-actions',
	'budibase', // proprietary app schema
	'appsmith', // proprietary app schema
	'joget', // proprietary BPM model
]);

/**
 * Items that do NOT build on or implement an open, vendor-neutral standard.
 * Default for the rest is "openStandards = true" because the dataset is dominated
 * by protocols, formats and OSS infra, all of which qualify.
 */
const NOT_OPEN_STANDARDS = new Set([
	'budibase',
	'appsmith',
	'joget',
	'angel-ml',
	'axolotl',
	'pyro',
	'spacy',
	'huggingface-transformers',
	'langgraph',
	'haystack',
	'promptflow',
	'ragflow',
	'flutter', // Dart-only widget tree, not a standard
	'webkit',
	'blink',
	'gecko',
	'circleci',
	'github-actions',
	'rancher',
	'portainer',
	'milvus',
	'chroma',
	'nqdrant', // Qdrant (typo'd id)
	'neo4j',
	'scylla',
	'mlflow',
]);

/** Items whose owner / governance org is headquartered or legally registered in the EU. */
const EU_HEADQUARTERED = new Set([
	'mariadb', // MariaDB Foundation, Sweden
	'spacy', // Explosion AI, Berlin (DE)
	'piveau', // Fraunhofer FOKUS, Berlin (DE)
	'n8n', // n8n GmbH, Berlin (DE)
	'traefik', // Traefik Labs, Lyon (FR)
	'mobilfunk', // 3GPP, Sophia Antipolis (FR)
	'glasfaser', // German concept
]);
// Intentionally excluded (sometimes assumed EU but actually US-based):
//   - mysql-server (Oracle, US)
//   - sd-wan-service-attributes-and-service-framework-mef (MEF Forum, US)
//   - open-archives-initiative-protocol-for-metadata-harvesting (OAI, US)

/**
 * License strings that count as a permissive or copyleft OSS license.
 * Used for items where the JSON has a `license` field.
 */
const PERMISSIVE_LICENSE_TOKENS = [
	'mit',
	'apache',
	'bsd',
	'isc',
	'mpl',
	'mozilla public license',
	'lgpl',
	'gpl',
	'agpl',
	'eupl',
	'epl',
	'eclipse public license',
	'cc0',
	'cc-by',
	'public domain',
	'unlicense',
	'zlib',
	'wtfpl',
	'artistic',
	'postgresql', // PostgreSQL license = MIT-like
	'python software foundation',
];

/**
 * Per-id override of `permissiveLicense` for items where we know the license but
 * the JSON `license` field is not (yet) populated. This avoids guessing.
 */
const KNOWN_PERMISSIVE = new Set([
	// languages, runtimes
	'python', 'rust', 'go', 'swift', 'java', 'javascript-ecma-script', 'typescript', 'php', 'r', 'c',
	// platform / infra
	'kubernetes', 'postgresql', 'mariadb', 'mysql-server', 'mongodb', 'cassandra', 'couchdb', 'hbase',
	'nginx', 'envoy-proxy', 'traefik', 'kong', 'istio', 'flux', 'contour', 'docker-swarm',
	'openshift-origin-okd', 'rancher', 'portainer', 'spinnaker', 'jenkins', 'nomad',
	'emissary-ingress', 'openkruise', 'github-actions',
	// frameworks / libs
	'react', 'angular', 'nextjs', 'flutter', 'tensorflow', 'pytorch', 'huggingface-transformers',
	'spacy', 'haystack', 'langgraph', 'mlflow', 'milvus', 'chroma', 'nqdrant', 'pyro',
	'promptflow', 'ragflow', 'axolotl', 'angel-ml', 'selenium', 'robot-framework',
	// browsers / engines (iOS is intentionally NOT here — it is proprietary)
	'gecko', 'webkit', 'blink', 'android',
	// apps / lowcode
	'budibase', 'appsmith', 'joget', 'n8n', 'node-red',
	// data
	'neo4j', 'scylla',
	// build
	'gitlab',
]);

// ---------------------------------------------------------------------------
// Core derivation
// ---------------------------------------------------------------------------

function deriveCriteria(item) {
	const id = item.id;
	const layer = item.layer;
	const oss = item.oss === true;
	const existing = item.sovereigntyCriteria || {};

	const isStandardOrProtocol =
		layer === 'infrastructure' ||
		/protocol|standard|format|notation|markup/i.test(item.name || '') ||
		/-protocol|^iso-|^ietf-/.test(id);

	// --- selfHostable ----------------------------------------------------
	let selfHostable;
	if (NOT_SELF_HOSTABLE.has(id)) {
		selfHostable = false;
	} else if (oss) {
		selfHostable = true;
	} else if (isStandardOrProtocol) {
		// A standard is implementable by anyone → "self-hostable" in the conceptual sense
		selfHostable = true;
	} else {
		selfHostable = false;
	}

	// --- dataPortability -------------------------------------------------
	let dataPortability;
	if (NOT_DATA_PORTABLE.has(id)) {
		dataPortability = false;
	} else if (isStandardOrProtocol) {
		dataPortability = true;
	} else if (oss) {
		dataPortability = true;
	} else {
		dataPortability = false;
	}

	// --- openStandards ---------------------------------------------------
	let openStandards;
	if (NOT_OPEN_STANDARDS.has(id)) {
		openStandards = false;
	} else if (isStandardOrProtocol) {
		openStandards = true;
	} else if (oss && (layer === 'platform' || layer === 'building-blocks')) {
		// Most OSS infra/platform builds on standard protocols (HTTP, SQL, OCI, gRPC, etc.)
		openStandards = true;
	} else if (layer === 'applications') {
		openStandards = false; // apps must be evaluated individually; default false
	} else {
		openStandards = false;
	}

	// --- noTelemetryByDefault -------------------------------------------
	let noTelemetryByDefault;
	if (HAS_DEFAULT_TELEMETRY.has(id)) {
		noTelemetryByDefault = false;
	} else if (isStandardOrProtocol) {
		// A spec doesn't phone home
		noTelemetryByDefault = true;
	} else if (oss) {
		noTelemetryByDefault = true;
	} else {
		noTelemetryByDefault = false;
	}

	// --- permissiveLicense (refresh) ------------------------------------
	// Authoritative recompute: seed false, set true only on positive evidence.
	// Do NOT inherit the existing value — that would propagate prior backfill bugs
	// (e.g. iOS being mistakenly listed as permissive in an earlier run).
	let permissiveLicense = false;
	const licenseStr = (item.license || '').toLowerCase();
	if (licenseStr) {
		permissiveLicense = PERMISSIVE_LICENSE_TOKENS.some((t) => licenseStr.includes(t));
	} else if (KNOWN_PERMISSIVE.has(id)) {
		permissiveLicense = true;
	} else if (isStandardOrProtocol) {
		// Open standards/specs are by definition freely re-implementable
		permissiveLicense = true;
	}

	// --- euHeadquartered (refresh) --------------------------------------
	let euHeadquartered = EU_HEADQUARTERED.has(id);

	// --- preserve existing well-defined values --------------------------
	return {
		openSource: existing.openSource === true,
		euHeadquartered,
		hasAudit: existing.hasAudit === true,
		permissiveLicense,
		matureProject: existing.matureProject === true,
		selfHostable,
		dataPortability,
		openStandards,
		noTelemetryByDefault,
		...(existing.ownerType ? { ownerType: existing.ownerType } : {}),
	};
}

// ---------------------------------------------------------------------------
// Apply
// ---------------------------------------------------------------------------

const files = readdirSync(ITEMS_DIR).filter((f) => f.endsWith('.json')).sort();

const counts = {
	selfHostable: 0,
	dataPortability: 0,
	openStandards: 0,
	noTelemetryByDefault: 0,
	permissiveLicense: 0,
	euHeadquartered: 0,
};

for (const file of files) {
	const filePath = join(ITEMS_DIR, file);
	const item = JSON.parse(readFileSync(filePath, 'utf8'));
	const next = deriveCriteria(item);
	for (const k of Object.keys(counts)) {
		if (next[k]) counts[k]++;
	}
	item.sovereigntyCriteria = next;
	writeFileSync(filePath, `${JSON.stringify(item, null, '\t')}\n`, 'utf8');
}

console.log(`✅ Backfilled sovereigntyCriteria for ${files.length} items`);
console.log('   true counts:');
for (const [k, v] of Object.entries(counts)) {
	console.log(`     ${k.padEnd(24)} ${v}/${files.length}`);
}
