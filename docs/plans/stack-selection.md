# Bewertungssystem für die Auswahl von Stack-Items

## Ziel

Dieses Bewertungssystem soll helfen, Stack-Items **nicht nach Hype, Herstellerdruck oder Einzelfallpräferenzen**, sondern nach **Steuerbarkeit, Standardisierbarkeit und langfristigem Nutzen** auszuwählen.

Es trennt sauber zwischen:

* Pattern
* offenem Standard
* Referenzimplementierung
* Produkt/Tool
* Experiment / Beobachtungskandidat

---

## 1. Grundprinzip

### 1.1 Erst Pattern, dann Standard, dann Implementierung

Jedes Stack-Item wird in dieser Reihenfolge bewertet:

1. Welches Pattern adressiert es?
2. Ist es ein offener Standard oder nur eine konkrete Technologie?
3. Ist es steuerbar, austauschbar und langfristig tragfähig?
4. Ist es für den Kernstack, für die Referenzarchitektur oder nur für einen Beobachtungsbereich geeignet?

---

## 2. Klassifikation vor der Bewertung

Bevor ein Item gescored wird, muss es einer Klasse zugeordnet werden.

### 2.1 Klassen

#### A. Architektur-Pattern

Beispiele:

* föderierte Authentisierung
* eventbasierte Integration
* revisionssichere Dokumentenablage
* barrierefreie UI
* beobachtbarer Betrieb

#### B. Offener Standard

Beispiele:

* OAuth 2.0
* OpenID Connect
* OpenAPI
* BPMN
* ODF
* XÖV
* WebRTC

#### C. Referenzimplementierung

Beispiele:

* Keycloak
* Grafana
* Kafka
* KoliBri
* Ceph

#### D. Produkt / Plattform / Framework

Beispiele:

* Angular
* GitHub Actions
* ACR
* UiPath
* Appian

#### E. Beobachtungskandidat / Innovation

Beispiele:

* unreife Agent-Protokolle
* neue KI-Gateways
* Hype-getriebene Toolchains

---

## 3. Harte Ausschlusskriterien

Wenn eines dieser Kriterien erfüllt ist, darf das Item **nicht** in den Kernstack aufgenommen werden.

### 3.1 Ausschlussregeln

* kein klar erkennbares Pattern
* kein offener oder dokumentierter Standard
* starke Hersteller- oder Cloud-Bindung
* geringe Austauschbarkeit
* unreifer oder instabiler Reifegrad
* kein relevanter Mehrwert gegenüber bereits vorhandenen Bausteinen
* nur Tool-Mode oder Trend ohne Governance-Fähigkeit
* überschneidet sich vollständig mit bestehendem Stack-Item ohne Zusatznutzen
* nicht prüfbar oder nicht vertraglich/beschaffungsseitig operationalisierbar

---

## 4. Bewertungsdimensionen

Jedes Item wird auf einer Skala von **0 bis 5** bewertet.

* **0 = nicht erfüllt**
* **1 = schwach**
* **2 = teilweise**
* **3 = solide**
* **4 = stark**
* **5 = sehr stark**

---

## 5. Scorecard

### 5.1 Dimension 1: Pattern-Fit

**Frage:** Löst das Item ein wiederkehrendes, relevantes Architekturproblem?

**Gewicht:** 15 %

**Bewertungsanker (0/3/5):**

* **0:** Kein klar abgegrenztes Pattern oder nur Einzelfalllösung ohne übertragbaren Architekturbezug.
* **3:** Pattern ist dokumentiert und in mindestens zwei produktiven Referenzen im Zielkontext nachweisbar.
* **5:** Pattern ist organisationsübergreifend etabliert, mit klaren Schnittstellen und reproduzierbarer Umsetzung in mehreren Domänen.

### 5.2 Dimension 2: Offenheit und Standardisierungsgrad

**Frage:** Ist das Item ein offener, dokumentierter, nachvollziehbarer Standard?

**Gewicht:** 20 %

**Bewertungsanker (0/3/5):**

