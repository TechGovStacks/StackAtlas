# **Evaluierungskonzept für item-spezifische Souveränitätsscores – Version 2.0**

*Stand: 08.04.2026*

---

## **1. Ziel und Anwendungsbereich**

Dieses Konzept beschreibt ein **neutrales, objektives und reproduzierbares** Verfahren zur Bewertung einzelner Technologie-Items. Das Ergebnis ist ein numerischer **Souveränitätsscore (0–100)** pro Item, der die Fähigkeit eines Items misst, Kontrolle über Technologie und Daten zu behalten – ohne von einzelnen Anbietern oder externen Faktoren abhängig zu sein.

**Geltungsbereich:**

- Alle Items innerhalb desselben **Layers** und **Sub-Layers** werden nach denselben Regeln bewertet.
- **Quellen, Kriterien und Gewichtungen** sind für alle Items identisch.
- **Ausschluss:** Scheinsouveränität durch gezielte Abhängigkeiten wird durch Guardrails verhindert.

**Abgrenzung:**

- Unterscheidet sich von Compliance-Scores und Open-Source-Reifegraden durch Fokus auf **technologische und rechtliche Autonomie**.
- Keine Bewertung von Performance oder Usability, sondern ausschließlich auf **Souveränität**.

---

## **2. Bewertungsprinzipien**


| Prinzip                       | Beschreibung                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| **Gleichbehandlung**          | Identischer Kriterienkatalog und Gewichtung pro Layer/Sub-Layer.                                  |
| **Quellenparität**            | Pro Kriterium werden immer dieselben **Quellenklassen (Q1–Q6)** verwendet.                        |
| **Evidenzpflicht**            | Jeder Einzelwert muss durch **dokumentierte Primärquellen** belegt sein.                          |
| **Zeitstempelung**            | Jede Bewertung erhält ein **Bewertungsdatum** und ein **Revalidierungsdatum**.                    |
| **Vier-Augen-Prinzip**        | Bei Abweichungen >2 Punkte pro Kriterium erfolgt eine Zweitbewertung.                             |
| **Priorisierung der Quellen** | **Q5 (unabhängige Drittquellen)** ist stets obligatorisch, Q1–Q4 werden nach Kriterien gewichtet. |


---

## **3. Standardisierte Quellenklassen (verpflichtend)**

Für jedes Item werden – soweit verfügbar – **dieselben Quellenklassen** erhoben und dokumentiert:


| Klasse                                | Beschreibung                                                                | Vertrauenslevel | Beispiele                                                    |
| ------------------------------------- | --------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------ |
| **Q1: Hersteller-/Projektquellen**    | Offizielle Dokumentation, Security-Policies, Roadmaps, Governance-Dokumente | Hoch            | Hersteller-Website, GitHub-Releases, RFCs                    |
| **Q2: Code- und Entwicklungsquellen** | Repository, Release-Historie, Issue-Tracker, Maintainer-Struktur            | Hoch            | GitHub/GitLab, Debian-Paketquellen                           |
| **Q3: Rechts-/Compliance-Quellen**    | Lizenztexte, DPA/AVV, Hosting- und Datenverarbeitungsangaben                | Hoch            | SPDX-Lizenzen, EU-DSVGO-Konformitätserklärungen              |
| **Q4: Sicherheitsquellen**            | CVE/NVD, Advisories, SBOM/Signierung, Security-Response-Prozesse            | Mittel          | NVD-Datenbank, OWASP Top 10                                  |
| **Q5: Unabhängige Drittquellen**      | Audit-Berichte, Branchenanalysen, wissenschaftliche Quellen                 | Hoch            | BSI-Zertifikate, FSFE-Empfehlungen, wissenschaftliche Papers |
| **Q6: Betriebs-/Marktquellen**        | SLA/Supportmodell, Anbieterstruktur, Exit-/Migrationsoptionen               | Mittel          | Anbieter-Websites, Marktanalysen (Gartner, Forrester)        |


**Regeln:**

