---
status: active
owner: UX and Frontend Design
last_reviewed: 2026-04-09
source_of_truth: docs/DESIGN_SYSTEM.md
---

# Design System und Branding

## Normativer Stand

Dieses Dokument ist die kanonische Designquelle fuer visuelle Leitlinien und Layer-Darstellung.

## Layer-Modell (Designregel)

- **Primarregel (Branding):** 3-Layer-Pyramide fuer Brand Assets (Favicon, Key Visuals, kompakte Kommunikation).
- **Uebergangsregel (Produktvisualisierung):** 5-Layer-Darstellung ist im Splash und im Datenmodell weiterhin erlaubt.
- **Prioritaet bei Konflikt:** Datenkonsistenz und Produktverstaendnis gehen vor; Brand-Assets bleiben 3-layerig.

## Farben

- Primary Blue: `#003d82`
- Building Blocks Green: `#00883d`
- Applications Orange: `#f39c12`
- Sovereign White: `#f5f5f5` bis `#ffffff`

## Umsetzungshinweise

- KoliBri-Komponenten nicht intern ueberschreiben.
- Layout und Responsiveness ueber UnoCSS Utilities.
- Komponentenspezifische visuelle Styles ueber SCSS/BEM.

## Referenzen

- Architektur: `docs/architecture/engineering-reference.md`
- Layer-Zuordnung: `docs/STACK_LAYER_BEREICHE.md`
- Datenmodell: `data/README.md`

## Historische Designentwuerfe

Fruehere Animationskonzepte liegen unter `docs/archive/design/` und sind nicht normativ.
