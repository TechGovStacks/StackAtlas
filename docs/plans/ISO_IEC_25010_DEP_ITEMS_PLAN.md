# Plan: ISO/IEC 25010:2023 als Metrik für Dep-Items

## Zielbild

Die bestehenden Dep-Items in StackAtlas ("all items are dependencies") sollen neben dem bestehenden Sovereignty-Scoring ein **zweites, normbasiertes Qualitätsprofil** erhalten: ISO/IEC 25010:2023. Ergebnis ist ein transparentes, vergleichbares Qualitätsrating pro Item, pro Layer und optional pro Stack.

## Ausgangspunkt im Projekt

- Items sind bereits als Dependencies modelliert (`item.dependencies`).
- Es existiert ein 0–100-Scoring mit Kategorien für Souveränität.
- Das neue ISO-Profil ergänzt (nicht ersetzt) die aktuelle Logik und ermöglicht eine duale Betrachtung: **Souveränität + Softwarequalität**.

## 1) Scope und Bewertungsobjekte festlegen

### 1.1 Was wird bewertet?

Pro Dep-Item werden zwei Ebenen unterschieden:

1. **Produktqualität** (ISO/IEC 25010 Product Quality)
2. **Quality in Use** (nur wenn Nutzungssignale vorhanden sind)

### 1.2 Welche Items zuerst?

Pilotgruppe für schnelle Validierung:

- 10–20 häufig genutzte Items aus mehreren Layern (z. B. Infrastruktur, Plattform, Anwendungen)
- Mischung aus OSS, proprietär, Standard/Protokoll

## 2) ISO/IEC 25010-Merkmale in messbare Kriterien übersetzen

Für jedes ISO-Merkmal wird ein "Operationalisierungskatalog" erstellt:

- **Definition im StackAtlas-Kontext** (1 Satz)
- **Messbare Indikatoren** (2–6 je Merkmal)
- **Datenquelle** (Repo, Doku, CVE-Feed, Benchmarks, Audits, Issue-Tracker)
- **Skala** (0/25/50/75/100 oder kontinuierlich)
- **Evidenzanforderung** (URL, Datum, Prüfbarkeit)

## 3) Metrikmodell (gewichtetes Mehr-Ebenen-Modell)

### 3.1 Score-Struktur

- `iso25010.characteristics[<name>].score` (0–100)
- `iso25010.characteristics[<name>].confidence` (0–1)
- `iso25010.overallScore` (0–100)
- `iso25010.lastUpdated` (ISO-8601)
- `iso25010.evidence[]` (Quelle, Datum, Typ)

### 3.2 Gewichte definieren

Startvorschlag (anpassbar je Layer):

- Functional suitability: 15%
- Performance efficiency: 12%
- Compatibility: 10%
- Interaction capability (Usability): 10%
- Reliability: 14%
- Security: 16%
- Maintainability: 13%
- Flexibility/Portability: 10%

Regel: Gewichte müssen je Bewertungsprofil exakt 100% ergeben.

### 3.3 Unsicherheitslogik

- Fehlende Evidenz senkt nicht nur den Score, sondern auch `confidence`.
- Optional: konservativer Gesamtwert = `overallScore * confidence`.

## 4) Mapping zu bestehenden StackAtlas-Kriterien

Eine Mapping-Tabelle verhindert Doppelzählung und macht Unterschiede transparent:

- `hasAudit` → wirkt in ISO vor allem auf Security/Reliability
- `openStandards` → wirkt auf Compatibility
- `matureProject` → wirkt auf Reliability/Maintainability
- `dataPortability` + `selfHostable` → wirkt auf Flexibility/Portability

Ziel: Souveränität und ISO bleiben getrennte Dimensionen, können aber gemeinsam visualisiert werden.

## 5) Datenmodell erweitern (inkrementell, rückwärtskompatibel)

### 5.1 TypeScript-Typen

In `src/types/index.ts` neue optionale Struktur ergänzen:

- `iso25010?: Iso25010Assessment`
- Untertypen für Characteristics, Evidence, Confidence

### 5.2 Generierte Daten

- Eingabeformat in `data/items/*.json` erweitern (optional)
- `scripts/generate-data.mjs` passt validierend an
- `src/data/items.generated.ts` übernimmt Felder unverändert

## 6) Bewertungs-Pipeline bauen

### 6.1 Regel-Engine

Ein scorer-Modul rechnet:

1. Indikatorwerte je Merkmal
2. Merkmal-Score je ISO-Characteristic
3. Gewichteter Gesamt-ISO-Score
4. Confidence und Datenlückenhinweise

### 6.2 Auditierbarkeit

Jeder Teilscore muss nachvollziehbar sein:

- Formel
- Rohwert
- Quelle
- Zeitstempel

## 7) UI/UX-Integration

Minimaler Einstieg:

- Neuer Tab/Abschnitt pro Item: "ISO 25010"
- Radar- oder Balkendiagramm für 8 Merkmale
- Badge mit `overallScore` + Confidence-Hinweis
- Klare Trennung im UI: "Sovereignty" vs. "ISO Quality"

## 8) Governance und Betriebsmodell

### 8.1 Bewertungsrichtlinie

Leitdokument definieren:

- Welche Evidenz ist zulässig?
- Wie alt darf Evidenz sein (z. B. max. 12 Monate)?
- Wer darf Bewertungen ändern/reviewen?

### 8.2 Review-Prozess

- 4-Augen-Prinzip bei ISO-Score-Änderungen
- Changelog-Pflicht für Änderungen >5 Punkte in einem Merkmal

## 9) Rollout in 4 Phasen

### Phase A: Konzeption (1–2 Wochen)

- Merkmalskatalog, Gewichte, Evidenzschema festlegen
- Pilot-Items bestimmen

### Phase B: Technische Integration (1–2 Wochen)

- Typen, Datenpipeline, Scorer implementieren
- Feature-Flag für UI-Ausspielung

### Phase C: Pilot und Kalibrierung (2–3 Wochen)

- 10–20 Items bewerten
- Inter-Rater-Abgleich (mind. 2 Bewerter pro Item)
- Gewichte/Schwellen feinjustieren

### Phase D: Produktivbetrieb (laufend)

- Rollout auf alle Items
- Quartalsweise Re-Scoring-Runde
- KPI-Monitoring (Datenabdeckung, Confidence, Änderungsrate)

## 10) Konkrete Deliverables

1. `docs/ISO25010_METRIC_MODEL.md` (Norm-Mapping + Bewertungsregeln)
2. `docs/ISO25010_RATING_GUIDELINE.md` (Reviewer-Handbuch)
3. Typ-Erweiterung in `src/types/index.ts`
4. Scorer-Modul in `src/utils/` (z. B. `iso25010Score.ts`)
5. Validierung in Datengenerator
6. UI-Darstellung inkl. Evidenz-Links

## 11) Risiken und Gegenmaßnahmen

- **Risiko:** Hoher manueller Aufwand bei Evidenzsammlung  
  **Maßnahme:** Teilautomatisierung (GitHub API, Release-Cadence, Security-Advisories)
- **Risiko:** Subjektive Bewertungen  
  **Maßnahme:** Bewertungsrubrik + Doppelreview + Confidence
- **Risiko:** Verwechslung mit Sovereignty-Score  
  **Maßnahme:** Strikte Modelltrennung + getrennte Visualisierung

## 12) Erfolgskriterien (Definition of Done)

- Mindestens 80% der Pilot-Items haben vollständige ISO-Profile (8/8 Merkmale).
- Für 100% der ISO-Teilscores existiert nachvollziehbare Evidenz.
- Reviewer-Übereinstimmung (Inter-Rater) liegt bei >= 0.75.
- UI zeigt pro Item beide Dimensionen getrennt und verständlich.
- Dokumentation und Datenmodell sind konsistent und versioniert.
