# Umsetzungsplan: Popularitätsmetriken für Software-Dependencies

**Status:** Entwurf  
**Erstellt:** 2026-04-20  
**Branch:** `claude/add-popularity-metrics-aLAxO`  
**Scope:** Optionale Popularitätssignale (Stars, Downloads/Woche) in das Scoring-System integrieren

---

## 1. Motivation / Problemstellung

Das aktuelle Scoring-System bewertet Items anhand von zwei unabhängigen Dimensionen:

- **Sovereignty Score** (intrinsische Qualität: Offenheit, Auditierung, Selbstbetreibbarkeit)
- **Adoption Score** (Stack-Häufigkeit: wie oft taucht das Item in kuratierten Stacks auf)

Beide Signale basieren ausschließlich auf redaktionell kuratierten Daten (Sovereignty Criteria, Stack-Einträge). Sie spiegeln **keine externen Ökosystem-Signale** wider, die die praktische Relevanz eines Tools außerhalb der kuratierten Stacks belegen.

Fehlende externe Signale führen zu Lücken:

1. Ein weit verbreitetes Open-Source-Tool mit hunderttausenden Nutzern, das noch nicht in einem Stack eingetragen ist, hat denselben Adoption Score wie ein gänzlich unbekanntes Projekt.
2. Das binäre `largeEcosystem`-Kriterium (+5 Punkte im Sovereignty Score) ist zu grob — es unterscheidet nicht zwischen 1.000 und 1.000.000 GitHub-Stars.
3. Kuratierungsaufwand: Maintainer müssen manuell alle relevanten Tools in Stacks eintragen, bevor der Adoption Score steigt.

**Lösung:** Optionale `popularityMetrics` als eigenständige, transparent ausgewiesene Dimension, die mit niedrigem Gewicht in den Overall Score einfliesst — nur wenn explizit gepflegte Daten vorhanden sind.

---

## 2. Design-Ziele & Nicht-Ziele

### Ziele

- Externe Popularität (GitHub Stars, npm/Docker/PyPI Downloads pro Woche) als optionale Ergänzung zum Adoption Score erfassen.
- Logarithmische Normalisierung, damit keine einzelne Plattform dominiert.
- Popularität beeinflusst den **Overall Score nur moderat** (max. 5 Prozentpunkte Einfluss).
- Das Feature ist **vollständig optional**: Fehlen die Daten, ändert sich das bisherige Scoring nicht.
- Alle Popularitätsdaten sind **transparent** im UI sichtbar und separat von Sovereignty/Adoption ausgewiesen.
- Timestamps für die Popularitätsdaten (`updatedAt`) ermöglichen Aktualitätsbewertung.

### Nicht-Ziele

- Kein automatisches Fetching der Popularitätsdaten zur Build-Zeit (kein GitHub/npm API-Call im Build-Skript). Daten werden **manuell** oder via separatem Daten-Update-Skript gepflegt.
- Keine Änderung des Sovereignty Score durch Popularität.
- Kein Ersetzen des binären `largeEcosystem`-Kriteriums (es bleibt bestehen, da Rückwärtskompatibilität gefordert).
- Popularität kann den Score **nur erhöhen, nicht senken** (kein negativer Popularity-Faktor).
- Keine Echtzeit-Daten; die Aktualität liegt in der Verantwortung der Datenpfleger.

---

## 3. Datenmodell-Änderungen

### 3.1 Neues optionales Feld `popularityMetrics` im Item

**Datei:** `data/schemas/item.schema.json`

```json
"popularityMetrics": {
  "type": "object",
  "description": "Optional external popularity signals for scoring (manually curated)",
  "additionalProperties": false,
  "required": ["updatedAt"],
  "properties": {
    "updatedAt": {
      "type": "string",
      "description": "ISO 8601 date when metrics were last updated (YYYY-MM-DD)",
      "format": "date"
    },
    "githubStars": {
      "type": "integer",
      "description": "GitHub star count at time of updatedAt",
      "minimum": 0
    },
    "npmWeeklyDownloads": {
      "type": "integer",
      "description": "npm weekly download count at time of updatedAt",
      "minimum": 0
    },
    "dockerWeeklyPulls": {
      "type": "integer",
      "description": "Docker Hub weekly pull count at time of updatedAt",
      "minimum": 0
    },
    "pypiWeeklyDownloads": {
      "type": "integer",
      "description": "PyPI weekly download count at time of updatedAt",
      "minimum": 0
    }
  }
}
```

