#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Meta-editorial entries to skip (normalized to lowercase)
const SKIP_LIST = new Set([
	'klare trennung zwischen technologie und standards',
	'horizontale interoperabilitätsstandards für verwaltungsanwendungen',
	'verbindliche integration des fim-baukasten als systemstandard',
	'vergabe- und beschaffungsstandards, die innovation ermöglichen',
	'kmu-gerechte beschaffungsstandards für spezialisierte it-anbieter',
	'betriebsplattformen / betriebssysteme',
	'standards für logging, monitoring und analyse-tools',
	'architekturmuster',
	'opensource und digitale souveränität',
	'sla-basierte betriebsmodelle',
	'standard für identitäten',
	'standard für wallets',
	'semantischer standard',
	'entwicklungsstandards',
	'aufführen einzelner algorithmen für signatur / verschlüsselung',
	'trennung von infrastruktur-standards und referenzimplementierungen (iaas/bare metal)',
	'orchestrierung',
	'uml-basierte dokumentationen',
	'standards für tests, mocks, ci/cd',
	'pack- und verschlüsselungsformate',
]);

// Known name aliases → existing item ID
const ALIAS_MAP = new Map([
	['k8s', 'kubernetes'],
	['kubernetes (k8s)', 'kubernetes'],
	['kafka', 'apache-kafka'],
	['apache kafka', 'apache-kafka'],
	['vue.js', 'vuejs'],
	['swagger / openapi', 'openapi'],
	['graphql', 'graphql'],
	['grpc', 'general-purpose-remote-procedure-calls'],
	['soap', 'simple-object-access-protocol'],
	['rest', 'representational-state-transfer'],
	['rdf', 'resource-description-framework-rdf'],
	['rfc 5698', null], // skip
	['otp', 'one-time-password-otp'],
	['fido2', 'fido2-webauthn'],
	['fido2-standards', 'fido2-webauthn'],
]);

// Proprietary products: set oss: false
const PROPRIETARY_PRODUCTS = new Set([
	'azure devops',
	'acr',
	'azure container registry',
	'telerik',
	'uipath',
	'apex oracle',
	'appian',
	'snyk',
	'sles',
	'suse linux enterprise server',
	'docuware',
	'governikus',
	'com tauri',
	'governikus multi messenger',
	'com despina',
	'com adeona',
	'id crucis',
	'id panstar',
	'id mercury',
	'data varuna',
	'data aeonia',
	'data sign',
	'datenschutzcockpit',
	'dvdv',
	'ams',
	'a12',
	'aks',
	'mcp router',
	'mcprouter',
	'mein unternehmenskonto',
	'muk',
]);

// Parse CSV with proper handling of quoted fields
function parseCSV(content) {
	const rows = [];
	let current = [];
	let field = '';
	let inQuotes = false;

	for (let i = 0; i < content.length; i++) {
		const char = content[i];
		const next = content[i + 1];

		if (char === '"') {
			if (inQuotes && next === '"') {
				// Escaped quote
				field += '"';
				i++;
			} else {
				// Toggle quote mode
				inQuotes = !inQuotes;
			}
		} else if (char === ',' && !inQuotes) {
			// Field separator
			current.push(field);
			field = '';
		} else if ((char === '\n' || char === '\r') && !inQuotes) {
			// Row separator
			if (field || current.length > 0) {
				current.push(field);
				if (current.some((f) => f.trim())) {
					rows.push(current);
				}
				current = [];
				field = '';
			}
			if (char === '\r' && next === '\n') i++; // Skip CRLF
		} else {
			field += char;
		}
	}

	if (field || current.length > 0) {
		current.push(field);
		if (current.some((f) => f.trim())) {
			rows.push(current);
		}
	}

	return rows;
}

// Load existing items into a map
function loadExistingItems() {
	const map = new Map();
	const itemsDir = join(ROOT, 'data/items');
	const files = readdirSync(itemsDir);

	for (const file of files) {
		if (!file.endsWith('.json')) continue;
		const id = file.replace('.json', '');
		const content = readFileSync(join(itemsDir, file), 'utf8');
		const item = JSON.parse(content);
		map.set(id, item);
	}

	return map;
}

