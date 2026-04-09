---
status: active
owner: Product and Engineering
last_reviewed: 2026-04-09
source_of_truth: docs/DOCS_HUB.md
---

# Stack Atlas

Interaktive Vergleichsplattform fuer staatliche und organisationale Tech-Stacks mit Fokus auf digitale Souveraenitaet.

**Live:** [Projekt-Demo auf GitHub Pages](https://deleonio.github.io/accessible-d-stack-landscape/)

## Primarer Doku-Einstieg

- Zentrale Navigation: `docs/DOCS_HUB.md`
- Rollenbasierter Einstieg: `START_HERE.md`

## Zielbild

1. Vergleichen: Welche Technologien werden in welchen Stacks verwendet?
2. Synergien erkennen: Welche Standards und Komponenten lassen sich wiederverwenden?
3. Souveraenitaet bewerten: Wie unabhaengig, portabel und nachvollziehbar ist ein Stack?

## Tech Stack (Ist-Stand)

- UI: Preact 10
- Build: Vite
- Styling: UnoCSS + SCSS
- Komponenten: KoliBri (`@public-ui/preact`)
- Formulare: React Hook Form + Zod
- Tests: Playwright + axe-core

## Lokale Entwicklung

```bash
pnpm i
pnpm dev
pnpm lint
pnpm test:e2e
pnpm build
```

## Kanonische Domaenenquellen

- Produkt/Strategie: `docs/business-case/app-konzept.md`
- Architektur/Implementierung: `docs/architecture/engineering-reference.md`
- Scoring: `docs/scoring/sovereignty-scoring-model.md`
- Daten/Operational: `data/README.md`
- Design: `docs/DESIGN_SYSTEM.md`
