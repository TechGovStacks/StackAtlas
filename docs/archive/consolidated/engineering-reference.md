---
status: active
owner: Frontend Architecture
last_reviewed: 2026-04-09
source_of_truth: docs/architecture/engineering-reference.md
---

# Engineering Reference

## Aktueller Ist-Stand

- Framework: Preact 10 + Vite
- Komponenten: KoliBri via `@public-ui/preact`
- Styling: UnoCSS (Layout) + SCSS/BEM (Komponentenstil)
- Tests: Playwright E2E + axe-core
- Build/Lint: pnpm, TypeScript strict, ESLint, Stylelint, Prettier

## Nicht mehr gueltige Alt-Annahmen

Die folgenden Inhalte sind historisch und nicht mehr normativ:

- React- und React-Router-Blueprints
- Phase-1b/1c MVP-Setupplaene aus der Initialarchitektur
- KERN-Altvorgaben aus den fruehen Architekturentwuerfen

Historische Versionen: `docs/archive/architecture/`

## Verbindliche Engineering-Regeln

- KoliBri first: Wenn eine KoliBri-Komponente existiert, wird sie verwendet.
- Keine Rohtranskripte oder Chat-Dumps in aktiver Doku.
- Terminologie konsistent mit Datenmodell: `infrastructure`, `platform`, `building-blocks`, `applications`, `sovereign-standards`.

## Referenzen

- Hub: `docs/README.md`
- Quick Reference: `docs/architecture/quick-reference.md`
- Datenmodell: `data/README.md`
- Layer-Zuordnung: `docs/STACK_LAYER_BEREICHE.md`