// Convert name to slug
function toSlug(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.substring(0, 100)
		.replace(/-+/g, '-');
}

// Normalize name for deduplication
function normalizeName(name) {
	return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

// Try to find existing item by name
function findExistingItemId(name, existingItems) {
	const normalized = normalizeName(name);

	// Check alias map
	if (ALIAS_MAP.has(normalized)) {
		return ALIAS_MAP.get(normalized);
	}

	// Check existing items by name
	for (const [id, item] of existingItems) {
		if (normalizeName(item.name) === normalized) {
			return id;
		}
	}

	// Try slug matching
	const slug = toSlug(name);
	if (existingItems.has(slug)) {
		return slug;
	}

	return null;
}

// Guess layer based on keywords
function guessLayer(name, description) {
	const text = `${name} ${description}`.toLowerCase();

	// Infrastructure
	if (
		/network|protocol|netzwerk|krypto|encryption|storage|os|operating system|virtualisierung|hypervisor|bare.?metal|kubernetes operator|ingress|api gateway|load balance|dns|dhcp|tcp|udp|ipv|ethernet|bgp|ospf|mpls|vlan|firewall|vpn|wan|sd-wan|5g|telekom|nfs|ceph|minio|s3|container registry|oci|bare.?metal|provisioning|iam|identity|secret|vault|kerberos|ssh|tls|ssl/.test(
			text,
		)
	) {
		return 'infrastructure';
	}

	// Platform
	if (
		/docker|kubernetes|k8s|container|ci.?cd|pipeline|monitoring|observability|tracing|logging|metrics|prometheus|grafana|elasticsearch|jaeger|datadog|newrelic|database|postgresql|mongodb|cassandra|redis|cache|message.?broker|rabbitmq|kafka|nats|amqp|queuing|deployment|helm|flux|argocd|gitops|operator|webhook|scheduler|orchestr|platform.?as.?service|paas|function.?as.?service/.test(
			text,
		)
	) {
		return 'platform';
	}

	// Building-blocks
	if (
		/language|framework|library|sdk|runtime|compiler|standard format|serialization|json|xml|protobuf|binary|format|testing|test|mock|api.?definition|schema|validation|css|html|template|dom|react|vue|angular|nodejs|javascript|typescript|python|java|rust|golang|csharp|php/.test(
			text,
		)
	) {
		return 'building-blocks';
	}

	// Applications
	if (
		/cms|portal|low.?code|no.?code|workflow|business.?process|automation|dms|document|email|communication|chat|messaging|video|conference|e.?government|e.?gov|government|admin|office|erp|crm|payment|wallet|app|application|platform.?service|saas|service/.test(
			text,
		)
	) {
		return 'applications';
	}

	// Sovereign-standards
	if (
		/standard|spezifikation|xöv|osci|fim|eidäs|xta|xdomea|fit.?connect|accessibility|wcag|bitv|dsgvo|gdpr|interoperabilitä|legal|regulatory|e.?government standard|emelex|x-standard|schriftgut|verordnung|richtlinie|norm|din|iso|ietf|w3c|rfc|european|union|eup/.test(
			text,
		)
	) {
		return 'sovereign-standards';
	}

	// Default
	return 'building-blocks';
}

// Guess OSS flag
function guessOSS(name, description, verdict) {
	const text = `${name} ${description}`.toLowerCase();

	// Known proprietary
	if (PROPRIETARY_PRODUCTS.has(normalizeName(name))) {
		return false;
	}

	// Known open source keywords
	if (/open.?source|opensource|github|gitlab|apache|mozilla|linux|gnu|gpl|mit|bsd|eupl/.test(text)) {
		return true;
	}

	// Microsoft products (often proprietary, but some OSS)
	if (/microsoft|azure|.net|c#|csharp|powershell|visual studio/.test(text)) {
		if (/github|opensource|mono|roslyn/.test(text)) return true;
		return false; // Default to proprietary for MS
	}

	// Default to true (assume open source unless known proprietary)
	return true;
}

// Create a new item object
function createItem(name, description, id) {
	return {
		id,
		name,
		layer: guessLayer(name, description),
		description: { de: description.substring(0, 500), en: '' },
		oss: guessOSS(name, description),
		tags: [],
		sovereigntyCriteria: {
			openSource: guessOSS(name, description),
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
}

// Main function
async function main() {
	console.log('🔄 Importing NEGZ Stack items...\n');

	// Read CSV
	const csvPath = join(ROOT, 'docs/stacks/NEGZ-Stack.de.csv');
	const csvContent = readFileSync(csvPath, 'utf8');
	const rows = parseCSV(csvContent);

	console.log(`📊 CSV parsed: ${rows.length} rows`);

	// Skip first 3 rows (intro, empty, header)
	const dataRows = rows.slice(3);
	console.log(`📝 Data rows: ${dataRows.length}`);

	// Load existing items
	const existingItems = loadExistingItems();
	console.log(`✅ Existing items: ${existingItems.size}\n`);

	// Collect unique items
	const seen = new Set();
	const items = [];

	for (const row of dataRows) {
		const name = row[1]?.trim().replace(/^\t+/, '');
		const description = row[2]?.trim() || '';
		const verdict = row[0]?.trim() || 'fehlt';

		if (!name) continue;

		const normalized = normalizeName(name);

		// Skip meta items
		if (SKIP_LIST.has(normalized)) {
			console.log(`⏭️  Skip (meta): ${name}`);
			continue;
		}

		// Skip duplicates
		if (seen.has(normalized)) {
			continue;
		}

		seen.add(normalized);
		items.push({ name, description, verdict });
	}

	console.log(`🎯 Unique items after dedup: ${items.length}\n`);

	// Process items
	const stackItems = [];
	let newCount = 0;
	let existingCount = 0;

	for (const item of items) {
		const existingId = findExistingItemId(item.name, existingItems);

		if (existingId) {
			console.log(`✨ Found existing: ${item.name} → ${existingId}`);
			existingCount++;
			stackItems.push({
				itemId: existingId,
				status: 'recommended',
				role: 'consumer',
				rationale: {
					de: `NEGZ-Feedback: ${item.verdict}`,
				},
			});
		} else {
			const slug = toSlug(item.name);
			const newItem = createItem(item.name, item.description, slug);

			// Write item file
			const itemPath = join(ROOT, 'data/items', `${slug}.json`);
			writeFileSync(itemPath, JSON.stringify(newItem, null, 2) + '\n', 'utf8');

			console.log(`✏️  Created new: ${item.name} (${slug})`);
			newCount++;

			stackItems.push({
				itemId: slug,
				status: 'recommended',
				role: 'consumer',
				rationale: {
					de: `NEGZ-Feedback: ${item.verdict}`,
				},
			});
		}
	}

	console.log(`\n📊 Summary:\n  New items: ${newCount}\n  Existing: ${existingCount}\n  Total: ${stackItems.length}\n`);

	// Create stack
	const stack = {
		id: 'negz',
		name: {
			de: 'NEGZ-Empfehlungsstack',
			en: 'NEGZ Recommendation Stack',
		},
		description: {
			de: 'Community-Feedback des NEGZ zu fehlenden und überflüssigen Standards im Deutschland-Stack.',
			en: 'NEGZ community feedback on missing and redundant standards in the Germany Stack.',
		},
		country: 'DE',
		issuer: 'Nationales E-Government Kompetenzzentrum (NEGZ)',
		version: '0.1.0',
		publishedAt: '2026-04-26',
		sources: [
			{
				label: {
					de: 'NEGZ-Feedback-CSV',
					en: 'NEGZ Feedback CSV',
				},
				url: 'https://negz.org',
			},
		],
		items: stackItems.sort((a, b) => a.itemId.localeCompare(b.itemId)),
	};

	// Write stack file
	const stackPath = join(ROOT, 'data/stacks/negz.json');
	writeFileSync(stackPath, JSON.stringify(stack, null, 2) + '\n', 'utf8');

	console.log(`✅ Created: data/stacks/negz.json`);
	console.log(`\n🎉 NEGZ Stack import complete!\n`);
}

main().catch((err) => {
	console.error('❌ Error:', err.message);
	process.exit(1);
});
