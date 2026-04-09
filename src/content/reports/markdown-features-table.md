## Unterstützte Markdown-Features

| Feature         | Status | Hinweis                                       |
| :-------------- | :----: | :-------------------------------------------- |
| Überschriften   |   ✅   | H1–H6 alle fürs Styling verfügbar             |
| Bold/Italic     |   ✅   | `**bold**`, `_italic_`, `~~strikeout~~`       |
| Listen          |   ✅   | Ungeordnet, geordnet, checklisten             |
| Code Inline     |   ✅   | `` `code` ``                                  |
| Code-Blöcke     |   ✅   | Mit Syntax-Highlighting                       |
| Blockquotes     |   ✅   | Einzeilig oder Multi-Line                     |
| Tabellen        |   ✅   | **EMPFEHLUNG:** Externe `.md`-Datei           |
| Links           |   ✅   | `[text](https://example.com)` und inline HTML |
| Bilder          |   ✅   | Remote & lokale Pfade                         |
| HTML-Tags       |   ✅   | `<div>`, `<span>` etc. erlaubt                |
| Emojis          |   ✅   | Direkt als Unicode                            |
| Fußnoten        |   ⚠️   | Benötigt zusätzliches Plugin                  |
| Markdown Tables |  ✅\*  | **Nur in externen `.md`-Dateien**             |

**Legende:**

- ✅ = Vollständig unterstützt
- ⚠️ = Eingeschränkt / Plugin erforderlich
- ✅\* = Workaround erforderlich

---

## Warum Tabellen in externe `.md`-Datei?

MDX verwendet standardmäßig nur Core Markdown (ohne `remark-gfm`). Das bedeutet:

- ❌ Tabellen in `.mdx`-Dateien funktionieren **nicht**
- ✅ Tabellen in `.md`-Dateien funktionieren **perfekt**

**Lösung:** Externe `.md`-Datei importieren als Komponente:

```mdx
import TableComponent from '../reports/my-table.md';

# Mein Beitrag

<TableComponent />
```

---

## Markdown vs. MDX

| Aspekt               | Markdown | MDX                       |
| :------------------- | :------: | :------------------------ |
| Einfacher Text       |    ✅    | ✅                        |
| Tabellen             |    ✅    | ❌ (nur mit Plugin)       |
| JSX-Komponenten      |    ❌    | ✅ (z.B. `<KolButton />`) |
| Code-Highlighting    |    ✅    | ✅                        |
| Metadata/Frontmatter |    ⚠️    | ✅ (via `export const`)   |

---

## Praktische Empfehlungen

### ✅ Nutze MDX für:

- Komplexe Layouts mit KoliBri-Komponenten
- Interaktive Elemente
- Conditional Content (if/else)

### ✅ Nutze externe `.md` für:

- Tabellen
- Längere Reports
- Wiederverwendbare Content-Blocks
- Reine Text-Heavy News

### Hybrid-Ansatz (beste Lösung):

```mdx
export const metadata = { ... };

import ReportTable from '../reports/my-data.md';

# News Headline

Intro-Text hier...

<ReportTable />

Zusätzliche Erklärungen oder Tipps...
```
