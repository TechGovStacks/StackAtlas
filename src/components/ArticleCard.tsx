import { KolButton, KolCard, KolDrawer, KolImage } from '@public-ui/preact';
import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { ITEMS, LAYERS, STACKS } from '../data/catalog';
import { Item, ParticipantRole, SovereigntyCriteria, StackItem } from '../types';
import { buildDependencyGraph, getLocalizedText } from '../utils';
import { ADOPTION_WEIGHT, SOVEREIGN_ADOPTION_WEIGHT, SOVEREIGNTY_WEIGHT } from '../utils/overallScore';
import { computeEffectiveSovereigntyScoreResult, getScoreCategory, getScoreCategoryColor } from '../utils/sovereigntyScore';
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
}

const ROLE_COLORS: Record<ParticipantRole, string> = {
	maintainer: '#1565c0',
	contributor: '#2e7d32',
	funder: '#e65100',
	consumer: '#546e7a',
};
const CATALOG_DEPENDENCY_GRAPH = buildDependencyGraph(ITEMS);

function countryToFlagEmoji(code?: string): string {
	if (!code || code.length !== 2) return '';
	return [...code.toUpperCase()].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join('');
}

export function ArticleCard({ article, stackItem, stackItemMap, viewMode = 'tile' }: ArticleCardProps) {
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

	const overallScore = article.adoption?.overallScore ?? 0;
	// When the drawer is open and the active stack defines a role for the selected
	// (drill-down) article, honour that role too; otherwise fall back to the
	// outer stackItem context so navigation between related items keeps the
	// maintainer boost consistent for the same stack.
	const selectedStackItem = stackItemMap?.get(selectedArticle.id) ?? (selectedArticle.id === article.id ? stackItem : undefined);
	const selectedScoreResult = computeEffectiveSovereigntyScoreResult(selectedArticle.sovereigntyCriteria, selectedStackItem);
	const selectedScore = selectedScoreResult.score;
	const selectedMaintainerBoosted = selectedScoreResult.maintainerBoosted;
	const selectedOwnerCountry = selectedArticle.ownerCountry?.toUpperCase();
	const selectedOwnerCountryFlag = countryToFlagEmoji(selectedOwnerCountry);
	const selectedBoostedCriteria = new Set<keyof Omit<SovereigntyCriteria, 'ownerType'>>(selectedScoreResult.boostedCriteria);
	const criteriaKeys = (Object.keys(article.sovereigntyCriteria) as Array<keyof typeof article.sovereigntyCriteria>).filter((key) => key !== 'ownerType');

	const renderArticleLogo = (logo: string | undefined, localizedName: string, large = false) => {
		if (!logo) {
			return null;
		}

		const src = failedLogos.has(logo) ? 'assets/broken-logo.svg' : logo;
		const handleImageError = () => {
			setFailedLogos((prev) => new Set([...prev, logo]));
		};

		if (large) {
			return <img src={src} alt={localizedName} loading="lazy" className="article-logo--drawer" onError={() => handleImageError()} />;
		}

		return (
			<KolImage
				_src={src}
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
		<>
			<span
				className="card-score-badge"
				style={{ background: overallScoreColor, color: '#fff' }}
				title={`${t('article.scoreOverview.total')}: ${overallScore}/100`}
				aria-label={`${t('article.scoreOverview.total')}: ${overallScore}/100`}
			>
				<span className="card-score-number">{overallScore}</span>
				<span className="card-score-category">{t(`article.scoreCategories.${overallScoreCategory}`)}</span>
			</span>
			{stackItem && (
				<span className="card-role-badge" style={{ background: ROLE_COLORS[stackItem.role], color: '#fff' }} title={t(`stack.roles.${stackItem.role}`)}>
					{t(`stack.roles.${stackItem.role}`)}
				</span>
			)}
		</>
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
				<div className="drawer-content">
					<KolCard _label={localizedSelectedArticleName} className="drawer-card">
						<div className="drawer-details">
							<div className="drawer-headline">
								{renderArticleLogo(selectedArticle.logo, localizedSelectedArticleName, true)}
								<div>
									<p className="drawer-category">{t('article.categoryLabel', { category: categoryName })}</p>
									<div className="drawer-links">
										{selectedArticle.homepage && (
											<a href={selectedArticle.homepage} target="_blank" rel="noopener noreferrer" className="drawer-link">
												{t('article.website')}
											</a>
										)}
										{selectedArticle.github?.repo && (
											<a href={selectedArticle.github.repo} target="_blank" rel="noopener noreferrer" className="drawer-link drawer-link--github">
												{t('article.repository')}
											</a>
										)}
										{selectedArticle.license && (
											<span className="drawer-license-badge" title={`License: ${selectedArticle.license}`}>
												{selectedArticle.license}
											</span>
										)}
									</div>
								</div>
								<div className="drawer-score-section">
									{/* ── Gesamt-Score (Gauge) ─────────────────────────────── */}
									<p className="drawer-score-title">{t('article.scoreOverview.title')}</p>
									<div className="drawer-gauge-container">
										<SovereigntyGauge
											score={selectedArticle.adoption?.overallScore ?? 0}
											category={getScoreCategory(selectedArticle.adoption?.overallScore ?? 0)}
											size={160}
										/>
									</div>

									{/* ── Score-Herleitung ──────────────────────────────────── */}
									{selectedArticle.adoption && (
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
													<span className="score-breakdown__score" style={{ color: getScoreCategoryColor(selectedArticle.adoption.sovereignAdoptionScore) }}>
														{selectedArticle.adoption.sovereignAdoptionScore}/100
													</span>
													<span className="score-breakdown__weight">× {(SOVEREIGN_ADOPTION_WEIGHT * 100).toFixed(0)}%</span>
													<span className="score-breakdown__pts">
														{(selectedArticle.adoption.sovereignAdoptionScore * SOVEREIGN_ADOPTION_WEIGHT).toFixed(1)}
													</span>
												</div>
												<div className="score-breakdown__row">
													<span className="score-breakdown__label">{t('article.scoreOverview.adoption')}</span>
													<span className="score-breakdown__score" style={{ color: getScoreCategoryColor(selectedArticle.adoption.adoptionScore) }}>
														{selectedArticle.adoption.adoptionScore}/100
													</span>
													<span className="score-breakdown__weight">× {(ADOPTION_WEIGHT * 100).toFixed(0)}%</span>
													<span className="score-breakdown__pts">{(selectedArticle.adoption.adoptionScore * ADOPTION_WEIGHT).toFixed(1)}</span>
												</div>
												<div className="score-breakdown__row score-breakdown__row--total">
													<span className="score-breakdown__label">{t('article.scoreOverview.total')}</span>
													<span
														className="score-breakdown__score score-breakdown__score--total"
														style={{ color: getScoreCategoryColor(selectedArticle.adoption.overallScore) }}
													>
														{selectedArticle.adoption.overallScore}/100
													</span>
												</div>
											</div>
											<p className="score-breakdown__stacks">
												{t('article.scoreOverview.usedInStacks', { count: selectedArticle.adoption.usedInStacks.length })}
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
									<div className="drawer-criteria">
										{criteriaKeys.map((key) => {
											const isSatisfied = selectedArticle.sovereigntyCriteria[key];
											const isBoosted = selectedBoostedCriteria.has(key);
											const iconClass = isSatisfied ? 'criteria-icon criteria-icon--satisfied' : 'criteria-icon criteria-icon--unsatisfied';
											return (
												<div key={key} className={`drawer-criteria__item${isSatisfied ? ' drawer-criteria__item--satisfied' : ''}`}>
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
												</div>
											);
										})}
									</div>
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
														<button type="button" className="drawer-related__link" onClick={() => setSelectedDependencyId(edge.id)}>
															<span className="drawer-related__link-text">
																{getLocalizedText(edge.target.name, i18n.language)} ({edge.dependency.type}/
																{t(`dependencies.scope.${edge.dependency.scope ?? 'required'}`)})
															</span>
															<span className="drawer-related__link-icon" aria-hidden="true">
																›
															</span>
														</button>
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
														<button type="button" className="drawer-related__link" onClick={() => setSelectedDependencyId(edge.id)}>
															<span className="drawer-related__link-text">
																{getLocalizedText(edge.source.name, i18n.language)} ({edge.dependency.type}/
																{t(`dependencies.scope.${edge.dependency.scope ?? 'required'}`)})
															</span>
															<span className="drawer-related__link-icon" aria-hidden="true">
																›
															</span>
														</button>
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
													<a href={`#/stacks?stack=${stack.id}`} className="drawer-related__link" onClick={() => setIsDrawerOpen(false)}>
														<span className="drawer-related__link-text">{getLocalizedText(stack.name, i18n.language)}</span>
														<span className="drawer-related__link-icon" aria-hidden="true">
															›
														</span>
													</a>
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
												<button
													className="drawer-related__link"
													onClick={() => {
														setSelectedArticle(relatedArticle);
														setSelectedDependencyId(null);
													}}
												>
													<span className="drawer-related__link-text">{getLocalizedText(relatedArticle.name, i18n.language)}</span>
													<span className="drawer-related__link-icon" aria-hidden="true">
														›
													</span>
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</KolCard>
				</div>
			</KolDrawer>
		</div>
	);
}
