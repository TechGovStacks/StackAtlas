# Evaluierungskonzept für einen item-spezifischen Souveränitätsscore

## 1. Ziel und Anwendungsbereich

Dieses Konzept beschreibt eine **neutrale, objektive und reproduzierbare** Bewertung einzelner Technologie-Items. Ergebnis ist ein numerischer **Souveränitätsscore (0–100)** pro Item.

Das Verfahren ist so ausgelegt, dass alle Items innerhalb desselben Layers und Sub-Layers:

- nach denselben Regeln bewertet werden,
- mit gleichartigen Quellen geprüft werden,
- und mit identischer Gewichtungslogik verglichen werden.

## 2. Bewertungsprinzipien

1. **Gleichbehandlung:** identischer Kriterienkatalog und identische Gewichtung pro Layer/Sub-Layer.
2. **Quellenparität:** pro Kriterium werden immer die gleichen Quellenarten verwendet.
3. **Evidenzpflicht:** jeder Einzelwert muss durch dokumentierte Quellen belegbar sein.
4. **Zeitstempelung:** jede Bewertung erhält ein Bewertungsdatum und ein Revalidierungsdatum.
5. **Vier-Augen-Prinzip:** bei strittigen Fällen erfolgt eine Zweitbewertung.

## 3. Standardisierte Quellenklassen (verpflichtend)

Für jedes Item werden – soweit verfügbar – **dieselben Quellenklassen** erhoben und dokumentiert:

- **Q1: Hersteller-/Projektquellen** (offizielle Doku, Security-Policies, Roadmaps, Governance-Dokumente)
- **Q2: Code- und Entwicklungsquellen** (Repository, Release-Historie, Issue-Tracker, Maintainer-Struktur)
- **Q3: Rechts-/Compliance-Quellen** (Lizenztexte, DPA/AVV, Hosting- und Datenverarbeitungsangaben)
- **Q4: Sicherheitsquellen** (CVE/NVD, Advisories, SBOM/Signierung, Security-Response-Prozesse)
- **Q5: Unabhängige Drittquellen** (Audit-Berichte, Branchenanalysen, wissenschaftliche Quellen)
- **Q6: Betriebs-/Marktquellen** (SLA/Supportmodell, Anbieterstruktur, Exit-/Migrationsoptionen)

### Quellenregeln zur Objektivität

- Pro Kriterium müssen **mindestens 2 Quellenklassen** genutzt werden.
- Mindestens **eine unabhängige Drittquelle (Q5)** muss je Item enthalten sein.
- Quellen dürfen maximal **12 Monate alt** sein (Ausnahme: unveränderte Lizenz-/Governance-Dokumente).
- Aussagen ohne Primärquelle werden als „nicht nachgewiesen“ gewertet.

## 4. Bewertungskriterienkatalog mit Gewichtung

Skala pro Kriterium: **0 bis 5 Punkte**

- 0 = nicht erfüllt / keine Evidenz
- 1 = sehr schwach
- 2 = schwach
- 3 = teilweise erfüllt
- 4 = gut erfüllt
- 5 = sehr gut erfüllt

Gesamtgewichtung (100 %):

| Nr. | Kriterium | Gewicht | Bewertungsfokus |
|---|---|---:|---|
| K1 | Rechtliche Souveränität | 15 % | Lizenzmodell, Nutzungsrechte, Vertragsklarheit, Lock-in-reduzierende Rechte |
| K2 | Datenhoheit & Datenportabilität | 20 % | Exportformate, API-Zugriff, Datenlokation, Lösch-/Mitnahmefähigkeit |
| K3 | Technologische Offenheit & Interoperabilität | 15 % | Offene Standards, offene Schnittstellen, Integrationsfähigkeit |
| K4 | Governance & Anbieterunabhängigkeit | 15 % | Eigentümerstruktur, Community-/Stiftungsmodell, Entscheidungsprozesse |
| K5 | Sicherheits- und Lieferketten-Souveränität | 15 % | Vulnerability-Management, Signierung, SBOM, Incident-Reaktion |
| K6 | Betriebsautonomie & Exit-Fähigkeit | 10 % | Self-Hosting-Option, Migrationsaufwand, Betriebswissen, Multi-Provider |
| K7 | Transparenz & Nachvollziehbarkeit | 10 % | Dokumentationsqualität, Änderungsprotokolle, Offenlegung relevanter Kennzahlen |

