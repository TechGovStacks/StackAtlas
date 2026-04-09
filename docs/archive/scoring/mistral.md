---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

Hier ist das **präzise Konzept für einen Souveränitäts-Score** – fokussiert auf **Technologien, Frameworks, Bibliotheken, Abhängigkeiten und digitale Projekte/Standards**, basierend auf **inneren Kompetenzen und Stack-Integration**:

---

### **1. Scoring-Modell: Souveränitäts-Metriken**
#### **A. Technologien/Frameworks/Bibliotheken**
| Kriterium                     | Metriken                                                                                     | Gewichtung | Beispiel (Score 0–100)                     |
|-------------------------------|---------------------------------------------------------------------------------------------|------------|---------------------------------------------|
| **Entwickler-Herkunft**        | - Wo wird die Technologie entwickelt? (EU/DE = 100, USA/CN = 20, Rest = 50)                | 25%        | React (USA) = 20, SAP UI5 (DE) = 100       |
| **Lizenzmodell**              | - Open-Source (MIT/Apache = 100), proprietär (0–50)                                           | 20%        | Linux (100), Windows (30)                  |
| **Hosting/Infrastruktur**     | - Wo läuft die Technologie? (EU = 100, USA/CN = 10, Hybrid = 50)                             | 20%        | AWS (10), Hetzner (100)                     |
| **Abhängigkeiten**            | - % der Abhängigkeiten von souveränen Quellen (EU/OS = 100, USA/CN = 0)                      | 15%        | NPM-Paket mit 80% EU-Deps = 80             |
| **Community-Kontrolle**       | - Kann die Community die Technologie forken/anpassen? (Ja = 100, Nein = 0)                     | 10%        | GitHub-Projekt mit aktiven Forks = 100     |
| **Compliance**                 | - Erfüllt GDPR/BSI/ISO 27001? (Ja = 100, Nein = 0)                                           | 10%        | Nextcloud (100), WeChat (0)                 |

#### **B. Digitale Projekte/Standards**
| Kriterium                     | Metriken                                                                                     | Gewichtung | Beispiel                                  |
|-------------------------------|---------------------------------------------------------------------------------------------|------------|-------------------------------------------|
| **Trägerschaft**              | - Wer trägt das Projekt? (Öffentliche Träger = 100, Privat/USA/CN = 20)                        | 30%        | Technologie-Landkarte (100), AWS GovCloud (20)|
| **Offenheit**                 | - Sind Spezifikationen offen? (Ja = 100, Nein = 0)                                           | 20%        | ODF (100), DOCX (0)                       |
| **Implementierungs-Kontrolle**| - Wer kontrolliert die Implementierung? (EU/OS = 100, Closed = 0)                             | 20%        | Matrix (100), Zoom (0)                    |
| **Abhängigkeiten**            | - Nutzt das Projekt souveräne Technologien? (Ja = 100, Nein = 0)                               | 15%        | eIDAS (100), FedRAMP (50)                  |
| **Skalierbarkeit**           | - Kann das Projekt unabhängig skaliert werden? (Ja = 100, Nein = 0)                          | 10%        | X-Road (100), Login.gov (50)               |
| **Community-Beteiligung**     | - Kann die Community mitgestalten? (Ja = 100, Nein = 0)                                      | 5%         | Mastodon (100), Facebook (0)               |

---
### **2. Berechnung des Souveränitäts-Scores**
- **Formel**:
  ```
  Souveränitäts-Score = Σ (Metrik-Wert × Gewichtung)
  ```
  - **Beispiel React (USA, MIT-Lizenz, AWS-Hosting)**:
    - Entwickler-Herkunft: 20 × 0.25 = **5**
    - Lizenzmodell: 100 × 0.20 = **20**
    - Hosting: 10 × 0.20 = **2**
    - Abhängigkeiten: 50 × 0.15 = **7.5** (Annahme: 50% EU-Deps)
    - Community-Kontrolle: 100 × 0.10 = **10** (Open-Source)
    - Compliance: 0 × 0.10 = **0** (kein GDPR-Fokus)
    - **Gesamt-Score = 44.5/100** (niedrige Souveränität).

- **Beispiel Nextcloud (DE, AGPL, EU-Hosting)**:
  - Entwickler-Herkunft: 100 × 0.25 = **25**
  - Lizenzmodell: 100 × 0.20 = **20**
  - Hosting: 100 × 0.20 = **20**
  - Abhängigkeiten: 90 × 0.15 = **13.5**
  - Community-Kontrolle: 100 × 0.10 = **10**
  - Compliance: 100 × 0.10 = **10**
  - **Gesamt-Score = 98.5/100** (hohe Souveränität).

---
### **3. Visualisierung des Scores**
#### **A. Einzelne Technologie/Projekt**
- **Score-Anzeige**:
  - **Zahlenwert** (0–100) + **Farbskala** (grün = 100, rot = 0).
  - **Detailaufschlüsselung** per Donut-Chart (z. B. "20% durch US-Herkunft").
  - **Vergleichsmöglichkeit** mit Alternativen (z. B. "React vs. Vue").

