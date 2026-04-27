import { KolAlert, KolAvatar, KolBadge, KolButton, KolCard, KolDrawer, KolImage, KolLinkButton } from '@public-ui/preact';
import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { ROLE_COLORS } from '../constants/roleColors';
import { ITEMS, LAYERS, STACKS } from '../data/catalog';
import { Item, SovereigntyCriteria, StackItem } from '../types';
import { buildDependencyGraph, countryToFlagEmoji, getLocalizedText } from '../utils';
import {
	ADOPTION_WEIGHT,
	computeContextualOverallScore,
	SOVEREIGN_ADOPTION_WEIGHT,
	SOVEREIGNTY_WEIGHT,
	withStackRoleAdoptionContext,
} from '../utils/overallScore';
import { computeEffectiveSovereigntyScoreResult, getScoreCategory, getScoreCategoryColor } from '../utils/sovereigntyScore';
import { SublayerCoverageHint } from '../utils/sublayerCoverageHint';
import { SovereigntyGauge } from './SovereigntyGauge';

type ViewMode = 'tile' | 'list';

/**
 * ArticleCardProps: Displays an Item (dependency) with optional stack-specific metadata.
 *
 * The article parameter is a dependency (technology, standard, or tool).
 * The stackItem parameter (if provided) contains the stack's relationship to this dependency:
 * - role: The stack's role (maintainer, contributor, funder, consumer)
 * - status: Whether this is recommended, approved, or deprecated
 * - rationale: Why the stack chose this dependency
 * - alternatives: Other items that could fulfill the same function
 *
 * For items in the "sovereign-standards" layer, the role indicates the stack's
 * commitment to that foundational standard.
 */
interface ArticleCardProps {
	/** The item (dependency) to display: a technology, standard, or tool */
	article: Item;
	/** Optional: Stack's relationship/role with respect to this item */
	stackItem?: StackItem;
	/** Optional: Map of all stack items for context (used when displaying items within a stack context) */
	stackItemMap?: Map<string, StackItem>;
	viewMode?: ViewMode;
	coverageHint?: SublayerCoverageHint;
}

const CATALOG_DEPENDENCY_GRAPH = buildDependencyGraph(ITEMS);