* **0:** Spezifikation ist proprietär, nicht öffentlich zugänglich oder nur herstellerspezifisch beschrieben.
* **3:** Öffentliche Spezifikation liegt vor, ist versioniert und ohne diskriminierende Zugangshürden nutzbar.
* **5:** Offene Spezifikation unter neutraler Governance mit transparentem Change-Prozess und veröffentlichten Konformitätskriterien.

### 5.3 Dimension 3: Steuerbarkeit

**Frage:** Können wir das Item selbst fachlich, technisch und organisatorisch steuern?

**Gewicht:** 15 %

**Bewertungsanker (0/3/5):**

* **0:** Kritische Entscheidungen, Roadmap oder Betrieb sind ausschließlich durch einen Anbieter kontrolliert.
* **3:** Eigene Governance ist definiert (Rollen, Verantwortlichkeiten, Betriebsmodell) und kann unabhängig vom Hersteller umgesetzt werden.
* **5:** Steuerung ist vertraglich und technisch abgesichert, inklusive eigener Entscheidungsrechte für Architektur, Betrieb und Weiterentwicklung.

### 5.4 Dimension 4: Austauschbarkeit

**Frage:** Kann die Implementierung ersetzt werden, ohne das Pattern oder die Schnittstellen zu zerstören?

**Gewicht:** 10 %

**Bewertungsanker (0/3/5):**

* **0:** Austausch führt zu Schnittstellenbruch, Datenverlust oder umfassender Neuimplementierung.
* **3:** Definierte Standardschnittstellen und Datenexporte ermöglichen einen Anbieterwechsel mit planbarem Migrationsaufwand.
* **5:** Definierter Exit-Pfad mit dokumentierter Migrationsstrategie, getesteten Übergabeformaten und mindestens einer validierten Alternative.

### 5.5 Dimension 5: Reifegrad

**Frage:** Ist das Item belastbar, implementiert und produktiv erprobt?

**Gewicht:** 10 %

**Bewertungsanker (0/3/5):**

* **0:** Frühes Experiment ohne belastbare Produktionsnachweise, Supportmodell oder stabile Versionierung.
* **3:** Mindestens zwei produktive Referenzen mit dokumentierten Betriebskennzahlen und geregeltem Release-/Patch-Prozess.
* **5:** Langjährig produktiv bewährt, mit nachweisbarer Skalierung, Sicherheitsupdates und verlässlichem Support-/Wartungsmodell.

### 5.6 Dimension 6: Interoperabilität

**Frage:** Fördert das Item Zusammenspiel zwischen Organisationen, Systemen und Anbietern?

**Gewicht:** 10 %

**Bewertungsanker (0/3/5):**

* **0:** Proprietäre Schnittstellen verhindern standardkonforme Anbindung durch Dritte.
* **3:** Interoperabilität ist über dokumentierte Standardschnittstellen inklusive Authentisierung, Datenformaten und Fehlersemantik nachweisbar.
* **5:** Mehranbieter-Betrieb ist produktiv belegt (mindestens zwei unabhängige Implementierungen), inklusive erfolgreicher Konformitäts- oder Interop-Tests.

### 5.7 Dimension 7: Souveränität

**Frage:** Stärkt das Item digitale Souveränität, Unabhängigkeit und Beschaffungsfähigkeit?

**Gewicht:** 10 %

**Bewertungsanker (0/3/5):**

* **0:** Lock-in durch exklusive Dienste, proprietäre Datenhaltung oder nicht übertragbare Betriebsartefakte.
* **3:** Beschaffung ist wettbewerblich möglich und Betriebs-/Datenverantwortung kann in eigener oder beauftragter Hoheit verbleiben.
* **5:** Vollständige Portabilität von Daten, Konfiguration und Betrieb; mehrere austauschbare Anbieter und dokumentierte Exit-Optionen sind verfügbar.

### 5.8 Dimension 8: Betriebs- und Governance-Fähigkeit

**Frage:** Lässt sich das Item in Betrieb, Compliance, Security und Ausschreibung sauber verankern?

**Gewicht:** 10 %

**Bewertungsanker (0/3/5):**