- Pro Kriterium müssen **mindestens 2 Quellenklassen** genutzt werden.
- Mindestens **eine unabhängige Drittquelle (Q5)** muss je Item enthalten sein.
- Quellen dürfen maximal **12 Monate alt** sein (Ausnahme: unveränderte Lizenz-/Governance-Dokumente).
- **Vertrauenslevel:** Bei widersprüchlichen Quellen wird das niedrigere Level verwendet.

---

## **4. Bewertungskriterienkatalog mit Gewichtung**

Skala pro Kriterium: **0 bis 10 Punkte**

- 0 = nicht erfüllt / keine Evidenz
- 1–2 = sehr schwach
- 3–4 = schwach
- 5–6 = teilweise erfüllt
- 7–8 = gut erfüllt
- 9–10 = sehr gut erfüllt

**Gesamtgewichtung (100 %):**


| Nr.    | Kriterium                                    | Gewicht | Bewertungsfokus (Prüfpunkte)                                                                                             |
| ------ | -------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| **K1** | Rechtliche Souveränität                      | 15 %    | Lizenzmodell, Nutzungsrechte, Vertragsklarheit, Lock-in-reduzierende Rechte, Compliance mit lokalen Gesetzen             |
| **K2** | Datenhoheit & Datenportabilität              | 25 %    | Exportformate, API-Zugriff, Datenlokation, Lösch-/Mitnahmefähigkeit, Datenhoheit bei Cloud-Diensten                      |
| **K3** | Technologische Offenheit & Interoperabilität | 15 %    | Offene Standards, offene Schnittstellen, Integrationsfähigkeit, Modularität, Kompatibilität mit Open-Source-Alternativen |
| **K4** | Governance & Anbieterunabhängigkeit          | 15 %    | Eigentümerstruktur, Community-/Stiftungsmodell, Entscheidungsprozesse, Transparenz der Roadmap                           |
| **K5** | Sicherheits- und Lieferketten-Souveränität   | 15 %    | Vulnerability-Management, Signierung, SBOM, Incident-Reaktion, Abhängigkeiten von Drittanbietern                         |
| **K6** | Betriebsautonomie & Exit-Fähigkeit           | 10 %    | Self-Hosting-Option, Migrationsaufwand, Betriebswissen, Multi-Provider-Unterstützung, Dokumentation der Abhängigkeiten   |
| **K7** | Transparenz & Nachvollziehbarkeit            | 5 %     | Dokumentationsqualität, Änderungsprotokolle, Offenlegung relevanter Kennzahlen, Community-Beteiligung                    |


**Mindestanforderungen:**

- **Mindestens 3 Punkte pro Kriterium**, um Bewertung nicht als „nicht nachgewiesen“ zu markieren.
- **Guardrails:**
  - Wenn **K2 < 3**, dann maximaler Gesamtscore = 69.
  - Wenn **K5 < 3**, dann maximaler Gesamtscore = 69.
  - Wenn für mehr als 2 Kriterien keine ausreichende Evidenz vorliegt, Status = „nicht bewertbar“.

---

## **5. Bewertungslogik und Berechnung**

### **5.1 Einzelkriterium**

Für jedes Kriterium Ki wird ein Punktwert zwischen 0 und 10 vergeben.

### **5.2 Gewichteter Gesamtscore**

**Formel:**  
`Souveränitätsscore = Σ( (Punkte_Ki / 10) × Gewicht_Ki )`

**Beispiel:**  
Ein Item mit den Punkten **K1=8, K2=7, K3=6, K4=5, K5=9, K6=7, K7=8** ergibt:

- K1: (8/10)×15 = 12
- K2: (7/10)×25 = 17.5
- K3: (6/10)×15 = 9
- K4: (5/10)×15 = 7.5
- K5: (9/10)×15 = 13.5
- K6: (7/10)×10 = 7
- K7: (8/10)×5 = 4

**Gesamtscore: 70/100**

### **5.3 Unsicherheitsfaktor**