export function ArticleCard({ article, stackItem, stackItemMap, viewMode = 'tile', coverageHint }: ArticleCardProps) {
	const { i18n, t } = useTranslation();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedArticle, setSelectedArticle] = useState(article);
	const [selectedDependencyId, setSelectedDependencyId] = useState<string | null>(null);
	const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());
	const localizedArticleName = getLocalizedText(article.name, i18n.language);
	const localizedSelectedArticleName = getLocalizedText(selectedArticle.name, i18n.language);
	const category = LAYERS.find((c) => c.id === selectedArticle.layer);
	const categoryColor = category?.color ?? '#003d82';
	const categoryName = getLocalizedText(category?.name ?? { de: 'Allgemein', en: 'General', fr: 'Général' }, i18n.language);
	const relatedArticles = ITEMS.filter(
		(candidate) =>
			candidate.layer === selectedArticle.layer && candidate.id !== selectedArticle.id && (stackItemMap === undefined || stackItemMap.has(candidate.id)),
	).sort((a, b) => getLocalizedText(a.name, i18n.language).localeCompare(getLocalizedText(b.name, i18n.language), i18n.language));

	const stacksContainingItem = useMemo(() => {
		return STACKS.filter((stack) => stack.items.some((item) => item.itemId === selectedArticle.id));
	}, [selectedArticle.id]);
	const outgoingDependencies = CATALOG_DEPENDENCY_GRAPH.outgoingById.get(selectedArticle.id) ?? [];
	const incomingDependencies = CATALOG_DEPENDENCY_GRAPH.incomingById.get(selectedArticle.id) ?? [];
	const selectedDependency = [...outgoingDependencies, ...incomingDependencies].find((edge) => edge.id === selectedDependencyId) ?? null;

	const overallScore = article.adoption ? computeContextualOverallScore(article.sovereigntyScore ?? 0, article.adoption, stackItem) : 0;
	// When the drawer is open and the active stack defines a role for the selected
	// (drill-down) article, honour that role too; otherwise fall back to the
	// outer stackItem context so navigation between related items keeps the
	// maintainer boost consistent for the same stack.
	const selectedStackItem = stackItemMap?.get(selectedArticle.id) ?? (selectedArticle.id === article.id ? stackItem : undefined);
	const selectedScoreResult = computeEffectiveSovereigntyScoreResult(selectedArticle.sovereigntyCriteria, selectedStackItem);
	const selectedScore = selectedScoreResult.score;
	const selectedAdoption = selectedArticle.adoption ? withStackRoleAdoptionContext(selectedArticle.adoption, selectedStackItem) : undefined;
	const selectedOverallScore = selectedArticle.adoption
		? computeContextualOverallScore(selectedScoreResult.rawScore, selectedArticle.adoption, selectedStackItem)
		: 0;
	const selectedMaintainerBoosted = selectedScoreResult.maintainerBoosted;
	const selectedOwnerCountry = selectedArticle.ownerCountry?.toUpperCase();
	const selectedOwnerCountryFlag = countryToFlagEmoji(selectedOwnerCountry);
	const selectedBoostedCriteria = new Set<keyof Omit<SovereigntyCriteria, 'ownerType'>>(selectedScoreResult.boostedCriteria);
	const criteriaKeys = (Object.keys(article.sovereigntyCriteria) as Array<keyof typeof article.sovereigntyCriteria>).filter((key) => key !== 'ownerType');

	const coverageHintInline = coverageHint
		? t('article.coverageHint.inline', {
				item: getLocalizedText(coverageHint.betterItemName, i18n.language),
			})
		: null;

	const renderArticleLogo = (logo: string | undefined, localizedName: string, large = false) => {
		const fallbackClassName = large ? 'article-logo-placeholder article-logo-placeholder--drawer' : 'article-logo-placeholder';
		const fallback = <KolAvatar className={fallbackClassName} _label={localizedName} />;

		if (!logo || failedLogos.has(logo)) return fallback;

		const handleImageError = () => {
			setFailedLogos((prev) => new Set([...prev, logo]));
		};

		if (large) {
			return <KolImage _src={logo} _alt={localizedName} _loading="lazy" className="article-logo--drawer" _on={{ error: handleImageError }} />;
		}

		return (
			<KolImage
				_src={logo}
				_alt={localizedName}
				_loading="lazy"
				className="article-logo"
				_width={40}
				_height={40}
				_on={{
					error: handleImageError,
				}}
			/>
		);
	};

	const openButton = (
		<KolButton
			_label={t('article.openDetails')}
			_variant="secondary"
			_on={{
				onClick: () => {
					setSelectedArticle(article);
					setSelectedDependencyId(null);
					setIsDrawerOpen(true);
				},
			}}
		/>
	);

	const overallScoreColor = getScoreCategoryColor(overallScore);
	const overallScoreCategory = getScoreCategory(overallScore);

	const badges = (
		<div className="card-badges">
			<KolBadge
				className="card-score-badge"
				_color={overallScoreColor}
				_label={`${overallScore} · ${t(`article.scoreCategories.${overallScoreCategory}`)}`}
				title={`${t('article.scoreOverview.total')}: ${overallScore}/100`}
				aria-label={`${t('article.scoreOverview.total')}: ${overallScore}/100`}
			/>
			{stackItem && (
				<KolBadge
					className="card-role-badge"
					_color={ROLE_COLORS[stackItem.role]}
					_label={t(`stack.roles.${stackItem.role}`)}
					title={t(`stack.roles.${stackItem.role}`)}
				/>
			)}
		</div>
	);

	return (
		<div className={`article-card-wrapper${viewMode === 'list' ? ' article-card-wrapper--list' : ''}`}>
			{viewMode === 'tile' ? (
				<KolCard _label={localizedArticleName} className="article-card">
					<div className="card-content">
						<div className="card-header">
							{renderArticleLogo(article.logo, localizedArticleName)}
							<span
								className="card-category-dot"
								style={{ background: categoryColor }}
								title={categoryName}
								aria-label={t('article.categoryAria', { category: categoryName })}
							/>
							{badges}
						</div>
						<p className="card-description">{getLocalizedText(article.description, i18n.language)}</p>
						{coverageHintInline && (
							<KolAlert className="article-coverage-hint" _level={4} _type="info" _variant="msg">
								{coverageHintInline}
							</KolAlert>
						)}
						<div className="card-action">{openButton}</div>
					</div>
				</KolCard>
			) : (
				<div className="article-card article-card--list" role="article" aria-label={localizedArticleName}>
					<div className="card-list-logo">
						{renderArticleLogo(article.logo, localizedArticleName)}
						<span
							className="card-category-dot"
							style={{ background: categoryColor }}
							title={categoryName}
							aria-label={t('article.categoryAria', { category: categoryName })}
						/>
					</div>
					<div className="card-list-body">
						<p className="card-list-name">{localizedArticleName}</p>
						<p className="card-description card-description--truncate">{getLocalizedText(article.description, i18n.language)}</p>
						{coverageHintInline && (
							<KolAlert className="article-coverage-hint" _level={4} _type="info" _variant="msg">
								{coverageHintInline}
							</KolAlert>
						)}
					</div>
					<div className="card-list-badges">{badges}</div>
					<div className="card-action">{openButton}</div>
				</div>
			)}

			<KolDrawer
				_label={t('article.detailsFor', { name: localizedSelectedArticleName })}
				_align="right"
				_hasCloser
				_open={isDrawerOpen}
				_on={{
					onClose: () => setIsDrawerOpen(false),
				}}
			>
				<div className="article-drawer-content">
					<KolCard _label={localizedSelectedArticleName} className="drawer-card">
						<div className="drawer-details">
							<div className="drawer-headline">
								{renderArticleLogo(selectedArticle.logo, localizedSelectedArticleName, true)}
								<div>
									<p className="drawer-category">{t('article.categoryLabel', { category: categoryName })}</p>
									<div className="drawer-links">
										{selectedArticle.homepage && (
											<KolLinkButton
												_label={t('article.website')}
												_href={selectedArticle.homepage}
												_target="_blank"
												_variant="secondary"
												className="drawer-link"
											/>
										)}
										{selectedArticle.github?.repo && (
											<KolLinkButton
												_label={t('article.repository')}
												_href={selectedArticle.github.repo}
												_target="_blank"
												_variant="secondary"
												className="drawer-link"
											/>
										)}
										{selectedArticle.license && (
											<KolBadge
												className="drawer-license-badge"
												_color="#f5f5f5"
												_label={selectedArticle.license}
												title={`License: ${selectedArticle.license}`}
											/>
										)}
									</div>
								</div>
								<div className="drawer-score-section">
									{/* ── Gesamt-Score (Gauge) ─────────────────────────────── */}
									<p className="drawer-score-title">{t('article.scoreOverview.title')}</p>
									<div className="drawer-gauge-container">
										<SovereigntyGauge score={selectedOverallScore} category={getScoreCategory(selectedOverallScore)} size={160} />
									</div>

									{/* ── Score-Herleitung ──────────────────────────────────── */}
									{selectedAdoption && (
										<div className="score-breakdown">
											<p className="score-breakdown__title">{t('article.scoreOverview.calculation')}</p>
											<div className="score-breakdown__rows">
												<div className="score-breakdown__row">
													<span className="score-breakdown__label">{t('article.scoreOverview.sovereignty')}</span>
													<span className="score-breakdown__score" style={{ color: getScoreCategoryColor(selectedScoreResult.rawScore) }}>
														{selectedScoreResult.rawScore}/100
													</span>
													<span className="score-breakdown__weight">× {(SOVEREIGNTY_WEIGHT * 100).toFixed(0)}%</span>
													<span className="score-breakdown__pts">{(selectedScoreResult.rawScore * SOVEREIGNTY_WEIGHT).toFixed(1)}</span>
												</div>
												<div className="score-breakdown__row">
													<span className="score-breakdown__label">{t('article.scoreOverview.sovereignAdoption')}</span>
													<span className="score-breakdown__score" style={{ color: getScoreCategoryColor(selectedAdoption.sovereignAdoptionScore) }}>
														{selectedAdoption.sovereignAdoptionScore}/100
													</span>
													<span className="score-breakdown__weight">× {(SOVEREIGN_ADOPTION_WEIGHT * 100).toFixed(0)}%</span>
													<span className="score-breakdown__pts">{(selectedAdoption.sovereignAdoptionScore * SOVEREIGN_ADOPTION_WEIGHT).toFixed(1)}</span>
												</div>
												<div className="score-breakdown__row">
													<span className="score-breakdown__label">{t('article.scoreOverview.adoption')}</span>
													<span className="score-breakdown__score" style={{ color: getScoreCategoryColor(selectedAdoption.adoptionScore) }}>
														{selectedAdoption.adoptionScore}/100
													</span>
													<span className="score-breakdown__weight">× {(ADOPTION_WEIGHT * 100).toFixed(0)}%</span>
													<span className="score-breakdown__pts">{(selectedAdoption.adoptionScore * ADOPTION_WEIGHT).toFixed(1)}</span>
												</div>
												<div className="score-breakdown__row score-breakdown__row--total">
													<span className="score-breakdown__label">{t('article.scoreOverview.total')}</span>
													<span className="score-breakdown__score score-breakdown__score--total" style={{ color: getScoreCategoryColor(selectedOverallScore) }}>
														{selectedOverallScore}/100
													</span>
												</div>
											</div>
											<p className="score-breakdown__stacks">{t('article.scoreOverview.usedInStacks', { count: selectedAdoption.usedInStacks.length })}</p>
											<p className="score-breakdown__stacks">
												{t('article.scoreOverview.directCoverage')}: {selectedAdoption.directCoverage.toFixed(2)}
											</p>
											<p className="score-breakdown__stacks">
												{t('article.scoreOverview.transitiveCoverage')}: {selectedAdoption.transitiveCoverage.toFixed(2)}
											</p>
											<p className="score-breakdown__stacks">
												{t('article.scoreOverview.diversity')}: {(selectedAdoption.diversity * 100).toFixed(0)}%
											</p>
										</div>
									)}

									{/* ── Maintainer-Boost ──────────────────────────────────── */}
									{selectedMaintainerBoosted && (
										<div className="drawer-maintainer-boost">
											<p className="drawer-maintainer-boost__title">{t('article.maintainerBoost.title')}</p>
											<p className="drawer-maintainer-boost__explanation">
												{t('article.maintainerBoost.explanation', {
													effectiveScore: selectedScore,
													rawScore: selectedScoreResult.rawScore,
												})}
											</p>
										</div>
									)}

									{/* ── Souveränitäts-Kriterien ───────────────────────────── */}
									<p className="drawer-score-title">{t('article.sovereigntyScore')}</p>
									<ul className="drawer-criteria">
										{criteriaKeys.map((key) => {
											const isSatisfied = selectedArticle.sovereigntyCriteria[key];
											const isBoosted = selectedBoostedCriteria.has(key);
											const iconClass = isSatisfied ? 'criteria-icon criteria-icon--satisfied' : 'criteria-icon criteria-icon--unsatisfied';
											return (
												<li key={key} className={`drawer-criteria__item${isSatisfied ? ' drawer-criteria__item--satisfied' : ''}`}>
													<span className={iconClass} aria-hidden="true">
														{isSatisfied ? '✓' : '○'}
													</span>
													<span className="drawer-criteria__label">
														{t(`article.criteria.${key}`)}
														{isBoosted && (
															<span className="criteria-boosted-marker" title={t('article.maintainerBoost.criterionTitle')}>
																[{t('article.maintainerBoost.criterionMarker')}]
															</span>
														)}
													</span>
												</li>
											);
										})}
									</ul>
									{selectedOwnerCountry && (
										<div className="drawer-owner-info">
											<span className="drawer-owner-flag">{selectedOwnerCountryFlag}</span>
											<span className="drawer-owner-country">{selectedOwnerCountry}</span>
										</div>
									)}
								</div>
								{stackItem?.rationale && (
									<div className="drawer-rationale">
										<p className="drawer-rationale__title">{t('stack.rationale')}</p>
										<p>{getLocalizedText(stackItem.rationale, i18n.language)}</p>
									</div>
								)}
								<div className="drawer-dependencies">
									{outgoingDependencies.length > 0 && (
										<div className="drawer-dependencies__section">
											<p className="drawer-dependencies__title">{t('dependencies.requiredByItem')}</p>
											<ul className="drawer-dependencies__list">
												{outgoingDependencies.map((edge) => (
													<li key={edge.id} className="drawer-dependencies__item">
														<KolButton
															_label={`${getLocalizedText(edge.target.name, i18n.language)} (${edge.dependency.type}/${t(`dependencies.scope.${edge.dependency.scope ?? 'required'}`)})`}
															_variant="secondary"
															className="drawer-related__link"
															_on={{ onClick: () => setSelectedDependencyId(edge.id) }}
														/>
													</li>
												))}
											</ul>
										</div>
									)}
									{incomingDependencies.length > 0 && (
										<div className="drawer-dependencies__section">
											<p className="drawer-dependencies__title">{t('dependencies.usedBy')}</p>
											<ul className="drawer-dependencies__list">
												{incomingDependencies.map((edge) => (
													<li key={edge.id} className="drawer-dependencies__item">
														<KolButton
															_label={`${getLocalizedText(edge.source.name, i18n.language)} (${edge.dependency.type}/${t(`dependencies.scope.${edge.dependency.scope ?? 'required'}`)})`}
															_variant="secondary"
															className="drawer-related__link"
															_on={{ onClick: () => setSelectedDependencyId(edge.id) }}
														/>
													</li>
												))}
											</ul>
										</div>
									)}
									{selectedDependency && (
										<div className="drawer-dependencies__reason">
											<p className="drawer-dependencies__reason-title">{t('dependencies.whyConnection')}</p>
											<p>
												{getLocalizedText(selectedDependency.source.name, i18n.language)} → {getLocalizedText(selectedDependency.target.name, i18n.language)}
											</p>
											<p>
												{t('dependencies.meta', {
													type: selectedDependency.dependency.type,
													scope: t(`dependencies.scope.${selectedDependency.dependency.scope ?? 'required'}`),
												})}
											</p>
											<p>
												{selectedDependency.dependency.reason
													? getLocalizedText(selectedDependency.dependency.reason, i18n.language)
													: t('dependencies.noReason')}
											</p>
										</div>
									)}
								</div>
								{!stackItem && stacksContainingItem.length > 0 && (
									<div className="drawer-stacks">
										<p className="drawer-stacks__title">Stacks</p>
										<ul className="drawer-stacks__list">
											{stacksContainingItem.map((stack) => (
												<li key={stack.id} className="drawer-stacks__item">
													<KolLinkButton
														_label={getLocalizedText(stack.name, i18n.language)}
														_href={`#/stacks?stack=${stack.id}`}
														_variant="secondary"
														className="drawer-related__link"
														_on={{ onClick: () => setIsDrawerOpen(false) }}
													/>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>{' '}
							<p className="drawer-description">{getLocalizedText(selectedArticle.description, i18n.language)}</p>
							{relatedArticles.length > 0 && (
								<div className="drawer-related">
									<p className="drawer-related__title">{stackItemMap !== undefined ? t('article.relatedTitle') : t('article.relatedTitleLayer')}</p>
									<p className="drawer-related__subtitle">
										{stackItemMap !== undefined
											? t('article.relatedSubtitleStack', { count: relatedArticles.length })
											: t('article.relatedSubtitleLayer', { count: relatedArticles.length })}
									</p>
									<ul className="drawer-related__list">
										{relatedArticles.map((relatedArticle) => (
											<li key={relatedArticle.id} className="drawer-related__item">
												<KolButton
													_label={getLocalizedText(relatedArticle.name, i18n.language)}
													_variant="secondary"
													className="drawer-related__link"
													_on={{
														onClick: () => {
															setSelectedArticle(relatedArticle);
															setSelectedDependencyId(null);
														},
													}}
												/>
											</li>
										))}
									</ul>
								</div>
							)}
							<div className="drawer-footer mt-6 pt-6" style={{ borderTop: `1px solid var(--ds-color-border)` }}>
								<KolLinkButton
									_label={t('community.improveData')}
									_href={`${import.meta.env.VITE_GITHUB_REPO_URL ?? 'https://github.com/techgovstacks/stackatlas'}/issues/new?template=data_correction.yml&title=${encodeURIComponent(`Data Correction: ${localizedSelectedArticleName}`)}`}
									_target="_blank"
									_rel="noopener noreferrer"
									_variant="ghost"
									className="text-sm"
								/>
							</div>
						</div>
					</KolCard>
				</div>
			</KolDrawer>
		</div>
	);
}