## 5. Bewertungslogik und Berechnung

### 5.1 Einzelkriterium

Für jedes Kriterium Ki wird ein Punktwert zwischen 0 und 5 vergeben.

### 5.2 Gewichteter Gesamtscore

Formel:

**Souveränitätsscore = Σ( (Punkte_Ki / 5) × Gewicht_Ki )**

Da die Gewichte 100 % ergeben, liegt der Endwert automatisch bei **0–100**.

### 5.3 Mindestanforderungen (Guardrails)

Um „Scheinsouveränität“ zu verhindern:

- Wenn **K2 < 2**, dann maximaler Gesamtscore = 49.
- Wenn **K5 < 2**, dann maximaler Gesamtscore = 49.
- Wenn für mehr als 2 Kriterien keine ausreichende Evidenz vorliegt, Status = „nicht bewertbar“.

## 6. Prozessmodell für neutrale und gleichberechtigte Bewertung

1. **Item-Klassifizierung:** Layer/Sub-Layer festlegen.
2. **Quellen-Collection nach Q1–Q6:** je Kriterium strukturierte Evidenz sammeln.
3. **Scoring Runde 1 (Analyst A):** Kriterien einzeln bewerten, Evidenzen verlinken.
4. **Scoring Runde 2 (Analyst B):** Blind-Review derselben Evidenzen.
5. **Abgleich:** bei Abweichung > 1 Punkt pro Kriterium moderierter Entscheid.
6. **Finalisierung:** Score, Begründung, Unsicherheiten, Revalidierungsdatum.
7. **Publikation:** standardisiertes Bewertungsblatt.

## 7. Standard-Bewertungsblatt (Template)

Pflichtfelder pro Item:

- Item-ID, Name, Layer, Sub-Layer
- Bewertungsdatum, Version des Kriterienkatalogs
- Quellenliste nach Q1–Q6 (mit URL, Datum, Vertrauensniveau)
- Einzelpunktzahlen K1–K7 inkl. Kurzbegründung
- Berechneter Gesamtscore (0–100)
- Kennzeichnung: „bewertbar“, „eingeschränkt bewertbar“ oder „nicht bewertbar“
- Revalidierungsdatum (empfohlen: +6 Monate)

## 8. Score-Interpretation

- **80–100:** hohe Souveränität
- **60–79:** solide Souveränität mit punktuellen Abhängigkeiten
- **40–59:** eingeschränkte Souveränität
- **0–39:** niedrige Souveränität / starke Abhängigkeit

## 9. Qualitätssicherung und Revisionszyklus

- Quartalsweise Stichprobe (mind. 10 % der Items je Layer)
- Halbjährliche Revalidierung aller Scores
- Versionierung des Kriterienkatalogs; Änderungen sind rückwirkend nachvollziehbar zu dokumentieren
- KPI für Objektivität: Inter-Rater-Abweichung pro Kriterium (Soll: ≤ 1 Punkt)

## 10. Beispielberechnung

Beispiel-Item:

- K1=4, K2=3, K3=4, K4=2, K5=4, K6=3, K7=5

Berechnung:

- K1: (4/5)×15 = 12
- K2: (3/5)×20 = 12
- K3: (4/5)×15 = 12
- K4: (2/5)×15 = 6
- K5: (4/5)×15 = 12
- K6: (3/5)×10 = 6
- K7: (5/5)×10 = 10

**Souveränitätsscore = 70/100**

---

## Kurzfazit

Mit diesem Modell lassen sich Technologie-Items innerhalb eines Layers/Sub-Layers konsistent, quellenbasiert und neutral bewerten. Durch standardisierte Quellenklassen, feste Gewichtungen, Guardrails und ein Review-Verfahren entsteht ein belastbarer item-spezifischer Souveränitätsscore.
