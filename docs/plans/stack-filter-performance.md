# Performance-Optimierung: Stack-Filter & Dependency Items

**Status**: Entwurf  
**Scope**: `useFilters`, `FilterBar`, `CategoryGrid`, `DependencyGraph`, `dependencies.ts`

---

## Problem

Bei der Filterung von Stack-Dependency-Items entstehen Performance-Engpässe durch:

1. **Kein Debouncing** bei der Sucheingabe — jeder Tastendruck löst sofortige Filter-Neuberechnung aus
2. **Teure BFS-Berechnungen** (`hasDependencyWithinDepth`) laufen synchron bei jedem Filter-Change
3. **Nicht memoizierte Berechnungen** in `FilterBar` für `sublayerOptions` und `relationOptions`
4. **Kaskadierendes Re-Rendering** durch Filter-State-Updates, die mehrere `useMemo`-Ketten invalidieren

---

## Ist-Zustand (Analyse)

### Re-Render-Kette bei Sucheingabe

```
Tastendruck
  → onInput → onFilterChange({ ...filters, searchQuery })
    → setFilters() [useState in useFilters]
      → useMemo: directDependencySourceIds (neu wenn selectedDependencyType unverändert: SKIP)
      → useMemo: filtered (LÄUFT IMMER — enthält filters als Dep)
        → items.filter() über alle Items
          → getLocalizedText() für jedes Item (2x)
          → hasDependencyWithinDepth() BFS wenn dependencyDepth gesetzt
      → CategoryGrid: useEffect reset page
      → CategoryGrid: useMemo sortedArticles (neu)
      → Re-render aller ArticleCard-Komponenten
```

### Nicht memoizierte Berechnungen in FilterBar

| Berechnung        | Ort                | Problem                              |
| ----------------- | ------------------ | ------------------------------------ |
| `sublayerOptions` | `FilterBar.tsx:59` | IIFE — re-berechnet bei jedem Render |
| `relationOptions` | `FilterBar.tsx:67` | IIFE — re-berechnet bei jedem Render |
| `layerOptions`    | `FilterBar.tsx:45` | Array-literal — neu bei jedem Render |
| `stackOptions`    | `FilterBar.tsx:50` | Array-literal — neu bei jedem Render |

### BFS-Komplexität

`hasDependencyWithinDepth` (BFS bis Tiefe n) wird in `filtered` für **jedes Item** aufgerufen, wenn `dependencyDepth` gesetzt ist. Bei O(n) Items und O(e) Edges entsteht O(n × e) Aufwand pro Filter-Change.

---

## Lösungsplan

### Priorität 1 — Sofortiger Impact

#### 1.1 Debouncing der Sucheingabe

**Datei**: `src/hooks/useFilters.ts` oder neuer Hook `src/hooks/useDebounce.ts`

**Ansatz**: Internen Debounce-State für `searchQuery` einführen. Der sichtbare Input-Wert (`inputValue`) aktualisiert sofort (UX), die eigentliche Filter-Berechnung (`debouncedQuery`) verzögert sich um ~200 ms.

```typescript
// src/hooks/useDebounce.ts
import { useEffect, useState } from 'preact/hooks';

export function useDebounce<T>(value: T, delay: number): T {
	const [debounced, setDebounced] = useState(value);
	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);
	return debounced;
}
```

**Integration in `useFilters.ts`**:

```typescript
// Roh-State für sofortiges UI-Feedback
const [rawSearchQuery, setRawSearchQuery] = useState('');
const debouncedSearchQuery = useDebounce(rawSearchQuery, 200);

// filtered useMemo nutzt debouncedSearchQuery statt filters.searchQuery
const filtered = useMemo(() => {
    const normalizedQuery = debouncedSearchQuery.toLowerCase();
    // ...
}, [items, filters, debouncedSearchQuery, i18n.language, ...]);
```

**FilterBar** bekommt `rawSearchQuery` + `setRawSearchQuery` als separates Prop, damit der Input-Wert sofort reagiert.

**Erwarteter Gewinn**: Reduziert Filter-Neuberechnungen bei schneller Eingabe von ~10 auf ~1 pro Wort.

---

#### 1.2 Memoizierung der FilterBar-Optionen

**Datei**: `src/components/FilterBar.tsx`

Alle vier IIFE-Berechnungen in `useMemo` umwandeln:

