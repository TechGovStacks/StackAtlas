---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/DOCS_HUB.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

# Landscape2-ähnliche Übersichtsseite | UI/UX Design Plan MVP

## KoliBri + KERN-Theme Integration

**Status:** Architecture Phase (Level 4)  
**Version:** 1.0 (2026-04-04)  
**Zielgruppe:** Developer-Ready Blueprint

---

## 1. INFORMATIONS-ARCHITEKTUR

### 1.1 Seiten/Screens (Phase 1 MVP)

```
Browser
├── Homepage (/)
│   ├── Header (Navigation, Logo, Suchleiste)
│   ├── Hero-Section (Headline, Subline, CTA)
│   ├── Kategorie-Grid (7 Kategorien mit Vorschau)
│   ├── Such- & Filter-Bar (Sticky, Top-Position)
│   ├── Artikel-Landkarte (Grid/Cluster-Layout)
│   └── Footer (Links, Kontakt)
│
├── Kategorie-Seite (/category/:id)
│   ├── Breadcrumb
│   ├── Kategorie-Header (Name, Beschreibung, Icon)
│   ├── Filter-Sidebar (Subcategorien, Tags)
│   ├── Artikel-Grid (gefiltert)
│   └── Pagination/Infinite-Scroll
│
├── Such-Ergebnisse (/search)
│   ├── Such-Query anzeigen
│   ├── Ergebnis-Statistik
│   ├── Filter-Refinement
│   └── Artikel-Grid (gefiltert)
│
└── Artikel-Detail (/article/:id) [Phase 2]
    └── Artikel-Content, Related-Items, etc.
```

### 1.2 Datenstruktur (TypeScript)

```typescript
// Core Types
type Category = {
	id: string;
	name: string;
	description: string;
	icon: string; // Lucide-Icon-Name oder SVG-Pfad
	color: string; // Hex oder CSS-Variable: var(--kol-color-primary)
	articleCount: number;
	featured: boolean;
};

type Subcategory = {
	id: string;
	categoryId: string;
	name: string;
	description?: string;
};

type Tag = {
	id: string;
	name: string;
	slug: string;
};

type Article = {
	id: string;
	name: string;
	description: string;
	category: Category['id'];
	subcategories: Subcategory['id'][];
	tags: Tag['id'][];
	logo?: string; // URL zu Logo-Image
	homepage?: string;
	organization?: string;
	maturity: 'sandbox' | 'incubating' | 'graduated' | 'archived';
	featured: boolean;
	metadata?: {
		createdAt?: string;
		updatedAt?: string;
		rating?: number;
		views?: number;
	};
};

type FilterState = {
	searchQuery: string;
	selectedCategory?: string;
	selectedSubcategories: string[];
	selectedTags: string[];
	maturityFilter: ('sandbox' | 'incubating' | 'graduated')[];
	sortBy: 'name' | 'category' | 'recent' | 'popular';
};
```

### 1.3 Dummy-Daten für MVP

**Kategorien (7):**

1. Infrastruktur (rot / danger)
2. Plattform (blau / primary)
3. Betrieb (grün / success)
4. Zugang (orange / warning)
5. Entwicklung (lila / secondary)
6. Sicherheit (braun / dark)
7. KI (indigo / accent)

**Artikel pro Kategorie:** 8-12  
**Gesamt Artikel:** 70-80  
**Subcategorien:** 2-3 pro Kategorie (21-28 insgesamt)  
**Tags:** 50-70 eindeutige Tags

---

## 2. ÜBERSICHTSSEITE LAYOUT (Homepage/)

### 2.1 Layout-Wireframe (ASCII)

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ Logo | Navigation (Home, About, Docs) | [Suchbox] | Dark-Mode  │
├────────────────────────────────────────────────────────────────┤
│                       HERO SECTION                              │
│ "Tech-Ökosystem Landkarte"                                      │
│ "Interaktive Übersicht von 80+ Technologien und Projekten"      │
│ [Primary CTA: Jetzt erkunden] [Secondary: Mehr erfahren]        │
├────────────────────────────────────────────────────────────────┤
│ KATEGORIE-PREVIEW (7 Kategorien, 1 Zeile / Responsive)         │
│ [Cat1] [Cat2] [Cat3] [Cat4] [Cat5] [Cat6] [Cat7]               │
├────────────────────────────────────────────────────────────────┤
│ SUCH- & FILTER-BAR (Sticky auf Desktop, Collapsible auf Mobile)│
│ [Search Input] | [Kategorie-Dropdown] | [Maturity-Filter]      │
│                | [Sort-Dropdown]                                │
├────────────────────────────────────────────────────────────────┤
│            ARTIKEL-GRID / CLUSTER-LAYOUT (Hauptbereich)        │
│                                                                  │
│ Infrastruktur Cluster:                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ Article1 │ │ Article2 │ │ Article3 │ │ Article4 │            │
│ │ Logo     │ │ Logo     │ │ Logo     │ │ Logo     │            │
│ │ graduated│ │ graduate │ │ sandbox  │ │ graduated│            │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│                                                                  │
│ Plattform Cluster:                                              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ Article5 │ │ Article6 │ │ Article7 │                         │
│ └──────────┘ └──────────┘ └──────────┘                         │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│ PAGINATION / LOAD-MORE BUTTON                                   │
├────────────────────────────────────────────────────────────────┤
│ FOOTER                                                          │
│ Links | License | Contact | Social                             │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 Abschnitte Detail

#### Header

- **Logo** + Brand-Name (links)
- **Navigation** (Home, Categories, About, Docs)
- **Suchbox** (mit Magnifying Glass Icon)
- **Dark-Mode Toggle** (rechts)
- **KoliBri-Komponenten:** KolNav, KolLink, KolInputText, KolButton

#### Hero Section

- **Headline:** "Tech-Ökosystem Landkarte"
- **Subline:** "Interaktive Übersicht von 80+ Technologien, Plattformen und Infrastrukturen"
- **CTAs:** [Erkunden] [Mehr Infos]
- **Background:** Gradient oder Pattern (KERN-Farbverlauf)
- **KoliBri-Komponenten:** KolHeading, KolButton, KolButtonLink

#### Kategorie-Preview (7 Cards, Horizontal)

- Responsive: 7 Spalten (Desktop) → 3 Spalten (Tablet) → 1 Spalte (Mobile)
- Jede Card:
  - **Icon** (Kategorie-Symbol)
  - **Kategorie-Name**
  - **Artikel-Count** (z.B. "8 Items")
  - **Hover-Effect:** Skala, Schatten, Link zum Filter
- **KoliBri-Komponenten:** KolCard, KolButton (als Link)

#### Such- & Filter-Bar

- **Position:** Sticky am Top (nach Header), nur auf >600px
- **Felder:**
  1. **Search Input** (Freitext-Suche, Real-time)
  2. **Kategorie-Select** (Dropdown, Multiple wählbar)
  3. **Maturity-Filter** (Checkbox-Gruppe: Sandbox, Incubating, Graduated)
  4. **Sort-Dropdown** (Name A-Z, Category, Recent, Popular)
  5. **Reset-Button** (alle Filter löschen)
