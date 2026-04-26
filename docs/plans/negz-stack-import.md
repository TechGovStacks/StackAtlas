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
