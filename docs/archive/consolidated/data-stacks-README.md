---
status: active
owner: Data Engineering
last_reviewed: 2026-04-09
source_of_truth: data/README.md
---

# data/stacks/

Detaildokument fuer Stack-Dateien. Kanonische Gesamtquelle bleibt `data/README.md`.

## Pflichtfelder (Schema)

- `id`
- `name`
- `version`
- `items[]`

## Pflichtfelder je Stack-Item

- `itemId`
- `status` (`recommended|approved|deprecated`)
- `role` (`maintainer|contributor|funder|consumer`)

## Validierung

```bash
pnpm validate-schemas
```
