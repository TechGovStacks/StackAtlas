import { useLocation } from 'preact-iso';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { CategoryGrid } from '../components/CategoryGrid';
import { FilterBar, SortDir, SortField, ViewMode } from '../components/FilterBar';
import { ITEMS, LAYERS, STACKS } from '../data/catalog';
import { useFilters } from '../hooks/useFilters';
import { useLocalStacks } from '../hooks/useLocalStacks';
import { useRouteAnnouncement } from '../hooks/useRouteAnnouncement';
import { StackItem } from '../types';

export function HomePage() {
	const { t } = useTranslation();
	const [activeStackId, setActiveStackId] = useState<string | null>(null);
	const location = useLocation();
	useRouteAnnouncement({ pageTitle: t('stack.label') || 'Stacks' });

	const { allStacks: localStacks } = useLocalStacks(ITEMS);
	const allStacks = useMemo(() => [...STACKS, ...localStacks], [localStacks]);

	// Bei jeder Änderung der URL-Query: ?stack=<id> lesen und Stack vorauswählen.
	useEffect(() => {
		const stackParam = location.query.stack;
		if (stackParam && allStacks.some((stack) => stack.id === stackParam)) {
			setActiveStackId(stackParam);
			return;
		}
		setActiveStackId(null);
	}, [allStacks, location.query.stack]);

	const [sortField, setSortField] = useState<SortField>('overall');
	const [sortDir, setSortDir] = useState<SortDir>('desc');
	const [viewMode, setViewMode] = useState<ViewMode>('tile');

	const activeStack = useMemo(() => allStacks.find((s) => s.id === activeStackId) ?? null, [activeStackId, allStacks]);

	const stackItemMap = useMemo<Map<string, StackItem>>(() => {
		if (!activeStack) return new Map();
		return new Map(activeStack.items.map((si) => [si.itemId, si]));
	}, [activeStack]);

	const baseItems = useMemo(() => {
		if (!activeStack) return ITEMS;
		return ITEMS.filter((item) => stackItemMap.has(item.id));
	}, [activeStack, stackItemMap]);

	const { filters, setFilters, filtered } = useFilters(baseItems, activeStack ? stackItemMap : undefined);

	useEffect(() => {
		setFilters((prev) => {
			return prev.selectedRelation ? { ...prev, selectedRelation: null } : prev;
		});
	}, [activeStackId, setFilters]);

	return (
		<main id="main-content" aria-labelledby="home-page-title">
			<h1 id="home-page-title" className="sr-only">
				{t('pages.home.title') || 'Categories'}
			</h1>
			<FilterBar
				filters={filters}
				onFilterChange={setFilters}
				layers={LAYERS}
				stacks={allStacks}
				activeStackId={activeStackId}
				onStackChange={setActiveStackId}
				items={baseItems}
				sortField={sortField}
				onSortFieldChange={setSortField}
				sortDir={sortDir}
				onSortDirToggle={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
				showDependencyControls={false}
			/>
			<CategoryGrid
				layers={LAYERS}
				articles={filtered}
				stackScoreItems={baseItems}
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
