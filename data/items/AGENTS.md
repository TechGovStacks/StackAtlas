# Agenten-Anweisung: sovereigntyCriteria-Recherche

## Scope

- Nur Items in `data/stacks/negz.json` → `items[]` bearbeiten
- Andere Items ignorieren
- **Reihenfolge:** Item ohne `lastResearchDate` zuerst → ältere `lastResearchDate` → fehlender `groupKey`

## Schema-Konformität (MUSS vor jedem Update geprüft werden!)

**Jedes Item MUSS gegen `data/schemas/item.schema.json` valide sein.**

### Required Fields (FEHLEND = Validation Error!)

```json
{ "id", "name", "layer", "description": { "de": "..." }, "oss", "sovereigntyCriteria": { ... } }
```

### sovereigntyCriteria (ALLE 8 required + 1 optional)

**Required (boolean):**

- `openSource`, `euHeadquartered`, `hasAudit`, `permissiveLicense`
- `matureProject`, `selfHostable`, `dataPortability`, `openStandards`, `noTelemetryByDefault`

**Optional (enum):**

- `ownerType` ∈ `["independentConsortium", "corporation", "community", "oneManShow"]`

### researchSources Format (pro Item)

```json
{ "type": "url" | "file", "url": "..." }  // ODER "repoPath" für type="file"
```

⚠️ **Jedes researchSources-Item MUSS genau EINES enthalten:** `url` ODER `repoPath`

### Layer & itemKind Enums

- **layer:** `"infrastructure"`, `"platform"`, `"building-blocks"`, `"applications"`, `"sovereign-standards"`
- **itemKind:** `"format"`, `"standard"`, `"protocol"`, `"language"`, `"runtime"`, `"framework"`, `"library"`, `"tool"`, `"platform"`, `"service"`

### itemKind vs. itemKind (Häufige Korrekturen)

| Aktuell falsch                 | Korrekt  | Begründung                                             |
| ------------------------------ | -------- | ------------------------------------------------------ |
| `"service"` für Tools          | `"tool"` | Tools wie Helm, Terraform sind `tool`, nicht `service` |
| `"platform"` für Runtime-Tools | `"tool"` | Argo CD, Argo Workflows sind Tools                     |

### Wann KEIN groupKey?

- Fundamentalstandards (HTTP, TLS, DNS, IPv6, AMQP, Git, etc.)
- Komplementärprotokolle (keine echte Alternative)
- Singuläre Werkzeuge ohne Katalogpendant (z. B. Helm als De-facto-Standard)
- Plattform-exklusive Betriebssysteme

**→ Siehe `data/README.md` für vollständige Regelung (36 bestehende Gruppen)**

---

## ⚡ Schnellreferenz-Tabellen

### ownerType-Zuordnung (Beispiele)

| Organisationstyp                                   | ownerType               | Beispiele                                      |
| -------------------------------------------------- | ----------------------- | ---------------------------------------------- |
| Apache Foundation, CNCF, Eclipse, Linux Foundation | `independentConsortium` | Kubernetes, Helm, Argo CD, Kafka               |
| Microsoft, Google, Amazon, IBM, Oracle             | `corporation`           | Azure DevOps, .NET, Go                         |
| Open-Source-Communities ohne Foundation            | `community`             | Vue.js, React (Meta, aber Community-getrieben) |
| Einzelne Entwickler:innen                          | `oneManShow`            | Selten im Katalog                              |

### Häufige groupKey-Zuordnungen

| itemKind    | Typische groupKeys                                                                  |
| ----------- | ----------------------------------------------------------------------------------- |
| `protocol`  | Meist KEIN groupKey (Fundamentalstandard)                                           |
| `standard`  | Meist KEIN groupKey (W3C, ISO, DIN, etc.)                                           |
| `language`  | `systems-language`, `web-scripting-language`                                        |
| `database`  | `sql-db`, `nosql-db`, `vector-db`                                                   |
| `framework` | `component-framework`, `web-framework`, `ml-framework`, `llm-framework`             |
| `tool`      | `ci-cd`, `workflow-orchestration`, `workflow-automation`, `container-orchestration` |
| `platform`  | `cross-platform-ui-framework`, `container-runtime`                                  |

