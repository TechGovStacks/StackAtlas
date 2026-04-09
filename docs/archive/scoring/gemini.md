---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

Ein solcher „Souveränitäts-Score“ für Software-Komponenten (Frameworks, Bibliotheken, Dependencies) und digitale Projekte ist ein hochaktueller Ansatz. Um die wahre digitale Souveränität jenseits von reinem Hosting zu bewerten, muss der Score tief in die Software-Lieferkette und die Entwickler-Community blicken.
Hier ist ein Konzept für ein Bewertungs-Framework (z. B. von 0 bis 100 Punkten), das du in die Backend-Logik deiner App integrieren kannst. Es unterteilt sich in vier Hauptdimensionen:
1. Abhängigkeiten & Lieferkette (Supply Chain Sovereignty) – Gewichtung: 30 %
Diese Dimension misst, wie abhängig ein Framework oder ein digitales Projekt von externen, potenziell kritischen Bausteinen ist.
 * Lizenzierung der Dependencies: Sind die Kernbibliotheken unter einer echten Open-Source-Lizenz (OSI-approved) veröffentlicht, die eine freie Weiterverwendung und Modifikation ohne rechtlichen Vendor-Lock-in garantiert?.
 * Geografische Risiken: Wie hoch ist der Anteil an Code-Maintainern oder kritischen Modulen, die der Jurisdiktion von Drittstaaten (z. B. dem US CLOUD Act) unterliegen?.
 * Veraltete/Verwaiste Pakete: Enthält der Stack Abhängigkeiten, die von ihren Entwicklern als veraltet („deprecated“) markiert wurden oder nicht mehr gewartet werden? Dies stellt ein massives Sicherheitsrisiko dar.
 * Transparenz-Tools: Werden Metriken wie OpenSSF Scorecards oder SLSA (Supply chain Levels for Software Artifacts) genutzt, um die Integrität der Lieferkette maschinenlesbar nachzuweisen?.
2. Entwickler-Ökosystem & Innere Kompetenz (Operational Sovereignty) – Gewichtung: 30 %
Digitale Souveränität bedeutet auch, dass intern genügend Know-how vorhanden ist, um ein System bei Ausfall des Hauptentwicklers selbstständig weiterzubetreiben.
 * Der "Elephant Factor": Dies ist eine etablierte Metrik (z. B. aus dem CHAOSS-Projekt), die misst, wie die Arbeit in einem Open-Source-Projekt verteilt ist. Ein Elephant Factor von 1 bedeutet, dass ein einziges Unternehmen mehr als 50 % der Code-Commits kontrolliert. Zieht sich dieses Unternehmen zurück, ist das Projekt gefährdet. Ein gesunder Score erfordert einen Faktor von mindestens 2.
 * Aktive Organisationen: Wie viele unterschiedliche, voneinander unabhängige Organisationen tragen aktiv zur Pflege der Bibliothek oder des Frameworks bei? (Sollte im Idealfall ≥ 3 sein).
 * Fork- & Build-Fähigkeit: Kann das interne Team das Projekt jederzeit „forken“ (abspalten) und die gesamte Software aus dem Quellcode komplett selbst kompilieren und bereitstellen, ohne auf externe proprietäre Build-Server angewiesen zu sein?.
3. Sicherheit & Code-Qualität (Security Sovereignty) – Gewichtung: 20 %
Hier lassen sich die Metriken anwenden, die beispielsweise das deutsche Zentrum für Digitale Souveränität (ZenDiS) für seine openCode-Plattform nutzt.
 * Schwachstellen (CVEs): Das Projekt und seine Abhängigkeiten dürfen in den letzten 6 Monaten keine bekannten, ungeschlossenen kritischen Schwachstellen (CVSS-Score ≥ 7.0) aufweisen.
 * Review-Quote: Wurden bei der Entwicklung des Frameworks mindestens 75 % der Code-Änderungen (Merge Requests) durch einen unabhängigen Maintainer geprüft (Code Review)?.
 * Integrität der Releases: Sind mindestens 80 % der veröffentlichten Software-Tags kryptografisch signiert, um Manipulationen (z.B. eingeschleusten Schadcode) auszuschließen?.
 * Automatisierung: Gibt es eine aktive CI/CD-Pipeline, die den Code regelmäßig und automatisiert auf Fehler testet?.
4. Architektur & Standards (Technological Sovereignty) – Gewichtung: 20 %
Diese Dimension bewertet, wie stark ein Projekt an ein bestimmtes Ökosystem gekettet ist.
 * Offene Schnittstellen: Nutzt das Projekt standardisierte, offene APIs (z. B. OpenAPI 3, REST, GraphQL), sodass Module bei Bedarf jederzeit gegen andere europäische oder quelloffene Alternativen ausgetauscht werden können?.
 * Datenportabilität: Bietet die Architektur einfache Export- und Importfunktionen, um Nutzerdaten verlustfrei und in Standardformaten (wie JSON oder XML) zu migrieren?.
So funktioniert das Scoring in der App
Deine App könnte diese Metriken über GitHub/GitLab-APIs automatisiert abfragen (z. B. Anzahl der Commits pro Firma für den Elephant Factor, Anzahl der offenen kritischen CVEs, Vorhandensein von CI-Pipelines).
Daraus berechnet sich ein Gesamtwert (z. B. SEAL-Score von 1 bis 4 in Anlehnung an das EU Cloud Sovereignty Framework).
 * Score A (z. B. >90 Punkte): Maximale Souveränität. Das Framework hat offene Standards, keine kritischen Abhängigkeiten von einzelnen US-Konzernen, eine dezentrale Maintainer-Basis und hohe Sicherheitsstandards.
 * Score F (z. B. <40 Punkte): Souveränitäts-Risiko. Das Projekt nutzt zwar Open-Source-Teile, ist aber stark von einer einzigen kommerziellen Entität abhängig (Vendor-Lock-in durch die Hintertür) und lässt sich ohne deren proprietäre Tools kaum selbst kompilieren oder warten.
