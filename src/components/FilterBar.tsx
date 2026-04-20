import { KolButton, KolInputCheckbox, KolInputText, KolSingleSelect } from '@public-ui/preact';
import { useMemo } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FilterState, Item, Layer, ParticipantRole, Stack } from '../types';
import { getDependencyTypes, getLocalizedText } from '../utils';

export type ViewMode = 'tile' | 'list';
export type SortField = 'name' | 'overall' | 'sovereignty' | 'adoption' | 'sovereignAdoption';
export type SortDir = 'asc' | 'desc';

interface FilterBarProps {
	filters: FilterState;
	onFilterChange: (filters: FilterState) => void;
	layers: Layer[];
	stacks: Stack[];
	activeStackId: string | null;
	onStackChange: (id: string | null) => void;
	items: Item[];
	sortField: SortField;
	onSortFieldChange: (field: SortField) => void;
	sortDir: SortDir;
	onSortDirToggle: () => void;
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
	showDependencyControls?: boolean;
}

export function FilterBar({
	filters,
	onFilterChange,
	layers,
	stacks,
	activeStackId,
	onStackChange,
	items,
	sortField,
	onSortFieldChange,
	sortDir,
	onSortDirToggle,
	viewMode,
	onViewModeChange,
	showDependencyControls = false,
}: FilterBarProps) {
	const { i18n, t } = useTranslation();

	const layerOptions = [
		{ label: t('search.allCategories'), value: '' },
		...layers.map((layer) => ({ label: getLocalizedText(layer.name, i18n.language), value: layer.id })),
	];

	const stackOptions = [
		{ label: t('stack.all'), value: '' },
		...stacks.map((stack) => ({
			label: `${getLocalizedText(stack.name, i18n.language)} (${stack.items.length})`,
			value: stack.id,
		})),
	];
	const activeStack = activeStackId ? stacks.find((stack) => stack.id === activeStackId) : null;

	const sublayerOptions = (() => {
		if (!filters.selectedLayer) return [];
		const layerItems = items.filter((item) => item.layer === filters.selectedLayer);
		const sublayers = new Set(layerItems.map((item) => item.sublayer).filter((sublayer): sublayer is string => Boolean(sublayer)));
		return Array.from(sublayers).sort();
	})();
	const sublayerLabel = (slug: string) => t(`search.sublayers.${slug}`, { defaultValue: slug });

	const relationOptions = (() => {
		if (!activeStackId || !activeStack) return [];
		const roleCounts = activeStack.items.reduce(
			(acc, stackItem) => {
				acc[stackItem.role] = (acc[stackItem.role] ?? 0) + 1;
				return acc;
			},
			{} as Record<ParticipantRole, number>,
		);
		const roles: ParticipantRole[] = ['maintainer', 'contributor', 'funder', 'consumer'];
		return roles
			.filter((role) => (roleCounts[role] ?? 0) > 0)
			.map((role) => ({
				label: `${t(`stack.roles.${role}`)} (${roleCounts[role]})`,
				value: role,
			}));
	})();

	const dependencyTypeOptions = useMemo(
		() => [
			{ label: t('search.dependencies.allTypes'), value: '' },
			...getDependencyTypes(items).map((type) => ({ label: t(`search.dependencies.type.${type}`), value: type })),
		],
		[items, t],
	);

	const innerClassName = [
		'filter-bar__inner px-3 md:px-4 lg:px-5',
		activeStackId ? 'filter-bar__inner--with-relation' : 'filter-bar__inner--without-relation',
		filters.selectedLayer ? 'filter-bar__inner--with-sublayer' : 'filter-bar__inner--without-sublayer',
	].join(' ');

	return (
		<section className="filter-bar px-3 md:px-4 lg:px-5 py-2 md:py-3" aria-label={t('search.regionAria')}>
			<div className={innerClassName}>
				<KolInputText
					className="filter-bar__search"
					_label={t('search.inputLabel')}
					_hideLabel
					_type="search"
					_value={filters.searchQuery}
					_placeholder={t('search.placeholder')}
					_on={{
						onInput: (_e: globalThis.Event, value: unknown) => onFilterChange({ ...filters, searchQuery: value as string }),
					}}
				/>
				<KolSingleSelect
					className="filter-bar__select filter-bar__select--stack sort-select"
					_label={t('stack.label')}
					_hideLabel
					_options={stackOptions}
					_value={activeStackId ?? ''}
					_on={{
						onChange: (_e: globalThis.Event, value: unknown) => {
							onStackChange(value ? (value as string) : null);
							onFilterChange({ ...filters, selectedRelation: null });
						},
					}}
				/>
				<KolSingleSelect
					className="filter-bar__select filter-bar__select--layer sort-select"
					_label={t('search.categoryLabel')}
					_hideLabel
					_options={layerOptions}
					_value={filters.selectedLayer ?? ''}
					_on={{
						onChange: (_e: globalThis.Event, value: unknown) =>
							onFilterChange({ ...filters, selectedLayer: value ? (value as string) : null, selectedSublayer: null }),
					}}
				/>
				{filters.selectedLayer && (
					<KolSingleSelect
						className="filter-bar__select filter-bar__select--sublayer sort-select"
						_label={t('search.sublayerLabel')}
						_hideLabel
						_options={[
							{ label: t('search.allSublayers'), value: '' },
							...sublayerOptions.map((sublayer) => ({ label: sublayerLabel(sublayer), value: sublayer })),
						]}
						_value={filters.selectedSublayer ?? ''}
						_disabled={sublayerOptions.length === 0}
						_on={{
							onChange: (_e: globalThis.Event, value: unknown) => onFilterChange({ ...filters, selectedSublayer: value ? (value as string) : null }),
						}}
					/>
				)}
				{activeStackId && (
					<KolSingleSelect
						className="filter-bar__select filter-bar__select--relation sort-select"
						_label={t('search.relationLabel')}
						_hideLabel
						_options={[{ label: t('search.allRelations'), value: '' }, ...relationOptions]}
						_value={filters.selectedRelation ?? ''}
						_on={{
							onChange: (_e: globalThis.Event, value: unknown) => onFilterChange({ ...filters, selectedRelation: value ? (value as ParticipantRole) : null }),
						}}
					/>
				)}
				{showDependencyControls && (
					<>
						<KolSingleSelect
							className="filter-bar__select filter-bar__select--dependency-depth sort-select"
							_label={t('search.dependencies.depthLabel')}
							_hideLabel
							_options={[
								{ label: t('search.dependencies.allDepths'), value: '' },
								{ label: t('search.dependencies.depth.1'), value: '1' },
								{ label: t('search.dependencies.depth.2'), value: '2' },
								{ label: t('search.dependencies.depth.3'), value: '3' },
							]}
							_value={filters.dependencyDepth ? String(filters.dependencyDepth) : ''}
							_on={{
								onChange: (_e: globalThis.Event, value: unknown) => {
									const parsedDepth = value ? Number(value) : null;
									onFilterChange({
										...filters,
										dependencyDepth: parsedDepth && [1, 2, 3].includes(parsedDepth) ? (parsedDepth as 1 | 2 | 3) : null,
									});
								},
							}}
						/>
						<KolSingleSelect
							className="filter-bar__select filter-bar__select--dependency-type sort-select"
							_label={t('search.dependencies.typeLabel')}
							_hideLabel
							_options={dependencyTypeOptions}
							_value={filters.selectedDependencyType ?? ''}
							_on={{
								onChange: (_e: globalThis.Event, value: unknown) =>
									onFilterChange({ ...filters, selectedDependencyType: value ? (value as FilterState['selectedDependencyType']) : null }),
							}}
						/>
						<KolInputCheckbox
							className="filter-bar__direct-toggle"
							_label={t('search.dependencies.directOnlyLabel')}
							_variant="switch"
							_checked={filters.onlyDirectDependencies}
							_on={{
								onChange: (_e: globalThis.Event, value: unknown) => onFilterChange({ ...filters, onlyDirectDependencies: Boolean(value) }),
							}}
						/>
					</>
				)}
				<div className="filter-bar__sort">
					<KolSingleSelect
						className="sort-select"
						_label={t('view.sort.label')}
						_hideLabel
						_options={[
							{ label: t('view.sort.name'), value: 'name' },
							{ label: t('view.sort.overall'), value: 'overall' },
							{ label: t('view.sort.sovereignty'), value: 'sovereignty' },
							{ label: t('view.sort.adoption'), value: 'adoption' },
							{ label: t('view.sort.sovereignAdoption'), value: 'sovereignAdoption' },
						]}
						_value={sortField}
						_on={{
							onChange: (_e: globalThis.Event, value: unknown) => onSortFieldChange(value as SortField),
						}}
					/>
					<KolButton
						_label={sortDir === 'asc' ? t('view.sort.asc') : t('view.sort.desc')}
						_hideLabel
						_icons={{ left: sortDir === 'asc' ? 'kolicon kolicon-sort-asc' : 'kolicon kolicon-sort-desc' }}
						_variant="secondary"
						_on={{ onClick: onSortDirToggle }}
					/>
				</div>
				<KolInputCheckbox
					className="filter-bar__view-toggle"
					_label={t('view.viewToggle')}
					_hideLabel
					_variant="switch"
					_checked={viewMode === 'list'}
					_on={{
						onChange: (_e: globalThis.Event, value: unknown) => onViewModeChange(value ? 'list' : 'tile'),
					}}
				/>
			</div>
		</section>
	);
}
