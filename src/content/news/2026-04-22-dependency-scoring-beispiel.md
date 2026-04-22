---
focus: scoringExplained
title: Wie entsteht der Score einer Dependency? Rechenbeispiel mit PostgreSQL
summary: Dieser Beitrag zeigt mit echten Katalogwerten von PostgreSQL, wie Sovereignty, Sovereign Adoption, Adoption und Popularity zum Overall Score führen.
---

# Wie entsteht der Score einer Dependency? Rechenbeispiel mit PostgreSQL

> **Kurzfazit:** Der Overall Score ist keine Blackbox. Mit den gespeicherten Teilwerten lässt sich die Rechnung exakt nachvollziehen.

In den Kommentaren kam der Wunsch auf, das Scoring mit **realen** Werten aus dem Katalog zu erklären (statt mit hypothetischen Annahmen).

Deshalb rechnen wir hier Schritt für Schritt mit **PostgreSQL** durch — inklusive Popularity-Blending, wie es im Code umgesetzt ist.

---

## 1) Die verbindliche Formel im Projekt

| Komponente               | Gewicht | Bedeutung                                     |
| :----------------------- | ------: | :-------------------------------------------- |
| Sovereignty Score        |    60 % | Intrinsische Souveränität des Items           |
| Sovereign Adoption Score |    25 % | Adoption nur im souveränen Kontext            |
| Adoption-Anteil          |    15 % | Adoption Score, ggf. mit Popularity geblendet |

Die Implementierung berechnet:

`Overall = 0,60 × Sovereignty + 0,25 × SovereignAdoption + 0,15 × AdoptionToUse`

Falls `popularityScore` vorhanden ist:

`AdoptionToUse = 0,70 × adoptionScore + 0,30 × popularityScore`

---

## 2) Konkrete Eingabewerte für PostgreSQL

Aus dem aktuellen Datensatz für `postgresql`:

- `sovereigntyScore = 90`
- `adoption.adoptionScore = 91`
- `adoption.sovereignAdoptionScore = 91`
- `adoption.popularityScore = 100`
- `adoption.overallScore = 91` (gespeicherter Endwert)

Zusätzlich zur Einordnung:

- Nutzung in **15 Stacks** (`usedInStacks`)
- `directCoverage = 5.4926`
- `transitiveCoverage = 0.3493`
- `diversity = 0.8711`

---

## 3) Schritt-für-Schritt-Rechnung

### Schritt A: Adoption mit Popularity blenden

`AdoptionToUse = 0,70 × 91 + 0,30 × 100`

`AdoptionToUse = 63,7 + 30 = 93,7`

### Schritt B: Gewichtet in die Overall-Formel einsetzen

- `0,60 × 90 = 54,00`
- `0,25 × 91 = 22,75`
- `0,15 × 93,7 = 14,055`

`Summe = 54,00 + 22,75 + 14,055 = 90,805`

### Schritt C: Runden

Im Code wird auf ganze Punkte gerundet:

`Math.round(90,805) = 91`

➡️ **Finaler Overall Score = 91**

Dieser Wert entspricht exakt dem gespeicherten Katalogwert.

---

## 4) Warum dieses Beispiel hilfreich ist

Damit ist transparent:

1. **Sovereignty dominiert** weiterhin (60 % Gewicht).
2. **Adoption bleibt relevant** über Sovereign Adoption (25 %) und Adoption-Anteil (15 %).
3. **Popularity wirkt nur innerhalb des 15%-Anteils** und kann den Endwert fein justieren, aber nicht dominieren.

---

## 5) Mini-Gegenprobe (ohne Popularity)

Würde man testweise _kein_ Popularity-Blending verwenden, wäre der dritte Term:

- `0,15 × 91 = 13,65` statt `14,055`

Dann ergäbe sich:

`54,00 + 22,75 + 13,65 = 90,40 → gerundet 90`

Man sieht: Popularity hebt PostgreSQL hier um **+1 Punkt** im Overall Score (von 90 auf 91).

---

## Fazit

Das Dependency-Scoring ist reproduzierbar und auditierbar: Mit den gespeicherten Teilwerten kann jede:r den Overall Score selbst nachrechnen.

Genau so sollte Scoring dokumentiert sein — **präzise, nachvollziehbar, datenbasiert**.
