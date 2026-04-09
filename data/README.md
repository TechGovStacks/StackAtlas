---
status: active
owner: Data Engineering
last_reviewed: 2026-04-09
source_of_truth: data/README.md
---

# data/ - Kanonisches Datenmodell

Dieses Dokument ist die kanonische Quelle fuer Datenstruktur, IDs und operative Konventionen.

## Verzeichnisstruktur

- `data/layers/` - 5 Layer-Definitionen
- `data/items/` - Technologie-Items
- `data/stacks/` - Stack-Zusammenstellungen
- `data/schemas/` - JSON-Schemas

## Verbindliche Layer-IDs

1. `infrastructure`
2. `platform`
3. `building-blocks`
4. `applications`
5. `sovereign-standards`

## Mindestanforderungen fuer Item-Daten

- `id`
- `name`
- `layer`
- `description`
- `oss`
- `sovereigntyCriteria`

Empfohlen zusaetzlich: `sublayer`, `homepage`, `logo`, `maturity`, `tags`.

## Validierung

```bash
pnpm validate-schemas
```

## Scoring-Bezug

Die strukturelle Datenseite ist hier kanonisch. Inhaltliche Bewertungslogik ist kanonisch in:

- `docs/scoring/sovereignty-scoring-model.md`

## Detaildokumente

- `data/layers/README.md`
- `data/items/README.md`
- `data/stacks/README.md`
- `data/schemas/README.md`
