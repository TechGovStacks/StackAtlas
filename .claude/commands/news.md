# /news — News-Beitrag anlegen

Erstelle einen neuen News-Beitrag für die App basierend auf folgendem Thema oder Inhalt:

**Thema:** $ARGUMENTS

## Vorgehen

1. Erstelle eine MD-Datei unter `src/content/news/YYYY-MM-DD-<slug>.md` (heutiges Datum, slug = kurzer englischer Bezeichner, Kleinbuchstaben mit Bindestrichen).
2. Trage Metadaten als YAML-Frontmatter am Dateianfang ein (siehe Template).
3. Falls der Beitrag Tabellen enthält: Tabellen in `src/content/reports/<slug>.md` auslagern und im Beitrag importieren (siehe Einschränkungen).
4. Wähle einen passenden `focus`-Key aus der Liste oder lege einen neuen an.
5. Committe und pushe alle neuen/geänderten Dateien.

## Technische Einschränkungen

> **Wichtig:** Markdown-Tabellen (`|---|---|`) funktionieren **nicht direkt** im News-Beitrag.
> Tabellen müssen in eine separate Datei unter `src/content/reports/` ausgelagert
> und per Import eingebunden werden.

```md
import MyTable from '../reports/mein-slug.md';

<MyTable />
```

## Datei-Template (`src/content/news/YYYY-MM-DD-<slug>.md`)

```md
---
focus: scoringExplained
title: Titel des Beitrags
summary: Kurze Zusammenfassung für die News-Übersicht (1–2 Sätze).
---

import MyTable from '../reports/mein-slug.md';

# Titel des Beitrags

> **Kurzfazit:** Die wichtigste Aussage in 1–2 Sätzen.

Einleitender Absatz mit Kontext und Relevanz.

---

## Abschnitt

Fließtext. Für Tabellen die importierte Komponente verwenden:

<MyTable />

---

## Fazit

Abschließende Einordnung und Handlungsempfehlung.

> "Zitat oder prägnante Aussage."

---

## Glossar

- **Begriff:** Definition
```

## Tabellen-Template (`src/content/reports/<slug>.md`)

```md
## Abschnittstitel

| Spalte A | Spalte B | Spalte C |
| :--- | :---: | ---: |
| Wert 1 | ✅ | 100 |
| Wert 2 | ❌ | 0 |
```

## Verfügbare `focus`-Keys

| Key | Anzeige (DE) |
| :--- | :--- |
| `openDataGovernance` | Fokus: Open Data Governance |
| `identityWalletInteroperability` | Fokus: Identity Wallet Interoperability |
| `reportTemplate` | Fokus: Report-Template |
| `scoringExplained` | Fokus: Scoring erklärt |

Neuen Key anlegen: Eintrag in **allen 8** Locale-Dateien ergänzen:
`src/i18n/locales/{de,en,fr,es,it,da,no,sv}/common.json` → `pages.news.focus.<newKey>`

## Dateinamen-Konvention

```
src/content/news/YYYY-MM-DD-<slug>.md       ← News-Beitrag
src/content/reports/<slug>.md               ← Tabellen (nur wenn nötig)
```

## Hinweise

- Schreibe auf Deutsch, technische Begriffe auf Englisch.
- `summary` wird als Teaser in der Übersicht angezeigt — max. 2 Sätze.
- Beiträge werden automatisch nach Datum absteigend sortiert (neueste zuerst).
- Keine `export const` oder JSX-Syntax direkt im MD verwenden — nur YAML-Frontmatter und Standard-Markdown.
