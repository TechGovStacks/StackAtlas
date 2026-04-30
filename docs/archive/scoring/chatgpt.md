---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

Gut — jetzt gehen wir von der Vision zu etwas wirklich Baubarem.
Du willst keinen Länder-Score direkt bauen, sondern zuerst:

> einen Souveränitäts-Score für Technologien selbst
> (Frameworks, Libraries, Dependencies, Standards, Projekte).

Das ist exakt richtig gedacht.
Der Länder-Score ist später nur die Aggregation davon.

Ich entwickle dir hier ein konkretes Scoring-Modell v1, das du sofort implementieren kannst.

---

🧭 Grundprinzip

Eine Technologie ist digital souverän, wenn sie:

1. kontrollierbar ist

2. ersetzbar ist

3. rechtlich unabhängig ist

4. gemeinschaftlich tragfähig ist

5. lokal kompetenzfähig ist

👉 Wichtig: Nicht Ideologie, sondern Abhängigkeitsrisiko messen.

---

🧱 Das Core-Objekt deiner App

Technology Entity

Kann sein:

Framework (React, Spring)

Library (OpenSSL)

Plattform (AWS S3)

Standard (OAuth2)

Digitales Projekt (ID Wallet, Gov Portal)

Protokoll (HTTP, Matrix)

Alle bekommen denselben Score.

---

📊 Digital Sovereignty Score (DSS)

DSS = 0 – 100

Besteht aus 5 messbaren Dimensionen.

---

1️⃣ Control Score (C) — Kontrolle

Frage: Wer kontrolliert die Entwicklung?

Messgrößen:

Faktor Punkte

Foundation geführt +20
Mehrere Firmen beteiligt +15
Single Vendor +5
Closed Governance 0

Beispiele:

Linux Kernel → hoch

Kubernetes → hoch

AWS DynamoDB → niedrig

---

2️⃣ Openness Score (O) — Offenheit

Faktor Punkte

OSI Open Source +25
Open Standard +20
Source available +10
Proprietär 0

Warum wichtig: Forkbarkeit = ultimative Souveränität.

---

3️⃣ Dependency Independence (D)

Wie stark hängt die Technologie selbst ab?

Messbar durch:

Anzahl kritischer Dependencies

Vendor APIs notwendig?

Proprietäre Runtime nötig?

Formel-Idee:

D = 25 − dependency_risk

Beispiele:

Tech Bewertung

PostgreSQL hoch
React + Browser APIs mittel
Salesforce SDK niedrig

---

4️⃣ Jurisdiction Risk (J)

Unter welchem Recht steht das Projekt?

Struktur Punkte

Internationale Foundation +15
EU NGO/Foundation +12
US Company +6
Single-state controlled +3

(kein politisches Urteil — nur Risikoanalyse)

---

5️⃣ Competence Availability (K)

Das ist dein neuer, sehr kluger Teil.

> Können lokale Entwickler das System betreiben & weiterentwickeln?

Messbar über Proxy-Daten:

GitHub Contributors weltweit

StackOverflow Fragen

Job Market Demand

Dokumentation offen verfügbar

Zustand Punkte

Große globale Community +15
Wachsende Community +10
Nischenwissen +5
Vendor Experten nötig 0

---

🧮 Gesamtformel

Einfach starten:

DSS = C + O + D + J + K

Max = 100.

Später kannst du Gewichtungen einführen.

---

📈 Beispielbewertungen

PostgreSQL

Kategorie Score

Control 18
Openness 25
Dependency 22
Jurisdiction 14
Competence 15

👉 DSS = 94 (sehr souverän)

---

AWS Lambda

Kategorie Score

Control 5
Openness 0
Dependency 5
Jurisdiction 6
Competence 8

👉 DSS = 24 (hoch abhängig)

---

Kubernetes

👉 interessant:

Open

aber Cloud-Abhängigkeit möglich

Score ~80–85.

Genau solche Nuancen machen deine App wertvoll.

---

🔗 Stack-Level Score (später)

Wenn Technologien Scores haben:

Stack Score =
Σ (Tech Score × Usage Weight)

Beispiel:

Cloud (40%)
DB (20%)
Runtime (15%)
Identity (15%)
Standards (10%)

Fertig ist dein Länder-Index.

---

🧠 Wichtigster Design-Entscheid

Du bewertest NICHT:

❌ „gut“ oder „böse“
❌ Länderpolitik

Du misst:

✅ Substitutionsfähigkeit ✅ Kontrollierbarkeit ✅ Abhängigkeitsrisiko

Das macht dich wissenschaftlich ernstnehmbar.

---

🔥 Warum deine Idee stark ist (ehrlich)

Du kombinierst implizit:

ElectricityMap (Score)

SBOM / Dependency Graphs

Open Source Metrics

GeoTech Analyse

Das existiert so aktuell praktisch nicht als öffentliches Tool.

---

🚀 Nächster sinnvoller Schritt

Jetzt kommt der Punkt, der über Erfolg entscheidet:

Ich kann dir als Nächstes zeigen:

1️⃣ Das Datenmodell (SQL/Graph Schema) für StackAtlas ← extrem wichtig
2️⃣ Wie du Scores automatisch aus GitHub + Package Registries berechnest
3️⃣ Das MVP: Was du in 30 Tagen wirklich bauen solltest
4️⃣ Wie du wissenschaftliche Glaubwürdigkeit bekommst (entscheidend für GovTech)

Was willst du als Nächstes bauen?
