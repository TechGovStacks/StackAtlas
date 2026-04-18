# Umsetzungsplan: Fehlende EU-Sprachen ergänzen

## Ziel

Die folgenden aktuell fehlenden Sprachen sollen strukturiert in die Anwendung aufgenommen werden:

- bg (Bulgarisch)
- hr (Kroatisch)
- cs (Tschechisch)
- nl (Niederländisch)
- et (Estnisch)
- fi (Finnisch)
- el (Griechisch)
- hu (Ungarisch)
- ga (Irisch)
- lv (Lettisch)
- lt (Litauisch)
- mt (Maltesisch)
- pl (Polnisch)
- pt (Portugiesisch)
- ro (Rumänisch)
- sk (Slowakisch)
- sl (Slowenisch)

## Leitprinzipien

1. **Keine Pseudo-Übersetzungen**
   Neue Sprachen erst im Language Switcher anzeigen, wenn ein geprüftes `common.json` vorhanden ist.
2. **Konsistente Sprachebenen**
   - UI-Texte (`src/i18n/locales/*/common.json`)
   - Daten-Texte (lokalisierte Felder in generierten Daten)
3. **Sicheres Fallback**
   Für fehlende Einzelkeys immer nachvollziehbar auf Englisch (oder konfigurierten Fallback) zurückfallen.
4. **Inkrementelle Einführung**
   Rollout in Batches (z. B. 3–5 Sprachen), nicht alle 17 gleichzeitig.

## Technische Umsetzungsschritte

### Phase 1 – Vorbereitung

1. Sprach-Codes und Priorisierung finalisieren (z. B. nach Nutzerbedarf / Stakeholder-Priorität).
2. Übersetzungs-Glossar definieren (zentrale Begriffe wie „Sovereignty“, „Stack“, „Dependency“, „Layer“).
3. QA-Checkliste erstellen (Terminologie, Länge, Accessibility, Umlaute/Sonderzeichen, i18n-Key-Deckung).

### Phase 2 – Sprach-Bundle je Sprache anlegen

Für jede Sprache (`bg`, `hr`, `cs`, ..., `sl`):

1. Ordner anlegen: `src/i18n/locales/<code>/`
2. Datei anlegen: `src/i18n/locales/<code>/common.json`
3. Auf Basis von `src/i18n/locales/en/common.json` starten.
4. Alle Keys fachlich übersetzen (nicht nur maschinell übernehmen).
5. PR-Review mit Sprachprüfung (4-Augen-Prinzip) durchführen.

### Phase 3 – Registrierung im i18n-Setup

1. In `src/i18n/index.ts` die neuen Locale-Dateien importieren.
2. Im `resources`-Block die Sprachcodes registrieren.
3. In `src/i18n/language.ts` `SUPPORTED_LANGUAGES` erweitern.
4. In `src/types/index.ts` `LanguageCode` Union erweitern.

### Phase 4 – UI-Freischaltung

1. In `src/components/LanguageSwitcher.tsx` die neuen Sprachoptionen eintragen.
2. Anzeige-Label in nativer Schreibweise pflegen (z. B. `Čeština`, `Slovenčina`, `Română`).
3. Nur Sprachen aktivieren, die QA in Phase 2 bestanden haben.

### Phase 5 – Datenlokalisierung (optional, empfohlen)

1. Prüfen, welche inhaltlichen Datenfelder lokalisiert werden (z. B. `name`, `description`, `rationale`).
2. Fallback-Strategie für Datenlokalisierung validieren (`exact -> base -> en -> fallback`).
3. Für neue Sprachen in priorisierten Datendomänen Übersetzungen nachziehen.

## Qualitätssicherung

Für jede neue Sprache:

1. App starten und Sprache wechseln.
2. Header, Footer, Filter, Drawer, Settings, Graphs prüfen.
3. Texte auf Trunkierung/Überlauf testen (mobile + desktop).
4. i18n-Missing-Keys prüfen (Konsole / parseMissingKeyHandler).
5. Typecheck und Lint ausführen:
   - `pnpm lint:ts`
   - `pnpm lint:eslint`
   - `pnpm lint:stylelint`
   - `pnpm format`

## Rollout-Vorschlag (Batches)

- **Batch A:** nl, pt, pl, cs, ro
- **Batch B:** fi, et, lv, lt, sk
- **Batch C:** sl, hr, bg, hu, el
- **Batch D:** mt, ga

Jeder Batch als eigener PR mit klaren Reviewer-Zuständigkeiten.

## Risiken & Gegenmaßnahmen

- **Risiko:** Inkonsistente Terminologie über Sprachen hinweg.
  - **Maßnahme:** Zentrales Glossar + Reviewer je Sprache.
- **Risiko:** Sprachen erscheinen im Switcher trotz unvollständiger Übersetzung.
  - **Maßnahme:** Feature-Gate pro Sprache (nur bei kompletter Key-Deckung freischalten).
- **Risiko:** UI-Überläufe bei langen Begriffen.
  - **Maßnahme:** Layout-Tests auf kleinen Viewports + gezielte Textkürzungen.

## Abnahmekriterien

Eine Sprache gilt als „fertig“, wenn:

1. `common.json` vollständig und reviewt ist.
2. Sprache im Switcher auswählbar ist.
3. Keine fehlenden i18n-Keys in den Kern-Views auftreten.
4. Lint/Typecheck/Format ohne Fehler durchlaufen.
5. Produktabnahme für Terminologie erfolgt ist.
