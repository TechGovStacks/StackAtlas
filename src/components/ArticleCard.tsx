import { KolButton, KolCard, KolDrawer, KolImage } from '@public-ui/preact';
import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { ITEMS, LAYERS, STACKS } from '../data/catalog';
import { Item, ParticipantRole, SovereigntyCriteria, StackItem } from '../types';
import { buildDependencyGraph, getLocalizedText } from '../utils';
import { computeEffectiveSovereigntyScoreResult, computeOwnerScore } from '../utils/sovereigntyScore';
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

	const scoreResult = computeEffectiveSovereigntyScoreResult(article.sovereigntyCriteria, stackItem);
	const score = scoreResult.score;
	const scoreColor = scoreResult.color;
	// When the drawer is open and the active stack defines a role for the selected
	// (drill-down) article, honour that role too; otherwise fall back to the
	// outer stackItem context so navigation between related items keeps the
	// maintainer boost consistent for the same stack.
	const selectedStackItem = stackItemMap?.get(selectedArticle.id) ?? (selectedArticle.id === article.id ? stackItem : undefined);
	const selectedScoreResult = computeEffectiveSovereigntyScoreResult(selectedArticle.sovereigntyCriteria, selectedStackItem);
	const selectedScore = selectedScoreResult.score;
	const selectedScoreCategory = selectedScoreResult.category;
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

	const cardMaintainerBoosted = scoreResult.maintainerBoosted;
	const cardScoreTitleBase = `${t('article.scoreTitle')}: ${score}/100 (${t(`article.scoreCategories.${scoreResult.category}`)} - ${scoreResult.percentileInCategory}%)`;
	const cardScoreTitle = cardMaintainerBoosted
		? `${cardScoreTitleBase} — ${t('article.maintainerBoost.badgeTitle', { rawScore: scoreResult.rawScore })}`
		: cardScoreTitleBase;
	const badges = (
		<>
			<span
				className={`card-score-badge${cardMaintainerBoosted ? ' card-score-badge--maintainer-boosted' : ''}`}
				style={{ background: scoreColor, color: '#fff' }}
				title={cardScoreTitle}
				aria-label={
					cardMaintainerBoosted ? t('article.maintainerBoost.scoreAria', { score, rawScore: scoreResult.rawScore }) : t('article.scoreAria', { score })
				}
			>
				<span className="card-score-number">{score}</span>
				<span className="card-score-category">{t(`article.scoreCategories.${scoreResult.category}`)}</span>
				{cardMaintainerBoosted && (
					<span className="card-score-boost-marker" aria-hidden="true" title={t('article.maintainerBoost.markerTitle')}>
						⇪
					</span>
				)}
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
							</div>
							<div className="drawer-score-section">
								<p className="drawer-score-title">{t('article.sovereigntyScore')}</p>
								<div className="drawer-gauge-container">
									<SovereigntyGauge score={selectedScore} category={selectedScoreCategory} size={200} />
								</div>
								<p className={`drawer-score-category-label drawer-score-category-label--${selectedScoreCategory}`}>
									({t(`article.scoreCategories.${selectedScoreCategory}`)})
								</p>
								{selectedMaintainerBoosted && (
									<div className="drawer-maintainer-boost" role="note" aria-label={t('article.maintainerBoost.noteAria')}>
										<p className="drawer-maintainer-boost__title">
											<span aria-hidden="true">⇪ </span>
											{t('article.maintainerBoost.title')}
										</p>
										<p className="drawer-maintainer-boost__text">
											{t('article.maintainerBoost.explanation', {
												rawScore: selectedScoreResult.rawScore,
												effectiveScore: selectedScore,
											})}
										</p>
										{selectedBoostedCriteria.size > 0 && (
											<p className="drawer-maintainer-boost__criteria">
												{t('article.maintainerBoost.boostedCriteriaLabel')}:{' '}
												{Array.from(selectedBoostedCriteria)
													.map((key) => t(`article.criteria.${key}`))
													.join(', ')}
											</p>
										)}
									</div>
								)}
								<p className="drawer-score-description">{t(`article.scoreCategories.${selectedScoreCategory}Description`)}</p>
								<ul className="drawer-criteria-list">
									{criteriaKeys.map((key) => {
										const factual = selectedArticle.sovereigntyCriteria[key];
										const boosted = !factual && selectedBoostedCriteria.has(key);
										const state = boosted ? 'boosted' : factual ? 'yes' : 'no';
										const icon = boosted ? '⇪' : factual ? '✓' : '✗';
										return (
											<li
												key={key}
												className={`drawer-criteria-item drawer-criteria-item--${state}`}
												title={boosted ? t('article.maintainerBoost.criterionTitle') : undefined}
											>
												<span className="drawer-criteria-icon" aria-hidden="true">
													{icon}
												</span>
												{t(`article.criteria.${key}`)}
												{boosted && <span className="drawer-criteria-boost-label"> ({t('article.maintainerBoost.criterionMarker')})</span>}
											</li>
										);
									})}
									<li
										className={`drawer-criteria-item drawer-criteria-item--${computeOwnerScore(selectedArticle.sovereigntyCriteria.ownerType) > 0 ? 'yes' : 'no'}`}
									>
										<span className="drawer-criteria-icon" aria-hidden="true">
											{computeOwnerScore(selectedArticle.sovereigntyCriteria.ownerType) > 0 ? '✓' : '✗'}
										</span>
										{t('article.criteria.ownerType', {
											owner: selectedArticle.sovereigntyCriteria.ownerType
												? t(`article.ownerType.${selectedArticle.sovereigntyCriteria.ownerType}`)
												: t('article.ownerType.unknown'),
											points: computeOwnerScore(selectedArticle.sovereigntyCriteria.ownerType),
										})}
									</li>
									<li className={`drawer-criteria-item drawer-criteria-item--${selectedOwnerCountry ? 'yes' : 'no'}`}>
										<span className="drawer-criteria-icon" aria-hidden="true">
											{selectedOwnerCountry ? '✓' : '✗'}
										</span>
										{t('article.criteria.ownerCountry', {
											country: selectedOwnerCountry ? `${selectedOwnerCountryFlag} ${selectedOwnerCountry}` : t('article.ownerCountry.unknown'),
										})}
									</li>
								</ul>
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
