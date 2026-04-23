# Optimierungsplan: Adoption-Scoring-Kalibrierung

## Kontext

Aktuell kann ein hohes Item-Basissignal (z. B. starker Sovereignty-Score) durch geringe
sichtbare Nutzung im Stack-Ökosystem relativ stark „abgebremst“ werden. Das betrifft
insbesondere:

1. **Wahrnehmung bei niedriger Häufigkeit**
   - Beispielbild: „100 wirkt wie ~60“, wenn ein Item selten/nie in Stacks vorkommt.
2. **Rollenwirkung bei niedrigen Dep-Scores**
   - `maintainer` sollte in solchen Fällen eher stabilisieren/aufwerten (bewusste
     Investition & Kontrolle).
   - `contributor` sollte mindestens neutral bis leicht positiv wirken (Einflussnahme).

Dieses Dokument beschreibt einen inkrementellen Plan, um das Scoring robuster,
intendierter und besser erklärbar zu machen.

---

## Ist-Zustand (relevant für das Problem)

- Adoption nutzt Rollen-/Statusgewichte, Stack-Size-Dämpfung, Diversity-Faktor,
  transitive Coverage und anschließende **Max-Normalisierung auf 0–100**.
- Rollen sind aktuell: `maintainer: 1.0`, `contributor: 0.8`, `funder: 0.4`,
  `consumer: 0.5`.
- Overall-Score gewichtet derzeit: **0.60 Sovereignty + 0.25 Sovereign Adoption +
  0.15 Adoption** (optional Adoption/Popularity-Blend).

Risiko: Selbst wenn Adoption nur 15 % im Overall gewichtet ist, kann die
Wahrnehmung einzelner Items bei niedriger Nutzung „zu hart“ wirken, insbesondere
wenn Adoption intern stark relativ skaliert wird.

---

## Zielbild

1. **Keine überharte Abwertung bei „noch nicht breit genutzt“**
   - Niedrige Häufigkeit soll informieren, aber kein implizites „nicht empfehlen“
     erzeugen.
2. **Intentionalität belohnen**
   - `maintainer` bei schwachem Dep-/Nutzungsumfeld nicht bestrafen, sondern
     als strategisches Commitment positiv einbeziehen.
3. **Einfluss sichtbar machen**
   - `contributor` nicht als klare Abwertung ggü. neutraler Nutzung modellieren.
4. **Transparenz & Debuggability**
   - Subscore-Beiträge klar aufschlüsseln (Basis, Häufigkeit, Rollen-Boost,
     Diversity, Transitivität).

---

## Maßnahmenplan (4 Phasen)

## Phase 1 — Diagnostik & Baseline-Kalibrierung

### 1.1 Wirkungsmessung mit Referenzfällen

Erzeuge reproduzierbare Szenarien (synthetisch + reale Items), u. a.:

- High Sovereignty + 0 direkte Nutzung
- High Sovereignty + wenige `maintainer`
- Medium Sovereignty + viele `consumer`
- Schwacher Dep-Score + `maintainer` vs. `contributor`

**Ergebnis:** Kalibrierungs-Matrix, die zeigt, wo das Modell aktuell zu stark/zu schwach reagiert.

### 1.2 Zusätzliche Telemetrie in Datenpipeline

Ergänze pro Item (intern) folgende debugbare Werte:

- `baseCoverage`
- `roleAdjustedCoverage`
- `lowCoverageLift`
- `normalizationAnchor`
- `finalAdoptionRaw`

Damit wird nachvollziehbar, ob die Härte von der Rollenlogik oder von der
Normalisierung kommt.

---

## Phase 2 — Mathematische Entschärfung der Häufigkeits-Abwertung

### 2.1 Relative Max-Normalisierung absichern

Ersetze „nur-max“-Normalisierung durch **robustere Anchors**:

- Option A (empfohlen): `score = 100 * raw / p95(raw)` mit Cap 100
- Option B: Hybrid `denom = max(p95(raw), fixedAnchor)`

Vorteil: Einzelne extreme Top-Items ziehen den Rest nicht unverhältnismäßig nach unten.

### 2.2 Soft-Floor für geringe, aber plausible Adoption

Füge einen **kalibrierten Lower-Floor** ein, wenn Basisindikatoren stark sind.
Beispiel:

- Wenn `sovereigntyScore >= 80` und `rawAdoption > 0`, dann
  `adoptionScore >= 50` (konfigurierbar).

