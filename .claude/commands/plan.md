# /plan — Umsetzungsplan erstellen

Erstelle einen detaillierten Umsetzungsplan für das folgende Feature oder die folgende Aufgabe:

**Aufgabe:** $ARGUMENTS

## Vorgehen

1. Erkunde die relevanten Teile der Codebase (Typen, Scoring-Logik, Schemata, Dokumentation).
2. Analysiere Auswirkungen auf bestehende Architektur und Datenmodelle.
3. Erstelle einen strukturierten Plan mit klaren Implementierungsschritten.
4. Speichere den Plan unter `docs/plan/<slug>.md` (slug = kurzer Bezeichner der Aufgabe).

## Planstruktur (Pflichtabschnitte)

- **Motivation / Problemstellung** — Warum wird diese Änderung benötigt?
- **Design-Ziele & Nicht-Ziele** — Was soll erreicht werden, was explizit nicht?
- **Datenmodell-Änderungen** — Neue/geänderte Typen, Schemata, JSON-Felder
- **Algorithmus / Scoring-Konzept** — Formeln, Gewichte, Normalisierung
- **Implementierungsschritte** — Nummerierte, atomare Aufgaben (von Daten bis UI)
- **Dokumentations-Updates** — Welche Docs müssen angepasst werden?
- **Risiken & Mitigationen** — Potenzielle Probleme und Lösungsansätze
- **Offene Fragen** — Was muss noch entschieden werden?

## Hinweise

- Nutze das Modell **claude-opus-4-7** für die Analyse und Planung (maximale Reasoning-Qualität).
- Schreibe in Deutsch, Codebeispiele auf Englisch.
- Keine Implementierung — nur Plan.
- Verweise auf konkrete Dateipfade (z.B. `src/utils/adoptionScore.ts:142`).
