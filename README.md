---
status: active
owner: Product and Engineering
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

# Stack Atlas

Interaktive Vergleichsplattform fuer staatliche und organisationale Tech-Stacks mit Fokus auf digitale Souveraenitaet.

**Live:** [Projekt-Demo auf GitHub Pages](https://deleonio.github.io/accessible-d-stack-landscape/)

## Doku (ein Einstieg)

- `docs/README.md`
- `docs/BUSSINESS_CASE.md`
- `docs/ARC42.md`

## Lokale Entwicklung

```bash
pnpm i
pnpm dev
pnpm lint
pnpm test:e2e
pnpm build
```

## App-Stack

- **Build & Tooling:** Vite, TypeScript, UnoCSS, SCSS
- **Deployment:** GitHub Pages
- **Framework:** Preact 10 (`jsxImportSource: preact`)
- **Komponenten:** KoliBri (`@public-ui/components`, `@public-ui/preact`)
- **PWA/Mobile:** `vite-plugin-pwa`, Capacitor (Android/iOS)
- **Qualitaet:** ESLint, Stylelint, Prettier, Knip
- **Testing:** Playwright (E2E + axe-core)
