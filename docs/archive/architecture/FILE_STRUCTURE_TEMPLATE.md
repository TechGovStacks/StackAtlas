---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/DOCS_HUB.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

# File Structure Template für Developer Phase 1b

Basierend auf DESIGN_PLAN_MVP.md - Diese Vorlage zeigt die exakte Dateistruktur für Phase 1.

## Directory Layout (nach Phase 1b Setup)

```
accessible-d-stack/
├── src/
│   ├── types/
│   │   └── index.ts                    # Alle TypeScript Interfaces (Article, Category, etc.)
│   │
│   ├── data/
│   │   ├── articles.ts                 # Dummy-Artikel (70-80 Items aus CSV)
│   │   ├── categories.ts               # 7 Kategorien
│   │   ├── subcategories.ts            # Subcategories pro Kategorie
│   │   └── tags.ts                     # ~50 Tags
│   │
│   ├── hooks/
│   │   ├── useFilters.ts               # Filter-State Management
│   │   ├── useSearch.ts                # Search Debouncing
│   │   ├── usePagination.ts            # Pagination Logic
│   │   ├── useFilterSync.ts            # URL-Sync (Deep-Linking)
│   │   └── useArticles.ts              # Article-Fetch (Mock für Phase 1)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # KolNav, Logo, Search, Dark-Mode
│   │   │   ├── Footer.tsx              # Links, Copyright
│   │   │   ├── MainLayout.tsx          # Header + Content + Footer Wrapper
│   │   │   └── header.css
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx         # Headline, Subline, CTAs
│   │   │   ├── CategoryPreview.tsx     # 7 Category Cards (Horizontal Grid)
│   │   │   └── herohero-section.css
│   │   │
│   │   ├── search-filter/
│   │   │   ├── SearchBar.tsx           # KolInputText, KolSelect, KolInputCheckbox
│   │   │   ├── FilterSidebar.tsx       # Für Tablet/Mobile
│   │   │   ├── FilterDrawer.tsx        # Modal für Mobile
│   │   │   └── search-filter.css
│   │   │
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx         # Einzelne Karte (Logo, Name, Desc, Tags, CTA)
│   │   │   ├── ArticleGrid.tsx         # Grid mit Cluster-Gruppierung
│   │   │   └── article.css
│   │   │
│   │   ├── common/
│   │   │   ├── Badge.tsx               # Category & Maturity Badges
│   │   │   ├── Tag.tsx                 # Individual Tag Component
│   │   │   ├── NoResults.tsx           # "Keine Artikel gefunden" Message
│   │   │   ├── LoadingSpinner.tsx      # Loading State
│   │   │   └── common.css
│   │   │
│   │   └── index.ts                    # Barrel Export aller Komponenten
│   │
│   ├── pages/
│   │   ├── HomePage.tsx                # / Route (Hero + CatGrid + ArticleGrid)
│   │   ├── CategoryPage.tsx            # /category/:id Route
│   │   ├── SearchPage.tsx              # /search Route
│   │   ├── NotFoundPage.tsx            # 404 Fallback
│   │   └── index.ts
│   │
│   ├── styles/
│   │   ├── theme.css                   # KERN CSS Variables (Farben, Spacing, Typography)
│   │   ├── global.css                  # Reset, Base Styles, Accessibility
│   │   └── utilities.css               # Helper Classes (optional)
│   │
│   ├── utils/
│   │   ├── filterArticles.ts           # Filterings-Logik (Core Business Logic)
│   │   ├── sorting.ts                  # Sortierungs-Funktionen
│   │   ├── constants.ts                # Breakpoints, Limits, Constants
│   │   └── index.ts
│   │
│   ├── App.tsx                         # <Routes>, <BrowserRouter>
│   ├── react.main.tsx                  # React Render Entry (existierend, wird angepasst)
│   └── main.ts                         # Vite Entry (bleibt gleich)
│
├── public/
│   ├── assets/
│   │   ├── logos/                      # Artikel-Logos (können auch externe URLs sein)
│   │   ├── icons/                      # Kategorie-Icons (SVG oder Icon-Font)
│   │   └── theme/                      # KoliBri & KERN Assets (werden kopiert)
│   └── index.html                      # (existierend)
│
├── DESIGN_PLAN_MVP.md                  # ← Diese Dokumentation
├── FILE_STRUCTURE_TEMPLATE.md          # ← Diese Datei
├── package.json                        # (Update Dependencies: react-router-dom, zustand)
├── tsconfig.json                       # (Check: strikt, lib, target)
├── vite.config.ts                      # (existierend, bleibt gleich)
├── unocss.config.ts                    # (existierend, bleibt gleich)
└── README.md                           # (Update mit MVP-Info)
```

---

## Phase 1b: SETUP Checkliste

