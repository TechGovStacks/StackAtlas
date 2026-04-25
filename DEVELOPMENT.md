# Entwicklungsleitfaden für StackAtlas

Willkommen zur StackAtlas-Entwicklung! Dieser Leitfaden hilft Ihnen, die lokale Umgebung einzurichten und den Code zu verstehen.

## Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Setup](#setup)
- [Entwicklungs-Workflow](#entwicklungs-workflow)
- [Architektur-Überblick](#architektur-überblick)
- [Wichtigste Module](#wichtigste-module)
- [Daten-Pipeline](#daten-pipeline)
- [Troubleshooting](#troubleshooting)

## Voraussetzungen

- **Node.js 25+** — [nodejs.org](https://nodejs.org/)
- **pnpm 10+** — `npm install -g pnpm`
- **Git** — für Versionskontrolle

Überprüfen Sie Ihre Versionen:

```bash
node --version    # v25.x.x
pnpm --version    # 10.x.x
git --version     # 2.x.x
```

## Setup

### 1. Repository klonen

```bash
git clone https://github.com/techgovstacks/stackatlas.git
cd stackatlas
```

### 2. Abhängigkeiten installieren

```bash
pnpm i
```

Dies lädt auch den `postinstall`-Hook aus, der generierte Dateien erzeugt.

### 3. Entwicklungsserver starten

```bash
pnpm dev
```

Die App läuft dann unter `http://localhost:5173`

## Entwicklungs-Workflow

### Häufige Befehle

```bash
# Entwicklungsserver mit Hot-Reload
pnpm dev

# Code-Qualität prüfen
pnpm lint        # TypeScript + ESLint + Stylelint + Prettier
pnpm lint:ts     # Nur TypeScript
pnpm lint:eslint # Nur ESLint
pnpm lint:stylelint # Nur Stylelint

# Tests ausführen
pnpm test        # Unit/Integration-Tests
pnpm test:e2e    # End-to-End Tests (Playwright)
pnpm test:watch  # Watch-Mode für schnelle Iteration

# Daten validieren
pnpm validate-schemas # JSON-Schemas für Stack/Item-Daten

# Bauen
pnpm build       # Production-Build
pnpm preview     # Built-Version lokal preview

# Unused Code finden
pnpm check-unused # Knip — findet ungenutzte Exports
```

### Git-Workflow

1. **Feature-Branch erstellen:**
   ```bash
   git checkout -b feat/meine-feature
   ```

2. **Code mit TypeScript-Checks:**
   ```bash
   pnpm lint    # vor jedem Commit
   pnpm test    # Neue Tests hinzufügen
   ```

3. **Committen (Conventional Commits):**
   ```bash
   git add .
   git commit -m "feat(scoring): add new metric"
   ```

4. **Husky-Hooks** laufen automatisch vor dem Commit (validiert Lint/Format)

5. **Push und PR:**
   ```bash
   git push origin feat/meine-feature
   ```

## Architektur-Überblick

StackAtlas ist eine **Vergleichsplattform für Tech-Stacks** mit Fokus auf digitale Souveränität.

**Tech Stack:**
- **Frontend:** Preact, Vite, TypeScript
- **Styling:** UnoCSS (Utility-first CSS)
- **i18n:** i18next (Mehrsprachigkeit)
- **UI:** KoliBri-Komponenten (barrierefreie Web-Components)
- **Testing:** Vitest, Playwright
- **Build:** Vite
- **Linting:** TypeScript, ESLint, Stylelint, Prettier

**Key Directories:**

```
src/
├── components/        # Preact-Komponenten (UI)
├── hooks/            # Preact-Hooks
├── utils/            # Utility-Funktionen
├── constants/        # Konstanten
├── types/            # TypeScript-Typen
├── data/             # Generated: Items, Stacks, Articles
├── i18n/             # Übersetzungen
├── styles/           # Global Styles (UnoCSS)
└── preact.main.tsx   # Entry-Point

data/
├── items.json        # Stack-Items/Technologien
├── stacks.json       # Vordefinierte Tech-Stacks
├── articles.json     # Artikel/Ressourcen
└── README.md         # Daten-Dokumentation

docs/
├── ARC42.md          # Detaillierte Architektur
├── BUSINESS_CASE.md  # Business-Kontext
└── plans/            # Umsetzungspläne

scripts/
├── generate-data.mjs # Generiert TypeScript aus JSON
└── validate-schemas.mjs # Validiert Daten
```

Weitere Details: [docs/ARC42.md](docs/ARC42.md)

## Wichtigste Module

### `src/utils/sovereigntyScore.ts`

Berechnet den **Souveränität-Score** für ein Item basierend auf:
- Open-Source-Status
- Datenschutz
- Datenlokation
- Herkunftsland

```typescript
import { sovereigntyScore } from '@/utils/sovereigntyScore';
const score = sovereigntyScore(item);
```

### `src/utils/overallScore.ts`

Kombiniert mehrere Metriken zu einem **Gesamt-Score**:
- Sovereignty Score
- Adoption Score
- Community Score
- Weitere Faktoren

### `src/utils/stackSelectionScore.ts`

Berechnet einen **Selection Score** für Stack-Kombinationen:
- Kompatibilität
- Kosteneffizienz
- Wartungsaufwand
- Synergien

### `src/components/StackGalleryPage.tsx`

Haupt-UI für Stack-Vergleiche und Filterung. Großkomponente mit komplexem State-Management.

## Daten-Pipeline

StackAtlas nutzt eine **Data-Pipeline** zur Daten-Verarbeitung:

```
data/*.json
    ↓
scripts/generate-data.mjs
    ↓
src/data/*.generated.ts (TypeScript + Typen)
    ↓
App nutzt typsichere Daten
```

### Neue Daten hinzufügen

1. **JSON-Dateien in `data/` ändern:**
   ```bash
   # z.B. data/items.json oder data/stacks.json
   ```

2. **Schemas validieren:**
   ```bash
   pnpm validate-schemas
   ```

3. **TypeScript neu generieren:**
   ```bash
   pnpm prebuild
   ```

4. **Build/Test-Zyklus:**
   ```bash
   pnpm lint && pnpm test && pnpm build
   ```

Siehe [data/README.md](data/README.md) für Schema-Dokumentation.

## Troubleshooting

### Problem: `pnpm dev` fehlt logo file

**Lösung:**
```bash
pnpm postinstall
# oder komplett neu:
rm -rf node_modules pnpm-lock.yaml
pnpm i
```

### Problem: KoliBri-Assets fehlen

**Ursache:** `.koli-dist`-Verzeichnis nicht generiert
```bash
pnpm rebuild @public-ui/components @public-ui/themes
pnpm postinstall
```

### Problem: Tests schlagen fehl mit "Cannot find module"

```bash
pnpm clean          # Caches löschen
pnpm i              # Neu installieren
pnpm test:watch     # Mit File-Watchers
```

### Problem: Port 5173 bereits in Verwendung

```bash
# Alternativer Port
pnpm dev -- --port 3000
```

### Problem: E2E-Tests fehlgeschlagen

```bash
# Playwright-Browser installieren
pnpm exec playwright install chromium

# Im Debug-Modus laufen
pnpm test:e2e -- --debug
```

### Problem: TypeScript-Fehler auf Daten

Wenn Daten-Dateien in `src/data/` nicht generiert werden:

```bash
# Manuell generieren:
pnpm prebuild

# oder in watch:
pnpm dev
# (postinstall läuft nach pnpm i)
```

## Weitere Ressourcen

- **Business Case:** [docs/BUSINESS_CASE.md](docs/BUSINESS_CASE.md)
- **Detaillierte Architektur:** [docs/ARC42.md](docs/ARC42.md)
- **Scoring-Design:** [docs/SCORING_SCALE_DESIGN.md](docs/SCORING_SCALE_DESIGN.md)
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **Security:** [SECURITY.md](SECURITY.md)

## Fragen?

- 📝 [GitHub Issues](https://github.com/techgovstacks/stackatlas/issues)
- 💬 Code-Reviews auf PRs
- 📧 Team-Kontakt: siehe [SECURITY.md](SECURITY.md)

---

**Viel Erfolg bei der Entwicklung! 🚀**
