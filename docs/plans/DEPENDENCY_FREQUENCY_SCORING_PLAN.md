# Umsetzungsplan: Stack-Häufigkeit als Scoring-Signal

> Status: **draft** · Erstellt: 2026-04-19

## Kontext

Heute ergibt sich der Sovereignty-Score eines Items ausschließlich aus
intrinsischen Eigenschaften (9 Kriterien + Owner-Bonus, Summe 0–100, siehe
`src/utils/sovereigntyScore.ts`). Wie oft ein Item tatsächlich in den
22 kuratierten Stacks auftaucht, fließt nirgends ein — obwohl genau diese
Konvergenz ein starkes Signal dafür ist, dass ein Baustein Teil einer
gemeinsamen, souveränen Grundinfrastruktur geworden ist.

Wunsch: *"häufige Relation ⇒ besserer Score"*. Ziel des Plans ist, dieses
Signal sauber ins Metrik-System zu bringen, **ohne** den Sovereignty-Score
zu verwässern.

## Bewertung der Idee (Kurz-Verdict)

**Gute Idee, aber am falschen Platz.** Direktes Addieren in den
Sovereignty-Score würde ubiquitäre, nicht-souveräne Werkzeuge bevorteilen und
die Aussagekraft der 6-Kategorien-Skala (`getScoreCategory`) brechen. Besser:
**separate Kennzahl** (`adoptionScore`, 0–100), die neben dem Sovereignty-Score
geführt wird — plus ein kombinierter `overallScore` für Default-Sortierung
und Anzeige.

### Empfohlene Verbesserungen gegenüber dem Roh-Vorschlag

1. **Eigene Metrik, nicht additiv** — "Adoption Score" / "Ecosystem Reliance"
   parallel zum Sovereignty-Score, keine Vermischung.
2. **Nicht-lineare Kurve (`log1p`)** — bei nur 22 Stacks macht ein linearer
   Zähler die Spitze zu dominant; 1→10 Relationen soll sichtbar, 10→20
   gedämpft sein.
3. **Rolle & Status gewichten** — `maintainer`/`recommended` zählt mehr als
   `consumer`/`deprecated`.
4. **Stack-Größen-Dämpfung** — Germany (~380 Items) vs. EBSI (~19) darf nicht
   1:1 eingehen; log-Dämpfung.
5. **Transitive Abhängigkeiten (1 Hop)** — Items, die Voraussetzung weit
   verbreiteter Items sind, bekommen anteilig Kredit (γ = 0,3).
6. **Länder-Diversität als Multiplikator** — 10× Deutschland ≠ 10× über
   Europa (Simpson-Index über `stack.country`, bei 17/22 Stacks gesetzt;
   Fallback-Bucket `_unknown`, nicht deaktivieren).
7. **Souveränitäts-gegatete Zweitzahl** `sovereignAdoptionScore` — gleiche
   Formel, aber nur Beiträge aus Stacks/Items mit Sovereignty ≥ 61 ("good").
   Das ist die eigentlich interessante Zahl.
8. **Neuer kombinierter Default-Score `overallScore`** — Sovereignty-Score
   bleibt intrinsisch unverändert, aber die Oberfläche sortiert/rankt
   standardmäßig nach einer transparenten Kombination. Einzelscores bleiben
   sichtbar und als Sort-Option verfügbar.
9. **Single Source of Truth** — Berechnung in `scripts/generate-data.mjs`
   beim Build, Ergebnisse in `items.generated.ts` einfrieren. Keine
   Runtime-Neuberechnung, kein doppelter Implementierungspfad.

## Formel (Pseudocode)

```
ROLE_W   = { maintainer: 1.0, contributor: 0.8, funder: 0.4, consumer: 0.5 }
STATUS_W = { recommended: 1.0, approved: 0.7, deprecated: 0.1 }
SIZE_DAMP(stack) = 1 / (1 + log10(stack.items.length / 20))

directCoverage(item) =
  Σ über Stacks S, die item enthalten:
      ROLE_W[si.role] * STATUS_W[si.status] * SIZE_DAMP(S)

transitiveCoverage(item) =
  Σ über X ∈ REVERSE_DEPENDENCIES[item]:
      0.3 * directCoverage(X)          // nur 1 Hop, γ = 0,3

diversity(item) = 1 - Σ p_c²            // Simpson-Index über stack.country
                                        // fehlendes country ⇒ Bucket "_unknown"

rawAdoption = log1p(directCoverage + transitiveCoverage)
            * (0.6 + 0.4 * diversity)

adoptionScore(item) = round(100 * rawAdoption / max(rawAdoption über alle Items))

// Zweitzahl:
sovereignAdoptionScore = gleiche Formel, aber nur Stacks S mit
    avgSovereignty(S) ≥ 61 UND sovereigntyScore(item) ≥ 61.

// Default-Score (Anzeige/Sortierung):
overallScore(item) = round(
      0.60 * sovereigntyScore(item)
    + 0.25 * sovereignAdoptionScore(item)
    + 0.15 * adoptionScore(item)
)
```

Alle Konstanten (`ROLE_W`, `STATUS_W`, γ, 0.6/0.4, Schwelle 61, Overall-
Gewichte 60/25/15) als benannte Konstanten mit Kommentar, damit sie
dokumentiert justierbar sind.

## Betroffene Dateien

### Code

- `src/types/index.ts` — neues Interface `AdoptionResult` (`score`,
  `sovereignScore`, `directCoverage`, `transitiveCoverage`, `diversity`,
  `usedInStacks: string[]`); `Item` bekommt optional
  `adoption?: AdoptionResult` und `overallScore?: number`.
