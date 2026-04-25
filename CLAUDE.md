# Claude Code Guidelines for StackAtlas

Diese Datei enthält verbindliche Regeln für alle KI-Agenten (Claude & andere) bei der Arbeit an diesem Repository.

## 🚨 Kritische Regeln (MUSS eingehalten werden)

### 1. Code-Formatting VOR jedem Commit

```bash
pnpm format
```

**Warum**: Prettier muss vor jedem Commit laufen. Der Pre-Commit-Hook erzwingt das, aber es ist sicherer, manuell zu formatieren.

**Ablauf**:

1. Änderungen machen
2. `pnpm format` laufen (formatiert alle Dateien)
3. Änderungen reviewen
4. Committen

### 2. PR-Titel MUSS dem Schema entsprechen

**Format**: `<type>: <beschreibung>` (Englisch oder Deutsch, nicht gemischt)

**Gültige Types**:

- `feat`: Neue Funktionalität
- `fix`: Bug-Fix
- `docs`: Dokumentation
- `style`: Code-Style (Prettier, etc.)
- `refactor`: Code-Umstrukturierung ohne Funktionsänderung
- `perf`: Performance-Verbesserung
- `test`: Tests hinzufügen/ändern
- `chore`: Build, Dependencies, Scripts
- `ci`: CI/CD-Workflow-Änderungen

**Gültige Beispiele**:

- ✅ `feat: Add user authentication`
- ✅ `fix: Handle null values in parser`
- ✅ `ci: Add unit tests to workflow`
- ✅ `docs: Update contributing guidelines`

**UNGÜLTIGE Beispiele** (werden abgelehnt):

- ❌ `Phase C1: Add type-safe JSON parsing` (Schema nicht eingehalten)
- ❌ `Update code` (Kein Type)
- ❌ `feat: Update code` (Zu vage)
- ❌ `feat: add type-safe json parsing AND centralized logging` (Zu viel in einem PR)

### 3. Linting MUSS grün sein

Vor Push zu origin:

```bash
pnpm lint
```

Alle Checks müssen passen:

- ✅ ESLint
- ✅ TypeScript (`lint:ts`)
- ✅ Stylelint
- ✅ Prettier Check (`format`)
- ✅ Knip (unused code detection)

### 4. Tests MÜSSEN grün sein

```bash
pnpm test
```

Alle Unit-Tests müssen passen.

### 5. Build MUSS erfolgreich sein

```bash
pnpm build
```

Kein Build-Fehler darf entstehen.

## 📋 Checkliste vor Push

KI-Agenten MÜSSEN diese Schritte vor `git push` durchführen:

```bash
# 1. Prettier formatting
pnpm format

# 2. Commit mit richtigem PR-Titel-Schema
git commit -m "feat: Add feature description"

# 3. Alle Linting-Checks
pnpm lint

# 4. Unit-Tests
pnpm test

# 5. Build
pnpm build

# 6. Push
git push -u origin <branch>
```

## 🔧 Automatische Validierung (Git Hooks)

Das Repository hat Git-Hooks (Husky) konfiguriert:

- **Pre-Commit**: Formatiert Code automatisch mit Prettier
- **Commit-MSG**: Validiert PR-Titel gegen Conventional Commits Schema
- **Pre-Push**: (Optional) Kann zusätzliche Validierung hinzufügen

Diese Hooks sind **NICHT optional** — sie werden automatisch nach `pnpm i` installiert.

## 🎯 Best Practices für KI-Agenten

### Commits kleiner halten

- Ein logisches Feature/Fix pro Commit
- Wenn Phase mehrere Teile hat, mehrere Commits OK (z.B. Phase B1, B2, B3)
- Aber: Mehrere zusammenhängende Änderungen = 1 Commit

### PR-Body aussagekräftig

```markdown
## Summary

- Kurze Beschreibung was changed

## Why

- Kontext: Warum diese Änderung notwendig ist

## Testing

- Wie wurde das getestet?
- Welche Edge-Cases wurden überprüft?
```

### Niemals brechen:

- ❌ Tests brechen
- ❌ Build brechen
- ❌ Linting nicht grün
- ❌ PR-Schema nicht einhalten

Wenn etwas kaputt ist, beheben BEVOR Push.

## 📝 Spezifische Anforderungen für dieses Repo

### Branching

- Feature-Branch: `feat/<feature-name>`
- Bug-Fix-Branch: `fix/<bug-name>`
- Oder per Anweisung: `claude/<task-name>`

### Sprache

- Code-Kommentare: Deutsch bevorzugt (wie im Repo)
- Commit-Messages: Englisch (Conventional Commits Standard)
- PR-Beschreibung: English oder Deutsch (konsistent halten)

### Besonderheiten

- **Keine generierten Dateien committen**: `src/data/*.generated.ts`, `dist/`, `build/`
- **Keine `.env` Dateien**: Nur `.env.example`
- **Neue Dependencies**: MUSS mit Maintainers abgesprochen werden
- **Breaking Changes**: Müssen dokumentiert und begründet sein

## 🚫 Häufige Fehler (VERMEIDEN!)

| Fehler                        | Problem                         | Lösung                              |
| ----------------------------- | ------------------------------- | ----------------------------------- |
| `feat: Phase C: Add ...`      | Schema nicht eingehalten        | `feat: Add type-safe JSON parsing`  |
| Nicht formatierter Code       | Prettier-Check schlägt fehl     | `pnpm format` vor Commit            |
| PR ohne aussagekräftigen Body | Reviewer können nicht verstehen | Detaillierte Beschreibung schreiben |
| Vergessenes Linting           | Tests/Linting-Fehler            | `pnpm lint` vor Push                |
| Zu große PRs                  | Schwer zu reviewen              | In kleinere Commits aufteilen       |

## ❓ FAQ für KI-Agenten

**F: Kann ich `git commit --amend` verwenden?**
A: Nein, außer der Benutzer fragt danach. Nutze neue Commits.

**F: Was wenn Tests in CI rot sind?**
A: Investigiere lokal mit `pnpm test`, fixe das Problem, neuer Commit.

**F: Darf ich `git push --force` verwenden?**
A: Nur wenn der Benutzer explizit fragt. Standard: Nicht zulässig.

**F: Formatiert der Hook automatisch?**
A: Pre-Commit-Hook formatiert automatisch, aber besser manuell `pnpm format` laufen.

**F: Wie prüfe ich PR-Titel lokal?**
A: Committen mit `git commit -m "type: message"` — der Hook prüft automatisch.

---

**Zuletzt aktualisiert**: 2026-04-25
**Gültig für**: Alle KI-Agenten und Contributors
