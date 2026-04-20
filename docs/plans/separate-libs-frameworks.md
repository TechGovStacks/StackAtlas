# Umsetzungsplan: Programmiersprachen von „Libs & Frameworks" trennen

## Motivation / Problemstellung

Aktuell liegen **alle** Programmiersprachen, UI-Frameworks, Backend-Frameworks,
CSS-Utility-Bibliotheken, Komponenten-Libs und Testing-Tools im selben Sublayer
`entwicklung` des Layers `building-blocks` (23 Items, einziger Sonderfall:
`nodejs` im Layer `platform`, Sublayer `entwicklung`).

Belege:

- `data/items/python.json:5`, `data/items/react.json:5`, `data/items/angular.json:5`,
  `data/items/java.json:5`, `data/items/nextjs.json:5`,
  `data/items/public-ui-kolibri.json:5`, `data/items/selenium.json:5`,
  `data/items/tailwind-css.json:5`, `data/items/nodejs.json:4-5`.
- Übersicht aller `sublayer`-Ausprägungen (Häufigkeit):
  `integration (27)`, `daten (27)`, `entwicklung (23)`, `sicherheit (18)`,
  `ki (18)`, `inbetriebnahme (14)`, `transport (12)`, `verteilung (11)`,
  `lowcode (10)`, `anschluss (5)`, `browser (3)`, `native-apps (2)`.

Das hat mehrere Nachteile:

1. **Semantische Unschärfe** — Sprachspezifikationen (z. B. `javascript-ecma-script`,
   `css`, `c++`) und konkrete Wahlfreiheiten wie UI-Frameworks (`react`, `angular`,
   `vuejs`) werden in einer Schublade vermischt.
2. **Filter/UX** — Im Filter (`src/components/FilterBar.tsx:137-144`) erscheint
   `entwicklung` als einzige, sehr große Kategorie und bietet keine sinnvolle
   Navigation. 23 sehr heterogene Items liegen darunter.
3. **Adoption-/Scoring-Aussagekraft** — Sprachen unterscheiden sich strukturell
   von Frameworks (Lebensdauer, Austauschbarkeit, Ownership). Durch die
   gemeinsame Ablage werden künftige Aggregationen auf Sublayer-Ebene
   (`docs/ITEM_METRICS_SCHEMA.md:249-261`) verzerrt.
4. **Dokumentations-Drift** — `docs/archive/consolidated/STACK_LAYER_BEREICHE.md:42`
   listet nur `entwicklung` für Building Blocks; der tatsächliche Inhalt ist
   aber bereits heute zweideutig (Sprachen vs. Frameworks).

Ziel: die Gruppen **Programmiersprachen** und **Frameworks & Bibliotheken**
klar trennen, ohne Layer-Architektur zu zerstören.

## Design-Ziele & Nicht-Ziele

### Ziele

- Klare, verständliche Trennung von **Programmiersprachen** und
  **Frameworks/Bibliotheken/Entwicklungs-Werkzeugen**.
- Keine invasive Änderung am Layer-Modell (weiterhin 5 Splash-Layers gemäß
  `data/layers/*.json`).
- Minimale Daten-Migration durch bloße `sublayer`-Umbenennung (Schema bleibt
  `string`, keine Enum-Erweiterung nötig, s. `data/schemas/item.schema.json:23-26`).
- Filter-UI zeigt lokalisierte Sublayer-Labels (heute wird nur der Slug
  angezeigt, `src/components/FilterBar.tsx:142`).
- Konsistente Dokumentation (`ARC42`, `STACK_LAYER_BEREICHE`, `ITEM_METRICS_SCHEMA`,
  `data/README.md`).

### Nicht-Ziele

- **Keine** neue Layer-Ebene, **kein** neuer Top-Level-Layer für Sprachen.
- **Keine** Änderung am Sovereignty-Scoring-Algorithmus
  (`src/utils/sovereigntyScore.ts`).
- **Keine** Einführung eines neuen Item-Felds (z. B. `kind: language | framework`).
  Die Separierung erfolgt rein über `sublayer`.
- **Keine** Umsortierung anderer Sublayer (z. B. `sicherheit`, `daten`, `ki`).
- **Keine** Mehrfach-Zuordnungen (`sublayer` bleibt Einzelwert).

## Architekturoption (empfohlen) — zwei bzw. drei Sublayer innerhalb `building-blocks`