```typescript
const sublayerOptions = useMemo(() => {
	if (!filters.selectedLayer) return [];
	const layerItems = items.filter((item) => item.layer === filters.selectedLayer);
	const sublayers = new Set(layerItems.map((item) => item.sublayer).filter((s): s is string => Boolean(s)));
	return Array.from(sublayers).sort();
}, [items, filters.selectedLayer]);

const relationOptions = useMemo(() => {
	if (!activeStackId || !activeStack) return [];
	const roleCounts = activeStack.items.reduce(
		(acc, stackItem) => {
			acc[stackItem.role] = (acc[stackItem.role] ?? 0) + 1;
			return acc;
		},
		{} as Record<ParticipantRole, number>,
	);
	return PARTICIPANT_ROLES.filter((role) => (roleCounts[role] ?? 0) > 0).map((role) => ({
		label: `${t(`stack.roles.${role}`)} (${roleCounts[role]})`,
		value: role,
	}));
}, [activeStackId, activeStack, t]);

const layerOptions = useMemo(
	() => [{ label: t('search.allCategories'), value: '' }, ...layers.map((layer) => ({ label: getLocalizedText(layer.name, i18n.language), value: layer.id }))],
	[layers, i18n.language, t],
);

const stackOptions = useMemo(
	() => [
		{ label: t('stack.all'), value: '' },
		...stacks.map((stack) => ({
			label: `${getLocalizedText(stack.name, i18n.language)} (${stack.items.length})`,
			value: stack.id,
		})),
	],
	[stacks, i18n.language, t],
);
```

**Erwarteter Gewinn**: FilterBar rendert schneller bei jedem Re-Render, da Optionslisten nicht neu erstellt werden.

---

### Priorität 2 — Algorithmische Verbesserungen

#### 2.1 BFS-Ergebnisse cachen (Depth-Filter)

**Datei**: `src/utils/dependencies.ts` oder `src/hooks/useFilters.ts`

`hasDependencyWithinDepth` wird für **jedes Item** bei jedem Render neu berechnet. Stattdessen: alle Ergebnisse in einem einzigen Pass vorberechnen und als `Map<string, boolean>` cachen.

```typescript
// In useFilters.ts — neues useMemo
const depthFilterCache = useMemo(() => {
	if (!filters.dependencyDepth) return null;
	const cache = new Map<string, boolean>();
	for (const item of items) {
		cache.set(item.id, hasDependencyWithinDepth(item.id, dependencyGraph, filters.dependencyDepth, filters.selectedDependencyType));
	}
	return cache;
}, [items, dependencyGraph, filters.dependencyDepth, filters.selectedDependencyType]);

// Im filtered useMemo:
const matchesDepth = !filters.dependencyDepth || (depthFilterCache?.get(item.id) ?? false);
```

**Erwarteter Gewinn**: BFS-Aufrufe reduzieren sich von O(n) auf 1 Batch-Berechnung; Wiederverwendung bei unveränderten Deps (z.B. bei reiner searchQuery-Änderung).

---

#### 2.2 Textsuche optimieren — lokalisierte Texte cachen

**Datei**: `src/hooks/useFilters.ts`

`getLocalizedText()` wird bei jedem `filtered`-Durchlauf für jedes Item **2x** aufgerufen. Da Items und Sprache sich selten ändern, können die normalisierten Texte vorgebaut werden:

```typescript
const normalizedItemTexts = useMemo(() => {
	return new Map(
		items.map((item) => [
			item.id,
			{
				name: getLocalizedText(item.name, i18n.language).toLowerCase(),
				description: getLocalizedText(item.description, i18n.language).toLowerCase(),
			},
		]),
	);
}, [items, i18n.language]);

// Im filtered useMemo:
const texts = normalizedItemTexts.get(item.id);
const matchesSearch = !normalizedQuery || texts?.name.includes(normalizedQuery) || texts?.description.includes(normalizedQuery);
```

**Erwarteter Gewinn**: Eliminiert repeated String-Lokalisierung bei jedem Filter-Change. Besonders wirksam bei großen Datasets und häufiger Sucheingabe.

---

#### 2.3 Early-Exit in `filtered` useMemo

**Datei**: `src/hooks/useFilters.ts`

Günstige Checks (Layer, Sublayer, Relation — O(1)) vor teuren Checks (searchQuery, BFS) ausführen:

```typescript
return items.filter((item) => {
	// Günstige O(1)-Checks zuerst
	if (filters.selectedLayer && item.layer !== filters.selectedLayer) return false;
	if (filters.selectedSublayer && item.sublayer !== filters.selectedSublayer) return false;
	if (filters.selectedRelation && stackItemMap?.get(item.id)?.role !== filters.selectedRelation) return false;
	if (filters.onlyDirectDependencies && !directDependencySourceIds.has(item.id)) return false;

	// Teure Checks danach
	if (normalizedQuery) {
		const texts = normalizedItemTexts.get(item.id);
		if (!texts?.name.includes(normalizedQuery) && !texts?.description.includes(normalizedQuery)) return false;
	}

	// Teuerster Check (BFS) zuletzt
	if (filters.dependencyDepth && !depthFilterCache?.get(item.id)) return false;

	return true;
});
```

