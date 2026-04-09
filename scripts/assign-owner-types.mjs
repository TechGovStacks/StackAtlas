#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ITEMS_DIR = join(process.cwd(), 'data', 'items');

const DOMAIN_TO_OWNER = new Map([
	['3gpp.org', 'independentConsortium'],
	['a2aprotocol.ai', 'independentConsortium'],
	['agent-network-protocol.com', 'independentConsortium'],
	['ag-ui.com', 'independentConsortium'],
	['bluetooth.com', 'independentConsortium'],
	['ckan.org', 'independentConsortium'],
	['csrc.nist.gov', 'independentConsortium'],
	['datatracker.ietf.org', 'independentConsortium'],
	['ecma-international.org', 'independentConsortium'],
	['envoyproxy.io', 'independentConsortium'],
	['graphql.org', 'independentConsortium'],
	['ics.uci.edu', 'independentConsortium'],
	['ieee802.org', 'independentConsortium'],
	['isocpp.org', 'independentConsortium'],
	['istio.io', 'independentConsortium'],
	['itu.int', 'independentConsortium'],
	['kubernetes.io', 'independentConsortium'],
	['mariadb.org', 'independentConsortium'],
	['messaginglayersecurity.rocks', 'independentConsortium'],
	['mlflow.org', 'independentConsortium'],
	['modelcontextprotocol.io', 'independentConsortium'],
	['mplify.net', 'independentConsortium'],
	['oauth.net', 'independentConsortium'],
	['oix.org', 'independentConsortium'],
	['onnx.ai', 'independentConsortium'],
	['openapis.org', 'independentConsortium'],
	['openarchives.org', 'independentConsortium'],
	['openid.net', 'independentConsortium'],
	['openkruise.io', 'independentConsortium'],
	['postgresql.org', 'independentConsortium'],
	['projectcontour.io', 'independentConsortium'],
	['python.org', 'independentConsortium'],
	['quicwg.org', 'independentConsortium'],
	['r-project.org', 'independentConsortium'],
	['rust-lang.org', 'independentConsortium'],
	['swift.org', 'independentConsortium'],
	['w3.org', 'independentConsortium'],
	['wi-fi.org', 'independentConsortium'],
	['yaml.org', 'independentConsortium'],

	['cassandra.apache.org', 'community'],
	['couchdb.apache.org', 'community'],
	['fluxcd.io', 'community'],
	['go.dev', 'community'],
	['grpc.io', 'community'],
	['hbase.apache.org', 'community'],
	['haystack.deepset.ai', 'community'],
	['jenkins.io', 'community'],
	['joget.org', 'community'],
	['milvus.io', 'community'],
	['n8n.io', 'community'],
	['nodered.org', 'community'],
	['openshift.org', 'community'],
	['portainer.io', 'community'],
	['pytorch.org', 'community'],
	['ragflow.io', 'community'],
	['react.dev', 'community'],
	['robotframework.org', 'community'],
	['selenium.dev', 'community'],
	['spinnaker.io', 'community'],
	['tensorflow.org', 'community'],
	['traefik.io', 'community'],

	['about.gitlab.com', 'corporation'],
	['android.com', 'corporation'],
	['angelml.ai', 'corporation'],
	['angular.dev', 'corporation'],
	['appsmith.com', 'corporation'],
	['apple.com', 'corporation'],
	['axolotl.ai', 'corporation'],
	['budibase.com', 'corporation'],
	['chromium.org', 'corporation'],
	['circleci.com', 'corporation'],
	['developer.hashicorp.com', 'corporation'],
	['docker.com', 'corporation'],
	['flutter.dev', 'corporation'],
	['getambassador.io', 'corporation'],
	['github.com', 'corporation'],
	['huggingface.co', 'corporation'],
	['konghq.com', 'corporation'],
	['langchain.com', 'corporation'],
	['microsoft.github.io', 'corporation'],
	['mongodb.com', 'corporation'],
	['mysql.com', 'corporation'],
	['neo4j.com', 'corporation'],
	['nextjs.org', 'corporation'],
	['nginx.org', 'corporation'],
	['oracle.com', 'corporation'],
	['piveau.de', 'corporation'],
	['pyro.ai', 'corporation'],
	['qdrant.tech', 'corporation'],
	['rancher.com', 'corporation'],
	['scylladb.com', 'corporation'],
	['spacy.io', 'corporation'],
	['trychroma.com', 'corporation'],
	['typescriptlang.org', 'corporation'],
	['webkit.org', 'corporation'],
]);

const ID_OVERRIDES = new Map([
	['blink', 'corporation'],
	['gecko', 'community'],
	['glasfaser', 'independentConsortium'],
	['internal-gateway-protocols-igp', 'independentConsortium'],
	['javascript-ecma-script', 'independentConsortium'],
	['mobilfunk', 'independentConsortium'],
	['open-internet-exchange-point-ixp-oix-1', 'independentConsortium'],
]);

function inferOwnerType(item) {
	if (ID_OVERRIDES.has(item.id)) {
		return ID_OVERRIDES.get(item.id);
	}

	let hostname = '';
	try {
		hostname = new URL(item.homepage).hostname.replace(/^www\./, '');
	} catch {
		hostname = '';
	}

	if (DOMAIN_TO_OWNER.has(hostname)) {
		return DOMAIN_TO_OWNER.get(hostname);
	}

	if (hostname.endsWith('.org')) {
		return 'community';
	}

	return 'corporation';
}

const files = readdirSync(ITEMS_DIR)
	.filter((file) => file.endsWith('.json') && file !== 'README.md')
	.sort();
const ownerCounts = {
	independentConsortium: 0,
	community: 0,
	corporation: 0,
	oneManShow: 0,
};

for (const file of files) {
	const filePath = join(ITEMS_DIR, file);
	const item = JSON.parse(readFileSync(filePath, 'utf8'));
	const ownerType = inferOwnerType(item);
	item.sovereigntyCriteria = {
		...item.sovereigntyCriteria,
		ownerType,
	};
	ownerCounts[ownerType] += 1;
	writeFileSync(filePath, `${JSON.stringify(item, null, '\t')}\n`, 'utf8');
}

console.log(`✅ ownerType assigned for ${files.length} items`);
for (const [ownerType, count] of Object.entries(ownerCounts)) {
	console.log(`   ${ownerType.padEnd(22)} ${count}`);
}
