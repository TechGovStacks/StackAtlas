---
status: active
owner: Governance Scoring Team
last_reviewed: 2026-04-09
source_of_truth: docs/scoring/sovereignty-scoring-model.md
---

# Souveraenitaets-Scoring-Modell

## Ziel

Dieses Dokument ist die kanonische Referenz fuer den item-spezifischen Souveraenitaetsscore (0-100).

## Bewertungsprinzipien

1. Gleichbehandlung: gleicher Kriterienkatalog pro Layer/Sublayer.
2. Quellenparitaet: je Kriterium mindestens zwei Quellenklassen.
3. Evidenzpflicht: jeder Wert ist quellenbasiert belegbar.
4. Revalidierung: jedes Rating hat Bewertungs- und Review-Datum.

## Quellenklassen (Q1-Q6)

- Q1 Hersteller/Projektquellen
- Q2 Code-/Entwicklungsquellen
- Q3 Rechts-/Compliancequellen
- Q4 Sicherheitsquellen
- Q5 Unabhaengige Drittquellen
- Q6 Betriebs-/Marktquellen

## Kriterien und Gewichtung

| Kriterium                                          | Gewicht |
| -------------------------------------------------- | ------: |
| K1 Rechtliche Souveraenitaet                       |    15 % |
| K2 Datenhoheit und Datenportabilitaet              |    20 % |
| K3 Technologische Offenheit und Interoperabilitaet |    15 % |
| K4 Governance und Anbieterunabhaengigkeit          |    15 % |
| K5 Sicherheits- und Lieferketten-Souveraenitaet    |    15 % |
| K6 Betriebsautonomie und Exit-Faehigkeit           |    10 % |
| K7 Transparenz und Nachvollziehbarkeit             |    10 % |

## Berechnung

`Score = Summe((Punkte_Ki / 5) * Gewicht_Ki)`

Ergebnisbereich: 0-100.

## Guardrails

- Wenn `K2 < 2`, dann Score maximal 49.
- Wenn `K5 < 2`, dann Score maximal 49.
- Wenn `K6 < 2`, dann Score maximal 49.

## Prozess

1. Item klassifizieren (Layer, Sublayer, Typ).
2. Evidenzen aus Q1-Q6 sammeln.
3. Erstbewertung durch Analyst A.
4. Zweitpruefung bei strittigen Kriterien.
5. Score und Begruendung versioniert veroeffentlichen.

## Historische Entwuerfe

Nicht-normative Vorgaben und KI-Rohfassungen liegen unter `docs/archive/scoring/`.