- **Responsive:** Auf Mobile als Collapsible Modal/Drawer
- **KoliBri-Komponenten:** KolInput, KolSelect, KolInputCheckbox, KolButton

#### Artikel-Grid / Cluster-Layout

- **Layout:** CSS Grid mit Auto-Fit
  - Desktop: 4 Spalten
  - Tablet: 3 Spalten
  - Mobile: 2 Spalten
- **Cluster-Struktur:** Gruppiert nach Kategorie, dunkler Hintergrund mit Kategorie-Label
- **Artikel-Karte:** (siehe Abschnitt 4.2)
- **KoliBri-Komponenten:** KolCard, KolGrid (wenn verfügbar)

#### Footer

- Copyright, Links (GitHub, Kontakt), KERN-Branding
- **KoliBri-Komponenten:** KolLink, KolButtonLink

### 2.3 Responsive Breakpoints

```typescript
// Mobile-First Approach
const breakpoints = {
	mobile: '0px', // 320px - 599px
	tablet: '600px', // 600px - 1023px
	desktop: '1024px', // 1024px+
	wide: '1440px', // für extra wide displays
};
```

**Grid-Spalten pro Breakpoint:**

- Mobile (320px): 2 Spalten, Stack Filter-Bar
- Tablet (600px): 3 Spalten, Filter-Bar Inline
- Desktop (1024px): 4 Spalten, Filter-Bar Sticky
- Wide (1440px): 5 Spalten

### 2.4 KERN-Theme Colors Integration

```css
/* Basierend auf KERN-Standard (deutsches Government Design) */

:root {
	/* Primär (Blau - Vertrauen, Stabilität) */
	--kol-color-primary: #003d82;
	--kol-color-primary-hover: #002550;
	--kol-color-primary-active: #001a33;

	/* Sekundär (Grün - Erfolg) */
	--kol-color-success: #00883d;
	--kol-color-success-hover: #006b2e;
	--kol-color-success-active: #004d1f;

	/* Warnung/Danger (Rot - Achtung) */
	--kol-color-danger: #c5192d;
	--kol-color-danger-hover: #a00e22;
	--kol-color-danger-active: #7b0a18;

	/* Neutral/Gray Skala */
	--kol-color-text: #1a1a1a;
	--kol-color-text-light: #4a4a4a;
	--kol-color-bg: #ffffff;
	--kol-color-bg-light: #f5f5f5;
	--kol-color-border: #d3d3d3;

	/* Kategorie-spezifische Farben */
	--cat-infrastruktur: #c5192d; /* Rot */
	--cat-plattform: #003d82; /* Blau */
	--cat-betrieb: #00883d; /* Grün */
	--cat-zugang: #f39c12; /* Orange */
	--cat-entwicklung: #8e44ad; /* Lila */
	--cat-sicherheit: #6f4a3a; /* Braun */
	--cat-ki: #5b2c6f; /* Indigo */
}

/* Dark Mode (Optional Phase 2) */
@media (prefers-color-scheme: dark) {
	:root {
		--kol-color-bg: #1a1a1a;
		--kol-color-bg-light: #2d2d2d;
		--kol-color-text: #ffffff;
		--kol-color-text-light: #b0b0b0;
	}
}
```

---

## 3. SUCH- UND FILTER-FUNKTIONALITÄT

### 3.1 Platzierung & UX-Verhalten

**Desktop (≥1024px):**

- Position: Sticky am Top (unter Header), bleibt sichtbar beim Scrollen
- Breite: Full-Width Container
- Layout: 1 Reihe, Inline (Search | Category | Maturity | Sort | Reset)

**Tablet (600px-1023px):**

- Position: Sticky, aber zusammenfassbar
- Layout: Können in 2 Reihen gehen oder Collapsible sein
- Icon-basierte Buttons für Kompaktheit

**Mobile (<600px):**

- Position: Sticky (unter Header)
- Layout: Collapsible Drawer/Accordion
- Icon-Button: "Filter" (KolButton mit hamburger icon)
- Öffnet Modal mit allen Filter-Optionen

### 3.2 Filter-Optionen

#### 1. Suche (Text-Input)

- **Typ:** Real-time (live Filterung, kein Submit-Button nötig)
- **Suchbereich:** Name, Beschreibung, Tags, Organisation
- **Debounce:** 300ms (um Performance zu optimieren)
- **Placeholder:** "Suche nach Technologien, Projekten..."
- **Clear-Button:** X-Icon zum Löschen
- **KoliBri:** KolInput mit \_touched, \_msg-Prop für Feedback

#### 2. Kategorie-Filter

- **Typ:** Multi-Select (Checkbox oder Dropdown)
- **Verhalten:** AND-Logik (alle ausgewählten müssen matchen)
- **Optionen:** Alle 7 Kategorien + "Alle" Option
- **Standard:** "Alle" selektiert
- **KoliBri:** KolSelect (für Desktop) oder KolInputCheckbox (für Mobile)

#### 3. Subcategory-Filter (Conditional)

- **Nur sichtbar wenn Kategorie gewählt**
- **Typ:** Checkbox-Gruppe
- **Verhalten:** OR-Logik innerhalb Kategorie
- **KoliBri:** KolInputCheckbox (Array)

#### 4. Maturity-Filter

- **Optionen:**
  - [x] Sandbox
  - [x] Incubating
  - [x] Graduated
  - [ ] Archived
- **Standard:** Alle außer "Archived" aktiviert
- **KoliBri:** KolInputCheckbox-Gruppe

#### 5. Tags-Filter (Optional, Phase 1.5)

- **Typ:** Checkbox-Liste (max 10 häufigste Tags anzeigen)
- **Expandable:** "Mehr Tags zeigen" Link
- **KoliBri:** KolInputCheckbox, KolButton

#### 6. Sortierung

- **Optionen:**
  - Alphabetisch (A-Z)
  - Kategorie
  - Neu hinzugefügt
  - Beliebtheit (views/rating)
- **Standard:** Alphabetisch
- **KoliBri:** KolSelect

#### 7. Reset-Button

- **Aktion:** Alle Filter auf Default zurücksetzen
- **KoliBri:** KolButton (\_type="button")

### 3.3 Such-Verhalten

```typescript
// Filter Application Flow
const filterArticles = (articles: Article[], filters: FilterState) => {
	return articles
		.filter((a) => {
			// Text-Suche (ODER-Logik über Felder)
			if (filters.searchQuery) {
				const q = filters.searchQuery.toLowerCase();
				const matchesSearch = a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
				if (!matchesSearch) return false;
			}

			// Kategorie-Filter (ODER-Logik)
			if (filters.selectedCategory && filters.selectedCategory !== '*') {
				if (a.category !== filters.selectedCategory) return false;
			}

			// Subcategories (ODER-Logik, wenn kategorisiert)
			if (filters.selectedSubcategories.length > 0) {
				const hasSubcat = a.subcategories.some((sc) => filters.selectedSubcategories.includes(sc));
				if (!hasSubcat) return false;
			}

			// Maturity (ODER-Logik)
			if (filters.maturityFilter.length > 0) {
				if (!filters.maturityFilter.includes(a.maturity)) return false;
			}

			// Tags (ODER-Logik)
			if (filters.selectedTags.length > 0) {
				const hasTag = a.tags.some((t) => filters.selectedTags.includes(t));
				if (!hasTag) return false;
			}

			return true;
		})
		.sort((a, b) => {
			switch (filters.sortBy) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'category':
					return a.category.localeCompare(b.category);
				default:
					return 0;
			}
		});
};
```