- Bei **fehlenden Q5-Quellen** oder widersprüchlichen Quellen: **Abschlag von 10 %** auf den Gesamtscore.
- Bei **mehr als 3 fehlenden Prüfpunkten** pro Kriterium: **Bewertung = „nicht bewertbar“**.

### **5.4 Risikomatrix**

Kombination aus **Souveränitätsscore** und **Kritikalität des Items** (z. B. für Infrastruktur oder personenbezogene Daten):


| Souveränität | Kritikalität | Empfehlung                           |
| ------------ | ------------ | ------------------------------------ |
| 80–100       | Hoch         | Souverän                             |
| 60–79        | Hoch         | Risiko! Alternativen evaluieren      |
| 40–59        | Hoch         | Kritisch! Sofortige Maßnahmen        |
| 0–39         | Hoch         | Abhängigkeit! Migration erforderlich |


---

## **6. Prozessmodell für neutrale und gleichberechtigte Bewertung**

1. **Item-Klassifizierung:** Layer/Sub-Layer festlegen.
2. **Quellen-Collection nach Q1–Q6:** Strukturierte Evidenz sammeln (Cross-Checking durch zwei Analysten).
3. **Scoring Runde 1 (Analyst A):** Kriterien einzeln bewerten, Evidenzen verlinken, Annahmen dokumentieren.
4. **Scoring Runde 2 (Analyst B):** Blind-Review derselben Evidenzen.
5. **Abgleich:** Bei Abweichung >2 Punkte pro Kriterium: moderierter Entscheid.
6. **Finalisierung:** Berechnung des Scores inkl. Unsicherheitsfaktor, Begründung, Unsicherheiten, Revalidierungsdatum.
7. **Publikation:** Standardisiertes Bewertungsblatt (siehe Abschnitt 7).

**Automatisierungshinweise:**

- Nutzen Sie ein **Python-Skript** zur Plausibilitätsprüfung (z. B. Konsistenz der Quellen, Score-Berechnung).
- Erstellen Sie ein **Excel/Google-Sheets-Template** für die manuelle Eingabe und Berechnung.

---

## **7. Standard-Bewertungsblatt (Template)**

**Pflichtfelder pro Item:**


| Feld                    | Beschreibung                                                  | Format              |
| ----------------------- | ------------------------------------------------------------- | ------------------- |
| **Item-ID**             | Eindeutige Kennung                                            | z. B. `SW-2026-001` |
| **Name**                | Bezeichnung des Items                                         | Freitext            |
| **Layer/Sub-Layer**     | Zugehörigkeit                                                 | Dropdown/Pflicht    |
| **Bewertungsdatum**     | Datum der Bewertung                                           | `YYYY-MM-DD`        |
| **Revalidierungsdatum** | Empfohlen: +6 Monate                                          | `YYYY-MM-DD`        |
| **Quellenliste**        | Alle Q1–Q6 mit URL, Datum, Vertrauenslevel                    | Tabelle             |
| **Einzelpunktzahlen**   | K1–K7 mit Kurzbegründung und Prüfpunkten                      | Tabelle             |
| **Gesamtscore**         | Berechnet inkl. Unsicherheitsfaktor                           | `0–100`             |
| **Status**              | „bewertbar“, „eingeschränkt bewertbar“ oder „nicht bewertbar“ | Dropdown            |
| **Version**             | Version des Kriterienkatalogs                                 | z. B. `2.0`         |
| **Offene Annahmen**     | Dokumentation von Annahmen                                    | Freitext            |


**Visualisierung:**

- **Radardiagramm** der Einzelkriterien (z. B. mit Python `matplotlib` oder Excel).

---

## **8. Score-Interpretation**


| Score-Bereich | Interpretation                              | Empfehlung                    |
| ------------- | ------------------------------------------- | ----------------------------- |
| 80–100        | Hohe Souveränität                           | Item uneingeschränkt nutzbar  |
| 60–79         | Solide Souveränität mit Abhängigkeiten      | Risikomanagement erforderlich |
| 40–59         | Eingeschränkte Souveränität                 | Alternativen evaluieren       |
| 0–39          | Niedrige Souveränität / starke Abhängigkeit | Migration priorisieren        |