Ziel: „Noch wenig verbreitet“ bleibt sichtbar, wirkt aber nicht wie „ungeeignet“.

### 2.3 Nichtlineare Dämpfung im unteren Bereich

Nutze für den unteren Bereich eine sanftere Kurve (z. B. sigmoid/softplus mapping),
statt linearer Kompression nach Max-Norm.

---

## Phase 3 — Rollenlogik (Maintainer/Contributor) neu justieren

### 3.1 Asymmetrische Rollenbehandlung bei Low-Coverage

Führe einen **Low-Coverage-Modifier** ein:

- `maintainer`: leichter positiver Lift (z. B. +10–20 % auf direkten Beitrag)
- `contributor`: neutral bis leicht positiv (z. B. +0–10 %)
- `consumer`: unverändert

Wichtig: Modifier nur aktivieren, wenn `directCoverage` unter Schwellwert liegt,
damit große Ökosysteme nicht künstlich verzerrt werden.

### 3.2 Rollen-Gewichte in Konfiguration überführen

Erweitere die Konfiguration um z. B.:

- `LOW_COVERAGE_THRESHOLD`
- `MAINTAINER_LOW_COVERAGE_BOOST`
- `CONTRIBUTOR_LOW_COVERAGE_BOOST`

Damit sind spätere Feineinstellungen ohne Formelumbau möglich.

### 3.3 Guardrails gegen Überkorrektur

- Maximaler Rollen-Boost pro Item gedeckelt (z. B. +12 absolute Scorepunkte).
- Keine Boost-Kaskade über transitive Dependencies.

---

## Phase 4 — Produktdarstellung & Kommunikation

### 4.1 Adoption semantisch umbenennen (optional)

Falls Missverständnisse bleiben: Label von „Adoption“ auf
**„Ökosystem-Präsenz“** ändern.

### 4.2 Tooltip-/Detail-Erklärung ergänzen

Klartext im UI:

- „Niedriger Präsenz-Score bedeutet nicht automatisch geringe Eignung.“
- „Maintainer-/Contributor-Rollen werden als aktive Gestaltungsfähigkeit berücksichtigt.“

### 4.3 Entscheidungshilfe statt Einzahl-Zwang

In Detailansicht explizit drei Bausteine zeigen:

- Souveränität
- Souveräne Adoption
- Ökosystem-Präsenz (inkl. Rollenbeitrag)

So wird sichtbar, *warum* ein Item wie bewertet wird.

---

## Konkrete Implementierungs-Backlog-Items

1. **Config erweitern** (`src/config/adoptionScoringWeights.mjs`)
   - neue Anchors/Boost-Parameter.
2. **Scoring-Utility anpassen** (`src/utils/adoptionScore.ts`)
   - robuste Normalisierung, Low-Coverage-Modifier, Floors.
3. **Tests ausbauen** (`src/utils/__tests__/adoptionScore.test.ts`)
   - neue Fälle für „High Sovereignty + low usage“,
     `maintainer`/`contributor` bei schwacher Verbreitung.
4. **Schema/Docs aktualisieren** (`docs/ITEM_METRICS_SCHEMA.md`)
   - neue Formelbestandteile und Interpretationshinweise.
5. **UI-Texte nachziehen** (i18n + Tooltip)
   - Missinterpretation „nicht verwenden“ vermeiden.

---

## Akzeptanzkriterien

- Ein Item mit sehr hoher Souveränität und geringer Nutzung fällt **nicht mehr
  unverhältnismäßig tief**.
- `maintainer` wirkt bei schwachen Dep-/Nutzungswerten **messbar aufwertend**.
- `contributor` wirkt in denselben Fällen **neutral bis leicht positiv**.
- Score-Herleitung ist pro Item in Debugdaten und UI nachvollziehbar.
- Bestehende Rankings bleiben für klar dominierende Items stabil (keine
  unkontrollierte Rangfolge-Inversion).

---

## Rollout-Strategie

1. Hinter Feature-Flag implementieren (`ADOPTION_CALIBRATION_V2`).
2. A/B-Vergleich alter vs. neuer Score auf gesamtem Katalog.
3. Review mit 10–15 repräsentativen Items (inkl. KoliBri-Fall).
4. Nach Freigabe Flag default-on, alte Formel für einen Releasezyklus parallel
   berechenbar halten (Regression-Check).