### 3.4 Search UX Details

- **Ergebnis-Anzeige:** "Zeige X von Y Ergebnissen"
- **Keine Ergebnisse:** "Keine Artikel gefunden. Versuchen Sie, die Filter anzupassen."
- **URL-Sync:** Filter in URL-Params speichern für Deep-Linking
  - `/search?q=api&category=plattform&maturity=graduated`

---

## 4. GRID/LANDKARTE-DARSTELLUNG

### 4.1 Layout-Pattern

```css
/* CSS Grid - Mobile-First */
.article-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1.5rem; /* var(--spacing-lg) */
	padding: var(--spacing-md);
}

/* Kategorie-Cluster (optionale visuelle Gruppierung) */
.category-cluster {
	border: 1px solid var(--kol-color-border);
	border-radius: var(--border-radius);
	padding: var(--spacing-md);
	margin-bottom: var(--spacing-lg);
	background: var(--kol-color-bg-light);
}

.category-cluster-title {
	font-size: 1.25rem;
	font-weight: 600;
	color: var(--kol-color-primary);
	margin-bottom: var(--spacing-md);
}
```

### 4.2 Artikel-Karte Design

```
┌─────────────────────────────┐
│ [Category Badge]   [Maturity]│   Top-Right: Status-Badge
├─────────────────────────────┤
│                             │
│        [Logo Image]         │   Zentriert, 80x80px
│                             │
├─────────────────────────────┤
│ Article Name (Headline)     │   Bold, 16px, truncated if needed
├─────────────────────────────┤
│ Short description (2 lines) │   Gray text, 14px
├─────────────────────────────┤
│ [Tag1] [Tag2] [Tag3]        │   Inline, scrollable if many
├─────────────────────────────┤
│        [VIEW / LINK]        │   CTA-Button
└─────────────────────────────┘
```

### 4.3 Artikel-Karten: Struktur & Styling

**KoliBri-Komponente:** KolCard

```typescript
interface ArticleCardProps {
  article: Article;
  onClickHandler?: (id: string) => void;
}

// Komponenten-Struktur
<KolCard _label={article.name}>
  {/* Category Badge */}
  <div className="card-badge">
    <span className={`category-badge cat-${article.category}`}>
      {article.category}
    </span>
    <span className={`maturity-badge maturity-${article.maturity}`}>
      {article.maturity}
    </span>
  </div>

  {/* Logo */}
  {article.logo && (
    <img
      src={article.logo}
      alt={article.name}
      className="card-logo"
      loading="lazy"
    />
  )}

  {/* Name & Description */}
  <h3 className="card-title">{article.name}</h3>
  <p className="card-description">{article.description}</p>

  {/* Tags */}
  <div className="card-tags">
    {article.tags.slice(0, 3).map(tag => (
      <span key={tag} className="tag">{tag}</span>
    ))}
    {article.tags.length > 3 && (
      <span className="tag-more">+{article.tags.length - 3}</span>
    )}
  </div>

  {/* CTA Button */}
  <KolButton
    _label="Mehr erfahren"
    _on={{ onClick: () => onClickHandler?.(article.id) }}
    className="card-cta"
  />
</KolCard>
```

### 4.4 Karten-Styling

```css
.article-card {
	padding: 1.5rem;
	border: 1px solid var(--kol-color-border);
	border-radius: var(--border-radius);
	background: var(--kol-color-bg);
	transition: all 0.2s ease-in-out;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
}

/* Hover-Effect (Desktop only) */
@media (hover: hover) {
	.article-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
		border-color: var(--kol-color-primary);
	}
}

/* Maturity Badges */
.maturity-badge {
	padding: 0.25rem 0.5rem;
	border-radius: 0.125rem;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
}

.maturity-sandbox {
	background: var(--kol-color-danger);
	color: white;
}

.maturity-incubating {
	background: var(--kol-color-warning, #f39c12);
	color: white;
}

.maturity-graduated {
	background: var(--kol-color-success);
	color: white;
}

.maturity-archived {
	background: var(--kol-color-text-light);
	color: white;
}

/* Category-Farben */
.cat-infrastruktur {
	--cat-color: var(--cat-infrastruktur);
}
.cat-plattform {
	--cat-color: var(--cat-plattform);
}
.cat-betrieb {
	--cat-color: var(--cat-betrieb);
}
.cat-zugang {
	--cat-color: var(--cat-zugang);
}
.cat-entwicklung {
	--cat-color: var(--cat-entwicklung);
}
.cat-sicherheit {
	--cat-color: var(--cat-sicherheit);
}
.cat-ki {
	--cat-color: var(--cat-ki);
}

.category-badge {
	display: inline-block;
	padding: 0.5rem 0.75rem;
	background: var(--cat-color);
	color: white;
	border-radius: var(--border-radius);
	font-size: 0.875rem;
	font-weight: 600;
}

/* Logo Styling */
.card-logo {
	width: 80px;
	height: 80px;
	object-fit: contain;
	margin: var(--spacing-md) auto;
}

/* Tags */
.card-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	font-size: 0.75rem;
}

.tag {
	display: inline-block;
	padding: 0.25rem 0.5rem;
	background: var(--kol-color-bg-light);
	border: 1px solid var(--kol-color-border);
	border-radius: 0.25rem;
	color: var(--kol-color-text-light);
}

.tag-more {
	color: var(--kol-color-primary);
	font-weight: 600;
}
```

### 4.5 Interaktionen

- **Hover (Desktop):** Karte hebt sich ab (Scale, Shadow, Border-Color change)
- **Click:** Navigiert zu `/article/:id` (Phase 2) oder öffnet Expandable Card (Phase 1)
- **Focus (Keyboard):** Sichtbarer Focus-Ring (WCAG AA)
- **Animation:** Fade-In beim Laden, Smooth Transitions (0.2s)
- **Keine Hover-States auf Touch-Devices** (wird vermieden durch @media (hover: hover))

---

## 5. KOMPONENTEN-INVENTAR

### 5.1 KoliBri-Komponenten (Verfügbar v4.1.2)

```typescript
// Aus package.json: "@public-ui/react-v19": "4.1.2"

// Strukturelle Komponenten
✓ KolNav - Hauptnavigation (Header)
✓ KolHeading - Überschriften (H1-H6)
✓ KolCard - Artikel-Karten
✓ KolLink / KolButtonLink - Navigation & CTAs
✓ KolForm - Form-Wrapper (bei Bedarf)

// Input-Komponenten
✓ KolInputText - Such-Input, Text-Felder
✓ KolSelect - Dropdown für Kategorien, Sortierung
✓ KolInputCheckbox - Multi-Select, Filter
✓ KolInputRadio - Single-Select (alternativ zu Checkbox)
✓ KolInputRange - Schieberegler (optional für Filters)

// Button & Aktion
✓ KolButton - Primary & Secondary CTAs
✓ KolButtonLink - Link-Button Hybrid

// Feedback & Status
✓ KolAlert / KolMsg - Nachrichten (z.B. "Keine Ergebnisse")
✓ KolTooltip - Info-Icons, Hover-Hilfe (optional)

// Listen & Zusammenstellung
✗ KolGrid - Grid-Komponente (eventuell nicht verfügbar, verwende CSS Grid)
✗ KolPagination - Pagination (implementiere custom oder mit Buttons)
✗ KolTable - Nicht benötigt (eher für Daten-Listen)
```

