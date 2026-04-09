import { KolPagination } from '@public-ui/preact';
import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FilterState, Item, Layer, Stack, StackItem } from '../types';
import { getLocalizedText } from '../utils';
import { computeSovereigntyScore } from '../utils/sovereigntyScore';
import { ArticleCard } from './ArticleCard';
import { SortDir, SortField, ViewMode } from './FilterBar';
import { StackStats } from './StackStats';

interface CategoryGridProps {
	layers: Layer[];
	articles: Item[];
	filters: FilterState;
	onFilterChange: (filters: FilterState) => void;
	totalCount: number;
	activeStack?: Stack;
	stackItemMap?: Map<string, StackItem>;
	sortField: SortField;
	sortDir: SortDir;
	viewMode: ViewMode;
}

const ITEMS_PER_PAGE = 12;

export function CategoryGrid({
	layers,
	articles,
	filters,
	onFilterChange,
	totalCount,
	activeStack,
	stackItemMap,
	sortField,
	sortDir,
	viewMode,
}: CategoryGridProps) {
	const { i18n, t } = useTranslation();
	const [currentPage, setCurrentPage] = useState(1);

	const sortedArticles = useMemo(
		() =>
			[...articles].sort((a, b) => {
				const cmp =
					sortField === 'name'
						? getLocalizedText(a.name, i18n.language).localeCompare(getLocalizedText(b.name, i18n.language), i18n.language)
						: (a.sovereigntyScore ?? computeSovereigntyScore(a.sovereigntyCriteria)) - (b.sovereigntyScore ?? computeSovereigntyScore(b.sovereigntyCriteria));
				return sortDir === 'asc' ? cmp : -cmp;
			}),
		[articles, sortField, sortDir, i18n.language],
	);

	const activeCount = articles.length;
	const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedArticles = sortedArticles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

	// Reset to page 1 when filters change
	const handleFilterChange = (newFilters: FilterState) => {
		onFilterChange(newFilters);
		setCurrentPage(1);
	};
	void handleFilterChange;

	return (
		<div id="main-content" className="category-container px-3 md:px-4 lg:px-5">
			{activeStack && stackItemMap && <StackStats stack={activeStack} items={articles} stackItemMap={stackItemMap} />}

			<p className="results-info" aria-live="polite" aria-atomic="true">
				{filters.searchQuery || filters.selectedLayer ? (
					<>
						<strong>{activeCount}</strong> {t('category.results.filteredPrefix')} {totalCount} {t('category.results.entries')}
						{filters.selectedLayer && (
							<>
								{' '}
								<em>
									{t('category.results.inCategory', {
										category: getLocalizedText(layers.find((c) => c.id === filters.selectedLayer)?.name ?? '', i18n.language),
									})}
								</em>
							</>
						)}
						{filters.searchQuery && <> {t('category.results.forQuery', { query: filters.searchQuery })}</>}
					</>
				) : (
					<>
						<strong>{totalCount}</strong> {t('category.results.totalTechnologiesAndStandards')}
					</>
				)}
			</p>

			{articles.length === 0 ? (
				<div className="articles-grid">
					<div className="empty-state">
						<div className="empty-state__icon" aria-hidden="true">
							🔍
						</div>
						<p className="empty-state__title">{t('results.noneFound')}</p>
						<p>{t('results.adjustFilters')}</p>
					</div>
				</div>
			) : (
				<>
					<ul className={viewMode === 'tile' ? 'articles-grid' : 'articles-list'}>
						{paginatedArticles.map((article) => (
							<li key={article.id}>
								<ArticleCard
									article={article}
									stackItem={stackItemMap?.get(article.id)}
									stackItemMap={activeStack ? stackItemMap : undefined}
									viewMode={viewMode}
								/>
							</li>
						))}
					</ul>
					{activeCount > ITEMS_PER_PAGE && (
						<KolPagination
							className="my-4"
							style={{ background: 'transparent' }}
							_page={currentPage}
							_max={activeCount}
							_pageSize={ITEMS_PER_PAGE}
							_label={t('category.paginationLabel')}
							_on={{
								onChangePage: (_event: unknown, page: number) => setCurrentPage(page),
							}}
						/>
					)}
				</>
			)}
		</div>
	);
}
