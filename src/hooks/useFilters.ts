import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FilterState, Item, StackItem } from '../types';
import { buildDependencyGraph, getLocalizedText, hasDependencyWithinDepth } from '../utils';

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

	const dependencyGraph = useMemo(() => buildDependencyGraph(items), [items]);
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

	const filtered = useMemo(() => {
		const normalizedQuery = filters.searchQuery.toLowerCase();

		return items.filter((item) => {
			const localizedName = getLocalizedText(item.name, i18n.language).toLowerCase();
			const localizedDescription = getLocalizedText(item.description, i18n.language).toLowerCase();
			const matchesSearch = localizedName.includes(normalizedQuery) || localizedDescription.includes(normalizedQuery);
			const matchesLayer = !filters.selectedLayer || item.layer === filters.selectedLayer;
			const matchesSublayer = !filters.selectedSublayer || item.sublayer === filters.selectedSublayer;
			const matchesRelation = !filters.selectedRelation || stackItemMap?.get(item.id)?.role === filters.selectedRelation;
			const matchesDirectDependency = !filters.onlyDirectDependencies || directDependencySourceIds.has(item.id);
			const matchesDepth =
				!filters.dependencyDepth || hasDependencyWithinDepth(item.id, dependencyGraph, filters.dependencyDepth, filters.selectedDependencyType);

			return matchesSearch && matchesLayer && matchesSublayer && matchesRelation && matchesDirectDependency && matchesDepth;
		});
	}, [items, filters, i18n.language, stackItemMap, directDependencySourceIds, dependencyGraph]);

	return { filters, setFilters, filtered };
}