### 5.2 Custom-Komponenten (React)

```typescript
// src/components/

// Layout
- Header.tsx
- Footer.tsx
- MainLayout.tsx (wrapper mit Header/Footer)

// Feature-Komponenten
- HeroSection.tsx
- CategoryGrid.tsx
- SearchBar.tsx
- FilterSidebar.tsx (Mobile/Tablet)
- ArticleCard.tsx
- ArticleGrid.tsx (wrapper mit Cluster-Logik)
- PaginationControls.tsx (custom, mit Kol-Buttons)

// Utility-Komponenten
- CategoryBadge.tsx
- MaturityBadge.tsx
- Tag.tsx
- NoResults.tsx

// Hooks
- useArticles.ts (Artikel-Fetch-Logic)
- useFilters.ts (Filter-State Management)
- useSearch.ts (Suche-Debouncing)
- usePagination.ts (Pagination-Logic)
```

### 5.3 Externe Dependencies

**Bereits vorhanden (package.json):**

- `react` 18.3.1
- `react-hook-form` 7.48.0 (nur für Form-Handling falls nötig)
- `@public-ui/react-v19` 4.1.2 (KoliBri)
- `@public-ui/theme-default` 4.1.2 (default theme, wird durch KERN ersetzt)
- `zod` 3.25.76 (Validierung, optional)

**Empfohlen hinzufügen (Phase 1):**

- `react-router-dom` ^6.x - Client-Side Routing (für Navigation zwischen /category/:id, /search)
- `zustand` oder `jotai` - State Management (lighter als Redux, für Filter-State)

**Optional (Phase 2+):**

- `axios` oder `fetch` - HTTP-Client für API-Integration
- `framer-motion` - Animations-Library (für fancy Transitions)
- `react-virtualization` - Für sehr große Listen (>1000 Items)

### 5.4 Styling-Infrastruktur

**Aktuell im Projekt:**

- `unocss` (UnoCSS Config vorhanden: unocss.config.ts)
- `@leanup/stack` 1.3.54 (CSS Framework)
- Keine reinen Tailwind-Dependenzen

**Empfehlung für Phase 1:**

- **Nutze UnoCSS + CSS Custom Properties** für KERN-Theme-Integration
- **NICHT: Tailwind hinzufügen** (würde mit UnoCSS & KoliBri-Styling kollidieren)
- **CSS-Strategie:**
  1. KoliBri-CSS als Base (wird durch Theme geladen)
  2. KERN CSS Variables überschreiben
  3. Custom CSS mit UnoCSS oder vanilla CSS

---

## 6. DATENSAMPLE & DUMMY-DATA

### 6.1 TypeScript Data Interfaces

```typescript
// siehe Abschnitt 1.2 (bereits definiert)
```

### 6.2 Dummy-Kategorien

```typescript
const CATEGORIES: Category[] = [
	{
		id: 'infrastruktur',
		name: 'Infrastruktur',
		description: 'Netzwerke, Protokolle, Hardware und Cloud-Services',
		icon: 'server', // Lucide icon name
		color: 'var(--cat-infrastruktur)',
		articleCount: 12,
		featured: true,
	},
	{
		id: 'plattform',
		name: 'Plattform',
		description: 'Frameworks, Runtimes und Entwicklungs-Plattformen',
		icon: 'package',
		color: 'var(--cat-plattform)',
		articleCount: 11,
		featured: true,
	},
	{
		id: 'betrieb',
		name: 'Betrieb',
		description: 'DevOps, CI/CD, Monitoring und Orchestrierung',
		icon: 'sliders',
		color: 'var(--cat-betrieb)',
		articleCount: 10,
		featured: true,
	},
	{
		id: 'zugang',
		name: 'Zugang',
		description: 'Browser, Mobile Apps, Zugänglichkeit',
		icon: 'globe',
		color: 'var(--cat-zugang)',
		articleCount: 9,
		featured: false,
	},
	{
		id: 'entwicklung',
		name: 'Entwicklung',
		description: 'Programmiersprachen, Tools und IDEs',
		icon: 'code',
		color: 'var(--cat-entwicklung)',
		articleCount: 9,
		featured: false,
	},
	{
		id: 'sicherheit',
		name: 'Sicherheit',
		description: 'Kryptographie, Authentifizierung, Compliance',
		icon: 'shield',
		color: 'var(--cat-sicherheit)',
		articleCount: 8,
		featured: false,
	},
	{
		id: 'ki',
		name: 'KI',
		description: 'Machine Learning, NLP, Deep Learning',
		icon: 'brain',
		color: 'var(--cat-ki)',
		articleCount: 11,
		featured: true,
	},
];
```

### 6.3 Dummy-Artikel (Auszug aus projects.csv / items.csv)

