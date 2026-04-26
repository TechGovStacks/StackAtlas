# Plan: NEGZ-Stack-Items als neue Datenbasis hinzufügen

## Context

Die Datei `docs/stacks/NEGZ-Stack.de.csv` enthält Community-Feedback des NEGZ (Nationales E-Government Kompetenzzentrum) zum Deutschland-Stack. Darin sind ~495 Zeilen mit Technologievorschlägen (Urteil: fehlt/überflüssig/ändern).

**Ziel:**

1. Alle einzigartigen Technologien/Standards aus dem CSV in den `data/items/`-Katalog aufnehmen (neue Einträge anlegen, sofern noch nicht vorhanden)
2. Neuen Stack `data/stacks/negz.json` anlegen, der alle NEGZ-Items referenziert
3. Annahme: alle Items werden in den Stack aufgenommen — unabhängig vom Urteil (fehlt/überflüssig/ändern)

---

## Analyse der CSV

**CSV-Struktur:**

```
Urteil | Standard | Was ist das? | Warum nötig/unnötig? | Kontakt | Anmerkungen
```

**Zahlen:**

- ~495 Zeilen Gesamtinhalt
- ~200 eindeutige Technologienamen nach Deduplication
- ~40–50 bereits im Katalog vorhanden (z.B. postgresql, kubernetes, tls, mcp, oauth, yaml, soap, mls, gitlab, angular, react, github-actions, docker-swarm, portainer, openapi, python, typescript ...)
- ~150–160 neue Items zu erstellen

**Bekannte Duplikate im CSV** (erscheinen mehrfach unter identischem oder ähnlichem Namen):

- Redis (3×), RabbitMQ (3×), vLLM (2×), llm-d/Llm-d (2×), Vue.js (3×), .NET (3×), OpenTelemetry (3×), Grafana (+ Mimir/Loki/Tempo/Alloy), Matrix (4×), Knative (2×), SAML (3×), Keycloak (3×), BPMN (3×), Valkey (2×), Kafka/Apache Kafka (2×), Sigstore (2×), A2A (2×), Helm (2×), Protocol Buffers / Procol Buffers (Tippfehler, 2×), OSCI (3×), XÖV (2×)

---

## Umsetzungsplan

### Schritt 1: Import-Script schreiben

**Datei:** `scripts/import-negz-stack.mjs`

Das Script:

1. Liest `docs/stacks/NEGZ-Stack.de.csv` ein (Node.js, kein externes CSV-Paket nötig — manuelles Parsing via `fs.readFileSync`)
2. Parst alle Zeilen ab Zeile 14 (Datenstart nach Header-Block)
3. Extrahiert: `name`, `description` (Spalte 3), `rationale` (Spalte 4), `verdict` (Spalte 1)
4. Dedupliziert nach normalisiertem Namen (trim, lowercase-Vergleich, führende Tabs entfernen)
5. Überspringt meta-editorielle Einträge (siehe Liste unten)
6. Mapped Namen auf existierende Item-IDs (slug-Vergleich + Name-Matching gegen `data/items/*.json`)
7. Erstellt für neue Items minimale JSON-Dateien in `data/items/`
8. Erstellt `data/stacks/negz.json` mit allen Item-Referenzen

### Schritt 2: Script ausführen

```bash
node scripts/import-negz-stack.mjs
```

### Schritt 3: Qualitätssicherung & Formatierung

```bash
pnpm format
node scripts/validate-schemas.mjs
pnpm lint
pnpm test
pnpm build
```

### Schritt 4: Commit & Push auf Branch `claude/add-negz-stack-items-NLjIy`

```
feat: Add NEGZ stack and ~150 new items from community feedback
```

---

## Neues Stack-Objekt (`data/stacks/negz.json`)

```json
{
	"id": "negz",
	"name": { "de": "NEGZ-Empfehlungsstack", "en": "NEGZ Recommendation Stack" },
	"description": {
		"de": "Community-Feedback des NEGZ zu fehlenden und überflüssigen Standards im Deutschland-Stack.",
		"en": "NEGZ community feedback on missing and redundant standards in the Germany Stack."
	},
	"country": "DE",
	"issuer": "Nationales E-Government Kompetenzzentrum (NEGZ)",
	"version": "0.1.0",
	"publishedAt": "2026-04-26",
	"sources": [{ "label": { "de": "NEGZ-Feedback-CSV" }, "url": "https://negz.org" }],
	"items": [
		/* alle einzigartigen Items mit status: "recommended", role: "consumer" */
	]
}
```

---

## Item-Defaults für neue Einträge

