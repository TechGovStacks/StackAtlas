#!/usr/bin/env node
/**
 * Backfills `itemKind` on all items in data/items/ that don't have one yet.
 *
 * Classification priority:
 *   1. Explicit ID → kind map
 *   2. groupKey patterns
 *   3. sublayer patterns
 *   4. ID / name heuristics
 *   5. Layer-based fallback
 *
 * Run: node scripts/backfill-item-kinds.mjs [--dry-run]
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DRY_RUN = process.argv.includes('--dry-run');
const ITEMS_DIR = join(process.cwd(), 'data', 'items');

// ---------------------------------------------------------------------------
// 1. Explicit ID → kind map (highest priority, manually curated)
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const EXPLICIT = {
	// --- Protocols ---
	'802-11-bis-802-11-be': 'protocol',
	'agent-network-protocol': 'protocol',
	'agent-to-agent-protocol': 'protocol',
	'agent-user-interaction-protocol-ag-ui': 'protocol',
	amqp: 'protocol',
	bluetooth: 'protocol',
	'border-gateway-protocol-bgp': 'protocol',
	caldav: 'protocol',
	carddav: 'protocol',
	'dynamic-host-configuration-protocol-dhcp': 'protocol',
	'file-transfer-protocol-uber-tls-ftps': 'protocol',
	'govstack-information-mediator': 'protocol',
	'hypertext-transfer-protocol-http': 'protocol',
	imap: 'protocol',
	'internal-gateway-protocols-igp': 'protocol',
	'internet-message-access-protocol-secure-imaps': 'protocol',
	'internet-protocol-security-ipsec': 'protocol',
	'internet-protocol-version-6-ipv6': 'protocol',
	kitten: 'protocol',
	'model-context-protocol-mcp': 'protocol',
	'multiprotocol-label-switching-mpls': 'protocol',
	'oauth-2-0': 'protocol',
	'open-archives-initiative-protocol-for-metadata-harvesting': 'protocol',
	'open-authorization-oauth': 'protocol',
	pop3: 'protocol',
	'session-initiation-protocol-sip': 'protocol',
	signalr: 'protocol',
	smtp: 'protocol',
	'transport-layer-security-tls': 'protocol',
	websockets: 'protocol',
	'fido2-webauthn': 'protocol',
	'openid-connect-oidc': 'protocol',
	saml: 'protocol',
	ldap: 'protocol',
	'messaging-layer-security-mls': 'protocol',

	// --- Formats ---
	asciidoc: 'format',
	'comma-separated-values-csv': 'format',
	'data-catalog-vocabulary-dcat': 'format',
	'epub-accessibility-iso-iec-23761-barrierefreie-e-publikationen': 'format',
	'extensible-markup-language-xml': 'format',
	'javascript-object-notation-json': 'format',
	'json-schema': 'format',
	'json-ld': 'format',
	'markdown-commonmark-spezifikation-rfc-7763': 'format',
	'markdown-md': 'format',
	'oci-image-format': 'format',
	'opendocument-format-odf': 'format',
	'open-virtualization-format-ovf-open-virtual-appliance-ova': 'format',
	'pdf-a': 'format',
	'po-mo-format-u-xliff': 'format',
	'protocol-buffers-protobuf': 'format',
	'resource-description-framework-rdf': 'format',
	xml: 'format',
	xrechnung: 'format',
	'yaml-ain-t-markup-language': 'format',
	'turtle-rdf': 'format',
	'owl-web-ontology-language': 'format',
	sparql: 'format',

	// --- Standards ---
	arc42: 'standard',
	archimate: 'standard',
	'atag-2-0-authoring-tool-accessibility-guidelines-w3c': 'standard',
	'advanced-encryption-standard': 'standard',
	bpmn: 'standard',
	'bpmn-v2-0': 'standard',
	cmmn: 'standard',
	'din-5008': 'standard',
	'din-91379': 'standard',
	'din-spec-66336-servicestandard-qualit-tsanforderungen-f-r-onlineservices-und-portale-der-ffentlichen': 'standard',
	'din-spec-66336-servicestandard-qualitatsanforderungen-fur-onlineservices-und-portale-der-offentlichen-verwaltung': 'standard',
	dmn: 'standard',
	e164: 'standard',
	'eidas-2-0': 'standard',
	'es3-standard': 'standard',
	'etsi-en-119-461-v2': 'standard',
	'eupl-1-2': 'standard',
	'eudi-wallet': 'standard',
	'fido2-standards': 'standard',
	'fim-datenstandard': 'standard',
	'iso-9241-normenreihe-ergonomie-der-mensch-system-interaktion': 'standard',
	'iso-9241-171-2025-ergonomics-of-human-system-interaction-software-accessibility': 'standard',
	'iso-iec-19757-3-schematron': 'standard',
	itil: 'standard',
	'kern-ux-standard': 'standard',
	'krypto-agilit-t-standards-ff': 'standard',
	schematron: 'standard',
	'securitysuitabilitypolicy-rfc-5698': 'standard',
	'wcag-2-2': 'standard',
	'wcag-3-0': 'standard',
	xprozess: 'standard',
	safe: 'standard',

	// --- Languages ---
	c: 'language',
	'c-razor': 'language',
	'javascript-ecma-script': 'language',
	kotlin: 'language',
	python: 'language',
	typescript: 'language',
	java: 'language',
	rust: 'language',
	go: 'language',
	sql: 'language',
	'c-sharp': 'language',
	'f-sharp': 'language',
	scala: 'language',
	ruby: 'language',
	php: 'language',
	swift: 'language',
	'objective-c': 'language',
	dart: 'language',
	'r-lang': 'language',
	matlab: 'language',
	groovy: 'language',
	'apex-oracle': 'language',

	// --- Runtimes ---
	'webassembly-wasm': 'runtime',
	'node-js': 'runtime',
	'java-virtual-machine-jvm': 'runtime',
	'dot-net': 'runtime',
	'net-framework': 'runtime',
	deno: 'runtime',
	bun: 'runtime',

	// --- Platforms (databases, brokers, orchestrators) ---
	'apache-kafka': 'platform',
	kafka: 'platform',
	etcd: 'platform',
	postgresql: 'platform',
	'mysql-server': 'platform',
	mariadb: 'platform',
	mongodb: 'platform',
	redis: 'platform',
	elasticsearch: 'platform',
	cassandra: 'platform',
	couchdb: 'platform',
	hbase: 'platform',
	scylla: 'platform',
	neo4j: 'platform',
	milvus: 'platform',
	qdrant: 'platform',
	chroma: 'platform',
	'apache-spark': 'platform',
	'sovereign-cloud-stack': 'platform',

	// --- Frameworks ---
	angular: 'framework',
	'net-aspire': 'framework',
	blazor: 'framework',

	// --- Tools ---
	agentgateway: 'tool',
	ansible: 'tool',
	'argo-cd': 'tool',
	'argo-workflow': 'tool',
	argocd: 'tool',
	'azure-devops': 'tool',
	bruno: 'tool',
	fluentd: 'tool',
	'janus-server': 'tool',
	msbuild: 'tool',
	nuget: 'tool',
	'nuke-build': 'tool',
	openresponses: 'tool',
	'owasp-dependency-track': 'tool',
	'renovate-bot': 'tool',
	seq: 'tool',
	snyk: 'tool',
	sonarqube: 'tool',
	telerik: 'tool',
	terrascan: 'tool',
	webpack: 'tool',

	// --- Service ---
	bundid: 'service',
	aadhaar: 'service',
	myinfo: 'service',
	digilocker: 'service',

	// --- API styles & protocols misclassified as standard ---
	'general-purpose-remote-procedure-calls': 'protocol',
	'simple-object-access-protocol': 'protocol',
	'osci-soap': 'protocol',
	graphql: 'standard',

	// --- XÖV / German administrative formats & standards ---
	'x-v-nachrichtenformate': 'format',
	xbestellung: 'format',
	xbezahldienste: 'standard',
	xdatenfeld: 'standard',
	xdatenfelder: 'standard',
	xdomea: 'format',
	xjustiz: 'format',
	xkatalog: 'format',
	xunternehmen: 'standard',
	'xunternehmen-kerndatenmodell': 'standard',
	xzufi: 'standard',
	'osci-xta': 'protocol',
	'osci-xta-soap': 'protocol',
	'xml-encryption': 'standard',
	'xml-signature': 'standard',
	xmpp: 'protocol',
	'x-v-standards': 'standard',
	'x-v': 'standard',

	// --- Formats without long canonical name ---
	yaml: 'format',

	// --- Tools wrongly falling into sovereign-standards layer ---
	fluentd: 'tool',
	lightllm: 'tool',
	phi: 'tool',
	'janus-server': 'tool',
	kafka: 'platform',
	etcd: 'platform',
	kotlin: 'language',
	msbuild: 'tool',
	'net-aspire': 'framework',
	nuget: 'tool',
	'nuke-build': 'tool',
	openresponses: 'tool',
	'owasp-dependency-track': 'tool',
	'renovate-bot': 'tool',
	seq: 'tool',
	snyk: 'tool',
	sonarqube: 'tool',
	telerik: 'framework',
	terrascan: 'tool',
	webpack: 'tool',
	agentgateway: 'tool',
	webassembly: 'runtime',
	'webassembly-wasm': 'runtime',
};

// ---------------------------------------------------------------------------
// 2. groupKey → kind
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const GROUP_KEY_KIND = {
	'data-serialization-format': 'format',
	'data-catalog-standard': 'format',
	'phone-number-standard': 'standard',
	'authentication-protocol': 'protocol',
	'api-style': 'standard',
	'sql-db': 'platform',
	'nosql-db': 'platform',
	'vector-db': 'platform',
	'time-series-db': 'platform',
	'graph-db': 'platform',
	'message-broker': 'platform',
	'container-orchestration': 'platform',
	'service-mesh': 'platform',
	'container-registry': 'platform',
	'open-data-portal': 'platform',
	'data-registry': 'platform',
	'digital-citizen-service': 'service',
	'component-framework': 'framework',
	'css-framework': 'framework',
	'web-framework': 'framework',
	'mobile-framework': 'framework',
	'lowcode-platform': 'platform',
	'workflow-orchestration': 'tool',
	'ci-cd': 'tool',
	iac: 'tool',
	cms: 'platform',
	'identity-provider': 'platform',
};

// ---------------------------------------------------------------------------
// 3. sublayer → kind
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const SUBLAYER_KIND = {
	sprachen: 'language',
	laufzeit: 'runtime',
};

// ---------------------------------------------------------------------------
// 4. Heuristic patterns on item ID
// ---------------------------------------------------------------------------

const PROTOCOL_PATTERNS = ['-protocol-', '-protocol', 'protocol-', 'smtp', 'imap', 'pop3'];
const FORMAT_PATTERNS = ['-format', 'format-', '-schema', '-markup-', '-notation-'];
const STANDARD_PATTERNS = ['iso-', 'din-', 'etsi-', 'wcag-', 'atag-', '-standard', '-norm'];
const LANGUAGE_PATTERNS = ['-language', 'ecma-script', 'javascript', 'typescript', 'python', 'kotlin', 'rust', 'golang', 'swift'];

function heuristicKind(id, name) {
	const s = id.toLowerCase();
	if (PROTOCOL_PATTERNS.some((p) => s.includes(p))) return 'protocol';
	if (FORMAT_PATTERNS.some((p) => s.includes(p))) return 'format';
	if (STANDARD_PATTERNS.some((p) => s.includes(p))) return 'standard';
	if (LANGUAGE_PATTERNS.some((p) => s.includes(p))) return 'language';
	return null;
}

// ---------------------------------------------------------------------------
// 5. Layer-based fallback
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const LAYER_FALLBACK = {
	infrastructure: 'platform',
	platform: 'platform',
	'building-blocks': 'tool',
	applications: 'service',
	'sovereign-standards': 'standard',
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function classifyItem(item) {
	const id = item.id ?? '';
	const groupKey = item.groupKey ?? '';
	const sublayer = item.sublayer ?? '';
	const layer = item.layer ?? '';
	const name = typeof item.name === 'string' ? item.name : (item.name?.de ?? item.name?.en ?? '');

	if (EXPLICIT[id]) return EXPLICIT[id];
	if (GROUP_KEY_KIND[groupKey]) return GROUP_KEY_KIND[groupKey];
	if (SUBLAYER_KIND[sublayer]) return SUBLAYER_KIND[sublayer];
	const heuristic = heuristicKind(id, name);
	if (heuristic) return heuristic;
	return LAYER_FALLBACK[layer] ?? null;
}

const files = readdirSync(ITEMS_DIR).filter((f) => f.endsWith('.json') && f !== 'AGENTS.md');
let updated = 0;
let skipped = 0;

for (const file of files) {
	const filePath = join(ITEMS_DIR, file);
	const raw = readFileSync(filePath, 'utf-8');
	let item;
	try {
		item = JSON.parse(raw);
	} catch {
		console.error(`  ✗ JSON parse error: ${file}`);
		continue;
	}

	if (item.itemKind) {
		skipped++;
		continue;
	}

	const kind = classifyItem(item);
	if (!kind) {
		console.warn(`  ? No kind found for: ${item.id} (layer=${item.layer})`);
		continue;
	}

	if (DRY_RUN) {
		console.log(`  [dry] ${item.id} → ${kind}`);
		updated++;
		continue;
	}

	// Insert itemKind after groupKey (or after sublayer, or after layer)
	const insertAfter = item.groupKey !== undefined ? 'groupKey' : item.sublayer !== undefined ? 'sublayer' : 'layer';

	const keys = Object.keys(item);
	const insertIdx = keys.indexOf(insertAfter);
	const orderedItem = {};
	for (let i = 0; i <= insertIdx; i++) orderedItem[keys[i]] = item[keys[i]];
	orderedItem.itemKind = kind;
	for (let i = insertIdx + 1; i < keys.length; i++) orderedItem[keys[i]] = item[keys[i]];

	writeFileSync(filePath, JSON.stringify(orderedItem, null, '\t') + '\n', 'utf-8');
	updated++;
}

console.log(`\n${DRY_RUN ? '[dry-run] ' : ''}Done: ${updated} updated, ${skipped} already had itemKind.`);
