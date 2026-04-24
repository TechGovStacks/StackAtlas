---
status: active
owner: Product Strategy
last_reviewed: 2026-04-09
source_of_truth: docs/BUSINESS_CASE.md
---

# Business Case

## Zielbild

StackAtlas macht digitale Souveraenitaet von Technologie-Stacks sichtbar, vergleichbar und entscheidungsfaehig.

## Problem

- Technologieentscheidungen werden oft nach Bekanntheit, Verfuegbarkeit oder Preis getroffen, nicht nach Souveraenitaet.
- Vergleichbare, belastbare Sicht auf nationale und organisationale Stacks fehlt.
- Konsolidierungs- und Standardisierungspotenziale bleiben dadurch unsichtbar.

## Nutzenversprechen

- Vergleich von Stacks ueber gemeinsame Kriterien.
- Transparente Bewertung von Technologien, Layern und kompletten Stacks.
- Grundlage fuer Beschaffung, Architekturentscheidungen und Governance.

## Zielgruppen

- Oeffentliche Verwaltung und Beschaffung
- Architektur- und Plattformteams
- Governance-, Compliance- und Strategie-Verantwortliche

## MVP

- Vergleichsansicht fuer Stacks
- Souveraenitaets-Score auf Item-Ebene als Grundlage fuer Stack-Scores
- Begruendete Bewertungen mit Evidenz- und Quellenbezug

## Nicht im MVP

- Vollstaendige Procurement-Workflows
- Vollautomatische Scoringentscheidungen ohne Review
- Echtzeit-Abdeckung aller internationalen Stacks

## Fachliches Modell

### Items als Dependencies (Abhängigkeiten)

- **Alle Items sind Dependencies** — Technologien, Standards und Tools, die in hierarchischen Layern organisiert sind.
- Ein Stack besteht aus Items (Dependencies), die er auswählt und zu denen er sich in verschiedenen Rollen committet.
- Die Bewertung erfolgt zuerst auf Item-Ebene und wird spaeter zu Layer- und Stack-Sichten aggregiert.

### Sovereign-Standards als Grundprinzipien

- **Nur Items im Layer "Sovereign-Standards" sind echte Standards** — Offene Standards, Interoperabilitätsprinzipien, Datenschutz und Regulierungsanforderungen.
- Sie sind die Grundlagen, auf denen alle anderen Abhängigkeiten aufgebaut sind.
- Governance-Hinweis: Hinter Foundation-Strukturen koennen relevante Konzerninteressen stehen; bei Bewertungen sollte daher auch die reale Macht- und Finanzierungsstruktur geprueft werden ([Heise-Einordnung](https://www.heise.de/blog/Open-Source-ist-nicht-das-Problem-sondern-sein-Missbrauch-durch-Konzerne-11244125.html)).
- Ein Stack zeigt seine **Verantwortung für Standards** durch die Rolle, die er beim Item annimmt:
  - **maintainer**: Der Stack entwickelt und wartet den Standard mit
  - **contributor**: Der Stack trägt aktiv zur Entwicklung bei
  - **funder**: Der Stack finanziert die Entwicklung
  - **consumer**: Der Stack nutzt den Standard

### Konsolidierungs- und Synergien-Perspektive

- Die Plattform soll nicht nur den Status quo abbilden, sondern auch Synergien und Konsolidierungspotenziale aufzeigen.
- Durch die explizite Modellierung von Abhängigkeiten und Rollen können Stacks erkennen, wo sie gemeinsame Standards und Systeme teilen.

## Scoring-Grundsaetze

- Bewertungsrahmen mit K1-K7
- Evidenzpflicht ueber Quellenklassen Q1-Q6
- Guardrails fuer kritische Kriterien

Das Scoring ist Teil des fachlichen Produkts und nicht nur Implementierungsdetail.

## Differenzierung

- Fokus auf digitale Souveraenitaet statt reinem Featurevergleich
- Nachvollziehbare Bewertung statt Blackbox-Ranking
- Verbindung von Produkt-, Daten- und Governance-Sicht

## Erfolgskriterien

- Nutzer koennen nachvollziehen, warum ein Stack oder Item besser bewertet wird.
- Unterschiede zwischen Stacks sind fachlich erklaerbar.
- Produktentscheidungen und technische Architektur bleiben sauber getrennt dokumentiert.
