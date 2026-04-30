# Stack Atlas

[![CI](https://github.com/techgovstacks/stackatlas/workflows/CI/badge.svg)](https://github.com/techgovstacks/stackatlas/actions)
[![License: EUPL-1.2](https://img.shields.io/badge/License-EUPL-blue.svg)](LICENSE)

Interaktive Vergleichsplattform für staatliche und organisationale Tech-Stacks mit Fokus auf digitale Souveränität.

**Live:** [Projekt-Demo auf GitHub Pages](https://techgovstacks.github.io/StackAtlas/)

---

## Schnelleinstieg

```bash
# Clone & install
git clone https://github.com/techgovstacks/stackatlas.git
cd stackatlas
pnpm i

# Development
pnpm dev

# Code-Qualität
pnpm lint

# Tests
pnpm test
pnpm test:e2e

# Build
pnpm build
```

## Tech Stack

- **Frontend:** [Preact](https://preactjs.com/) — lightweight React alternative
- **Build Tool:** [Vite](https://vitejs.dev/) — lightning-fast bundler
- **Styling:** [UnoCSS](https://uno.antfu.org/) — instant-on-demand atomic CSS
- **Components:** [KoliBri](https://public-ui.github.io/) — accessible web components
- **i18n:** [i18next](https://www.i18next.com/) — internationalization
- **Testing:** [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)

## Dokumentation

- **Startpunkt:** [docs/README.md](docs/README.md)
- **Business Context:** [docs/BUSINESS_CASE.md](docs/BUSINESS_CASE.md)
- **Architecture (ARC42):** [docs/ARC42.md](docs/ARC42.md)
- **Scoring Design:** [docs/SCORING_SCALE_DESIGN.md](docs/SCORING_SCALE_DESIGN.md)

## Beitragen

Interessiert am Beitrag? Wir freuen uns auf PRs! Bitte lesen Sie:

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Developer-Richtlinien
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — Verhaltensrichtlinien
- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Setup und Architektur
- **[SECURITY.md](SECURITY.md)** — Sicherheitsrichtlinien

## Issues melden

Verwenden Sie unsere GitHub Issue-Templates:

- 🐛 [Bug Report](../../issues/new?template=bug_report.yml)
- ✨ [Feature Request](../../issues/new?template=feature_request.yml)
- 📝 [Data Correction](../../issues/new?template=data_correction.yml)

## Lokale Entwicklung

```bash
pnpm i
pnpm dev
pnpm lint
pnpm test:e2e
pnpm build
```

Weitere Details: [DEVELOPMENT.md](DEVELOPMENT.md)

## Lizenz

[MIT](LICENSE)

## Kontakt

- 📧 Security: [SECURITY.md](SECURITY.md)
- 💬 Issues: [GitHub Issues](https://github.com/techgovstacks/stackatlas/issues)
- 📋 Website: https://techgovstacks.github.io/StackAtlas/