Bewertete Varianten:

| Variante | Idee | Bewertung |
| --- | --- | --- |
| A | `building-blocks/sprachen` + `building-blocks/frameworks` | **Empfohlen** — minimale Änderung, maximale Klarheit |
| B | Sprachen in `platform/sprachen` verschieben | Architektonischer Bruch: Sprachen sind Spezifikationen, keine Laufzeitumgebungen. `nodejs` (= Runtime) bleibt dagegen korrekt in `platform`. |
| C | `sprachen` + `frameworks` + `werkzeuge` (z. B. Selenium, Robot Framework) | Sinnvoll bei wachsendem Test-/Build-Tooling-Bestand, erhöht aber initiale Komplexität |

**Empfehlung:** Variante A zuerst umsetzen (2 Sublayer), Variante C optional
als Folge-Task, sobald >5 reine Werkzeuge im Bestand sind.

### Ziel-Zuordnung (Variante A)

Layer `building-blocks`:

- **Sublayer `sprachen`** — 11 Items:
  `c`, `css`, `go`, `java`, `javascript-ecma-script`, `php`, `python`, `r`,
  `rust`, `swift`, `typescript`.
- **Sublayer `frameworks`** — 12 Items:
  `angular`, `django`, `flutter`, `nextjs`, `public-ui-kolibri`, `react`,
  `ruby-on-rails`, `selenium`, `spring-boot`, `tailwind-css`, `vuejs`.
  - Bei Variante C würde `selenium` (und ggf. `robot-framework`, aktuell
    `sublayer: "inbetriebnahme"`) nach `werkzeuge` wandern.

Layer `platform` (unverändert laut Layer-Semantik, `data/layers/platform.json`):

- `nodejs` bleibt `layer: platform`, **Sublayer wird aber von `entwicklung`
  → `laufzeit` (oder bestehendes Sublayer)** korrigiert, da Node.js eine
  Runtime und keine Entwicklungsbibliothek ist. Alternative: Beibehaltung
  unter neuem Sublayer `sprachen` des `platform`-Layers — das wäre jedoch
  inkonsistent mit Variante A. **Empfehlung:** eigener Sublayer
  `laufzeit` im `platform`-Layer (genauer Name in Phase 1 finalisieren).

## Datenmodell-Änderungen

### Keine Schemaänderungen nötig

`data/schemas/item.schema.json:23-26` definiert `sublayer` bereits als frei
wählbaren String:

```json
"sublayer": {
    "type": "string",
    "description": "Optional sub-category within the layer (e.g., 'security', 'database')"
}
```

→ Neue Werte sind ohne Schema-Migration zulässig.

### Optional: Enum-Härtung (nicht Teil dieses Plans, als Folge-Task)

Langfristig könnte `sublayer` pro Layer als Enum gehärtet werden (z. B. via
`oneOf`-Branch pro Layer). Hier explizit als **Nicht-Ziel** markiert.

### Item-Dateien (Daten-Migration)

Für jedes der 23 betroffenen Items in `data/items/*.json` wird der Wert
`"sublayer": "entwicklung"` ersetzt durch:

- `"sublayer": "sprachen"` — bei den 11 Sprachen
- `"sublayer": "frameworks"` — bei den 12 Frameworks/Libs
- `nodejs`: `"sublayer": "laufzeit"` (oder abgestimmter Name)

## Algorithmus / Scoring-Konzept

**Kein Eingriff** in bestehende Scoring-Logik:

- `src/utils/sovereigntyScore.ts` — operiert auf `sovereigntyCriteria`, nicht
  auf `sublayer`.
- `src/utils/adoptionScore.ts:152-229` — aggregiert über `items` und `stacks`,
  kennt keinen Sublayer.
- `src/utils/overallScore.ts` — unberührt.

**Indirekte Auswirkung** auf zukünftige Sublayer-Aggregate
(`docs/ITEM_METRICS_SCHEMA.md:249-300`):

- Die dort skizzierte `sublayerScore`-Berechnung (0.6 · itemsAverage + 0.4 ·
  sublayerBaseScore) bekommt **saubere Gruppen**, d. h. der Wert pro
  `sprachen` / `frameworks` wird aussagekräftiger als der gemischte
  `entwicklung`-Wert.
- Normalisierung bleibt unverändert; `sublayer` fungiert weiterhin als
  reiner Gruppierungsschlüssel (s. `src/hooks/useFilters.ts:38`,
  `src/components/FilterBar.tsx:60-65`).

