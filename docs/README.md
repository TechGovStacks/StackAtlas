---
status: active
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

# Konsolidierte Projektdokumentation

Wenn du nur **eine** Doku lesen willst: diese Datei.

## 1) Was ist gueltig?

- Nur Dokumente mit `status: active` ausserhalb von `docs/archive/`.
- Historische Entwuerfe und KI-Rohquellen liegen in `docs/archive/` und sind nicht normativ.

## 2) Produkt und Zielbild

StackAtlas vergleicht Tech-Stacks und macht digitale Souveraenitaet transparent.

- Vergleich von Stacks (Laender/Organisationen)
- Souveraenitaets-Score pro Item als Basis fuer Stack-Score
- Begruendete Entscheidungen mit Evidenzbezug

Die Produktleitlinien sind in dieser konsolidierten Doku enthalten.

## 3) Architektur (Ist-Stand)

- Preact 10 + Vite
- KoliBri (`@public-ui/preact`) ist Standardkomponenten-Basis
- UnoCSS fuer Layout, SCSS/BEM fuer visuelle Komponentenstile
- TypeScript strict, ESLint, Stylelint, Playwright + axe-core

Nicht mehr gueltig (nur historisch im Archiv):
- React/React-Router-MVP-Blueprints
- Phase-1b/1c Setup-Anleitungen aus der Altplanung

Die Architekturleitlinien sind in dieser konsolidierten Doku enthalten.

## 4) Scoring (kanonische Fassung)

- Bewertungsrahmen mit K1-K7 (0-100)
- Evidenzpflicht mit Quellenklassen Q1-Q6
- Guardrails fuer kritische Kriterien (Deckelung)

Die Scoring-Leitlinien sind in dieser konsolidierten Doku enthalten.

## 5) Designregel (3 vs 5 Layer)

- Branding bleibt 3-layerig (z. B. Favicon/Key Visual)
- Produktvisualisierung und Datenmodell duerfen 5-layerig sein
- Bei Konflikt gilt: Datenkonsistenz und Produktverstaendnis vor Branding-Vereinfachung

Die Designregeln sind in dieser konsolidierten Doku enthalten.

## 6) Datenmodell und Terminologie

Verbindliche Layer-IDs:

1. `infrastructure`
2. `platform`
3. `building-blocks`
4. `applications`
5. `sovereign-standards`

Mindestfelder fuer Items:
- `id`, `name`, `layer`, `description`, `oss`, `sovereigntyCriteria`

Empfohlene Item-Felder:
- `sublayer`, `homepage`, `logo`, `maturity`, `tags`, `audit`

Pflichtfelder fuer Stack-Definition:
- `id`, `name`, `version`, `items[]`

Pflichtfelder je Stack-Item:
- `itemId`
- `status` (`recommended|approved|deprecated`)
- `role` (`maintainer|contributor|funder|consumer`)

Hauptschemas:
- `data/schemas/layer.schema.json`
- `data/schemas/item.schema.json`
- `data/schemas/stack.schema.json`
- `data/schemas/relation.schema.json`

## 7) Operations

- Externe Logos:
  - Tool: `scripts/fetch-external-logos.mjs`
  - Mapping: `src/data/logo-urls.json`
  - Fallback: `/assets/broken-logo.svg`
  - Prioritaet: Simple Icons -> hinterlegte externe URL -> Wikidata -> Wikipedia
- Schema-Validierung: `pnpm validate-schemas`

Logo-Commands:

```bash
node scripts/fetch-external-logos.mjs
node scripts/fetch-external-logos.mjs --update
node scripts/fetch-external-logos.mjs --dry-run
node scripts/fetch-external-logos.mjs --validate
```

## 8) Start in 2 Minuten

1. Dieses Dokument lesen
2. Optional nur fuer schnelle Verzeichnis-Checks in `data/README.md` springen.
