# Contributing to StackAtlas

Vielen Dank für Ihr Interesse, zu StackAtlas beizutragen! Dieses Dokument enthält Richtlinien und Anweisungen für Contributors.

## Verhaltensrichtlinien

Bitte beachten Sie unseren [Code of Conduct](CODE_OF_CONDUCT.md). Wir sind verpflichtet, einen freundlichen und respektvollen Workspace für alle zu bieten.

## Sicherheit

Falls Sie ein Sicherheitsproblem entdecken, melden Sie es bitte **vertraulich** über [SECURITY.md](SECURITY.md). Offenlegen Sie Sicherheitsproblem nicht öffentlich.

## Voraussetzungen

- Node.js 25+
- pnpm 10+

## Lokale Entwicklung einrichten

```bash
# Clone the repository
git clone https://github.com/techgovstacks/stackatlas.git
cd stackatlas

# Install dependencies
pnpm i

# Start development server
pnpm dev
```

## Entwicklungs-Workflow

```bash
# Lint code
pnpm lint

# Run tests
pnpm test

# Validate data schemas
pnpm validate-schemas

# Build for production
pnpm build

# Run E2E tests
pnpm test:e2e
```

## Branch-Konventionen

Verwenden Sie folgende Branch-Präfixe:

- `feat/` — neue Features
- `fix/` — Bugfixes
- `docs/` — Dokumentation
- `chore/` — Wartung, Abhängigkeiten
- `refactor/` — Code-Refactoring

Beispiel: `feat/add-new-score-metric`

## Commit-Konventionen

Folgen Sie dem [Conventional Commits](https://www.conventionalcommits.org/) Format:

```
type(scope): subject

body

footer
```

**Types:**

- `feat` — neue Features
- `fix` — Bugfixes
- `docs` — Dokumentation
- `style` — Formatting, fehlende Semikolons, etc.
- `refactor` — Code-Umstrukturierung
- `test` — Test-Änderungen
- `chore` — Build-Prozess, Dependencies

Beispiel:

```
feat(scoring): add new sovereignty metric

This metric evaluates cloud infrastructure resilience.

Closes #123
```

## Pull Request Prozess

1. **Fork und Branch erstellen**

   ```bash
   git checkout -b feat/your-feature
   ```

2. **Code committen**
   - Folgen Sie Commit-Konventionen
   - Schreiben Sie aussagekräftige Commit-Messages

3. **Push und PR erstellen**

   ```bash
   git push origin feat/your-feature
   ```

4. **PR-Vorlage ausfüllen**
   - Beschreiben Sie die Änderungen
   - Referenzieren Sie zugehörige Issues
   - Fügen Sie Screenshots bei UI-Änderungen ein

5. **Checkliste erfüllen**
   - [ ] Tests lokal grün (`pnpm test`)
   - [ ] Lint-Checks bestanden (`pnpm lint`)
   - [ ] Daten-Schemas validiert (`pnpm validate-schemas` bei Datenänderungen)
   - [ ] Screenshots bei UI-Änderungen hinzugefügt
   - [ ] i18n-Strings bei neuen UI-Elementen ergänzt

6. **Review-Prozess**
   - Maintainer werden Ihren PR überprüfen
   - Feedback adressieren und neu committen (nicht amend)
   - PR wird gemerged, wenn all Checks grün sind

## Daten-Beiträge

Für Stack- oder Item-Korrektionen:

1. Öffnen Sie einen Issue mit dem [Data Correction Template](.github/ISSUE_TEMPLATE/data_correction.yml)
2. Referenzieren Sie die betroffene Datei unter `data/`
3. Validieren Sie mit `pnpm validate-schemas`
4. Siehe [data/README.md](data/README.md) für Schema-Dokumentation

## Issue-Tracker

Verwenden Sie diese Templates:

- [Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml) — Fehlerberichte
- [Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml) — Feature-Wünsche
- [Data Correction](.github/ISSUE_TEMPLATE/data_correction.yml) — Stack/Item-Korrektionen

## AI-Beitragende

Falls Sie ein AI-Tool wie GitHub Copilot verwenden, beachten Sie:

- [CLA.md](CLA.md) für Contributor License Agreement
- [AGENTS.md](AGENTS.md) für AI-spezifische Richtlinien

## Hilfreiche Ressourcen

- **Architektur:** [docs/ARC42.md](docs/ARC42.md)
- **Lokale Entwicklung:** [DEVELOPMENT.md](DEVELOPMENT.md)
- **Scoring-System:** [docs/SCORING_SCALE_DESIGN.md](docs/SCORING_SCALE_DESIGN.md)
- **Tech Stack:** Siehe [DEVELOPMENT.md](DEVELOPMENT.md)

## Fragen?

- 💬 GitHub Discussions (falls aktiviert)
- 📝 [GitHub Issues](https://github.com/techgovstacks/stackatlas/issues)
- 📧 Kontaktieren Sie das Team

---

**Danke, dass Sie StackAtlas besser machen!** 🚀
