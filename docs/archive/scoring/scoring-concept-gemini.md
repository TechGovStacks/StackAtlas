---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

Hier ist das vollständig überarbeitete und erweiterte Konzept im gewünschten Markdown-Format. Die Optimierungen (K.O.-Kriterien, risikobasiertes Review, Lifecycle-Status, Deployment-Modelle und Bewertungsraster) sind nahtlos integriert.

---

# Evaluierungskonzept für einen item-spezifischen Souveränitätsscore (Version 2.0)

## 1. Ziel und Anwendungsbereich

Dieses Konzept beschreibt eine **neutrale, objektive, reproduzierbare und skalierbare** Bewertung einzelner Technologie-Items (Software, Services, Libraries). Ergebnis ist ein numerischer **Souveränitätsscore (0–100)** pro Item.

Das Verfahren stellt sicher, dass alle Items innerhalb desselben Layers und Sub-Layers nach denselben strengen Regeln bewertet, mit gleichartigen Quellen geprüft und durch eine identische, risikobasierte Gewichtungslogik verglichen werden.

## 2. Bewertungsprinzipien

1. **Gleichbehandlung:** Identischer Kriterienkatalog und Gewichtung pro Layer/Sub-Layer.
2. **Quellenparität:** Pro Kriterium werden immer die gleichen Quellenarten verwendet.
3. **Evidenzpflicht:** Jeder Einzelwert muss durch dokumentierte Quellen belegbar sein.
4. **Lebenszyklus-Bewusstsein:** Der Status einer Software (z. B. "End of Life") fließt dynamisch in die Bewertung ein.
5. **Risikobasierte Prüfung:** Die Tiefe des Vier-Augen-Prinzips skaliert mit der Kritikalität des Items.

## 3. Standardisierte Quellenklassen (verpflichtend)

Für jedes Item werden – soweit verfügbar – dieselben Quellenklassen erhoben und dokumentiert:

- **Q1: Hersteller-/Projektquellen** (Offizielle Doku, Security-Policies, Roadmaps, Governance)
- **Q2: Code- und Entwicklungsquellen** (Repository, Release-Historie, Issue-Tracker)
- **Q3: Rechts-/Compliance-Quellen** (Lizenztexte, DPA/AVV, Hosting-Angaben)
- **Q4: Sicherheitsquellen** (CVE/NVD, Advisories, SBOM, Security-Response)
- **Q5: Unabhängige Drittquellen** (Audit-Berichte, Branchenanalysen, wissenschaftliche Quellen)
- **Q6: Betriebs-/Marktquellen** (SLA, Anbieterstruktur, Exit-/Migrationsoptionen)

### Quellenregeln zur Objektivität

- Pro Kriterium müssen **mindestens 2 Quellenklassen** genutzt werden.
- Mindestens **eine unabhängige Drittquelle (Q5)** muss je Enterprise-/Kommerz-Item vorliegen. **Ausnahme:** Für reine Open-Source-Projekte oder Nischen-Tools kann Q5 durch nachweisbare Metriken zur Community-Gesundheit (z. B. OpenSSF Scorecard, CNCF-Status) ersetzt werden.
- Quellen dürfen maximal **12 Monate alt** sein (Ausnahme: unveränderte Lizenztexte).
- Aussagen ohne Primärquelle werden als „nicht nachgewiesen“ (0 Punkte) gewertet.

## 4. Bewertungskriterien und Gewichtung

Die Bewertung erfolgt anhand einer fest definierten Matrix (siehe Anhang 1) auf einer Skala von **0 bis 5 Punkten**.

Gesamtgewichtung (100 %):

| Nr.    | Kriterium                   | Gewicht | Bewertungsfokus                                                         |
| :----- | :-------------------------- | :-----: | :---------------------------------------------------------------------- |
| **K1** | Rechtliche Souveränität     |  15 %   | Lizenzmodell, Nutzungsrechte, Vertragsklarheit, Reduzierung von Lock-in |
| **K2** | Datenhoheit & -portabilität |  20 %   | Exportformate, API-Zugriff, Datenlokation, Löschfähigkeit               |
| **K3** | Technologische Offenheit    |  15 %   | Offene Standards, offene Schnittstellen, Interoperabilität              |
| **K4** | Governance & Unabhängigkeit |  15 %   | Eigentümerstruktur, Stiftungsmodell, Entscheidungsprozesse              |
| **K5** | Sicherheits-Souveränität    |  15 %   | Vulnerability-Management, Signierung, SBOM, Incidents                   |
| **K6** | Betriebsautonomie & Exit    |  10 %   | Self-Hosting, Migrationsaufwand, Multi-Provider-Fähigkeit               |
| **K7** | Transparenz                 |  10 %   | Dokumentationsqualität, Änderungsprotokolle, Kennzahlen                 |

## 5. Bewertungslogik, Guardrails und K.O.-Kriterien

### 5.1 Berechnung

**Souveränitätsscore = Σ( (Punkte_Ki / 5) × Gewicht_Ki )**

### 5.2 Harte K.O.-Kriterien (Score = 0)

Ein Item wird sofort als **"nicht zertifizierbar" (Score 0)** eingestuft, wenn eines der folgenden Kriterien zutrifft, unabhängig von den restlichen Punkten:

- Der Anbieter/Maintainer unterliegt Gesetzen, die einen erzwungenen und unkontrollierbaren Datenabfluss ermöglichen (z. B. US CLOUD Act bei fehlender Verschlüsselungshoheit, chinesisches Geheimdienstgesetz).
- Der Anbieter/Maintainer steht auf relevanten internationalen Sanktionslisten.
- Nachgewiesene, nicht mitigierte Backdoors oder absichtliche Schwächung von Krypto-Standards.

