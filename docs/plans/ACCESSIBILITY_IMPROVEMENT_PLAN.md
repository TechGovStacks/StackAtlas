# Lösungsplan: Maximale Barrierefreiheit der App

**Status:** Entwurf
**Zielkonformität:** WCAG 2.2 Level AA (Ziel: AAA wo praktikabel), EN 301 549, BFSG
**Zielgruppe:** Entwickler:innen, Product Owner, A11y-Reviewer
**Letzte Aktualisierung:** 2026-04-18

---

## 1. Ausgangslage

Die App basiert auf **Preact + preact-iso + KoliBri** (Komponentenbibliothek des Bundes, BITV-konform) und hat bereits ein solides A11y-Fundament:

- Skip-Link (`src/components/Header.tsx:25`)
- Semantisches HTML (`<main id="main-content">`, `<header>`, `<footer>`, `<nav aria-label>`)
- ARIA-Rollen: `article`, `note`, `alert` (`aria-live="assertive"`), `progressbar`, `aria-current="page"`
- `:focus-visible`-Styles (`src/style.scss:178-214`)
- `prefers-reduced-motion` (`index.html:345-364`)
- Playwright + axe-core E2E-Tests (`e2e/axe.e2e.ts`) gegen WCAG 2A/AA/2.1 AA
- ESLint `jsx-a11y` (`eslint.config.js:32`)
- i18n mit 8 Sprachen, `<html lang>` wird dynamisch gesetzt (`src/i18n/index.ts:53-60`)

### Identifizierte Lücken

| #   | Lücke                                               | Schwere |
| --- | --------------------------------------------------- | ------- |
| 1   | Kein Dark Mode / High Contrast                      | hoch    |
| 2   | Keine Live-Region für Filter-Ergebnisse             | hoch    |
| 3   | Keine Route-Change-Announcements                    | hoch    |
| 4   | Heading-Hierarchie nicht automatisch validiert      | hoch    |
| 5   | Fokus-Management im Settings-Drawer ungeprüft       | hoch    |
| 6   | SVG-Graphen (DependencyGraph) ohne Textalternative  | mittel  |
| 7   | Touch-Target-Größen teils < 24 px                   | mittel  |
| 8   | Gemischtsprachige Inhalte ohne `lang`-Attribut      | mittel  |
| 9   | Formular-Fehlermeldungen nicht maschinell verbunden | mittel  |
| 10  | Keine Barrierefreiheitserklärung (BFSG-Pflicht)     | mittel  |
| 11  | axe-Tests decken nur 4 Regionen ab                  | niedrig |
| 12  | Keine Tastatur-Shortcuts / Doku                     | niedrig |

---

## 2. Lösungsplan in Phasen

### Phase 1 — Grundlagen (Sprint 1, ~5 PT)

**Ziel:** Screenreader- und Sehbehinderten-Erfahrung quantitativ verbessern.

#### 1.1 Dark Mode + High Contrast

- CSS-Variablen in `src/style.scss:5-67` in `:root` (Light) und `[data-theme="dark"]` / `@media (prefers-color-scheme: dark)` aufteilen.
- Zusätzlich `@media (prefers-contrast: more)` mit härteren Farbwerten.
- Manuellen Toggle in `SettingsForm.tsx` (Auto / Hell / Dunkel / Hoher Kontrast) mit Persistenz in `localStorage` (Key `theme`).
- **FOUC-Vermeidung:** Theme-Anwendungslogik (Lese `localStorage.theme` und setze `data-theme` auf `<html>`) als blockierendes Inline-Skript im `<head>` von `index.html` **vor** allen Stylesheets ausführen. Verhindert das „Dark Mode Flash" beim ersten Paint — kritisch für Nutzer:innen mit Lichtempfindlichkeit.
- Kontraste WCAG 1.4.3 (AA 4.5:1) verifizieren, Ziel 1.4.6 (AAA 7:1) wo möglich.
- **Akzeptanz:** Lighthouse-Kontrastscore ≥ 95 in allen Modi, axe-Test `color-contrast` grün.