## Implementierungsschritte

1. **Naming finalisieren** — Entscheidung über Slugs und Labels:
   - Sprachen: `sprachen` (DE) / `languages` (EN)
   - Frameworks: `frameworks` (DE/EN) oder `bibliotheken` (DE) / `libraries` (EN)
   - Node.js-Sublayer: `laufzeit` (DE) / `runtime` (EN) — oder als Folge-Task
     herauslösen.
2. **Data-Migration** — für **alle** Items, die aktuell den Sublayer
   `entwicklung` tragen, den Wert gemäß Abschnitt „Ziel-Zuordnung" setzen.
   Betroffene Dateien dynamisch ermitteln (statt hartkodierter Liste), um
   Items abzudecken, die nach Erstellung dieses Plans hinzugekommen sind:
   ```bash
   grep -l '"sublayer": "entwicklung"' data/items/*.json
   ```
   Die Referenzliste im Abschnitt „Ziel-Zuordnung" dient als Soll-Abgleich;
   ein Item-Neuzugang mit `sublayer: "entwicklung"` muss im Review explizit
   einem der neuen Sublayer zugeordnet werden.
3. **Validierung ausführen** — `pnpm validate-schemas` (via
   `scripts/validate-schemas.mjs`), muss grün bleiben.
4. **i18n-Labels ergänzen** — in jedem
   `src/i18n/locales/<code>/common.json` einen neuen Block
   `search.sublayers.<slug>` anlegen, initial gepflegt:
   - `sprachen` → „Sprachen" / „Languages" (bewusst allgemein gehalten, da
     CSS als Stylesheet-Sprache enthalten ist und keine Programmiersprache
     im engeren Sinn ist)
   - `frameworks` → „Frameworks & Bibliotheken" / „Frameworks & Libraries"
   - Bestands-Slugs (`integration`, `daten`, `sicherheit`, `ki`,
     `inbetriebnahme`, `transport`, `verteilung`, `lowcode`, `anschluss`,
     `browser`, `native-apps`) sollten in derselben PR mitlokalisiert werden
     (Cleanup-Nebeneffekt).
5. **FilterBar lokalisieren** — in `src/components/FilterBar.tsx:142` die
   Label-Erzeugung anpassen:
   ```ts
   const sublayerLabel = (slug: string) =>
       t(`search.sublayers.${slug}`, { defaultValue: slug });
   // ...
   _options={[
       { label: t('search.allSublayers'), value: '' },
       ...sublayerOptions.map((sublayer) => ({ label: sublayerLabel(sublayer), value: sublayer })),
   ]}
   ```
   So bleiben neue Sublayers rückwärtskompatibel (Fallback = Slug).
6. **Filter-Logik prüfen** — `src/hooks/useFilters.ts:38` arbeitet bereits
   slug-basiert; keine Änderung nötig.
7. **CSS-Klassen prüfen** — in `src/style.scss` nach Klassen wie
   `cat-entwicklung` suchen (Legacy-Reste aus
   `docs/archive/architecture/DESIGN_PLAN_MVP.md:605`) und bei Bedarf
   `cat-sprachen` / `cat-frameworks` ergänzen bzw. Legacy entfernen.
8. **Scripts prüfen** — `scripts/migrate-csv-to-json.mjs:185-206` setzt
   sublayer aus CSV; keine Änderung, der nächste CSV-Import muss nur die
   neuen Bezeichner verwenden.