```json
{
	"id": "<slug>",
	"name": "<Name aus CSV>",
	"layer": "<best-effort aus Kontext>",
	"description": { "de": "<Was ist das?-Text>" },
	"oss": true,
	"tags": [],
	"sovereigntyCriteria": {
		"openSource": false,
		"euHeadquartered": false,
		"hasAudit": false,
		"permissiveLicense": false,
		"matureProject": false,
		"selfHostable": false,
		"dataPortability": false,
		"openStandards": false,
		"noTelemetryByDefault": false
	}
}
```

**Layer-Zuordnung (Best-effort im Script via Keyword-Mapping):**

- `infrastructure`: Netzwerkprotokolle, Krypto, Storage, OS, Virtualisierung, Bare-Metal
- `platform`: Container, K8s-Tools, CI/CD, Observability, Messaging, Datenbanken, IAM
- `building-blocks`: Sprachen, Frameworks, Libraries, Serialisierungsformate, Test-Tools
- `applications`: Low-Code-Plattformen, DMS, Kommunikationslösungen, E-Government-Produkte
- `sovereign-standards`: XML-Standards (XÖV, OSCI, FIM), Accessibility, EUPL, eIDAS, Verwaltungsstandards

---

## Entschiedene Optionen

- **Meta-editorielle Einträge** → **werden übersprungen** (kein Layer, kein OSS-Flag sinnvoll abbildbar)
- **Proprietäre Items** (Azure DevOps, Telerik, UiPath, Snyk, ACR, SignalR, etc.) → **werden aufgenommen**, `oss: false`

**Zu überspringende Meta-Einträge:**
| Name im CSV | Grund |
|-------------|-------|
| Klare Trennung zwischen Technologie und Standards | Kein konkretes Tool |
| Horizontale Interoperabilitätsstandards für Verwaltungsanwendungen | Zu generisch |
| Verbindliche Integration des FIM-Baukasten als Systemstandard | Prozessanforderung |
| Vergabe- und Beschaffungsstandards, die Innovation ermöglichen | Rechtlich/Prozess |
| KMU-gerechte Beschaffungsstandards für spezialisierte IT-Anbieter | Rechtlich/Prozess |
| Betriebsplattformen / Betriebssysteme | Zu generisch |
| Standards für Logging, Monitoring und Analyse-Tools | Zu generisch |
| Architekturmuster | Zu generisch |
| OpenSource und digitale Souveränität | Meta-Prinzip |
| SLA-basierte Betriebsmodelle | Prozessanforderung |
| Standard für Identitäten | Zu generisch |
| Standard für Wallets | Zu generisch |
| Semantischer Standard | Zu generisch |
| Entwicklungsstandards | Zu generisch |
| Aufführen einzelner Algorithmen | Editorial-Kommentar |
| Trennung von Infrastruktur-Standards und Referenzimplementierungen | Meta-Prinzip |
| Orchestrierung | Zu generisch |
| UML-basierte Dokumentationen | Zu generisch |
| SBOMs (als generisches Konzept) | → CycloneDX/SPDX stattdessen |

---

## Kritische Dateien

| Datei                             | Aktion                           |
| --------------------------------- | -------------------------------- |
| `docs/stacks/NEGZ-Stack.de.csv`   | Input (nur gelesen)              |
| `docs/plans/negz-stack-import.md` | Dieser Plan                      |
| `scripts/import-negz-stack.mjs`   | Neu erstellen                    |
| `data/stacks/negz.json`           | Neu erstellen (via Script)       |
| `data/items/*.json`               | ~150 neue Dateien (via Script)   |
| `data/schemas/item.schema.json`   | Referenz (nicht geändert)        |
| `data/schemas/stack.schema.json`  | Referenz (nicht geändert)        |
| `scripts/validate-schemas.mjs`    | Zum Validieren der neuen Dateien |

---

## Verifikation

1. `node scripts/validate-schemas.mjs` — alle neuen Item-JSONs müssen schema-konform sein
2. `pnpm build` — Build muss erfolgreich sein
3. In der App: NEGZ-Stack erscheint in der Stack-Auswahl mit ~180–200 Items
4. Keine doppelten Item-IDs in `data/items/`
5. Keine doppelten `itemId`-Einträge im Stack

---

## Geschätzter Umfang

| Kategorie                               | Anzahl   |
| --------------------------------------- | -------- |
| Neue Item-JSON-Dateien                  | ~150–160 |
| Bereits vorhandene Items (referenziert) | ~40–50   |
| Stack-Items gesamt                      | ~190–200 |
| Übersprungene Duplikate                 | ~50–60   |
| Übersprungene Meta-Einträge             | ~15–20   |

## Anhang: Alle neu hinzugefügten NEGZ-Items (Arbeitsliste für StackAtlas-Eignung)

Stand: 2026-04-26. Quelle: `data/items/*.json` mit Tag `negz-import`.