**Hinweis zu `github.stars`:** Das bestehende Feld `github.stars` wird als **deprecated** markiert (`@deprecated` in Schema-Description und TypeScript-Typ). Es bleibt aus Rückwärtskompatibilität lesbar, fließt aber **nicht** ins Scoring ein. `popularityMetrics.githubStars` ist die alleinige Source of Truth für Scoring-Zwecke. Das Build-Skript priorisiert `popularityMetrics.githubStars` und ignoriert `github.stars` bei der Score-Berechnung. Ein Migrations-Skript (Phase 4) überträgt bestehende `github.stars`-Werte nach `popularityMetrics.githubStars`.

### 3.2 Neuer Typ `PopularityMetrics`

**Datei:** `src/types/index.ts`

```typescript
export type PopularityMetrics = {
	/** ISO 8601 date when metrics were last updated — required for ageFactor calculation */
	updatedAt: string;
	/** GitHub star count */
	githubStars?: number;
	/** npm weekly download count */
	npmWeeklyDownloads?: number;
	/** Docker Hub weekly pull count */
	dockerWeeklyPulls?: number;
	/** PyPI weekly download count */
	pypiWeeklyDownloads?: number;
};
```

Erweiterung von `Item`:

```typescript
export type Item = {
	// ... existing fields ...
	popularityMetrics?: PopularityMetrics;
	// Computed (nicht im JSON, gesetzt durch generate-data.mjs):
	popularityScore?: number; // 0-100, only if popularityMetrics present
};
```

### 3.3 Erweiterung von `AdoptionResult`

**Datei:** `src/types/index.ts`

```typescript
export type AdoptionResult = {
	// ... existing fields ...
	/** Popularity score (0-100): normalized log-scale from external signals. Undefined if no data. */
	popularityScore?: number;
};
```

---

## 4. Algorithmus / Scoring-Konzept

### 4.1 Popularity Score Berechnung

Der Popularity Score wird aus den vorhandenen optionalen Signalen zusammengesetzt und logarithmisch normalisiert.

#### Schritt 1: Rohwerte mit Plattform-Gewichten kombinieren

Verschiedene Plattformen haben unterschiedliche Reichweiten und Skalen. Um Vergleichbarkeit herzustellen, werden Plattform-spezifische Referenzwerte (`REF`) definiert, bei denen ein Item als "sehr popular" gilt (entspricht 100 normalisierten Punkten):

| Signal                | Referenzwert (`REF`) | Begründung                                                 |
| --------------------- | -------------------- | ---------------------------------------------------------- |
| `githubStars`         | 50.000               | Top-Tier OSS-Projekte (Kubernetes: ~110k, Nextcloud: ~28k) |
| `npmWeeklyDownloads`  | 5.000.000            | Sehr populäre npm-Pakete (react: ~50M, express: ~35M)      |
| `dockerWeeklyPulls`   | 1.000.000            | Top-Docker-Images (nginx: ~10M, postgres: ~5M)             |
| `pypiWeeklyDownloads` | 5.000.000            | Populäre Python-Pakete (requests: ~100M)                   |

#### Schritt 2: Log-Normalisierung je Signal

```typescript
function normalizeSignal(value: number, ref: number): number {
	// log1p-Normalisierung, capped at 1.0
	// Ergibt 0.0 bei value=0, 0.5 bei value≈ref/10, 1.0 bei value≥ref
	return Math.min(1.0, Math.log1p(value) / Math.log1p(ref));
}
```

Beispiele für `githubStars` (REF=50.000):
| Stars | Normalisierter Wert |
|-------|---------------------|
| 0 | 0.00 |
| 500 | 0.29 |
| 5.000 | 0.58 |
| 50.000 | 1.00 |
| 500.000 | 1.00 (gekappt) |

#### Schritt 3: Plattform-Signale kombinieren (Maximum, nicht Summe)

Um Doppelzählung zu vermeiden (ein Tool, das auf npm und Docker präsent ist, soll nicht doppelt belohnt werden), wird das **Maximum** der normalisierten Plattform-Signale verwendet:

```typescript
function computeRawPopularityScore(metrics: PopularityMetrics): number {
	const signals: number[] = [];

	if (metrics.githubStars !== undefined) signals.push(normalizeSignal(metrics.githubStars, 50_000));
	if (metrics.npmWeeklyDownloads !== undefined) signals.push(normalizeSignal(metrics.npmWeeklyDownloads, 5_000_000));
	if (metrics.dockerWeeklyPulls !== undefined) signals.push(normalizeSignal(metrics.dockerWeeklyPulls, 1_000_000));
	if (metrics.pypiWeeklyDownloads !== undefined) signals.push(normalizeSignal(metrics.pypiWeeklyDownloads, 5_000_000));

	if (signals.length === 0) return 0;

	// Primär: Maximum des stärksten Signals
	// Sekundär: kleiner Bonus für Multisignal-Präsenz (cross-platform)
	const maxSignal = Math.max(...signals);
	const multiPlatformBonus = Math.max(0, Math.min(0.1, (signals.filter((s) => s > 0).length - 1) * 0.05));

	return Math.min(1.0, maxSignal + multiPlatformBonus);
}
```

