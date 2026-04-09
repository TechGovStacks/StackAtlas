---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/DOCS_HUB.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

# Architecture Summary: Landscape2-ähnliche Übersichtsseite MVP

## Executive Brief für Stakeholder & Developer

---

## Status: LEVEL 4 ESCALATION ✓ COMPLETE

**Architecture Phase:** FINISHED  
**Blueprint Status:** DEVELOPER-READY  
**Date:** 2026-04-04  
**Deliverables:** 3 Dokumente + Design-Plan

---

## THE BIG PICTURE

### Was wird gebaut?

Eine **interaktive Ökosystem-Landkarte** mit 70-80 Technologien, gruppiert in 7 Kategorien (Infrastruktur, Plattform, Betrieb, Zugang, Entwicklung, Sicherheit, KI).

**Kernfunktion:** User können durch Suche + Filter ihre interessanten Tech-Stacks explorieren.

### Warum diese Architektur?

1. **KoliBri Web Components** = Accessible by Default (WCAG AA)
2. **KERN Theme** = Deutsches Government Design (Vertrauenswürdig, Standard)
3. **React + React Router** = Client-Side SPA (schnell, responsive)
4. **CSS Custom Properties** = Wartbar, erweiterbar (Dark Mode später einfach)
5. **Mobile-First Responsive** = 2 Col Handy → 4 Col Desktop

### MVP Scope

**IN:** Suche, Filter, Kategorien, Responsive Layout  
**OUT:** Detail-Pages, Advanced Filters, Dark Mode (Phase 2+)

---

## ARCHITECTURE DECISIONS

### 1. Component Library: KoliBri v4.1.2 (Web Components)

**Warum?**

- Bereits im Projekt vorhanden (@public-ui/react-v19)
- Framework-agnostisch (funktioniert mit React/Vue/Vanilla)
- Built-in Accessibility (WCAG AA)
- KERN-Theme-kompatibel

**Genutzte Komponenten:**

- KolNav (Header Navigation)
- KolButton, KolButtonLink (CTAs)
- KolCard (Artikel-Karten)
- KolInputText, KolSelect, KolInputCheckbox (Filter)
- KolForm (wenn nötig)

### 2. State Management: Zustand (nicht Redux)

**Warum?**

- Filter-State ist lokal (nicht global)
- Zustand = leicht & schnell zu laden
- URL-Sync ersetzt viel Boilerplate

**Alternativen überlegt:**

- ❌ Redux: Overkill für MVP
- ❌ Context API: Re-render-Issues bei vielen Filter-Changes
- ✓ Zustand: Perfekt für Filter-State

### 3. Styling: CSS Custom Properties + UnoCSS

**Warum?**

- KoliBri erwartet CSS Custom Properties
- UnoCSS bereits im Projekt (unocss.config.ts vorhanden)
- Tailwind würde mit KoliBri kollidieren
- Mobile-First Approach mit @media (min-width)

**KERN-Farbpalette:**

```
Primär: #003d82 (Blau - Government-Standard)
Sekundär: #00883d (Grün - Erfolg)
Danger: #c5192d (Rot - Warnung)
+ 7 Kategorie-Farben (rot, blau, grün, orange, lila, braun, indigo)
```

### 4. Routing: React Router v6

**Routes:**

- `/` = Homepage (Hero + Grid)
- `/category/:id` = Kategorie-Filter
- `/search?q=...&category=...` = Such-Ergebnisse
- `/article/:id` = Detail (Phase 2)

**Deep-Linking:** Filter in URL, shareable Links

### 5. Data Architecture: Dummy-Daten → Phase 2 API

**Phase 1:** TypeScript Interfaces + Mock-Daten (aus CSV konvertiert)  
**Phase 2:** API-Integration (axios/fetch)

**Struktur:**

```
src/data/
├── articles.ts (70-80 Items)
├── categories.ts (7 Items)
├── subcategories.ts (21-28 Items)
└── tags.ts (~50 Items)
```

---

## DESIGN SYSTEM

### KERN Theme Integration

Alle CSS Variablen in `src/styles/theme.css`:

```css
--kol-color-primary: #003d82 (überall blau) --kol-color-success: #00883d (Buttons, Badges) --kol-color-danger: #c5192d (Warnings) --cat-infrastruktur: #c5192d
	(Rot) --cat-plattform: #003d82 (Blau) --cat-ki: #5b2c6f (Indigo)... (7 Kategorien total);
```

### Responsive Breakpoints

```
Mobile:  320px - 2 Spalten
Tablet:  600px - 3 Spalten
Desktop: 1024px - 4 Spalten
Wide:    1440px - 5 Spalten
```

### Accessibility Standards

- WCAG AA Contrast Ratios (überall ≥ 4.5:1)
- Keyboard Navigation (Tab-Order, Focus-Rings)
- Semantic HTML (KoliBri liefert automatisch)
- Alt-Text für Bilder
- Aria-Labels wo nötig

---

## FILE STRUCTURE (AFTER PHASE 1b)

```
src/
├── types/index.ts              (Article, Category, FilterState Types)
├── data/                       (Dummy-Daten, CSV-konvertiert)
│   ├── articles.ts (70-80 Items)
│   ├── categories.ts (7 Items)
│   ├── subcategories.ts
│   └── tags.ts (~50)
├── hooks/                      (State & Logic)
│   ├── useFilters.ts
│   ├── useSearch.ts
│   ├── useFilterSync.ts
│   └── usePagination.ts
├── components/                 (12-15 React Komponenten)
│   ├── layout/ (Header, Footer, MainLayout)
│   ├── sections/ (Hero, CategoryPreview)
│   ├── search-filter/ (SearchBar, FilterSidebar)
│   ├── article/ (ArticleCard, ArticleGrid)
│   └── common/ (Badge, Tag, NoResults)
├── pages/                      (3 Pages: Home, Category, Search)
│   ├── HomePage.tsx
│   ├── CategoryPage.tsx
│   └── SearchPage.tsx
├── styles/                     (CSS + Design Tokens)
│   ├── theme.css (KERN Variables)
│   ├── global.css (Reset + Base)
│   └── utilities.css
├── utils/                      (Business Logic)
│   ├── filterArticles.ts (Core: Filter-Logik)
│   ├── sorting.ts
│   └── constants.ts
└── App.tsx                     (React Router Setup)
```

---

## IMPLEMENTATION TIMELINE

| Phase             | Task                           | Duration     | Output                               |
| ----------------- | ------------------------------ | ------------ | ------------------------------------ |
| 1a                | **Architecture** ✓ DONE        | 1 Tag        | DESIGN_PLAN_MVP.md + Templates       |
| 1b                | Setup & Foundation             | 1-2 Tage     | Projekt-Grundgerüst, lädt fehlerfrei |
| 1c                | Layout & Components            | 2-3 Tage     | UI sieht aus wie Design              |
| 1d                | Logic & Interactivity          | 2-3 Tage     | Filter/Search funktionieren          |
| 1e                | Polish & Responsive            | 1-2 Tage     | Mobile/Tablet/Desktop QA             |
| 1f                | Review & Launch                | 0.5-1 Tag    | MVP Live, Link zum Share             |
| **Phase 1 TOTAL** |                                | **~1 Woche** | **MVP-Produktiv**                    |
| 2                 | Detail-Pages, Advanced Filters | TBD          | Phase 2+ Roadmap                     |

---

## KEY NUMBERS

| Metrik                   | MVP Phase 1            |
| ------------------------ | ---------------------- |
| Artikel                  | 70-80                  |
| Kategorien               | 7                      |
| Subcategories            | 21-28                  |
| Tags                     | ~50                    |
| Pages/Routes             | 3 (+1 Fallback)        |
| Komponenten              | 12-15 React Components |
| KoliBri Komponenten      | ~10                    |
| CSS Custom Properties    | ~30+                   |
| TypeScript Types         | ~5 Core Types          |
| Responsive Breakpoints   | 4                      |
| Search Debounce          | 300ms                  |
| Accessibilities Coverage | WCAG AA                |

---

## DEVELOPER ENTRY POINT

### Für Developer startet hier:

1. **Lese:** `DESIGN_PLAN_MVP.md` (Sections 1-4, 9-10)
2. **Implementiere:** `FILE_STRUCTURE_TEMPLATE.md` Phase 1b Checklist
3. **Code:** Komponenten nach Prioritäten-Reihenfolge (Abschnitt Phase 1c)
4. **Test:** QA-Checklist (Abschnitt Phase 1e)

### Kritische Fragen VOR Code-Start:

- [ ] Artikel-Logos: Statische Dateien oder externe URLs?
- [ ] Icon-Library: Lucide oder Codicon?
- [ ] Pagination: Nötig oder nur Alle auf 1 Seite?
- [ ] API: Wann Phase 2 API-Integration?
- [ ] Dark Mode: Aktivieren oder für Phase 2 warten?

---

## SUCCESS CRITERIA

Developer kann **"MVP ist fertig"** sagen wenn:

### Funktionalität ✓

- [ ] Homepage laden → 70-80 Artikel im Grid
- [ ] Such-Input → Real-time Filter (z.B. "python" zeigt 5+ Python-Items)
- [ ] Kategorie-Filter → nur KI-Items wenn "KI" ausgewählt
- [ ] Maturity-Filter → nur "Graduated" wenn aktiviert
- [ ] Reset-Button → alle Filter löschen
- [ ] /category/:id Route → vorgefilterte Ansicht
- [ ] /search?q=... → Such-Ergebnisse mit URL-Sync
- [ ] Artikel-Karten → zeigen Logo, Name, Desc, Tags, Badges

### Design & UX ✓

- [ ] KERN-Farben sichtbar (Blau, Grün, Rot für Kategorien)
- [ ] Responsive: Mobile (375px) → Tablet (768px) → Desktop (1024px)
- [ ] Artikel-Grid passt sich an (2→3→4 Spalten)
- [ ] Search/Filter-Bar Sticky auf Desktop, Collapsible auf Mobile
- [ ] Karten-Hover-Effect (Scale, Shadow)

### Accessibility ✓

- [ ] Keyboard-Navigation funktioniert (Tab, Enter, Esc)
- [ ] Focus-Rings sichtbar und logisch
- [ ] Contrast WCAG AA (Lighthouse Score ≥80)
- [ ] KoliBri Komponenten nutzen (für Accessibility)
- [ ] Alt-Text für Logos

### Code Quality ✓

- [ ] TypeScript strict mode (keine any)
- [ ] ESLint/Prettier ohne Errors
- [ ] Keine Console-Errors beim Starten
- [ ] React DevTools keine Warnings
- [ ] Performance: Lazy-loading Images, Debounced Search

---

## RISKS & MITIGATIONS

| Risk                                 | Impact                         | Mitigation                                      |
| ------------------------------------ | ------------------------------ | ----------------------------------------------- |
| KoliBri Theme nicht richtig geladen  | Komponenten sehen komisch aus  | CSS Assets kopieren (siehe README)              |
| Zu viele Items auf 1 Seite           | Performance-Probleme           | Phase 1: 70-80 OK, Phase 2: Pagination          |
| Filter-Logic zu komplex              | Bugs bei Kombinationen         | Unittest useFilter Hook, Abschnitt 3.3          |
| KERN-Farben nicht sichtbar           | Design wirkt falsch            | CSS Custom Properties checken, Browser DevTools |
| Mobile-Responsive nicht funktioniert | Looks schiech auf Phone        | Testing auf echtem Handy, nicht nur DevTools    |
| URL-Sync Fehler                      | Deep-Links funktionieren nicht | useFilterSync Hook gut testen                   |

---

## PHASE 2+ ROADMAP (SKIZZIERT)

Nach MVP erfolgreich:

### Phase 2: Enhancement

- [x] Article Detail Pages (/article/:id)
- [x] Advanced Filters (Tags, Subcategories)
- [x] Pagination / Infinite Scroll
- [x] Dark Mode Toggle

### Phase 3: Intelligence

- [ ] Statistics Page (Charts, Trends)
- [ ] Guide/Tutorial Area
- [ ] Search Suggestions/Autocomplete

### Phase 4: Integration

- [ ] Real API (nicht Mock-Daten)
- [ ] User Accounts & Favorites
- [ ] Share & Export (CSV, PDF)
- [ ] Admin Panel (CRUD)