Gesamt: **231** Items.

|   # | ID                                                                                                                 | Name                                                                                                                 | Layer               | Research-Status | Eignung (manuell) |
| --: | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------- | ----------------- |
|   1 | `802-11-bis-802-11-be`                                                                                             | 802.11 bis 802.11 be                                                                                                 | sovereign-standards | researched      | ☐                 |
|   2 | `acr-azure-container-registry`                                                                                     | ACR (Azure Container Registry)                                                                                       | platform            | researched      | ☐                 |
|   3 | `agentgateway`                                                                                                     | Agentgateway                                                                                                         | platform            | researched      | ☐                 |
|   4 | `ai-sdk-by-vercel`                                                                                                 | AI SDK by Vercel                                                                                                     | building-blocks     | researched      | ☐                 |
|   5 | `amqp`                                                                                                             | AMQP                                                                                                                 | sovereign-standards | researched      | ☐                 |
|   6 | `ams`                                                                                                              | AMS                                                                                                                  | applications        | researched      | ☐                 |
|   7 | `apache-camel-integration-framework`                                                                               | Apache Camel Integration Framework                                                                                   | platform            | researched      | ☐                 |
|   8 | `apache-spark`                                                                                                     | Apache Spark                                                                                                         | platform            | researched      | ☐                 |
|   9 | `apex-oracle`                                                                                                      | Apex Oracle                                                                                                          | applications        | researched      | ☐                 |
|  10 | `appian`                                                                                                           | Appian                                                                                                               | applications        | researched      | ☐                 |
|  11 | `arc42`                                                                                                            | arc42                                                                                                                | building-blocks     | researched      | ☐                 |
|  12 | `archimate`                                                                                                        | ArchiMate                                                                                                            | sovereign-standards | researched      | ☐                 |
|  13 | `argo-cd`                                                                                                          | Argo CD                                                                                                              | platform            | researched      | ☐                 |
|  14 | `argo-workflow`                                                                                                    | Argo Workflow                                                                                                        | platform            | researched      | ☐                 |
|  15 | `argocd`                                                                                                           | ArgoCD                                                                                                               | platform            | researched      | ☐                 |
|  16 | `asciidoc`                                                                                                         | AsciiDoc                                                                                                             | sovereign-standards | researched      | ☐                 |
|  17 | `atag-2-0-authoring-tool-accessibility-guidelines-w3c`                                                             | ATAG 2.0 – Authoring Tool Accessibility Guidelines (W3C)                                                             | sovereign-standards | researched      | ☐                 |
|  18 | `axon-ivy`                                                                                                         | Axon Ivy                                                                                                             | applications        | researched      | ☐                 |
|  19 | `azure-devops`                                                                                                     | Azure DevOps                                                                                                         | platform            | researched      | ☐                 |
|  20 | `blazor`                                                                                                           | Blazor                                                                                                               | building-blocks     | researched      | ☐                 |
|  21 | `bpmn`                                                                                                             | BPMN                                                                                                                 | sovereign-standards | researched      | ☐                 |
|  22 | `bpmn-v2-0`                                                                                                        | BPMN V2.0                                                                                                            | sovereign-standards | researched      | ☐                 |
|  23 | `bruno`                                                                                                            | Bruno                                                                                                                | building-blocks     | researched      | ☐                 |
|  24 | `c-razor`                                                                                                          | C# Razor                                                                                                             | building-blocks     | researched      | ☐                 |
|  25 | `cargo`                                                                                                            | Cargo                                                                                                                | building-blocks     | researched      | ☐                 |
|  26 | `cdxgen`                                                                                                           | cdxgen                                                                                                               | building-blocks     | researched      | ☐                 |
|  27 | `ceph`                                                                                                             | Ceph                                                                                                                 | infrastructure      | researched      | ☐                 |
|  28 | `cloudogu-ecosystem`                                                                                               | Cloudogu EcoSystem                                                                                                   | platform            | researched      | ☐                 |
|  29 | `cmake`                                                                                                            | CMake                                                                                                                | building-blocks     | researched      | ☐                 |
|  30 | `cmmn`                                                                                                             | CMMN                                                                                                                 | sovereign-standards | researched      | ☐                 |
|  31 | `com-adeona`                                                                                                       | COM Adeona                                                                                                           | applications        | researched      | ☐                 |
|  32 | `com-despina`                                                                                                      | COM Despina                                                                                                          | sovereign-standards | researched      | ☐                 |
|  33 | `com-tauri`                                                                                                        | COM Tauri                                                                                                            | sovereign-standards | researched      | ☐                 |
|  34 | `conan`                                                                                                            | Conan                                                                                                                | building-blocks     | researched      | ☐                 |
|  35 | `contextforge`                                                                                                     | ContextForge                                                                                                         | sovereign-standards | researched      | ☐                 |
|  36 | `cyclonedx`                                                                                                        | CycloneDX                                                                                                            | sovereign-standards | researched      | ☐                 |
|  37 | `dapr`                                                                                                             | Dapr                                                                                                                 | platform            | researched      | ☐                 |
|  38 | `data-aeonia`                                                                                                      | DATA Aeonia                                                                                                          | applications        | researched      | ☐                 |
|  39 | `data-sign`                                                                                                        | DATA Sign                                                                                                            | sovereign-standards | researched      | ☐                 |
|  40 | `data-varuna`                                                                                                      | DATA Varuna                                                                                                          | sovereign-standards | researched      | ☐                 |
|  41 | `datadog-vektor`                                                                                                   | Datadog Vektor                                                                                                       | sovereign-standards | researched      | ☐                 |
|  42 | `dataprepkit`                                                                                                      | DataPrepKit                                                                                                          | sovereign-standards | researched      | ☐                 |
|  43 | `datenschutzcockpit`                                                                                               | Datenschutzcockpit                                                                                                   | applications        | researched      | ☐                 |
|  44 | `din-5008`                                                                                                         | Din 5008                                                                                                             | sovereign-standards | researched      | ☐                 |
|  45 | `din-91379`                                                                                                        | DIN 91379                                                                                                            | sovereign-standards | researched      | ☐                 |
|  46 | `din-spec-66336-servicestandard-qualitatsanforderungen-fur-onlineservices-und-portale-der-offentlichen-verwaltung` | DIN SPEC 66336 – Servicestandard: Qualitätsanforderungen für Onlineservices und -portale der öffentlichen Verwaltung | sovereign-standards | researched      | ☐                 |
|  47 | `dmn`                                                                                                              | DMN                                                                                                                  | sovereign-standards | researched      | ☐                 |
|  48 | `docker`                                                                                                           | Docker                                                                                                               | platform            | researched      | ☐                 |
|  49 | `docling`                                                                                                          | Docling                                                                                                              | sovereign-standards | researched      | ☐                 |
|  50 | `dokumentenmanagement-systeme-wie-docuware-u-a`                                                                    | Dokumentenmanagement-Systeme wie Docuware u.a.                                                                       | sovereign-standards | researched      | ☐                 |
|  51 | `dvdv`                                                                                                             | DVDV                                                                                                                 | sovereign-standards | researched      | ☐                 |
|  52 | `e164`                                                                                                             | E164                                                                                                                 | sovereign-standards | researched      | ☐                 |
|  53 | `ebms-as4`                                                                                                         | ebMS/AS4                                                                                                             | sovereign-standards | researched      | ☐                 |
|  54 | `ecdsa`                                                                                                            | ECDSA                                                                                                                | sovereign-standards | researched      | ☐                 |
|  55 | `ed25519-eddsa`                                                                                                    | Ed25519 (EdDSA)                                                                                                      | sovereign-standards | researched      | ☐                 |
|  56 | `eforms-de`                                                                                                        | eForms-DE                                                                                                            | sovereign-standards | researched      | ☐                 |
|  57 | `eforms-unterschwelle`                                                                                             | eForms Unterschwelle                                                                                                 | sovereign-standards | researched      | ☐                 |
|  58 | `egvp`                                                                                                             | EGVP                                                                                                                 | sovereign-standards | researched      | ☐                 |
|  59 | `egvp-postacher-in-der-rolle-bebpo`                                                                                | EGVP Postächer in der Rolle BeBPo                                                                                    | applications        | researched      | ☐                 |
|  60 | `eidas-2-0`                                                                                                        | eIDAS 2.0                                                                                                            | sovereign-standards | researched      | ☐                 |
|  61 | `elsa`                                                                                                             | Elsa                                                                                                                 | sovereign-standards | researched      | ☐                 |
|  62 | `emrex`                                                                                                            | emrex                                                                                                                | sovereign-standards | researched      | ☐                 |
|  63 | `en-301-549-accessibility-requirements-for-ict-products-and-services`                                              | EN 301 549 – Accessibility requirements for ICT products and services                                                | sovereign-standards | researched      | ☐                 |
|  64 | `epub-accessibility-iso-iec-23761-barrierefreie-e-publikationen`                                                   | EPUB Accessibility / ISO/IEC 23761 – Barrierefreie E-Publikationen                                                   | sovereign-standards | researched      | ☐                 |
|  65 | `etcd`                                                                                                             | etcd                                                                                                                 | platform            | researched      | ☐                 |
|  66 | `etsi-en-119-461-v2`                                                                                               | ETSI EN 119 461 v2                                                                                                   | sovereign-standards | researched      | ☐                 |
|  67 | `fido2-standards`                                                                                                  | FIDO2-Standards                                                                                                      | sovereign-standards | researched      | ☐                 |
|  68 | `fim-datenstandard`                                                                                                | FIM-Datenstandard                                                                                                    | sovereign-standards | researched      | ☐                 |
|  69 | `fluentd`                                                                                                          | Fluentd                                                                                                              | platform            | researched      | ☐                 |
|  70 | `forgejo`                                                                                                          | Forgejo                                                                                                              | platform            | researched      | ☐                 |
|  71 | `form-io`                                                                                                          | form.io                                                                                                              | building-blocks     | unresearched    | ☐                 |
|  72 | `gateway-api`                                                                                                      | Gateway API                                                                                                          | sovereign-standards | unresearched    | ☐                 |
|  73 | `gemma`                                                                                                            | Gemma                                                                                                                | sovereign-standards | unresearched    | ☐                 |
|  74 | `geo-sparql`                                                                                                       | (Geo)SPARQL                                                                                                          | sovereign-standards | unresearched    | ☐                 |
|  75 | `git`                                                                                                              | git                                                                                                                  | sovereign-standards | unresearched    | ☐                 |
|  76 | `gitlabrunner`                                                                                                     | GitlabRunner                                                                                                         | sovereign-standards | unresearched    | ☐                 |
|  77 | `gnu-taler`                                                                                                        | GNU Taler                                                                                                            | sovereign-standards | unresearched    | ☐                 |
|  78 | `governikus-multi-messenger`                                                                                       | Governikus Multi Messenger                                                                                           | sovereign-standards | unresearched    | ☐                 |
|  79 | `grafana-alloy`                                                                                                    | Grafana Alloy                                                                                                        | sovereign-standards | unresearched    | ☐                 |
|  80 | `grafana-loki`                                                                                                     | Grafana Loki                                                                                                         | sovereign-standards | unresearched    | ☐                 |
|  81 | `grafana-mimir`                                                                                                    | Grafana Mimir                                                                                                        | sovereign-standards | unresearched    | ☐                 |
|  82 | `grafana-tempo`                                                                                                    | Grafana Tempo                                                                                                        | sovereign-standards | unresearched    | ☐                 |
|  83 | `haproxy`                                                                                                          | Haproxy                                                                                                              | sovereign-standards | unresearched    | ☐                 |
|  84 | `harbor`                                                                                                           | Harbor                                                                                                               | sovereign-standards | unresearched    | ☐                 |
|  85 | `harvester`                                                                                                        | Harvester                                                                                                            | sovereign-standards | unresearched    | ☐                 |
|  86 | `hashicorp-vault-secret-management`                                                                                | HashiCorp Vault Secret Management                                                                                    | sovereign-standards | unresearched    | ☐                 |
|  87 | `hive`                                                                                                             | Hive                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
|  88 | `iceberg`                                                                                                          | Iceberg                                                                                                              | sovereign-standards | unresearched    | ☐                 |
|  89 | `id-crucis`                                                                                                        | ID Crucis                                                                                                            | sovereign-standards | unresearched    | ☐                 |
|  90 | `id-mercury`                                                                                                       | ID Mercury                                                                                                           | sovereign-standards | unresearched    | ☐                 |
|  91 | `id-panstar`                                                                                                       | ID Panstar                                                                                                           | sovereign-standards | unresearched    | ☐                 |
|  92 | `imap`                                                                                                             | IMAP                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
|  93 | `influxdb`                                                                                                         | InfluxDB                                                                                                             | sovereign-standards | unresearched    | ☐                 |
|  94 | `ingrid-vkoopuis`                                                                                                  | InGrid/VKoopUIS                                                                                                      | sovereign-standards | unresearched    | ☐                 |
|  95 | `iso-9241-171-2025-ergonomics-of-human-system-interaction-software-accessibility`                                  | ISO 9241-171:2025 – Ergonomics of human-system interaction: Software accessibility                                   | sovereign-standards | unresearched    | ☐                 |
|  96 | `iso-9241-normenreihe-ergonomie-der-mensch-system-interaktion`                                                     | ISO 9241 (Normenreihe) - Ergonomie der Mensch-System-Interaktion                                                     | sovereign-standards | unresearched    | ☐                 |
|  97 | `iso-iec-19757-3-schematron`                                                                                       | ISO/IEC 19757-3 (Schematron)                                                                                         | sovereign-standards | unresearched    | ☐                 |
|  98 | `itil`                                                                                                             | ITIL                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
|  99 | `jaeger`                                                                                                           | Jaeger                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 100 | `janus-server`                                                                                                     | Janus Server                                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 101 | `jquery`                                                                                                           | jQuery                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 102 | `json-schema`                                                                                                      | JSON Schema                                                                                                          | sovereign-standards | unresearched    | ☐                 |
| 103 | `json-web-encryption-jwe`                                                                                          | JSON Web Encryption (JWE)                                                                                            | sovereign-standards | unresearched    | ☐                 |
| 104 | `k6`                                                                                                               | k6                                                                                                                   | sovereign-standards | unresearched    | ☐                 |
| 105 | `kafka`                                                                                                            | Kafka                                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 106 | `kern-ux-standard`                                                                                                 | KERN UX-Standard                                                                                                     | sovereign-standards | unresearched    | ☐                 |
| 107 | `kitten`                                                                                                           | Kitten                                                                                                               | applications        | unresearched    | ☐                 |
| 108 | `knative`                                                                                                          | Knative                                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 109 | `knockoutjs`                                                                                                       | KnockoutJS                                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 110 | `kotlin`                                                                                                           | Kotlin                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 111 | `kotlin-multiplatform`                                                                                             | Kotlin Multiplatform                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 112 | `krypto-agilitat-standards-ff`                                                                                     | Krypto Agilität Standards ff                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 113 | `kubewarden`                                                                                                       | kubewarden                                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 114 | `lightllm`                                                                                                         | LightLLM                                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 115 | `llm-d`                                                                                                            | llm-d                                                                                                                | infrastructure      | unresearched    | ☐                 |
| 116 | `longhorn`                                                                                                         | Longhorn                                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 117 | `markdown-commonmark-spezifikation-rfc-7763`                                                                       | Markdown (CommonMark-Spezifikation / RFC 7763)                                                                       | sovereign-standards | unresearched    | ☐                 |
| 118 | `matrix`                                                                                                           | Matrix                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 119 | `mcprouter-microsoft`                                                                                              | MCPRouter (Microsoft)                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 120 | `mein-unternehmenskonto-muk`                                                                                       | Mein Unternehmenskonto (MUK)                                                                                         | applications        | unresearched    | ☐                 |
| 121 | `msbuild`                                                                                                          | MSBuild                                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 122 | `mtls`                                                                                                             | mTLS                                                                                                                 | infrastructure      | unresearched    | ☐                 |
| 123 | `nats`                                                                                                             | NATS                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 124 | `net`                                                                                                              | .NET                                                                                                                 | platform            | unresearched    | ☐                 |
| 125 | `net-aspire`                                                                                                       | .NET Aspire                                                                                                          | sovereign-standards | unresearched    | ☐                 |
| 126 | `newtonsoft-json`                                                                                                  | Newtonsoft.Json                                                                                                      | sovereign-standards | unresearched    | ☐                 |
| 127 | `nfs-network-file-system`                                                                                          | NFS Network File System                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 128 | `npm`                                                                                                              | npm                                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 129 | `nuget`                                                                                                            | NuGet                                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 130 | `nuke-build`                                                                                                       | NUKE.build                                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 131 | `nvidia-gpu-operator`                                                                                              | Nvidia GPU-Operator                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 132 | `oci-image-format`                                                                                                 | OCI Image Format                                                                                                     | sovereign-standards | unresearched    | ☐                 |
| 133 | `one-time-password-otp-fur-multi-faktor-authentifizierung-mfa`                                                     | One-Time Password (OTP) für Multi-Faktor-Authentifizierung (MFA)                                                     | sovereign-standards | unresearched    | ☐                 |
| 134 | `open-build-service`                                                                                               | Open Build Service                                                                                                   | sovereign-standards | unresearched    | ☐                 |
| 135 | `openbao`                                                                                                          | OpenBao                                                                                                              | platform            | unresearched    | ☐                 |
| 136 | `opencluster-management`                                                                                           | OpenCluster Management                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 137 | `opendocument-format-odf`                                                                                          | OpenDocument Format (ODF)                                                                                            | sovereign-standards | unresearched    | ☐                 |
| 138 | `opengdx`                                                                                                          | OpenGDX                                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 139 | `openresponses`                                                                                                    | OpenResponses                                                                                                        | sovereign-standards | unresearched    | ☐                 |
| 140 | `opensearch`                                                                                                       | OpenSearch                                                                                                           | applications        | unresearched    | ☐                 |
| 141 | `openvox`                                                                                                          | openVOX                                                                                                              | applications        | unresearched    | ☐                 |
| 142 | `operator-framework-fur-deskriptive-erweiterungen-von-kubernetes`                                                  | Operator Framework für deskriptive Erweiterungen von Kubernetes                                                      | sovereign-standards | unresearched    | ☐                 |
| 143 | `osci`                                                                                                             | OSCI                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 144 | `osci-soap`                                                                                                        | OSCI \| SOAP                                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 145 | `osci-xta`                                                                                                         | OSCI, XTA                                                                                                            | sovereign-standards | unresearched    | ☐                 |
| 146 | `osci-xta-soap`                                                                                                    | OSCI \| XTA \| SOAP                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 147 | `ovn`                                                                                                              | OvN                                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 148 | `owasp-dependency-track`                                                                                           | OWASP Dependency-Track                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 149 | `ozg-cloud`                                                                                                        | OZG Cloud                                                                                                            | platform            | unresearched    | ☐                 |
| 150 | `pdf-a`                                                                                                            | PDF/A                                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 151 | `peppol-bis-spezifikationen`                                                                                       | Peppol BIS Spezifikationen                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 152 | `peppol-edelivery-network`                                                                                         | Peppol eDelivery Network                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 153 | `peppol-netzwerk`                                                                                                  | Peppol Netzwerk                                                                                                      | sovereign-standards | unresearched    | ☐                 |
| 154 | `persistent-identifier-pids`                                                                                       | Persistent Identifier (PIDs)                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 155 | `pgvector`                                                                                                         | pgvector                                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 156 | `phi`                                                                                                              | Phi                                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 157 | `playwright`                                                                                                       | Playwright                                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 158 | `podman`                                                                                                           | Podman                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 159 | `pop3`                                                                                                             | POP3                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 160 | `presto`                                                                                                           | Presto                                                                                                               | infrastructure      | unresearched    | ☐                 |
| 161 | `procol-buffers`                                                                                                   | Procol Buffers                                                                                                       | sovereign-standards | unresearched    | ☐                 |
| 162 | `protocol-buffers-protobuf`                                                                                        | Protocol Buffers (Protobuf)                                                                                          | sovereign-standards | unresearched    | ☐                 |
| 163 | `quay`                                                                                                             | Quay                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 164 | `referenzimplementierung-fur-bare-metal-iaas`                                                                      | Referenzimplementierung für Bare-Metal IaaS                                                                          | sovereign-standards | unresearched    | ☐                 |
| 165 | `renovate-bot`                                                                                                     | Renovate Bot                                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 166 | `rook`                                                                                                             | Rook                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 167 | `s3-api-minio-eine-implementierung`                                                                                | S3 (API) - MinIO (eine Implementierung)                                                                              | sovereign-standards | unresearched    | ☐                 |
| 168 | `safe`                                                                                                             | SAFE                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 169 | `saml`                                                                                                             | SAML                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 170 | `sboms`                                                                                                            | SBOMs                                                                                                                | applications        | unresearched    | ☐                 |
| 171 | `scala`                                                                                                            | Scala                                                                                                                | building-blocks     | unresearched    | ☐                 |
| 172 | `schematron`                                                                                                       | Schematron                                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 173 | `sealed-secrets`                                                                                                   | Sealed Secrets                                                                                                       | sovereign-standards | unresearched    | ☐                 |
| 174 | `securitysuitabilitypolicy-rfc-5698`                                                                               | SecuritySuitabilityPolicy / RFC 5698                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 175 | `semantic-kernel-agentic-framework`                                                                                | Semantic Kernel (Agentic Framework)                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 176 | `semic-spezifikationen`                                                                                            | SEMIC-Spezifikationen                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 177 | `seq`                                                                                                              | seq                                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 178 | `sha`                                                                                                              | SHA                                                                                                                  | infrastructure      | unresearched    | ☐                 |
| 179 | `shacl`                                                                                                            | SHACL                                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 180 | `signalr`                                                                                                          | SignalR                                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 181 | `sigstore`                                                                                                         | Sigstore                                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 182 | `sles-suse-linux-enterprise-server`                                                                                | SLES Suse Linux Enterprise Server                                                                                    | infrastructure      | unresearched    | ☐                 |
| 183 | `slsa`                                                                                                             | SLSA                                                                                                                 | applications        | unresearched    | ☐                 |
| 184 | `smtp`                                                                                                             | SMTP                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 185 | `snyk`                                                                                                             | Snyk                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 186 | `solid-social-linked-data`                                                                                         | Solid (Social Linked Data)                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 187 | `sonarqube`                                                                                                        | SonarQube                                                                                                            | sovereign-standards | unresearched    | ☐                 |
| 188 | `spdx`                                                                                                             | SPDX                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 189 | `spiffe-spire`                                                                                                     | SPIFFE/SPIRE                                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 190 | `sqlite`                                                                                                           | SQLite                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 191 | `stackrox`                                                                                                         | StackRox                                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 192 | `standards-fur-tests-mocks-ci-cd`                                                                                  | Standards für Tests, Mocks, CI/CD                                                                                    | sovereign-standards | unresearched    | ☐                 |
| 193 | `swec-software-entwicklungsplattform-cloud`                                                                        | SWEC - Software Entwicklungsplattform Cloud                                                                          | applications        | researched      | ☐                 |
| 194 | `tekton`                                                                                                           | Tekton                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 195 | `telerik`                                                                                                          | Telerik                                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 196 | `terrascan`                                                                                                        | Terrascan                                                                                                            | sovereign-standards | unresearched    | ☐                 |
| 197 | `thanos`                                                                                                           | Thanos                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 198 | `time-based-one-time-password-totp-fur-multi-faktor-authentifizierung-mfa`                                         | Time-based one-time password (TOTP) für Multi-Faktor-Authentifizierung (MFA)                                         | applications        | unresearched    | ☐                 |
| 199 | `togaf`                                                                                                            | TOGAF                                                                                                                | applications        | unresearched    | ☐                 |
| 200 | `toon`                                                                                                             | TOON                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 201 | `trivy`                                                                                                            | Trivy                                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 202 | `uipath`                                                                                                           | UiPath                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 203 | `universal-business-language-ubl-iso-iec-19845`                                                                    | Universal Business Language (UBL) ISO/IEC 19845                                                                      | sovereign-standards | unresearched    | ☐                 |
| 204 | `validator`                                                                                                        | validator                                                                                                            | sovereign-standards | unresearched    | ☐                 |
| 205 | `valkey`                                                                                                           | Valkey                                                                                                               | applications        | unresearched    | ☐                 |
| 206 | `vllm`                                                                                                             | vLLM                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 207 | `wai-aria-1-2-accessible-rich-internet-applications-w3c`                                                           | WAI-ARIA 1.2 – Accessible Rich Internet Applications (W3C)                                                           | sovereign-standards | unresearched    | ☐                 |
| 208 | `webassembly-wasm`                                                                                                 | WebAssembly (WASM)                                                                                                   | sovereign-standards | unresearched    | ☐                 |
| 209 | `webpack`                                                                                                          | Webpack                                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 210 | `webrtc`                                                                                                           | WebRTC                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 211 | `websockets`                                                                                                       | WebSockets                                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 212 | `xbestellung`                                                                                                      | XBestellung                                                                                                          | sovereign-standards | unresearched    | ☐                 |
| 213 | `xdatenfeld`                                                                                                       | XDatenfeld                                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 214 | `xdatenfelder`                                                                                                     | Xdatenfelder                                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 215 | `xdomea`                                                                                                           | xdomea                                                                                                               | sovereign-standards | unresearched    | ☐                 |
| 216 | `xjustiz`                                                                                                          | XJustiz                                                                                                              | sovereign-standards | unresearched    | ☐                 |
| 217 | `xkatalog`                                                                                                         | XKatalog                                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 218 | `xml`                                                                                                              | XML                                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 219 | `xml-encryption`                                                                                                   | XML Encryption                                                                                                       | sovereign-standards | unresearched    | ☐                 |
| 220 | `xml-schema-xsd`                                                                                                   | XML-Schema (XSD)                                                                                                     | sovereign-standards | unresearched    | ☐                 |
| 221 | `xml-signature`                                                                                                    | XML Signature                                                                                                        | sovereign-standards | unresearched    | ☐                 |
| 222 | `xmpp`                                                                                                             | XMPP                                                                                                                 | sovereign-standards | unresearched    | ☐                 |
| 223 | `xpath`                                                                                                            | XPath                                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 224 | `xprozess`                                                                                                         | Xprozess                                                                                                             | sovereign-standards | unresearched    | ☐                 |
| 225 | `xrechnung`                                                                                                        | XRechnung                                                                                                            | sovereign-standards | unresearched    | ☐                 |
| 226 | `xslt-xsl-transformations`                                                                                         | XSLT / XSL Transformations                                                                                           | sovereign-standards | unresearched    | ☐                 |
| 227 | `xta`                                                                                                              | XTA                                                                                                                  | sovereign-standards | unresearched    | ☐                 |
| 228 | `xunternehmen-kerndatenmodell`                                                                                     | XUnternehmen.Kerndatenmodell                                                                                         | sovereign-standards | unresearched    | ☐                 |
| 229 | `xzufi`                                                                                                            | XZufi                                                                                                                | sovereign-standards | unresearched    | ☐                 |
| 230 | `zapuk`                                                                                                            | ZAPUK                                                                                                                | applications        | unresearched    | ☐                 |
| 231 | `zitadel`                                                                                                          | ZITADEL                                                                                                              | sovereign-standards | unresearched    | ☐                 |
