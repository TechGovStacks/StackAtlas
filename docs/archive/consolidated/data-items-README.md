---
status: active
owner: Data Engineering
last_reviewed: 2026-04-09
source_of_truth: data/README.md
---

# data/items/

Detaildokument fuer Item-Dateien. Kanonische Gesamtquelle bleibt `data/README.md`.

## Erwartete Kernfelder (Schema)

- `id`
- `name`
- `layer`
- `description`
- `oss`
- `sovereigntyCriteria`

## Empfohlene Zusatzfelder

- `sublayer`
- `homepage`
- `logo`
- `tags`
- `maturity`
- `audit`

## Validierung

```bash
pnpm validate-schemas
```