---

## **9. Qualitätssicherung und Revisionszyklus**


| Maßnahme                        | Häufigkeit               | Verantwortlich                   |
| ------------------------------- | ------------------------ | -------------------------------- |
| **Quartalsweise Stichprobe**    | 10 % der Items pro Layer | Internes QA-Team                 |
| **Halbjährliche Revalidierung** | Alle Items               | Analysten-Team                   |
| **Externe Audits**              | Jährlich                 | Unabhängige Stelle (z. B. BSI)   |
| **Community-Feedback**          | Kontinuierlich           | GitHub Issues / Diskussionsforum |
| **KPIs für Objektivität**       | &nbsp;                   | &nbsp;                           |


- **Inter-Rater-Reliabilität (Cohen’s Kappa):** Sollwert ≥ 0.7
- **Anteil „nicht bewertbarer“ Items:** Sollwert < 5 %

**Versionierung:**

- Änderungen am Kriterienkatalog werden rückwirkend dokumentiert (z. B. in einem CHANGELOG).
- Nutzen Sie **Git** für die Dokumentenversionierung.

---

## **10. Automatisierung und Tools**


| Tool                    | Zweck                                   | Beispiel                       |
| ----------------------- | --------------------------------------- | ------------------------------ |
| **Python-Skript**       | Plausibilitätsprüfung, Score-Berechnung | `souveraenitaet_score.py`      |
| **Excel/Google-Sheets** | Manuelle Eingabe und Berechnung         | `Souveraenitaet_Template.xlsx` |
| **Radardiagramm**       | Visualisierung der Kriterien            | `plot_radar.py`                |
| **Git**                 | Versionierung des Dokuments             | Repository auf GitHub          |


---

## **11. Beispielberechnung mit Risikomatrix**

**Item:** Open-Source-Datenbank (PostgreSQL)  
**Bewertung:**

- K1: 9/10 (Lizenz: PostgreSQL License)
- K2: 8/10 (Datenportabilität via SQL-Exports)
- K3: 10/10 (Offene Standards, Modularität)
- K4: 7/10 (Community-gesteuert, aber kommerzielle Anbieter)
- K5: 6/10 (CVE-Management, aber Abhängigkeit von Paketmaintainern)
- K6: 9/10 (Self-Hosting einfach, Multi-Provider)
- K7: 8/10 (Dokumentation hochwertig)

**Gesamtscore:**  
(9/10×15) + (8/10×25) + (10/10×15) + (7/10×15) + (6/10×15) + (9/10×10) + (8/10×5) = **80.5/100**

**Risikomatrix:**

- Souveränität: 80.5 (hoch) | Kritikalität: Mittel → **Empfehlung: Uneingeschränkt nutzbar**

---

## **12. Versionierungshinweise**

- **Version 1.0:** Ursprüngliches Konzept (November 2024).
- **Version 2.0:** Überarbeitet am 08.04.2026 (Optimierungen: Quellenpriorisierung, Kriterienprüfpunkte, Risikomatrix, Automatisierungshinweise).
- **Nächste Revision:** Oktober 2026 (halbjährlicher Zyklus).

---

### **Anhang: Nützliche Ressourcen**

- [GitHub-Template für Bewertungsblätter](https://github.com/example/souveraenitaet-score)
- [Python-Skript zur Score-Berechnung](https://github.com/example/souveraenitaet_score.py)
- [BSI-Leitfaden zu IT-Souveränität](https://www.bsi.bund.de)
- [FSFE-Empfehlungen für Open-Source-Souveränität](https://fsfe.org)

---

**Feedback und Verbesserungsvorschläge:**  
Bitte nutzen Sie das [Diskussionsforum](https://github.com/example/issues) oder kontaktieren Sie das Analysten-Team unter `souveraenitaet@familie-oppitz.de`.
