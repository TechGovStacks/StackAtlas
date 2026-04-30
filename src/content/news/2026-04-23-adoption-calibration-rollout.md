---
focus: scoringExplained
featured: true
tags: ['scoring', 'adoption', 'update']
title: 'Scoring-Update: Adoption-Kalibrierung jetzt in Doku, Konzeption und UI sichtbar'
summary: 'Das optimierte Adoption-Scoring ist jetzt konsistent dokumentiert und im Stack-Kontext sichtbar – inklusive robuster Normalisierung, Low-Coverage-Rollenlift und Maintainer/Contributor-Kontext im Overall-Score.'
---

# Scoring-Update: Adoption-Kalibrierung jetzt durchgängig umgesetzt

Wir haben das Adoption-Scoring konsolidiert und in **Doku, Konzeption und UI** nachgezogen.

## Was wurde fachlich vereinheitlicht?

1. **Robuste Normalisierung statt reiner Max-Norm**
   - Adoption wird über einen robusten Nenner normalisiert (Perzentil + Anchor), damit einzelne Ausreißer nicht alle anderen Items übermäßig zusammendrücken.

2. **Low-Coverage-Rollenlift**
   - Bei geringer direkter Coverage werden `maintainer` und `contributor` bewusst aufwertend/neutral-positiv berücksichtigt.

3. **Soft Floor für hohe Souveränität**
   - Sehr souveräne Items mit nicht-null Adoption werden nicht mehr unverhältnismäßig tief eingestuft.

4. **Stack-Kontext im Overall sichtbar**
   - Im aktiven Stack-Kontext wird der Overall-Score kontextualisiert berechnet.
   - Damit ist z. B. sichtbar, dass `maintainer`-Verantwortung nicht wie ein reiner „Nicht-Verbreitet“-Malus wirkt.

## Warum ist das wichtig?

Damit vermeiden wir das Missverständnis:

> „Wenn ein Item selten global vorkommt, sollte man es besser nicht nutzen.“

Genau dieses Signal wollten wir entschärfen: geringe globale Häufigkeit bleibt informativ, aber **Ownership und bewusste Investition** werden im Stack-Kontext klar positiv berücksichtigt.

## Ergebnis

Die Scoring-Logik, Konzeptdokumente und erklärende Doku sind jetzt konsistent auf dem gleichen Stand.
