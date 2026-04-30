import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import type { FilterState, Item, StackItem } from '../types';
import { buildDependencyGraph, getLocalizedText, hasDependencyWithinDepth } from '../utils';
import { useDebounce } from './useDebounce';

const SEARCH_DEBOUNCE_MS = 200;

export function useFilters(items: Item[], stackItemMap?: Map<string, StackItem>) {
	const { i18n } = useTranslation();
	const [filters, setFilters] = useState<FilterState>({
		searchQuery: '',
		selectedLayer: null,
		selectedSublayer: null,
		selectedRelation: null,
		onlyDirectDependencies: false,
		dependencyDepth: null,
		selectedDependencyType: null,
	});

	// Debounce nur für searchQuery
	const debouncedSearchQuery = useDebounce(filters.searchQuery, SEARCH_DEBOUNCE_MS);

	const dependencyGraph = useMemo(() => buildDependencyGraph(items), [items]);

	// Lokalisierte Texte cachen
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

	// Direct Dependency Source Ids cachen
	const directDependencySourceIds = useMemo(() => {
		const sourceIds = new Set<string>();
		for (const [sourceId, edges] of dependencyGraph.outgoingById.entries()) {
			const hasMatchingType = filters.selectedDependencyType ? edges.some((edge) => edge.dependency.type === filters.selectedDependencyType) : edges.length > 0;
			if (hasMatchingType) {
				sourceIds.add(sourceId);
			}
		}
		return sourceIds;
	}, [dependencyGraph.outgoingById, filters.selectedDependencyType]);

	// Depth-Filter vorberechnen
	const depthFilterCache = useMemo(() => {
		if (!filters.dependencyDepth) return null;
		const cache = new Map<string, boolean>();
		for (const item of items) {
			cache.set(item.id, hasDependencyWithinDepth(item.id, dependencyGraph, filters.dependencyDepth, filters.selectedDependencyType));
		}
		return cache;
	}, [items, dependencyGraph, filters.dependencyDepth, filters.selectedDependencyType]);

	const filtered = useMemo(() => {
		const normalizedQuery = debouncedSearchQuery.toLowerCase();

		return items.filter((item) => {
			// Early-Exit: günstige Checks zuerst
			if (filters.selectedLayer && item.layer !== filters.selectedLayer) return false;
			if (filters.selectedSublayer && item.sublayer !== filters.selectedSublayer) return false;
			if (filters.selectedRelation && stackItemMap?.get(item.id)?.role !== filters.selectedRelation) return false;
			if (filters.onlyDirectDependencies && !directDependencySourceIds.has(item.id)) return false;

			// Suche
			if (normalizedQuery) {
				const texts = normalizedItemTexts.get(item.id);
				if (!texts?.name.includes(normalizedQuery) && !texts?.description.includes(normalizedQuery)) return false;
			}

			// Depth-Filter
			if (filters.dependencyDepth) {
				if (!depthFilterCache?.get(item.id)) return false;
			}

			return true;
		});
	}, [
		items,
		debouncedSearchQuery,
		i18n.language,
		stackItemMap,
		directDependencySourceIds,
		dependencyGraph,
		filters.selectedLayer,
		filters.selectedSublayer,
		filters.selectedRelation,
		filters.onlyDirectDependencies,
		filters.dependencyDepth,
		filters.selectedDependencyType,
		normalizedItemTexts,
		depthFilterCache,
	]);

	return { filters, setFilters, filtered };
}
