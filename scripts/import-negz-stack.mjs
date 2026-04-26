#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const CSV_PATH = join(ROOT, 'docs', 'stacks', 'NEGZ-Stack.de.csv');
const ITEMS_DIR = join(ROOT, 'data', 'items');
const STACK_PATH = join(ROOT, 'data', 'stacks', 'negz.json');

const VALID_VERDICTS = new Set(['fehlt', 'überflüssig', 'uberflussig', 'ändern', 'andern']);

const META_ENTRIES = new Set([
	'klare trennung zwischen technologie und standards',
	'horizontale interoperabilitatsstandards fur verwaltungsanwendungen',
	'verbindliche integration des fim-baukasten als systemstandard',
	'vergabe- und beschaffungsstandards, die innovation ermoglichen',
	'kmu-gerechte beschaffungsstandards fur spezialisierte it-anbieter',
	'betriebsplattformen / betriebssysteme',
	'standards fur logging, monitoring und analyse-tools',
	'architekturmuster',
	'opensource und digitale souveranitat',
	'sla-basierte betriebsmodelle',
	'standard fur identitaten',
	'standard fur wallets',
	'semantischer standard',
	'entwicklungsstandards',
	'auffuhren einzelner algorithmen',
	'trennung von infrastruktur-standards und referenzimplementierungen',
	'orchestrierung',
	'uml-basierte dokumentationen',
	'sboms (als generisches konzept)',
	'fast alle frameworks',
	// additional exclusions for non-item / editorial rows
	'apache produkte',
	'auffuhren einzelner algorithmen fur signatur verschlusselung',
	'betriebsplattformen betriebssysteme',
	'gitlab erweiterung der beschreibung',
	'kmu gerechte beschaffungsstandards fur spezialisierte it anbieter',
	'open virtualization format ovf open virtual appliance ova',
	'ozg datenmodelle fim datenmodelle',
	'pack und verschlusselungsformate',
	'po mo format u xliff',
	'sbt und mill',
	'sla basierte betriebsmodelle',
	'standards fur logging monitoring und analyse tools',
	'starttls smtps',
	'stoa potentiell kommender standard',
	'symfony php stack',
	'trennung von infrastruktur standards und referenzimplementierungen iaas bare metal',
	'uml basierte dokumentationen',
	'verbindliche integration des fim baukasten als systemstandard',
	'vergabe und beschaffungsstandards die innovation ermoglichen',
	'video basierte synchrone kommunikationsschnittstelle webrtc basiert',
	'anp und ag ui',
]);

const ALIASES = new Map([
	['a2a', 'agent-to-agent-protocol'],
	['a2a agent to agent protocol', 'agent-to-agent-protocol'],
	['ag-ui', 'agent-user-interaction-protocol-ag-ui'],
	['anp', 'agent-network-protocol'],
	['mcp', 'model-context-protocol-mcp'],
	['mcp model context protocol', 'model-context-protocol-mcp'],
	['oauth 2.0', 'open-authorization-oauth'],
	['oauth2', 'open-authorization-oauth'],
	['oauth 2', 'open-authorization-oauth'],
	['oauth 2 0', 'open-authorization-oauth'],
	['openid connect', 'openid-connect-oidc'],
	['oidc', 'openid-connect-oidc'],
	['wifi', 'wi-fi-ieee-802-11'],
	['k8s', 'kubernetes'],
	['kubernetes', 'kubernetes'],
	['tls', 'transport-layer-security-tls'],
	['yaml', 'yaml-ain-t-markup-language'],
	['gitlab', 'gitlab'],
	['react', 'react'],
	['python', 'python'],
	['typescript', 'typescript'],
	['openapi', 'openapi'],
	['swagger openapi', 'openapi'],
	['kolibri barrierefreie html standard public ui', 'public-ui-kolibri'],
	['public ui kolibri', 'public-ui-kolibri'],
	['xov', 'xoev'],
	['xov standards', 'xoev'],
	['xov nachrichtenformate', 'xoev'],
	['webdav', 'webdav-rfc-4918'],
	['caldav', 'caldav-rfc-4791'],
	['carddav', 'carddav-rfc-6352'],
	['ldap', 'ldap-rfc-4511'],
	['scim', 'scim-rfc-7644'],
	['sql', 'structured-query-language-sql'],
	['postgresql', 'postgresql'],
	['soap', 'soap-xml-protocol'],
]);