#### **B. Gesamt-Stack (z. B. Technologie-Landkarte)**
- **Stack-Zusammensetzung**:
  - Liste aller Komponenten (Frameworks, Bibliotheken, Dienste) mit **individuellen Scores**.
  - **Gesamt-Score des Stacks** = Durchschnitt aller Einzel-Scores (gewichtet nach Relevanz).
- **Abhängigkeitsgraph**:
  - Visualisierung der **kritischen Abhängigkeiten** (z. B. "Dieser Stack nutzt 3 US-Komponenten mit Score <50").

#### **C. Globale Karte (wie ElectricityMap)**
- **Länder-Score**:
  - Durchschnittlicher Souveränitäts-Score aller **nationalen Tech-Stacks/Projekte**.
  - **Farbskala** auf Weltkarte (DE = grün, USA = rot).
- **Filter**:
  - Nach Technologie (z. B. "Cloud", "Identitätsmanagement").
  - Nach Projekttyp (z. B. "E-Government", "Gesundheits-IT").

---
### **4. Datenquellen & Automatisierung**
| Datenquelle               | Beispiel                                                                 | Tool/API                          |
|----------------------------|--------------------------------------------------------------------------|-----------------------------------|
| **GitHub**                 | Lizenz, Herkunft der Commits, Abhängigkeiten (package.json)             | GitHub API                       |
| **NPM/CRAN/PyPI**          | Abhängigkeiten von Bibliotheken                                         | NPM API, Libraries.io            |
| **Dokumentation**   | Offizielle Stack-Dokumentation (z. B. technische Standards)                | Spezifikationen                         |
| **Cloud-Anbieter**         | Hosting-Standorte (z. B. AWS vs. OVH)                                    | Cloud-Harmonize                  |
| **Compliance-Datenbanken** | GDPR/ISO-Zertifizierungen                                                | ENISA, BSI                       |
| **Community-Feedback**     | Nutzer melden Fehler/Korrekturen                                         | GitHub Issues, Discord            |

---
### **5. MVP-Umsetzung (Technischer Stack)**
| Komponente               | Empfohlene Tools                                                                 |
|---------------------------|---------------------------------------------------------------------------------|
| **Backend**               | Python (FastAPI) oder Node.js (Express)                                         |
| **Datenbank**             | PostgreSQL (strukturierte Daten) + Neo4j (Abhängigkeitsgraphen)               |
| **Frontend**              | React.js + D3.js (für interaktive Scores/Karten)                                |
| **Hosting**               | **EU-basiert**: Hetzner Cloud oder OVH (für maximale Souveränität).              |
| **CI/CD**                 | GitHub Actions (automatisierte Score-Berechnungen).                            |
| **Datenpipeline**         | Apache Airflow (für regelmäßige Updates der Scores).                          |

---
### **6. Beispiel: Technologie-Stack Analyse**
| Komponente               | Technologie          | Souveränitäts-Score | Begründung                                                                 |
|---------------------------|----------------------|---------------------|-----------------------------------------------------------------------------|
| **Cloud-Infrastruktur**   | Open Telekom Cloud   | 95                   | EU-Hosting, BSI-zertifiziert.                                               |
| **Identitätsmanagement**  | eIDAS                | 100                  | EU-Standard, öffentlich kontrolliert.                                      |
| **Datenbank**             | PostgreSQL (EU-Host) | 100                  | Open-Source, selbst gehostet.                                               |
| **Frontend-Framework**    | SAP UI5              | 80                   | DE-Herkunft, aber proprietäre Elemente.                                    |
| **KI-Modelle**           | Hugging Face (EU)    | 70                   | Open-Source, aber Abhängigkeit von US-GPUs (NVIDIA).                       |
| **Gesamt-Score**          |                      | **89/100**           | **Hohe Souveränität**, aber Verbesserungspotenzial bei KI/Hardware.        |

---
### **7. Nächste Schritte (Priorisiert)**
| Schritt                          | Tool/Link               | Zeitaufwand | Verantwortlich |
|----------------------------------|-------------------------|-------------|----------------|
| **Scoring-Modell finalisieren**  | Google Sheets/Excel     | 2 Std.      | Sie            |
| **Datenquellen identifizieren**  | GitHub, NPM, BSI-Dokumente | 4 Std.      | Sie            |
| **MVP-Prototyp (Frontend)**      | React + D3.js           | 8 Std.      | Entwickler    |
| **Backend-Logik implementieren**| Python/FastAPI          | 6 Std.      | Entwickler    |
| **Domain registrieren**          | [Namecheap](https://www.namecheap.com/) | 10 Min.    | Sie            |

---
**Frage an Sie**:
1. Soll ich ein **Canvas mit einem MVP-Design** (Score-Karten + Stack-Details) erstellen?
2. Brauchen Sie ein **Skript zur Automatisierung der Score-Berechnung** (Python/Node.js)?
3. Soll ich **Beispieldaten für 3–5 Stacks** (DE, US, EST) vorbereiten?
