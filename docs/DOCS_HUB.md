---
status: active
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/DOCS_HUB.md
---

# Docs Hub

Zentraler Einstieg fuer alle Stakeholder und Developer.

## Kanonische Dokument-Hierarchie

| Domaene | Kanonisches Dokument | Zielgruppe | Status |
| --- | --- | --- | --- |
| Produkt/Strategie | `docs/business-case/app-konzept.md` | Product, Stakeholder, Strategie | active |
| Architektur/Implementierung | `docs/architecture/engineering-reference.md` | Engineering, Tech Lead | active |
| Scoring | `docs/scoring/sovereignty-scoring-model.md` | Product, Data, Governance | active |
| Daten/Operational | `data/README.md` | Data Engineering, Maintainer | active |
| Design | `docs/DESIGN_SYSTEM.md` | UX, Frontend, Brand | active |

## Ergaenzende aktive Referenzen

- Architektur-Kurzuebersicht: `docs/architecture/quick-reference.md`
- Layer-Zuordnung (Detailreferenz): `docs/STACK_LAYER_BEREICHE.md`
- Daten-Teilreferenzen: `data/items/README.md`, `data/layers/README.md`, `data/stacks/README.md`, `data/schemas/README.md`
- Operativer Logo-Prozess: `EXTERNAL_LOGOS.md`

## Archiv (nicht normativ)

Alle historischen Entwuerfe und KI-Rohquellen liegen unter `docs/archive/` und sind **nicht normativ**.

## Governance

### Frontmatter-Standard fuer aktive Docs

```yaml
status: draft|active|archived
owner: <team-or-role>
last_reviewed: YYYY-MM-DD
source_of_truth: <path-zur-kanonischen-quelle>
```

### Regeln

- Pro Domaene genau eine kanonische Quelle mit `source_of_truth` auf sich selbst.
- Keine Roh-KI-Transkripte in aktiven Dokumenten.
- Interne Links bei Umbenennungen im selben Change aktualisieren.
- Review-Checkliste pro Doku-PR: Terminologie, Link-Integritaet, Ist-Architektur.