### Schritt 1: Dependencies hinzufügen

```bash
pnpm add react-router-dom zustand
pnpm add -D @types/react-router-dom
```

**Warum?**

- `react-router-dom`: Client-side Routing (/, /category/:id, /search)
- `zustand`: Leichte State Management für Filter (besser als Context für diesen Use-Case)
- Optional: `axios` für Phase 2 (API-Integration)

### Schritt 2: Verzeichnisse erstellen

```bash
mkdir -p src/{types,data,hooks,components/{layout,sections,search-filter,article,common},pages,styles,utils}
```

### Schritt 3: KERN-Theme CSS vorbereiten

**Datei:** `src/styles/theme.css`

Siehe DESIGN_PLAN_MVP.md Abschnitt 8.2 - direkt copy-paste

### Schritt 4: Global Styles einbinden

**Datei:** `src/main.ts` (Update Import)

```typescript
import './styles/theme.css';
import './styles/global.css';
// existierende Importe bleiben
```

### Schritt 5: KoliBri Theme Registration

**Datei:** `src/react.main.tsx` (Update)

```typescript
import { register } from '@public-ui/components';
import { BWSt } from '@public-ui/theme-bwst'; // oder DEFAULT Theme
import { defineCustomElements } from '@public-ui/components/loader';

// ← Schon vorhanden? Nur updaten falls nötig

register(BWSt, defineCustomElements)
	.then(() => {
		console.log('KoliBri + KERN Theme loaded');
	})
	.catch(console.warn);
```

### Schritt 6: TypeScript Types definieren

**Datei:** `src/types/index.ts`

Siehe DESIGN_PLAN_MVP.md Abschnitt 1.2 & 6.2 - direkt copy-paste

```typescript
export type Article = { ... };
export type Category = { ... };
export type Subcategory = { ... };
export type Tag = { ... };
export type FilterState = { ... };
```

### Schritt 7: Dummy-Daten konvertieren

**Dateien:** `src/data/{articles,categories,subcategories,tags}.ts`

Siehe DESIGN_PLAN_MVP.md Abschnitt 6.2-6.5

**Beispiel src/data/categories.ts:**

```typescript
import { Category } from '@/types';

export const CATEGORIES: Category[] = [
	{
		id: 'infrastruktur',
		name: 'Infrastruktur',
		description: 'Netzwerke, Protokolle, Hardware und Cloud-Services',
		icon: 'server',
		color: 'var(--cat-infrastruktur)',
		articleCount: 12,
		featured: true,
	},
	// ... weitere 6 Kategorien
];
```

### Schritt 8: Router Setup

**Datei:** `src/App.tsx` (Ersetzt komplett)

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import SearchPage from '@/pages/SearchPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
```

### Schritt 9: Basis-Komponenten Scaffold

Erstelle leere Komponenten-Dateien mit Export-Stubs:

**src/components/layout/Header.tsx**

```typescript
import { KolNav } from '@public-ui/react-v19';

export default function Header() {
  return (
    <header className="header">
      <KolNav _label="Navigation">
        {/* Navigation wird in Phase 1c implementiert */}
      </KolNav>
    </header>
  );
}
```

Gleiches für:

- Footer.tsx
- MainLayout.tsx
- HeroSection.tsx
- CategoryPreview.tsx
- SearchBar.tsx
- ArticleCard.tsx
- ArticleGrid.tsx
- etc.

### Schritt 10: Hooks Scaffold

**src/hooks/useFilters.ts**

```typescript
import { useState } from 'react';
import { FilterState } from '@/types';

const DEFAULT_FILTERS: FilterState = {
	searchQuery: '',
	selectedCategory: undefined,
	selectedSubcategories: [],
	selectedTags: [],
	maturityFilter: ['sandbox', 'incubating', 'graduated'],
	sortBy: 'name',
};

export function useFilters() {
	const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

	const updateFilter = (newFilter: Partial<FilterState>) => {
		setFilters((prev) => ({ ...prev, ...newFilter }));
	};

	const resetFilters = () => {
		setFilters(DEFAULT_FILTERS);
	};

	return { filters, updateFilter, resetFilters };
}
```

Gleiches für:

- useSearch.ts
- usePagination.ts
- useFilterSync.ts

### Schritt 11: Utility Functions

**src/utils/filterArticles.ts**

Siehe DESIGN_PLAN_MVP.md Abschnitt 3.3 - direkt copy-paste

**src/utils/constants.ts**

```typescript
export const BREAKPOINTS = {
	mobile: 320,
	tablet: 600,
	desktop: 1024,
	wide: 1440,
};