```typescript
const ARTICLES: Article[] = [
	// Infrastruktur
	{
		id: 'dns',
		name: 'Domain Name System (DNS)',
		description: 'Adressvergabe und Netzwerk-Namensauflösung im Internet.',
		category: 'infrastruktur',
		subcategories: ['adresse', 'netzwerk'],
		tags: ['adresse', 'netzwerk', 'protokoll', 'internet'],
		logo: 'logos/dns.png',
		homepage: 'https://www.ietf.org/rfc/rfc1035.txt',
		organization: 'IETF',
		maturity: 'graduated',
		featured: true,
		metadata: {
			createdAt: '1983-11-01',
			updatedAt: '2025-03-31',
			rating: 4.8,
			views: 15420,
		},
	},
	{
		id: 'bgp',
		name: 'Border Gateway Protocol (BGP)',
		description: 'Routing-Protokoll für autonome Systeme im Internet.',
		category: 'infrastruktur',
		subcategories: ['netzwerk', 'routing'],
		tags: ['netzwerk', 'isp', 'routing', 'internet'],
		logo: 'logos/bgp.png',
		homepage: 'https://tools.ietf.org/html/rfc4271',
		organization: 'IETF',
		maturity: 'graduated',
		featured: false,
		metadata: {
			createdAt: '1989-01-01',
			updatedAt: '2024-02-12',
			rating: 4.7,
			views: 8920,
		},
	},

	// Plattform
	{
		id: 'angular',
		name: 'Angular',
		description: 'Modernes Webframework für die Erstellung schneller und zuverlässiger Anwendungen.',
		category: 'plattform',
		subcategories: ['webframework', 'user-interface'],
		tags: ['webframework', 'user-interface', 'typescript', 'spa'],
		logo: 'logos/angular.png',
		homepage: 'https://angular.dev/',
		organization: 'Google',
		maturity: 'graduated',
		featured: true,
		metadata: {
			createdAt: '2014-11-25',
			updatedAt: '2025-09-17',
			rating: 4.5,
			views: 22100,
		},
	},
	{
		id: 'react',
		name: 'React',
		description: 'JavaScript-Bibliothek für interaktive UI-Komponenten mit Virtual DOM.',
		category: 'plattform',
		subcategories: ['webframework', 'user-interface'],
		tags: ['webframework', 'javascript', 'ui', 'spa'],
		logo: 'logos/react.png',
		homepage: 'https://react.dev/',
		organization: 'Meta',
		maturity: 'graduated',
		featured: true,
		metadata: {
			createdAt: '2013-05-29',
			updatedAt: '2025-10-01',
			rating: 4.9,
			views: 38700,
		},
	},
	{
		id: 'kubernetes',
		name: 'Kubernetes',
		description: 'Orchestrierungs-Plattform für Container-Deployment und -Verwaltung.',
		category: 'betrieb',
		subcategories: ['orchestrierung', 'container'],
		tags: ['orchestrierung', 'container', 'devops', 'skalierung'],
		logo: 'logos/kubernetes.png',
		homepage: 'https://kubernetes.io/',
		organization: 'CNCF',
		maturity: 'graduated',
		featured: true,
		metadata: {
			createdAt: '2014-06-06',
			updatedAt: '2025-10-15',
			rating: 4.8,
			views: 35200,
		},
	},

	// KI
	{
		id: 'huggingface-transformers',
		name: 'Hugging Face Transformers',
		description: 'State-of-the-Art NLP-Bibliothek mit vortrainierten Modellen.',
		category: 'ki',
		subcategories: ['deep-learning', 'nlp'],
		tags: ['deep-learning', 'transformer', 'nlp', 'ml', 'python'],
		logo: 'logos/huggingface.png',
		homepage: 'https://huggingface.co/transformers/',
		organization: 'Hugging Face',
		maturity: 'graduated',
		featured: true,
		metadata: {
			createdAt: '2018-11-17',
			updatedAt: '2025-09-17',
			rating: 4.9,
			views: 28500,
		},
	},
	{
		id: 'pytorch',
		name: 'PyTorch',
		description: 'Deep Learning Framework mit dynamischen Graphen und Eager Execution.',
		category: 'ki',
		subcategories: ['deep-learning'],
		tags: ['deep-learning', 'ml', 'python', 'gpu', 'tensor'],
		logo: 'logos/pytorch.png',
		homepage: 'https://pytorch.org/',
		organization: 'Meta AI',
		maturity: 'graduated',
		featured: true,
		metadata: {
			createdAt: '2016-01-01',
			updatedAt: '2025-10-10',
			rating: 4.8,
			views: 31400,
		},
	},

	// Weitere Artikel... (insgesamt 70-80 Items)
];
```

### 6.4 Dummy-Subcategories

```typescript
const SUBCATEGORIES: Subcategory[] = [
	// Infrastruktur
	{ id: 'adresse', categoryId: 'infrastruktur', name: 'Adresse & Naming', description: 'IP-Adressierung, DNS, Domänen' },
	{ id: 'netzwerk', categoryId: 'infrastruktur', name: 'Netzwerk', description: 'Protokolle, Routing, Switching' },
	{ id: 'kabelgebunden', categoryId: 'infrastruktur', name: 'Kabelgebunden', description: 'Ethernet, Fasern, Kabel' },
	{ id: 'drahtlos', categoryId: 'infrastruktur', name: 'Drahtlos', description: 'Bluetooth, WiFi, 5G' },

	// Plattform
	{ id: 'webframework', categoryId: 'plattform', name: 'Web Frameworks', description: 'React, Vue, Angular, etc.' },
	{ id: 'datenbank', categoryId: 'plattform', name: 'Datenbanken', description: 'SQL, NoSQL, Vektor-DB' },
	{ id: 'runtime', categoryId: 'plattform', name: 'Runtimes', description: 'Node.js, JVM, Python Runtime' },

	// Betrieb
	{ id: 'ci-cd', categoryId: 'betrieb', name: 'CI/CD', description: 'Pipeline, Automatisierung, Deployment' },
	{ id: 'orchestrierung', categoryId: 'betrieb', name: 'Orchestrierung', description: 'Container-Management, Skalierung' },
	{ id: 'monitoring', categoryId: 'betrieb', name: 'Monitoring', description: 'Logs, Metriken, Tracing' },

	// KI
	{ id: 'deep-learning', categoryId: 'ki', name: 'Deep Learning', description: 'Neural Networks, Transformer' },
	{ id: 'nlp', categoryId: 'ki', name: 'NLP', description: 'Language Models, Text Processing' },
	{ id: 'ml', categoryId: 'ki', name: 'Machine Learning', description: 'Classical ML, Feature Engineering' },
];
```

### 6.5 Dummy-Tags (Häufigste ~50)

```typescript
const TAGS: Tag[] = [
	// Allgemein
	{ id: 'open-source', name: 'Open Source', slug: 'open-source' },
	{ id: 'foss', name: 'FOSS', slug: 'foss' },
	{ id: 'cloud-native', name: 'Cloud Native', slug: 'cloud-native' },
	{ id: 'distributed', name: 'Distributed', slug: 'distributed' },

	// Tech-Kategorien
	{ id: 'kubernetes', name: 'Kubernetes', slug: 'kubernetes' },
	{ id: 'docker', name: 'Docker', slug: 'docker' },
	{ id: 'microservices', name: 'Microservices', slug: 'microservices' },
	{ id: 'rest-api', name: 'REST API', slug: 'rest-api' },
	{ id: 'graphql', name: 'GraphQL', slug: 'graphql' },

	// Sprachen & Runtimes
	{ id: 'python', name: 'Python', slug: 'python' },
	{ id: 'javascript', name: 'JavaScript', slug: 'javascript' },
	{ id: 'typescript', name: 'TypeScript', slug: 'typescript' },
	{ id: 'go', name: 'Go', slug: 'go' },
	{ id: 'rust', name: 'Rust', slug: 'rust' },
	{ id: 'java', name: 'Java', slug: 'java' },

	// Machine Learning
	{ id: 'machine-learning', name: 'Machine Learning', slug: 'machine-learning' },
	{ id: 'deep-learning', name: 'Deep Learning', slug: 'deep-learning' },
	{ id: 'nlp', name: 'NLP', slug: 'nlp' },
	{ id: 'llm', name: 'LLM', slug: 'llm' },
	{ id: 'transformer', name: 'Transformer', slug: 'transformer' },

	// Infrastruktur
	{ id: 'devops', name: 'DevOps', slug: 'devops' },
	{ id: 'ci-cd', name: 'CI/CD', slug: 'ci-cd' },
	{ id: 'container', name: 'Container', slug: 'container' },
	{ id: 'serverless', name: 'Serverless', slug: 'serverless' },
	{ id: 'edge-computing', name: 'Edge Computing', slug: 'edge-computing' },

	// Security
	{ id: 'security', name: 'Security', slug: 'security' },
	{ id: 'encryption', name: 'Encryption', slug: 'encryption' },
	{ id: 'privacy', name: 'Privacy', slug: 'privacy' },
	{ id: 'authentication', name: 'Authentication', slug: 'authentication' },
	{ id: 'compliance', name: 'Compliance', slug: 'compliance' },

	// Frontend/Web
	{ id: 'web-framework', name: 'Web Framework', slug: 'web-framework' },
	{ id: 'ui-components', name: 'UI Components', slug: 'ui-components' },
	{ id: 'css', name: 'CSS', slug: 'css' },
	{ id: 'responsive-design', name: 'Responsive Design', slug: 'responsive-design' },
	{ id: 'accessibility', name: 'Accessibility', slug: 'accessibility' },
	{ id: 'wcag', name: 'WCAG', slug: 'wcag' },

	// Database
	{ id: 'database', name: 'Database', slug: 'database' },
	{ id: 'sql', name: 'SQL', slug: 'sql' },
	{ id: 'nosql', name: 'NoSQL', slug: 'nosql' },
	{ id: 'postgresql', name: 'PostgreSQL', slug: 'postgresql' },
	{ id: 'mongodb', name: 'MongoDB', slug: 'mongodb' },

	// Data & Analytics
	{ id: 'data-lake', name: 'Data Lake', slug: 'data-lake' },
	{ id: 'analytics', name: 'Analytics', slug: 'analytics' },
	{ id: 'big-data', name: 'Big Data', slug: 'big-data' },
	{ id: 'etl', name: 'ETL', slug: 'etl' },
	{ id: 'data-science', name: 'Data Science', slug: 'data-science' },

	// Sonstiges
	{ id: 'testing', name: 'Testing', slug: 'testing' },
	{ id: 'monitoring', name: 'Monitoring', slug: 'monitoring' },
	{ id: 'logging', name: 'Logging', slug: 'logging' },
	{ id: 'documentation', name: 'Documentation', slug: 'documentation' },
	{ id: 'api-gateway', name: 'API Gateway', slug: 'api-gateway' },
	{ id: 'caching', name: 'Caching', slug: 'caching' },
];
```

