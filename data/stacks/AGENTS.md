# Agenten-Anweisung: Stack-Verifizierung

Diese Routine verifiziert **Stack-Definitionen** (`data/stacks/*.json`) sukzessive und kontinuierlich:
Sind die enthaltenen Items noch korrekt, vollständig und mit passendem Status/Rolle hinterlegt?
Stimmen Quellen, Version und Metadaten? Pro Lauf wird **genau ein Stack** vollständig verifiziert
(Rotation), sodass über die Zeit alle Stacks regelmäßig aktualisiert werden.

> **Verhältnis zur Item-Routine:** Diese Datei pflegt die **Stack-Ebene** (Mitgliedschaften, Rollen,
> Status, Quellen). Die Datei `data/items/AGENTS.md` pflegt die **Item-Ebene**
> (`sovereigntyCriteria`, `groupKey`). Beide zusammen halten das **Ranking** aktuell — siehe unten.

---

## Scope

- Alle Dateien in `data/stacks/*.json` (außer dieser `AGENTS.md`).
- **Pro Lauf genau einen Stack** verifizieren — den am längsten nicht verifizierten (Rotation, siehe
  "Stack-Auswahl").
- Items selbst (`data/items/*.json`) NICHT in dieser Routine ändern → das macht `data/items/AGENTS.md`.
  Falls ein referenziertes Item fehlt oder grob veraltet ist, hier nur **dokumentieren/melden**.

## Stack-Auswahl (Rotation)

Es gibt kein `lastVerified`-Feld im Schema (`additionalProperties: false`). Daher deterministische
Rotation über alle Stacks anhand des Tages im Jahr — so wird jeder Stack gleichmäßig abgedeckt:

```bash
node -e "
const fs = require('fs');
const dir = 'data/stacks';
const stacks = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - start) / 86400000);
const pick = stacks[dayOfYear % stacks.length];
console.log('Anzahl Stacks:', stacks.length);
console.log('Heute zu verifizieren:', pick);
"
```

→ Die ausgegebene Datei ist der **einzige** Stack, der in diesem Lauf bearbeitet wird.

---

## Was wird verifiziert? (Checkliste pro Stack)

### 1. Schema-Konformität (`data/schemas/stack.schema.json`)

**Required Top-Level-Felder:** `id`, `name` (`{ de, en }`), `version`, `items`.

**Optional, aber pflegen:** `description`, `country` (ISO-3166-1 alpha-2, z. B. `DE`), `issuer`,
`publishedAt` (`YYYY-MM-DD`), `sources`, `participants`.

> **Keine Kommentare** im JSON. `additionalProperties: false` → keine zusätzlichen Felder erfinden.

### 2. Referentielle Integrität (KRITISCH)

- [ ] Jede `items[].itemId` existiert als `data/items/<itemId>.json`.
- [ ] `itemId` passt zum Pattern `^[a-z0-9]([a-z0-9-]*[a-z0-9])?$`.
- [ ] **Keine doppelten** `itemId` innerhalb desselben Stacks.
- [ ] `alternatives[]` (falls vorhanden) verweisen ebenfalls auf existierende Item-IDs.

> Fehlt ein Item-File: NICHT hier neu anlegen. Stattdessen im PR-Body unter "Fehlende Items" melden
> (Anlage ist Aufgabe der Item-Kuratierung).

### 3. Status & Rolle korrekt

- [ ] `status` ∈ `["recommended", "approved", "deprecated"]`.
- [ ] `role` ∈ `["maintainer", "contributor", "funder", "consumer"]`.
- [ ] **Plausibilität gegen die reale Quelle prüfen:** Ist das Land/die Organisation tatsächlich
      `maintainer` (entwickelt/betreibt selbst) vs. `consumer` (nutzt nur)? Falsche Rollen verzerren
      das Adoption-Ranking (Gewichte: maintainer 1.0, contributor 0.75, funder 0.5, consumer 0.25).
- [ ] Offiziell abgekündigte/ersetzte Technologien auf `deprecated` setzen.

### 4. Aktualität des Stacks (inhaltliche Recherche)

Anhand der offiziellen Quelle(n) des Stacks prüfen:

- [ ] **Neue Items**, die der Stack inzwischen empfiehlt → mit `status`, `role`, `since` (`YYYY-MM-DD`),
      ggf. `rationale` (`{ de, en }`) ergänzen.
- [ ] **Entfernte/ersetzte Items** → auf `deprecated` setzen (nicht löschen, Historie erhalten) und
      ggf. `alternatives` ergänzen.
- [ ] Geänderte Empfehlungen → `status`/`role` anpassen.

### 5. Quellen & Metadaten

- [ ] `sources[]`: jede `url` (Format `uri`, `type: "url"`) erreichbar? Tote Links durch die
      aktuelle offizielle URL ersetzen; mindestens **eine** belastbare Primärquelle pro Stack.
- [ ] `publishedAt` und `version` aktualisieren, **wenn** sich der Stack inhaltlich geändert hat
      (Items hinzugefügt/entfernt/umgestuft). `version` als SemVer erhöhen (Patch bei kleinen,
      Minor bei größeren Änderungen).
- [ ] `participants[]`: Rolle ∈ Enum, `jurisdiction` als ISO-Code oder `EU`, `url` erreichbar.

---

## Recherche-Vorgaben

- Mindestens **2 unabhängige, seriöse Quellen** (offizielle Regierungs-/Organisationsseite,
  Architektur-/Standard-Dokumente, GitHub-Org, etablierte Fachportale).
- **Bestehende `sources` niemals ersatzlos löschen** — nur ergänzen oder eine tote URL durch ihre
  aktuelle Entsprechung ersetzen.
- Sprache: `name`/`description`/`rationale` immer `de` UND `en` pflegen.

---

## Update & Validierung (MUSS nach jeder Bearbeitung)

```bash
# 1. Schema- und Referenz-Integrität (prüft auch: Item-IDs existieren, keine Duplikate)
node scripts/validate-schemas.mjs
# Erwartet: ✅ All validations passed! (0 Errors)

# 2. Formatierung
pnpm format:write
```

Bei Fehlern: Meldung lesen → betroffene Stelle korrigieren → erneut validieren. Erst bei **0 Errors**
abschließen.

> **Ranking / Generierte Dateien:** Adoption- und Overall-Score hängen direkt von den
> Stack-Mitgliedschaften (Rolle × Status) ab und werden bei jedem Build durch
> `scripts/generate-data.mjs` neu berechnet. Korrekte Stacks ⇒ korrektes Ranking — automatisch.
> **`src/data/*.generated.ts` niemals committen** (sind in `.gitignore`).

---

## PR-Konventionen

- **Genau ein Stack pro PR/Lauf.**
- Commit-/PR-Titel nach Conventional Commits, z. B.:
  - `fix: Correct roles in germany stack`
  - `feat: Add new recommended items to estonia stack`
  - `chore: Verify and refresh france stack sources`
- Im PR-Body kurz dokumentieren: **Welcher Stack**, **was geändert** (Items hinzugefügt/umgestuft,
  Quellen aktualisiert) und ggf. **Fehlende Items** (referenziert, aber keine `data/items/<id>.json`).
