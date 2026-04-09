---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

# Architecture Documentation Index

## Landscape2-ähnliche Übersichtsseite | KoliBri + KERN Theme

**Created:** 2026-04-04  
**Architect:** Claude Code (Level 4)  
**Status:** COMPLETE - Ready for Developer Phase 1b

---

## Documents Overview

### 1. DESIGN_PLAN_MVP.md (51 KB, ~500 Zeilen)

**Das Haupt-Dokument** - Vollständiger UI/UX Design-Plan

**Inhalte:**

- 1. Informations-Architektur (Seiten, Datenstruktur, MVP-Größe)
- 2. Übersichtsseite Layout (Wireframe, Komponenten, Breakpoints, KERN-Colors)
- 3. Such- und Filter-Funktionalität (UX, Filter-Types, Search-Logic)
- 4. Grid/Landkarte-Darstellung (Layout-Pattern, Artikel-Karten, Styling)
- 5. Komponenten-Inventar (KoliBri-Komponenten, Custom Components, Dependencies)
- 6. Datensample & Dummy-Data (TypeScript Interfaces, Sample-Daten, SQL-Extraktion)
- 7. Navigation & Routing (Route-Struktur, Deep-Linking, URL-Sync)
- 8. Styling-Strategie (CSS Custom Properties, KERN-Theme, Responsive CSS)
- 9. Phase-1 MVP Scope (IN SCOPE vs OUT OF SCOPE)
- 10. Implementation-Roadmap (6 Phasen, Developer-Ready)

**Für wen:** Developer (Details), Architect (Review), Product Manager (Scope)  
**Wie lesen:** Komplett durchlesen (3-4 Stunden), dann zur Referenz nutzen

---

### 2. FILE_STRUCTURE_TEMPLATE.md (13 KB, ~350 Zeilen)

**Das Setup-Manual** - Schritt-für-Schritt Implementierungs-Anleitung

**Inhalte:**

- Directory Layout (Exakte Dateistruktur für Phase 1b)
- Phase 1b: SETUP Checkliste (12 konkrete Schritte)
- Phase 1c: Komponenten Implementierungs-Reihenfolge
- Phase 1d: LOGIC Implementierungs-Reihenfolge
- Deployment / Build
- FAQ für Developer
- Hinweise für QA (Phase 1e)

**Für wen:** Developer (primär), DevOps/QA (Deployment-Teil)  
**Wie lesen:** Schritt-für-Schritt abarbeiten, Checklist abhaken

---

### 3. ARCHITECT_SUMMARY.md (12 KB, ~400 Zeilen)

**Die Executive Brief** - Zusammenfassung für Stakeholder

**Inhalte:**

- Status & Deliverables
- The Big Picture (Was wird gebaut?)
- Architecture Decisions (Warum KoliBri? Warum Zustand? Warum CSS Custom Properties?)
- Design System (KERN-Theme, Responsive, Accessibility)
- File Structure (Übersicht, nicht Detail)
- Implementation Timeline (1 Woche MVP)
- Key Numbers (Artikel, Kategorien, Komponenten, etc.)
- Developer Entry Point (Wo fängt Developer an?)
- Success Criteria (Wann ist MVP fertig?)
- Risks & Mitigations
- Phase 2+ Roadmap
- Technical Stack Summary
- Handoff Checklist

**Für wen:** Product Manager, Tech Lead, Stakeholder, Developer (Überblick)  
**Wie lesen:** Komplett (1 Stunde), dann Bookmark halten für Review-Meetings

---

### 4. ARCHITECTURE_INDEX.md (diese Datei)

**Das Navigation Hub** - Überblick über alle Dokumente

---

## Quick Start für Developer

**Reihenfolge zum Anfangen:**