const SPLIT_MAP = new Map([
	['cyclonedx und cdxgen', ['CycloneDX', 'cdxgen']],
	['webrtc and janus server', ['WebRTC', 'Janus Server']],
]);

const PROPRIETARY_HINTS = ['azure', 'microsoft', 'telerik', 'uipath', 'snyk', 'oracle', 'salesforce', 'servicenow'];

const parseCsv = (input) => {
	const rows = [];
	let row = [];
	let current = '';
	let inQuotes = false;
	for (let i = 0; i < input.length; i++) {
		const ch = input[i];
		if (ch === '"') {
			if (inQuotes && input[i + 1] === '"') {
				current += '"';
				i++;
			} else {
				inQuotes = !inQuotes;
			}
			continue;
		}
		if (ch === ',' && !inQuotes) {
			row.push(current);
			current = '';
			continue;
		}
		if ((ch === '\n' || ch === '\r') && !inQuotes) {
			if (ch === '\r' && input[i + 1] === '\n') i++;
			row.push(current);
			rows.push(row);
			row = [];
			current = '';
			continue;
		}
		current += ch;
	}
	if (current || row.length) {
		row.push(current);
		rows.push(row);
	}
	return rows;
};

const normalize = (value) =>
	value
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.replace(/\s+/g, ' ');

const slugify = (value) =>
	normalize(value)
		.replace(/\s+/g, '-')
		.replace(/^-+|-+$/g, '');

const cleanText = (value) => value.replace(/\s+/g, ' ').trim();
const tokenize = (value) =>
	normalize(value)
		.split(' ')
		.filter((token) => token.length > 2);

const guessLayer = ({ name, description, rationale }) => {
	const text = normalize(`${name} ${description} ${rationale}`);
	if (/(rfc|din|iso|etsi|w3c|standard|spezifikation|specification|xov|xoev|osci|eidas|eupl|schema|format|lizenz|license)/.test(text))
		return 'sovereign-standards';
	if (/(linux|kernel|storage|ceph|rook|network|dns|tls|ssh|sha|ed25519|wifi|bluetooth|quic|tcp|udp|container runtime|virtualisierung)/.test(text))
		return 'infrastructure';
	if (
		/(kubernetes|k8s|ci cd|gitlab|github actions|rabbitmq|kafka|monitoring|grafana|prometheus|otel|database|postgres|mysql|mariadb|keycloak|oauth|oidc|ldap|scim|vault)/.test(
			text,
		)
	)
		return 'platform';
	if (/(framework|library|sdk|typescript|javascript|python|java|php|symfony|react|vue|angular|markdown|cyclonedx|protobuf|webrtc)/.test(text))
		return 'building-blocks';
	return 'applications';
};

const isOss = ({ name, description, rationale }) => {
	const text = normalize(`${name} ${description} ${rationale}`);
	if (PROPRIETARY_HINTS.some((hint) => text.includes(hint))) return false;
	return true;
};

const rows = parseCsv(readFileSync(CSV_PATH, 'utf8'));
const headerIndex = rows.findIndex((row) => normalize(row[0] || '') === 'urteil');
if (headerIndex < 0) throw new Error('CSV header row not found');

const existingFiles = readdirSync(ITEMS_DIR).filter((name) => name.endsWith('.json'));
const existingIds = new Set(existingFiles.map((name) => name.replace('.json', '')));
const existingNameToId = new Map();
for (const file of existingFiles) {
	const item = JSON.parse(readFileSync(join(ITEMS_DIR, file), 'utf8'));
	existingNameToId.set(normalize(item.name), item.id);
}

const findFuzzyExistingId = (name) => {
	const nameNorm = normalize(name);
	const nameTokens = new Set(tokenize(name));
	if (nameNorm.includes('kolibri') && existingIds.has('public-ui-kolibri')) {
		return 'public-ui-kolibri';
	}

	let bestId;
	let bestScore = 0;
	for (const [existingName, existingId] of existingNameToId) {
		const existingTokens = new Set(existingName.split(' ').filter((token) => token.length > 2));
		const union = new Set([...nameTokens, ...existingTokens]);
		const intersectionCount = [...nameTokens].filter((token) => existingTokens.has(token)).length;
		const score = union.size > 0 ? intersectionCount / union.size : 0;

		if (score > bestScore) {
			bestScore = score;
			bestId = existingId;
		}
		if (nameNorm.length >= 8 && (existingName.includes(nameNorm) || nameNorm.includes(existingName))) {
			bestId = existingId;
			bestScore = Math.max(bestScore, 0.9);
		}
	}

	return bestScore >= 0.72 ? bestId : undefined;
};

