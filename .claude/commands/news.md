# /news — News-Beitrag anlegen

Erstelle einen neuen News-Beitrag für die App basierend auf folgendem Thema oder Inhalt:

**Thema:** $ARGUMENTS

## Vorgehen

1. Erstelle eine MD-Datei unter `src/content/news/YYYY-MM-DD-<slug>.md` (heutiges Datum, slug = kurzer englischer Bezeichner, Kleinbuchstaben mit Bindestrichen).
2. Trage Metadaten als YAML-Frontmatter am Dateianfang ein (siehe Template).
3. Wähle einen passenden `focus`-Key aus der Liste oder lege einen neuen an.
4. Committe und pushe alle neuen/geänderten Dateien.

## Datei-Template (`src/content/news/YYYY-MM-DD-<slug>.md`)

```md
---
focus: scoringExplained
title: Titel des Beitrags
summary: Kurze Zusammenfassung für die News-Übersicht (1–2 Sätze).
---

# Titel des Beitrags

> **Kurzfazit:** Die wichtigste Aussage in 1–2 Sätzen.

Einleitender Absatz mit Kontext und Relevanz.

---

## Abschnitt mit Tabelle

Tabellen funktionieren direkt im Artikel:

| Spalte A | Spalte B | Spalte C |
| :------- | :------: | -------: |
| Wert 1   |    ✅    |      100 |
| Wert 2   |    ❌    |        0 |

---

## Aufgabenliste

- [x] Erledigte Aufgabe
- [ ] Offene Aufgabe

---

## Fazit

Abschließende Einordnung und Handlungsempfehlung.

> "Zitat oder prägnante Aussage."

---

## Glossar

- **Begriff:** Definition
```

## Verfügbare `focus`-Keys

| Key                              | Anzeige (DE)                            |
| :------------------------------- | :-------------------------------------- |
| `openDataGovernance`             | Fokus: Open Data Governance             |
| `identityWalletInteroperability` | Fokus: Identity Wallet Interoperability |
| `reportTemplate`                 | Fokus: Report-Template                  |
| `scoringExplained`               | Fokus: Scoring erklärt                  |

Neuen Key anlegen: Eintrag in **allen 8** Locale-Dateien ergänzen:
`src/i18n/locales/{de,en,fr,es,it,da,no,sv}/common.json` → `pages.news.focus.<newKey>`

## Dateinamen-Konvention

```
src/content/news/YYYY-MM-DD-<slug>.md
```

## Hinweise

- Schreibe auf Deutsch, technische Begriffe auf Englisch.
- `summary` wird als Teaser in der Übersicht angezeigt — max. 2 Sätze.
- Beiträge werden automatisch nach Datum absteigend sortiert (neueste zuerst).
- Keine `export const`, JSX-Syntax oder `import`-Statements verwenden — nur YAML-Frontmatter und Standard-Markdown.
- Tabellen, Aufgabenlisten und alle anderen GFM-Features funktionieren direkt im Artikel.
