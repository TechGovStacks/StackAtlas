# Umsetzungsplan: StackAtlas Open-Source-Aufbereitung

## Context

Das StackAtlas-Repository soll veröffentlicht und für externe Beitragende geöffnet werden. Dabei wurden systematisch Inkonsistenzen, Code-Duplikate und fehlende Contributor-Infrastruktur identifiziert. Ziel ist es, dass neue Beitragende ohne Rückfragen einsteigen, Issues/PRs sauber einreichen können und das Projekt lokal reproduzierbar bauen können.

---

## Design-Ziele & Nicht-Ziele

**Ziele:**
- Vollständige Contributor-Infrastruktur (Docs, Templates, Hooks)
- Eliminierung von Code-Duplikaten (ROLE_COLORS, countryToFlagEmoji)
- Verbesserte Type-Safety (JSON.parse, KoliBri-Event-Handler)
- Repository-Hygiene (Legacy-Files, E2E-CI, generierte Dateien)

**Nicht-Ziele:**
- Keine Änderungen an `src/data/items.generated.ts` / `articles.generated.ts`
- Keine UX/Funktionsänderungen
- Keine Zerlegung von `StackGalleryPage.tsx` (eigenes L-Refactoring)
- Keine Änderungen an `data/schemas/`, Capacitor, CLA-Workflow
- Kein Versions-Bump (läuft via `bump-patch-version-on-main.yml`)

---

## Phase A: Contributor-Infrastruktur

### A1. `CONTRIBUTING.md` anlegen — S→M, Impact: HIGH
Pfad: `/CONTRIBUTING.md`
- Voraussetzungen: Node 25, pnpm 10 (wie in `.github/workflows/ci.yml` definiert)
- Dev-Workflow: `pnpm i`, `pnpm dev`, `pnpm lint`, `pnpm test`, `pnpm build`
- Branch-Konvention: `feat/`, `fix/`, `docs/`, `chore/` (Conventional Commits)
- PR-Titel-Konvention spiegelt `validate-pr-title.yml`
- Hinweis auf `CLA.md` + `AGENTS.md` für AI-Beitragende
- Daten-Beiträge: Verweis auf `data/README.md` + `scripts/validate-schemas.mjs`