#### 1.2 Live-Region für Filter-Ergebnisse

- Neue Komponente `src/components/A11yAnnouncer.tsx` mit `role="status"` / `aria-live="polite"` / `aria-atomic="true"`.
- Einbindung in `CategoryGrid.tsx`: bei Änderung der gefilterten Anzahl Text wie „142 Einträge gefunden" (i18n-fähig). Ankündigung **erst nach Eingabestopp** auslösen (Debounce ≥ 750 ms, idealerweise via `requestIdleCallback` nach letzter Filteraktion). Vermeidet „Stottern" im Screenreader bei schnellem Tippen, das die Vorlesung der vorigen Anzahl unterbrechen würde.
- **Akzeptanz:** NVDA/VoiceOver lesen die neue Anzahl nach Filteränderung vor.
- **WCAG:** 4.1.3 Status Messages.

#### 1.3 Route-Change-Announcements

- Hook `useRouteAnnouncement()` in `src/hooks/`, der beim Routing (preact-iso `useLocation`) den neuen Seitentitel setzt und per Live-Region vorliest.
- Fokus programmatisch auf `<h1>` der neuen Seite (tabindex=-1) verschieben.
- `document.title` pro Route deklarativ (`<Title>`-Komponente oder Hook).
- **Akzeptanz:** Alle 6 Routen haben eindeutige Titel und werden angekündigt.
- **WCAG:** 2.4.2 Page Titled, 2.4.3 Focus Order.

#### 1.4 Heading-Hierarchie

- Audit aller Seiten: genau ein `<h1>`, keine übersprungenen Ebenen.
- axe-Regel `heading-order` in `e2e/axe.e2e.ts` aktivieren (`.withRules(['heading-order'])`).
- **Akzeptanz:** axe-Run ohne `heading-order`-Violations.
- **WCAG:** 1.3.1 Info and Relationships, 2.4.6 Headings and Labels.

#### 1.5 Fokus-Management Settings-Drawer

- KoliBri-Drawer: Fokus beim Öffnen auf erstes fokussierbares Element.
- Escape schließt und gibt Fokus an Trigger zurück.
- `inert`-Attribut auf Hintergrund während Drawer offen.
- Tab-Zyklus (Fokus-Falle) prüfen — ggf. `focus-trap`-Utility hinzufügen.
- **Akzeptanz:** Manueller Test + Playwright-Test `drawer-focus.spec.ts`.
- **WCAG:** 2.1.2 No Keyboard Trap (invertiert: hier erwünscht), 2.4.3 Focus Order.

---

### Phase 2 — Komponenten-Tiefe (Sprint 2, ~4 PT)

#### 2.1 DependencyGraph barrierefrei

- SVG mit `role="graphics-document"` (WAI-ARIA Graphics Module) + `aria-labelledby` (verweist auf `<title>` + `<desc>` im SVG). **Nicht** `role="img"` verwenden — als terminale Rolle würde sie die Kindelemente für AT als rein präsentational markieren und damit Tastatur-/Screenreader-Interaktion mit den Knoten verhindern.
- Knoten als `role="graphics-symbol"` (oder fokussierbare `<g tabindex="0">`) mit eigenem `aria-label`; Kanten als `role="graphics-symbol"` oder via `aria-describedby` der Knoten beschrieben.
- Tastaturnavigation zwischen Knoten (Pfeiltasten, Enter öffnet Detail, Esc verlässt den Graph).
- Äquivalente Tabellen-/Listendarstellung via Toggle „Als Liste anzeigen" (gleicher Informationsgehalt, nicht reduziert).
- Sichtbarer Fokusindikator auf SVG-Knoten (Outline ≥ 2 px, Kontrast ≥ 3:1).
- **WCAG:** 1.1.1, 1.3.1, 2.1.1, 2.4.7.

#### 2.2 SovereigntyGauge

