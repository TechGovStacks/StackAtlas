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

## Community-getriebene Datenbasis

StackAtlas wird von der Community gepflegt. Die Datenbasis basiert auf Open-Source-Daten, die von Contributoren wie Ihnen gepfegt und erweitert werden.

### Neue Stacks hinzufügen

1. Öffnen Sie einen Issue mit dem [New Stack Template](.github/ISSUE_TEMPLATE/new_stack.yml)
2. Beschreiben Sie die Komponenten des Stacks und deren Verwendungszweck
3. Vergewissern Sie sich, dass alle Komponenten bereits in StackAtlas dokumentiert sind
4. Maintainer werden den Stack zur Datenbasis hinzufügen

### Neue Technologien/Standards vorschlagen

1. Öffnen Sie einen Issue mit dem [New Item Template](.github/ISSUE_TEMPLATE/new_item.yml)
2. Geben Sie detaillierte Informationen zu Technologie/Standard an
3. Stellen Sie sicher, dass ein gültiger Link zur offiziellen Quelle vorhanden ist
4. Maintainer werden das Item nach Überprüfung hinzufügen

### Stack- oder Item-Daten korrigieren

1. Öffnen Sie einen Issue mit dem [Data Correction Template](.github/ISSUE_TEMPLATE/data_correction.yml)
2. Beschreiben Sie klar, was fehlerhaft ist und wie es korrigiert werden sollte
3. Geben Sie eine zuverlässige Quelle an, die die Korrektur belegt
4. Maintainer werden die Änderungen überprüfen und durchführen

### Daten-Validierung

Wenn Sie selbst Daten bearbeiten:

1. Validieren Sie mit `pnpm validate-schemas`
2. Siehe [data/README.md](data/README.md) für Schema-Dokumentation
3. Stellen Sie sicher, dass alle Referenzen korrekt sind

## Issue-Tracker

Verwenden Sie diese Templates:

- [Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml) — Fehlerberichte
- [Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml) — Feature-Wünsche
- [New Stack](.github/ISSUE_TEMPLATE/new_stack.yml) — Neue Tech-Stacks vorschlagen
- [New Item](.github/ISSUE_TEMPLATE/new_item.yml) — Neue Technologien/Standards vorschlagen
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
