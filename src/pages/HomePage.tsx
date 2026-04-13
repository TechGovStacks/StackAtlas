import { useMemo, useState } from 'preact/hooks';
import { CategoryGrid } from '../components/CategoryGrid';
import { FilterBar, SortDir, SortField, ViewMode } from '../components/FilterBar';
import { ITEMS, LAYERS, STACKS } from '../data/catalog';
import { useFilters } from '../hooks/useFilters';
import { StackItem } from '../types';

export function HomePage() {
	const [activeStackId, setActiveStackId] = useState<string | null>(null);
	const [sortField, setSortField] = useState<SortField>('score');
	const [sortDir, setSortDir] = useState<SortDir>('desc');
	const [viewMode, setViewMode] = useState<ViewMode>('tile');

	const activeStack = useMemo(() => STACKS.find((s) => s.id === activeStackId) ?? null, [activeStackId]);

	const stackItemMap = useMemo<Map<string, StackItem>>(() => {
		if (!activeStack) return new Map();
		return new Map(activeStack.items.map((si) => [si.itemId, si]));
	}, [activeStack]);

	const baseItems = useMemo(() => {
		if (!activeStack) return ITEMS;
		return ITEMS.filter((item) => stackItemMap.has(item.id));
	}, [activeStack, stackItemMap]);

	const { filters, setFilters, filtered } = useFilters(baseItems);

	return (
		<main id="main-content">
			<FilterBar
				filters={filters}
				onFilterChange={setFilters}
				layers={LAYERS}
				stacks={STACKS}
				activeStackId={activeStackId}
				onStackChange={setActiveStackId}
				items={baseItems}
				sortField={sortField}
				onSortFieldChange={setSortField}
				sortDir={sortDir}
				onSortDirToggle={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>
			<CategoryGrid
				layers={LAYERS}
				articles={filtered}
				filters={filters}
				onFilterChange={setFilters}
				totalCount={baseItems.length}
				activeStack={activeStack ?? undefined}
				stackItemMap={stackItemMap}
				sortField={sortField}
				sortDir={sortDir}
				viewMode={viewMode}
			/>
		</main>
	);
}
