---
status: active
owner: Data Governance
last_reviewed: 2026-04-09
source_of_truth: data/README.md
---

# Stack-Layer-Zuordnung

Detailreferenz fuer Layer- und Sublayer-Zuordnung. Terminologie ist mit `data/README.md` und den JSON-Schemas synchron.

## Pflichtfelder fuer neue Items

1. `layer` (eine gueltige Layer-ID)
2. `sublayer` (ein gueltiger Bereich innerhalb des Layers)
3. `description.de` (fachliche Einordnung)

## Layer-IDs (verbindlich)

| Order | Layer-ID | Name (DE) |
| ---: | --- | --- |
| 1 | `infrastructure` | Infrastruktur |
| 2 | `platform` | Plattform |
| 3 | `building-blocks` | Bausteine |
| 4 | `applications` | Anwendungen |
| 5 | `sovereign-standards` | Souveraenitaetsstandards |

## Sublayer-Bereiche

### Infrastructure
- `anschluss`
- `transport`
- `verteilung`

### Platform
- `daten`
- `integration`
- `ki`
- `lowcode`

### Building Blocks
- `sprachen`
- `frameworks`
- `inbetriebnahme`
- `sicherheit`

### Applications
- `browser`
- `native-apps`

### Sovereign Standards
- `ux`
- `kommunikation`
- `ki-souveraen`

## Hinweis

`docs/STACK_LAYER_BEREICHE.md` ist Detailreferenz; die kanonische Datenquelle bleibt `data/README.md`.