#### Schritt 4: Datenfreshe-Abzug (optional, Phase 2)

Veraltete Daten (> 12 Monate) sollten ein geringeres Gewicht haben:

```typescript
function ageFactor(updatedAt?: string): number {
	if (!updatedAt) return 0.8; // Unbekanntes Alter → konservativ
	const ageMonths = monthsSince(updatedAt);
	if (ageMonths <= 6) return 1.0;
	if (ageMonths <= 12) return 0.9;
	if (ageMonths <= 24) return 0.7;
	return 0.5; // Sehr alte Daten haben halbes Gewicht
}
```

#### Schritt 5: Popularity Score als Integer 0-100

```typescript
export function computePopularityScore(metrics: PopularityMetrics): number {
	const raw = computeRawPopularityScore(metrics);
	const age = ageFactor(metrics.updatedAt);
	return Math.round(raw * age * 100);
}
```

### 4.2 Integration in den Overall Score

#### Designprinzip: Popularity als optionale Ergänzung des Adoption-Signals

Popularität ist konzeptuell dem Adoption Score verwandt (beide messen externe Verbreitung), unterscheidet sich aber durch:

- Adoption Score = kuratierte Stack-Präsenz (qualitativ, kontrolliert)
- Popularity Score = externe Markt-Signale (quantitativ, roh)

Daher wird Popularity in das Adoption-Segment des Overall Score integriert — als optionaler Blending-Faktor:

#### Wenn popularityMetrics vorhanden:

```
blendedAdoption = 0.7 × adoptionScore + 0.3 × popularityScore

overallScore = round(
  0.60 × sovereigntyScore
  + 0.25 × sovereignAdoptionScore
  + 0.15 × blendedAdoption           // ← Popularity eingeblendet
)
```

Mathematische Auswirkung auf den Overall Score:

```
Δ(Overall) = 0.15 × 0.30 × (popularityScore - adoptionScore)
           = 0.045 × (popularityScore - adoptionScore)
```

→ **Maximaler Einfluss von Popularität auf den Overall Score: ±4,5 Punkte**  
→ Bei gleich hohem Popularity und Adoption Score: keine Änderung  
→ Bei fehlendem popularityMetrics: exakt identisch mit bisheriger Formel

#### Wenn popularityMetrics fehlen (Standard-Fallback):

```
overallScore = round(
  0.60 × sovereigntyScore
  + 0.25 × sovereignAdoptionScore
  + 0.15 × adoptionScore            // Unverändert wie bisher
)
```

### 4.3 Neue Konstanten

**Datei:** `src/config/adoptionScoringWeights.mjs` (Erweiterung)

```javascript
// Popularity blending
export const POPULARITY_ADOPTION_BLEND = 0.3; // 30% Popularity in Adoption-Blending
export const POPULARITY_ADOPTION_WEIGHT = 0.7; // 70% bisheriger Adoption Score

// Platform-Referenzwerte für log-Normalisierung
export const POPULARITY_REF_GITHUB_STARS = 50_000;
export const POPULARITY_REF_NPM_WEEKLY = 5_000_000;
export const POPULARITY_REF_DOCKER_WEEKLY = 1_000_000;
export const POPULARITY_REF_PYPI_WEEKLY = 5_000_000;
```

---

## 5. Implementierungsschritte

### Phase 1: Datenmodell & Schema (ohne Scoring-Änderung)

1. **Schema erweitern** — `data/schemas/item.schema.json`: `popularityMetrics`-Objekt hinzufügen (optional, additionalProperties: false)
2. **TypeScript-Typen** — `src/types/index.ts`: `PopularityMetrics`-Typ + Item-Erweiterung + AdoptionResult-Erweiterung
3. **Schema-Validierung** testen — `pnpm validate-schemas` muss weiterhin grün sein
4. **3-5 Beispiel-Items** mit `popularityMetrics` befüllen (z.B. Kubernetes, Nextcloud, nginx) zur Verifikation

### Phase 2: Scoring-Logik

5. **Neue Utility-Datei** `src/utils/popularityScore.ts` erstellen mit:
   - `normalizeSignal(value, ref): number`
   - `computeRawPopularityScore(metrics): number`
   - `ageFactor(updatedAt?): number`
   - `computePopularityScore(metrics): number`
6. **Konstanten** in `src/config/adoptionScoringWeights.mjs` ergänzen (Schritt 4.3)
7. **`src/utils/overallScore.ts` anpassen** — Optional Blending wenn `popularityScore` vorhanden:
   ```typescript
   export function computeOverallScore(
     sovereigntyScore: number,
     sovereignAdoptionScore: number,
     adoptionScore: number,
     popularityScore?: number,
   ): number { ... }
   ```