- Ergänzung von `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Textuelle Beschreibung (`aria-label="Digitale Souveränität: 75 von 100"`).
- **WCAG:** 1.1.1, 4.1.2.

#### 2.3 Touch-Targets & Fokus-Indikatoren

- Audit: alle interaktiven Elemente ≥ 24×24 CSS-px (AA) bzw. 44×44 (Best Practice).
- Einheitlicher Fokus-Style (2 px Outline + `outline-offset: 2px`, Kontrast ≥ 3:1).
- Filter-Chips, Icon-Buttons, Card-Links in `FilterBar.tsx`, `ArticleCard.tsx`, `Footer.tsx` prüfen.
- **WCAG:** 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured, 2.5.8 Target Size (Minimum).

#### 2.4 Sprachauszeichnung

- Produktnamen / Zitate in Fremdsprache (z. B. englische Tool-Namen im DE-UI) mit `lang`-Attribut markieren.
- Utility `<Lang lang="en">Kubernetes</Lang>` oder Datenmodell-Feld `originalLanguage` in `items.generated.ts`.
- **WCAG:** 3.1.2 Language of Parts.

#### 2.5 Formular-Barrierefreiheit

- `SettingsForm.tsx`: `aria-invalid`, `aria-describedby` auf Fehlermeldungen.
- Fehler-Zusammenfassung oben im Formular (Fokus nach Submit).
- Erfolg per Live-Region („Einstellungen gespeichert").
- **WCAG:** 3.3.1 Error Identification, 3.3.3 Error Suggestion, 3.3.4 Error Prevention.

---

### Phase 3 — Compliance & Prozess (Sprint 3, ~3 PT)

#### 3.1 Barrierefreiheitserklärung

- Neue Route `/erklaerung-zur-barrierefreiheit` bzw. `/accessibility-statement` (sprachabhängiger Slug).
- **Übersetzung in alle 8 unterstützten Sprachen** (DE, EN, DA, ES, FR, IT, NO, SV) — sonst Verstoß gegen EN 301 549 §12.1.1 (Information für Nutzer:innen muss in den vom Service unterstützten Sprachen verfügbar sein) und Bruch der inklusiven UX. Übersetzungen via i18next-Resourcen-Bundles, juristisch verbindliche Fassung in DE markieren.
- Inhalt nach BITV 2.0 § 12b / EN 301 549:
  - Konformitätsstatus (voll / teilweise / nicht konform)
  - Nicht barrierefreie Inhalte (falls zutreffend)
  - Erstellungsdatum & Prüfverfahren
  - Feedback-Kanal (E-Mail, Kontaktformular)
  - Schlichtungsverfahren (Bundesfachstelle Barrierefreiheit)
- Link im Footer (in der jeweils aktiven Sprache).

#### 3.2 Tastatur-Shortcuts

- Globale Shortcuts (z. B. `/` = Suche fokussieren, `g h` = Home, `?` = Hilfe).
- `?` öffnet Shortcuts-Dialog.
- Per Setting abschaltbar (WCAG 2.1.4 Character Key Shortcuts).
- Dokumentation in `docs/KEYBOARD_SHORTCUTS.md`.

#### 3.3 Zoom / Reflow / Text Spacing

- Manueller Test bei 200 % und 400 % Browser-Zoom: kein horizontales Scrollen (WCAG 1.4.10).
- Text-Spacing-Test (WCAG 1.4.12): `line-height 1.5`, `paragraph-spacing 2×`, `letter-spacing 0.12em`, `word-spacing 0.16em` dürfen Inhalt nicht abschneiden.
- Automatisierter Test via Playwright (viewport 320×256 entspricht 400 % auf 1280 px).

#### 3.4 Test-Erweiterung

- `e2e/axe.e2e.ts` auf alle 6 Routen + Drawer offen + Filter aktiv + Fehlerzustände erweitern.
- Neue Spec `e2e/keyboard.spec.ts` für Tab-Reihenfolge und Shortcuts.
- CI-Gate: `lighthouse --only-categories=accessibility` mit **Score = 100** als Pflicht-Check in GitHub Actions. Da das Ziel „maximale Barrierefreiheit" ist und Lighthouse nur eine Teilmenge der WCAG-Verstöße automatisiert erkennt, darf jeder erkennbare Verstoß als Blocker gelten. (Hinweis: Score 100 bedeutet keine Vollkonformität — manuelle Prüfungen bleiben Pflicht.)
- Optional: `pa11y-ci` als zweiter Scanner.

---

### Phase 4 — Feinschliff (kontinuierlich)

| Maßnahme                                                     | Nutzen         | WCAG    |
| ------------------------------------------------------------ | -------------- | ------- |
| Zusätzliche Skip-Links („Zur Navigation", „Zu den Filtern")  | Tastaturnutzer | 2.4.1   |
| `prefers-reduced-transparency`                               | Seh-/Kognitive | 1.4.x   |
| Persistenz Sprache/Theme/Motion in `localStorage`            | Alle           | UX      |
| Druck-Stylesheet `@media print`                              | Alle           | 1.4.x   |
| Dekorative Icons `aria-hidden="true"`, informative mit Label | Screenreader   | 1.1.1   |
| Konsistente Alt-Texte in `items.generated.ts`                | Screenreader   | 1.1.1   |
| Nutzertest mit NVDA / VoiceOver / TalkBack je Release        | Alle           | Prozess |
| Nutzertest mit Menschen mit Behinderung (DIAS / BIK-BITV)    | Alle           | Prozess |

---

## 3. Aufwand & Zeitplan

| Phase           | Aufwand    | Kalenderdauer       |
| --------------- | ---------- | ------------------- |
| Phase 1         | ~5 PT      | 1 Sprint (2 Wochen) |
| Phase 2         | ~4 PT      | 1 Sprint            |
| Phase 3         | ~3 PT      | 1 Sprint            |
| Phase 4         | laufend    | ongoing             |
| **Gesamt Kern** | **~12 PT** | **3 Sprints**       |

---

## 4. Erfolgskriterien / Definition of Done

- [ ] axe-core: 0 Violations auf allen 6 Routen (Light, Dark, High Contrast)
- [ ] Lighthouse-Accessibility-Score = 100 auf allen Routen
- [ ] Manuelles Audit mit NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android) — alle Kern-Flows bedienbar
- [ ] Tastaturbedienung für alle Funktionen (kein Maus-Zwang)
- [ ] WCAG 2.2 Level AA Konformität dokumentiert
- [ ] Barrierefreiheitserklärung veröffentlicht und verlinkt
- [ ] CI-Gate aktiv (axe + Lighthouse)
- [ ] `docs/ACCESSIBILITY.md` mit Test-Matrix und Nutzerhinweisen erstellt

---

## 5. Offene Fragen

1. **Feedback-Kanal:** E-Mail-Adresse, GitHub-Issue-Template oder Kontaktformular?
2. **Schlichtungsstelle:** Bundesfachstelle Barrierefreiheit (Bund) oder Länder-Stelle?
3. **High-Contrast-Design:** Eigene Farbtokens oder Ableitung aus Dark-Mode-Werten?
4. **Nutzertest-Budget:** Ist ein Audit durch DIAS / BIK-BITV (extern, kostenpflichtig) vorgesehen?
5. **Übersetzungsworkflow:** Werden die 7 Nicht-DE-Übersetzungen der Barrierefreiheitserklärung professionell beauftragt oder intern erstellt?

---

## 6. Referenzen

- [WCAG 2.2 (W3C)](https://www.w3.org/TR/WCAG22/)
- [EN 301 549 V3.2.1](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/)
- [BITV 2.0](https://www.gesetze-im-internet.de/bitv_2_0/)
- [Barrierefreiheitsstärkungsgesetz (BFSG)](https://www.gesetze-im-internet.de/bfsg/)
- [KoliBri A11y-Dokumentation](https://public-ui.github.io/)
- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