**Erwarteter Gewinn**: Items, die früh durch billige Checks fallen, erreichen nie die teuren BFS-Berechnungen.

---

### Priorität 3 — Strukturelle Verbesserungen

#### 3.1 Filter-State in Zustand/URL aufteilen

**Aktuell**: Ein `useState` für alle Filter in `useFilters`. Jede Änderung (auch am `searchQuery`) invalidiert alle `useMemo`-Deps.

**Verbesserung**: `searchQuery` in separaten State auslagern, damit BFS-bezogene Memos (`directDependencySourceIds`, `depthFilterCache`) nicht neu laufen, wenn nur der Suchtext sich ändert.

```typescript
// Getrennte States
const [searchQuery, setSearchQuery] = useState('');
const [structuralFilters, setStructuralFilters] = useState<Omit<FilterState, 'searchQuery'>>({...});

// directDependencySourceIds hängt NICHT von searchQuery ab — kein Re-Run
const directDependencySourceIds = useMemo(
    () => { /* ... */ },
    [dependencyGraph.outgoingById, structuralFilters.selectedDependencyType]
);
```

**Erwarteter Gewinn**: Sucheingabe löst keine BFS-Neuberechnungen mehr aus.

---

#### 3.2 Virtualisierung der Ergebnisliste

**Aktuell**: `CategoryGrid` rendert bis zu 15 Items pro Seite vollständig, inklusive `ArticleCard` mit Scoring-Berechnungen.

**Verbesserung** (nur wenn Item-Anzahl > 50 pro Seite oder bei Performance-Profiling bestätigt): React-Virtual / TanStack Virtual für die Item-Liste einsetzen, sodass nur sichtbare Cards im DOM existieren.

**Hinweis**: Erfordert Absprache mit Maintainern, da neue Dependency.

---

#### 3.3 Web Worker für BFS-Berechnungen

Bei sehr großen Graphs (>500 Items, >2000 Edges) können BFS-Berechnungen in einen Web Worker ausgelagert werden, um den Main Thread nicht zu blockieren.

**Aufwand**: Hoch. Nur relevant, wenn Profiling einen echten Main-Thread-Block zeigt.

---

## Umsetzungsreihenfolge

| Schritt | Maßnahme                                            | Datei(en)                              | Aufwand | Impact                  |
| ------- | --------------------------------------------------- | -------------------------------------- | ------- | ----------------------- |
| 1       | `useDebounce` Hook erstellen                        | `hooks/useDebounce.ts`                 | Klein   | Hoch                    |
| 2       | Debouncing in `useFilters` integrieren              | `hooks/useFilters.ts`, `FilterBar.tsx` | Mittel  | Hoch                    |
| 3       | FilterBar-Optionen memoizieren                      | `components/FilterBar.tsx`             | Klein   | Mittel                  |
| 4       | Texte in normalizedItemTexts cachen                 | `hooks/useFilters.ts`                  | Klein   | Mittel                  |
| 5       | BFS-Ergebnisse in depthFilterCache vorberechnen     | `hooks/useFilters.ts`                  | Mittel  | Hoch (bei Depth-Filter) |
| 6       | Early-Exit in filtered optimieren                   | `hooks/useFilters.ts`                  | Klein   | Mittel                  |
| 7       | Filter-State aufteilen (searchQuery vs. structural) | `hooks/useFilters.ts`, `FilterBar.tsx` | Mittel  | Hoch                    |
| 8       | Virtualisierung (optional)                          | `components/CategoryGrid.tsx`          | Groß    | Situativ                |

---

## Messung / Validierung

Vor und nach der Umsetzung mit Chrome DevTools Performance-Tab messen:

- **Scripting-Zeit** bei schneller Sucheingabe (10 Tastendrücke in 500 ms)
- **Render-Zeit** für CategoryGrid bei 200+ Items
- **BFS-Zeit** (`hasDependencyWithinDepth`) bei Depth-Filter mit depth=3

Zielwerte:

- Filter-Response nach letztem Tastendruck: < 50 ms
- Kein Jank (Frame-Drop) bei Sucheingabe
- BFS-Batch bei Depth-Filter: < 20 ms für 300 Items

---

## Entscheidungen / Offene Fragen

- **Debounce-Delay**: 200 ms empfohlen. Bei sehr langsamen Clients ggf. auf 300 ms erhöhen.
- **Filter-State-Aufteilung** (Punkt 3.1): Bricht das aktuelle FilterBar-API. Muss mit Maintainern abgestimmt werden, ob `onFilterChange(FilterState)` als Interface beibehalten wird.
- **Virtualisierung**: Nur wenn Profiling bestätigt, dass >15 Items pro Seite ein Problem sind — aktuell Pagination auf 15 begrenzt, daher vermutlich kein Engpass.