---

## 7. NAVIGATION & ROUTING

### 7.1 Route-Struktur (React Router v6)

```typescript
// src/routes.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import SearchPage from '@/pages/SearchPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage'; // Phase 2

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/article/:articleId" element={<ArticleDetailPage />} /> {/* Phase 2 */}

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 7.2 Route-Details

#### `/` - Homepage

- **Komponenten:** HeroSection, CategoryPreview, SearchBar, ArticleGrid
- **Default State:** Alle Artikel, kategorisiert angezeigt
- **URL-Parameter:** Keine (oder optionale `?highlight=kategorie-id`)

#### `/category/:categoryId` - Kategorie-Seite

- **Komponenten:** CategoryHeader, SearchBar, FilterSidebar, ArticleGrid
- **Default State:** Nur Artikel der ausgewählten Kategorie
- **URL-Parameter:**
  - `:categoryId` - Erforderlich (z.B. `/category/plattform`)
  - `?subcategory=...` - Optional, Subcategory-Filter
  - `?sort=...` - Optional, Sortierung

#### `/search` - Such-Ergebnisse

- **Komponenten:** SearchBar, FilterSidebar, ArticleGrid, ResultStats
- **URL-Parameter:**
  - `?q=...` - Such-Query (erforderlich)
  - `?category=...` - Kategorie-Filter
  - `?tags=...` - Tag-Filter (komma-separiert)
  - `?maturity=...` - Maturity-Filter
  - `?sort=...` - Sortierung
  - `?page=...` - Seite (optional)

**Beispiel:** `/search?q=machine+learning&category=ki&maturity=graduated&sort=name&page=1`

#### `/article/:articleId` - Artikel-Detail (Phase 2)

- **Komponenten:** ArticleHeader, ArticleContent, RelatedArticles
- **URL-Parameter:** `:articleId` - Erforderlich

### 7.3 Deep-Linking & URL-Sync

**Strategie:**

- Filter-State in URL-Parametern speichern (für Deep-Linking & Sharing)
- URL bei Filter-Änderung automatisch aktualisieren
- Seite laden → URL-Parameter auslesen → Filter-State setzen

```typescript
// useFilterSync Hook
const useFilterSync = () => {
	const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
	const { search } = useLocation();
	const navigate = useNavigate();

	// Beim Laden: URL auslesen
	useEffect(() => {
		const params = new URLSearchParams(search);
		const filterState: FilterState = {
			searchQuery: params.get('q') || '',
			selectedCategory: params.get('category') || undefined,
			selectedSubcategories: params.get('subcategories')?.split(',') || [],
			selectedTags: params.get('tags')?.split(',') || [],
			maturityFilter: (params.get('maturity')?.split(',') as any) || ['sandbox', 'incubating', 'graduated'],
			sortBy: (params.get('sort') as any) || 'name',
		};
		setFilters(filterState);
	}, [search]);

	// Beim Ändern: URL updaten
	const updateFilters = (newFilters: FilterState) => {
		setFilters(newFilters);
		const params = new URLSearchParams({
			q: newFilters.searchQuery,
			category: newFilters.selectedCategory || '*',
			subcategories: newFilters.selectedSubcategories.join(','),
			tags: newFilters.selectedTags.join(','),
			maturity: newFilters.maturityFilter.join(','),
			sort: newFilters.sortBy,
		});
		navigate(`/search?${params.toString()}`);
	};

	return { filters, updateFilters };
};
```

---

## 8. STYLING-STRATEGIE

### 8.1 CSS-Schichtung (KERN-Theme)

```
┌─────────────────────────────────────────────┐
│ Application Custom CSS (UnoCSS)             │  (Top Layer - überschreibt alles)
├─────────────────────────────────────────────┤
│ Component-Spezifische Styles (CSS-Dateien)  │
├─────────────────────────────────────────────┤
│ KoliBri CSS Custom Properties (KERN)        │  (Theme-Variablen)
├─────────────────────────────────────────────┤
│ KoliBri Component Styles                    │  (Web Components)
└─────────────────────────────────────────────┘
```

### 8.2 CSS Custom Properties (CSS Variables)

```css
/* src/styles/theme.css */

