# /news — News-Beitrag anlegen

Erstelle einen neuen News-Beitrag für die App basierend auf folgendem Thema oder Inhalt:

**Thema:** $ARGUMENTS

## Vorgehen

1. Erstelle eine MDX-Datei unter `src/content/news/YYYY-MM-DD-<slug>.mdx` (heutiges Datum, slug = kurzer englischer Bezeichner).
2. Falls der Beitrag Tabellen enthält: Tabellen in eine separate `.md`-Datei unter `src/content/reports/<slug>.md` auslagern und im MDX importieren (siehe Einschränkungen unten).
3. Wähle einen passenden `focus`-Key aus der Liste oder lege einen neuen an (dann i18n-Einträge in allen 8 Locales ergänzen).
4. Committe und pushe alle neuen/geänderten Dateien.

## Technische Einschränkungen

> **Wichtig:** MDX unterstützt ohne `remark-gfm` **keine Markdown-Tabellen**.
> Tabellen müssen immer in externe `.md`-Dateien ausgelagert und importiert werden.

```mdx
import MyTable from '../reports/my-table.md';

<MyTable />
```

Direkte `|---|---|`-Tabellen im MDX-Body funktionieren nicht und werden als Plaintext gerendert.

## MDX-Datei-Template

```mdx
export const metadata = {
  focus: 'scoringExplained', // siehe verfügbare Focus-Keys unten
  title: 'Titel des Beitrags',
  summary: 'Kurze Zusammenfassung (1–2 Sätze) für die News-Übersicht.',
};

import MyTable from '../reports/my-slug.md'; // nur wenn Tabellen nötig

# Titel des Beitrags

> **Kurzfazit:** Die wichtigste Aussage in 1–2 Sätzen.

Einleitender Absatz mit Kontext und Relevanz.

---

## 1. Abschnitt

Fließtext. Für Tabellen: `<MyTable />` einfügen.

<MyTable />

---

## 2. Abschnitt

- **Punkt A:** Erläuterung
- **Punkt B:** Erläuterung

```text
Berechnungsbeispiel oder CLI-Output als Code-Block
```

---

## Fazit

Abschließende Einordnung und Handlungsempfehlung.

> "Zitat oder prägnante Aussage."

---

## Glossar

- **Begriff 1:** Definition
- **Begriff 2:** Definition
```

## Tabellen-Template (externe `.md`-Datei)

Inhalt der Datei `src/content/reports/<slug>.md`:

```md
## Abschnittstitel (optional)

| Spalte A | Spalte B | Spalte C |
| :--- | :---: | ---: |
| Wert 1 | ✅ | 100 |
| Wert 2 | ❌ | 0 |
```

## Verfügbare Focus-Keys (`src/i18n/locales/de/common.json`)

| Key | Deutsch |
| :--- | :--- |
| `openDataGovernance` | Fokus: Open Data Governance |
| `identityWalletInteroperability` | Fokus: Identity Wallet Interoperability |
| `reportTemplate` | Fokus: Report-Template |
| `scoringExplained` | Fokus: Scoring erklärt |

Neuen Key anlegen: Eintrag in allen 8 Locale-Dateien ergänzen:
`src/i18n/locales/{de,en,fr,es,it,da,no,sv}/common.json` → `pages.news.focus.<newKey>`

## Dateinamen-Konvention

```
src/content/news/YYYY-MM-DD-<slug>.mdx      ← Haupt-Beitrag (MDX)
src/content/reports/<slug>.md               ← Tabellen (reines Markdown)
```

Beispiel:
```
src/content/news/2026-04-20-postgresql-vs-mysql-scoring.mdx
src/content/reports/postgresql-vs-mysql-scoring.md
```

## Hinweise

- Schreibe auf Deutsch, technische Begriffe auf Englisch.
- `summary` wird in der News-Übersicht als Teaser angezeigt — präzise und maximal 2 Sätze.
- Beiträge werden automatisch nach Datum absteigend sortiert (neueste zuerst).
- Keine Bilder einbetten, die lokal nicht verfügbar sind.
