# Plan: GovTech-Stacks aus `docs/stacks/` als App-Metadaten ergänzen

## Context

Im Repo liegen drei Recherche-Markdowns unter `docs/stacks/` (chatgpt.md, gemini.md, Mistral.md). Sie beschreiben den globalen GovTech-Stack-Markt aus drei Perspektiven:

- **gemini.md** – identifiziert konkrete **nationale/supranationale Referenz-Stacks** (Estland/X-Road, India Stack, Singapur SGTS, UK GDS/GOV.UK, Deutschland D-Stack/BundID/FIT-Connect, EU EIRA/EUDI Wallet, GovStack-Initiative) inkl. ihrer Building Blocks, Sprachen und Frameworks.
- **chatgpt.md** – liefert eine 13-Layer-Taxonomie typischer GovTech-Bausteine mit Beispielen pro Layer.
- **Mistral.md** – tabelliert 15 Funktionskategorien (Frontend, Backend, DB, Cloud, …) mit Beispiel-Items.

Im Datenmodell der App existiert bisher genau **eine** Stack-Definition: `data/stacks/germany.json` (135 Items, alle mit `status=approved`, `role=consumer`). Die FilterBar (`src/components/FilterBar.tsx:48-54`) hat bereits einen Stack-Selector, der per `STACKS.map(...)` jeden in `data/stacks/` liegenden Stack als Auswahloption rendert. Es fehlt also nur Daten – kein UI-Code.

**Ziel**: Die in den Markdowns dokumentierten internationalen Referenz-Stacks und ihre Items als JSON-Metadaten in den Build aufnehmen, sodass sie im Stack-Dropdown auswählbar werden und die zugehörigen Technologien gefiltert anzeigen.

---

## Architektur und Datenfluss (kurz)

1. `data/stacks/*.json` → wird von `scripts/generate-data.mjs` (Zeile 109) eingelesen → in `src/data/items.generated.ts` als `STACKS`-Konstante geschrieben.
2. `src/data/catalog.ts` re-exportiert `STACKS`.
3. `src/pages/HomePage.tsx` reicht `STACKS` an `FilterBar` (`src/components/FilterBar.tsx:48-54`).
4. Schema-Validierung über `scripts/validate-schemas.mjs` (`data/schemas/stack.schema.json` und `item.schema.json`).
5. Vorhandene Items werden im Stack über `itemId` referenziert. Schema verlangt aktuell **keine** Cross-Reference-Validierung, wir halten uns aber konsequent an existierende IDs aus `data/items/`.

---

## Umfang dieser Änderung

### A) Sechs neue Stack-Dateien in `data/stacks/`

Jede Datei folgt exakt dem `data/schemas/stack.schema.json`. Die Items referenzieren primär bereits existierende IDs aus `data/items/` und werden für jedes neue Item (Schritt B) ergänzt.

| Datei | id | name (de/en) | country | issuer | role-Logik |
|---|---|---|---|---|---|
| `estonia.json` | `estonia` | „Estland Stack" / „Estonia Stack" | EE | RIA / NIIS | Estland = `maintainer` für X-Road & Eigenentwicklungen, sonst `consumer` |
| `india.json` | `india` | „India Stack" / „India Stack" | IN | NPCI / UIDAI / MeitY | IN = `maintainer` für Aadhaar/UPI/DigiLocker, sonst `consumer` |
| `singapore.json` | `singapore` | „Singapur Stack (SGTS)" / „Singapore Stack (SGTS)" | SG | GovTech Singapore | SG = `maintainer` für SGTS-Komponenten, sonst `consumer` |
| `united-kingdom.json` | `united-kingdom` | „UK GOV.UK Stack" / „UK GOV.UK Stack" | GB | Government Digital Service (GDS) | UK = `maintainer` für GOV.UK Notify/Pay/One Login, sonst `consumer` |
| `european-union.json` | `european-union` | „EU Referenz-Stack (EIRA / EUDI)" / „EU Reference Stack (EIRA / EUDI)" | EU | Europäische Kommission / DG DIGIT | EU = `maintainer` für EIRA, EUDI Wallet, sonst `funder`/`consumer` |
| `govstack.json` | `govstack` | „GovStack Initiative" / „GovStack Initiative" | EU | ITU / DIAL / Estonia / Germany | `contributor` für die meisten Items |