### sovereigntyCriteria für proprietäre Software

| Kriterium           | Typischer Wert | Begründung                                           |
| ------------------- | -------------- | ---------------------------------------------------- |
| `openSource`        | `false`        | Closed Source                                        |
| `permissiveLicense` | `false`        | Proprietäre Lizenz                                   |
| `selfHostable`      | Prüfen!        | On-Premise möglich? (Appian: true, SaaS-Only: false) |
| `dataPortability`   | `false`        | Vendor Lock-in Risiko                                |
| `openStandards`     | `false`        | Proprietäre APIs/Formate                             |
| `ownerType`         | `corporation`  | Kommerzielles Unternehmen                            |

### sovereigntyCriteria für Open-Source-Standards

| Kriterium              | Typischer Wert          | Beispiele                                        |
| ---------------------- | ----------------------- | ------------------------------------------------ |
| `openSource`           | `true`                  | Offene Spezifikation/Implementierung             |
| `euHeadquartered`      | `false`                 | OASIS (US), IETF (US)                            |
| `hasAudit`             | `false`                 | Standard selbst hat kein Audit                   |
| `permissiveLicense`    | `false`                 | RF-Lizenzen (OASIS RF, W3C) sind nicht permissiv |
| `matureProject`        | `true`                  | Etablierte Standards                             |
| `selfHostable`         | `true`                  | Implementierungen können selbst gehostet werden  |
| `dataPortability`      | `true`                  | Offene Formate                                   |
| `openStandards`        | `true`                  | Offener Standard                                 |
| `noTelemetryByDefault` | `true`                  | Standards haben keine Telemetrie                 |
| `ownerType`            | `independentConsortium` | OASIS, W3C, IETF                                 |

---

## Recherche

**Was:** Für jedes Item die 9 sovereigntyCriteria aktuell prüfen + groupKey verifizieren:

- openSource, euHeadquartered, hasAudit, permissiveLicense
- matureProject, selfHostable, dataPortability, openStandards, noTelemetryByDefault
- **groupKey überprüfen:** Passt die Kategorisierung? Sollte ein groupKey hinzugefügt werden?

**Wie:**

- Mindestens 2 unabhängige, seriöse Quellen (GitHub, Wikipedia, offizielle Website, Fachportale)
- **Alle bestehenden Quellen erneut verifizieren** — Werte anpassen, wenn neue Erkenntnisse
- **WICHTIG: VORHANDENE researchSources NIEMALS LÖSCHEN oder ERSETZEN!**
  - Immer **neue Quellen hinzufügen** (falls relevant)
  - Alle bestehenden researchSources beibehalten und mit neuen Informationen abgleichen
  - Falls eine Quelle unerreichbar ist: mit Kommentar dokumentieren (z.B. `"note": "offline seit 2024-01"`), aber nicht löschen
- Falls keine Quellen gefunden: `researchSources = []` setzen
- **groupKey überprüfen:** Item-Typ identifizieren und mit bestehenden groupKeys in `data/README.md` vergleichen

**Spezialfall:** Addon/Plugin/Extension eines anderen Items?

- Dann: `matureProject = false`, `openStandards = false`, `dataPortability = false`, `selfHostable = false`
- Mit Begründung in `researchSources` dokumentieren

---

## Update

1. **Vor Update:** Aktuelles Item gegen Schema prüfen (`node scripts/validate-schemas.mjs`)
2. `sovereigntyCriteria`-Werte aktualisieren (alle 9 required Fields!)
3. **groupKey überprüfen** und ggf. hinzufügen/aktualisieren
4. `lastResearchDate` (Format: `YYYY-MM-DD`) auf heute setzen
5. `ownerType` aus Enum wählen: `independentConsortium` | `corporation` | `community` | `oneManShow`
6. **Keine Kommentare** im JSON
7. Alle Dateien validieren

---