:root {
	/* ===== KERN-Theme Farbpalette ===== */

	/* Primär (Blau - Government-Standard) */
	--kol-color-primary: #003d82;
	--kol-color-primary-hover: #002550;
	--kol-color-primary-active: #001a33;

	/* Sekundär (Grün) */
	--kol-color-success: #00883d;
	--kol-color-success-hover: #006b2e;

	/* Warnung */
	--kol-color-warning: #f39c12;
	--kol-color-warning-hover: #e67e22;

	/* Danger */
	--kol-color-danger: #c5192d;
	--kol-color-danger-hover: #a00e22;

	/* Text & Background */
	--kol-color-text: #1a1a1a;
	--kol-color-text-light: #4a4a4a;
	--kol-color-bg: #ffffff;
	--kol-color-bg-light: #f5f5f5;
	--kol-color-border: #d3d3d3;

	/* ===== Spacing (basierend auf 8px-Raster) ===== */
	--spacing-xs: 0.25rem; /* 4px */
	--spacing-sm: 0.5rem; /* 8px */
	--spacing-md: 1rem; /* 16px */
	--spacing-lg: 1.5rem; /* 24px */
	--spacing-xl: 2rem; /* 32px */
	--spacing-2xl: 3rem; /* 48px */

	/* ===== Borders & Radius ===== */
	--border-radius: 0.25rem; /* 4px (KERN-Standard) */
	--border-radius-lg: 0.5rem; /* 8px */
	--border-width: 1px;

	/* ===== Typography ===== */
	--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	--font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
	--font-size-sm: 0.875rem; /* 14px */
	--font-size-base: 1rem; /* 16px */
	--font-size-lg: 1.125rem; /* 18px */
	--font-size-xl: 1.5rem; /* 24px */
	--font-size-2xl: 2rem; /* 32px */
	--font-weight-normal: 400;
	--font-weight-semibold: 600;
	--font-weight-bold: 700;

	/* ===== Shadow (einfach, KERN-konform) ===== */
	--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
	--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
	--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);

	/* ===== Kategorie-Farben ===== */
	--cat-infrastruktur: #c5192d; /* Rot */
	--cat-plattform: #003d82; /* Blau */
	--cat-betrieb: #00883d; /* Grün */
	--cat-zugang: #f39c12; /* Orange */
	--cat-entwicklung: #8e44ad; /* Lila */
	--cat-sicherheit: #6f4a3a; /* Braun */
	--cat-ki: #5b2c6f; /* Indigo */

	/* ===== Transitions ===== */
	--transition-fast: 0.15s ease-in-out;
	--transition-normal: 0.25s ease-in-out;
	--transition-slow: 0.35s ease-in-out;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
	:root {
		--kol-color-text: #ffffff;
		--kol-color-text-light: #b0b0b0;
		--kol-color-bg: #1a1a1a;
		--kol-color-bg-light: #2d2d2d;
		--kol-color-border: #4a4a4a;
	}
}
```

### 8.3 Global Styles (reset & base)

```css
/* src/styles/global.css */

* {
	box-sizing: border-box;
}

html {
	scroll-behavior: smooth;
}

body {
	font-family: var(--font-family-base);
	font-size: var(--font-size-base);
	line-height: 1.5;
	color: var(--kol-color-text);
	background-color: var(--kol-color-bg);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
	font-weight: var(--font-weight-bold);
	line-height: 1.2;
}

h1 {
	font-size: var(--font-size-2xl);
}
h2 {
	font-size: var(--font-size-xl);
}
h3 {
	font-size: var(--font-size-lg);
}

p {
	margin: 0;
}

a {
	color: var(--kol-color-primary);
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
}

button {
	cursor: pointer;
	font-family: inherit;
	border: none;
	background: none;
}

/* Accessible Focus Ring */
:focus-visible {
	outline: 2px solid var(--kol-color-primary);
	outline-offset: 2px;
}

/* KoliBri Component overrides */
kol-button,
kol-button-link,
kol-input-text,
kol-select,
kol-input-checkbox {
	--kol-color-primary: var(--kol-color-primary);
	--kol-color-success: var(--kol-color-success);
	--kol-border-radius: var(--border-radius);
}
```

### 8.4 Component-spezifisches CSS

```css
/* src/components/ArticleCard.css */

.article-card {
	padding: var(--spacing-lg);
	border: var(--border-width) solid var(--kol-color-border);
	border-radius: var(--border-radius);
	background-color: var(--kol-color-bg);
	transition: all var(--transition-normal);
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
}

@media (hover: hover) {
	.article-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--kol-color-primary);
	}
}

.article-card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: var(--spacing-sm);
}

.article-card-logo {
	width: 80px;
	height: 80px;
	object-fit: contain;
	flex-shrink: 0;
}

.article-card-title {
	font-size: var(--font-size-lg);
	font-weight: var(--font-weight-semibold);
	color: var(--kol-color-text);
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.article-card-description {
	font-size: var(--font-size-sm);
	color: var(--kol-color-text-light);
	line-height: 1.4;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.article-card-tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-xs);
}

.tag {
	display: inline-block;
	padding: var(--spacing-xs) var(--spacing-sm);
	background-color: var(--kol-color-bg-light);
	border: var(--border-width) solid var(--kol-color-border);
	border-radius: calc(var(--border-radius) * 2);
	font-size: 0.75rem;
	color: var(--kol-color-text-light);
}

/* Badge Styles */
.badge {
	display: inline-block;
	padding: 0.25rem 0.5rem;
	border-radius: calc(var(--border-radius) * 2);
	font-size: 0.75rem;
	font-weight: var(--font-weight-bold);
	text-transform: uppercase;
}

.badge-primary {
	background-color: var(--kol-color-primary);
	color: white;
}

.badge-success {
	background-color: var(--kol-color-success);
	color: white;
}

.badge-danger {
	background-color: var(--kol-color-danger);
	color: white;
}

.badge-warning {
	background-color: var(--kol-color-warning);
	color: white;
}
```

### 8.5 Responsive Design Pattern

```css
/* Mobile-First Approach */

/* Base (Mobile) */
.article-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--spacing-lg);
}