Pro Eintrag: `status` (`recommended` / `approved`), `role`, kurze, lokalisierte `rationale` (de/en), bei prominenten Bausteinen `since`. Schema-konform: `country` ist `^[A-Z]{2}$` (für „EU" passt das nicht zwingend – siehe Verifikation; Fallback ist Auslassen des Felds, da es optional ist).

> Hinweis: Das Schema (`stack.schema.json:36`) erlaubt `country` nur als 2-Letter-ISO. Für `european-union.json` und `govstack.json` lassen wir `country` weg und nutzen `issuer`, um die supranationale Natur zu beschreiben. Damit bleibt die Validierung grün, ohne das Schema anzufassen.

### B) Neue `data/items/*.json` für Schlüsseltechnologien, die heute fehlen

Aus den Markdowns referenzierte, im Repo aber nicht vorhandene Items werden **nur dann** angelegt, wenn sie in den Stack-Dateien aus Schritt A tatsächlich verwendet werden. Erwartete neue Items (Slug → Quelle → Layer):

**Identity & Trust**
- `keycloak` → gemini, chatgpt, Mistral → `building-blocks`
- `bundid` → gemini → `applications`
- `eudi-wallet` → gemini → `sovereign-standards`
- `fido2-webauthn` → chatgpt → `sovereign-standards`

**Interop / API**
- `x-road` → gemini → `building-blocks`
- `fit-connect` → gemini → `building-blocks`
- `govstack-information-mediator` → gemini → `building-blocks`
- `apache-kafka` → gemini, chatgpt → `platform`
- `rabbitmq` → chatgpt → `platform`
- `activemq-artemis` → gemini → `platform`

**Infrastruktur**
- `terraform` → chatgpt → `infrastructure`
- `helm` → chatgpt → `infrastructure`
- `ansible` → chatgpt, Mistral → `infrastructure`
- `sovereign-cloud-stack` → chatgpt → `sovereign-standards`

**Daten / Caching**
- `redis` → gemini, Mistral → `platform`
- `elasticsearch` → chatgpt → `platform`
- `prometheus` → chatgpt, Mistral → `platform`
- `grafana` → chatgpt → `platform`
- `opentelemetry` → chatgpt → `platform`

**Workflow / Policy**
- `camunda` → chatgpt → `building-blocks`
- `temporal-io` → chatgpt → `building-blocks`
- `open-policy-agent` → chatgpt → `building-blocks`
- `apache-airflow` → chatgpt → `platform`

**Frameworks / Sprachen**
- `spring-boot` → gemini, chatgpt → `building-blocks`
- `nodejs` → gemini → `platform`
- `django` → Mistral → `building-blocks`
- `ruby-on-rails` → gemini, Mistral → `building-blocks`
- `tailwind-css` → Mistral → `building-blocks`

**India / UK / Singapore-spezifisch**
- `aadhaar` → gemini → `applications`
- `unified-payments-interface-upi` → gemini → `applications`
- `digilocker` → gemini → `applications`
- `mosip` → gemini → `applications`
- `gov-uk-notify` → gemini → `applications`
- `gov-uk-pay` → gemini → `applications`
- `gov-uk-one-login` → gemini → `applications`
- `singpass` → gemini → `applications`
- `myinfo` → gemini → `applications`

**CMS** (für Vollständigkeit der nationalen Portale)
- `drupal` → gemini, Mistral → `applications`
- `wordpress` → gemini, Mistral → `applications`
- `typo3` → gemini → `applications`

Jedes neue Item bekommt: `id`, `name`, `layer`, `sublayer`, `description.de` (Pflicht laut Schema, kurz aus den Markdowns paraphrasiert), `description.en`, `homepage`, `tags`, `oss`, `maturity`, vollständige `sovereigntyCriteria` (alle 9 Bool-Felder + `ownerType`). Werte werden auf Basis der Markdowns plus offensichtlichem Allgemeinwissen (Apache-Lizenzen, Self-Hostability bei OSS, etc.) konservativ befüllt — keine `audit`-Daten erfunden.

Logos werden zunächst weggelassen (`resolveLogo()` greift dann auf `src/data/logo-urls.json` oder das Fallback `assets/broken-logo.svg` zurück, siehe `scripts/generate-data.mjs:56-64`).

### C) `data/stacks/germany.json` minimal anreichern

Die bereits aus den Markdowns hervorgehenden, aber noch fehlenden Bausteine für Deutschland werden ergänzt: `keycloak`, `bundid`, `fit-connect`, `prometheus`, `grafana`, `apache-kafka`, `camunda`, `open-policy-agent`, `drupal`, `wordpress`, `terraform`, `helm`, `ansible`, `spring-boot`, `nodejs`, `eudi-wallet`, `sovereign-cloud-stack`. Alle als `status=approved`, `role=contributor` (für deutsche Eigenentwicklungen wie BundID/FIT-Connect: `maintainer`).

---

## Kritische Dateien

| Datei | Was passiert |
|---|---|
| `data/stacks/estonia.json` | NEU |
| `data/stacks/india.json` | NEU |
| `data/stacks/singapore.json` | NEU |
| `data/stacks/united-kingdom.json` | NEU |
| `data/stacks/european-union.json` | NEU |
| `data/stacks/govstack.json` | NEU |
| `data/stacks/germany.json` | UPDATE — neue Items anhängen |
| `data/items/<slug>.json` × ~35 | NEU (siehe Liste B) |

Keine Änderungen an `src/`, `scripts/`, oder Schemata nötig. Der Generator ist bereits auf neue Files vorbereitet.

---

## Bereits vorhandene Wiederverwendungen

- **Generator** `scripts/generate-data.mjs:76-94` (`readJsonDir`) liest neue Files automatisch → kein Code nötig.
- **Schemas** `data/schemas/stack.schema.json`, `data/schemas/item.schema.json` decken Pflichtfelder ab.
- **Stack-Selector** `src/components/FilterBar.tsx:48-54` rendert jeden Eintrag von `STACKS` automatisch.
- **Filterung** `src/pages/HomePage.tsx` filtert `ITEMS` per `stackItemMap.has(item.id)` → neue Items werden bei Aktivierung des jeweiligen Stacks angezeigt.
- **Logo-Fallback** `scripts/generate-data.mjs:56-64` greift auf `src/data/logo-urls.json` und Fallback-Asset zurück → Items ohne `logo`-Feld brechen den Build nicht.

---

## Verifikation

1. **Schema-Validierung** ausführen:
   ```
   pnpm run validate-schemas        # bzw. node scripts/validate-schemas.mjs
   ```
   Erwartung: alle neuen Stack- und Item-Dateien grün.

2. **Generator** laufen lassen:
   ```
   node scripts/generate-data.mjs
   ```
   Erwartung: `src/data/items.generated.ts` enthält die 7 Stacks (germany + 6 neue) in der `STACKS`-Konstante und alle neuen Items in `ITEMS`.

3. **Lokaler Dev-Server**:
   ```
   pnpm run dev
   ```
   Im Browser:
   - Stack-Dropdown öffnet: zeigt 7 Optionen mit Item-Counts.
   - Auswahl „Estonia Stack" → Liste reduziert sich auf die in `estonia.json` referenzierten Items inkl. `x-road`, `keycloak`, …
   - Wechsel auf „GovStack Initiative" → Liste zeigt die GovStack-Items.
   - Default „Alle" funktioniert weiterhin.

4. **Bestehende E2E-Tests** (`e2e/app.spec.ts`) müssen unverändert grün bleiben — sie referenzieren keine konkreten Stack-IDs.

5. **Sanity Check**: kein Stack referenziert eine `itemId`, die nicht als `data/items/<id>.json` existiert. Wird per Skript-Liner verifiziert (alle `itemId`s ausschneiden, gegen `ls data/items/` joinen).

---

## Bewusst nicht umgesetzt

- Kein Schema-Update (`country` bleibt strikt 2-Letter; supranationale Stacks lassen das Feld einfach weg).
- Keine generierten Logos für neue Items — Fallback ist akzeptabel und vermeidet falsche URLs.
- Kein neuer Layer; alle neuen Items werden auf die fünf bestehenden Layer (`infrastructure` / `platform` / `building-blocks` / `applications` / `sovereign-standards`) abgebildet.
- Keine Übersetzungs- oder UI-String-Änderungen.
- Mistral.md und chatgpt.md werden **nicht** als eigene Stacks abgebildet — sie liefern nur Item-Inputs für die nationalen/supranationalen Stacks und für Germany. So bleibt das Modell konsistent (Stack = Land/Initiative).