9. **Dokumentation aktualisieren** (s. Abschnitt „Dokumentations-Updates").
10. **Tests anpassen / ergänzen**:
    - `e2e/i18n.spec.ts:48-55` verifiziert den Sublayer-Filter — ergänzen
      durch Assertion, dass Labels „Sprachen" / „Frameworks & Bibliotheken"
      im lokalisierten Modus erscheinen.
    - Unit-Test (neu) in `src/utils/__tests__/` oder ein Daten-Test in
      `scripts/`, der sicherstellt, dass **kein** Item mehr
      `sublayer === "entwicklung"` trägt.
11. **Lint/Typecheck/Build**:
    - `pnpm lint:ts`
    - `pnpm lint:eslint`
    - `pnpm lint:stylelint`
    - `pnpm format`
    - `pnpm build`
12. **Review & Merge** — kleine, isolierte PR: nur Datenänderung +
    i18n-Labels + FilterBar-Anpassung + Doku.
13. **Dokumentation archivieren** — diese Plandatei nach erfolgreichem Merge
    nach `docs/archive/plans/separate-libs-frameworks.md` verschieben
    (statt löschen), um die Entscheidungshistorie für spätere Beiträge zu
    erhalten. Dies entspricht dem im Repo bereits etablierten Muster von
    `docs/archive/` (z. B. `docs/archive/consolidated/`,
    `docs/archive/architecture/`).

## Dokumentations-Updates

- `data/README.md` — Sublayer-Hinweise anpassen (falls `entwicklung` dort
  auftaucht).
- `docs/ARC42.md:77` — Kontext zur neuen Sublayer-Struktur ergänzen.
- `docs/ITEM_METRICS_SCHEMA.md:249-300` — Beispiel `entwicklung` durch
  `sprachen` / `frameworks` ersetzen, sofern Beispiele dort referenzieren.
- `docs/archive/consolidated/STACK_LAYER_BEREICHE.md:41-45` — Liste der
  Sublayer für „Building Blocks" aktualisieren:
  - Vorher: `entwicklung`, `inbetriebnahme`, `sicherheit`
  - Nachher: `sprachen`, `frameworks`, `inbetriebnahme`, `sicherheit`
  - Hinweis: Datei liegt in `archive/` — prüfen, ob aktualisiert oder
    dupliziert nach `docs/` gezogen werden soll.
- `docs/examples/items-as-dependencies.md` — keine Änderung nötig (Beispiele
  referenzieren `sicherheit`/`integration`).

## Risiken & Mitigationen

- **Risiko:** Stale Referenzen in Doku/Archiv verwenden weiterhin
  `entwicklung`.
  - *Mitigation:* Grep nach `"entwicklung"` im kompletten Repo durchführen
    (außer `docs/archive/**` und `docs/plans/<diese Datei>`) und jede
    Fundstelle gezielt anpassen.
- **Risiko:** Externe Konsumenten (CSV-Export, Drittanwendungen) referenzieren
  `entwicklung` als Sublayer.
  - *Mitigation:* Changelog-Eintrag + klare Hinweis-Note in `data/README.md`
    und Release-Notes.
- **Risiko:** i18n-Schlüsselbäume für noch nicht migrierte Sprachen
  (`bg`, `hr`, `cs`, …) enthalten neue Keys nicht — Fallback notwendig.
  - *Mitigation:* `t('search.sublayers.<slug>', { defaultValue: slug })`
    verwendet automatisch den Slug als sichtbaren Fallback.
- **Risiko:** Aufteilung in nur zwei Sublayer ist für Test-Tools
  (`selenium`, `robot-framework`) semantisch unscharf.
  - *Mitigation:* Folge-Task „Variante C" offen halten, Empfehlung dort für
    `werkzeuge`.
- **Risiko:** Sublayer-Aggregate in
  `docs/ITEM_METRICS_SCHEMA.md:249-300` wurden noch nicht implementiert;
  künftige Implementierung muss die neuen Gruppen kennen.
  - *Mitigation:* Hinweis im Plan + Verweis in ARC42.

## Offene Fragen

1. **Slug-Namenskonvention** — Deutsche (`sprachen`, `frameworks`) oder
   englische (`languages`, `frameworks`) Slugs? Aktueller Bestand ist
   gemischt (`entwicklung`, `integration`, `ki` = DE; `browser`,
   `native-apps` = EN).
2. **Dritter Sublayer „werkzeuge"** — jetzt umsetzen (Variante C) oder als
   Folge-Task?
3. **Node.js-Sublayer** — Umbenennen auf `laufzeit` bzw. `runtime` direkt in
   dieser PR oder getrennt? Entscheidet über Scope (23 vs. 24 Items).
4. **CSS-Einordnung** — CSS ist eine Stylesheet-Sprache, keine
   Programmiersprache. Alternativ eigener Sublayer `auszeichnung` für
   Markup/Styles (CSS, YAML, JSON, XML, Markdown)? Aktuell bleibt
   CSS der Einfachheit halber unter `sprachen`.
5. **Migrationsweg für Enum-Härtung** — wenn wir später `sublayer` pro
   Layer in ein Enum ziehen, soll vorher eine Deprecation-Phase eingeführt
   werden?
