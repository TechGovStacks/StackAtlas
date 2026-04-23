---
status: active
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

# Dokumentation

Dieses Dokument ist das Rahmendokument fuer die aktive Projektdokumentation.

## Aktive Dokumente

- `docs/BUSSINESS_CASE.md` fuer Vision, Nutzen, Zielbild und fachliche Spezifikation
- `docs/ARC42.md` fuer technische Architektur, Datenmodell, Qualitaetsziele und Betrieb

## Geltung

- Nur Dokumente mit `status: active` ausserhalb von `docs/archive/` sind normativ.
- `docs/archive/` enthaelt historische Entwuerfe, Rohquellen und abgeloeste Zwischenstaende.

## Einstieg

1. Produkt- und Strategiefragen: `docs/BUSSINESS_CASE.md`
2. Technische Umsetzung und Architektur: `docs/ARC42.md`
3. Repo- und Verzeichnis-Kontext: `README.md` im Root und `data/README.md`
4. Exemplarische Erklärung des Dependency-Modells: `docs/examples/items-as-dependencies.md`

## Governance-Hinweis zu Foundations

Bei der Einordnung von Open-Source- und Standardisierungs-Foundationen sollte beruecksichtigt werden, dass hinter formaler Neutralitaet haeufig starke Konzerninteressen und Finanzierungsabhaengigkeiten stehen koennen. Als Kontextquelle: [Heise-Einordnung](https://www.heise.de/blog/Open-Source-ist-nicht-das-Problem-sondern-sein-Missbrauch-durch-Konzerne-11244125.html).

## Konzeptueller Überblick: Items → Dependencies → Sovereign Standards → Stack Commitments

Das System folgt einem konsistenten Modell:

- **Items** sind Technologien, Standards und Tools
- **Alle Items sind Dependencies** — Abhängigkeiten, die in 5 Layern organisiert sind
- **Sovereign-Standards** (Layer 5) sind die echten Grundlagen-Standards
- **Stacks** committen sich zu Items durch Rollen: maintainer, contributor, funder, oder consumer
- Für Sovereign-Standards zeigt die Rolle die Verantwortung: Will der Stack diesen Standard aktiv entwickeln oder nutzt er ihn nur?

Siehe `docs/examples/items-as-dependencies.md` für praktische Beispiele.