/* Tablet */
@media (min-width: 600px) {
	.article-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

/* Desktop */
@media (min-width: 1024px) {
	.article-grid {
		grid-template-columns: repeat(4, 1fr);
	}
}

/* Wide */
@media (min-width: 1440px) {
	.article-grid {
		grid-template-columns: repeat(5, 1fr);
	}
}
```

### 8.6 Dark Mode Considerations

- **Noch nicht implementiert** (Phase 2)
- **Vorbereitung:** CSS Custom Properties bereits mit `@media (prefers-color-scheme: dark)` aufgebaut
- **Beim Aktivieren:** Alle Farben anpassen, aber KERN-Designprinzipien beibehalten

---

## 9. PHASE-1 MVP SCOPE

### 9.1 IN SCOPE - MVP (Phase 1)

- [x] **Übersichtsseite (/)** mit Kategorie-Grid und Such-Bar
- [x] **Artikel-Grid** mit 70-80 Dummy-Daten aus CSV
- [x] **Einfache Text-Suche** (Real-time, keine Submit nötig)
- [x] **Filter nach Kategorie** (Single oder Multi-Select)
- [x] **Filter nach Maturity** (Checkbox-Gruppe: Sandbox, Incubating, Graduated)
- [x] **Responsive Design** für Mobile (2 Col), Tablet (3 Col), Desktop (4 Col)
- [x] **KoliBri-Komponenten** vollständig integriert
- [x] **KERN-Theme Colors** angewendet (alle 7 Kategorie-Farben)
- [x] **Sticky Search/Filter-Bar** auf Desktop
- [x] **Artikel-Karten** mit Logo, Name, Beschreibung, Tags, Badges
- [x] **Footer & Header** mit Navigation
- [x] **URL-Syncing** für Deep-Links (z.B. `/?category=ki&sort=name`)
- [x] **Dummy-Daten-Struktur** vorbereitet (TypeScript Types, Sample Data)
- [x] **Accessibility** WCAG AA Standard (Focus Rings, Semantic HTML, KoliBri)

### 9.2 OUT OF SCOPE - Phase 2+

- [ ] **Artikel-Detail-Seite** (`/article/:id`)
- [ ] **Erweiterte Filter** (Tags, Subcategories, Advanced Search)
- [ ] **Statistik-Seite** (Übersichten, Charts)
- [ ] **Guide-Bereich** (Tutorials, How-Tos)
- [ ] **Dark Mode** (CSS vorbereitet, aber nicht aktiviert)
- [ ] **Infinite Scroll / Pagination** (nur Reset Button in Phase 1)
- [ ] **API-Integration** (noch keine echten Daten, nur Mock-Daten)
- [ ] **Admin-Panel** (für Daten-Management)
- [ ] **Benutzer-Favoriten** (localStorage/Cloud)
- [ ] **Share & Export** (Links, CSV, PDF)
- [ ] **Multi-Language** (derzeit nur Deutsch)

### 9.3 Begründung Scope

**Warum diese Abgrenzung?**

1. **MVP = Minimal Viable Product**
   - Zeigt Kernfunktionalität: Durchsuchen & Filtern
   - Gibt User vollständigen Überblick über Ökosystem
   - Nimmt nicht zu lange zum Bauen (1-2 Sprints)

2. **Phase 1 ist "Proof of Concept"**
   - Validiert Design & UX
   - Testet KoliBri + KERN Integration
   - Gibt Feedback für Phase 2

3. **Phase 2+ skaliert dann:**
   - Detail-Pages mit Info-Tiefe
   - Advanced Analytics & Insights
   - API & echte Daten

---

## 10. IMPLEMENTATION-ROADMAP

### 10.1 Phasen & Milestones

```
Phase 1a: ARCHITECTURE ✓ (Diese Dokumentation)
└─ Output: Design-Plan, Data-Structures, Component-Inventory

Phase 1b: SETUP & FOUNDATION (1-2 Tage)
├─ File-Structure erstellen (src/components, src/pages, src/types, src/data)
├─ Dummy-Daten in TypeScript konvertieren
├─ React Router Setup
├─ KERN-Theme CSS Integration
├─ KoliBri Register & Theme-Setup
└─ Output: Projekt-Grundgerüst, lädt fehlerfrei

Phase 1c: LAYOUT & COMPONENTS (2-3 Tage)
├─ Header.tsx + Footer.tsx (KolNav, KolLink)
├─ HeroSection.tsx (KolHeading, KolButton)
├─ CategoryGrid.tsx (KolCard Array)
├─ SearchBar.tsx (KolInputText, KolSelect, KolInputCheckbox)
├─ ArticleCard.tsx (Karten-Design mit Badges)
├─ ArticleGrid.tsx (CSS Grid, Cluster-Logik)
├─ MainLayout.tsx (Header/Footer Wrapper)
└─ Output: UI sieht aus wie Design, aber noch keine Filterung

Phase 1d: LOGIC & INTERACTIVITY (2-3 Tage)
├─ useFilters Hook (State Management)
├─ useSearch Hook (Debouncing)
├─ filterArticles Funktion (Filter-Logik)
├─ URL-Syncing (useFilterSync Hook)
├─ Search/Filter onChange Handler
├─ Kategorie-Links Funktion
└─ Output: Suche & Filter funktionieren, URL ändert sich

Phase 1e: POLISH & RESPONSIVE (1-2 Tage)
├─ Responsive CSS finalisieren (Breakpoints testen)
├─ Accessibility QA (Tab-Order, Focus-Rings, Contrast)
├─ KoliBri Component Props validieren
├─ Performance-Check (Images lazy-load, etc.)
├─ Fehlerbehandlung (No Results, Edge Cases)
└─ Output: App läuft stabil auf Mobile/Tablet/Desktop

Phase 1f: REVIEW & LAUNCH (0.5-1 Tag)
├─ Code-Review
├─ Testing (manuell)
├─ Deploy zu Demo-Server (Vercel/Netlify)
└─ Output: MVP Live, Link zum Sharegit

Phase 2: ENHANCEMENT (später)
├─ Article-Detail-Pages
├─ Advanced Filters
├─ API-Integration
├─ Dark Mode
├─ Statistik-Dashboard
```

### 10.2 Developer-Ready Checklist für Phase 1b

**Bevor Development startet, muss Developer folgendes abhaken:**

- [ ] Projekt-Struktur verstanden
- [ ] TypeScript Types (Article, Category, etc.) definiert
- [ ] Dummy-Daten in `src/data/articles.ts` konvertiert
- [ ] React Router Setup abgeschlossen
- [ ] KoliBri registriert und Theme-CSS geladen
- [ ] KERN CSS Variables in `src/styles/theme.css` definiert
- [ ] UnoCSS Config überprüft
- [ ] ESLint/Prettier laufen ohne Fehler
- [ ] Vite Dev-Server startet: `pnpm run dev`

**Developer-Fragen vorab:**

- "Wie werden Artikel-Logos geladen? (Static, CDN, URL-Property?)"
- "Welche Icon-Library für Kategorie-Icons? (Lucide, Codicon, SVG?)"
- "Pagination nötig oder Infinite Scroll?" (MVP: weder noch, nur Alle auf 1 Seite)
- "API-Endpoint für Live-Daten oder nur Mock-Daten?" (Phase 1: Mock-Daten)

---

## CONCLUSION: BLUEPRINT SUMMARY

### Was ein Developer damit macht:

1. **Dateistruktur** aus Abschnitt 5.2 (Custom-Components) aufbauen
2. **TypeScript Types** aus Abschnitt 1.2 + 6.2-6.5 implementieren
3. **Dummy-Daten** aus CSV in `src/data/articles.ts` konvertieren
4. **Komponenten** nach Abschnitt 4 & 5 bauen (ArticleCard, SearchBar, etc.)
5. **Styling** nach Abschnitt 8 mit CSS Custom Properties
6. **Logic** nach Abschnitt 3 & 4 (Filter, Search, Sort)
7. **Routing** nach Abschnitt 7 mit React Router
8. **QA** gegen Abschnitt 9 MVP-Scope checken

### Key Design Principles (KERN + Accessibility):

- **KERN Government Design Standard:** Klassische blaue Farbpalette, klare Typografie, einfache Formen
- **Accessibility First:** WCAG AA, Keyboard-Navigation, Focus-Rings, Semantische HTML, KoliBri Web Components
- **Mobile-First Responsive:** 2 Col Mobile → 3 Col Tablet → 4 Col Desktop
- **Performance:** Lazy-loading Images, CSS Grid statt JS-Layout, Debounced Search
- **Deep-Linking:** Alle Filter in URL, shareable Links

### Nächste Schritte:

1. Developer liest diesen Plan
2. Developer fragt Architektur-Fragen (siehe "Developer-Fragen vorab")
3. Developer startet Phase 1b (Setup & Foundation)
4. Architect reviewed nach jedem Milestone
5. Launch Phase 1 MVP nach 1 Woche

---

**Status:** Ready for Development  
**Version:** 1.0 (2026-04-04)  
**Architect:** Claude Code (Level 4)  
**Next Review:** Nach Phase 1b abgeschlossen
