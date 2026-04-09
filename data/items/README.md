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

## Ownership-Metrik (`sovereigntyCriteria.ownerType`)

Fuer jedes Item wird verpflichtend ein Ownership-Typ gepflegt, damit die Souveraenitaetsbewertung konsistent bleibt.

- `independentConsortium`: neutrale Standardisierungsgremien, Foundations oder Multi-Stakeholder-Governance
- `community`: offene Community-getriebene Projekte ohne dominante Einzelanbieter-Steuerung
- `corporation`: primaer von einem Unternehmen gesteuerte Roadmap/Steuerung
- `oneManShow`: im Wesentlichen durch einzelne Maintainer verantwortet

Hinweis zur Bewertung: Fehlt `ownerType`, wird der Gesamt-Score aktuell auf 60 gedeckelt. Deshalb sollen neue Items immer mit `ownerType` angelegt werden.

Automatisierte Herleitung und Pflege fuer alle Items:

```bash
pnpm assign-owner-types
```