### 5.3 Mindestanforderungen (Deckelung bei 49 Punkten)

Um „Scheinsouveränität“ zu verhindern, wird der Gesamtscore auf **maximal 49 Punkte** gedeckelt, wenn kritische Abhängigkeiten bestehen:

- Wenn **K2 < 2** (Faktischer Daten-Lock-in)
- Wenn **K5 < 2** (Unzureichendes Sicherheitsmanagement)
- Wenn **K6 < 2** (Betriebs-Exit faktisch unmöglich oder mit Daten-/Werteverlust verbunden)

### 5.4 Dynamischer Lifecycle-Abzug

Befindet sich eine Software im Status "Deprecated" oder "End-of-Life" (EOL), entfallen nach einer Schonfrist von 6 Monaten sicherheitskritische Patches. Ab diesem Stichtag wird der Souveränitätsscore **automatisch um 50 % reduziert** und nach weiteren 6 Monaten auf **0 gesetzt**.

## 6. Prozessmodell für skalierbare Bewertung

1. **Item-Klassifizierung:** \* Layer und Sub-Layer festlegen.
   - **Bereitstellungsmodell definieren:** (SaaS, On-Premises, Library/Code) – _Dies steuert die Gewichtung spezifischer Sub-Fragen, z. B. entfällt die Frage nach Self-Hosting bei reinen Libraries._
2. **Quellen-Collection (Q1–Q6):** Strukturierte Evidenz sammeln.
3. **Scoring Runde 1 (Analyst A):** Matrix-basierte Bewertung inkl. Verlinkung der Evidenzen.
4. **Risikobasiertes Review (Analyst B):**
   - _Standard-Items:_ Plausibilitätsprüfung (Sanity Check) der Evidenzen.
   - _Kritische Core-Items:_ Vollständiges Blind-Review unabhängig von Analyst A.
5. **Konsolidierung:** Bei Abweichungen > 1 Punkt pro Kriterium erfolgt ein moderierter Entscheid.
6. **Finalisierung:** Dokumentation von Score, Begründung und Lifecycle-Status.

## 7. Standard-Bewertungsblatt (Template)

Folgende Datenfelder sind pro Item verpflichtend:

- **Metadaten:** Item-ID, Name, Layer, Sub-Layer, Bereitstellungsmodell (SaaS/On-Prem/Lib)
- **Status:** Lifecycle-Status (Active, Maintenance, Deprecated)
- **Verwaltung:** Bewertungsdatum, Version des Kriterienkatalogs, Revalidierungsdatum (+6 Monate)
- **Quellenliste:** Q1–Q6 (URL, Datum, Vertrauensniveau)
- **Bewertung:** Einzelpunktzahlen K1–K7 inkl. referenzierter Primärquelle
- **Ergebnis:** Berechneter Gesamtscore (0–100) sowie Prüfstatus ("bewertbar", "eingeschränkt", "nicht zertifizierbar")

## 8. Score-Interpretation

- **80–100:** Hohe Souveränität (Weitgehende Unabhängigkeit, offene Standards)
- **60–79:** Solide Souveränität (Punktuelle, aber gut mitigierbare Abhängigkeiten)
- **40–59:** Eingeschränkte Souveränität (Mittleres Lock-in-Risiko)
- **0–39:** Niedrige Souveränität (Starke Abhängigkeit / Vendor Lock-in)

---

## Anhang: Auszug Bewertungsraster (Rubric) zur Operationalisierung

_Um subjektive Interpretationen der 0-5 Skala zu verhindern, gilt für alle Kriterien ein festes Raster. Aussagen müssen belegt sein._

**Beispiel K2: Datenhoheit & Datenportabilität**

- **0 Punkte:** Keine Evidenz / Unbekannt.
- **1 Punkt:** Kein Export durch Nutzer möglich; Daten sind in einem geschlossenen Silo gefangen.
- **2 Punkte:** Export nur manuell über Support-Tickets; unstrukturierte Dumps; keine APIs.
- **3 Punkte:** Export möglich, aber nur in proprietären/herstellerspezifischen Formaten; API vorhanden, deckt aber nicht alle Datenstrukturen ab.
- **4 Punkte:** Export in offenen Formaten (CSV, JSON) möglich; gute API; Löschkonzept vorhanden.
- **5 Punkte:** Vollständiger Echtzeit-Export in offenen Standards; vollwertige bidirektionale API (z. B. REST/GraphQL); zertifizierte und garantierte Datenlöschung (Zero-Trace).

**Beispiel K6: Betriebsautonomie & Exit-Fähigkeit (Fokus: SaaS/On-Prem)**

- **0 Punkte:** Keine Evidenz.
- **1 Punkt:** Absoluter Vendor-Lock-in; Betrieb ist untrennbar an spezifische Hardware/Cloud des Anbieters gekoppelt. Exit bedeutet Totalverlust der Systemlogik.
- **2 Punkte:** Exit extrem aufwändig; massive Abhängigkeit von proprietären PaaaS-Diensten; kein echtes Multi-Cloud möglich.
- **3 Punkte:** Architektur erlaubt Migration, erfordert aber hohes Refactoring; Self-Hosting eingeschränkt möglich (z.B. fehlende Enterprise-Features in On-Prem-Version).
- **4 Punkte:** Hohe Portabilität (z. B. standardisierte Container); Multi-Provider-fähig; etablierte Migrationspfade existieren.
- **5 Punkte:** Vollständige Betriebsautonomie; 100 % Infrastruktur-agnostisch (z. B. reine Kubernetes-Deployments ohne Cloud-spezifische Services); reibungsloser Wechsel zwischen Hosting-Providern out-of-the-box möglich.
