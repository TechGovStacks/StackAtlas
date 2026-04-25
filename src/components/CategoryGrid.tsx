import { KolPagination } from '@public-ui/preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FilterState, Item, Layer, Stack, StackItem } from '../types';
import { computeSublayerCoverageHints, getLocalizedText } from '../utils';
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
	totalCount: number;
	activeStack?: Stack;
	stackItemMap?: Map<string, StackItem>;
	sortField: SortField;
	sortDir: SortDir;
	viewMode: ViewMode;
}

const ITEMS_PER_PAGE = 15;

export function CategoryGrid({
	layers,
	articles,
	stackScoreItems,
	filters,
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

	// Default AdoptionResult with all fields zeroed (except usedInStacks)
	const defaultAdoptionResult = {
		adoptionScore: 0,
		sovereignAdoptionScore: 0,
		overallScore: 0,
		directCoverage: 0,
		transitiveCoverage: 0,
		diversity: 0,
		usedInStacks: [],
	};

	// Precompute scores for all articles
	const precomputedScores = useMemo(() => {
		return articles.map((article) => {
			const stackItem = stackItemMap?.get(article.id);
			const sovereigntyScore = computeEffectiveSovereigntyScore(article.sovereigntyCriteria, stackItem);
			const adoption = article.adoption ?? defaultAdoptionResult;
			const contextualOverallScore = computeContextualOverallScore(sovereigntyScore, adoption, stackItem);
			return {
				...article,
				_precomputed: {
					sovereigntyScore,
					contextualOverallScore,
					adoption,
				},
			};
		});
	}, [articles, stackItemMap]);

	const sortedArticles = useMemo(
		() =>
			[...precomputedScores].sort((a, b) => {
				let cmp = 0;

				if (sortField === 'name') {
					cmp = getLocalizedText(a.name, i18n.language).localeCompare(getLocalizedText(b.name, i18n.language), i18n.language);
				} else if (sortField === 'overall') {
					cmp = a._precomputed.contextualOverallScore - b._precomputed.contextualOverallScore;
				} else if (sortField === 'sovereignty') {
					cmp = a._precomputed.sovereigntyScore - b._precomputed.sovereigntyScore;
				} else if (sortField === 'adoption') {
					cmp = (a._precomputed.adoption.adoptionScore ?? 0) - (b._precomputed.adoption.adoptionScore ?? 0);
				} else if (sortField === 'sovereignAdoption') {
					cmp = (a._precomputed.adoption.sovereignAdoptionScore ?? 0) - (b._precomputed.adoption.sovereignAdoptionScore ?? 0);
				}

				return sortDir === 'asc' ? cmp : -cmp;
			}),
		[precomputedScores, sortField, sortDir, i18n.language],
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

	const coverageHintsByItemId = useMemo(() => {
		if (!activeStack || !stackItemMap) {
			return new Map();
		}

		const sourceItems = stackScoreItems ?? articles;
		return computeSublayerCoverageHints(sourceItems, stackItemMap);
	}, [activeStack, articles, stackItemMap, stackScoreItems]);

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
									coverageHint={coverageHintsByItemId.get(article.id)}
								/>
							</li>
						))}
					</ul>
					{activeCount > ITEMS_PER_PAGE && (
						<KolPagination
							className="my-4"
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
