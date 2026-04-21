---
focus: reportTemplate
title: Markdown-Feature-Demo — alle unterstützten Elemente im Überblick
summary: Dieser Beitrag zeigt alle Markdown-Elemente, die in News-Beiträgen unterstützt werden — von Überschriften und Tabellen bis hin zu Aufgabenlisten und Code-Blöcken.
---

# Markdown-Feature-Demo

> **Kurzfazit:** Dieser Beitrag dient als lebendiger Test aller unterstützten Markdown-Elemente. Er kann jederzeit als Vorlage für neue Inhalte verwendet werden.

---

## Textformatierung

Normaler Fließtext mit **fettem Text**, _kursivem Text_, ~~durchgestrichenem Text~~ und `inline Code`. Außerdem können **_Kombinationen_** aus fett und kursiv verwendet werden.

---

## Überschriften

# H1 — Haupttitel

## H2 — Abschnittstitel

### H3 — Unterabschnitt

#### H4 — Detailbereich

##### H5 — Hinweis

###### H6 — Kleinstgliederung

---

## Listen

### Ungeordnete Liste

- Erster Punkt
- Zweiter Punkt
  - Eingerückter Unterpunkt
  - Noch ein Unterpunkt
- Dritter Punkt mit **Formatierung** und `Code`

### Geordnete Liste

1. Schritt eins
2. Schritt zwei
3. Schritt drei
   1. Unterschritt A
   2. Unterschritt B

### Aufgabenliste (Task List)

- [x] Markdown-it-Plugin eingebunden
- [x] YAML-Frontmatter funktioniert
- [x] Tabellen direkt im Artikel (kein Workaround nötig)
- [x] Aufgabenlisten werden als Checkboxen gerendert
- [ ] Weitere Features testen
- [ ] Feedback sammeln

---

## Tabellen

Tabellen funktionieren direkt im Artikel — kein separater Import nötig.

### Bewertungsübersicht

| Kriterium         | Score | Trend | Kommentar                      |
| :---------------- | ----: | :---: | :----------------------------- |
| Interoperabilität |    78 |   ↗   | Offene APIs vorhanden          |
| Transparenz       |    70 |   →   | Audit-Prozess etabliert        |
| Exit-Fähigkeit    |    68 |   ↘   | Migrationspfade noch aufwendig |
| User Experience   |    75 |   ↗   | Positives Community-Feedback   |
| Sicherheit        |    82 |   ↗   | Regelmäßige Security-Audits    |

### Status-Tabelle mit Emojis

| Komponente    | Status     | Version | Notizen                |
| :------------ | :--------- | :------ | :--------------------- |
| API v2        | ✅ Stabil  | 2.1.0   | Produktiv, vollständig |
| Mobile App    | ⚠️ Beta    | 0.9.0   | Betatest läuft         |
| Web UI        | ✅ Stabil  | 3.2.1   | Voll funktional        |
| CLI Tool      | ⚠️ Beta    | 1.0.0   | Feedback erwünscht     |
| Dokumentation | ✅ Aktuell | 2026    | Komplett aktualisiert  |

---

## Code

### Inline-Code

Für Variablennamen wie `const foo = 'bar'` oder Befehle wie `pnpm install`.

### Code-Block (Shell)

```bash
pnpm install
pnpm build
pnpm dev
```

### Code-Block (TypeScript)

```typescript
type NewsModule = {
	default: ComponentType;
	metadata?: {
		focus: string | undefined;
		title?: string;
		summary?: string;
	};
};
```

### Code-Block (YAML)

```yaml
---
focus: reportTemplate
title: Titel des Beitrags
summary: Kurze Zusammenfassung für die Übersicht.
---
```

---

## Blockquotes

> Einfaches Blockquote für Zitate oder Hervorhebungen.

> **Wichtiger Hinweis:** Blockquotes können auch **formatierte Inhalte** enthalten.
>
> Mehrzeilige Blockquotes sind ebenfalls möglich.
>
> — Quellenangabe oder Autor

---

## Links und Bilder

### Links

- [Externer Link](https://example.org)
- [Link mit Titel](https://example.org 'Titeltext beim Hover')

### Bild (extern)

![Beispielbild mit Alternativtext](https://placehold.co/800x300?text=News+Grafik)

---

## Horizontale Trennlinien

Drei oder mehr Bindestriche erzeugen eine Trennlinie:

---

## Emojis

Emojis funktionieren direkt im Text: ✅ ⚠️ ❌ ❓ 🔗 📊 🛡️ 🚀 💡 🔍

---

## HTML-Elemente

Raw-HTML wird unterstützt (nur für vertrauenswürdige, git-verwaltete Inhalte):

<details>
<summary>Aufklappbarer Bereich (Details/Summary)</summary>

Dieser Inhalt ist standardmäßig verborgen und kann durch Klick aufgeklappt werden.

</details>

---

## Glossar

- **YAML-Frontmatter:** Metadaten am Dateianfang zwischen `---`-Trennern (Titel, Summary, Focus).
- **Focus-Key:** Kategorisierung des Beitrags — wird als Label in der Übersicht angezeigt.
- **markdown-it:** Leichtgewichtiger Markdown-Parser, der in diesem Projekt MDX ersetzt.