## Batch-Vorgehen (Empfohlener Workflow)

### Batch-Größe

- **Optimal:** 10-20 Items pro Batch
- **Maximal:** 25 Items pro Batch (bei komplexen Items weniger)

### Batch-Auswahlstrategie

1. **Priorität 1:** Items **OHNE** `lastResearchDate` (wenn vorhanden)
2. **Priorität 2:** Items mit **ältestem** `lastResearchDate`
3. **Priorität 3:** Items **OHNE** `groupKey` (bei gleichen Datumsstempeln)
4. **Priorität 4:** Items mit **unvollständigen** `researchSources` (< 2 Quellen)

### Schritt-für-Schritt Batch-Bearbeitung

#### 1. Batch vorbereiten

```bash
# Items nach Priorität auflisten
node -e "
const fs = require('fs');
const negz = JSON.parse(fs.readFileSync('data/stacks/negz.json', 'utf8'));
const itemIds = [...new Set(negz.items.map(i => i.itemId))];
const results = [];
itemIds.forEach(id => {
  try {
    const path = \`data/items/\${id}.json\`;
    if (fs.existsSync(path)) {
      const item = JSON.parse(fs.readFileSync(path, 'utf8'));
      results.push({
        id,
        lastResearchDate: item.lastResearchDate || 'MISSING',
        hasGroupKey: !!item.groupKey,
        researchSourcesCount: item.researchSources ? item.researchSources.length : 0
      });
    }
  } catch (e) {}
});
results.sort((a, b) => {
  if (!a.lastResearchDate || a.lastResearchDate === 'MISSING') return -1;
  if (!b.lastResearchDate || b.lastResearchDate === 'MISSING') return 1;
  if (!a.hasGroupKey) return -1;
  if (!b.hasGroupKey) return 1;
  return new Date(a.lastResearchDate) - new Date(b.lastResearchDate);
});
console.log(results.slice(0, 15).map(r => \`\${r.id}: date=\${r.lastResearchDate}, groupKey=\${r.hasGroupKey}, sources=\${r.researchSourcesCount}\`).join('\n'));
"
```

#### 2. Batch bearbeiten

Für jedes Item im Batch:

- [ ] Schema-Konformität prüfen (vor dem Update!)
- [ ] Recherche durchführen (2+ neue Quellen finden)
- [ ] **Vorhandene researchSources beibehalten** – nur neue hinzufügen
- [ ] sovereigntyCriteria aktualisieren
- [ ] groupKey setzen (falls zutreffend)
- [ ] ownerType aus Enum wählen
- [ ] lastResearchDate auf heute setzen (YYYY-MM-DD)
- [ ] description auf Deutsch und Englisch ergänzen

#### 3. Batch validieren

```bash
# Schema-Test
node scripts/validate-schemas.mjs

# Erwartet: ✅ All validations passed! (0 Errors)
```

Falls Fehler:

1. Fehlermeldung genau lesen
2. Betroffene Datei öffnen und korrigieren
3. Schema-Test wiederholen
4. Erst nach 0 Errors zum nächsten Batch übergehen

#### 4. Batch abschließen

```bash
# Linting
pnpm lint:ts
pnpm lint:eslint

# Formatierung
pnpm format:write
```

---

## Validierung (MUSS nach jedem Batch!)

**Nach jedem Batch von 10-20 Items:**

```bash
node scripts/validate-schemas.mjs
```

**Erwartetes Ergebnis:** `✅ All validations passed!` (0 Errors)

Falls Fehler:

1. Fehlermeldung lesen (z.B. `/sovereigntyCriteria/ownerType: must be equal to constant`)
2. betroffene Datei korrigieren
3. Schema-Test wiederholen

---

## Quellen

Jede Quelle braucht:

- `type`: "url" | "file"
- **ENTWEDER** `url` (für Web-Links) **ODER** `repoPath` (für Repository-Dateien)

**Wichtig:** Alte, unerreichbare Quellen dokumentieren (z.B. "offline seit [Datum]"), nicht löschen. Historia erhalten.