* **0:** Keine belastbaren Vorgaben für Betrieb, Sicherheitsmaßnahmen, Compliance oder Vergabe.
* **3:** Betriebs- und Sicherheitsanforderungen sind dokumentiert (z. B. Monitoring, IAM, Logging, Patchmanagement) und auditierbar umsetzbar.
* **5:** End-to-End-Governance ist definiert und nachweislich wirksam, inkl. Compliance-Nachweisen, SLA-Modell und ausschreibungsfähigen Leistungsbeschreibungen.

---

## 6. Formel

### 6.1 Gewichteter Gesamtscore

Gesamtscore =

* (Pattern-Fit × 0,15)
* (Offenheit × 0,20)
* (Steuerbarkeit × 0,15)
* (Austauschbarkeit × 0,10)
* (Reifegrad × 0,10)
* (Interoperabilität × 0,10)
* (Souveränität × 0,10)
* (Betriebs-/Governance-Fähigkeit × 0,10)

**Punkte = Gesamtscore × 20**

---

## 7. Entscheidungsklassen

| Punkte | Entscheidung                  | Bedeutung                              |
| ------ | ----------------------------- | -------------------------------------- |
| 85–100 | Kernstack                     | verbindlich oder stark empfohlen       |
| 70–84  | Referenzstack                 | sinnvoll, aber nicht zwingend für alle |
| 50–69  | Optionale Referenztechnologie | nur in passenden Domänen               |
| 30–49  | Beobachtung / Pilotierung     | noch nicht stack-reif                  |
| 0–29   | Nicht aufnehmen               | kein sinnvoller Stack-Baustein         |

---

## 8. Zusatzregel: Typabhängige Obergrenze

Damit Produkte nicht versehentlich so hoch scoren wie offene Standards, gilt zusätzlich eine Obergrenze je Klasse.

| Klasse                     | Maximal mögliche Entscheidung |
| -------------------------- | ----------------------------- |
| Architektur-Pattern        | Kernstack                     |
| Offener Standard           | Kernstack                     |
| Referenzimplementierung    | Referenzstack                 |
| Produkt / Framework / Tool | Optionale Referenztechnologie |
| Beobachtungskandidat       | Beobachtung / Pilotierung     |

---

## 9. Pflicht-Metadaten pro Item

Jedes vorgeschlagene Item muss mit diesen Feldern eingereicht werden:

* Name
* Kategorie
* Zugeordnetes Pattern
* Typ
* Offene Spezifikation vorhanden
* Governance / Herausgeber
* Reifegrad
* Austauschbare Alternativen
* Abhängigkeiten
* Betriebsmodell
* Sicherheits-/Compliance-Relevanz
* Empfohlene Stack-Einstufung

---

## 10. Bewertungsbogen

### Vorlage

* **Name:**
* **Kategorie:**
* **Pattern:**
* **Typ:**
* **Kurzbeschreibung:**

**Ausschlussprüfung**

* klares Pattern vorhanden?
* offen dokumentiert?
* austauschbar?
* ausreichend reif?
* Mehrwert gegenüber vorhandenem Item?

**Einzelbewertung (0–5)**

* Pattern-Fit:
* Offenheit und Standardisierungsgrad:
* Steuerbarkeit:
* Austauschbarkeit:
* Reifegrad:
* Interoperabilität:
* Souveränität:
* Betriebs-/Governance-Fähigkeit:

**Ergebnis**

* gewichteter Score:
* Punkte (0–100):
* Entscheidungsklasse:

**Begründung**

* Nutzen:
* Risiken:
* Empfehlung:

---

## 11. Kurzregel für Gremien

Für jedes neue Item müssen nacheinander diese Fragen beantwortet werden:

1. Welches Pattern lösen wir damit?
2. Warum reicht der bestehende Stack dafür nicht aus?
3. Ist das ein Standard oder nur ein Produkt?
4. Was können wir daran selbst steuern?
5. Wie tauschen wir es im Zweifel wieder aus?
6. Warum sollte das in 5 Jahren noch tragfähig sein?

Wenn diese Fragen nicht sauber beantwortbar sind, gehört das Item nicht in den Kernstack.

---

## 12. Executive Summary

**In den Kernstack kommen nur Items, die ein relevantes Pattern tragen, offen standardisiert, steuerbar, austauschbar, reif und governance-fähig sind.**
