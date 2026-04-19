#!/usr/bin/env node
/**
 * Backfill missing license information for OSS items.
 *
 * Strategy:
 * 1. Use a knowledge base of common projects and their licenses
 * 2. Perform exact matching first, then fuzzy matching with length threshold
 * 3. For items without matches, keep the license field empty (to be filled manually)
 *
 * Run: node scripts/backfill-licenses.mjs
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ITEMS_DIR = join(ROOT, 'data', 'items');

// Knowledge base of well-known open-source projects and their licenses
const LICENSE_DATABASE = {
	// Web frameworks & platforms
	'angular': 'MIT',
	'vue': 'MIT',
	'react': 'MIT',
	'svelte': 'MIT',
	'ember': 'MIT',
	'django': 'BSD-3-Clause',
	'flask': 'BSD-3-Clause',
	'fastapi': 'MIT',
	'rails': 'MIT',
	'spring': 'Apache-2.0',
	'spring-boot': 'Apache-2.0',
	'laravel': 'MIT',
	'symfony': 'MIT',
	'asp-net-core': 'MIT',
	'express': 'MIT',
	'nestjs': 'MIT',
	'next': 'MIT',
	'nuxt': 'MIT',
	'gatsby': 'MIT',
	'hugo': 'Apache-2.0',
	'jekyll': 'MIT',
	'eleventy': 'MIT',

	// Databases & data
	'postgresql': 'PostgreSQL',
	'mysql': 'GPL-2.0',
	'mongodb': 'SSPL-1.0',
	'redis': 'SSPL-1.0',
	'elasticsearch': 'SSPL-1.0',
	'cassandra': 'Apache-2.0',
	'mariadb': 'GPL-2.0',
	'sqlite': 'public-domain',
	'couchdb': 'Apache-2.0',
	'dynamodb': 'proprietary',
	'firestore': 'proprietary',
	'neo4j': 'SSPL-1.0',
	'arangodb': 'Apache-2.0',
	'etcd': 'Apache-2.0',
	'cockroachdb': 'BSL-1.1',
	'influxdb': 'AGPL-3.0',
	'timescaledb': 'TSPL',
	'memsql': 'proprietary',
	'snowflake': 'proprietary',
	'bigquery': 'proprietary',

	// DevOps & Infrastructure
	'docker': 'Apache-2.0',
	'kubernetes': 'Apache-2.0',
	'terraform': 'BUSL-1.1',
	'ansible': 'GPL-3.0-or-later',
	'jenkins': 'MIT',
	'gitlab-ci': 'proprietary',
	'github-actions': 'proprietary',
	'circleci': 'proprietary',
	'travis-ci': 'MIT',
	'gitlab': 'proprietary',
	'gitea': 'MIT',
	'prometheus': 'Apache-2.0',
	'grafana': 'AGPL-3.0',
	'datadog': 'proprietary',
	'splunk': 'proprietary',
	'newrelic': 'proprietary',
	'elastic-stack': 'SSPL-1.0',
	'argocd': 'Apache-2.0',
	'fluxcd': 'Apache-2.0',

	// Languages
	'python': 'PSF',
	'javascript': 'N/A',
	'typescript': 'Apache-2.0',
	'rust': 'MIT',
	'go': 'BSD-3-Clause',
	'java': 'proprietary',
	'csharp': 'MIT',
	'cpp': 'proprietary',
	'c': 'proprietary',
	'php': 'PHP-3.01',
	'ruby': 'Ruby',
	'scala': 'Apache-2.0',
	'kotlin': 'Apache-2.0',
	'swift': 'Apache-2.0',
	'objective-c': 'proprietary',
	'groovy': 'Apache-2.0',
	'erlang': 'Apache-2.0',
	'elixir': 'Apache-2.0',
	'clojure': 'EPL-1.0',
	'haskell': 'BSD-3-Clause',
	'lua': 'MIT',
	'perl': 'Artistic-2.0',

	// Security & Authentication
	'openssl': 'Apache-2.0',
	'keycloak': 'Apache-2.0',
	'okta': 'proprietary',
	'auth0': 'proprietary',
	'oauth2-proxy': 'MIT',
	'vault': 'BUSL-1.1',
	'boundary': 'BUSL-1.1',
	'teleport': 'AGPL-3.0',
	'wireguard': 'GPL-2.0',
	'openvpn': 'GPL-2.0-or-later',
	'strongswan': 'GPL-2.0-or-later',
	'openssh': 'BSD-3-Clause',
	'lets-encrypt': 'Apache-2.0',

	// Message brokers & queues
	'apache-kafka': 'Apache-2.0',
	'rabbitmq': 'MPL-2.0',
	'activemq-artemis': 'Apache-2.0',
	'nats': 'Apache-2.0',
	'zeromq': 'LGPL-3.0',
	'nsq': 'MIT',
	'mqtt': 'N/A',
	'mosquitto': 'EPL-2.0',
	'solace': 'proprietary',
	'pulsar': 'Apache-2.0',

	// Containers & Orchestration
	'containerd': 'Apache-2.0',
	'podman': 'Apache-2.0',
	'podman-compose': 'GPL-3.0',
	'docker-compose': 'Apache-2.0',
	'helm': 'Apache-2.0',
	'skaffold': 'Apache-2.0',
	'kustomize': 'Apache-2.0',

	// Content Management
	'wordpress': 'GPL-2.0-or-later',
	'drupal': 'GPL-2.0-or-later',
	'joomla': 'GPL-2.0-or-later',
	'strapi': 'MIT',
	'ghost': 'MIT',
	'contentful': 'proprietary',
	'sanity': 'proprietary',
	'headless-cms': 'N/A',

	// E-commerce
	'magento': 'proprietary',
	'prestashop': 'OSEL-3.0',
	'opencart': 'GPL-3.0-or-later',
	'woocommerce': 'GPL-3.0-or-later',
	'shopify': 'proprietary',
	'medusa': 'MIT',
	'saleor': 'BUSL-1.1',

	// Analytics & Logging
	'matomo': 'GPL-3.0-or-later',
	'posthog': 'MIT',
	'umami': 'MIT',
	'plausible': 'AGPL-3.0',
	'fathom': 'proprietary',
	'mixpanel': 'proprietary',
	'amplitude': 'proprietary',
	'segment': 'proprietary',
	'logstash': 'SSPL-1.0',
	'filebeat': 'SSPL-1.0',
	'fluentd': 'Apache-2.0',
	'logz': 'proprietary',
	'sumo-logic': 'proprietary',

	// Machine Learning & AI
	'tensorflow': 'Apache-2.0',
	'pytorch': 'BSD-3-Clause',
	'scikit-learn': 'BSD-3-Clause',
	'xgboost': 'Apache-2.0',
	'lightgbm': 'MIT',
	'catboost': 'Apache-2.0',
	'huggingface': 'Apache-2.0',
	'spacy': 'MIT',
	'fasttext': 'MIT',
	'gensim': 'LGPL-2.1',
	'mlflow': 'Apache-2.0',
	'ray': 'Apache-2.0',
	'dask': 'BSD-3-Clause',

	// Testing & QA
	'jest': 'MIT',
	'mocha': 'MIT',
	'jasmine': 'MIT',
	'karma': 'MIT',
	'cypress': 'MIT',
	'playwright': 'Apache-2.0',
	'selenium': 'Apache-2.0',
	'junit': 'EPL-1.0',
	'testng': 'Apache-2.0',
	'pytest': 'MIT',
	'unittest': 'PSF',
	'rspec': 'MIT',
	'cucumber': 'MIT',

	// Package Management
	'npm': 'Artistic-2.0',
	'yarn': 'BSD-2-Clause',
	'pnpm': 'MIT',
	'pip': 'MIT',
	'conda': 'BSD-3-Clause',
	'cargo': 'MIT',
	'maven': 'Apache-2.0',
	'gradle': 'Apache-2.0',
	'gem': 'Ruby',
	'composer': 'MIT',
	'nuget': 'Apache-2.0',

	// Standards & Protocols
	'json': 'public-domain',
	'xml': 'public-domain',
	'http': 'N/A',
	'oauth': 'N/A',
	'oauth2': 'N/A',
	'openid-connect': 'N/A',
	'saml': 'N/A',
	'jwt': 'N/A',
	'rest': 'N/A',
	'graphql': 'MIT',
	'grpc': 'Apache-2.0',
	'protobuf': 'Apache-2.0',
	'cors': 'N/A',
	'jsonrpc': 'public-domain',

	// Frontend tooling
	'webpack': 'MIT',
	'vite': 'MIT',
	'parcel': 'MIT',
	'rollup': 'MIT',
	'esbuild': 'MIT',
	'babel': 'MIT',
	'eslint': 'MIT',
	'prettier': 'MIT',
	'stylelint': 'MIT',
	'postcss': 'MIT',
	'sass': 'MIT',
	'less': 'Apache-2.0',
	'tailwind': 'MIT',
	'bootstrap': 'MIT',
	'foundation': 'MIT',
	'materialize': 'MIT',

	// Backend & API
	'fastapi': 'MIT',
	'graphql-core': 'MIT',
	'apollo': 'MIT',
	'rest-framework': 'BSD-2-Clause',
	'json-api': 'MIT',
	'swagger': 'Apache-2.0',
	'openapi': 'Apache-2.0',

	// Cloud Platforms
	'aws': 'proprietary',
	'azure': 'proprietary',
	'gcp': 'proprietary',
	'heroku': 'proprietary',
	'vercel': 'proprietary',
	'netlify': 'proprietary',
	'digitalocean': 'proprietary',
	'linode': 'proprietary',
	'vultr': 'proprietary',
	'openstack': 'Apache-2.0',
	'cloudstack': 'Apache-2.0',

	// Monitoring & Observability
	'datadog': 'proprietary',
	'newrelic': 'proprietary',
	'dynatrace': 'proprietary',
	'appdynamics': 'proprietary',
	'splunk': 'proprietary',
	'sumologic': 'proprietary',
	'elastic': 'SSPL-1.0',
	'logz': 'proprietary',
	'honeycomb': 'proprietary',
	'lightstep': 'proprietary',

	// Miscellaneous
	'git': 'GPL-2.0',
	'github': 'proprietary',
	'gitlab': 'proprietary',
	'bitbucket': 'proprietary',
	'mercurial': 'GPL-2.0',
	'subversion': 'Apache-2.0',
	'gnu-make': 'GPL-3.0-or-later',
	'cmake': 'BSD-3-Clause',
	'bazel': 'Apache-2.0',
	'scons': 'MIT',

	// Mobile Development
	'flutter': 'BSD-3-Clause',
	'react-native': 'MIT',
	'ionic': 'MIT',
	'cordova': 'Apache-2.0',
	'xamarin': 'proprietary',
	'kotlin-multiplatform': 'Apache-2.0',

	// Browser Engines & Standards
	'chromium': 'BSD-3-Clause',
	'webkit': 'LGPL-2.0',
	'gecko': 'MPL-2.0',
	'blink': 'BSD-3-Clause',
	'v8': 'BSD-3-Clause',
	'spidermonkey': 'MPL-2.0',

	// Low Code / No Code
	'appsmith': 'Apache-2.0',
	'budibase': 'AGPL-3.0',
	'nocodb': 'AGPL-3.0',
	'baserow': 'MIT',
	'airtable': 'proprietary',
	'retool': 'proprietary',
	'softr': 'proprietary',

	// Data Management & Analytics
	'ckan': 'AGPL-3.0',
	'dbt': 'AGPL-3.0',
	'airbyte': 'ELv2',
	'fivetran': 'proprietary',
	'talend': 'proprietary',
	'elt': 'N/A',

	// Proxies & Load Balancers
	'envoy': 'Apache-2.0',
	'contour': 'Apache-2.0',
	'linkerd': 'Apache-2.0',
	'nginx': 'BSD-2-Clause',
	'apache-httpd': 'Apache-2.0',
	'caddy': 'Apache-2.0',
	'traefik': 'MIT',
	'haproxy': 'GPL-2.0',

	// Vector Databases
	'chroma': 'Apache-2.0',
	'milvus': 'AGPL-3.0',
	'pinecone': 'proprietary',
	'weaviate': 'BSL-1.1',
	'qdrant': 'AGPL-3.0',
	'vespa': 'AGPL-3.0',
	'opensearch': 'AGPL-3.0',

	// API Management
	'kong': 'Apache-2.0',
	'apigee': 'proprietary',
	'tyk': 'MPL-2.0',
	'gravitee': 'Apache-2.0',
	'mulesoft': 'proprietary',

	// Observability & Tracing
	'jaeger': 'Apache-2.0',
	'zipkin': 'Apache-2.0',
	'otlp': 'Apache-2.0',
	'honeycomb': 'proprietary',
	'lightstep': 'proprietary',
	'datadog': 'proprietary',

	// Service Mesh
	'istio': 'Apache-2.0',
	'linkerd': 'Apache-2.0',
	'consul': 'BUSL-1.1',
	'kuma': 'Apache-2.0',
	'appmesh': 'proprietary',

	// Secrets Management
	'vault': 'BUSL-1.1',
	'sealed-secrets': 'Apache-2.0',
	'external-secrets': 'Apache-2.0',
	'doppler': 'proprietary',
	'1password': 'proprietary',
	'lastpass': 'proprietary',

	// Storage & File Management
	'minio': 'AGPL-3.0',
	's3': 'proprietary',
	'ceph': 'LGPL-2.1',
	'seaweed': 'Apache-2.0',
	'restic': 'BSD-2-Clause',
	'duplicati': 'LGPL-2.0',
	'nextcloud': 'AGPL-3.0',
	'synology': 'proprietary',
	'nas': 'proprietary',

	// Virtualization & Hypervisors
	'kvm': 'GPL-2.0',
	'virtualbox': 'GPL-2.0',
	'xen': 'GPL-2.0',
	'hyper-v': 'proprietary',
	'vmware': 'proprietary',
	'qemu': 'GPL-2.0',

	// IaC & Configuration
	'pulumi': 'Apache-2.0',
	'cloudformation': 'proprietary',
	'arm-templates': 'proprietary',
	'puppet': 'Apache-2.0',
	'chef': 'Apache-2.0',
	'salt': 'Apache-2.0',

	// IDEs & Editors
	'vscode': 'MIT',
	'vim': 'Vim',
	'neovim': 'Vim',
	'emacs': 'GPL-3.0-or-later',
	'sublime': 'proprietary',
	'jetbrains': 'proprietary',
	'intellij': 'proprietary',
	'netbeans': 'Apache-2.0',
	'atom': 'MIT',
	'visual-studio': 'proprietary',

	// Communication Protocols
	'mqtt': 'N/A',
	'amqp': 'N/A',
	'websocket': 'N/A',
	'protobuf': 'Apache-2.0',
	'avro': 'Apache-2.0',
	'msgpack': 'Apache-2.0',
	'thrift': 'Apache-2.0',

	// Standards & Specifications
	'json': 'public-domain',
	'xml': 'public-domain',
	'yaml': 'N/A',
	'csv': 'N/A',
	'html': 'N/A',
	'css': 'N/A',
	'http': 'N/A',
	'https': 'N/A',
	'dns': 'N/A',
	'tls': 'N/A',
	'ssl': 'N/A',
	'dhcp': 'N/A',
	'ipv4': 'N/A',
	'ipv6': 'N/A',
	'bgp': 'N/A',
	'ethernet': 'N/A',
	'bluetooth': 'N/A',
	'wifi': 'N/A',

	// Mobile Platforms
	'android': 'Apache-2.0',
	'ios': 'proprietary',
	'ipados': 'proprietary',
	'macos': 'proprietary',
	'windows': 'proprietary',
	'linux': 'GPL-2.0-or-later',
	'freebsd': 'BSD-2-Clause',

	// Data Formats
	'json-ld': 'public-domain',
	'rdf': 'N/A',
	'owl': 'N/A',
	'sparql': 'N/A',
	'turtle': 'N/A',

	// Encryption & Hashing
	'aes': 'N/A',
	'rsa': 'N/A',
	'ecdsa': 'N/A',
	'sha': 'N/A',
	'md5': 'N/A',
	'blake2': 'CC0-1.0',
	'bcrypt': 'BSD-3-Clause',
	'argon2': 'public-domain',
	'scrypt': 'BSD-2-Clause',

	// Government & Standards Organizations
	'w3c': 'N/A',
	'ietf': 'N/A',
	'oasis': 'N/A',
	'iso': 'proprietary',
	'iec': 'proprietary',
	'ieee': 'proprietary',
	'osi': 'N/A',
	'itu': 'proprietary',
	'nist': 'public-domain',
	'bsi': 'public-domain',
};

function fuzzyMatch(itemName, databaseKey) {
	const normalized = itemName.toLowerCase().replace(/[^a-z0-9]/g, '');
	const dbNormalized = databaseKey.toLowerCase().replace(/[^a-z0-9]/g, '');

	// Only match if the database key has minimum length (avoid single letter matches)
	if (dbNormalized.length < 3) return false;

	// Match if key is contained in normalized name (but not just a single letter)
	return normalized.includes(dbNormalized);
}

function findLicenseFromDatabase(itemName) {
	const lowerName = itemName.toLowerCase();

	// Exact match first
	if (LICENSE_DATABASE[lowerName]) {
		return LICENSE_DATABASE[lowerName];
	}

	// Fuzzy match
	for (const [key, license] of Object.entries(LICENSE_DATABASE)) {
		if (fuzzyMatch(lowerName, key)) {
			return license;
		}
	}

	return null;
}

// Main
let files = readdirSync(ITEMS_DIR).filter(f => f.endsWith('.json'));
let updated = 0;
let skipped = 0;

for (const file of files) {
	const filePath = join(ITEMS_DIR, file);
	const content = readFileSync(filePath, 'utf-8');
	const item = JSON.parse(content);

	// Skip if already has license
	if (item.license) {
		skipped++;
		continue;
	}

	// Skip if not OSS
	if (!item.oss) {
		skipped++;
		continue;
	}

	// Try to find license from database
	const license = findLicenseFromDatabase(item.name);
	if (license && license !== 'proprietary' && license !== 'N/A') {
		item.license = license;
		writeFileSync(filePath, JSON.stringify(item, null, '\t') + '\n', 'utf-8');
		updated++;
		console.log(`✅ ${item.id.padEnd(40)} → ${license}`);
	}
}

console.log(`\n📊 Updated: ${updated}, Skipped: ${skipped}`);
