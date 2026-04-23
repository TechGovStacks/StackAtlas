import { KolPagination } from '@public-ui/preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FilterState, Item, Layer, Stack, StackItem } from '../types';
import { getLocalizedText } from '../utils';
import { computeContextualOverallScore } from '../utils/overallScore';
import { computeEffectiveSovereigntyScore } from '../utils/sovereigntyScore';
import { ArticleCard } from './ArticleCard';
import { SortDir, SortField, ViewMode } from './FilterBar';
import { StackStats } from './StackStats';

interface CategoryGridProps {
	layers: Layer[];
	articles: Item[];
	stackScoreItems?: Item[];
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
	stackScoreItems,
	filters,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	useEffect(() => {
		setCurrentPage(1);
	}, [
		filters.searchQuery,
		filters.selectedLayer,
		filters.selectedSublayer,
		filters.selectedRelation,
		filters.onlyDirectDependencies,
		filters.dependencyDepth,
		filters.selectedDependencyType,
	]);

	const sortedArticles = useMemo(
		() =>
			[...articles].sort((a, b) => {
				let cmp = 0;

				if (sortField === 'name') {
					cmp = getLocalizedText(a.name, i18n.language).localeCompare(getLocalizedText(b.name, i18n.language), i18n.language);
				} else if (sortField === 'overall') {
					const aScore = a.adoption
						? computeContextualOverallScore(
								computeEffectiveSovereigntyScore(a.sovereigntyCriteria, stackItemMap?.get(a.id)),
								a.adoption,
								stackItemMap?.get(a.id),
							)
						: 0;
					const bScore = b.adoption
						? computeContextualOverallScore(
								computeEffectiveSovereigntyScore(b.sovereigntyCriteria, stackItemMap?.get(b.id)),
								b.adoption,
								stackItemMap?.get(b.id),
							)
						: 0;
					cmp = bScore - aScore;
				} else if (sortField === 'sovereignty') {
					cmp =
						computeEffectiveSovereigntyScore(a.sovereigntyCriteria, stackItemMap?.get(a.id)) -
						computeEffectiveSovereigntyScore(b.sovereigntyCriteria, stackItemMap?.get(b.id));
				} else if (sortField === 'adoption') {
					cmp = (b.adoption?.adoptionScore ?? 0) - (a.adoption?.adoptionScore ?? 0);
				} else if (sortField === 'sovereignAdoption') {
					cmp = (b.adoption?.sovereignAdoptionScore ?? 0) - (a.adoption?.sovereignAdoptionScore ?? 0);
				}

				return sortDir === 'asc' ? cmp : -cmp;
			}),
		[articles, sortField, sortDir, i18n.language, stackItemMap],
	);

	const activeCount = articles.length;
	const totalPages = Math.max(1, Math.ceil(activeCount / ITEMS_PER_PAGE));

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedArticles = sortedArticles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

	return (
		<div id="category-results" className="category-container px-3 md:px-4 lg:px-5">
			{activeStack && stackItemMap && <StackStats stack={activeStack} items={stackScoreItems ?? articles} stackItemMap={stackItemMap} />}

			<p className="results-info" aria-live="polite" aria-atomic="true">
				{filters.searchQuery ||
				filters.selectedLayer ||
				filters.selectedRelation ||
				filters.onlyDirectDependencies ||
				filters.dependencyDepth ||
				filters.selectedDependencyType ? (
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
						{filters.selectedRelation && <> {t('category.results.withRelation', { relation: t(`stack.roles.${filters.selectedRelation}`) })}</>}
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