const entries = new Map();
for (const row of rows.slice(headerIndex + 1)) {
	if (!row.some((cell) => cell?.trim())) continue;
	const verdictRaw = cleanText(row[0] || '');
	const verdict = normalize(verdictRaw);
	if (!VALID_VERDICTS.has(verdict)) continue;

	const rawName = cleanText(row[1] || '');
	if (!rawName || normalize(rawName) === 'fehlt') continue;
	const normRawName = normalize(rawName);
	if (META_ENTRIES.has(normRawName)) continue;

	const description = cleanText(row[2] || '');
	const rationale = cleanText(row[3] || '');

	const names = SPLIT_MAP.get(normRawName) ?? [rawName];
	for (const name of names) {
		const normalizedName = normalize(name);
		if (!normalizedName || META_ENTRIES.has(normalizedName)) continue;
		if (!entries.has(normalizedName)) {
			entries.set(normalizedName, { name: cleanText(name), verdict: verdictRaw, description, rationale });
		}
	}
}

const created = [];
const stackItems = [];

for (const entry of [...entries.values()].sort((a, b) => a.name.localeCompare(b.name, 'de'))) {
	const normalizedName = normalize(entry.name);
	let id = ALIASES.get(normalizedName) || existingNameToId.get(normalizedName);
	if (!id) {
		const slug = slugify(entry.name);
		id = existingIds.has(slug) ? slug : undefined;
	}
	if (!id) {
		id = findFuzzyExistingId(entry.name);
	}
	if (!id) {
		id = slugify(entry.name);
		if (!id) continue;
		let candidate = id;
		let counter = 2;
		while (existingIds.has(candidate)) {
			candidate = `${id}-${counter}`;
			counter++;
		}
		id = candidate;
		const oss = isOss(entry);
		const item = {
			id,
			name: entry.name,
			layer: guessLayer(entry),
			description: {
				de: entry.description || `Eintrag aus dem NEGZ-Feedback: ${entry.name}.`,
				en: '',
			},
			tags: ['negz-import', 'unresearched'],
			oss,
			sovereigntyCriteria: {
				openSource: oss,
				euHeadquartered: false,
				hasAudit: false,
				permissiveLicense: false,
				matureProject: false,
				selfHostable: false,
				dataPortability: false,
				openStandards: false,
				noTelemetryByDefault: false,
			},
		};
		writeFileSync(join(ITEMS_DIR, `${id}.json`), `${JSON.stringify(item, null, '\t')}\n`, 'utf8');
		existingIds.add(id);
		existingNameToId.set(normalizedName, id);
		created.push(id);
	}

	stackItems.push({
		itemId: id,
		status: 'recommended',
		role: 'consumer',
		rationale: {
			de: `NEGZ-Feedback (${entry.verdict}): ${entry.rationale || 'Aufnahme aus der CSV-Rueckmeldung.'}`,
			en: `NEGZ feedback (${entry.verdict}): ${entry.rationale || 'Added from CSV feedback.'}`,
		},
	});
}

const dedupedItems = [...new Map(stackItems.map((item) => [item.itemId, item])).values()].sort((a, b) => a.itemId.localeCompare(b.itemId));

const stack = {
	id: 'negz',
	name: { de: 'NEGZ-Empfehlungsstack', en: 'NEGZ Recommendation Stack' },
	description: {
		de: 'Community-Feedback des NEGZ zu fehlenden und ueberfluessigen Standards im Deutschland-Stack.',
		en: 'NEGZ community feedback on missing and redundant standards in the Germany Stack.',
	},
	country: 'DE',
	issuer: 'Nationales E-Government Kompetenzzentrum (NEGZ)',
	version: '0.1.0',
	publishedAt: '2026-04-26',
	sources: [{ label: { de: 'NEGZ-Feedback-CSV', en: 'NEGZ feedback CSV' }, url: 'https://negz.org' }],
	items: dedupedItems,
};

writeFileSync(STACK_PATH, `${JSON.stringify(stack, null, '\t')}\n`, 'utf8');
console.log(`Imported ${dedupedItems.length} stack items, created ${created.length} new item files.`);
