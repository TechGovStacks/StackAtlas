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

Legende Eignung:

- ✅ geeignet = klar passend für StackAtlas-Zielbild
- 🟡 prüfen = sinnvoll, aber kontext-/einsatzabhängig
- ❌ eher nein = aktuell kein Fokus für StackAtlas-Kernset

|   # | ID                                                                                                                 | Name                                                                                                                 | Layer               | Research-Status | Eignung (StackAtlas) |
| --: | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------- | -------------------- |
|   1 | `802-11-bis-802-11-be`                                                                                             | 802.11 bis 802.11 be                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|   2 | `acr-azure-container-registry`                                                                                     | ACR (Azure Container Registry)                                                                                       | platform            | researched      | ❌ eher nein         |
|   3 | `agentgateway`                                                                                                     | Agentgateway                                                                                                         | platform            | researched      | 🟡 prüfen            |
|   4 | `ai-sdk-by-vercel`                                                                                                 | AI SDK by Vercel                                                                                                     | building-blocks     | researched      | ❌ eher nein         |
|   5 | `amqp`                                                                                                             | AMQP                                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|   6 | `ams`                                                                                                              | AMS                                                                                                                  | applications        | researched      | 🟡 prüfen            |
|   7 | `apache-camel-integration-framework`                                                                               | Apache Camel Integration Framework                                                                                   | platform            | researched      | 🟡 prüfen            |
|   8 | `apache-spark`                                                                                                     | Apache Spark                                                                                                         | platform            | researched      | 🟡 prüfen            |
|   9 | `apex-oracle`                                                                                                      | Apex Oracle                                                                                                          | applications        | researched      | ❌ eher nein         |
|  10 | `appian`                                                                                                           | Appian                                                                                                               | applications        | researched      | ❌ eher nein         |
|  11 | `arc42`                                                                                                            | arc42                                                                                                                | building-blocks     | researched      | 🟡 prüfen            |
|  12 | `archimate`                                                                                                        | ArchiMate                                                                                                            | sovereign-standards | researched      | ✅ geeignet          |
|  13 | `argo-cd`                                                                                                          | Argo CD                                                                                                              | platform            | researched      | 🟡 prüfen            |
|  14 | `argo-workflow`                                                                                                    | Argo Workflow                                                                                                        | platform            | researched      | 🟡 prüfen            |
|  15 | `argocd`                                                                                                           | ArgoCD                                                                                                               | platform            | researched      | ❌ eher nein         |
|  16 | `asciidoc`                                                                                                         | AsciiDoc                                                                                                             | sovereign-standards | researched      | ✅ geeignet          |
|  17 | `atag-2-0-authoring-tool-accessibility-guidelines-w3c`                                                             | ATAG 2.0 – Authoring Tool Accessibility Guidelines (W3C)                                                             | sovereign-standards | researched      | ✅ geeignet          |
|  18 | `axon-ivy`                                                                                                         | Axon Ivy                                                                                                             | applications        | researched      | ❌ eher nein         |
|  19 | `azure-devops`                                                                                                     | Azure DevOps                                                                                                         | platform            | researched      | ❌ eher nein         |
|  20 | `blazor`                                                                                                           | Blazor                                                                                                               | building-blocks     | researched      | 🟡 prüfen            |
|  21 | `bpmn`                                                                                                             | BPMN                                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|  22 | `bpmn-v2-0`                                                                                                        | BPMN V2.0                                                                                                            | sovereign-standards | researched      | ❌ eher nein         |
|  23 | `bruno`                                                                                                            | Bruno                                                                                                                | building-blocks     | researched      | 🟡 prüfen            |
|  24 | `c-razor`                                                                                                          | C# Razor                                                                                                             | building-blocks     | researched      | 🟡 prüfen            |
|  25 | `cargo`                                                                                                            | Cargo                                                                                                                | building-blocks     | researched      | 🟡 prüfen            |
|  26 | `cdxgen`                                                                                                           | cdxgen                                                                                                               | building-blocks     | researched      | 🟡 prüfen            |
|  27 | `ceph`                                                                                                             | Ceph                                                                                                                 | infrastructure      | researched      | 🟡 prüfen            |
|  28 | `cloudogu-ecosystem`                                                                                               | Cloudogu EcoSystem                                                                                                   | platform            | researched      | 🟡 prüfen            |
|  29 | `cmake`                                                                                                            | CMake                                                                                                                | building-blocks     | researched      | 🟡 prüfen            |
|  30 | `cmmn`                                                                                                             | CMMN                                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|  31 | `com-adeona`                                                                                                       | COM Adeona                                                                                                           | applications        | researched      | ❌ eher nein         |
|  32 | `com-despina`                                                                                                      | COM Despina                                                                                                          | sovereign-standards | researched      | ❌ eher nein         |
|  33 | `com-tauri`                                                                                                        | COM Tauri                                                                                                            | sovereign-standards | researched      | ❌ eher nein         |
|  34 | `conan`                                                                                                            | Conan                                                                                                                | building-blocks     | researched      | 🟡 prüfen            |
|  35 | `contextforge`                                                                                                     | ContextForge                                                                                                         | sovereign-standards | researched      | 🟡 prüfen            |
|  36 | `cyclonedx`                                                                                                        | CycloneDX                                                                                                            | sovereign-standards | researched      | ✅ geeignet          |
|  37 | `dapr`                                                                                                             | Dapr                                                                                                                 | platform            | researched      | 🟡 prüfen            |
|  38 | `data-aeonia`                                                                                                      | DATA Aeonia                                                                                                          | applications        | researched      | ❌ eher nein         |
|  39 | `data-sign`                                                                                                        | DATA Sign                                                                                                            | sovereign-standards | researched      | ❌ eher nein         |
|  40 | `data-varuna`                                                                                                      | DATA Varuna                                                                                                          | sovereign-standards | researched      | ❌ eher nein         |
|  41 | `datadog-vektor`                                                                                                   | Datadog Vektor                                                                                                       | sovereign-standards | researched      | ❌ eher nein         |
|  42 | `dataprepkit`                                                                                                      | DataPrepKit                                                                                                          | sovereign-standards | researched      | ❌ eher nein         |
|  43 | `datenschutzcockpit`                                                                                               | Datenschutzcockpit                                                                                                   | applications        | researched      | 🟡 prüfen            |
|  44 | `din-5008`                                                                                                         | Din 5008                                                                                                             | sovereign-standards | researched      | ✅ geeignet          |
|  45 | `din-91379`                                                                                                        | DIN 91379                                                                                                            | sovereign-standards | researched      | ✅ geeignet          |
|  46 | `din-spec-66336-servicestandard-qualitatsanforderungen-fur-onlineservices-und-portale-der-offentlichen-verwaltung` | DIN SPEC 66336 – Servicestandard: Qualitätsanforderungen für Onlineservices und -portale der öffentlichen Verwaltung | sovereign-standards | researched      | ✅ geeignet          |
|  47 | `dmn`                                                                                                              | DMN                                                                                                                  | sovereign-standards | researched      | ✅ geeignet          |
|  48 | `docker`                                                                                                           | Docker                                                                                                               | platform            | researched      | 🟡 prüfen            |
|  49 | `docling`                                                                                                          | Docling                                                                                                              | sovereign-standards | researched      | ❌ eher nein         |
|  50 | `dokumentenmanagement-systeme-wie-docuware-u-a`                                                                    | Dokumentenmanagement-Systeme wie Docuware u.a.                                                                       | sovereign-standards | researched      | ❌ eher nein         |
|  51 | `dvdv`                                                                                                             | DVDV                                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|  52 | `e164`                                                                                                             | E164                                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|  53 | `ebms-as4`                                                                                                         | ebMS/AS4                                                                                                             | sovereign-standards | researched      | ✅ geeignet          |
|  54 | `ecdsa`                                                                                                            | ECDSA                                                                                                                | sovereign-standards | researched      | ✅ geeignet          |
|  55 | `ed25519-eddsa`                                                                                                    | Ed25519 (EdDSA)                                                                                                      | sovereign-standards | researched      | ✅ geeignet          |
|  56 | `eforms-de`                                                                                                        | eForms-DE                                                                                                            | sovereign-standards | researched      | ✅ geeignet          |
|  57 | `eforms-unterschwelle`                                                                                             | eForms Unterschwelle                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|  58 | `egvp`                                                                                                             | EGVP                                                                                                                 | sovereign-standards | researched      | ✅ geeignet          |
|  59 | `egvp-postacher-in-der-rolle-bebpo`                                                                                | EGVP Postächer in der Rolle BeBPo                                                                                    | applications        | researched      | ❌ eher nein         |
|  60 | `eidas-2-0`                                                                                                        | eIDAS 2.0                                                                                                            | sovereign-standards | researched      | ✅ geeignet          |
|  61 | `elsa`                                                                                                             | Elsa                                                                                                                 | sovereign-standards | researched      | ❌ eher nein         |
|  62 | `emrex`                                                                                                            | emrex                                                                                                                | sovereign-standards | researched      | ✅ geeignet          |
|  63 | `en-301-549-accessibility-requirements-for-ict-products-and-services`                                              | EN 301 549 – Accessibility requirements for ICT products and services                                                | sovereign-standards | researched      | ✅ geeignet          |
|  64 | `epub-accessibility-iso-iec-23761-barrierefreie-e-publikationen`                                                   | EPUB Accessibility / ISO/IEC 23761 – Barrierefreie E-Publikationen                                                   | sovereign-standards | researched      | ✅ geeignet          |
|  65 | `etcd`                                                                                                             | etcd                                                                                                                 | platform            | researched      | 🟡 prüfen            |
|  66 | `etsi-en-119-461-v2`                                                                                               | ETSI EN 119 461 v2                                                                                                   | sovereign-standards | researched      | ✅ geeignet          |
|  67 | `fido2-standards`                                                                                                  | FIDO2-Standards                                                                                                      | sovereign-standards | researched      | ✅ geeignet          |
|  68 | `fim-datenstandard`                                                                                                | FIM-Datenstandard                                                                                                    | sovereign-standards | researched      | ✅ geeignet          |
|  69 | `fluentd`                                                                                                          | Fluentd                                                                                                              | platform            | researched      | 🟡 prüfen            |
|  70 | `forgejo`                                                                                                          | Forgejo                                                                                                              | platform            | researched      | ✅ geeignet          |
|  71 | `form-io`                                                                                                          | form.io                                                                                                              | building-blocks     | unresearched    | ❌ eher nein         |
|  72 | `gateway-api`                                                                                                      | Gateway API                                                                                                          | sovereign-standards | unresearched    | ✅ geeignet          |
|  73 | `gemma`                                                                                                            | Gemma                                                                                                                | sovereign-standards | unresearched    | ❌ eher nein         |
|  74 | `geo-sparql`                                                                                                       | (Geo)SPARQL                                                                                                          | sovereign-standards | unresearched    | ✅ geeignet          |
|  75 | `git`                                                                                                              | git                                                                                                                  | sovereign-standards | unresearched    | ✅ geeignet          |
|  76 | `gitlabrunner`                                                                                                     | GitlabRunner                                                                                                         | sovereign-standards | unresearched    | ❌ eher nein         |
|  77 | `gnu-taler`                                                                                                        | GNU Taler                                                                                                            | sovereign-standards | unresearched    | ✅ geeignet          |
|  78 | `governikus-multi-messenger`                                                                                       | Governikus Multi Messenger                                                                                           | sovereign-standards | unresearched    | 🟡 prüfen            |
|  79 | `grafana-alloy`                                                                                                    | Grafana Alloy                                                                                                        | sovereign-standards | unresearched    | 🟡 prüfen            |
|  80 | `grafana-loki`                                                                                                     | Grafana Loki                                                                                                         | sovereign-standards | unresearched    | 🟡 prüfen            |
|  81 | `grafana-mimir`                                                                                                    | Grafana Mimir                                                                                                        | sovereign-standards | unresearched    | 🟡 prüfen            |
|  82 | `grafana-tempo`                                                                                                    | Grafana Tempo                                                                                                        | sovereign-standards | unresearched    | 🟡 prüfen            |
|  83 | `haproxy`                                                                                                          | Haproxy                                                                                                              | sovereign-standards | unresearched    | 🟡 prüfen            |
|  84 | `harbor`                                                                                                           | Harbor                                                                                                               | sovereign-standards | unresearched    | 🟡 prüfen            |
|  85 | `harvester`                                                                                                        | Harvester                                                                                                            | sovereign-standards | unresearched    | 🟡 prüfen            |
|  86 | `hashicorp-vault-secret-management`                                                                                | HashiCorp Vault Secret Management                                                                                    | sovereign-standards | unresearched    | ✅ geeignet          |
|  87 | `hive`                                                                                                             | Hive                                                                                                                 | sovereign-standards | unresearched    | ❌ eher nein         |
|  88 | `iceberg`                                                                                                          | Iceberg                                                                                                              | sovereign-standards | unresearched    | 🟡 prüfen            |
|  89 | `id-crucis`                                                                                                        | ID Crucis                                                                                                            | sovereign-standards | unresearched    | ❌ eher nein         |
|  90 | `id-mercury`                                                                                                       | ID Mercury                                                                                                           | sovereign-standards | unresearched    | ❌ eher nein         |
|  91 | `id-panstar`                                                                                                       | ID Panstar                                                                                                           | sovereign-standards | unresearched    | ❌ eher nein         |
|  92 | `imap`                                                                                                             | IMAP                                                                                                                 | sovereign-standards | unresearched    | 🟡 prüfen            |
|  93 | `influxdb`                                                                                                         | InfluxDB                                                                                                             | sovereign-standards | unresearched    | 🟡 prüfen            |
|  94 | `ingrid-vkoopuis`                                                                                                  | InGrid/VKoopUIS                                                                                                      | sovereign-standards | unresearched    | ❌ eher nein         |
|  95 | `iso-9241-171-2025-ergonomics-of-human-system-interaction-software-accessibility`                                  | ISO 9241-171:2025 – Ergonomics of human-system interaction: Software accessibility                                   | sovereign-standards | unresearched    | 🟡 prüfen            |
|  96 | `iso-9241-normenreihe-ergonomie-der-mensch-system-interaktion`                                                     | ISO 9241 (Normenreihe) - Ergonomie der Mensch-System-Interaktion                                                     | sovereign-standards | unresearched    | 🟡 prüfen            |
|  97 | `iso-iec-19757-3-schematron`                                                                                       | ISO/IEC 19757-3 (Schematron)                                                                                         | sovereign-standards | unresearched    | 🟡 prüfen            |
|  98 | `itil`                                                                                                             | ITIL                                                                                                                 | sovereign-standards | unresearched    | ✅ geeignet          |
|  99 | `jaeger`                                                                                                           | Jaeger                                                                                                               | sovereign-standards | unresearched    | 🟡 prüfen            |
| 100 | `janus-server`                                                                                                     | Janus Server                                                                                                         | sovereign-standards | unresearched    | ❌ eher nein         |
| 101 | `jquery`                                                                                                           | jQuery                                                                                                               | sovereign-standards | unresearched    | ❌ eher nein         |
| 102 | `json-schema`                                                                                                      | JSON Schema                                                                                                          | sovereign-standards | unresearched    | ✅ geeignet          |
| 103 | `json-web-encryption-jwe`                                                                                          | JSON Web Encryption (JWE)                                                                                            | sovereign-standards | unresearched    | ✅ geeignet          |
| 104 | `k6`                                                                                                               | k6                                                                                                                   | sovereign-standards | unresearched    | 🟡 prüfen            |
| 105 | `kafka`                                                                                                            | Kafka                                                                                                                | sovereign-standards | unresearched    | ✅ geeignet          |
| 106 | `kern-ux-standard`                                                                                                 | KERN UX-Standard                                                                                                     | sovereign-standards | unresearched    | ✅ geeignet          |
| 107 | `kitten`                                                                                                           | Kitten                                                                                                               | applications        | unresearched    | ❌ eher nein         |
| 108 | `knative`                                                                                                          | Knative                                                                                                              | sovereign-standards | unresearched    | ✅ geeignet          |
| 109 | `knockoutjs`                                                                                                       | KnockoutJS                                                                                                           | sovereign-standards | unresearched    | ❌ eher nein         |
| 110 | `kotlin`                                                                                                           | Kotlin                                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 111 | `kotlin-multiplatform`                                                                                             | Kotlin Multiplatform                                                                                                 | sovereign-standards | unresearched    | ✅ geeignet          |
| 112 | `krypto-agilitat-standards-ff`                                                                                     | Krypto Agilität Standards ff                                                                                         | sovereign-standards | unresearched    | 🟡 prüfen            |
| 113 | `kubewarden`                                                                                                       | kubewarden                                                                                                           | sovereign-standards | unresearched    | 🟡 prüfen            |
| 114 | `lightllm`                                                                                                         | LightLLM                                                                                                             | sovereign-standards | unresearched    | ❌ eher nein         |
| 115 | `llm-d`                                                                                                            | llm-d                                                                                                                | infrastructure      | unresearched    | 🟡 prüfen            |
| 116 | `longhorn`                                                                                                         | Longhorn                                                                                                             | sovereign-standards | unresearched    | 🟡 prüfen            |
| 117 | `markdown-commonmark-spezifikation-rfc-7763`                                                                       | Markdown (CommonMark-Spezifikation / RFC 7763)                                                                       | sovereign-standards | unresearched    | 🟡 prüfen            |
| 118 | `matrix`                                                                                                           | Matrix                                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 119 | `mcprouter-microsoft`                                                                                              | MCPRouter (Microsoft)                                                                                                | sovereign-standards | unresearched    | ❌ eher nein         |
| 120 | `mein-unternehmenskonto-muk`                                                                                       | Mein Unternehmenskonto (MUK)                                                                                         | applications        | unresearched    | ❌ eher nein         |
| 121 | `msbuild`                                                                                                          | MSBuild                                                                                                              | sovereign-standards | unresearched    | 🟡 prüfen            |
| 122 | `mtls`                                                                                                             | mTLS                                                                                                                 | infrastructure      | unresearched    | ✅ geeignet          |
| 123 | `nats`                                                                                                             | NATS                                                                                                                 | sovereign-standards | unresearched    | ✅ geeignet          |
| 124 | `net`                                                                                                              | .NET                                                                                                                 | platform            | unresearched    | ✅ geeignet          |
| 125 | `net-aspire`                                                                                                       | .NET Aspire                                                                                                          | sovereign-standards | unresearched    | ❌ eher nein         |
| 126 | `newtonsoft-json`                                                                                                  | Newtonsoft.Json                                                                                                      | sovereign-standards | unresearched    | ❌ eher nein         |
| 127 | `nfs-network-file-system`                                                                                          | NFS Network File System                                                                                              | sovereign-standards | unresearched    | 🟡 prüfen            |
| 128 | `npm`                                                                                                              | npm                                                                                                                  | sovereign-standards | unresearched    | 🟡 prüfen            |
| 129 | `nuget`                                                                                                            | NuGet                                                                                                                | sovereign-standards | unresearched    | 🟡 prüfen            |
| 130 | `nuke-build`                                                                                                       | NUKE.build                                                                                                           | sovereign-standards | unresearched    | ❌ eher nein         |
| 131 | `nvidia-gpu-operator`                                                                                              | Nvidia GPU-Operator                                                                                                  | sovereign-standards | unresearched    | 🟡 prüfen            |
| 132 | `oci-image-format`                                                                                                 | OCI Image Format                                                                                                     | sovereign-standards | unresearched    | ✅ geeignet          |
| 133 | `one-time-password-otp-fur-multi-faktor-authentifizierung-mfa`                                                     | One-Time Password (OTP) für Multi-Faktor-Authentifizierung (MFA)                                                     | sovereign-standards | unresearched    | ❌ eher nein         |
| 134 | `open-build-service`                                                                                               | Open Build Service                                                                                                   | sovereign-standards | unresearched    | 🟡 prüfen            |
| 135 | `openbao`                                                                                                          | OpenBao                                                                                                              | platform            | unresearched    | 🟡 prüfen            |
| 136 | `opencluster-management`                                                                                           | OpenCluster Management                                                                                               | sovereign-standards | unresearched    | 🟡 prüfen            |
| 137 | `opendocument-format-odf`                                                                                          | OpenDocument Format (ODF)                                                                                            | sovereign-standards | unresearched    | ✅ geeignet          |
| 138 | `opengdx`                                                                                                          | OpenGDX                                                                                                              | sovereign-standards | unresearched    | 🟡 prüfen            |
| 139 | `openresponses`                                                                                                    | OpenResponses                                                                                                        | sovereign-standards | unresearched    | ❌ eher nein         |
| 140 | `opensearch`                                                                                                       | OpenSearch                                                                                                           | applications        | unresearched    | ✅ geeignet          |
| 141 | `openvox`                                                                                                          | openVOX                                                                                                              | applications        | unresearched    | ❌ eher nein         |
| 142 | `operator-framework-fur-deskriptive-erweiterungen-von-kubernetes`                                                  | Operator Framework für deskriptive Erweiterungen von Kubernetes                                                      | sovereign-standards | unresearched    | 🟡 prüfen            |
| 143 | `osci`                                                                                                             | OSCI                                                                                                                 | sovereign-standards | unresearched    | ✅ geeignet          |
| 144 | `osci-soap`                                                                                                        | OSCI \| SOAP                                                                                                         | sovereign-standards | unresearched    | ✅ geeignet          |
| 145 | `osci-xta`                                                                                                         | OSCI, XTA                                                                                                            | sovereign-standards | unresearched    | ✅ geeignet          |
| 146 | `osci-xta-soap`                                                                                                    | OSCI \| XTA \| SOAP                                                                                                  | sovereign-standards | unresearched    | ✅ geeignet          |
| 147 | `ovn`                                                                                                              | OvN                                                                                                                  | sovereign-standards | unresearched    | 🟡 prüfen            |
| 148 | `owasp-dependency-track`                                                                                           | OWASP Dependency-Track                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 149 | `ozg-cloud`                                                                                                        | OZG Cloud                                                                                                            | platform            | unresearched    | 🟡 prüfen            |
| 150 | `pdf-a`                                                                                                            | PDF/A                                                                                                                | sovereign-standards | unresearched    | ✅ geeignet          |
| 151 | `peppol-bis-spezifikationen`                                                                                       | Peppol BIS Spezifikationen                                                                                           | sovereign-standards | unresearched    | ✅ geeignet          |
| 152 | `peppol-edelivery-network`                                                                                         | Peppol eDelivery Network                                                                                             | sovereign-standards | unresearched    | ✅ geeignet          |
| 153 | `peppol-netzwerk`                                                                                                  | Peppol Netzwerk                                                                                                      | sovereign-standards | unresearched    | ✅ geeignet          |
| 154 | `persistent-identifier-pids`                                                                                       | Persistent Identifier (PIDs)                                                                                         | sovereign-standards | unresearched    | 🟡 prüfen            |
| 155 | `pgvector`                                                                                                         | pgvector                                                                                                             | sovereign-standards | unresearched    | ✅ geeignet          |
| 156 | `phi`                                                                                                              | Phi                                                                                                                  | sovereign-standards | unresearched    | 🟡 prüfen            |
| 157 | `playwright`                                                                                                       | Playwright                                                                                                           | sovereign-standards | unresearched    | 🟡 prüfen            |
| 158 | `podman`                                                                                                           | Podman                                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 159 | `pop3`                                                                                                             | POP3                                                                                                                 | sovereign-standards | unresearched    | 🟡 prüfen            |
| 160 | `presto`                                                                                                           | Presto                                                                                                               | infrastructure      | unresearched    | 🟡 prüfen            |
| 161 | `procol-buffers`                                                                                                   | Procol Buffers                                                                                                       | sovereign-standards | unresearched    | ❌ eher nein         |
| 162 | `protocol-buffers-protobuf`                                                                                        | Protocol Buffers (Protobuf)                                                                                          | sovereign-standards | unresearched    | ✅ geeignet          |
| 163 | `quay`                                                                                                             | Quay                                                                                                                 | sovereign-standards | unresearched    | 🟡 prüfen            |
| 164 | `referenzimplementierung-fur-bare-metal-iaas`                                                                      | Referenzimplementierung für Bare-Metal IaaS                                                                          | sovereign-standards | unresearched    | 🟡 prüfen            |
| 165 | `renovate-bot`                                                                                                     | Renovate Bot                                                                                                         | sovereign-standards | unresearched    | ✅ geeignet          |
| 166 | `rook`                                                                                                             | Rook                                                                                                                 | sovereign-standards | unresearched    | 🟡 prüfen            |
| 167 | `s3-api-minio-eine-implementierung`                                                                                | S3 (API) - MinIO (eine Implementierung)                                                                              | sovereign-standards | unresearched    | ✅ geeignet          |
| 168 | `safe`                                                                                                             | SAFE                                                                                                                 | sovereign-standards | unresearched    | ❌ eher nein         |
| 169 | `saml`                                                                                                             | SAML                                                                                                                 | sovereign-standards | unresearched    | ✅ geeignet          |
| 170 | `sboms`                                                                                                            | SBOMs                                                                                                                | applications        | unresearched    | ❌ eher nein         |
| 171 | `scala`                                                                                                            | Scala                                                                                                                | building-blocks     | unresearched    | ✅ geeignet          |
| 172 | `schematron`                                                                                                       | Schematron                                                                                                           | sovereign-standards | unresearched    | ✅ geeignet          |
| 173 | `sealed-secrets`                                                                                                   | Sealed Secrets                                                                                                       | sovereign-standards | unresearched    | 🟡 prüfen            |
| 174 | `securitysuitabilitypolicy-rfc-5698`                                                                               | SecuritySuitabilityPolicy / RFC 5698                                                                                 | sovereign-standards | unresearched    | ❌ eher nein         |
| 175 | `semantic-kernel-agentic-framework`                                                                                | Semantic Kernel (Agentic Framework)                                                                                  | sovereign-standards | unresearched    | ❌ eher nein         |
| 176 | `semic-spezifikationen`                                                                                            | SEMIC-Spezifikationen                                                                                                | sovereign-standards | unresearched    | ❌ eher nein         |
| 177 | `seq`                                                                                                              | seq                                                                                                                  | sovereign-standards | unresearched    | 🟡 prüfen            |
| 178 | `sha`                                                                                                              | SHA                                                                                                                  | infrastructure      | unresearched    | 🟡 prüfen            |
| 179 | `shacl`                                                                                                            | SHACL                                                                                                                | sovereign-standards | unresearched    | 🟡 prüfen            |
| 180 | `signalr`                                                                                                          | SignalR                                                                                                              | sovereign-standards | unresearched    | ❌ eher nein         |
| 181 | `sigstore`                                                                                                         | Sigstore                                                                                                             | sovereign-standards | unresearched    | ✅ geeignet          |
| 182 | `sles-suse-linux-enterprise-server`                                                                                | SLES Suse Linux Enterprise Server                                                                                    | infrastructure      | unresearched    | 🟡 prüfen            |
| 183 | `slsa`                                                                                                             | SLSA                                                                                                                 | applications        | unresearched    | ✅ geeignet          |
| 184 | `smtp`                                                                                                             | SMTP                                                                                                                 | sovereign-standards | unresearched    | 🟡 prüfen            |
| 185 | `snyk`                                                                                                             | Snyk                                                                                                                 | sovereign-standards | unresearched    | ❌ eher nein         |
| 186 | `solid-social-linked-data`                                                                                         | Solid (Social Linked Data)                                                                                           | sovereign-standards | unresearched    | ✅ geeignet          |
| 187 | `sonarqube`                                                                                                        | SonarQube                                                                                                            | sovereign-standards | unresearched    | ✅ geeignet          |
| 188 | `spdx`                                                                                                             | SPDX                                                                                                                 | sovereign-standards | unresearched    | ✅ geeignet          |
| 189 | `spiffe-spire`                                                                                                     | SPIFFE/SPIRE                                                                                                         | sovereign-standards | unresearched    | ✅ geeignet          |
| 190 | `sqlite`                                                                                                           | SQLite                                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 191 | `stackrox`                                                                                                         | StackRox                                                                                                             | sovereign-standards | unresearched    | ❌ eher nein         |
| 192 | `standards-fur-tests-mocks-ci-cd`                                                                                  | Standards für Tests, Mocks, CI/CD                                                                                    | sovereign-standards | unresearched    | ❌ eher nein         |
| 193 | `swec-software-entwicklungsplattform-cloud`                                                                        | SWEC - Software Entwicklungsplattform Cloud                                                                          | applications        | researched      | 🟡 prüfen            |
| 194 | `tekton`                                                                                                           | Tekton                                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 195 | `telerik`                                                                                                          | Telerik                                                                                                              | sovereign-standards | unresearched    | ❌ eher nein         |
| 196 | `terrascan`                                                                                                        | Terrascan                                                                                                            | sovereign-standards | unresearched    | 🟡 prüfen            |
| 197 | `thanos`                                                                                                           | Thanos                                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 198 | `time-based-one-time-password-totp-fur-multi-faktor-authentifizierung-mfa`                                         | Time-based one-time password (TOTP) für Multi-Faktor-Authentifizierung (MFA)                                         | applications        | unresearched    | ❌ eher nein         |
| 199 | `togaf`                                                                                                            | TOGAF                                                                                                                | applications        | unresearched    | 🟡 prüfen            |
| 200 | `toon`                                                                                                             | TOON                                                                                                                 | sovereign-standards | unresearched    | ❌ eher nein         |
| 201 | `trivy`                                                                                                            | Trivy                                                                                                                | sovereign-standards | unresearched    | ✅ geeignet          |
| 202 | `uipath`                                                                                                           | UiPath                                                                                                               | sovereign-standards | unresearched    | ❌ eher nein         |
| 203 | `universal-business-language-ubl-iso-iec-19845`                                                                    | Universal Business Language (UBL) ISO/IEC 19845                                                                      | sovereign-standards | unresearched    | ✅ geeignet          |
| 204 | `validator`                                                                                                        | validator                                                                                                            | sovereign-standards | unresearched    | ❌ eher nein         |
| 205 | `valkey`                                                                                                           | Valkey                                                                                                               | applications        | unresearched    | ✅ geeignet          |
| 206 | `vllm`                                                                                                             | vLLM                                                                                                                 | sovereign-standards | unresearched    | ❌ eher nein         |
| 207 | `wai-aria-1-2-accessible-rich-internet-applications-w3c`                                                           | WAI-ARIA 1.2 – Accessible Rich Internet Applications (W3C)                                                           | sovereign-standards | unresearched    | ✅ geeignet          |
| 208 | `webassembly-wasm`                                                                                                 | WebAssembly (WASM)                                                                                                   | sovereign-standards | unresearched    | ✅ geeignet          |
| 209 | `webpack`                                                                                                          | Webpack                                                                                                              | sovereign-standards | unresearched    | 🟡 prüfen            |
| 210 | `webrtc`                                                                                                           | WebRTC                                                                                                               | sovereign-standards | unresearched    | ✅ geeignet          |
| 211 | `websockets`                                                                                                       | WebSockets                                                                                                           | sovereign-standards | unresearched    | ✅ geeignet          |
| 212 | `xbestellung`                                                                                                      | XBestellung                                                                                                          | sovereign-standards | unresearched    | ✅ geeignet          |
| 213 | `xdatenfeld`                                                                                                       | XDatenfeld                                                                                                           | sovereign-standards | unresearched    | ✅ geeignet          |
| 214 | `xdatenfelder`                                                                                                     | Xdatenfelder                                                                                                         | sovereign-standards | unresearched    | ✅ geeignet          |
| 215 | `xdomea`                                                                                                           | xdomea                                                                                                               | sovereign-standards | unresearched    | ❌ eher nein         |
| 216 | `xjustiz`                                                                                                          | XJustiz                                                                                                              | sovereign-standards | unresearched    | ✅ geeignet          |
| 217 | `xkatalog`                                                                                                         | XKatalog                                                                                                             | sovereign-standards | unresearched    | ✅ geeignet          |
| 218 | `xml`                                                                                                              | XML                                                                                                                  | sovereign-standards | unresearched    | ✅ geeignet          |
| 219 | `xml-encryption`                                                                                                   | XML Encryption                                                                                                       | sovereign-standards | unresearched    | ✅ geeignet          |
| 220 | `xml-schema-xsd`                                                                                                   | XML-Schema (XSD)                                                                                                     | sovereign-standards | unresearched    | ✅ geeignet          |
| 221 | `xml-signature`                                                                                                    | XML Signature                                                                                                        | sovereign-standards | unresearched    | ✅ geeignet          |
| 222 | `xmpp`                                                                                                             | XMPP                                                                                                                 | sovereign-standards | unresearched    | ✅ geeignet          |
| 223 | `xpath`                                                                                                            | XPath                                                                                                                | sovereign-standards | unresearched    | ✅ geeignet          |
| 224 | `xprozess`                                                                                                         | Xprozess                                                                                                             | sovereign-standards | unresearched    | ✅ geeignet          |
| 225 | `xrechnung`                                                                                                        | XRechnung                                                                                                            | sovereign-standards | unresearched    | ✅ geeignet          |
| 226 | `xslt-xsl-transformations`                                                                                         | XSLT / XSL Transformations                                                                                           | sovereign-standards | unresearched    | ✅ geeignet          |
| 227 | `xta`                                                                                                              | XTA                                                                                                                  | sovereign-standards | unresearched    | ✅ geeignet          |
| 228 | `xunternehmen-kerndatenmodell`                                                                                     | XUnternehmen.Kerndatenmodell                                                                                         | sovereign-standards | unresearched    | ✅ geeignet          |
| 229 | `xzufi`                                                                                                            | XZufi                                                                                                                | sovereign-standards | unresearched    | ✅ geeignet          |
| 230 | `zapuk`                                                                                                            | ZAPUK                                                                                                                | applications        | unresearched    | ❌ eher nein         |
| 231 | `zitadel`                                                                                                          | ZITADEL                                                                                                              | sovereign-standards | unresearched    | ✅ geeignet          |
