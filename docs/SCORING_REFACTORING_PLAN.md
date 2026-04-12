# Lösungsplan: Hybrid Scoring – Neuverteilung der Gewichte

## Problem

Das aktuelle Scoring-System hat ein rechnerisches Maximum von **115 Punkten** und schneidet
alles über 100 mit einem harten `Math.min(100, ...)` ab. Zusätzlich existiert ein willkürlicher
Cap `MAX_SCORE_WITHOUT_OWNER = 60`, der Items ohne `ownerType` auf maximal 60 Punkte begrenzt.

**Ziel:** Die Gewichte so neu verteilen, dass das Maximum **natürlich = 100** ergibt –
ohne jeden Hard-Cap.

---

## Neues Gewichtsmodell

| Kriterium              | Gewicht alt | Gewicht neu | Delta |
|------------------------|-------------|-------------|-------|
| `openSource`           | 30          | 25          | −5    |
| `euHeadquartered`      | 25          | 20          | −5    |
| `hasAudit`             | 20          | 20          | ±0    |
| `permissiveLicense`    | 10          | 10          | ±0    |
| `matureProject`        | 10          | 10          | ±0    |
| `largeEcosystem`       | 5           | 5           | ±0    |
| **Basis-Summe**        | **100**     | **90**      |       |
| `independentConsortium`| 15          | 10          | −5    |
| `community`            | 10          | 7           | −3    |
| `corporation`          | 5           | 3           | −2    |
| `oneManShow`           | 0           | 0           | ±0    |
| **Gesamtmaximum**      | 115 → cap 100 | **100**   | ✓     |

### Semantisches Mapping
- Ohne `ownerType`: max. **90 Punkte** → "excellent" (76–90) erreichbar, aber nie "outstanding"
- Mit bester Eigentümerstruktur (`independentConsortium`): **100 Punkte** → "outstanding" ✓

---

## Was entfernt wird

| Element                            | Datei                          | Grund               |
|------------------------------------|--------------------------------|---------------------|
| `Math.min(100, ...)`               | `sovereigntyScore.ts`          | nicht mehr nötig    |
| `Math.min(100, ...)`               | `scripts/generate-data.mjs`    | nicht mehr nötig    |
| `MAX_SCORE_WITHOUT_OWNER = 60`     | `sovereigntyScore.ts`          | nicht mehr nötig    |
| `MAX_SCORE_WITHOUT_OWNER = 60`     | `scripts/generate-data.mjs`    | nicht mehr nötig    |
| `ownerType: 0` in `WEIGHTS`        | `sovereigntyScore.ts`          | redundante Zeile    |
| `if (key === 'ownerType') return`  | `sovereigntyScore.ts`          | entfällt mit obigem |
| Typ `Record<keyof SovereigntyCriteria, number>` | `sovereigntyScore.ts` | → `Record<keyof Omit<SovereigntyCriteria, 'ownerType'>, number>` |

---

## Zusätzlicher Bug-Fix: SovereigntyGauge.tsx

Die Hintergrund-Segmente des Tachometers nutzen **gleichmäßige 45°-Schritte** obwohl die
Score-Ranges unterschiedlich groß sind. Die Nadel berechnet sich korrekt mit `(score/100)*270°`
– dadurch zeigt die Nadel in falschen farbigen Bereich.

### Korrigierte Segment-Winkel

| Kategorie     | Score-Range | Winkel alt | Winkel neu (= `(max_prev/100)*270`) |
|---------------|-------------|------------|--------------------------------------|
| insufficient  | 0–30        | 0°         | 0°                                   |
| minimal       | 31–45       | 45°        | 81°                                  |
| adequate      | 46–60       | 90°        | 121.5°                               |
| good          | 61–75       | 135°       | 162°                                 |
| excellent     | 76–90       | 180°       | 202.5°                               |
| outstanding   | 91–100      | 225°       | 243°                                 |

---

## Betroffene Dateien

1. **`src/utils/sovereigntyScore.ts`** – Gewichte neu, Caps entfernen, WEIGHTS vereinfachen
2. **`scripts/generate-data.mjs`** – Scoring-Logik synchron halten
3. **`src/components/SovereigntyGauge.tsx`** – Segment-Winkel korrigieren

---

## Verifikation

Nach der Änderung gilt:
- `25 + 20 + 20 + 10 + 10 + 5 + 10 = 100` ✓
- Ohne `ownerType`: max. 90, kein expliziter Cap nötig ✓
- Gauge: Nadel bei Score 40 → 108°, Segment `minimal`: 81°–121.5° → korrekt ✓
- Gauge: Nadel bei Score 85 → 229.5°, Segment `excellent`: 202.5°–243° → korrekt ✓
