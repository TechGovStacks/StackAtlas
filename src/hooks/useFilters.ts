import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FilterState, Item } from '../types';
import { getLocalizedText } from '../utils';

export function useFilters(items: Item[]) {
	const { i18n } = useTranslation();
	const [filters, setFilters] = useState<FilterState>({
		searchQuery: '',
		selectedLayer: null,
		selectedSublayer: null,
	});

	const filtered = useMemo(() => {
		const normalizedQuery = filters.searchQuery.toLowerCase();

		return items.filter((item) => {
			const localizedName = getLocalizedText(item.name, i18n.language).toLowerCase();
			const localizedDescription = getLocalizedText(item.description, i18n.language).toLowerCase();
			const matchesSearch = localizedName.includes(normalizedQuery) || localizedDescription.includes(normalizedQuery);
			const matchesLayer = !filters.selectedLayer || item.layer === filters.selectedLayer;
			const matchesSublayer = !filters.selectedSublayer || item.sublayer === filters.selectedSublayer;
			return matchesSearch && matchesLayer && matchesSublayer;
		});
	}, [items, filters, i18n.language]);

	return { filters, setFilters, filtered };
}