1. **10 min:** Lies **ARCHITECT_SUMMARY.md** (Überblick)
2. **30 min:** Lies **DESIGN_PLAN_MVP.md** Sections 1-4 (Was wird gebaut?)
3. **2 Std:** Lies **DESIGN_PLAN_MVP.md** Sections 5-8 (Wie wird's gebaut?)
4. **1 Std:** Lies **FILE_STRUCTURE_TEMPLATE.md** komplett
5. **Start:** Folge FILE_STRUCTURE_TEMPLATE.md Phase 1b Checklist
6. **During:** Benutze DESIGN_PLAN_MVP.md als Referenz (Komponenten-Specs)

---

## Quick Start für Architect/Tech Lead

1. **5 min:** Lies **ARCHITECT_SUMMARY.md** komplett
2. **1 Std:** Skim **DESIGN_PLAN_MVP.md** (Sections 2, 5, 9, 10)
3. **30 min:** Review **FILE_STRUCTURE_TEMPLATE.md**
4. **30 min:** Stellt Fragen an Developer vor Phase 1b (siehe FAQ)

---

## FAQ: Welches Dokument für welche Frage?

| Frage                              | Antwort in                                                    |
| ---------------------------------- | ------------------------------------------------------------- |
| "Was bauen wir genau?"             | ARCHITECT_SUMMARY.md + DESIGN_PLAN_MVP.md Section 1           |
| "Wie sieht die UI aus?"            | DESIGN_PLAN_MVP.md Section 2 (Wireframe) + Section 4 (Karten) |
| "Welche Komponenten brauchen wir?" | DESIGN_PLAN_MVP.md Section 5 + FILE_STRUCTURE_TEMPLATE.md     |
| "Wo schreibe ich Code?"            | FILE_STRUCTURE_TEMPLATE.md Directory Layout                   |
| "Was ist die Sortier-Logik?"       | DESIGN_PLAN_MVP.md Section 3.3 + Section 4                    |
| "Welche Farben nutzen wir?"        | DESIGN_PLAN_MVP.md Section 2.4 + Section 8.2                  |
| "Wie starte ich mit Phase 1b?"     | FILE_STRUCTURE_TEMPLATE.md Phase 1b Checkliste                |
| "Was ist in MVP, was nicht?"       | DESIGN_PLAN_MVP.md Section 9                                  |
| "Timeline für MVP?"                | ARCHITECT_SUMMARY.md Technical Timeline                       |
| "Was sind die Risiken?"            | ARCHITECT_SUMMARY.md Risks & Mitigations                      |

---

## Key Decision Points

Diese Architecture basiert auf folgenden Entscheidungen:

### 1. **Framework: React + React Router**

**Entscheidung:** Client-Side SPA mit React Hook Form out, React Router in  
**Grund:** Landscape2 ist ein Single-Page-App Use-Case, nicht ein Form-Builder  
**Dokument:** DESIGN_PLAN_MVP.md Abschnitt 1, ARCHITECT_SUMMARY.md

### 2. **Component Library: KoliBri Web Components**

**Entscheidung:** Nutze @public-ui/react-v19 4.1.2 Komponenten  
**Grund:** Bereits vorhanden, Accessibility + KERN-Theme-Support built-in  
**Dokument:** DESIGN_PLAN_MVP.md Abschnitt 5, ARCHITECT_SUMMARY.md Technical Stack

### 3. **Styling: CSS Custom Properties + UnoCSS (nicht Tailwind)**

**Entscheidung:** Keine zusätzlichen CSS-Frameworks, nur KERN-Theme-Variables  
**Grund:** KoliBri braucht Custom Properties, Tailwind würde kollidieren  
**Dokument:** DESIGN_PLAN_MVP.md Abschnitt 8, ARCHITECT_SUMMARY.md Design System

### 4. **Data: Dummy-Daten, kein API**

**Entscheidung:** Phase 1 nutzt Mock-Daten aus CSV, Phase 2 API  
**Grund:** MVP schneller bauen, API-Integration ist Scope-Expansion  
**Dokument:** DESIGN_PLAN_MVP.md Abschnitt 6, ARCHITECT_SUMMARY.md Phase 2

### 5. **Scope: Nur Übersichtsseite + Such/Filter**

**Entscheidung:** Keine Detail-Pages, kein Dark Mode, keine Pagination  
**Grund:** MVP = Minimal Viable Product, nicht "Alles machen"  
**Dokument:** DESIGN_PLAN_MVP.md Abschnitt 9, ARCHITECT_SUMMARY.md Success Criteria

---

## Artifact Checklist

**Was wurde geliefert:**

- [x] **DESIGN_PLAN_MVP.md**
  - [x] 10 Sektionen (Architecture)
  - [x] Wireframes (ASCII-Diagramme)
  - [x] Komponenten-Hierarchie
  - [x] TypeScript Interfaces
  - [x] Sample-Dummy-Daten
  - [x] KERN CSS Variables
  - [x] Responsive Design-Specs
  - [x] Filter-Logik (Code-Snippet)
  - [x] Routing-Plan
  - [x] MVP Scope Definitionen

- [x] **FILE_STRUCTURE_TEMPLATE.md**
  - [x] Exakte Directory-Struktur
  - [x] Phase 1b Setup Checkliste (12 Schritte)
  - [x] Komponenten-Reihenfolge (Prioritäten)
  - [x] Logic Implementierungs-Reihenfolge
  - [x] FAQ für Developer
  - [x] QA Checklist

- [x] **ARCHITECT_SUMMARY.md**
  - [x] Executive Overview
  - [x] Architecture Decisions (Why)
  - [x] Technical Stack
  - [x] Implementation Timeline
  - [x] Success Criteria
  - [x] Risks & Mitigations
  - [x] Phase 2+ Roadmap
  - [x] Handoff Checklist

- [x] **ARCHITECTURE_INDEX.md** (diese Datei)
  - [x] Navigation zwischen Dokumenten
  - [x] Quick Start Guides
  - [x] FAQ (Welches Dokument für welche Frage?)

---

## Document Sizes & Read Times

| Dokument                   | Größe     | Zeilen    | Read Time       |
| -------------------------- | --------- | --------- | --------------- |
| DESIGN_PLAN_MVP.md         | 51 KB     | ~500      | 3-4 Stunden     |
| FILE_STRUCTURE_TEMPLATE.md | 13 KB     | ~350      | 1-1.5 Stunden   |
| ARCHITECT_SUMMARY.md       | 12 KB     | ~400      | 1 Stunde        |
| ARCHITECTURE_INDEX.md      | 8 KB      | ~250      | 15 Minuten      |
| **TOTAL**                  | **84 KB** | **~1500** | **5-7 Stunden** |

**Total Read Time:** Ein Developer braucht ~5-7 Stunden zum Durchlesen, dann kann er code.

---

## Version History

| Version | Date       | Changes                           |
| ------- | ---------- | --------------------------------- |
| 1.0     | 2026-04-04 | Initial Release - All 4 documents |

---

## Stakeholder Signoff

| Role      | Name        | Date       | Status      |
| --------- | ----------- | ---------- | ----------- |
| Architect | Claude Code | 2026-04-04 | ✓ APPROVED  |
| Developer | (awaiting)  | TBD        | ⏳ TO START |
| Tech Lead | (review)    | TBD        | ⏳ PENDING  |
| Product   | (review)    | TBD        | ⏳ PENDING  |

---

## Next Steps

### For Architect (Claude Code)

- [x] Write DESIGN_PLAN_MVP.md
- [x] Write FILE_STRUCTURE_TEMPLATE.md
- [x] Write ARCHITECT_SUMMARY.md
- [ ] Present to Tech Lead
- [ ] Answer Developer questions (before Phase 1b)

### For Tech Lead

- [ ] Review all 4 documents (target: ~2 hours)
- [ ] Approve scope & architecture
- [ ] Answer Developer questions (if Architect unavailable)
- [ ] Schedule kickoff with Developer

### For Developer

- [ ] Read ARCHITECT_SUMMARY.md (1 hour)
- [ ] Read DESIGN_PLAN_MVP.md (3-4 hours)
- [ ] Read FILE_STRUCTURE_TEMPLATE.md (1-1.5 hours)
- [ ] Ask questions (before starting code)
- [ ] Start Phase 1b Setup (follow FILE_STRUCTURE_TEMPLATE.md)
- [ ] Target: MVP live in ~1 week

### For Product / Stakeholder

- [ ] Skim ARCHITECT_SUMMARY.md (30 min)
- [ ] Review MVP Scope (DESIGN_PLAN_MVP.md Section 9)
- [ ] Review Success Criteria (ARCHITECT_SUMMARY.md)
- [ ] Approve/adjust Phase 2 Roadmap (ARCHITECT_SUMMARY.md Phase 2+)

---

## Support & Questions

### If Developer has questions during Phase 1b:

1. **Check FAQ** in FILE_STRUCTURE_TEMPLATE.md
2. **Check relevant Section** in DESIGN_PLAN_MVP.md
3. **Ask Tech Lead** (Architect is on standby)

### Common Questions pre-answered:

See DESIGN_PLAN_MVP.md Abschnitt 10.2 "Developer-Fragen vorab"

---

## Success Metrics

**When can we say "MVP is done"?**

See ARCHITECT_SUMMARY.md Section "Success Criteria" (Funktionalität, Design, Accessibility, Code Quality)

---

## Appendix: File Locations

All files are in:

```
/Users/moppitz/Workspace/kolibri/themes/accessible-d-stack/
```

- `DESIGN_PLAN_MVP.md` ← Main architecture document
- `FILE_STRUCTURE_TEMPLATE.md` ← Developer setup guide
- `ARCHITECT_SUMMARY.md` ← Executive brief
- `ARCHITECTURE_INDEX.md` ← This file (navigation)

---

**Architecture Phase Complete ✓**  
**Waiting for Developer Phase 1b to start**

---

_Last Updated: 2026-04-04_  
_Architect: Claude Code (Level 4)_  
_Status: READY FOR DEVELOPER HANDOFF_