### Phase 5+: Advanced

- [ ] Multi-Language (i18n)
- [ ] Full-Text Search (Elasticsearch)
- [ ] Recommendation Engine
- [ ] Newsletter Integration

---

## TECHNICAL STACK SUMMARY

```
Frontend:
  React 18.3.1 (UI Framework)
  React Router v6 (Client-Side Routing)
  TypeScript 5.9.3 (Type Safety)

Component Library:
  KoliBri v4.1.2 (Web Components)
  @public-ui/react-v19 4.1.2 (React Wrapper)
  @public-ui/theme-default 4.1.2 (Theme, wird durch KERN ersetzt)

State Management:
  Zustand (lightweight, für Filter-State)

Styling:
  UnoCSS 0.65.4 (Utility CSS)
  CSS Custom Properties (KERN Design Tokens)
  SCSS optional (nicht erzwungen)

Form Handling:
  React Hook Form 7.48.0 (nur falls erweiterte Forms nötig)
  Zod 3.25.76 (Validierung, optional)

Build:
  Vite 6.4.1 (Dev Server & Build)
  TypeScript Compiler (tsc)
```

---

## HANDOFF CHECKLIST

Architect übergebe an Developer mit:

- [x] **DESIGN_PLAN_MVP.md** (10 Sektionen, 500+ Zeilen)
- [x] **FILE_STRUCTURE_TEMPLATE.md** (Setup-Anleitung, Scaffold)
- [x] **ARCHITECT_SUMMARY.md** (diese Datei, Executive Brief)
- [x] **Dummy-Daten** vorbereitet (Beispiele aus CSV in Dokumenten)
- [x] **TypeScript Interfaces** definiert (copy-paste ready)
- [x] **KERN CSS Variables** dokumentiert (theme.css template)
- [x] **Komponenten-Reihenfolge** priorisiert (Phase 1c/1d)
- [x] **FAQ & Hinweise** beantwortet

### Developer startet mit:

```bash
# 1. Read Docs
cat DESIGN_PLAN_MVP.md
cat FILE_STRUCTURE_TEMPLATE.md

# 2. Setup
mkdir -p src/{types,data,hooks,components,pages,styles,utils}
pnpm add react-router-dom zustand

# 3. Code
# → Komponenten nach FILE_STRUCTURE bauen
# → Abschnitt 1c/1d Reihenfolge folgen

# 4. Test
pnpm run dev
# → Auf http://localhost:5173 prüfen
```

---

## CONCLUSION

**Ein Developer kann mit dieser Dokumentation sofort anfangen zu coden.**

Die Architecture ist:

- ✓ **Klar:** 3 Dokumente mit genauen Specs
- ✓ **Vollständig:** Types, Daten, Komponenten, Styling alles definiert
- ✓ **Praktisch:** Copy-paste-ready Code-Snippets
- ✓ **Realistic:** 1 Woche für MVP, nicht 3 Monate

**Next Step:** Developer liest FILE_STRUCTURE_TEMPLATE.md, macht Phase 1b Setup, startet Phase 1c Komponenten-Bau.

---

**Architect:** Claude Code (Level 4)  
**Status:** HANDED OFF TO DEVELOPER  
**Version:** 1.0 (2026-04-04)  
**Quality Gate:** ARCHITECT-APPROVED ✓

---

### Appendix: Dokumente Quick-Reference

| Dokument                       | Zweck                          | Leser                      | Länge       |
| ------------------------------ | ------------------------------ | -------------------------- | ----------- |
| **DESIGN_PLAN_MVP.md**         | Vollständiger Architektur-Plan | Developer, Architect       | ~500 Zeilen |
| **FILE_STRUCTURE_TEMPLATE.md** | Setup & Implementation Guide   | Developer                  | ~350 Zeilen |
| **ARCHITECT_SUMMARY.md**       | Executive Brief (dieses Doc)   | Stakeholder, PM, Developer | ~400 Zeilen |

**Gesamte Dokumentation:** ~1250 Zeilen = Developer kann 3-5 Tage lang damit arbeiten, ohne Fragen zu stellen.

---

**Viel Erfolg beim Bauen! 🚀**