- `src/utils/adoptionScore.ts` **(neu)** — reine Funktion
  `computeAdoptionScores(items, stacks, reverseDeps)` →
  `Map<itemId, AdoptionResult>`. Konstanten zentral.
- `src/utils/overallScore.ts` **(neu)** — `computeOverallScore({ sovereignty,
  sovereignAdoption, adoption })`; Gewichte (0.60 / 0.25 / 0.15) als
  benannte Konstanten.
- `scripts/generate-data.mjs` — nach Aufbau von `REVERSE_DEPENDENCIES`
  `computeAdoptionScores` aufrufen, `overallScore` berechnen, Werte in die
  generierten Items schreiben. Import via tsx/esbuild-Loader sicherstellen,
  um eine Single Source of Truth zu gewährleisten und Code-Duplikation
  zu vermeiden.
- `src/hooks/useStackMetrics.ts` — `avgAdoption`, `adoptionDistribution`,
  `avgOverall` lesen (keine Neuberechnung).
- `src/utils/sovereigntyScore.ts` — **unverändert** (bewusste Entscheidung).
- UI — drei Pills: `overall` (primär, Default-Sort), `sovereignty`,
  `adoption` (Tooltip zeigt `usedInStacks` + `sovereignAdoptionScore`).
  Listen/Tabellen sortieren per Default nach `overallScore`; bestehende
  Sortier-Option "Sovereignty" bleibt erhalten, neue Optionen
  "Adoption" und "Sovereign Adoption".

### Konzepte / Dokumentation (Pflicht-Updates)

- `docs/ITEM_METRICS_SCHEMA.md` — Abschnitte `adoption`, `sovereignAdoption`,
  `overall` (Felder, Formel, Wertebereich, Beziehung zum Sovereignty-Score).
- `docs/SCORING_SCALE_DESIGN.md` — neue Abschnitte *"Adoption Score
  (unabhängige Metrik)"* und *"Overall Score (Default-Ranking)"*. Nachweis,
  dass die 6-Kategorien-Skala für `overallScore` gültig bleibt (alle
  Summanden sind auf 0–100 normiert).
- `docs/SCORING_REFACTORING_PLAN.md` — Entscheidung "Single Source of Truth
  in `adoptionScore.ts`" dokumentieren; Snapshot-Test erwähnen.
- `docs/ARC42.md` §6 *Querschnittliche Konzepte* — Unterabschnitt
  *"Netzwerkeffekte / Stack-Konvergenz"*.
- `docs/README.md` — Einzeiler im Metrik-Überblick.
- `docs/BUSSINESS_CASE.md` — kurzer Absatz zur neuen Sichtbarkeit von
  Ökosystem-Konvergenz.
- `scripts/report-dependency-health.mjs` — neue Sektionen "Top 10 Adoption"
  und "Top 10 Sovereign Adoption".

## Verifikation

1. Unit-Tests `src/utils/__tests__/adoptionScore.test.ts`:
   - Item ohne Stack-Vorkommen ⇒ `adoptionScore === 0`.
   - Item nur als `deprecated/consumer` in 1 Stack ⇒ klein (< 10).
   - Item als `maintainer/recommended` in vielen Stacks ⇒ nahe 100.
   - Kontroll-Test: 19-Item-Stack und 380-Item-Stack liefern für dasselbe
     Item vergleichbare Beiträge (SIZE_DAMP wirkt).
2. Unit-Tests `src/utils/__tests__/overallScore.test.ts`:
   - Summe der Gewichte = 1.0, Ergebnis bleibt in [0, 100].
   - Randfälle (alle Eingaben 0 bzw. 100).
3. Snapshot-Test: `computeAdoptionScores` gegen Fixture des aktuellen
   Katalogs; CI bricht bei unabsichtlichem Drift.
4. Integritäts-Test: nach `generate-data.mjs` werden die in
   `items.generated.ts` gespeicherten Werte mit einer Laufzeit-Neuberechnung
   verglichen (erkennt Divergenz zwischen TS- und mjs-Implementierung,
   falls Spiegel-Datei gewählt).
5. Kategorien-Verteilung des Sovereignty-Scores vor/nach muss **identisch**
   sein. Für `overallScore` wird eine eigene Verteilungs-Baseline als
   Fixture abgelegt.
6. Manuelle Plausibilität via `scripts/report-dependency-health.mjs`:
   Erwartung auf den Top-Rängen (Adoption): Keycloak, PostgreSQL, Nginx,
   Linux Kernel, OpenID Connect. Kein proprietäres SaaS-Produkt darf die
   Spitze dominieren (sonst zurück zum Reißbrett beim Gating).
7. E2E (Playwright): Stack-Detailseite rendert alle drei Score-Pills,
   Tooltip listet Stacks.

## Nutzer-Entscheidungen (bereits geklärt)

- **Ausgelieferte Kennzahlen**: beide (`adoptionScore` +
  `sovereignAdoptionScore`), zusätzlich abgeleiteter `overallScore`.
- **Default-Sortierung**: neuer kombinierter `overallScore` mit Gewichtung
  0.60 Sovereignty / 0.25 Sovereign Adoption / 0.15 Adoption; Einzelscores
  bleiben sichtbar und als Sort-Optionen verfügbar.
- **Diversity-Multiplikator**: in v1 aktiv, Stacks ohne `country` landen im
  Bucket `_unknown` (Fallback, kein Deaktivieren). Follow-up: die fehlenden
  5 `country`-Felder nachpflegen.

## Nicht-Ziele (v1)

- Multi-Hop-Transitivität (> 1 Hop) — zu rauschig bei 171 Items / 22 Stacks.
- Adoption-Gewicht in den Sovereignty-Score einrechnen — explizit
  ausgeschlossen.
- Historische Zeitreihen / Trend-Signale — separates späteres Thema.
