// GENERATED FILE - DO NOT EDIT MANUALLY
// Generated from: data/layers/ + data/items/ + data/stacks/
// Logo fallback via: src/data/logo-urls.json
// Generated at: 2026-04-16T16:17:15.365Z

import type { Item, Layer, Stack } from '../types';

const ASSET_BASE_URL = (import.meta.env.VITE_ASSET_BASE_URL ?? '').replace(/\/+$/, '');

function withAssetBaseUrl(logo?: string): string | undefined {
	if (!logo || /^https?:\/\//.test(logo)) return logo;
	const normalizedPath = `/${logo.replace(/^\/+/, '')}`;
	return ASSET_BASE_URL ? `${ASSET_BASE_URL}${normalizedPath}` : normalizedPath;
}

export const LAYERS: Layer[] = [
		{
			"id": "infrastructure",
			"order": 1,
			"name": {
				"de": "Infrastruktur",
				"en": "Infrastructure"
			},
			"description": {
				"de": "Grundlegende technische Infrastruktur: Netzwerke, Protokolle, Kryptographie und Sicherheitsstandards.",
				"en": "Fundamental technical infrastructure: networks, protocols, cryptography and security standards."
			},
			"color": "#c5192d"
		},
		{
			"id": "platform",
			"order": 2,
			"name": {
				"de": "Plattform",
				"en": "Platform"
			},
			"description": {
				"de": "Plattformen und Middleware: Cloud-Dienste, Container-Orchestrierung, KI-Frameworks und Integrationsschichten.",
				"en": "Platforms and middleware: cloud services, container orchestration, AI frameworks and integration layers."
			},
			"color": "#1a56a0"
		},
		{
			"id": "building-blocks",
			"order": 3,
			"name": {
				"de": "Bausteine",
				"en": "Building Blocks"
			},
			"description": {
				"de": "Wiederverwendbare Bausteine: APIs, Bibliotheken, SDKs und gemeinsame Dienste für den Betrieb.",
				"en": "Reusable building blocks: APIs, libraries, SDKs and shared operational services."
			},
			"color": "#00883d"
		},
		{
			"id": "applications",
			"order": 4,
			"name": {
				"de": "Anwendungen",
				"en": "Applications"
			},
			"description": {
				"de": "Endnutzer-Anwendungen und Fachverfahren: Portale, E-Government-Services und Verwaltungsanwendungen.",
				"en": "End-user applications and specialist procedures: portals, e-government services and public administration applications."
			},
			"color": "#f39c12"
		},
		{
			"id": "sovereign-standards",
			"order": 5,
			"name": {
				"de": "Souveränitätsstandards",
				"en": "Sovereign Standards"
			},
			"description": {
				"de": "Übergreifende Standards und Prinzipien für digitale Souveränität: Offene Standards, Interoperabilität, Datenschutz und regulatorische Anforderungen.",
				"en": "Cross-cutting standards and principles for digital sovereignty: open standards, interoperability, data protection and regulatory requirements."
			},
			"color": "#e8e8e8"
		}
	];

const RAW_ITEMS: Item[] = [
		{
			"id": "aadhaar",
			"name": "Aadhaar",
			"layer": "applications",
			"sublayer": "sicherheit",
			"description": {
				"de": "Aadhaar ist Indiens biometrisches Identifikationssystem mit über 1,4 Milliarden Registrierungen, betrieben von der UIDAI. Es ermöglicht eKYC-Verfahren in Echtzeit und bildet die Identitätsschicht des India Stack.",
				"en": "Aadhaar is India's biometric identification system with over 1.4 billion enrolments, operated by the UIDAI. It enables real-time eKYC processes and forms the identity layer of the India Stack."
			},
			"homepage": "https://uidai.gov.in/",
			"tags": [
				"egovernment",
				"identity",
				"biometric",
				"india"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": false,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 25
		},
		{
			"id": "activemq-artemis",
			"name": "Apache ActiveMQ Artemis",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Apache ActiveMQ Artemis ist ein hochperformanter, nicht-blockierender Message-Broker. Er wird unter anderem im GovStack Information Mediator und in X-Road-Umgebungen für asynchrone Nachrichtenwarteschlangen zwischen Behörden eingesetzt.",
				"en": "Apache ActiveMQ Artemis is a high-performance, non-blocking message broker. It is used in the GovStack Information Mediator and in X-Road environments for asynchronous message queues between public authorities."
			},
			"homepage": "https://activemq.apache.org/components/artemis/",
			"license": "Apache-2.0",
			"tags": [
				"messaging",
				"queue",
				"broker"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "advanced-encryption-standard",
			"name": "Advanced Encryption Standard",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "AES verschlüsselt Daten symmetrisch. Ver- und Entschlüsselung erfolgt mit dem gleichen Schlüssel.",
				"en": ""
			},
			"homepage": "https://csrc.nist.gov/projects/block-cipher-techniques",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/AES_(Rijndael)_Round_Function.png",
			"tags": [
				"schluessel",
				"symmetrisch",
				"verschluesselung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR02102/BSI-TR-02102.pdf?__blob=publicationFile"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "agent-network-protocol",
			"name": "Agent Network Protocol",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "ANP ermöglicht sichere, dezentralisierte Kommunikation zwischen KI-Agenten über offene Internet-Infrastrukturen. Fungiert als standardisiertes Peer-to-Peer-Protokoll für agentengesteuerte Kollaborationen und etabliert ein \"HTTP für das Agent-Internet-Zeitalter\" durch interoperable Identitätsverwaltung und semantische Datenverknüpfung.",
				"en": ""
			},
			"homepage": "https://agent-network-protocol.com/",
			"tags": [
				"agent",
				"kommunikation",
				"agentische-ki"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/agent-network-protocol"
			},
			"logo": "https://upload.wikimedia.org/wikipedia/commons/7/71/Bluesky%E2%80%93AT_Protocol_federation_architecture.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "agent-to-agent-protocol",
			"name": "Agent-to-Agent Protocol",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "A2A ermöglicht KI-Agenten, die auf unterschiedlichen Frameworks verschiedener Unternehmen basieren und auf separaten Servern laufen, effektiv zu kommunizieren und zusammenzuarbeiten. A2A zielt darauf ab, eine gemeinsame Sprache für Agenten bereitzustellen und so ein stärker vernetztes, leistungsfähigeres und innovativeres KI-Ökosystem zu fördern. A2A integriert ACP (Agent Communication Protocol).",
				"en": ""
			},
			"homepage": "https://a2aprotocol.ai/",
			"tags": [
				"agent",
				"prozess",
				"agentische-ki",
				"automatisierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/i-am-bee/beeai-platform/blob/main/docs/community-and-support/acp-a2a-migration-guide.mdx"
			},
			"logo": "https://upload.wikimedia.org/wikipedia/commons/1/1f/US-Huey-helicopter-spraying-Agent-Orange-in-Vietnam.jpg",
			"sovereigntyScore": 95
		},
		{
			"id": "agent-user-interaction-protocol-ag-ui",
			"name": "Agent-User Interaction Protocol (AG-UI)",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "AG-UI standardisiert Status, Ziel und Interaktion von KI-Agenten und deren Laufzeit gegenüber den Nutzenden.",
				"en": ""
			},
			"homepage": "https://ag-ui.com",
			"tags": [
				"agent",
				"agentische-ki",
				"user-interface"
			],
			"oss": true,
			"maturity": "sandbox",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/ag-ui-protocol/ag-ui"
			},
			"logo": "https://upload.wikimedia.org/wikipedia/en/a/af/WeChat_logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "android",
			"name": "Android",
			"layer": "applications",
			"sublayer": "native-apps",
			"description": {
				"de": "Android ist ein offenes Betriebssystem für die Arbeit auf mobilen Endgeräten.",
				"en": ""
			},
			"homepage": "https://www.android.com/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Android_robot_2023.svg",
			"tags": [
				"mobil",
				"app",
				"betriebssystem"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://source.android.com/docs?hl=de"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "angel-ml",
			"name": "Angel-ML",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "Angel-ML ist eine hochperformante verteilte Machine Learning-Plattform, die auf der Parameter Server-Philosophie basiert und von Tencent entwickelt wurde. Das System ist speziell für Big Data-Szenarien optimiert und bietet eine Full-Stack-Lösung für Feature Engineering, Modelltraining, Parameter-Tuning und Model Serving. Angel unterstützt verschiedene ML-Algorithmen wie statistische Verfahren, neuronale Netze und Graph Computing und ist das erste chinesische Open-Source-Projekt, das von der Linux Foundation AI graduiert wurde.",
				"en": ""
			},
			"homepage": "https://angelml.ai",
			"tags": [
				"machine-learning",
				"verarbeitung",
				"ml"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/Angel-ML/angel/"
			},
			"logo": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Ancistroteuthis_lichtensteini.jpg",
			"sovereigntyScore": 78
		},
		{
			"id": "angular",
			"name": "Angular",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Angular ist ein Webframework, das Entwicklern die Erstellung schneller und zuverlässiger Anwendungen ermöglicht.",
				"en": ""
			},
			"homepage": "https://angular.dev/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Angular_full_color_logo.svg",
			"tags": [
				"webframework",
				"user-interface"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://angular.dev/overview"
			},
			"sovereigntyScore": 83
		},
		{
			"id": "ansible",
			"name": "Ansible",
			"layer": "platform",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Ansible ist ein Open-Source-Werkzeug für Konfigurationsmanagement, Provisioning und Anwendungs-Deployment. Es nutzt deklarative YAML-Playbooks und benötigt keine Agenten auf den Zielsystemen.",
				"en": "Ansible is an open-source tool for configuration management, provisioning and application deployment. It uses declarative YAML playbooks and requires no agents on the target systems."
			},
			"homepage": "https://www.ansible.com/",
			"license": "GPL-3.0-or-later",
			"tags": [
				"automation",
				"configuration",
				"iac"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 83
		},
		{
			"id": "apache-airflow",
			"name": "Apache Airflow",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Apache Airflow ist eine Open-Source-Plattform zur Orchestrierung von Datenpipelines. Workflows werden als Python-Code definiert und ermöglichen Extraktion, Transformation und Laden zwischen heterogenen Verwaltungs-Systemen.",
				"en": "Apache Airflow is an open-source platform for orchestrating data pipelines. Workflows are defined as Python code and enable extraction, transformation and loading between heterogeneous public-administration systems."
			},
			"homepage": "https://airflow.apache.org/",
			"license": "Apache-2.0",
			"tags": [
				"etl",
				"pipelines",
				"data"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "apache-kafka",
			"name": "Apache Kafka",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Apache Kafka ist eine verteilte Event-Streaming-Plattform für hochskalierbare, asynchrone Nachrichtenverarbeitung. Sie wird in vielen GovTech-Stacks für Echtzeit-Datenverteilung, Microservice-Integration und Event-Driven-Architekturen eingesetzt.",
				"en": "Apache Kafka is a distributed event-streaming platform for highly scalable, asynchronous message processing. It is used in many GovTech stacks for real-time data distribution, microservice integration and event-driven architectures."
			},
			"homepage": "https://kafka.apache.org/",
			"license": "Apache-2.0",
			"tags": [
				"streaming",
				"events",
				"messaging"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "appsmith",
			"name": "Appsmith",
			"layer": "platform",
			"sublayer": "lowcode",
			"description": {
				"de": "Appsmith will die Erstellung individueller Admin-Panels und interner Apps mit vorgefertigten Widgets und Datenquellenanbindung beschleunigen.",
				"en": ""
			},
			"homepage": "https://www.appsmith.com/",
			"logo": "https://raw.githubusercontent.com/appsmithorg/appsmith/release/app/client/public/static/media/appsmith_logo.svg",
			"tags": [
				"rest-graphql",
				"open-source",
				"drag-drop",
				"javascript"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": false,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/appsmithorg/appsmith"
			},
			"sovereigntyScore": 63
		},
		{
			"id": "axolotl",
			"name": "Axolotl",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "Axolotl ist ein Framework zum Feintuning von großen Sprachmodellen. Dafür können optimierte Workflows genutzt werden.",
				"en": ""
			},
			"homepage": "https://axolotl.ai/",
			"tags": [
				"verarbeitung",
				"training",
				"feintuning"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.axolotl.ai/"
			},
			"logo": "https://upload.wikimedia.org/wikipedia/commons/0/00/Axolotl_ganz.jpg",
			"sovereigntyScore": 78
		},
		{
			"id": "blink",
			"name": "Blink",
			"layer": "applications",
			"sublayer": "browser",
			"description": {
				"de": "Blink ist eine Browser-Engine zum Rendern von Webseiten. Es wird insbesondere von Google für Chrome, Microsoft für Edge und Opera genutzt.",
				"en": ""
			},
			"homepage": "https://www.chromium.org/blink/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Blink_(browser_engine)_colored_logo.svg",
			"tags": [
				"webseite",
				"browser-engine",
				"rendern"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://developer.chrome.com/docs/web-platform/blink?hl=de"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "bluetooth",
			"name": "Bluetooth",
			"layer": "infrastructure",
			"sublayer": "anschluss",
			"description": {
				"de": "Bluetooth ermöglicht eine Ad-hoc oder Punkt-zu-Punkt Funk-Verbindung. Die Verbindung von zwei Geräten erfolgt über die Aktivierung zwischen den Geräte (Koppeln/ Pairing). Bluetooth bietet in der Variante LE ergänzende Funktionen zu Broadcast, Mesh und Geräteposition.",
				"en": ""
			},
			"homepage": "https://www.bluetooth.com/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Bluetooth.svg",
			"tags": [
				"kurze-distanz",
				"pairing",
				"koppeln",
				"drahtlos",
				"funk",
				"wpan"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.bluetooth.com/specifications/specs/"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "border-gateway-protocol-bgp",
			"name": "Border Gateway Protocol (BGP)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "BGP ist ein entscheidendes Routing-Protokoll im Internet, das Netzwerke miteinander verbindet und dafür sorgt, dass Datenpakete ihren optimalen Weg durch verschiedene autonome Systeme finden. BGP ermöglicht es Internetdienstleistern (ISPs) und größeren Netzwerken, Routeninformationen effizient auszutauschen, um die Datenübertragung zu optimieren. Es spielt eine Schlüsselrolle bei der Aufrechterhaltung der Stabilität und Skalierbarkeit der globalen Internetinfrastruktur",
				"en": ""
			},
			"homepage": "https://github.com/bgp",
			"tags": [
				"netzwerk",
				"isp",
				"routing"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://fgithub.com/bgp/bgpq4"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 88
		},
		{
			"id": "budibase",
			"name": "Budibase",
			"layer": "platform",
			"sublayer": "lowcode",
			"description": {
				"de": "Budibase ermöglicht das schnelle Erstellen interner Business-Apps, mit vorgefertigten Komponenten und breiter Datenquellenunterstützung.",
				"en": ""
			},
			"homepage": "https://budibase.com/",
			"logo": "https://raw.githubusercontent.com/Budibase/budibase/master/packages/builder/public/logo.svg",
			"tags": [
				"automations",
				"open-source",
				"datenquellen",
				"low-code"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": false,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.budibase.com/docs/what-is-budibase"
			},
			"sovereigntyScore": 63
		},
		{
			"id": "bundid",
			"name": "BundID",
			"layer": "applications",
			"sublayer": "sicherheit",
			"description": {
				"de": "Die BundID ist das zentrale Bürgerkonto des Bundes für digitale Verwaltungsleistungen. Sie unterstützt eIDAS-konforme Vertrauensniveaus und integriert sich via SAML oder OpenID Connect in Webdienste, sodass Formulare automatisch vorausgefüllt werden können.",
				"en": "BundID is Germany's federal citizen account for digital administrative services. It supports eIDAS-compliant assurance levels and integrates with web services via SAML or OpenID Connect so that forms can be pre-filled automatically."
			},
			"homepage": "https://id.bund.de/",
			"tags": [
				"egovernment",
				"identity",
				"eidas",
				"germany"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 55
		},
		{
			"id": "c",
			"name": "C++",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "C++ ist eine objektorientierte Programmiersprache für die Entwicklung von Systemsoftware.",
				"en": ""
			},
			"homepage": "https://isocpp.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/ISO_C%2B%2B_Logo.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://isocpp.org/std/standing-documents"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "camunda",
			"name": "Camunda",
			"layer": "building-blocks",
			"sublayer": "lowcode",
			"description": {
				"de": "Camunda ist eine Open-Source-Plattform für die Automatisierung von Geschäftsprozessen. Sie führt BPMN-Workflows und DMN-Entscheidungstabellen aus und ist ein bewährtes Werkzeug für die Modellierung und Ausführung komplexer Behördenprozesse.",
				"en": "Camunda is an open-source platform for business process automation. It executes BPMN workflows and DMN decision tables and is an established tool for modelling and running complex public-administration processes."
			},
			"homepage": "https://camunda.com/",
			"license": "Apache-2.0",
			"tags": [
				"bpmn",
				"workflow",
				"automation"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 93
		},
		{
			"id": "cassandra",
			"name": "Cassandra",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Cassandra ist eine spaltenbasierte NoSQL-Datenbank.",
				"en": ""
			},
			"homepage": "https://cassandra.apache.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Cassandra_logo.svg",
			"tags": [
				"nosql",
				"datenbank",
				"spalten"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://cassandra.apache.org/doc/latest/"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "chroma",
			"name": "Chroma",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Chroma ist eine Vektor-Datenbank.",
				"en": ""
			},
			"homepage": "https://www.trychroma.com/",
			"logo": "https://raw.githubusercontent.com/chroma-core/chroma/main/docs/assets/chroma.svg",
			"tags": [
				"datenbank",
				"vektor"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.trychroma.com/docs/overview/introduction"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "circleci",
			"name": "circleCI",
			"layer": "building-blocks",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "CircleCI ist eine CI/CD-Plattform zur Automatisierung des Softwareentwicklungsprozesses. Für mobile Entwickler bietet CircleCI robuste Umgebungen zum Erstellen, Testen und Bereitstellen von iOS- und Android-Apps.",
				"en": ""
			},
			"homepage": "https://circleci.com/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/CircleCI_Logo.svg",
			"tags": [
				"pipeline",
				"cd",
				"bereitstellung",
				"ci"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": false,
				"openStandards": false,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://circleci.com/docs/"
			},
			"sovereigntyScore": 28
		},
		{
			"id": "comma-separated-values-csv",
			"name": "Comma-Separated Values (CSV)",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "CSV ist ein Datenformat für den Datenaustausch.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc7111",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Text-csv-icon.svg",
			"tags": [
				"datenformat"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc4180"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "comprehensive-knowledge-archive-network-ckan",
			"name": "Comprehensive Knowledge Archive Network (CKAN)",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "CKAN ist ein Werkzeug für Open Data Portale zur Katalogisierung, Veröffentlichung, Suche und Bereitstellung von Daten.",
				"en": ""
			},
			"homepage": "https://ckan.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Ckan-logo-full.svg",
			"tags": [
				"veroeffentlichung",
				"datenkatalog",
				"open-data",
				"suche",
				"bereitstellung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/ckan/ckan"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "contour",
			"name": "Contour",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Contour ist ein Open-Source Ingress Controller für Kubernetes, der den Envoy Proxy und Lastenausgleich nutzt. Er fungiert als Steuerungsebene (Control Plane) für Envoy und ermöglicht dynamische Konfigurationsaktualisierungen sowie die Delegation von Ingress-Funktionen. Contour ist leichtgewichtig und bietet Funktionen wie TLS-Terminierung, HTTP zu HTTPS-Weiterleitung und verschiedene Lastausgleichsoptionen.",
				"en": ""
			},
			"homepage": "https://projectcontour.io/",
			"logo": "https://projectcontour.io/img/contour.svg",
			"tags": [
				"controller",
				"orchestrierung",
				"ingress"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/projectcontour/contour"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "couchdb",
			"name": "CouchDB",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "CouchDB ist eine dokumentenorientierte NoSQL-Datenbank.",
				"en": ""
			},
			"homepage": "https://couchdb.apache.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/CouchDB_logo.svg",
			"tags": [
				"nosql",
				"datenbank",
				"dokumentenbasiert"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.couchdb.org/en/stable/"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "css",
			"name": "CSS",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Cascading Style Sheets (CSS) ist eine Kernsprache der offenen Webplattform und wird zum Hinzufügen von Stilen (z. B. Schriftarten, Farben, Abstände) zu Webdokumenten verwendet.",
				"en": ""
			},
			"homepage": "https://www.w3.org/Style/CSS/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/CSS3_logo_and_wordmark.svg",
			"tags": [
				"stil",
				"user-interface"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.w3.org/Style/CSS/"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "data-catalog-vocabulary-dcat",
			"name": "Data Catalog Vocabulary (DCAT)",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "DCAT dient der Beschreibung von Daten in Datenkatalogen.",
				"en": ""
			},
			"homepage": "https://www.w3.org/TR/vocab-dcat-3/",
			"tags": [
				"datenkatalog",
				"open-data"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/SEMICeu/DCAT-AP"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 85
		},
		{
			"id": "digilocker",
			"name": "DigiLocker",
			"layer": "applications",
			"sublayer": "daten",
			"description": {
				"de": "DigiLocker ist Indiens nationale Plattform für sichere Dokumentenspeicherung und papierlose Verwaltung. Sie wird vom Ministerium für Elektronik und IT (MeitY) betrieben und bildet zusammen mit eSign die Daten-Schicht des India Stack.",
				"en": "DigiLocker is India's national platform for secure document storage and paperless administration. It is operated by the Ministry of Electronics and Information Technology (MeitY) and, together with eSign, forms the data layer of the India Stack."
			},
			"homepage": "https://www.digilocker.gov.in/",
			"tags": [
				"egovernment",
				"documents",
				"india"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 40
		},
		{
			"id": "django",
			"name": "Django",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Django ist ein hochgradig produktives Python-Webframework. Es wird oft für Datenanalyse-Anwendungen und sichere Verwaltungsportale eingesetzt und stellt ORM, Auth und Admin-Backend out-of-the-box bereit.",
				"en": "Django is a highly productive Python web framework. It is frequently used for data-analysis applications and secure administrative portals and provides ORM, authentication and an admin backend out of the box."
			},
			"homepage": "https://www.djangoproject.com/",
			"license": "BSD-3-Clause",
			"tags": [
				"python",
				"framework",
				"web"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "docker-swarm",
			"name": "Docker Swarm",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Docker Swarm ist ein in die Docker-Engine integriertes Orchestrierungswerkzeug mit dem mehrere Docker-Hosts gebündelt werden können. Derart kann ein Cluster definiert werden. Es automatisiert das Deployment, die Skalierung und die Verwaltung von Containern und bietet eine einfache Benutzeroberfläche und integrierte Funktionen wie Service Discovery, Lastenausgleich und hohe Verfügbarkeit.",
				"en": ""
			},
			"homepage": "https://www.docker.com/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Docker_(container_engine)_logo.svg",
			"tags": [
				"orchestrierung",
				"container"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.docker.com/engine/swarm/"
			},
			"sovereigntyScore": 83
		},
		{
			"id": "domain-name-system-dns",
			"name": "Domain Name System (DNS)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "Das DNS ist ein hierarchisches, dezentrales Namensauflösungssystem, das menschenlesbare Domainnamen in IP-Adressen übersetzt. DNS ist fundamental für das Funktionieren des modernen Internets und ermöglicht die Navigation zwischen verschiedenen Online-Diensten.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/dns/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/DNS_Architecture.svg",
			"tags": [
				"adresse",
				"netzwerk"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://tools.ietf.org/html/rfc7858"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "drupal",
			"name": "Drupal",
			"layer": "applications",
			"sublayer": "lowcode",
			"description": {
				"de": "Drupal ist ein quelloffenes Content-Management-System mit hohen Sicherheits- und Barrierefreiheitsanforderungen. Es ist die bevorzugte Wahl für große, komplexe Behördenportale weltweit.",
				"en": "Drupal is an open-source content-management system with strong security and accessibility requirements. It is the preferred choice for large, complex government portals worldwide."
			},
			"homepage": "https://www.drupal.org/",
			"license": "GPL-2.0-or-later",
			"tags": [
				"cms",
				"egovernment",
				"accessibility"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "dynamic-host-configuration-protocol-dhcp",
			"name": "Dynamic Host Configuration Protocol (DHCP)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "DHCP ermöglicht automatische Netzwerkkonfiguration durch dynamische Zuweisung von IP-Adressen und Netzwerkparametern an verbundene Geräte. Fungiert als zentraler Service für Plug-and-Play-Netzwerkkonnektivität und reduziert manuellen Administrationsaufwand in lokalen und Unternehmensnetzwerken.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/dhc/about/",
			"tags": [
				"adresse",
				"netzwerk"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc8415"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "elasticsearch",
			"name": "Elasticsearch",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Elasticsearch ist eine verteilte Such- und Analyse-Engine, die im Zentrum des ELK-Stacks (Elasticsearch, Logstash, Kibana) steht. Sie wird in Verwaltungs-IT für Volltextsuche, Log-Aggregation und SIEM-Anwendungen verwendet.",
				"en": "Elasticsearch is a distributed search and analytics engine at the heart of the ELK stack (Elasticsearch, Logstash, Kibana). It is used in public administration IT for full-text search, log aggregation and SIEM use cases."
			},
			"homepage": "https://www.elastic.co/elasticsearch/",
			"license": "SSPL-1.0",
			"tags": [
				"search",
				"logging",
				"analytics"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 58
		},
		{
			"id": "elliptic-curve-integrated-encryption-scheme",
			"name": "Elliptic Curve Integrated Encryption Scheme",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "ECIES ist ein hybrides Verschlüsselungsverfahren unter Kombination von Diffie-Hellman und elliptischen Kurven.",
				"en": ""
			},
			"homepage": "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR02102/BSI-TR-02102.pdf?__blob=publicationFile",
			"tags": [
				"schluessel",
				"hybrid",
				"verschluesselung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 73
		},
		{
			"id": "emissary-ingress",
			"name": "Emissary Ingress",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Ingress ist ein Open-Source-API-Gateway und Kubernetes-Ingress-Controller, der auf Envoy Proxy basiert und als zentraler Einstiegspunkt für den Datenverkehr zu Diensten in einem Kubernetes-Cluster fungiert. Er ermöglicht Entwicklern, den Datenverkehr zu ihren Anwendungen selbstständig über Kubernetes Custom Resource Definitions (CRDs) zu verwalten und bietet Funktionen wie Traffic-Management, Authentifizierung, Autorisierung, Rate Limiting und Observability.",
				"en": ""
			},
			"homepage": "https://www.getambassador.io/products/api-gateway",
			"logo": "https://www.getambassador.io/images/emissary-icon-black.svg",
			"tags": [
				"api",
				"orchestrierung",
				"gateway"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/emissary-ingress/emissary"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "envoy-proxy",
			"name": "Envoy Proxy",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Envoy Proxy ist ein Open-Source-Proxy für Microservices. Ursprünglich von Lyft entwickelt und jetzt ein Projekt der Cloud Native Computing Foundation (CNCF) dient Envoy als Edge-Proxy an der Netzwerkschnittstelle oder als Sidecar-Proxy für Anwendungen. Er bietet Funktionen wie Lastausgleich, Service-Discovery, dynamische Konfiguration, Resilienz (z. B. Timeouts, Wiederholungsversuche) und Beobachtbarkeit (Metriken).",
				"en": ""
			},
			"homepage": "https://www.envoyproxy.io/",
			"logo": "https://www.envoyproxy.io/img/envoy-logo.svg",
			"tags": [
				"proxy",
				"orchestrierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/envoyproxy/envoy"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "ethernet",
			"name": "Ethernet",
			"layer": "infrastructure",
			"sublayer": "anschluss",
			"description": {
				"de": "Mit Ethernet können kabelgebunden in kleiner bis mittlerer Reichweite Endgeräte vernetzt werden. Die IEEE standardisiert die Technologie mit IEEE 802.3 ff. Die Konfiguration erfolgt zumeist automatisch über das Betriebssystem. Wi-Fi dient als Kennzeichen für zertifizierte Produkte zur Sicherstellung von Interoperabilität.",
				"en": ""
			},
			"homepage": "https://www.ieee802.org/3/",
			"tags": [
				"paket",
				"kabelgebunden",
				"rj",
				"lan",
				"frame"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://ieeexplore.ieee.org/browse/standards/get-program/page/series?id=68"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "eudi-wallet",
			"name": "EUDI Wallet",
			"layer": "sovereign-standards",
			"sublayer": "sicherheit",
			"description": {
				"de": "Das European Digital Identity Wallet (EUDI) ist ein EU-weit harmonisiertes digitales Brieftaschen-Konzept. Das zugehörige Architecture and Reference Framework (ARF) definiert Spezifikationen, Protokolle und Standards für den Informationsaustausch zwischen Ausstellern, Wallets und Service-Providern.",
				"en": "The European Digital Identity Wallet (EUDI) is an EU-wide harmonised digital wallet concept. Its Architecture and Reference Framework (ARF) defines the specifications, protocols and standards for information exchange between issuers, wallets and service providers."
			},
			"homepage": "https://github.com/eu-digital-identity-wallet",
			"tags": [
				"identity",
				"wallet",
				"eidas",
				"eu"
			],
			"oss": true,
			"maturity": "incubation",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": false,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "extensible-markup-language-xml",
			"name": "Extensible Markup Language (XML)",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "XML ist ein Datenformat für den Datenaustausch.",
				"en": ""
			},
			"homepage": "https://www.w3.org/XML/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/XML_Logo.svg",
			"tags": [
				"datenformat"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.w3.org/TR/xml11/"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "fido2-webauthn",
			"name": "FIDO2 / WebAuthn",
			"layer": "sovereign-standards",
			"sublayer": "sicherheit",
			"description": {
				"de": "FIDO2 und WebAuthn sind offene Standards für passwortlose und Hardware-Token-basierte Authentifizierung. Sie ermöglichen sichere Anmeldungen via Smartphones, Sicherheitsschlüsseln und biometrischen Sensoren und sind eine Grundlage für moderne, phishing-resistente Identitätssysteme.",
				"en": "FIDO2 and WebAuthn are open standards for passwordless and hardware-token authentication. They enable secure sign-in via smartphones, security keys and biometric sensors and form a foundation for modern, phishing-resistant identity systems."
			},
			"homepage": "https://fidoalliance.org/fido2/",
			"tags": [
				"authentication",
				"passwordless",
				"security"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "file-transfer-protocol-uber-tls-ftps",
			"name": "File Transfer Protocol über TLS (FTPS)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "FTPS dient der über TLS gesicherten Übertragung von Dateien. Es wurde entwickelt, um Dateien zuverlässig zu übertragen, Verzeichnisse zu verwalten (z.B. anlegen, löschen, navigieren) und den Zugriff auf entfernte Dateisysteme zu ermöglichen.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc4217",
			"tags": [
				"datei",
				"datenuebertragung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.cerberusftp.com/blog/eight-essential-tips-for-securing-an-ftp-or-sftp-server"
			},
			"logo": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Internet_map_1024_-_transparent%2C_inverted.png",
			"sovereigntyScore": 95
		},
		{
			"id": "fit-connect",
			"name": "FIT-Connect",
			"layer": "building-blocks",
			"sublayer": "integration",
			"description": {
				"de": "FIT-Connect ist der digitale Postbote des deutschen OZG-Ökosystems. Über eine Submission-API werden Anträge sicher, maschinenlesbar und Ende-zu-Ende-verschlüsselt zwischen Online-Antragsdiensten und den Backend-Systemen der Fachbehörden zugestellt; ein Event-Log gewährleistet die lückenlose Nachverfolgung der Übermittlung.",
				"en": "FIT-Connect is the digital postal service of Germany's OZG ecosystem. A Submission API delivers applications securely, machine-readably and end-to-end encrypted between online services and the back-office systems of public authorities; an event log provides full traceability."
			},
			"homepage": "https://docs.fitko.de/fit-connect/",
			"tags": [
				"egovernment",
				"integration",
				"germany",
				"ozg"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 100
		},
		{
			"id": "flutter",
			"name": "Flutter",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Flutter ist ein Open-Source-UI-Toolkit zum Erstellen nativ kompilierter Anwendungen für Mobil-, Web-, Desktop- und eingebettete Geräte aus einer einzigen Codebasis.",
				"en": ""
			},
			"homepage": "https://flutter.dev/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Google_Flutter_Logo.svg",
			"tags": [
				"user-interface"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.flutter.dev/"
			},
			"sovereigntyScore": 73
		},
		{
			"id": "flux",
			"name": "flux",
			"layer": "building-blocks",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Flux ist ein Werkzeug zur Synchronisation von Ressourcen (u.a. Git Repo) und einem Kubernetes Clusters.",
				"en": ""
			},
			"homepage": "https://fluxcd.io/",
			"logo": "https://fluxcd.io/img/logos/flux-icon@2x.png",
			"tags": [
				"pipeline",
				"cd",
				"bereitstellung",
				"ci"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://fluxcd.io/flux/"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "gecko",
			"name": "Gecko",
			"layer": "applications",
			"sublayer": "browser",
			"description": {
				"de": "Gecko ist eine Browser-Engine zum Rendern von Webseiten. Es wird insbesondere von Mozilla für Firefox genutzt.",
				"en": ""
			},
			"homepage": "https://firefox-source-docs.mozilla.org/overview/gecko.html",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Firefox_logo,_2019.svg",
			"tags": [
				"webseite",
				"browser-engine",
				"rendern"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/mozilla"
			},
			"sovereigntyScore": 82
		},
		{
			"id": "general-purpose-remote-procedure-calls",
			"name": "general-purpose Remote Procedure Calls",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "gRPC ist ein leistungsstarkes, quelloffenes Framework, das effiziente Kommunikation zwischen verteilten Diensten ermöglicht. Es nutzt HTTP/2 und Protocol Buffers für schnelle, typsichere Datenübertragung und bietet Funktionen wie bidirektionales Streaming und Authentifizierung. Damit vereinfacht gRPC die Entwicklung von skalierbaren Microservices-Architekturen und verbessert im Vergleich zu REST die Leistung deutlich.",
				"en": ""
			},
			"homepage": "https://grpc.io/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/GRPC_logo.svg",
			"tags": [
				"rpc",
				"api",
				"schnittstelle"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://grpc.io/docs/"
			},
			"sovereigntyScore": 82
		},
		{
			"id": "github-actions",
			"name": "GitHub Actions",
			"layer": "building-blocks",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "GitHub Actions können Entwicklungsprozesse automatisieren und anpassen (CI/CD).",
				"en": ""
			},
			"homepage": "https://github.com/actions",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/GitHub_Actions_Logo.svg",
			"tags": [
				"pipeline",
				"cd",
				"bereitstellung",
				"ci"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": false,
				"openStandards": false,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.github.com/en/actions"
			},
			"sovereigntyScore": 38
		},
		{
			"id": "gitlab",
			"name": "GitLab",
			"layer": "building-blocks",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "GitLab ist eine Plattform für den gesamten DevSecOps-Lebenszyklus. GitLab bietet Funktionen für Versionskontrolle (basierend auf Git), Projektplanung, Continuous Integration/Continuous Deployment (CI/CD), Code-Überprüfung, Sicherheitsscans und Fehlerverfolgung in einer einzigen Umgebung.",
				"en": ""
			},
			"homepage": "https://about.gitlab.com/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/GitLab_logo.svg",
			"tags": [
				"pipeline",
				"cd",
				"bereitstellung",
				"ci"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/gitlabhq/gitlabhq"
			},
			"sovereigntyScore": 83
		},
		{
			"id": "glasfaser",
			"name": "Glasfaser",
			"layer": "infrastructure",
			"sublayer": "anschluss",
			"description": {
				"de": "Mit Glasfaser können Daten durch dünne Fasern in Lichtgeschwindigkeit übertragen werden. Im Kern werden Glasfaser für die Backbones genutzt aber zunehmend bis zum Endanschluss ausgebaut.",
				"en": ""
			},
			"homepage": "https://www.itu.int/",
			"tags": [
				"gigabit",
				"kabel"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.itu.int/itu-t/recommendations/index.aspx?ser=G"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 100
		},
		{
			"id": "go",
			"name": "Go",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Go ist eine Programmiersprache für Cloud- und Netzwerkanwendungen.",
				"en": ""
			},
			"homepage": "https://go.dev/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Go_Logo_Blue.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://go.dev/ref/spec"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "gov-uk-notify",
			"name": "GOV.UK Notify",
			"layer": "applications",
			"sublayer": "integration",
			"description": {
				"de": "GOV.UK Notify ist ein hochskalierbarer Benachrichtigungsdienst des britischen Government Digital Service. Er versendet E-Mails, SMS und Briefe für Behördenleistungen und reduziert telefonische Statusabfragen erheblich.",
				"en": "GOV.UK Notify is a highly scalable notification service from the UK's Government Digital Service. It sends emails, SMS messages and letters for public services and significantly reduces phone-based status enquiries."
			},
			"homepage": "https://www.notifications.service.gov.uk/",
			"license": "MIT",
			"tags": [
				"egovernment",
				"notification",
				"uk"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "gov-uk-one-login",
			"name": "GOV.UK One Login",
			"layer": "applications",
			"sublayer": "sicherheit",
			"description": {
				"de": "GOV.UK One Login ist das zentrale britische Identitätssystem. Es löst die fragmentierte Landschaft lokaler Behördenkonten ab und stellt digitale Berechtigungsnachweise für Bürgerinnen und Bürger bereit.",
				"en": "GOV.UK One Login is the UK's centralised identity system. It replaces the fragmented landscape of local agency accounts and provides digital credentials for citizens."
			},
			"homepage": "https://www.sign-in.service.gov.uk/",
			"license": "MIT",
			"tags": [
				"egovernment",
				"identity",
				"uk",
				"sso"
			],
			"oss": true,
			"maturity": "incubation",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": false,
				"selfHostable": false,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 70
		},
		{
			"id": "gov-uk-pay",
			"name": "GOV.UK Pay",
			"layer": "applications",
			"sublayer": "integration",
			"description": {
				"de": "GOV.UK Pay ist das standardisierte Zahlungs-Gateway des britischen Government Digital Service. Es wird regierungsweit für die Abwicklung von Gebühren und finanziellen Transaktionen eingesetzt.",
				"en": "GOV.UK Pay is the standardised payment gateway from the UK's Government Digital Service. It is used across government to process fees and financial transactions."
			},
			"homepage": "https://www.payments.service.gov.uk/",
			"license": "MIT",
			"tags": [
				"egovernment",
				"payments",
				"uk"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "govstack-information-mediator",
			"name": "GovStack Information Mediator",
			"layer": "building-blocks",
			"sublayer": "integration",
			"description": {
				"de": "Der Information Mediator ist der zentrale Building Block der GovStack-Initiative für sicheren, asynchronen Datenaustausch zwischen Behörden. Er kombiniert einen X-Road Security Server mit ActiveMQ Artemis und stellt API-Gateway-, Routing- und Event-Mesh-Funktionen bereit.",
				"en": "The Information Mediator is the GovStack initiative's central building block for secure asynchronous data exchange between public authorities. It combines an X-Road Security Server with ActiveMQ Artemis and provides API gateway, routing and event-mesh capabilities."
			},
			"homepage": "https://govstack.gitbook.io/bb-information-mediator",
			"tags": [
				"egovernment",
				"integration",
				"govstack",
				"interoperability"
			],
			"oss": true,
			"maturity": "incubation",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": false,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "grafana",
			"name": "Grafana",
			"layer": "platform",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Grafana ist eine quelloffene Plattform für Visualisierung und Dashboards. In Kombination mit Prometheus und vielen weiteren Datenquellen stellt sie Metriken, Logs und Traces für Betriebssicherheit und Observability bereit.",
				"en": "Grafana is an open-source platform for visualisation and dashboards. Combined with Prometheus and many other data sources it presents metrics, logs and traces for operational reliability and observability."
			},
			"homepage": "https://grafana.com/oss/grafana/",
			"license": "AGPL-3.0",
			"tags": [
				"monitoring",
				"dashboards",
				"observability"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 78
		},
		{
			"id": "graphql",
			"name": "GraphQL",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Ein Abfragesprache und Laufzeitumgebung, die es Clients ermöglicht, genau die Daten abzufragen, die sie benötigen. Sie bietet eine effiziente und flexible Alternative zu traditionellen APIs, indem sie es Clients ermöglicht, nur die exakt benötigten Daten mit einem einzigen Aufruf abzurufen. Ein zentrales Element ist das GraphQL-Schema, das die Datenstrukturen definiert, und der Client sendet eine Abfrage (Query), die durch das Schema validiert und von einem Resolver auf dem Server ausgeführt wird.",
				"en": ""
			},
			"homepage": "https://graphql.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/GraphQL_Logo.svg",
			"tags": [
				"abfrage",
				"daten",
				"schnittstelle"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://spec.graphql.org/"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "haystack",
			"name": "Haystack",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "Haystack ist Framework für die Entwicklung von KI-Anwendungen. Das Framework ermöglicht es Entwicklern, produktionsreife Systeme für Aufgaben wie Retrieval-Augmented Generation (RAG), Dokumentensuche und Frage-Antwort-Systeme zu erstellen.",
				"en": ""
			},
			"homepage": "https://haystack.deepset.ai/",
			"logo": "https://raw.githubusercontent.com/deepset-ai/haystack/main/docs/img/haystack_icon_colored.png",
			"tags": [
				"orchestrierung",
				"rag",
				"verarbeitung",
				"pipeline"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.haystack.deepset.ai/docs/intro"
			},
			"sovereigntyScore": 82
		},
		{
			"id": "hbase",
			"name": "HBase",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "HBase ist eine spaltenorientierte NoSQL Datenbank. HBase ist Teil des Apache Hadoop-Ökosystems und basiert auf dem Bigtable-Modell.",
				"en": ""
			},
			"homepage": "https://hbase.apache.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/HBase_logo.svg",
			"tags": [
				"nosql",
				"datenbank",
				"spalten"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://hbase.apache.org/book.html"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "helm",
			"name": "Helm",
			"layer": "platform",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Helm ist der De-facto-Paketmanager für Kubernetes. Mit Helm-Charts werden komplexe Kubernetes-Anwendungen versioniert, geteilt und reproduzierbar deployt.",
				"en": "Helm is the de-facto package manager for Kubernetes. Helm charts version, share and reproducibly deploy complex Kubernetes applications."
			},
			"homepage": "https://helm.sh/",
			"license": "Apache-2.0",
			"tags": [
				"kubernetes",
				"package-manager",
				"deployment"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "huggingface-transformers",
			"name": "HuggingFace Transformers",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "HuggingFace Transformers ist eine Open-Source-Bibliothek für state-of-the-art Machine Learning Modelle in Text-, Vision-, Audio- und multimodalen Anwendungen. Die Bibliothek fungiert als zentrales Model-Definition-Framework, das nahtlose Kompatibilität zwischen verschiedenen Deep Learning Frameworks wie PyTorch, TensorFlow und JAX bietet. Transformers demokratisiert den Zugang zu über 1 Million vortrainierten Modellen auf dem Hugging Face Hub und ermöglicht sowohl Inferenz als auch Training mit einer einheitlichen API.",
				"en": ""
			},
			"homepage": "https://huggingface.co/docs/transformers/index",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/HuggingFace_logo.svg",
			"tags": [
				"deep-learning",
				"dl",
				"transformer",
				"verarbeitung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/huggingface/transformers"
			},
			"sovereigntyScore": 73
		},
		{
			"id": "hypertext-transfer-protocol-http",
			"name": "Hypertext Transfer Protocol (HTTP)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "HTTP wird verwendet um Ressoucen wie Webseiten, APIs, Formulare, Bilder oder Videos abzurufen und zu senden.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/httpbis/documents/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/HTTP_logo.svg",
			"tags": [
				"multiplexing",
				"datenuebertragung",
				"webseiten",
				"internet"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc9114"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "internal-gateway-protocols-igp",
			"name": "Internal Gateway Protocols (IGP)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "IGP sind Routing-Protokolle, die für die automatische Weiterleitung von Datenpaketen innerhalb eines autonomen Systems verwendet werden. Sie ermöglichen es Routern, dynamisch die besten Pfade zu Zielnetzwerken zu ermitteln und sich automatisch an Netzwerkänderungen anzupassen. IGPs sind essentiell für die Funktionsfähigkeit moderner IP-Netzwerke in Unternehmen und Service-Provider-Umgebungen.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/",
			"tags": [
				"netzwerk",
				"internet"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.rfc-editor.org/rfc/rfc9350.html"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "internet-message-access-protocol-secure-imaps",
			"name": "Internet Message Access Protocol Secure (IMAPS)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "IMAPS dient dem sicheren Zugriff auf E-Mails auf Mailservern. Die E-Mails verbleiben dabei auf dem Mailserver.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc9051",
			"tags": [
				"dateiuebertragung",
				"e-mail"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "internet-protocol-security-ipsec",
			"name": "Internet Protocol Security (IPSec)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "IPSec ist eine Protokoll-Suite, die Sicherheitsdienste für IP-basierte Netzwerkkommunikation bereitstellt. Es bietet Authentifizierung, Integrität und Vertraulichkeit auf der Netzwerkebene (Layer 3) des OSI-Modells. IPSec wird hauptsächlich für VPN-Verbindungen, sichere Site-to-Site-Kommunikation und End-to-End-Verschlüsselung verwendet.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/ipsec/about/",
			"tags": [
				"ikev",
				"netzwerk",
				"sicherheit"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://tools.ietf.org/html/rfc4835"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "internet-protocol-version-6-ipv6",
			"name": "Internet Protocol Version 6 (IPv6)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "IPv6 dient der Adressierung in der Vermittlung. IP selbst stellt keine Verbindung her.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc8200",
			"tags": [
				"adresse",
				"internet"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "ios",
			"name": "iOS",
			"layer": "applications",
			"sublayer": "native-apps",
			"description": {
				"de": "iOS ist das Betriebssystem für die Arbeit auf mobilen Endgeräten von Apple.",
				"en": ""
			},
			"homepage": "https://www.apple.com/de/os/ios/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/IOS_2020_wordmark_black.svg",
			"tags": [
				"mobil",
				"app",
				"betriebssystem"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"sovereigntyScore": 63
		},
		{
			"id": "istio",
			"name": "Istio",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Istio ist ein Open-Source Service Mesh zum Management von Microservices in containerisierten Umgebungen. Es erleichtert das Sichern, Verbinden und Überwachen verteilter Anwendungen, indem es Funktionen wie Lastenausgleich, Authentifizierung, Autorisierung, Traffic-Steuerung und detaillierte Einblicke in die Kommunikation zwischen Diensten bereitstellt.",
				"en": ""
			},
			"homepage": "https://istio.io/",
			"logo": "https://istio.io/latest/img/icons/istio.svg",
			"tags": [
				"load-balancer",
				"orchestrierung",
				"mesh"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/istio/istio"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "java",
			"name": "Java",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Java dient der plattformunabhängige Softwareentwicklung . Der Quellcode wird kompiliert und als Ergebnis im Java Runtime Environment ausgeführt.",
				"en": ""
			},
			"homepage": "https://www.oracle.com/java/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Java_programming_language_logo.svg",
			"tags": [
				"programmierung",
				"plattformunabhaengig",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"sovereigntyScore": 83
		},
		{
			"id": "javascript-ecma-script",
			"name": "JavaScript (ECMA Script)",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "JavaScript wird primär für die Entwicklung von dynamischen Webseiten verwendet.",
				"en": ""
			},
			"homepage": "https://ecma-international.org/publications-and-standards/standards/ecma-262/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Unofficial_JavaScript_logo_2.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.iso.org/standard/73002.html"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "javascript-object-notation-json",
			"name": "JavaScript Object Notation (JSON)",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "JSON ist ein Datenformat für den Datenaustausch.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc8259",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/JSON_logo_4.svg",
			"tags": [
				"datenformat"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc4627"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "jenkins",
			"name": "Jenkins",
			"layer": "building-blocks",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Jenkins ist ein Open-Source-Automatisierungsserver, der für die kontinuierliche Integration (CI) und kontinuierliche Bereitstellung (CD) von Software verwendet wird.",
				"en": ""
			},
			"homepage": "https://www.jenkins.io/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Jenkins_logo.svg",
			"tags": [
				"pipeline",
				"cd",
				"bereitstellung",
				"ci"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/jenkinsci/jenkins"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "joget",
			"name": "Joget",
			"layer": "platform",
			"sublayer": "lowcode",
			"description": {
				"de": "Joget beschleunigt die Entwicklung und Automatisierung von Enterprise-Anwendungen mit visuellem Builder, Governance-Funktionen und neuen AI-Fähigkeiten in DX 9.",
				"en": ""
			},
			"homepage": "https://www.joget.org/",
			"logo": "https://raw.githubusercontent.com/jogetworkflow/jw-community/master/wflow-consoleweb/src/main/webapp/images/joget-logo.png",
			"tags": [
				"plugins",
				"no-code-low-code",
				"ai",
				"workflow",
				"java"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": false,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://joget.com/joget-earns-govstack-software-requirements-compliance-helping-governments-fast-track-digital-transformation/"
			},
			"sovereigntyScore": 67
		},
		{
			"id": "json-web-tokens-jwt",
			"name": "JSON Web Tokens (JWT)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "Ermöglicht sichere Übertragung von strukturierten Informationen zwischen Parteien als selbstverifizierende JSON-Objekte. Fungiert als kompakter, URL-sicherer Token-Standard für Authentifizierung, Autorisierung und sichere Datenübertragung ohne zentrale Session-Speicherung.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc7519",
			"tags": [
				"authentifizierungm-autorisierung",
				"token",
				"json"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc8725"
			},
			"logo": "https://cdn.simpleicons.org/jsonwebtokens",
			"sovereigntyScore": 95
		},
		{
			"id": "kerberos",
			"name": "Kerberos",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "Ermöglicht sichere Netzwerk-Authentifizierung durch ein Ticket-basiertes System ohne Übertragung von Passwörtern über das Netzwerk. Fungiert als vertrauenswürdiger Drittanbieter (Key Distribution Center) für Single Sign-On in Enterprise-Umgebungen und stellt mutual Authentication zwischen Clients und Services sicher.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc4120",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Kerberos_(protocol)_Logo.svg",
			"tags": [
				"authentifizierung",
				"token",
				"zugriff",
				"autorisierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://web.mit.edu/kerberos/"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "kern-ux-standard",
			"name": "KERN UX Standard",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Der KERN UX Standard ist ein deutschsprachiger Standard für barrierefreie und benutzergerechte Gestaltung von digitalen Schnittstellen. Er definiert Best Practices und Anforderungen für Accessibility, Usability und User Experience in der Entwicklung von Government-Anwendungen.",
				"en": "The KERN UX Standard is a German-language standard for accessible and user-friendly design of digital interfaces. It defines best practices and requirements for accessibility, usability and user experience in the development of government applications."
			},
			"homepage": "https://www.kern-ux-standard.de/",
			"tags": [
				"standard",
				"user-interface",
				"accessibility",
				"ux",
				"usability",
				"wcag"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.kern-ux-standard.de/"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 100
		},
		{
			"id": "keycloak",
			"name": "Keycloak",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "Keycloak ist eine Open-Source-Lösung für Identity- und Access-Management. Sie bietet Single Sign-On, OpenID Connect, OAuth2 und SAML, Benutzer- und Rollenverwaltung sowie Föderation und gilt als De-facto-Standard für IAM in vielen öffentlichen Verwaltungen.",
				"en": "Keycloak is an open-source identity and access management solution. It provides single sign-on, OpenID Connect, OAuth2, SAML, user and role management as well as federation and is the de-facto IAM standard in many public administrations."
			},
			"homepage": "https://www.keycloak.org/",
			"tags": [
				"iam",
				"sso",
				"oidc",
				"saml"
			],
			"license": "Apache-2.0",
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 92
		},
		{
			"id": "kong",
			"name": "Kong",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Kong ist eine API-Management-Plattform für Microservices und Zugriffe auf Backend-Services. Es fungiert als Middleware. Kong ist eine Open-Source-Lösung, die auf NGINX basiert und für ihre Skalierbarkeit und Sicherheit bekannt ist.",
				"en": ""
			},
			"homepage": "https://konghq.com/",
			"logo": "https://konghq.com/wp-content/uploads/2018/08/kong-combination-mark-color-256px.png",
			"tags": [
				"gateway",
				"orchestrierung",
				"schnittstelle"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/Kong/kong"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "kubernetes",
			"name": "Kubernetes",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Kubernetes ist eine Open-Source-Plattform zur Automatisierung der Bereitstellung, Skalierung und Verwaltung containerisierter Anwendungen. Das System orchestriert Container-Workloads über Cluster von Maschinen hinweg und bietet dabei umfangreiche APIs für Netzwerk-, Speicher- und Runtime-Integrationen. Kubernetes ist zum de-facto Standard für Container-Orchestrierung geworden und bildet das Fundament moderner Cloud-Native-Architekturen.",
				"en": ""
			},
			"homepage": "https://kubernetes.io",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Kubernetes_logo_without_workmark.svg",
			"tags": [
				"orchestrierung",
				"container"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://kubernetes.io/docs/home/"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "langgraph",
			"name": "LangGraph",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "LangGraph ist ein low-level Orchestrierungs-Framework für den Aufbau, die Verwaltung und das Deployment von langlebigen, zustandsbehafteten AI-Agenten und Multi-Agent-Workflows. Das Framework nutzt eine graph-basierte Architektur zur Modellierung komplexer Agent-Interaktionen, wobei Knoten (Nodes) die Agent-Logik enthalten und Kanten (Edges) den Kontrollfluss zwischen ihnen definieren. LangGraph ermöglicht sowohl vordefinierte Workflows als auch dynamische Agenten-Systeme mit Human-in-the-Loop-Funktionalitäten.",
				"en": ""
			},
			"homepage": "https://www.langchain.com/langgraph",
			"logo": "https://raw.githubusercontent.com/langchain-ai/langgraph/main/docs/static/img/langgraph_logo.png",
			"tags": [
				"ki",
				"agent"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "mariadb",
			"name": "MariaDB",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "MariaDB ist ein relationales Datenbankmanagementsystem für die Organisation von strukturierten Daten in Tabellen.",
				"en": ""
			},
			"homepage": "https://mariadb.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/MariaDB_Logo.svg",
			"tags": [
				"datenbank",
				"sql",
				"relational"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://mariadb.org/documentation/"
			},
			"sovereigntyScore": 100
		},
		{
			"id": "markdown-md",
			"name": "Markdown (MD)",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "MD ist ein Datenformat für den Datenaustausch.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc7763",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Markdown-mark.svg",
			"tags": [
				"datenformat"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://daringfireball.net/projects/markdown/"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "media-access-control-mac",
			"name": "Media Access Control (MAC)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "MAC ist eine Unterschicht der Sicherungsschicht (Layer 2) im OSI-Modell, die den Zugriff auf das Übertragungsmedium in Netzwerken regelt. MAC-Protokolle koordinieren, wie mehrere Geräte gemeinsam auf ein geteiltes Kommunikationsmedium zugreifen können, ohne sich gegenseitig zu stören. Jedes Netzwerkgerät erhält eine eindeutige MAC-Adresse zur Identifikation im lokalen Netzwerksegment.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/rfc9724/",
			"tags": [
				"identifier",
				"uuid",
				"adresse",
				"guid",
				"oui"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://tools.ietf.org/rfc/rfc826.txt"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "messaging-layer-security-mls",
			"name": "Messaging Layer Security (MLS)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "MLS dient der Ende-zu-Ende-Verschlüsselung von Nachrichten in kleinen und großen Gruppen.",
				"en": ""
			},
			"homepage": "https://messaginglayersecurity.rocks/",
			"tags": [
				"sicherheit",
				"kurznachricht",
				"datenuebertragung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/mlswg/mls-protocol"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "milvus",
			"name": "Milvus",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Milvus ist eine Vektor-Datenbank.",
				"en": ""
			},
			"homepage": "https://milvus.io/de",
			"logo": "https://milvus.io/images/milvus_log.svg",
			"tags": [
				"datenbank",
				"vektor"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://milvus.io/docs/de"
			},
			"sovereigntyScore": 82
		},
		{
			"id": "mlflow",
			"name": "MLflow",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "MLflow ist eine Open-Source-Plattform für das Management des gesamten Machine Learning-Lifecycles, die von Databricks entwickelt wurde und Experiment-Tracking, Modellverpackung, Deployment und eine zentrale Modellregistrierung vereint. Die Plattform ermöglicht es Data Scientists und ML-Engineers, Experimente zu verfolgen, Parameter und Metriken zu protokollieren, Modelle zu versionieren und sie konsistent über verschiedene Umgebungen hinweg zu deployen. MLflow unterstützt alle gängigen ML-Frameworks und Sprachen (Python, R, Java) sowie GenAI-Anwendungen mit LLM-Tracing und Prompt-Management.",
				"en": ""
			},
			"homepage": "https://mlflow.org/",
			"logo": "https://raw.githubusercontent.com/mlflow/mlflow/master/docs/source/_static/MLflow-logo-final-black.png",
			"tags": [
				"machine-learning",
				"verarbeitung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://mlflow.org/docs/latest/"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "mobilfunk",
			"name": "Mobilfunk",
			"layer": "infrastructure",
			"sublayer": "anschluss",
			"description": {
				"de": "Der Mobilfunk wird zum Vernetzen von Mobilfunkgeräte (Smartphones) genutzt und erfolgt über die Verbindung zu Basisstationen zwecks weiterer Verteilung. Die Verbindung zum Netzwerk-Betreiber erfolgt über das Subscriber Identity Module (SIM).",
				"en": ""
			},
			"homepage": "https://www.3gpp.org/",
			"tags": [
				"lte",
				"funk",
				"zelle",
				"drahtlos"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.3gpp.org/specifications-technologies"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 100
		},
		{
			"id": "model-context-protocol-mcp",
			"name": "Model Context Protocol (MCP)",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "MCP ist ein offenes Protokoll, welches standardisiert wie Anwendungen Kontextinformationen an große Sprachmodelle liefert. MCP liefert einen standardisierten Weg um KI Modelle mit verschiedenen Datenquellen und -werkzeugen zu verbinden. MCP ermöglicht Agenten und komplexe Workflows auf Basis von großen Sprachmodellen zu bauen.",
				"en": ""
			},
			"homepage": "https://modelcontextprotocol.io/",
			"logo": "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/assets/mcp-logo.svg",
			"tags": [
				"agent",
				"agentische-ki",
				"kontext"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://modelcontextprotocol.io/specification/2025-06-18"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "module-lattice-based-key-encapsulation-mechanism",
			"name": "Module Lattice Based Key Encapsulation Mechanism",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "ML-KEM unterstützt bei der Generierung eines Schlüssels für symmetrische Verschlüsselungsverfahren. ML-KEM ist ein Post-Quanten-Algorithmus.",
				"en": ""
			},
			"homepage": "https://csrc.nist.gov/pubs/fips/203/final",
			"tags": [
				"schluessel",
				"kryptografie",
				"post-quanten-kryptografie",
				"verschluesselung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR02102/BSI-TR-02102.pdf?__blob=publicationFile"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 85
		},
		{
			"id": "mongodb",
			"name": "MongoDB",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "MongoDB ist eine dokumentenorientierte NoSQL-Datenbank.",
				"en": ""
			},
			"homepage": "https://www.mongodb.com/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/MongoDB_Logo.svg",
			"tags": [
				"nosql",
				"datenbank",
				"dokumentenbasiert"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/mongodb"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "mosip",
			"name": "MOSIP",
			"layer": "applications",
			"sublayer": "sicherheit",
			"description": {
				"de": "MOSIP (Modular Open Source Identity Platform) ist eine quelloffene Plattform für nationale digitale Identitäten. Sie wird in zahlreichen Schwellenländern als Basis für Bürgerregister und ID-Programme adaptiert.",
				"en": "MOSIP (Modular Open Source Identity Platform) is an open-source platform for national digital identities. It is adopted in many emerging economies as a basis for civil registries and national ID programmes."
			},
			"homepage": "https://www.mosip.io/",
			"license": "MPL-2.0",
			"tags": [
				"egovernment",
				"identity",
				"open-source"
			],
			"oss": true,
			"maturity": "incubation",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": false,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 85
		},
		{
			"id": "multiprotocol-label-switching-mpls",
			"name": "Multiprotocol Label Switching (MPLS)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "MPLS dient der Übertragung von Datenpaketen in einem verbindungslosen Netz. Das Verfahren zur Verteilung wird in großen Netzwerken eingesetzt.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/mpls/documents/",
			"tags": [
				"netzwerk",
				"weitverkehr"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc6790"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "myinfo",
			"name": "Myinfo",
			"layer": "applications",
			"sublayer": "daten",
			"description": {
				"de": "Myinfo ist ein Datenfreigabe-Dienst aus Singapurs SGTS-Stack. Bürger geben mit ihrer Zustimmung verifizierte Stammdaten an Drittdienste weiter und vermeiden so erneute Eingaben.",
				"en": "Myinfo is a data-sharing service from Singapore's SGTS stack. With user consent, citizens share verified personal data with third-party services and avoid re-entering it."
			},
			"homepage": "https://www.singpass.gov.sg/myinfo/",
			"tags": [
				"egovernment",
				"data-sharing",
				"singapore"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 50
		},
		{
			"id": "mysql-server",
			"name": "MySQL Server",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "MySQL ist ein relationales Datenbankmanagementsystem für die Organisation von strukturierten Daten in Tabellen.",
				"en": ""
			},
			"homepage": "https://www.mysql.com/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/MySQL_logo.svg",
			"tags": [
				"datenbank",
				"sql",
				"relational"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://dev.mysql.com/doc/"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "n8n",
			"name": "n8n",
			"layer": "platform",
			"sublayer": "lowcode",
			"description": {
				"de": "n8n ist eine flexible Automatisierungsplattform mit 400+ Integrationen, die visuelles Bauen und Code kombiniert und Self-Hosting erlaubt.",
				"en": ""
			},
			"homepage": "https://www.n8n.io",
			"logo": "https://raw.githubusercontent.com/n8n-io/n8n/master/packages/design-system/src/assets/images/n8n-logo.svg",
			"tags": [
				"automatisierung",
				"open-source",
				"no-code",
				"api",
				"integration"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.n8n.io/"
			},
			"sovereigntyScore": 97
		},
		{
			"id": "neo4j",
			"name": "Neo4J",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Neo4j ist eine Graphdatenbank.",
				"en": ""
			},
			"homepage": "https://neo4j.com/",
			"logo": "https://dist.neo4j.com/wp-content/uploads/20230926084108/Logo_FullColor_RGB_TransBG.svg",
			"tags": [
				"nosql",
				"datenbank",
				"graph"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://neo4j.com/docs/"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "nextjs",
			"name": "NextJS",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Next.js ist ein React-Framework zum Erstellen von Full-Stack-Webanwendungen. Sie verwenden React-Komponenten zum Erstellen von Benutzeroberflächen und Next.js für zusätzliche Funktionen und Optimierungen.",
				"en": ""
			},
			"homepage": "https://nextjs.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Nextjs-logo.svg",
			"tags": [
				"rendering",
				"user-interface"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://nextjs.org/docs"
			},
			"sovereigntyScore": 83
		},
		{
			"id": "nginx",
			"name": "NGINX",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "NGINX ein Open-Source-Webserver der auch als Reverse-Proxy, HTTP-Cache und Load-Balancer eingesetzt wird. Er ist bekannt für seine hohe Leistung bei der Verarbeitung vieler gleichzeitiger Anfragen, seine Effizienz bei geringer Speichernutzung und seine Flexibilität.",
				"en": ""
			},
			"homepage": "https://nginx.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Nginx_logo.svg",
			"tags": [
				"proxy",
				"load-balancer",
				"gateway",
				"orchestrierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://nginx.org/en/docs/index.html"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "node-red",
			"name": "Node-RED",
			"layer": "platform",
			"sublayer": "lowcode",
			"description": {
				"de": "Node-RED ist eine Open-Source-Software, die es ermöglicht, visuell Programmierflüsse zu erstellen. Diese Software wird häufig im Bereich der Internet der Dinge (IoT) und zur Automatisierung von Prozessen eingesetzt.",
				"en": ""
			},
			"homepage": "https://nodered.org/",
			"logo": "https://nodered.org/images/node-red-icon.svg",
			"tags": [
				"no-code",
				"javascript",
				"low-code"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://nodered.org/docs/developing-flows/"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "nodejs",
			"name": "Node.js",
			"layer": "platform",
			"sublayer": "entwicklung",
			"description": {
				"de": "Node.js ist eine quelloffene JavaScript-Laufzeitumgebung. Sie wird in vielen Verwaltungs-Backends für schnelle, ereignisgetriebene APIs und für Frontend-Build-Tooling eingesetzt.",
				"en": "Node.js is an open-source JavaScript runtime. It is used in many public-administration backends for fast event-driven APIs and for frontend build tooling."
			},
			"homepage": "https://nodejs.org/",
			"license": "MIT",
			"tags": [
				"javascript",
				"runtime",
				"backend"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "nomad",
			"name": "Nomad",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Nomad ist ein Open-Source-System zur Orchestrierung von Anwendungen und deren Workloads auf hybriden Umgebungen. Es ist eine flexible Lösung, die für ihre Einfachheit und Benutzerfreundlichkeit bekannt ist, da sie eine einzelne Binärdatei zur Installation und Konfiguration bietet.",
				"en": ""
			},
			"homepage": "https://developer.hashicorp.com/nomad",
			"logo": "https://www.datocms-assets.com/2885/1620155116-brandhcnomadprimaryattributedcolor.svg",
			"tags": [
				"orchestrierung",
				"container"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://developer.hashicorp.com/nomad/docs"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "nqdrant",
			"name": "NQdrant",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Qdrant ist eine container-basierte Vektor-Datenbank mit integrierter Ähnlichkeitssuche.",
				"en": ""
			},
			"homepage": "https://qdrant.tech/",
			"logo": "https://qdrant.tech/images/qdrant-logo.svg",
			"tags": [
				"datenbank",
				"container",
				"vektor"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/qdrant/qdrant"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "one-time-password-otp",
			"name": "One-Time Password (OTP)",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "OTP liefert ein temporäres automatisch generiertes Passwort zur Identifikation eines Nutzer für eine einzelne Transaktion oder Sitzung. Das temporäre Passwort kann über verschiedenen Kanäle ausgebracht werden (SMS, App, Mail).",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc6238",
			"tags": [
				"mfa",
				"fa",
				"multi-faktor",
				"passwort",
				"zugriff"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc2289"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 85
		},
		{
			"id": "open-archives-initiative-protocol-for-metadata-harvesting",
			"name": "Open Archives Initiative Protocol for Metadata Harvesting",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "OAI-PMH ist ein leichtgewichtiges Protokoll für Metadaten.",
				"en": ""
			},
			"homepage": "https://www.openarchives.org/pmh/",
			"tags": [
				"datenkatalog",
				"metadaten"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "open-authorization-oauth",
			"name": "Open Authorization (OAuth)",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "Ermöglicht sichere Autorisierung und delegierten Zugriff auf Ressourcen ohne Preisgabe von Benutzeranmeldedaten. Fungiert als standardisiertes Framework für die Berechtigung von Drittanbieter-Anwendungen zum Zugriff auf geschützte APIs und Benutzerdaten.",
				"en": ""
			},
			"homepage": "https://oauth.net/2/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Oauth_logo.svg",
			"tags": [
				"protokoll",
				"zugriff",
				"autorisierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc6750"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "open-id-connect-oidc",
			"name": "Open ID Connect (OIDC)",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "OIDC erweitert OAuth 2.0 um standardisierte Authentifizierung und Identitätsverwaltung durch ID Tokens, ermöglicht einheitliche Benutzeranmeldung über verschiedene Anwendungen hinweg und stellt strukturierte Identitätsinformationen in einem interoperablen Format bereit.",
				"en": ""
			},
			"homepage": "https://openid.net/developers/how-connect-works/",
			"tags": [
				"authentifizierung",
				"protokoll",
				"zugriff"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://openid.net/specs/openid-connect-core-1_0.html#:~:text=Final:%20OpenID%20Connect%20Core%201.0%20incorporating%20errata%20set%202"
			},
			"logo": "https://cdn.simpleicons.org/openid",
			"sovereigntyScore": 85
		},
		{
			"id": "open-internet-exchange-point-ixp-oix-1",
			"name": "Open Internet Exchange Point (IXP OIX-1)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "IXP OIX-1 ist eine Zertifizierung für Internet-Knotenpunkte (IXPs) für die Sicherstellung verschiedener Standards zu Leistungsfähigkeit, Verfügbarkeit, Ausfallsicherheit und Datensicherheit. Ein IXP verbindet Internetdienstanbieter (ISPs) und Content-Netzwerke (CDNs) um den Datenverkehr zu optimieren.",
				"en": ""
			},
			"homepage": "https://www.oix.org/standards-and-certifications/ixp-oix-1-certification/",
			"tags": [
				"netz",
				"netzwerk",
				"internet-exchange-point",
				"ixp"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.oix.org/"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "open-neural-network-exchange",
			"name": "Open Neural Network Exchange",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "ONNX ist ein offener Standard zur Darstellung von Machine Learning-Modellen, der die Interoperabilität zwischen verschiedenen AI-Frameworks ermöglicht. Der Standard definiert ein erweiterbares Berechnungsmodell sowie Standard-Datentypen und Operatoren, wodurch Modelle zwischen Frameworks wie PyTorch, TensorFlow, scikit-learn und anderen portiert werden können. ONNX fungiert als universelle \"Sprache\" für neuronale Netzwerke und eliminiert die Notwendigkeit komplexer Konvertierungs-Pipelines zwischen verschiedenen ML-Ökosystemen.",
				"en": ""
			},
			"homepage": "https://onnx.ai/",
			"logo": "https://onnx.ai/images/ONNX-Logo.svg",
			"tags": [
				"machine-learning",
				"neuronale-netze",
				"verarbeitung",
				"ml"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/onnx/onnx"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "open-policy-agent",
			"name": "Open Policy Agent",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "Open Policy Agent (OPA) ist eine Open-Source Policy-Engine, die Sicherheitsregeln und Zugriffsentscheidungen als Code (Policy-as-Code) umsetzt. OPA wird unter anderem zur Absicherung von Kubernetes-Pods und für Compliance-Prüfungen eingesetzt.",
				"en": "Open Policy Agent (OPA) is an open-source policy engine that expresses security rules and access decisions as code (policy-as-code). OPA is used for example to secure Kubernetes pods and to perform compliance checks."
			},
			"homepage": "https://www.openpolicyagent.org/",
			"license": "Apache-2.0",
			"tags": [
				"policy",
				"security",
				"compliance",
				"cncf"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "open-shortest-path-first-ospf",
			"name": "Open Shortest Path First (OSPF)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "OSPF ist ein Link-State-Routing-Protokoll, das in IP-Netzwerken zur automatischen Berechnung der optimalen Routen zwischen Netzwerkknoten verwendet wird. Es ermöglicht Routern, dynamisch die kürzesten Pfade durch ein Netzwerk zu finden und sich automatisch an Netzwerkänderungen anzupassen. OSPF arbeitet hierarchisch mit Areas und eignet sich besonders für große Unternehmensnetzwerke.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/ospf/about/",
			"tags": [
				"netzwerk",
				"routing"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc8362"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "openapi",
			"name": "OpenAPI",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "OpenAPI ist eine herstellerunabhängige Spezifikation zur Beschreibung von RESTful APIs. Sie ermöglicht eine standardisierte, maschinen- und menschenlesbare Beschreibung von Schnittstellen (inklusive Endpunkte, Operationen, Datenstrukturen). Die Spezifikation entstand aus dem früheren Projekt Swagger und wird heute unter der Schirmherrschaft der OpenAPI-Initiative weiterentwickelt.",
				"en": ""
			},
			"homepage": "https://www.openapis.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/OpenAPI_Logo_Pantone.svg",
			"tags": [
				"rest",
				"api",
				"schnittstelle",
				"rpc"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/OAI/OpenAPI-Specification"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "openkruise",
			"name": "OpenKruise",
			"layer": "building-blocks",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "OpenKruise ist eine Open-Source-Anwendungssuite, die Kubernetes um Funktionen für das Management von großen Anwendungen erweitert. Als ein Projekt der Cloud Native Computing Foundation (CNCF) bietet OpenKruise Funktionen für die Automatisierung von Deployment, Upgrades und Betrieb von Anwendungen.",
				"en": ""
			},
			"homepage": "https://openkruise.io/",
			"tags": [
				"pipeline",
				"cd",
				"bereitstellung",
				"ci"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/openkruise/kruise"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "openshift-origin-okd",
			"name": "OpenShift Origin (OKD)",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "OpenShift ist eine Kubernetes-basierte Plattform von Red Hat für die Entwicklung und Bereitstellung von Cloud-nativen Anwendungen, die eine einheitliche Basis für Hybrid-Cloud-, Multi-Cloud- und Edge-Umgebungen bietet und den gesamten Lebenszyklus von Anwendunen unterstützt. OKD ist die Community Version von OpenShift welche 2018 abgeleitet wurde.",
				"en": ""
			},
			"homepage": "http://www.openshift.org/",
			"logo": "https://www.okd.io/images/okd-panda-flat.svg",
			"tags": [
				"orchestrierung",
				"container"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://okd.io/docs/documentation/"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "opentelemetry",
			"name": "OpenTelemetry",
			"layer": "platform",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "OpenTelemetry ist ein CNCF-Projekt für herstellerunabhängige Instrumentierung von Logs, Metriken und Traces. Es definiert offene Standards und SDKs für Distributed Tracing in verteilten Verwaltungssystemen.",
				"en": "OpenTelemetry is a CNCF project for vendor-neutral instrumentation of logs, metrics and traces. It defines open standards and SDKs for distributed tracing in distributed public-administration systems."
			},
			"homepage": "https://opentelemetry.io/",
			"license": "Apache-2.0",
			"tags": [
				"observability",
				"tracing",
				"metrics",
				"cncf"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "php",
			"name": "PHP",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "PHP dient der serverseitigen Entwicklung von dynamischen Webseiten und Anwendungen.",
				"en": ""
			},
			"homepage": "https://www.php.net/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/PHP-logo.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.php.net/docs.php"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "piveau",
			"name": "Piveau",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Piveau ist ein Datenmanagement Werkzeug für die Verarbeitungskette von der Erfassung, Aggregation, Bereitstellung bis zur Nutzung der Daten.",
				"en": ""
			},
			"homepage": "https://www.piveau.de/",
			"tags": [
				"aggregation",
				"datennutzung",
				"bereitstellung",
				"erfassung",
				"datenkonvertierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://interoperable-europe.ec.europa.eu/collection/open-data/solution/piveau"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 83
		},
		{
			"id": "portainer",
			"name": "Portainer",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Portainer ist eine benutzerfreundliche, webbasierte Management-Plattform für Container, die es ermöglicht, Docker- und Kubernetes-Umgebungen mit einer einfachen Oberfläche zu verwalten und zu überwachen.",
				"en": ""
			},
			"homepage": "https://www.portainer.io/",
			"logo": "https://raw.githubusercontent.com/portainer/portainer/develop/app/assets/images/logo_alt.svg",
			"tags": [
				"orchestrierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/portainer"
			},
			"sovereigntyScore": 82
		},
		{
			"id": "postgresql",
			"name": "PostgreSQL",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "PostgreSQL ist ein objektrelationales Datenbankmanagementsystem (ORDBMS), das für seine Einhaltung von SQL-Standards, seine Erweiterbarkeit und seine Zuverlässigkeit bekannt ist. Es wird häufig in Anwendungen eingesetzt, die komplexe Transaktionen und große Datenmengen verarbeiten.",
				"en": ""
			},
			"homepage": "https://www.postgresql.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Postgresql_elephant.svg",
			"tags": [
				"open-source",
				"datenbank",
				"sql",
				"relational"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"sovereigntyScore": 90
		},
		{
			"id": "prometheus",
			"name": "Prometheus",
			"layer": "platform",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Prometheus ist ein quelloffenes Monitoring- und Alerting-System aus dem CNCF-Ökosystem. Es sammelt Metriken über ein Pull-Modell, speichert Zeitreihen und ist Standardwerkzeug für Cloud-Native-Observability.",
				"en": "Prometheus is an open-source monitoring and alerting system from the CNCF ecosystem. It scrapes metrics, stores time-series data and is the standard tool for cloud-native observability."
			},
			"homepage": "https://prometheus.io/",
			"license": "Apache-2.0",
			"tags": [
				"monitoring",
				"metrics",
				"observability",
				"cncf"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "promptflow",
			"name": "PromptFlow",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "PromptFlow ist ein Framework von Entwicklungswerkzeugen für KI-Anwendungen von der Ideenfindung bis zum Monitoring.",
				"en": ""
			},
			"homepage": "https://microsoft.github.io/promptflow/",
			"logo": "https://raw.githubusercontent.com/microsoft/promptflow/main/docs/media/logo/promptflow_logo_light.png",
			"tags": [
				"entwicklung",
				"verarbeitung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/microsoft/promptflow"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "public-ui-kolibri",
			"name": "KoliBri - Public-UI",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Public UI KoliBri ist eine Komponentenbibliothek für die Entwicklung barrierefreier Weboberflächen. Sie bietet vorgefertigte, zugängliche UI-Komponenten nach WCAG-Standards und ermöglicht die schnelle Entwicklung von Government-Anwendungen mit hohen Anforderungen an Accessibility.",
				"en": "Public UI KoliBri is a component library for developing accessible web interfaces. It provides pre-built, accessible UI components that comply with WCAG standards and enables rapid development of government applications with high accessibility requirements."
			},
			"homepage": "https://public-ui.github.io/",
			"logo": "https://public-ui.github.io/logo.svg",
			"tags": [
				"webframework",
				"user-interface",
				"components",
				"accessibility",
				"wcag"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/public-ui/kolibri"
			},
			"sovereigntyScore": 100
		},
		{
			"id": "pyro",
			"name": "Pyro",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "Pyro ist eine universelle probabilistische Programmiersprache (PPL) basierend auf PyTorch, die tiefes probabilistisches Modellieren für AI-Forschung ermöglicht. Sie vereint moderne Deep Learning-Ansätze mit Bayesianischer Modellierung und bietet flexible, skalierbare Inferenzalgorithmen.",
				"en": ""
			},
			"homepage": "https://pyro.ai/",
			"tags": [
				"deep-learning",
				"verarbeitung",
				"probabilistische-programmierung",
				"ppl"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.pyro.ai/en/stable/"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 78
		},
		{
			"id": "python",
			"name": "Python",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Python ist eine Programmiersprache zur Webentwicklung und für Prototyping.",
				"en": ""
			},
			"homepage": "https://www.python.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Python-logo-notext.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.python.org/3/"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "pytorch",
			"name": "PyTorch",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "PyTorch ist eine Bibliothek für maschinelles Lernen, Deep Learning und Natural Language Processing.",
				"en": ""
			},
			"homepage": "https://pytorch.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/PyTorch_logo_icon.svg",
			"tags": [
				"deep-learning",
				"neuronale-netze",
				"verarbeitung",
				"nlp",
				"machine-learning"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.pytorch.org/docs/stable/index.html"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "quick-udp-internet-connections-quic",
			"name": "Quick UDP Internet Connections (QUIC)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "QUIC ist ein verbindungsorientiertes, performantes und verschlüsseltes Protokoll für die Datenübertragung.",
				"en": ""
			},
			"homepage": "https://quicwg.org/",
			"tags": [
				"sicherheit",
				"datenuebertragung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/quicwg"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "r",
			"name": "R",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "R ist eine Programmiersprache Analyse, Bereinigung, Modellierung und Visualisierung von Daten.",
				"en": ""
			},
			"homepage": "https://www.r-project.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/R_logo.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"sovereigntyScore": 90
		},
		{
			"id": "rabbitmq",
			"name": "RabbitMQ",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "RabbitMQ ist ein quelloffener, queue-basierter Message-Broker. Er unterstützt offene Protokolle wie AMQP, MQTT und STOMP und ist ein Standard-Tool für asynchrone System-Integration und entkoppelte Microservices in Verwaltungsanwendungen.",
				"en": "RabbitMQ is an open-source queue-based message broker. It supports open protocols such as AMQP, MQTT and STOMP and is a standard tool for asynchronous system integration and decoupled microservices in public administration applications."
			},
			"homepage": "https://www.rabbitmq.com/",
			"license": "MPL-2.0",
			"tags": [
				"messaging",
				"queue",
				"amqp"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 88
		},
		{
			"id": "ragflow",
			"name": "RAGFlow",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "RAGFlow wird als Engine für Retrieval-Augmented Generation (RAG) eingesetzt um Ergebnisse anhand von Kontext zu verbessern beziehungsweise die Wissensbasis zu erweitern.",
				"en": ""
			},
			"homepage": "https://ragflow.io/",
			"logo": "https://raw.githubusercontent.com/infiniflow/ragflow/main/web/src/assets/logo-with-text.png",
			"tags": [
				"retrieval-augmented-generation",
				"rag",
				"verarbeitung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://ragflow.io/docs/dev/"
			},
			"sovereigntyScore": 82
		},
		{
			"id": "rancher",
			"name": "Rancher",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Rancher ist eine Open-Source-Plattform zur Verwaltung und Bereitstellung mehrerer Kubernetes-Cluster und Container-Anwendungen. Es bietet eine einfache Benutzeroberfläche.",
				"en": ""
			},
			"homepage": "https://www.rancher.com/",
			"logo": "https://www.rancher.com/assets/img/brand-guidelines/assets/logos/png/color/rancher-logo-horiz-color.png",
			"tags": [
				"orchestrierung",
				"container"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/rancher/rancher"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "react",
			"name": "React",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Mit React können Sie Benutzeroberflächen aus einzelnen Teilen, sogenannten Komponenten, erstellen. Kombinieren Sie diese dann zu ganzen Webseiten und Apps.",
				"en": ""
			},
			"homepage": "https://react.dev/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/React-icon.svg",
			"tags": [
				"webdesign",
				"components",
				"user-interface"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://react.dev/learn"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "redis",
			"name": "Redis",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Redis ist eine schnelle, in-memory arbeitende Schlüssel-Wert-Datenbank. Sie wird typischerweise für Caching, Session-Speicher, Pub/Sub und Echtzeit-Lastspitzen in skalierbaren GovTech-Anwendungen eingesetzt.",
				"en": "Redis is a fast in-memory key-value store. It is typically used for caching, session storage, pub/sub and real-time load peaks in scalable GovTech applications."
			},
			"homepage": "https://redis.io/",
			"license": "RSALv2",
			"tags": [
				"cache",
				"in-memory",
				"key-value"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 63
		},
		{
			"id": "representational-state-transfer",
			"name": "Representational State Transfer",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "REST ist ein Architekturstil für verteilte Systeme, der 2000 von Roy Fielding definiert wurde. REST basiert auf den etablierten Web-Standards HTTP, URI und JSON und ermöglicht eine einfache, skalierbare Kommunikation zwischen verschiedenen Systemen über das Internet. REST Schnittstellen folgen einem ressourcenorientierten Ansatz mit einheitlichen Schnittstellen und sind zustandslos konzipiert.",
				"en": ""
			},
			"homepage": "https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm",
			"tags": [
				"schnittstelle"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 80
		},
		{
			"id": "resource-description-framework-rdf",
			"name": "Resource Description Framework (RDF)",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "RDF ist ein Datenformat für den Datenaustausch.",
				"en": ""
			},
			"homepage": "https://www.w3.org/RDF/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/RDF_logo.svg",
			"tags": [
				"datenformat"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.w3.org/standards/techs/rdf"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "rivest-shamir-adleman",
			"name": "Rivest–Shamir–Adleman",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "RSA ist ein asymmetrisches kryptographisches Verfahren für das Verschlüsseln und Signieren auf Basis des Faktorisierungsproblems. Es wird eine Schlüssellänge von mindestens 3000 empfohlen.",
				"en": ""
			},
			"homepage": "https://csrc.nist.gov/projects/digital-signatures",
			"tags": [
				"asymmetrisch",
				"pki",
				"schluessel",
				"kryptografie",
				"algorithmus",
				"verschluesselung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR02102/BSI-TR-02102.pdf?__blob=publicationFile"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 85
		},
		{
			"id": "robot-framework",
			"name": "Robot Framework",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "Robot Framework ist ein Framework für Automatisierung von Tests und im Rahmen von Robot Process Automation. Genutzt wird eine prozedurale Skriptsprache.",
				"en": ""
			},
			"homepage": "https://robotframework.org/",
			"logo": "https://robotframework.org/img/RF_logo_vertical.svg",
			"tags": [
				"robot-process-automation",
				"verarbeitung",
				"rpa"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://docs.robotframework.org/docs"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "ruby-on-rails",
			"name": "Ruby on Rails",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Ruby on Rails ist ein Webframework für die Programmiersprache Ruby. Es prägte das britische GOV.UK-Ökosystem (GOV.UK Plattformen) und die US-amerikanische Login.gov-Plattform und ist auf schnelle Entwicklung und Konventionen vor Konfiguration ausgerichtet.",
				"en": "Ruby on Rails is a web framework for the Ruby programming language. It shaped the UK's GOV.UK ecosystem (GOV.UK platforms) and the US Login.gov platform and is centred on rapid development and convention over configuration."
			},
			"homepage": "https://rubyonrails.org/",
			"license": "MIT",
			"tags": [
				"ruby",
				"framework",
				"web"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 92
		},
		{
			"id": "rust",
			"name": "Rust",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Rust ist eine systemnahe Programmiersprache. Rust arbeitet mit Typen statt einer Garbage Collection um Speichermanagement zu verbessern.",
				"en": ""
			},
			"homepage": "https://rust-lang.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Rust_programming_language_black_logo.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://rust-lang.org/learn/"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "scylla",
			"name": "Scylla",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "Scylla ist eine spaltenorientierte NoSQL Datenbank.",
				"en": ""
			},
			"homepage": "https://www.scylladb.com/",
			"logo": "https://www.scylladb.com/wp-content/uploads/scylla-mascot-flathead.svg",
			"tags": [
				"nosql",
				"datenbank",
				"spalten"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/scylladb"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "sd-wan-service-attributes-and-service-framework-mef",
			"name": "SD-WAN Service Attributes and Service Framework (MEF)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "MEF definiert SD-WAN Services und Attribute. SD-WAN ist eine Technologie zur Verbindung weit entfernter Netzwerksegemente über verschiedene Anschlusstypen/ Medien.",
				"en": ""
			},
			"homepage": "https://www.mplify.net/resources/mef-70-2-sd-wan-service-attributes-and-service-framework/",
			"tags": [
				"netz",
				"sd-wan",
				"netzwerk",
				"wide-area",
				"wan"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.mplify.net/service-standards/overlay-services/sd-wan/"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "secure-hash-algorithm",
			"name": "Secure Hash Algorithm",
			"layer": "building-blocks",
			"sublayer": "sicherheit",
			"description": {
				"de": "SHA wandelt Daten in einen eindeutigen Prüfwert um. Der Prüfwert kann zu Sicherstellung der Integrität genutzt werden (digitaler Fingerabdruck).",
				"en": ""
			},
			"homepage": "https://csrc.nist.gov/projects/hash-functions",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/SHA-2.svg",
			"tags": [
				"schluessel",
				"integritaet",
				"manipulation",
				"pruefwert"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR02102/BSI-TR-02102.pdf?__blob=publicationFile"
			},
			"sovereigntyScore": 85
		},
		{
			"id": "segment-routing-sr",
			"name": "Segment Routing (SR)",
			"layer": "infrastructure",
			"sublayer": "verteilung",
			"description": {
				"de": "Segment Routing ist eine Technologie zur Vereinfachung des Routens von Daten. Zur Optimierung werden Pfadinformationen im Header gespeichert.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc8402",
			"tags": [
				"netz",
				"netzwerk",
				"segment",
				"routing"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "selenium",
			"name": "Selenium",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Selenium ist ein Open‑Source‑Projekt, das Entwicklern und Testern ermöglicht, Web‑Browser automatisch zu steuern. Mit Selenium können wiederkehrende Aufgaben – etwa das Öffnen einer Webseite, das Ausfüllen von Formularen, das Klicken auf Buttons oder das Prüfen von Inhalten – programmgesteuert durchgeführt werden. Der Hauptzweck liegt darin, funktionale Tests von Web‑Anwendungen zu automatisieren, sodass die Qualität der Software zuverlässig und effizient überprüft werden kann, ohne dass jede Testschritt manuell ausgeführt werden muss. Durch die Unterstützung verschiedener Browser (wie Chrome, Firefox, Edge und Safari) und Programmiersprachen (z. B. Java, Python, C#) lässt sich Selenium flexibel in bestehende Entwicklungs‑ und Continuous‑Integration‑Umgebungen integrieren.",
				"en": ""
			},
			"homepage": "https://www.selenium.dev/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Selenium_Logo.svg",
			"tags": [
				"automation",
				"testing",
				"user-interface"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.selenium.dev/documentation/"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "session-initiation-protocol-sip",
			"name": "Session Initiation Protocol (SIP)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "SIP ist ein Netzprotokoll zur Etablierung und Steuerung von Kommunikationssitzungen mit mehreren Teilnehmenden. SIP ist Grundlage für IP-Telefonie (Voice over IP).",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/sipcore/about/",
			"tags": [
				"telefonie",
				"kommunikation"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/ietf-wg-sipcore"
			},
			"logo": "https://cdn.simpleicons.org/session",
			"sovereigntyScore": 95
		},
		{
			"id": "simple-mail-transfer-protocol-secure-smtps",
			"name": "Simple Mail Transfer Protocol Secure (SMTPS)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "SMTPS dient dem sicheren Austausch von E-Mails.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc8314",
			"tags": [
				"msa",
				"e-mail",
				"mta",
				"datenuebertragung",
				"mua"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "simple-object-access-protocol",
			"name": "Simple Object Access Protocol",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "SOAP ist ein Protokoll, das den Austausch von strukturierten Informationen in verteilten und dezentralisierten Umgebungen ermöglicht. Es nutzt XML als Format für Anfragen und Antworten und arbeitet oft über HTTP, kann aber auch andere Protokolle nutzen. Der Hauptzweck von SOAP liegt in der Unterstützung von Interoperabilität und Sicherheit in komplexen Unternehmensanwendungen, wobei es strikt definierten Standards für Webservices folgt.",
				"en": ""
			},
			"homepage": "https://www.w3.org/TR/soap/",
			"tags": [
				"api",
				"xml",
				"schnittstelle"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.w3.org/2000/xp/Group/"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "singpass",
			"name": "Singpass",
			"layer": "applications",
			"sublayer": "sicherheit",
			"description": {
				"de": "Singpass ist Singapurs nationaler Login-Dienst und Teil der National Digital Identity (NDI). Er bietet Bürgerinnen und Bürgern sicheren Zugriff auf hunderte digitale Verwaltungsdienste.",
				"en": "Singpass is Singapore's national login service and part of its National Digital Identity (NDI) programme. It gives citizens secure access to hundreds of digital government services."
			},
			"homepage": "https://www.singpass.gov.sg/",
			"tags": [
				"egovernment",
				"identity",
				"singapore"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 50
		},
		{
			"id": "sovereign-cloud-stack",
			"name": "Sovereign Cloud Stack",
			"layer": "sovereign-standards",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Der Sovereign Cloud Stack (SCS) ist ein offener Referenz-Standard für souveräne Cloud-Infrastruktur (IaaS und KaaS), entwickelt von der OSB Alliance. Er definiert unter anderem Flavor-Naming, Storage-Klassen und IAM-Standards und bildet eine Grundlage des Deutschland-Stacks.",
				"en": "The Sovereign Cloud Stack (SCS) is an open reference standard for sovereign cloud infrastructure (IaaS and KaaS), developed by the OSB Alliance. It defines flavour naming, storage classes and IAM standards and is a foundation of the Germany Stack."
			},
			"homepage": "https://scs.community/",
			"tags": [
				"cloud",
				"sovereignty",
				"iaas",
				"germany"
			],
			"oss": true,
			"maturity": "incubation",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": false,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "spacy",
			"name": "spaCy",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "spaCy ist eine Python-Bibliothek für Natural Language Processing. Sie bietet Informationsextraktion, Textanalyse und Vorverarbeitung für Deep Learning. Die Bibliothek bietet gebrauchsfertige Modelle sowie die Möglichkeit zum Training eigener Modelle.",
				"en": ""
			},
			"homepage": "https://spacy.io/usage",
			"logo": "https://spacy.io/_static/logo.png",
			"tags": [
				"dl",
				"verarbeitung",
				"nlp"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://v2.spacy.io/"
			},
			"sovereigntyScore": 83
		},
		{
			"id": "spinnaker",
			"name": "Spinnaker",
			"layer": "building-blocks",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Spinnaker ist eine quelloffene Continuous-Delivery-(CD)-Plattform. Sie konzentriert sich auf die schnelle und sichere Bereitstellung von Softwareänderungen.",
				"en": ""
			},
			"homepage": "https://spinnaker.io/",
			"logo": "https://spinnaker.io/assets/images/spinnaker.svg",
			"tags": [
				"pipeline",
				"cd",
				"bereitstellung",
				"ci"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/spinnaker/spinnaker"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "spring-boot",
			"name": "Spring Boot",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Spring Boot ist ein Java-Framework für die schnelle Entwicklung produktionsreifer Microservices. Es ist De-facto-Standard für Backend-Services in zahlreichen GovTech-Stacks – darunter FIT-Connect, BundID, GovStack, India Stack (UPI) und MOSIP.",
				"en": "Spring Boot is a Java framework for rapidly building production-ready microservices. It is the de-facto standard for backend services in many GovTech stacks, including FIT-Connect, BundID, GovStack, India Stack (UPI) and MOSIP."
			},
			"homepage": "https://spring.io/projects/spring-boot",
			"license": "Apache-2.0",
			"tags": [
				"java",
				"framework",
				"microservices"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 88
		},
		{
			"id": "swift",
			"name": "Swift",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Swift dient für die Entwicklung von Apps für Apple-Geräte.",
				"en": ""
			},
			"homepage": "https://www.swift.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Swift_logo_with_text.svg",
			"tags": [
				"multi-plattform",
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.swift.org/documentation/"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "tailwind-css",
			"name": "Tailwind CSS",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Tailwind CSS ist ein Utility-First-CSS-Framework. Es ermöglicht schnelle, konsistente Styling-Workflows ohne komponentengetriebene CSS-Pflege und wird in vielen modernen Verwaltungs-UIs verwendet.",
				"en": "Tailwind CSS is a utility-first CSS framework. It enables fast, consistent styling workflows without component-driven CSS maintenance and is used in many modern public-administration UIs."
			},
			"homepage": "https://tailwindcss.com/",
			"license": "MIT",
			"tags": [
				"css",
				"frontend",
				"framework"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 83
		},
		{
			"id": "temporal-io",
			"name": "Temporal",
			"layer": "building-blocks",
			"sublayer": "lowcode",
			"description": {
				"de": "Temporal ist eine moderne Open-Source-Orchestrierungsplattform für codebasierte Workflows in Microservice-Architekturen. Sie übernimmt automatisches State-Management, Wiederaufnahme und Versionierung von langlaufenden Prozessen.",
				"en": "Temporal is a modern open-source orchestration platform for code-based workflows in microservice architectures. It handles automatic state management, resumption and versioning of long-running processes."
			},
			"homepage": "https://temporal.io/",
			"license": "MIT",
			"tags": [
				"workflow",
				"orchestration",
				"microservices"
			],
			"oss": true,
			"maturity": "incubation",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": false,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 78
		},
		{
			"id": "tensorflow",
			"name": "TensorFlow",
			"layer": "platform",
			"sublayer": "ki",
			"description": {
				"de": "TensorFlow ist eine Bibliothek für maschinelles Lernen und Künstliche Intelligen. Es wird insbesondere für Training und Inferenz von neuronalen Netzen eingesetzt.",
				"en": ""
			},
			"homepage": "https://www.tensorflow.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/TensorFlow_logo.svg",
			"tags": [
				"machine-learning",
				"inferenz",
				"verarbeitung",
				"training"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/tensorflow/serving"
			},
			"sovereigntyScore": 92
		},
		{
			"id": "terraform",
			"name": "Terraform",
			"layer": "platform",
			"sublayer": "inbetriebnahme",
			"description": {
				"de": "Terraform ist ein Open-Source-Werkzeug für Infrastructure-as-Code. Es ermöglicht das deklarative Provisioning von Cloud- und On-Premise-Ressourcen über Provider und sorgt für reproduzierbare, versionierte Infrastruktur-Setups.",
				"en": "Terraform is an open-source Infrastructure-as-Code tool. It enables declarative provisioning of cloud and on-premise resources via providers and produces reproducible, versioned infrastructure setups."
			},
			"homepage": "https://www.terraform.io/",
			"license": "BUSL-1.1",
			"tags": [
				"iac",
				"infrastructure",
				"automation"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "corporation"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 53
		},
		{
			"id": "traefik",
			"name": "Traefik",
			"layer": "platform",
			"sublayer": "integration",
			"description": {
				"de": "Traefik ist ein moderner, Cloud-nativer Open-Source-Reverse-Proxy und Load Balancer. Er integriert sich dynamisch in bestehende Infrastrukturen wie Docker und Kubernetes, verwaltet eingehenden Traffic und leitet ihn an die richtigen Dienste weiter.",
				"en": ""
			},
			"homepage": "https://traefik.io/traefik",
			"logo": "https://raw.githubusercontent.com/traefik/traefik/master/docs/content/assets/img/traefik.logo.png",
			"tags": [
				"proxy",
				"load-balancer",
				"orchestrierung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "community"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/traefik/traefik"
			},
			"sovereigntyScore": 97
		},
		{
			"id": "transmission-control-protocol-tcp",
			"name": "Transmission Control Protocol (TCP)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "TCP ist in Verbindung mit IP Kern für die Funktionsfähigkeit des Internet. Die Datenübertragung erfolgt durch Zerlegung in einzelne Pakete inklusive der Sicherstellung der Übermittlung.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc9293",
			"tags": [
				"paket",
				"datenuebertragung",
				"zustellung",
				"datenintegritaet"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "https://cdn.simpleicons.org/transmission",
			"sovereigntyScore": 90
		},
		{
			"id": "transport-layer-security-tls",
			"name": "Transport Layer Security (TLS)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "TLS dient der Verschlüsselung der Datenübertragung. TLS besteht aus dem Austausch von Schlüsseln, der Authentifizierung und der Realisierung der sicheren Datenübertragung.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/wg/tls/documents/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/OpenSSL_logo.svg",
			"tags": [
				"ssl",
				"sicherheit",
				"sdns",
				"datenuebertragung"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://datatracker.ietf.org/doc/html/rfc8446"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "typescript",
			"name": "TypeScript",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "TypeScript ist eine Programmiersprache die JavaScript um statische Typisierung erweitert.",
				"en": ""
			},
			"homepage": "https://www.typescriptlang.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Typescript_logo_2020.svg",
			"tags": [
				"programmierung",
				"sprache"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://www.typescriptlang.org/docs/handbook/intro.html"
			},
			"sovereigntyScore": 88
		},
		{
			"id": "typo3",
			"name": "TYPO3",
			"layer": "applications",
			"sublayer": "lowcode",
			"description": {
				"de": "TYPO3 ist ein in Europa entwickeltes Open-Source-Enterprise-CMS, das in vielen deutschsprachigen Behörden- und Hochschulportalen eingesetzt wird. Es bietet feingranulare Rechte und Mehrsprachigkeit.",
				"en": "TYPO3 is an enterprise open-source CMS developed in Europe and used by many German-speaking public-administration and higher-education portals. It offers fine-grained permissions and multilingual capabilities."
			},
			"homepage": "https://typo3.org/",
			"license": "GPL-2.0-or-later",
			"tags": [
				"cms",
				"egovernment",
				"europe"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 100
		},
		{
			"id": "unified-payments-interface-upi",
			"name": "Unified Payments Interface (UPI)",
			"layer": "applications",
			"sublayer": "integration",
			"description": {
				"de": "Das Unified Payments Interface (UPI) ist Indiens Echtzeit-Mobilzahlungssystem, betrieben von der NPCI. Es bildet die Zahlungsschicht des India Stack und verarbeitet inzwischen mehrere Milliarden Transaktionen pro Monat.",
				"en": "The Unified Payments Interface (UPI) is India's real-time mobile payment system, operated by the NPCI. It forms the payments layer of the India Stack and processes billions of transactions per month."
			},
			"homepage": "https://www.npci.org.in/what-we-do/upi/product-overview",
			"tags": [
				"egovernment",
				"payments",
				"india"
			],
			"oss": false,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": false,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": false,
				"matureProject": true,
				"selfHostable": false,
				"dataPortability": false,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 25
		},
		{
			"id": "user-datagram-protocol-udp",
			"name": "User Datagram Protocol (UDP)",
			"layer": "infrastructure",
			"sublayer": "transport",
			"description": {
				"de": "UDP ist ein einfaches Datenübertragungsprotokoll ohne Zusatzfunktionen.",
				"en": ""
			},
			"homepage": "https://datatracker.ietf.org/doc/html/rfc768",
			"tags": [
				"datenuebertragung",
				"echtzeit"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": false,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 90
		},
		{
			"id": "vuejs",
			"name": "Vue.js",
			"layer": "building-blocks",
			"sublayer": "entwicklung",
			"description": {
				"de": "Vue.js ist ein progressives JavaScript-Framework für die Erstellung von Benutzeroberflächen. Es ermöglicht die deklarative Entwicklung von interaktiven Web-Anwendungen mit reaktiven Datenmodellen.",
				"en": "Vue.js is a progressive JavaScript framework for building user interfaces. It enables declarative development of interactive web applications with reactive data models."
			},
			"homepage": "https://vuejs.org/",
			"logo": "https://raw.githubusercontent.com/vuejs/art/master/logo.svg",
			"tags": [
				"webframework",
				"user-interface",
				"javascript",
				"rendering"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": false,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://vuejs.org/guide/"
			},
			"sovereigntyScore": 90
		},
		{
			"id": "webkit",
			"name": "WebKit",
			"layer": "applications",
			"sublayer": "browser",
			"description": {
				"de": "WebKit ist eine Browser-Engine zum Rendern von Webseiten. Es wird insbesondere von Apple für Safari genutzt.",
				"en": ""
			},
			"homepage": "https://webkit.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/WebKit_logo_(2015-2023).svg",
			"tags": [
				"webseite",
				"browser-engine",
				"rendern"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": false,
				"noTelemetryByDefault": true,
				"ownerType": "corporation"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/WebKit/WebKit"
			},
			"sovereigntyScore": 78
		},
		{
			"id": "wifi",
			"name": "WiFi",
			"layer": "infrastructure",
			"sublayer": "anschluss",
			"description": {
				"de": "Mit Wireless LAN können in kleiner bis mittlerer Reichweite Endgeräte vernetzt werden (Ad-hoc, via Basisstation/ Access Point oder als Mesh). Die IEEE standardisiert die Technologie mit IEEE 802.11 ff. Die Konfiguration erfolgt durch SSID und Passwort. Wi-Fi dient als Kennzeichen für zertifizierte Produkte zur Sicherstellung von Interoperabilität.",
				"en": ""
			},
			"homepage": "https://www.wi-fi.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Wi-Fi_Logo.svg",
			"tags": [
				"funk",
				"hotspot",
				"tethering",
				"drahtlos"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://ieeexplore.ieee.org/browse/standards/get-program/page/series?id=68"
			},
			"sovereigntyScore": 95
		},
		{
			"id": "wordpress",
			"name": "WordPress",
			"layer": "applications",
			"sublayer": "lowcode",
			"description": {
				"de": "WordPress ist ein weit verbreitetes Open-Source-CMS für Websites und Blogs. Es wird in vielen Verwaltungs-Webauftritten und Informationsportalen eingesetzt.",
				"en": "WordPress is a widely used open-source CMS for websites and blogs. It is deployed by many public-administration websites and information portals."
			},
			"homepage": "https://wordpress.org/",
			"license": "GPL-2.0-or-later",
			"tags": [
				"cms",
				"blogging"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 95
		},
		{
			"id": "x-road",
			"name": "X-Road",
			"layer": "building-blocks",
			"sublayer": "integration",
			"description": {
				"de": "X-Road ist eine in Estland entwickelte Open-Source-Plattform für den sicheren, dezentralen Datenaustausch zwischen Behörden- und privaten Informationssystemen. Daten werden direkt zwischen Konsument und Provider ausgetauscht; ein Security Server kapselt Authentifizierung, Verschlüsselung, Signatur und Zeitstempel.",
				"en": "X-Road is an open-source data exchange layer originally developed in Estonia. It enables secure, decentralised, point-to-point exchange between public and private information systems; a Security Server encapsulates authentication, encryption, signing and time-stamping."
			},
			"homepage": "https://x-road.global/",
			"tags": [
				"egovernment",
				"integration",
				"interoperability",
				"estonia"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": true,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"logo": "assets/broken-logo.svg",
			"sovereigntyScore": 100
		},
		{
			"id": "yaml-ain-t-markup-language",
			"name": "YAML Ain't Markup Language",
			"layer": "platform",
			"sublayer": "daten",
			"description": {
				"de": "YAML ist ein Datenformat für den Datenaustausch.",
				"en": ""
			},
			"homepage": "https://yaml.org/",
			"logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Official_yaml_logo.svg",
			"tags": [
				"datenformat"
			],
			"oss": true,
			"maturity": "graduated",
			"sovereigntyCriteria": {
				"openSource": true,
				"euHeadquartered": false,
				"hasAudit": true,
				"permissiveLicense": true,
				"matureProject": true,
				"selfHostable": true,
				"dataPortability": true,
				"openStandards": true,
				"noTelemetryByDefault": true,
				"ownerType": "independentConsortium"
			},
			"audit": {
				"lastDate": "2025-11-11",
				"url": "https://github.com/yaml/"
			},
			"sovereigntyScore": 95
		}
	];

export const ITEMS: Item[] = RAW_ITEMS.map((item) => ({
	...item,
	logo: withAssetBaseUrl(item.logo),
}));

export const STACKS: Stack[] = [
		{
			"id": "australia",
			"name": {
				"de": "Australien Stack (DTA/CDR)",
				"en": "Australia Stack (DTA/CDR)"
			},
			"description": {
				"de": "Nationaler DPI-Stack mit Fokus auf Consumer Data Right, FAPI-Sicherheit und vertrauenswürdige digitale Identitäten.",
				"en": "National DPI stack focused on Consumer Data Right, FAPI security and trusted digital identities."
			},
			"country": "AU",
			"issuer": "Digital Transformation Agency (DTA)",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "json-web-tokens-jwt",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "JWTs sind Kernbestandteil der FAPI- und CDR-Sicherheitsarchitektur.",
						"en": "JWTs are a core part of the FAPI and CDR security architecture."
					}
				},
				{
					"itemId": "open-authorization-oauth",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "OAuth 2.0 ist zentral für Consent- und Autorisierungsflüsse im CDR.",
						"en": "OAuth 2.0 is central to consent and authorization flows in CDR."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "OIDC ergänzt OAuth für föderierte Identität und sichere Anmeldung.",
						"en": "OIDC complements OAuth for federated identity and secure login."
					}
				},
				{
					"itemId": "r",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "R wird in staatlichen Evaluations- und Datenanalyseprojekten eingesetzt.",
						"en": "R is used in public-sector evaluation and data analysis projects."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "React bildet die Basis für wiederverwendbare Civic-UI-Komponenten.",
						"en": "React provides the basis for reusable civic UI components."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "TLS/MTLS ist Pflicht für die abgesicherte Datenübertragung im CDR.",
						"en": "TLS/MTLS is mandatory for secure data transport in CDR."
					}
				}
			]
		},
		{
			"id": "brazil",
			"name": {
				"de": "Brasilien Stack (Gov.br/Pix)",
				"en": "Brazil Stack (Gov.br/Pix)"
			},
			"description": {
				"de": "Öffentliche DPI-Architektur rund um Gov.br-Identität, Echtzeit-Zahlungen und föderierte APIs.",
				"en": "Public DPI architecture centered on Gov.br identity, real-time payments and federated APIs."
			},
			"country": "BR",
			"issuer": "Secretaria de Governo Digital / Banco Central do Brasil",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Containerisierung wird für servicebasierte Gov.br-Workloads eingesetzt.",
						"en": "Containerization is used for service-based Gov.br workloads."
					}
				},
				{
					"itemId": "graphql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "GraphQL wird für datenreiche Integrations- und Portalanwendungen genutzt.",
						"en": "GraphQL is used for data-rich integration and portal applications."
					}
				},
				{
					"itemId": "keycloak",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Keycloak dient als zentraler IAM-Baustein in Gov.br-nahen Integrationen.",
						"en": "Keycloak serves as a central IAM building block in Gov.br-related integrations."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Kubernetes orchestriert skalierbare Microservices in föderalen Plattformen.",
						"en": "Kubernetes orchestrates scalable microservices across federal platforms."
					}
				},
				{
					"itemId": "nodejs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Node.js wird breit für API- und Integrationsdienste verwendet.",
						"en": "Node.js is widely used for API and integration services."
					}
				},
				{
					"itemId": "open-authorization-oauth",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "OAuth-basierte Föderation koppelt Fachverfahren an Gov.br-Identitäten.",
						"en": "OAuth-based federation connects domain systems to Gov.br identities."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "OIDC standardisiert sichere Login- und Token-Flüsse im Ökosystem.",
						"en": "OIDC standardizes secure login and token flows across the ecosystem."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "PostgreSQL ist ein häufig eingesetzter Datenspeicher für Verwaltungsdienste.",
						"en": "PostgreSQL is a common data store for public digital services."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "React treibt Benutzeroberflächen in Portalen und Signaturdiensten.",
						"en": "React powers user interfaces in portals and signature services."
					}
				}
			]
		},
		{
			"id": "canada",
			"name": {
				"de": "Kanada Stack (CDS)",
				"en": "Canada Stack (CDS)"
			},
			"description": {
				"de": "Cloud-native Stack des Canadian Digital Service mit TypeScript-Frontends, Python-APIs und IaC-Pipelines.",
				"en": "Cloud-native stack of the Canadian Digital Service with TypeScript frontends, Python APIs and IaC pipelines."
			},
			"country": "CA",
			"issuer": "Canadian Digital Service (CDS)",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Containerisierte Entwicklungs- und Testumgebungen erhöhen die Reproduzierbarkeit.",
						"en": "Containerized development and test environments improve reproducibility."
					}
				},
				{
					"itemId": "github-actions",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "GitHub Actions ist zentral für CI/CD im CDS-Portfolio.",
						"en": "GitHub Actions is central to CI/CD across the CDS portfolio."
					}
				},
				{
					"itemId": "nextjs",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Next.js wird für moderne, barrierefreie Service-Frontends eingesetzt.",
						"en": "Next.js is used for modern, accessible service frontends."
					}
				},
				{
					"itemId": "nodejs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Node.js unterstützt API-Dienste und SSR-Anwendungen.",
						"en": "Node.js supports API services and SSR applications."
					}
				},
				{
					"itemId": "python",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Python bildet die Basis asynchroner APIs wie bei Notify-Diensten.",
						"en": "Python powers asynchronous APIs such as notification services."
					}
				},
				{
					"itemId": "terraform",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Terraform orchestriert Cloud-Infrastruktur auf AWS und Azure.",
						"en": "Terraform orchestrates cloud infrastructure on AWS and Azure."
					}
				},
				{
					"itemId": "typescript",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "TypeScript ist bevorzugte Sprache für Frontend und Plattform-Clients.",
						"en": "TypeScript is the preferred language for frontend and platform clients."
					}
				}
			]
		},
		{
			"id": "cloud-gov",
			"name": {
				"de": "cloud.gov Stack",
				"en": "cloud.gov Stack"
			},
			"description": {
				"de": "US-Bundes-PaaS von der GSA mit Cloud-Foundry-Betrieb auf AWS GovCloud und starkem Open-Source-Fokus.",
				"en": "US federal PaaS by GSA operating Cloud Foundry on AWS GovCloud with a strong open-source focus."
			},
			"country": "US",
			"issuer": "U.S. General Services Administration (GSA)",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Containerisierte Workloads bilden die operative Basis der Plattform.",
						"en": "Containerized workloads form the operational base of the platform."
					}
				},
				{
					"itemId": "elasticsearch",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "OpenSearch/Elasticsearch-Muster für Logs und Suchindizes.",
						"en": "OpenSearch/Elasticsearch patterns are used for logs and search indexes."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Cloud-native Betriebsmodell mit orchestrierten Plattformkomponenten.",
						"en": "Cloud-native operations model with orchestrated platform components."
					}
				},
				{
					"itemId": "redis",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Redis wird als verwalteter Service-Baustein bereitgestellt.",
						"en": "Redis is provided as a managed service building block."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "TLS-Absicherung ist zentral für den Behördeneinsatz.",
						"en": "TLS protection is central for federal usage."
					}
				}
			]
		},
		{
			"id": "digit",
			"name": {
				"de": "DIGIT Stack",
				"en": "DIGIT Stack"
			},
			"description": {
				"de": "Offene DPI-Microservice-Plattform der eGovernments Foundation für kommunale und staatliche Dienste.",
				"en": "Open DPI microservice platform by eGovernments Foundation for municipal and state services."
			},
			"country": "IN",
			"issuer": "eGovernments Foundation",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "apache-kafka",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Kafka bildet die Event-Streaming-Schicht im DIGIT-Ökosystem.",
						"en": "Kafka forms the event-streaming layer in the DIGIT ecosystem."
					}
				},
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Containerisierung ist Grundlage der portablen Servicebereitstellung.",
						"en": "Containerization is the basis for portable service deployment."
					}
				},
				{
					"itemId": "elasticsearch",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Elasticsearch wird für Suche und Analyse in Fachdiensten genutzt.",
						"en": "Elasticsearch is used for search and analytics in domain services."
					}
				},
				{
					"itemId": "java",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Java ist die dominierende Sprache der Kern-Microservices.",
						"en": "Java is the dominant language for core microservices."
					}
				},
				{
					"itemId": "jenkins",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Jenkins treibt Build-, Test- und Release-Pipelines.",
						"en": "Jenkins drives build, test and release pipelines."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Kubernetes ist Zielplattform für skalierbare DIGIT-Deployments.",
						"en": "Kubernetes is the target platform for scalable DIGIT deployments."
					}
				},
				{
					"itemId": "postgresql",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "PostgreSQL ist Standarddatenspeicher für zahlreiche Module.",
						"en": "PostgreSQL is the standard datastore for many modules."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Spring Boot ist das zentrale Backend-Framework.",
						"en": "Spring Boot is the core backend framework."
					}
				},
				{
					"itemId": "terraform",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Terraform wird für Infrastrukturbereitstellung und Umgebungsautomation genutzt.",
						"en": "Terraform is used for infrastructure provisioning and environment automation."
					}
				}
			]
		},
		{
			"id": "ebsi",
			"name": {
				"de": "European Blockchain Services Infrastructure (EBSI)",
				"en": "European Blockchain Services Infrastructure (EBSI)"
			},
			"description": {
				"de": "Europäische, permissioned Blockchain-Infrastruktur mit APIs, Vertrauensdiensten und Governance für öffentliche Anwendungsfälle.",
				"en": "European permissioned blockchain infrastructure with APIs, trust services and governance for public-sector use cases."
			},
			"issuer": "European Commission",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "openapi",
					"status": "recommended",
					"role": "contributor",
					"rationale": {
						"de": "Öffentliche API-Schnittstellen werden dokumentiert und versioniert bereitgestellt.",
						"en": "Public API interfaces are documented and published in versioned form."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "OIDC-Muster werden für Identitäts- und Zugriffsflüsse genutzt.",
						"en": "OIDC patterns are used for identity and access flows."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "TLS ist Grundvoraussetzung für abgesicherte Knoten- und API-Kommunikation.",
						"en": "TLS is a baseline requirement for secure node and API communication."
					}
				}
			]
		},
		{
			"id": "estonia",
			"name": {
				"de": "Estland Stack",
				"en": "Estonia Stack"
			},
			"description": {
				"de": "Estnisches e-Government-Ökosystem mit X-Road als dezentraler Datenaustausch-Plattform und einem klaren Once-Only-Prinzip.",
				"en": "Estonia's e-government ecosystem built around X-Road as a decentralised data exchange platform and a clear once-only principle."
			},
			"country": "EE",
			"issuer": "Riigi Infosüsteemi Amet (RIA) / NIIS",
			"version": "0.1.0",
			"publishedAt": "2026-04-13",
			"items": [
				{
					"itemId": "x-road",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Kernkomponente des estnischen Stacks, von Estland und NIIS gepflegt.",
						"en": "Core component of the Estonia stack, maintained by Estonia and NIIS."
					}
				},
				{
					"itemId": "activemq-artemis",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Asynchrone Nachrichtenwarteschlangen rund um den X-Road Security Server.",
						"en": "Asynchronous message queues around the X-Road Security Server."
					}
				},
				{
					"itemId": "java",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Implementierungssprache des X-Road Security Servers.",
						"en": "Implementation language of the X-Road Security Server."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Backend-Microservices in der estnischen Verwaltungs-IT.",
						"en": "Backend microservices in Estonian public-administration IT."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standard-Datenbank für X-Road und angeschlossene Fachverfahren.",
						"en": "Standard database for X-Road and attached domain systems."
					}
				},
				{
					"itemId": "vuejs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Frontend-Framework des X-Road Admin UIs.",
						"en": "Frontend framework of the X-Road admin UI."
					}
				},
				{
					"itemId": "openapi",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "REST-Schnittstellen werden mit OpenAPI3 beschrieben.",
						"en": "REST services are described with OpenAPI3."
					}
				},
				{
					"itemId": "simple-object-access-protocol",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Legacy-SOAP-Dienste werden über X-Road weiter unterstützt.",
						"en": "Legacy SOAP services are still supported via X-Road."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Transportverschlüsselung zwischen Security Servern.",
						"en": "Transport encryption between Security Servers."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Föderierte Authentifizierung von Bürgern und Organisationen.",
						"en": "Federated authentication of citizens and organisations."
					}
				},
				{
					"itemId": "keycloak",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Häufig genutzter IAM-Provider in estnischen Behörden-Setups.",
						"en": "Frequently used IAM provider in Estonian agency setups."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container-Orchestrierung für moderne X-Road-Deployments.",
						"en": "Container orchestration for modern X-Road deployments."
					}
				},
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container-Orchestrierung in kleineren Setups.",
						"en": "Container orchestration in smaller setups."
					}
				}
			]
		},
		{
			"id": "european-union",
			"name": {
				"de": "EU Referenz-Stack (EIRA / EUDI)",
				"en": "EU Reference Stack (EIRA / EUDI)"
			},
			"description": {
				"de": "Supranationaler Referenz-Stack der Europäischen Kommission auf Basis der European Interoperability Reference Architecture (EIRA) und des EUDI Wallets.",
				"en": "Supranational reference stack from the European Commission based on the European Interoperability Reference Architecture (EIRA) and the EUDI Wallet."
			},
			"issuer": "Europäische Kommission / DG DIGIT",
			"version": "0.1.0",
			"publishedAt": "2026-04-13",
			"items": [
				{
					"itemId": "eudi-wallet",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Harmonisierte EU-weite digitale Brieftasche.",
						"en": "Harmonised EU-wide digital wallet."
					}
				},
				{
					"itemId": "keycloak",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Open-Source-IAM-Standard für eIDAS-konforme Login-Dienste.",
						"en": "Open-source IAM standard for eIDAS-compliant login services."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Föderiertes SSO als Standardbaustein des EIRA-Ökosystems.",
						"en": "Federated SSO as a standard building block of the EIRA ecosystem."
					}
				},
				{
					"itemId": "open-authorization-oauth",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Autorisierungs-Standard in EU-Diensten.",
						"en": "Authorisation standard in EU services."
					}
				},
				{
					"itemId": "openapi",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "API-Beschreibung als EIRA-konformer Architecture Building Block.",
						"en": "API description as an EIRA-compliant architecture building block."
					}
				},
				{
					"itemId": "comprehensive-knowledge-archive-network-ckan",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Open-Data-Plattform vieler europäischer Datenportale.",
						"en": "Open data platform used by many European data portals."
					}
				},
				{
					"itemId": "piveau",
					"status": "approved",
					"role": "contributor",
					"rationale": {
						"de": "EU-Datenkatalog-Implementierung in europaweiten Open-Data-Portalen.",
						"en": "EU data catalogue implementation used in pan-European open-data portals."
					}
				},
				{
					"itemId": "data-catalog-vocabulary-dcat",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standard-Vokabular für europäische Datenkataloge.",
						"en": "Standard vocabulary for European data catalogues."
					}
				},
				{
					"itemId": "java",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Backend-Sprache vieler EIRA-Referenzimplementierungen.",
						"en": "Backend language of many EIRA reference implementations."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Microservice-Framework in EU-Referenzprojekten.",
						"en": "Microservice framework in EU reference projects."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standard-Datenbank für EU-Referenzimplementierungen.",
						"en": "Standard database for EU reference implementations."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container-Orchestrierung in europäischen Cloud-Umgebungen.",
						"en": "Container orchestration in European cloud environments."
					}
				},
				{
					"itemId": "fido2-webauthn",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Phishing-resistente Authentifizierung im EUDI-Kontext.",
						"en": "Phishing-resistant authentication in the EUDI context."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standardverschlüsselung aller EU-API-Endpunkte.",
						"en": "Standard encryption for all EU API endpoints."
					}
				}
			]
		},
		{
			"id": "france",
			"name": {
				"de": "Frankreich Stack (DINUM/LaSuite)",
				"en": "France Stack (DINUM/LaSuite)"
			},
			"description": {
				"de": "Souveräner Kollaborations-Stack von DINUM mit ProConnect-SSO und modularen Open-Source-Diensten.",
				"en": "Sovereign collaboration stack by DINUM with ProConnect SSO and modular open-source services."
			},
			"country": "FR",
			"issuer": "DINUM / beta.gouv.fr",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Containerisierte Auslieferung für modulare Dienste der Suite Numérique.",
						"en": "Containerized delivery for modular services in Suite Numérique."
					}
				},
				{
					"itemId": "gitlab",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Open-Source-Entwicklung folgt einem GitLab-basierten kollaborativen Workflow.",
						"en": "Open-source development follows a GitLab-based collaborative workflow."
					}
				},
				{
					"itemId": "keycloak",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "IAM- und SSO-Muster mit OpenID Connect sind zentral für LaSuite.",
						"en": "IAM and OpenID Connect SSO patterns are central to LaSuite."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Kubernetes unterstützt den Betrieb verteilter Kollaborationsdienste.",
						"en": "Kubernetes supports operation of distributed collaboration services."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "OIDC ermöglicht föderierte Anmeldung über ProConnect-ähnliche IdP-Muster.",
						"en": "OIDC enables federated sign-in through ProConnect-like IdP patterns."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "PostgreSQL ist ein verbreiteter Datenspeicher in Verwaltungsdiensten.",
						"en": "PostgreSQL is a common data store in public services."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "React wird für modulare Frontends in staatlichen Portalen genutzt.",
						"en": "React is used for modular frontends in government portals."
					}
				}
			]
		},
		{
			"id": "germany",
			"name": {
				"de": "Deutschland Stack",
				"en": "Germany Stack"
			},
			"description": {
				"de": "Empfohlener und zugelassener Software-Stack für die deutsche öffentliche Verwaltung.",
				"en": "Recommended and approved software stack for German public administration."
			},
			"country": "DE",
			"issuer": "Bundesministeriums für Digitales und Staatsmodernisierung (BMDS)",
			"version": "0.1.0",
			"publishedAt": "2026-04-07",
			"items": [
				{
					"itemId": "advanced-encryption-standard",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "agent-network-protocol",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "agent-to-agent-protocol",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "agent-user-interaction-protocol-ag-ui",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "android",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "angel-ml",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "angular",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "appsmith",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "axolotl",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "blink",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "bluetooth",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "border-gateway-protocol-bgp",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "budibase",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "c",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "cassandra",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "chroma",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "circleci",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "comma-separated-values-csv",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "comprehensive-knowledge-archive-network-ckan",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "contour",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "couchdb",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "css",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "data-catalog-vocabulary-dcat",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "domain-name-system-dns",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "dynamic-host-configuration-protocol-dhcp",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "elliptic-curve-integrated-encryption-scheme",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "emissary-ingress",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "envoy-proxy",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "ethernet",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "extensible-markup-language-xml",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "file-transfer-protocol-uber-tls-ftps",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "flutter",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "flux",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "gecko",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "general-purpose-remote-procedure-calls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "github-actions",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "gitlab",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "glasfaser",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "go",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "graphql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "haystack",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "hbase",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "huggingface-transformers",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "hypertext-transfer-protocol-http",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "internal-gateway-protocols-igp",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "internet-message-access-protocol-secure-imaps",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "internet-protocol-security-ipsec",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "internet-protocol-version-6-ipv6",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "ios",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "istio",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "java",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "javascript-ecma-script",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "javascript-object-notation-json",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "jenkins",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "joget",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "json-web-tokens-jwt",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "kerberos",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "kong",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "langgraph",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "mariadb",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "markdown-md",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "media-access-control-mac",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "messaging-layer-security-mls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "milvus",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "mlflow",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "mobilfunk",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "model-context-protocol-mcp",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "module-lattice-based-key-encapsulation-mechanism",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "mongodb",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "multiprotocol-label-switching-mpls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "mysql-server",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "n8n",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "neo4j",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "nextjs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "nginx",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "node-red",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "nomad",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "nqdrant",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "one-time-password-otp",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "open-archives-initiative-protocol-for-metadata-harvesting",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "open-authorization-oauth",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "open-internet-exchange-point-ixp-oix-1",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "open-neural-network-exchange",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "open-shortest-path-first-ospf",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "openapi",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "openkruise",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "openshift-origin-okd",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "php",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "piveau",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "portainer",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "promptflow",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "pyro",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "python",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "pytorch",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "quick-udp-internet-connections-quic",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "r",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "ragflow",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "rancher",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "representational-state-transfer",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "resource-description-framework-rdf",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "rivest-shamir-adleman",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "robot-framework",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "rust",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "scylla",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "sd-wan-service-attributes-and-service-framework-mef",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "secure-hash-algorithm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "segment-routing-sr",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "selenium",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "session-initiation-protocol-sip",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "simple-mail-transfer-protocol-secure-smtps",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "simple-object-access-protocol",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "spacy",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "spinnaker",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "swift",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "tensorflow",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "traefik",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "transmission-control-protocol-tcp",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "typescript",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "user-datagram-protocol-udp",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "webkit",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "wifi",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				},
				{
					"itemId": "yaml-ain-t-markup-language",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Integriert in den Deutschland Stack",
						"en": "Integrated into Germany Stack"
					}
				}
			]
		},
		{
			"id": "govstack",
			"name": {
				"de": "GovStack Initiative",
				"en": "GovStack Initiative"
			},
			"description": {
				"de": "Internationale Initiative von Estland, Deutschland, ITU und DIAL für 19 essenzielle Digital-Public-Infrastructure-Building-Blocks und einen quelloffenen Werkzeugkasten.",
				"en": "International initiative by Estonia, Germany, ITU and DIAL defining 19 essential digital public infrastructure building blocks and an open-source toolkit."
			},
			"issuer": "ITU / DIAL / Estonia / Germany",
			"version": "0.1.0",
			"publishedAt": "2026-04-13",
			"items": [
				{
					"itemId": "govstack-information-mediator",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Zentraler Building Block für asynchronen Datenaustausch.",
						"en": "Central building block for asynchronous data exchange."
					}
				},
				{
					"itemId": "x-road",
					"status": "recommended",
					"role": "contributor",
					"rationale": {
						"de": "Bildet die Security-Server-Schicht des Information Mediators.",
						"en": "Provides the Security Server layer of the Information Mediator."
					}
				},
				{
					"itemId": "activemq-artemis",
					"status": "recommended",
					"role": "contributor",
					"rationale": {
						"de": "Asynchrone Nachrichtenwarteschlangen im Information Mediator.",
						"en": "Asynchronous message queues in the Information Mediator."
					}
				},
				{
					"itemId": "mosip",
					"status": "approved",
					"role": "contributor",
					"rationale": {
						"de": "Quelloffene Identitätsplattform – Referenz für Identification & Authentication BB.",
						"en": "Open-source identity platform – reference for the Identification & Authentication BB."
					}
				},
				{
					"itemId": "keycloak",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Verbreiteter IAM-Provider in GovStack-Implementierungen.",
						"en": "Widely used IAM provider in GovStack implementations."
					}
				},
				{
					"itemId": "java",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Hauptsprache der GovStack-Building-Blocks.",
						"en": "Primary language of the GovStack building blocks."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Microservice-Framework der GovStack-Referenzimplementierungen.",
						"en": "Microservice framework of GovStack reference implementations."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Frontend-Framework vieler GovStack-Portale.",
						"en": "Frontend framework of many GovStack portals."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standard-Datenbank für GovStack-Building-Blocks.",
						"en": "Standard database for GovStack building blocks."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container-Orchestrierung in der GovStack Sandbox.",
						"en": "Container orchestration in the GovStack sandbox."
					}
				},
				{
					"itemId": "openapi",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "GovSpec-konforme API-Beschreibung.",
						"en": "GovSpec-compliant API description."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Föderierte Authentifizierung in GovStack-BBs.",
						"en": "Federated authentication in GovStack BBs."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Transportverschlüsselung aller GovStack-Schnittstellen.",
						"en": "Transport encryption of all GovStack interfaces."
					}
				},
				{
					"itemId": "comprehensive-knowledge-archive-network-ckan",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Datenkatalog-Komponente in GovStack-Open-Data-Setups.",
						"en": "Data catalogue component in GovStack open-data setups."
					}
				}
			]
		},
		{
			"id": "india",
			"name": {
				"de": "India Stack",
				"en": "India Stack"
			},
			"description": {
				"de": "Sammlung offener APIs und Building Blocks für Identität, Daten und Zahlungen auf Bevölkerungsebene – betrieben von UIDAI, NPCI und MeitY.",
				"en": "A collection of open APIs and building blocks for identity, data and payments at population scale, operated by UIDAI, NPCI and MeitY."
			},
			"country": "IN",
			"issuer": "UIDAI / NPCI / MeitY",
			"version": "0.1.0",
			"publishedAt": "2026-04-13",
			"items": [
				{
					"itemId": "aadhaar",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Identitätsschicht des India Stack, betrieben von der UIDAI.",
						"en": "Identity layer of the India Stack, operated by UIDAI."
					}
				},
				{
					"itemId": "unified-payments-interface-upi",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Echtzeit-Zahlungsschicht des India Stack, betrieben von der NPCI.",
						"en": "Real-time payments layer of the India Stack, operated by NPCI."
					}
				},
				{
					"itemId": "digilocker",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Daten-/Dokumenten-Schicht für papierlose Verwaltung.",
						"en": "Data/document layer for paperless administration."
					}
				},
				{
					"itemId": "mosip",
					"status": "approved",
					"role": "contributor",
					"rationale": {
						"de": "Open-Source-Identitätsplattform mit Vorbildfunktion für andere Länder.",
						"en": "Open-source identity platform serving as a model for other countries."
					}
				},
				{
					"itemId": "java",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Hauptsprache der UPI- und MOSIP-Backends.",
						"en": "Primary language of the UPI and MOSIP backends."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "De-facto-Backend-Framework von UPI und MOSIP.",
						"en": "De-facto backend framework of UPI and MOSIP."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Frontend-Framework vieler India-Stack-Portale.",
						"en": "Frontend framework of many India Stack portals."
					}
				},
				{
					"itemId": "nodejs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Leichtgewichtige APIs und Tooling im India Stack.",
						"en": "Lightweight APIs and tooling in the India Stack."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standard-Datenbank für viele Backend-Services.",
						"en": "Standard database for many backend services."
					}
				},
				{
					"itemId": "apache-kafka",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Event-Streaming für UPI-Lastspitzen und Echtzeit-Verarbeitung.",
						"en": "Event streaming for UPI load peaks and real-time processing."
					}
				},
				{
					"itemId": "redis",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "In-Memory-Caching für hochfrequente UPI-Anfragen.",
						"en": "In-memory caching for high-frequency UPI requests."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container-Orchestrierung für skalierbare India-Stack-Services.",
						"en": "Container orchestration for scalable India Stack services."
					}
				},
				{
					"itemId": "open-authorization-oauth",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Autorisierung im DEPA-Consent-Layer.",
						"en": "Authorisation in the DEPA consent layer."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Transportverschlüsselung aller India-Stack-Endpunkte.",
						"en": "Transport encryption of all India Stack endpoints."
					}
				}
			]
		},
		{
			"id": "ons-digital-landscape",
			"name": {
				"de": "ONS Digital Landscape",
				"en": "ONS Digital Landscape"
			},
			"description": {
				"de": "Offen publizierte organisationsweite Technologie-Landscape-Plattform des UK Office for National Statistics.",
				"en": "Openly published organization-wide technology landscape platform by the UK Office for National Statistics."
			},
			"country": "GB",
			"issuer": "Office for National Statistics (ONS)",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "docker-swarm",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Containerisierte App-Bausteine unterstützen reproduzierbare Deployments.",
						"en": "Containerized app components support reproducible deployments."
					}
				},
				{
					"itemId": "github-actions",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "GitHub Actions ist Teil der öffentlich sichtbaren CI-Pipeline.",
						"en": "GitHub Actions is part of the publicly visible CI pipeline."
					}
				},
				{
					"itemId": "python",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Python wird für Backend- und Datenverarbeitungsdienste eingesetzt.",
						"en": "Python is used for backend and data-processing services."
					}
				},
				{
					"itemId": "react",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "React bildet die Frontend-Schicht der Landscape-Anwendung.",
						"en": "React forms the frontend layer of the landscape application."
					}
				},
				{
					"itemId": "terraform",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Terraform unterstützt Infrastrukturmanagement im Cloud-Betrieb.",
						"en": "Terraform supports infrastructure management for cloud operations."
					}
				}
			]
		},
		{
			"id": "opendesk",
			"name": {
				"de": "openDesk Stack",
				"en": "openDesk Stack"
			},
			"description": {
				"de": "Souveräne Workplace-Suite für die deutsche Verwaltung mit Kubernetes-Betrieb, IAM-Föderation und modularen OSS-Diensten.",
				"en": "Sovereign workplace suite for German public administration with Kubernetes operations, IAM federation and modular OSS services."
			},
			"country": "DE",
			"issuer": "ZenDiS",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "gitlab",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "openDesk wird offen über GitLab-Repositories entwickelt und veröffentlicht.",
						"en": "openDesk is openly developed and released through GitLab repositories."
					}
				},
				{
					"itemId": "helm",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Helm ist zentral für die paketierte Bereitstellung der Service-Landschaft.",
						"en": "Helm is central for packaged deployment of the service landscape."
					}
				},
				{
					"itemId": "keycloak",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Keycloak bildet die IAM- und SSO-Schicht für Föderation und Rollenmodelle.",
						"en": "Keycloak forms the IAM and SSO layer for federation and role models."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Kubernetes ist die empfohlene Laufzeit für den produktiven Betrieb.",
						"en": "Kubernetes is the recommended runtime for production operations."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "OIDC unterstützt standardisierte Login- und Föderationsflüsse.",
						"en": "OIDC supports standardized login and federation flows."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "PostgreSQL ist ein typischer Datenspeicher in den angebundenen Diensten.",
						"en": "PostgreSQL is a common datastore among integrated services."
					}
				}
			]
		},
		{
			"id": "rapidpro",
			"name": {
				"de": "RapidPro Stack",
				"en": "RapidPro Stack"
			},
			"description": {
				"de": "UNICEF-getriebene Open-Source-Messaging- und Workflow-Plattform für Regierungen und humanitäre Programme.",
				"en": "UNICEF-driven open-source messaging and workflow platform for governments and humanitarian programs."
			},
			"issuer": "UNICEF / Nyaruka",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "django",
					"status": "recommended",
					"role": "contributor",
					"rationale": {
						"de": "Django ist das zentrale Web-Framework der Plattform.",
						"en": "Django is the platform's central web framework."
					}
				},
				{
					"itemId": "elasticsearch",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Elasticsearch unterstützt Suche und Analyse großer Nachrichtenvolumina.",
						"en": "Elasticsearch supports search and analysis of large message volumes."
					}
				},
				{
					"itemId": "go",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Go-basierte Dienste ergänzen die Messaging-Verarbeitung.",
						"en": "Go-based services complement messaging processing."
					}
				},
				{
					"itemId": "postgresql",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "PostgreSQL speichert Kernzustände von Kontakten, Flows und Events.",
						"en": "PostgreSQL stores core state for contacts, flows and events."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "React wird für Teile der interaktiven Editor-Oberflächen genutzt.",
						"en": "React is used for parts of the interactive editor UI."
					}
				},
				{
					"itemId": "redis",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Redis dient als Queue-/Cache-Baustein im skalierbaren Nachrichtenbetrieb.",
						"en": "Redis acts as a queue/cache building block in scalable messaging operations."
					}
				}
			]
		},
		{
			"id": "singapore",
			"name": {
				"de": "Singapur Stack (SGTS)",
				"en": "Singapore Stack (SGTS)"
			},
			"description": {
				"de": "Singapore Government Tech Stack mit Fokus auf Wiederverwendbarkeit, Cybersecurity und Whole-of-Government Entwicklungsplattformen.",
				"en": "Singapore Government Tech Stack focused on reusability, cybersecurity and whole-of-government development platforms."
			},
			"country": "SG",
			"issuer": "GovTech Singapore",
			"version": "0.1.0",
			"publishedAt": "2026-04-13",
			"items": [
				{
					"itemId": "singpass",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Nationaler Login-Dienst der NDI-Plattform.",
						"en": "National login service of the NDI platform."
					}
				},
				{
					"itemId": "myinfo",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Datenfreigabe-Service mit Nutzerzustimmung im SGTS.",
						"en": "Consent-based data sharing service in SGTS."
					}
				},
				{
					"itemId": "java",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Backend-Sprache vieler SGTS-Komponenten.",
						"en": "Backend language of many SGTS components."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standard-Framework für SGTS-Microservices.",
						"en": "Standard framework for SGTS microservices."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Frontend vieler regierungsweiter Anwendungen.",
						"en": "Frontend of many whole-of-government applications."
					}
				},
				{
					"itemId": "nodejs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Leichtgewichtige APIs und Tooling im SGTS.",
						"en": "Lightweight APIs and tooling in SGTS."
					}
				},
				{
					"itemId": "go",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Performance-kritische Services und API-Gateways.",
						"en": "Performance-critical services and API gateways."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Bevorzugte relationale Datenbank im SGTS.",
						"en": "Preferred relational database in SGTS."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container Stack der SGTS Base Layer.",
						"en": "Container Stack of the SGTS base layer."
					}
				},
				{
					"itemId": "kong",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "API-Gateway für SGTS-Dienste.",
						"en": "API gateway for SGTS services."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standardprotokoll für Singpass-Logins.",
						"en": "Standard protocol for Singpass logins."
					}
				},
				{
					"itemId": "keycloak",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "IAM-Plattform in vielen SGTS-Deployments.",
						"en": "IAM platform in many SGTS deployments."
					}
				},
				{
					"itemId": "prometheus",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Monitoring-Komponente in StackOps.",
						"en": "Monitoring component in StackOps."
					}
				},
				{
					"itemId": "grafana",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Dashboards für SGTS Observability.",
						"en": "Dashboards for SGTS observability."
					}
				}
			]
		},
		{
			"id": "south-korea",
			"name": {
				"de": "Südkorea Stack (eGovFrame)",
				"en": "South Korea Stack (eGovFrame)"
			},
			"description": {
				"de": "Standardisierter Behörden-Stack auf Basis von eGovFrame zur Reduktion von Fragmentierung und Vendor-Lock-in.",
				"en": "Standardized public-sector stack built on eGovFrame to reduce fragmentation and vendor lock-in."
			},
			"country": "KR",
			"issuer": "Ministry of the Interior and Safety / NIA",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "java",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Java ist Kernsprache des eGovFrame-Runtime-Standards.",
						"en": "Java is the core language of the eGovFrame runtime standard."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container-Orchestrierung unterstützt moderne Betriebsmodelle im öffentlichen Sektor.",
						"en": "Container orchestration supports modern operating models in the public sector."
					}
				},
				{
					"itemId": "openapi",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "OpenAPI standardisiert Schnittstellen für wiederverwendbare Behördenmodule.",
						"en": "OpenAPI standardizes interfaces for reusable public modules."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "PostgreSQL wird als robuster Open-Source-Datenspeicher eingesetzt.",
						"en": "PostgreSQL is used as a robust open-source data store."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Spring-basierte Referenzarchitekturen prägen den eGovFrame-Stack.",
						"en": "Spring-based reference architectures shape the eGovFrame stack."
					}
				},
				{
					"itemId": "typescript",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "TypeScript unterstützt moderne, wartbare Frontend-Implementierungen.",
						"en": "TypeScript supports modern, maintainable frontend implementations."
					}
				}
			]
		},
		{
			"id": "thorium",
			"name": {
				"de": "CISA Thorium Stack",
				"en": "CISA Thorium Stack"
			},
			"description": {
				"de": "Offene Analyseplattform von CISA für automatisierte Malware-, Datei- und Forensikverarbeitung in Multi-Tenant-Umgebungen.",
				"en": "Open CISA analysis platform for automated malware, file and forensic processing in multi-tenant environments."
			},
			"country": "US",
			"issuer": "Cybersecurity and Infrastructure Security Agency (CISA)",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "elasticsearch",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Elastic-basierte Suche und Analyse ist Kern der Befundauswertung.",
						"en": "Elastic-based search and analytics is core to result evaluation."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Thorium wird als Kubernetes-native Plattform betrieben.",
						"en": "Thorium is operated as a Kubernetes-native platform."
					}
				},
				{
					"itemId": "redis",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Redis unterstützt Queueing und kurzfristige Statushaltung.",
						"en": "Redis supports queueing and short-lived state management."
					}
				},
				{
					"itemId": "scylla",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "ScyllaDB dient als persistenter Hochdurchsatz-Datenspeicher.",
						"en": "ScyllaDB acts as the persistent high-throughput datastore."
					}
				},
				{
					"itemId": "traefik",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Traefik wird als Ingress- und Routing-Komponente genutzt.",
						"en": "Traefik is used as ingress and routing component."
					}
				}
			]
		},
		{
			"id": "united-kingdom",
			"name": {
				"de": "UK GOV.UK Stack",
				"en": "UK GOV.UK Stack"
			},
			"description": {
				"de": "Government-as-a-Platform-Ansatz des britischen Government Digital Service mit GOV.UK One Login, Pay und Notify als zentralen Bausteinen.",
				"en": "The UK Government Digital Service's Government-as-a-Platform approach with GOV.UK One Login, Pay and Notify as central building blocks."
			},
			"country": "GB",
			"issuer": "Government Digital Service (GDS)",
			"version": "0.1.0",
			"publishedAt": "2026-04-13",
			"items": [
				{
					"itemId": "gov-uk-one-login",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Zentrales Identitätssystem für GOV.UK-Dienste.",
						"en": "Centralised identity system for GOV.UK services."
					}
				},
				{
					"itemId": "gov-uk-pay",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Standard-Zahlungsgateway für britische Behörden.",
						"en": "Standard payment gateway for UK government services."
					}
				},
				{
					"itemId": "gov-uk-notify",
					"status": "recommended",
					"role": "maintainer",
					"rationale": {
						"de": "Hochskalierbarer Benachrichtigungsdienst (E-Mail, SMS, Brief).",
						"en": "Highly scalable notification service (email, SMS, letter)."
					}
				},
				{
					"itemId": "ruby-on-rails",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Historische Kernsprache für GOV.UK-Plattformen.",
						"en": "Historical core language for GOV.UK platforms."
					}
				},
				{
					"itemId": "java",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Backend-Sprache für GOV.UK Pay und Notify.",
						"en": "Backend language for GOV.UK Pay and Notify."
					}
				},
				{
					"itemId": "spring-boot",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Microservice-Framework in GOV.UK-Plattformen.",
						"en": "Microservice framework in GOV.UK platforms."
					}
				},
				{
					"itemId": "python",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Eingesetzt in GOV.UK Notify und Datenanalyse.",
						"en": "Used in GOV.UK Notify and data analytics."
					}
				},
				{
					"itemId": "django",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Python-Framework für ausgewählte GOV.UK-Services.",
						"en": "Python framework for selected GOV.UK services."
					}
				},
				{
					"itemId": "nodejs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "JavaScript-Backends in GOV.UK-Anwendungen.",
						"en": "JavaScript backends in GOV.UK applications."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Frontend-Komponenten in GOV.UK-Tooling.",
						"en": "Frontend components in GOV.UK tooling."
					}
				},
				{
					"itemId": "postgresql",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Datenbank für GOV.UK Pay, Notify und weitere Services.",
						"en": "Database for GOV.UK Pay, Notify and other services."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Container-Orchestrierung im GOV.UK-Hosting.",
						"en": "Container orchestration in GOV.UK hosting."
					}
				},
				{
					"itemId": "open-id-connect-oidc",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Standardprotokoll für GOV.UK One Login.",
						"en": "Standard protocol for GOV.UK One Login."
					}
				},
				{
					"itemId": "transport-layer-security-tls",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Verschlüsselte Verbindungen in allen GOV.UK-Diensten.",
						"en": "Encrypted connections across all GOV.UK services."
					}
				}
			]
		},
		{
			"id": "united-states",
			"name": {
				"de": "USA Stack (USDS/18F)",
				"en": "US Stack (USDS/18F)"
			},
			"description": {
				"de": "Agiler Bundes-Stack mit Fokus auf Open Source, De-Risking, DevSecOps und automatisierte Deployments.",
				"en": "Agile federal stack focused on open source, de-risking, DevSecOps and automated deployments."
			},
			"country": "US",
			"issuer": "U.S. Digital Service (USDS) / 18F",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "github-actions",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "CI/CD-Automatisierung ist Kernprinzip des Digital Services Playbook.",
						"en": "CI/CD automation is a core principle of the Digital Services Playbook."
					}
				},
				{
					"itemId": "nodejs",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Node.js wird breit für föderale Web-Services und Tooling eingesetzt.",
						"en": "Node.js is widely used for federal web services and tooling."
					}
				},
				{
					"itemId": "openapi",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "OpenAPI erleichtert behördenübergreifende API-Standardisierung.",
						"en": "OpenAPI improves cross-agency API standardization."
					}
				},
				{
					"itemId": "python",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Python bleibt zentrale Sprache in Digital-Service- und Datenprojekten.",
						"en": "Python remains a central language in digital service and data projects."
					}
				},
				{
					"itemId": "react",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "React wird für performante, barrierearme Nutzeroberflächen eingesetzt.",
						"en": "React is used for performant, accessible user interfaces."
					}
				},
				{
					"itemId": "ruby-on-rails",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Ruby/Rails prägt historisch viele 18F- und GDS-nahe Service-Backends.",
						"en": "Ruby/Rails historically shaped many 18F and GDS-style service backends."
					}
				},
				{
					"itemId": "terraform",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Terraform unterstützt IaC in föderalen Multi-Cloud-Betriebsmodellen.",
						"en": "Terraform supports IaC in federal multi-cloud operating models."
					}
				}
			]
		},
		{
			"id": "wikimedia-production",
			"name": {
				"de": "Wikimedia Production Stack",
				"en": "Wikimedia Production Stack"
			},
			"description": {
				"de": "Produktionsnahe Betriebsarchitektur von Wikimedia mit Kubernetes, Observability und MediaWiki-nahen Diensten.",
				"en": "Production-oriented Wikimedia operations architecture with Kubernetes, observability and MediaWiki-adjacent services."
			},
			"issuer": "Wikimedia Foundation",
			"version": "0.1.0",
			"publishedAt": "2026-04-16",
			"items": [
				{
					"itemId": "apache-kafka",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Kafka wird für Logging- und Event-Pipelines eingesetzt.",
						"en": "Kafka is used for logging and event pipelines."
					}
				},
				{
					"itemId": "envoy-proxy",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Envoy übernimmt TLS- und Service-Mesh-nahe Proxy-Funktionen.",
						"en": "Envoy provides TLS and service-mesh-style proxy capabilities."
					}
				},
				{
					"itemId": "helm",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Helm/Helmfile-Muster steuern den Rollout von Produktionsdiensten.",
						"en": "Helm/Helmfile patterns control rollout of production services."
					}
				},
				{
					"itemId": "kubernetes",
					"status": "recommended",
					"role": "consumer",
					"rationale": {
						"de": "Kubernetes ist zentrale Laufzeitumgebung für moderne MediaWiki-Workloads.",
						"en": "Kubernetes is the central runtime for modern MediaWiki workloads."
					}
				},
				{
					"itemId": "prometheus",
					"status": "approved",
					"role": "consumer",
					"rationale": {
						"de": "Prometheus bildet den Kern des Metrik- und Monitoring-Stacks.",
						"en": "Prometheus forms the core of metrics and monitoring."
					}
				}
			]
		}
	];