### A2. GitHub Issue Templates — S, Impact: HIGH
Neue Pfade:
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`
- `.github/ISSUE_TEMPLATE/data_correction.yml` (spezifisch für Stack/Item-Korrekturen)
- `.github/ISSUE_TEMPLATE/config.yml` (Verweis auf `SECURITY.md`)

### A3. Pull Request Template — S, Impact: MEDIUM
Pfad: `.github/PULL_REQUEST_TEMPLATE.md`
- Checkliste: Tests lokal grün, `pnpm lint`, `pnpm validate-schemas` (bei Datenänderungen), Screenshots bei UI-Änderungen, i18n bei neuen UI-Strings

### A4. `.env.example` — S, Impact: HIGH
Pfad: `.env.example`
Zu dokumentierende Variablen (aus `src/declare.d.ts:13-19`):
- `VITE_APP_VERSION` (Fallback via `src/utils/getAppVersion.ts:4`)
- `VITE_COMMIT_SHA` (gesetzt in CI: `ci.yml:53`)
- `VITE_BRAND_URL` (verwendet in `src/components/Header.tsx:18`)
- `VITE_ENABLE_PWA` (genutzt in `src/components/PwaWrapper.tsx:11`, `vite.config.ts:36`)

### A5. `CHANGELOG.md` — S, Impact: MEDIUM
Pfad: `/CHANGELOG.md`
Keep-a-Changelog-Format; Initial-Eintrag rückwärts bis v0.0.60 aus `git log --oneline`.

### A6. `DEVELOPMENT.md` für menschliche Beitragende — M, Impact: MEDIUM
Pfad: `/DEVELOPMENT.md`
- Architektur-Überblick (kurz, Verweis auf `docs/ARC42.md`)
- Daten-Pipeline: `data/*.json` → `scripts/generate-data.mjs` → `src/data/*.generated.ts`
- Wichtigste Module: `src/utils/sovereigntyScore.ts`, `src/utils/overallScore.ts`, `src/utils/stackSelectionScore.ts`
- Trouble-Shooting: Logos, Postinstall, KoliBri-Assets
- Reuse: Abschnitt „Project Structure" aus `AGENTS.md:49-60` als Vorlage

### A7. `CODE_OF_CONDUCT.md` — S, Impact: MEDIUM
Pfad: `/CODE_OF_CONDUCT.md`
Contributor Covenant 2.1

### A8. `SECURITY.md` — S, Impact: MEDIUM
Pfad: `/SECURITY.md`
Supported versions, Reporting via GitHub Private Advisory, Verweis auf `dependabot.yml`

### A9. Husky-Hooks persistieren — S, Impact: MEDIUM
Befund: `.gitignore:37` ignoriert `/.husky` bewusst; `package.json:prepare` führt Husky aus, aber Hook-Skript fehlt im Repo.
- Neue Datei: `scripts/setup-hooks.mjs` — idempotent, schreibt pre-commit-Hook mit `pnpm exec lint-staged`
- In `CONTRIBUTING.md` (A1) und `DEVELOPMENT.md` (A6) dokumentieren

### A10. `README.md` erweitern — S, Impact: HIGH
Pfad bestehend: `/README.md` (aktuell nur 28 Zeilen)
- Badges (CI, License, Version)
- Verweise auf `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `DEVELOPMENT.md`
- Sektion „Tech Stack" (Preact, Vite, KoliBri, UnoCSS, i18next)

---

## Phase B: Code-Deduplication

### B1. `ROLE_COLORS` + `PARTICIPANT_ROLES` zentralisieren — S, Impact: HIGH
Neue Datei: `src/constants/roleColors.ts`

```ts
import { ParticipantRole } from '../types';

export const ROLE_COLORS: Record<ParticipantRole, string> = {
  maintainer: '#1565c0',
  contributor: '#2e7d32',
  funder: '#e65100',
  consumer: '#546e7a',
};

export const PARTICIPANT_ROLES: ParticipantRole[] = ['maintainer', 'contributor', 'funder', 'consumer'];
```

Betroffene Dateien (Duplikate entfernen → Import):
- `src/components/ArticleCard.tsx:44-49`
- `src/components/StackStats.tsx:14-19`
- `src/components/StackExpose.tsx:19-24` + `:42`
- `src/components/FilterBar.tsx:78`

### B2. `countryToFlagEmoji` zentralisieren — S, Impact: MEDIUM
Neue Datei: `src/utils/countryFlag.ts`

```ts
export function countryToFlagEmoji(code?: string): string {
  if (!code || code.length !== 2) return '';
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}
```

Betroffene Dateien:
- `src/components/ArticleCard.tsx:52-55` → Import, lokale Funktion entfernen
- `src/components/StackExpose.tsx:56-59` → Import, lokale Funktion entfernen

Neuer Test: `src/utils/__tests__/countryFlag.test.ts` für `'DE'`, `'EU'`, leerer/ungültiger Code.
Export in `src/utils/index.ts` ergänzen.

### B3. Barrel-Export vervollständigen — S, Impact: LOW
Pfad: `src/utils/index.ts`
Fehlende Exports ergänzen (nur was wirklich konsumiert wird); Knip-Check (`pnpm check-unused`) muss grün bleiben.

---

## Phase C: Type-Safety-Verbesserungen

### C1. Sicherer JSON-Parse-Helper (Zod) — M, Impact: HIGH
Neue Datei: `src/utils/safeJsonParse.ts`

```ts
import { z } from 'zod';

export function safeJsonParse<T>(raw: string | null, schema: z.ZodType<T>): T | null {
  if (!raw) return null;
  try {
    const result = schema.safeParse(JSON.parse(raw));
    if (!result.success) {
      console.warn('safeJsonParse: validation failed', result.error.issues);
      return null;
    }
    return result.data;
  } catch {
    return null;
  }
}
```

Zod ist bereits Dependency (`package.json:67`).

Anpassungen:
- `src/components/StackSelectionEvaluator.tsx:109` (StoredEvaluatorState)
- `src/components/StackSelectionEvaluator.tsx:151` (LinkedAssessment-Map)
- `src/hooks/useLocalStacks.ts:57, 85, 148` — bestehende `sanitizeStack`-Logik bleibt, nur äußere `Partial<T>`-Cast ersetzen

### C2. KoliBri-Event-Wrapper-Typen — M, Impact: MEDIUM
Neue Datei: `src/types/kolibri.ts`
Typed Handler-Factories für KoliBri's `(event: Event, value: unknown)` Pattern

```ts
export function asString(handler: (v: string) => void) {
  return (_e: globalThis.Event, value: unknown) => handler(String(value ?? ''));
}
export function asNullableString(handler: (v: string | null) => void) {
  return (_e: globalThis.Event, value: unknown) => handler(value ? String(value) : null);
}
```

Betroffene Datei: `src/components/FilterBar.tsx:112, 122-151` (inline `as`-Casts ersetzen)

### C3. Zentrales Logging statt leerer Catches — S, Impact: MEDIUM
Neue Datei: `src/utils/logger.ts`

```ts
const isDev = import.meta.env.MODE !== 'production';
export const logger = {
  warn: (msg: string, ...args: unknown[]) => { if (isDev) console.warn(`[StackAtlas] ${msg}`, ...args); },
  error: (msg: string, ...args: unknown[]) => console.error(`[StackAtlas] ${msg}`, ...args),
};
```

Anpassungen:
- `src/preact.main.tsx:71` — `} catch { // ignore }` → `} catch (e) { logger.debug(...) }`
- `src/components/StackSelectionEvaluator.tsx:119, 154`
- `src/hooks/useLocalStacks.ts:152`

### C4. `CategoryGrid.onFilterChange` aufräumen — S, Impact: LOW
Pfad: `src/components/CategoryGrid.tsx:33-34`
- Aufrufer prüfen: `grep -rn "CategoryGrid" src/`
- Falls unbenutzt: Prop + ESLint-disable-Kommentar entfernen

---

## Phase D: Repository-Hygiene

### D1. Legacy-Dateien entfernen — S, Impact: MEDIUM
Zu löschende Dateien:
- `data/items.csv`
- `data/projects.csv`
- `scripts/fix_logos.js` (snake_case, operiert auf gelöschtem CSV)

Vor Löschung: verifizieren, dass kein aktiver Script-Aufruf besteht.

### D2. Migrations-Scripts archivieren — S, Impact: LOW
Verschieben nach `scripts/archive/`:
- `scripts/migrate-csv-to-json.mjs`
- `scripts/migrate-items-to-stack.mjs`
- `scripts/migrate-items-to-stack-fixed.mjs`
- `scripts/migrate-to-stack-correct.mjs`

npm-Script `"migrate"` in `package.json` entfernen oder in `"migrate:legacy"` umbenennen.

### D3. Generierte Dateien aus Git-Tracking prüfen — M, Impact: MEDIUM
Verifizieren: `git ls-files src/data/`
Falls getrackt: `git rm --cached src/data/items.generated.ts src/data/articles.generated.ts`
CI-Drift-Check ergänzen in `ci.yml`: `pnpm prebuild && git diff --exit-code`

### D4. E2E-Tests in CI reaktivieren — M, Impact: HIGH
Pfad: `.github/workflows/ci.yml:56-93`
- Auskommentierten Block reaktivieren
- `playwright.config.ts` Ports gegen `pnpm preview` verifizieren
- Bei flaky Tests: Smoke-Test starten (Homepage + Axe), Rest in eigenem Issue tracken

### D5. `package.json` Script-Duplikat entfernen — S, Impact: LOW
Befund: `"lint:stylelint"` (Zeile 26) und `"stylelint"` (Zeile 40) sind identisch.
→ `"stylelint"` entfernen, Referenzen auf `lint:stylelint` vereinheitlichen.

### D6. Dependabot-Gruppierung — S, Impact: LOW
Pfad: `.github/dependabot.yml`
Gruppen prüfen/ergänzen (z. B. `@public-ui/*`) für reduzierten PR-Lärm.

---

## Empfohlene PR-Aufteilung

| PR | Schritte | Priorität |
|----|----------|-----------|
| PR-A1 | A1 + A10 | HIGH |
| PR-A2 | A2 + A3 + A7 + A8 | HIGH |
| PR-A3 | A4 + A5 + A6 + A9 | MEDIUM |
| PR-B1 | B1 | HIGH |
| PR-B2 | B2 + B3 | MEDIUM |
| PR-C1 | C1 + C3 | HIGH |
| PR-C2 | C2 + C4 | MEDIUM |
| PR-D1 | D1 + D2 + D5 | MEDIUM |
| PR-D2 | D3 + D4 | MEDIUM |
| PR-D3 | D6 | LOW |

---

## Kritische Dateipfade

**Zu erstellen:**
- `/CONTRIBUTING.md`
- `/DEVELOPMENT.md`
- `/CHANGELOG.md`
- `/CODE_OF_CONDUCT.md`
- `/SECURITY.md`
- `/.env.example`
- `/.github/ISSUE_TEMPLATE/bug_report.yml`
- `/.github/ISSUE_TEMPLATE/feature_request.yml`
- `/.github/ISSUE_TEMPLATE/data_correction.yml`
- `/.github/PULL_REQUEST_TEMPLATE.md`
- `/scripts/setup-hooks.mjs`
- `src/constants/roleColors.ts`
- `src/utils/countryFlag.ts`
- `src/utils/safeJsonParse.ts`
- `src/utils/logger.ts`
- `src/types/kolibri.ts`

**Zu modifizieren:**
- `/README.md` (erweitern)
- `src/components/ArticleCard.tsx:44-55` (Duplikate entfernen)
- `src/components/StackStats.tsx:14-19` (Duplikat entfernen)
- `src/components/StackExpose.tsx:19-59` (Duplikate entfernen)
- `src/components/FilterBar.tsx:112-151` (Event-Handler-Typen)
- `src/components/StackSelectionEvaluator.tsx:109-154` (sicherer JSON-Parse)
- `src/hooks/useLocalStacks.ts:57-152` (sicherer JSON-Parse)
- `src/utils/index.ts` (Barrel-Exports)
- `src/components/CategoryGrid.tsx:33-34` (unused prop)
- `.github/workflows/ci.yml:56-93` (E2E reaktivieren)
- `package.json:40` (Duplikat-Script entfernen)
- `.github/dependabot.yml` (Gruppierung)

**Zu löschen:**
- `data/items.csv`
- `data/projects.csv`
- `scripts/fix_logos.js`
- `scripts/migrate-csv-to-json.mjs` → nach `scripts/archive/`
- `scripts/migrate-items-to-stack.mjs` → nach `scripts/archive/`
- `scripts/migrate-items-to-stack-fixed.mjs` → nach `scripts/archive/`
- `scripts/migrate-to-stack-correct.mjs` → nach `scripts/archive/`

---

## Risiken & Mitigationen

| Risiko | Mitigation |
|--------|-----------|
| Husky-Skript bricht Postinstall | Idempotent schreiben + try/catch + nur warnen |
| Generierte Dateien fehlen ohne `pnpm i` | `postinstall`-Script läuft bereits, Doku in `DEVELOPMENT.md` |
| E2E-Tests initial rot | Separater PR, zunächst nur Smoke-Test aktivieren |
| Zod-Schema-Änderungen erhöhen Bundle | Zod ist bereits dependency, Impact vernachlässigbar |

---

## Verifikation

Nach Implementierung:
1. `pnpm i && pnpm lint` → grün
2. `pnpm check-unused` (Knip) → grün (keine neuen unused exports)
3. `pnpm test` → grün
4. `pnpm validate-schemas` → grün
5. `pnpm build` → erfolgreich
6. `pnpm test:e2e` → grün (Phase D4)
7. GitHub Actions CI auf PR → alle Jobs grün

---

## Letzter Schritt nach Merge

Diese Plan-Datei aus `docs/plans/` löschen.
