---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

# Quick Reference Card

## Landscape2-ähnliche Übersichtsseite MVP

**Print this out & keep it handy while coding**

---

## At-A-Glance Overview

**What:** Interaktive Ökosystem-Landkarte mit 70-80 Tech-Stacks, 7 Kategorien  
**Tech:** React + React Router + KoliBri + KERN Theme  
**Timeline:** 1 Woche (Phase 1a-1f)  
**Status:** Architecture Phase ✓ DONE, Ready for Development

---

## The 3 Routes

| Route           | Purpose                           | Components                                    |
| --------------- | --------------------------------- | --------------------------------------------- |
| `/`             | Homepage mit allen Artikeln       | Hero + CategoryGrid + SearchBar + ArticleGrid |
| `/category/:id` | Gefilterte Ansicht nach Kategorie | CategoryHeader + ArticleGrid                  |
| `/search?q=...` | Such-Ergebnisse mit URL-Sync      | SearchBar + ArticleGrid + Stats               |

---

## The 7 Categories (mit Farben & Icons)

| ID            | Name          | Color            | Icon    | Articles |
| ------------- | ------------- | ---------------- | ------- | -------- |
| infrastruktur | Infrastruktur | #c5192d (Rot)    | server  | 12       |
| plattform     | Plattform     | #003d82 (Blau)   | package | 11       |
| betrieb       | Betrieb       | #00883d (Grün)   | sliders | 10       |
| zugang        | Zugang        | #f39c12 (Orange) | globe   | 9        |
| entwicklung   | Entwicklung   | #8e44ad (Lila)   | code    | 9        |
| sicherheit    | Sicherheit    | #6f4a3a (Braun)  | shield  | 8        |
| ki            | KI            | #5b2c6f (Indigo) | brain   | 11       |

---

## The 4 Filter Types

1. **Search (Text)** → Real-time, Debounced 300ms
2. **Category** → Multi-Select Dropdown
3. **Maturity** → Checkbox (Sandbox, Incubating, Graduated)
4. **Sort** → Dropdown (Name, Category, Recent, Popular)

---

## The 5 Core Hooks

```typescript
useFilters(); // Filter state management
useSearch(); // Search debouncing
usePagination(); // Pagination logic
useFilterSync(); // URL-Sync (Deep-linking)
useArticles(); // Article fetching (mock for Phase 1)
```

---

## The 12-15 Custom Components

**Layout:** Header, Footer, MainLayout  
**Sections:** HeroSection, CategoryPreview  
**Search/Filter:** SearchBar, FilterSidebar, FilterDrawer  
**Article:** ArticleCard, ArticleGrid, NoResults  
**Common:** Badge, Tag, LoadingSpinner

---

## The 10 KoliBri Components Used

```
KolNav              → Header Navigation
KolHeading          → Titles & Headlines
KolCard             → Article Cards
KolButton           → CTAs & Actions
KolButtonLink       → Link Buttons
KolInputText        → Search Box
KolSelect           → Dropdowns
KolInputCheckbox    → Multi-Select Filters
KolForm             → Form Wrapper (if needed)
KolLink             → Links
```

---

## Responsive Breakpoints

| Device  | Breakpoint  | Columns | Layout            |
| ------- | ----------- | ------- | ----------------- |
| Mobile  | < 600px     | 2       | Stack everything  |
| Tablet  | 600-1023px  | 3       | Inline filters    |
| Desktop | 1024-1439px | 4       | Sticky filter bar |
| Wide    | ≥1440px     | 5       | Extra wide grid   |

---

## File Structure (After Phase 1b Setup)

```
src/
├── types/index.ts              ← Article, Category Types
├── data/
│   ├── articles.ts (70-80 items)
│   ├── categories.ts (7 items)
│   ├── subcategories.ts
│   └── tags.ts (~50 items)
├── hooks/                      ← useFilters, useSearch, etc.
├── components/                 ← 12-15 React Komponenten
│   ├── layout/
│   ├── sections/
│   ├── search-filter/
│   ├── article/
│   └── common/
├── pages/                      ← HomePage, CategoryPage, SearchPage
├── styles/
│   ├── theme.css              ← KERN Variables (30+)
│   ├── global.css
│   └── utilities.css
├── utils/
│   ├── filterArticles.ts      ← Core filter logic
│   ├── sorting.ts
│   └── constants.ts
└── App.tsx                    ← React Router Setup
```

---

## KERN CSS Variables (Key Ones)

```css
/* Farben */
--kol-color-primary: #003d82; /* Blau (alle Buttons) */
--kol-color-success: #00883d; /* Grün */
--kol-color-danger: #c5192d; /* Rot */

/* Kategorie-Farben */
--cat-infrastruktur: #c5192d;
--cat-plattform: #003d82;
--cat-betrieb: #00883d;
--cat-zugang: #f39c12;
--cat-entwicklung: #8e44ad;
--cat-sicherheit: #6f4a3a;
--cat-ki: #5b2c6f;

/* Spacing (8px-Raster) */
--spacing-xs: 0.25rem; /* 4px */
--spacing-sm: 0.5rem; /* 8px */
--spacing-md: 1rem; /* 16px */
--spacing-lg: 1.5rem; /* 24px */
--spacing-xl: 2rem; /* 32px */

/* Typographie */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.5rem; /* 24px */
```