8. **Unit-Tests** für `popularityScore.ts` unter `src/utils/__tests__/popularityScore.test.ts`
9. **`scripts/generate-data.mjs` erweitern** — `popularityScore` pro Item berechnen und in `AdoptionResult` schreiben

### Phase 3: UI-Integration

10. **Item-Card / Detail-Drawer** — `popularityScore` anzeigen wenn vorhanden (eigene Pill/Badge: "Popularität")
11. **Sortieroptionen** — "Popularität" als optionale Sortierung hinzufügen (FilterBar.tsx)
12. **Tooltip** — Erklärungstext zu `popularityMetrics` und ihrem Einfluss auf den Score
13. **i18n** — Neue Labels in allen 8 Sprachen (`de`, `en`, `fr`, `it`, `es`, `da`, `no`, `sv`)

### Phase 4: Daten-Backfill

14. **Hilfsskript** `scripts/backfill-popularity-metrics.mjs` — Optional: fetcht aktuelle Werte aus GitHub API / npm Registry für alle Items mit `github.repo` oder npm-Bezeichner
15. **Batch-Update** der wichtigsten 20-30 Items mit echten Popularitätsdaten

---

## 6. Dokumentations-Updates

| Dokument                                | Art der Änderung                                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `docs/ITEM_METRICS_SCHEMA.md`           | Neuer Abschnitt „Popularity Metrics" mit Schema-Referenz, Normalisierungsformel, Referenzwerten         |
| `docs/SCORING_SCALE_DESIGN.md`          | Abschnitt „Overall Score" aktualisieren: blendedAdoption-Formel, Max-Einfluss ±4,5 Punkte dokumentieren |
| `docs/ARC42.md`                         | Kapitel Datenmodell und Scoring-Pipeline um `popularityMetrics` erweitern                               |
| `data/schemas/item.schema.json`         | Inline-Descriptions (erfolgt in Schritt 1)                                                              |
| `src/config/adoptionScoringWeights.mjs` | JSDoc für neue Konstanten                                                                               |

---

## 7. Risiken & Mitigationen

| Risiko                                                                   | Wahrscheinlichkeit | Mitigation                                                                                                      |
| ------------------------------------------------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Popularitätsverzerrung zugunsten US-dominierter Ökosysteme (npm, GitHub) | Mittel             | Maximaler Einfluss auf ±4,5 Punkte begrenzt; Sovereignty bleibt bei 60%                                         |
| Veraltete Daten verfälschen Score                                        | Mittel             | `ageFactor`-Abzug; `updatedAt`-Pflichtfeld für Transparenz; UI-Badge für alte Daten                             |
| Proprietäre Tools mit hoher Popularity bevorzugt                         | Niedrig            | Popularity beeinflusst nur Adoption-Segment (15%); Sovereignty (60%) dominiert weiterhin                        |
| Kuration aufwändig ohne Automation                                       | Hoch               | Optionales Backfill-Skript (Phase 4); Feature ist explizit optional — Daten müssen nicht sofort gepflegt werden |
| Score-Volatilität bei häufig aktualisierten Daten                        | Niedrig            | Scores werden nur bei `generate-data`-Build neu berechnet, nicht live                                           |

---

## 8. Offene Fragen

1. **Blending-Koeffizient final?** — 0.30 Popularity in Adoption-Blending als Startwert; sollte nach ersten echten Daten kalibriert werden.
2. **Datenfreshe-Phase 1 oder 2?** — `ageFactor` kann für Phase 1 vereinfacht werden (nur Warnung im UI wenn > 12 Monate alt, kein Score-Abzug).
3. **GitHub stars vs. `github.stars`** — Soll `github.stars` deprecated und durch `popularityMetrics.githubStars` ersetzt werden, oder beide parallel führen?
4. **Automatisches Fetching** — Langfristig sinnvoll als CI-Job, aber Out-of-Scope für diesen Plan. Separate Issue/Plan für Automation erforderlich.
5. **Plattform-Erweiterbarkeit** — Sourcehut, Codeberg, Gitea-Instanzen als Alternative zu GitHub? Für EU-Kontext relevant.

---

## Referenzen

- `src/utils/adoptionScore.ts` — Bestehende Adoption-Logik (Vorlage für Popularity Score)
- `src/utils/overallScore.ts` — Integration point für blendedAdoption
- `src/config/adoptionScoringWeights.mjs` — Konstanten-Quelle
- `data/schemas/item.schema.json` — Schema-Basis
- `src/types/index.ts` — Typ-Definitionen
- `docs/SCORING_SCALE_DESIGN.md` — Scoring-Psychologie und Gewichtungs-Rationale
- `docs/ITEM_METRICS_SCHEMA.md` — Metrics-Schema-Dokumentation
