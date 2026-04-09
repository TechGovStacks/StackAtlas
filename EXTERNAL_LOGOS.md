---
status: active
owner: Data Engineering
last_reviewed: 2026-04-09
source_of_truth: data/README.md
---

# External Logo Management

Operative Referenz fuer externe Logo-URLs der Items.

## Zweck

- Repo klein halten (keine lokale Massenspeicherung von Logos)
- Offizielle Logos bevorzugt aus oeffentlichen Quellen beziehen
- Fallback sicherstellen, wenn keine oeffentliche Logoquelle verfuegbar ist

## Befehle

```bash
node scripts/fetch-external-logos.mjs
node scripts/fetch-external-logos.mjs --update
node scripts/fetch-external-logos.mjs --dry-run
node scripts/fetch-external-logos.mjs --validate
```

## Output

- Mapping-Datei: `src/data/logo-urls.json`
- Fallback bei fehlender Quelle: `/assets/broken-logo.svg`

## Quellenprioritaet

1. Simple Icons CDN
2. Bereits hinterlegte externe URL
3. Wikidata (P154/P18)
4. Wikipedia page image