---

## Dependencies to Add

```bash
pnpm add react-router-dom zustand
pnpm add -D @types/react-router-dom
```

---

## Phase 1 Timeline (1 Week)

| Phase | Days  | Task                  | Output                      |
| ----- | ----- | --------------------- | --------------------------- |
| 1a    | 1     | Architecture          | ✓ DONE (This Doc)           |
| 1b    | 1-2   | Setup & Foundation    | Projekt-Grundgerüst         |
| 1c    | 2-3   | Layout & Components   | UI sieht aus wie Design     |
| 1d    | 2-3   | Logic & Interactivity | Filter/Search funktionieren |
| 1e    | 1-2   | Polish & Responsive   | Mobile/Tablet/Desktop OK    |
| 1f    | 0.5-1 | Review & Launch       | MVP Live                    |

---

## Success Criteria Checklist

### Functionality

- [ ] Homepage with 70-80 articles
- [ ] Search filters in real-time
- [ ] Category filter works
- [ ] Maturity filter works
- [ ] Reset button works
- [ ] /category/:id route
- [ ] /search?q=... with URL-sync

### Design

- [ ] KERN colors applied
- [ ] Responsive (Mobile 2Col → Desktop 4Col)
- [ ] Search bar sticky on desktop
- [ ] Card hover effects

### Accessibility

- [ ] Keyboard navigation works
- [ ] Focus rings visible
- [ ] WCAG AA contrast
- [ ] Alt text on images

### Code

- [ ] TypeScript strict mode
- [ ] No console errors
- [ ] ESLint/Prettier clean
- [ ] Lighthouse ≥80

---

## Common Questions Answered

**Q: How many articles in Phase 1?**
A: 70-80 items (OK for 1 page, Phase 2 adds pagination)

**Q: Dark mode?**
A: Phase 1: No. Phase 2: CSS ready, just toggle.

**Q: API or mock data?**
A: Phase 1: Mock data. Phase 2: Real API with axios.

**Q: Pagination?**
A: Phase 1: No. Phase 2: Add pagination or infinite scroll.

**Q: Article detail pages?**
A: Phase 1: No. Phase 2: /article/:id route.

**Q: State management: Redux?**
A: No. Use Zustand (lighter) + URL-sync.

**Q: Tailwind CSS?**
A: No. Use UnoCSS + CSS Custom Properties (avoid conflicts with KoliBri).

---

## Development Stack

```
Frontend Framework: React 18.3.1
Routing: React Router v6
Component Library: KoliBri v4.1.2
State Management: Zustand
Styling: UnoCSS + CSS Custom Properties
Build: Vite 6.4.1
Language: TypeScript 5.9.3 (strict mode)
```

---

## Key Files to Know

| File                        | Purpose                        |
| --------------------------- | ------------------------------ |
| DESIGN_PLAN_MVP.md          | Full architecture (Reference)  |
| FILE_STRUCTURE_TEMPLATE.md  | Setup guide (For Phase 1b)     |
| ARCHITECT_SUMMARY.md        | Executive brief (For meetings) |
| src/types/index.ts          | Article, Category types        |
| src/utils/filterArticles.ts | Core filter logic              |
| src/styles/theme.css        | KERN CSS variables             |
| src/App.tsx                 | React Router setup             |

---

## Phase 1 Definition

**IN SCOPE:**

- Homepage with grid
- Search + Filter (Kategorie, Maturity)
- Responsive design
- KoliBri + KERN integrated

**OUT OF SCOPE (Phase 2+):**

- Detail pages
- Advanced filters
- Dark mode
- API integration
- Pagination
- Admin panel

---

## When to Hand Off to Phase 2

- [ ] MVP launched & tested
- [ ] Feedback from stakeholders collected
- [ ] Performance metrics baseline established
- [ ] Technical debt documented
- [ ] Phase 2 requirements finalized

---

## Debugging Checklist

| Issue                 | Check                                         |
| --------------------- | --------------------------------------------- |
| KoliBri not rendering | CSS assets copied? Theme registered?          |
| Filters not working   | filterArticles() logic correct? State update? |
| Mobile broken         | Breakpoints in CSS? Grid columns adjust?      |
| Colors wrong          | KERN CSS variables in theme.css?              |
| Search too slow       | Debounce 300ms applied?                       |
| Deep-links broken     | URL params read correctly?                    |

---

## Resources

- DESIGN_PLAN_MVP.md (full specs)
- FILE_STRUCTURE_TEMPLATE.md (setup steps)
- ARCHITECT_SUMMARY.md (overview)
- ARCHITECTURE_INDEX.md (navigation)
- data/\*.csv (raw data to convert)

---

**Print this page and tape it to your monitor!**

**For details, always refer back to the main architecture documents.**

---

_Version 1.0 | Created 2026-04-04 | Architect: Claude Code_