export const ARTICLES_PER_PAGE = 12; // oder infinite für MVP
export const SEARCH_DEBOUNCE_MS = 300;
```

### Schritt 12: Test-Run

```bash
pnpm run dev
```

**Erwartung:**

- App startet auf `http://localhost:5173`
- Keine TypeScript Errors
- KoliBri Web Components registriert (Console prüfen)
- Seite ist weiß/leer (Pages/Komponenten noch nicht implementiert)

---

## Phase 1c: KOMPONENTEN Implementierungs-Reihenfolge

### Priorität 1 (Tag 1):

1. **Header.tsx** - Navigation, Logo, Search-Input Placeholder
2. **Footer.tsx** - Links, Copyright
3. **MainLayout.tsx** - Wrapper
4. **HeroSection.tsx** - Headline, CTA Button

### Priorität 2 (Tag 2):

5. **ArticleCard.tsx** - Design nach Abschnitt 4.2
6. **CategoryPreview.tsx** - 7 Category Cards
7. **Badge.tsx** - Category & Maturity Badges
8. **Tag.tsx** - Tag Component

### Priorität 3 (Tag 3):

9. **ArticleGrid.tsx** - CSS Grid Layout
10. **SearchBar.tsx** - KolInputText + KolSelect + KolInputCheckbox
11. **HomePage.tsx** - Kombiniert alle vorherigen

### Priorität 4 (Tag 4):

12. **CategoryPage.tsx** - Kategorie-gefilterte Seite
13. **SearchPage.tsx** - Such-Ergebnisse
14. **NoResults.tsx** - "Keine Artikel" State

---

## Phase 1d: LOGIC Implementierungs-Reihenfolge

### Priorität 1:

1. **filterArticles() Utility** - Core-Logik (Abschnitt 3.3)
2. **useFilters Hook** - State Management
3. **ArticleGrid.tsx** - Filter-Anwendung

### Priorität 2:

4. **useSearch Hook** - Debouncing, Real-time Filter
5. **useFilterSync Hook** - URL-Sync (Deep-Links)
6. **SearchBar onChange Handler**

### Priorität 3:

7. **Kategorie-Click Handler** → Route zu /category/:id
8. **Reset Button** → clearFilters()
9. **Sort Dropdown** Logic

---

## Deployment / Build

Nach Phase 1e fertig:

```bash
# Build
pnpm run build

# Preview lokal
pnpm run preview

# Deploy zu Vercel (wenn Vercel Project verbunden)
# Automatisch bei Git Push
```

---

## FAQ für Developer

**Q: Wo gehen die Artikel-Logos hin?**
A: Entweder als Dateien in `public/assets/logos/` OR als externe URLs in der Article.logo Property. Empfehlung: URLs verwenden (CDN), da Dateien schnell groß werden.

**Q: Sollen wir API-Daten laden oder Mock-Daten?**
A: Phase 1: Mock-Daten aus `src/data/`. Phase 2: API-Integration (z.B. mit axios).

**Q: Pagination oder Infinite Scroll?**
A: Phase 1: Alles auf 1 Seite (70-80 Items ist OK). Phase 2: Pagination oder Infinite Scroll.

**Q: Dark Mode?**
A: Phase 1: Nicht implementiert. CSS vorbereitet (Abschnitt 8.2). Phase 2+: Toggle aktivieren.

**Q: Welche Icon-Library für Kategorien?**
A: Phase 1: Lucide Icons (lightweight) oder Codicon (KoliBri-Standard). Import: `<Icon>` oder nur `className="icon-server"`.

**Q: Wie teste ich Responsive?**
A: Browser DevTools (F12), Breakpoints: 320px (Mobile), 600px (Tablet), 1024px (Desktop).

**Q: TypeScript strict mode?**
A: Ja, bitte. `tsconfig.json` sollte `"strict": true` haben.

**Q: Styling: UnoCSS oder CSS?**
A: Hybrid: CSS Custom Properties für Design Tokens (theme.css), CSS Grid/Flexbox für Layouts, UnoCSS optional für Utils.

---

## Hinweise für Quality Assurance (Phase 1e)

- [ ] Alle Komponenten rendern ohne Console-Errors
- [ ] KoliBri Komponenten sichtbar (nicht weiße Quadrate)
- [ ] KERN-Farben angewendet (Blau, Grün, Rot, etc.)
- [ ] Responsive Test: Mobile (375px), Tablet (768px), Desktop (1024px)
- [ ] Keyboard-Navigation: Tab-Order sinnvoll
- [ ] Accessibility: Contrast (WCAG AA mindestens)
- [ ] Performance: Lighthouse Score >80
- [ ] Search funktioniert (Real-time Filterung)
- [ ] Filter funktionieren (Checkbox, Dropdown)
- [ ] URL-Sync: /search?q=...&category=... arbeitet

---

Viel Erfolg! Bei Fragen: → DESIGN_PLAN_MVP.md Abschnitt 10.2 "Developer-Fragen vorab"
