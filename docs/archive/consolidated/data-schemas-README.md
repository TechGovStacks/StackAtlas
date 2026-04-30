---
status: active
owner: Data Engineering
last_reviewed: 2026-04-09
source_of_truth: data/README.md
---

# data/schemas/

Schema-Referenz fuer `layers`, `items` und `stacks`.

## Hauptschemas

- `layer.schema.json`
- `item.schema.json`
- `stack.schema.json`
- `relation.schema.json`

## Nutzung

```bash
pnpm validate-schemas
```

Die Validierung ist als Quality Gate fuer lokale Entwicklung und CI gedacht.
