---
focus: scoringExplained
title: Warum hat MySQL Server nur 55 Punkte — und PostgreSQL deutlich mehr?
summary: MySQL ist technisch souverän (88 Punkte), aber in nur einem einzigen Stack vertreten. Da 40 % des Overall Score aus der Adoption stammen, fällt das Ergebnis entsprechend aus.
---

import ScoringTables from '../reports/postgresql-vs-mysql-scoring.md';

# Warum hat MySQL Server nur 55 Punkte — und PostgreSQL deutlich mehr?

> **Kurzfazit:** Der Unterschied liegt nicht hauptsächlich im Sovereignty Score, sondern in der Adoption: PostgreSQL ist in 14 Stacks vertreten, MySQL Server nur in einem.

Wer die Landscape-Rangliste zum ersten Mal sieht, wundert sich oft: Beide Datenbanken sind Open Source, selbst hostbar, gut dokumentiert — warum ist der Score so verschieden? Die Antwort liegt im Zusammenspiel aus **Sovereignty Score**, **Adoption Score** und **Popularity Metrics**.

---

<ScoringTables />

---

## Die Rechnung

**MySQL Server** ist nur in 1 Stack vertreten und hat keine Popularity Metrics hinterlegt:

- Sovereignty: 60 % × 88 = **52,8 Punkte**
- Sovereign Adoption: 25 % × ≈5 = **≈1,3 Punkte** (fast keine Stack-Abdeckung)
- Adoption: 15 % × ≈5 = **≈0,8 Punkte**
- **Overall ≈ 55**

**PostgreSQL** ist in 14 Stacks vertreten und hat Popularity Metrics (24k Stars, 5,2 Mio. Docker Pulls/Woche):

- Sovereignty: 60 % × 90 = **54 Punkte**
- Sovereign Adoption: 25 % × ≈90 = **≈22 Punkte** (breite, internationale Stack-Abdeckung)
- Adoption + Popularity: 15 % × ≈95 = **≈14 Punkte**
- **Overall ≈ 90**

Der Sovereignty-Anteil allein (54 vs. 53) erklärt also kaum etwas. Die 35 Punkte Abstand kommen fast vollständig aus Adoption und Popularity.

---

## Fazit & Handlungsoptionen

Der Score von 55 ist kein Urteil über die technische Qualität von MySQL — es ist eine Messung der tatsächlichen Verbreitung in den dokumentierten Gov-Stacks.

Wer MySQL in seinem Stack nutzt, sollte es dort eintragen. Jede weitere Stack-Aufnahme erhöht den Adoption Score automatisch und damit den Overall Score.

> "Der Score misst nicht, ob ein Tool gut ist — sondern wie verbreitet und souverän es in öffentlichen digitalen Stacks eingesetzt wird."

---

## Glossar

- **Sovereignty Score:** Bewertet, wie stark Nutzer:innen und Betreiber unabhängig von Dritten bleiben können (0–100).
- **Adoption Score:** Normalisierter Wert für die Stack-Abdeckung — wie viele dokumentierte Gov-Stacks nutzen dieses Tool?
- **Sovereign Adoption Score:** Wie der Adoption Score, aber wird nur für Tools berechnet, deren eigener Sovereignty Score ≥ 61 ist. Souveränitätsschwache Tools erhalten hier immer 0.
- **Overall Score:** Gewichtete Kombination aller drei Scores (60/25/15).
