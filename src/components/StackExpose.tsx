import { KolBadge, KolLinkButton } from '@public-ui/preact';
import { ComponentChildren } from 'preact';
import { useMemo } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { PARTICIPANT_ROLES, ROLE_COLORS } from '../constants/roleColors';
import { StackMetrics } from '../hooks/useStackMetrics';
import { Layer, Stack } from '../types';
import { countryToFlagEmoji, getLocalizedText } from '../utils';
import { SCORE_CATEGORIES, getScoreCategoryColorByCategory } from '../utils/sovereigntyScore';
import { InfoIcon } from './InfoIcon';
import { SovereigntyGauge } from './SovereigntyGauge';

interface StackExposeProps {
	children?: ComponentChildren;
	stack: Stack;
	metrics: StackMetrics;
	allLayers: Layer[];
	isTop: boolean;
	rank: number;
}

const STATUS_COLORS = {
	recommended: '#1565c0',
	approved: '#2e7d32',
	deprecated: '#c62828',
} as const;

// Farben für Metrik-Werte: ≥50 % positiv (grün), <50 % negativ (rot)
const METRIC_COLOR_POSITIVE = '#2e7d32';
const METRIC_COLOR_NEGATIVE = '#c62828';

function metricColor(pct: number): string {
	return pct >= 50 ? METRIC_COLOR_POSITIVE : METRIC_COLOR_NEGATIVE;
}

export function StackExpose({ stack, metrics, allLayers, isTop, rank, children }: StackExposeProps) {
	const { t, i18n } = useTranslation();
	const flag = countryToFlagEmoji(stack.country);
	const localizedName = getLocalizedText(stack.name, i18n.language);
	const localizedDescription = stack.description ? getLocalizedText(stack.description, i18n.language) : '';
	const stackSources = stack.sources ?? [];

	// Datumsformatierung memoizieren – stack.publishedAt und i18n.language sind stabil
	const formattedDate = useMemo(
		() =>
			stack.publishedAt ? new Intl.DateTimeFormat(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(stack.publishedAt)) : null,
		[stack.publishedAt, i18n.language],
	);

	return (
		<article className={`stack-expose${isTop ? ' stack-expose--rank1' : ''}`} aria-labelledby={`expose-${stack.id}-title`}>
			{/* ── Header ───────────────────────────────────────────────── */}
			<div className="stack-expose__header">
				<div className="stack-expose__headline">
					<span className={`stack-expose__rank${isTop ? ' stack-expose__rank--top' : ''}`} aria-label={t('stackGallery.rankAria', { rank })}>
						{isTop ? (
							<>
								<span aria-hidden="true">★</span>
							</>
						) : (
							rank
						)}
					</span>

					<div className="stack-expose__title-group">
						<h2 id={`expose-${stack.id}-title`} className="stack-expose__name">
							{flag && (
								<span className="stack-expose__flag" aria-hidden="true">
									{flag}{' '}
								</span>
							)}
							{localizedName}
							{isTop && <KolBadge className="stack-expose__best-badge" _label="★" aria-label={t('stackGallery.bestStack')} />}
						</h2>
					</div>

					{children && <div className="stack-expose__header-action">{children}</div>}
				</div>

				<div className="stack-expose__meta-row">
					{stack.issuer && <p className="stack-expose__issuer">{stack.issuer}</p>}
					<div className="stack-expose__meta">
						<span className={`stack-expose__version${formattedDate ? ' stack-expose__version--with-date' : ''}`}>v{stack.version}</span>
						{formattedDate && (
							<time className="stack-expose__date" dateTime={stack.publishedAt}>
								{formattedDate}
							</time>
						)}
					</div>
				</div>

				{localizedDescription && <p className="stack-expose__description">{localizedDescription}</p>}
				{stackSources.length > 0 && (
					<div className="stack-expose__sources">
						<p className="stack-expose__sources-title">{t('stackGallery.sourcesTitle')}</p>
						<ul className="stack-expose__sources-list">
							{stackSources.map((source) => {
								const sourceLabel = source.label ? getLocalizedText(source.label, i18n.language) : source.url;
								return (
									<li key={`${stack.id}-${source.url}`} className="stack-expose__sources-item">
										<a href={source.url} target="_blank" rel="noopener noreferrer" className="stack-expose__source-link">
											{sourceLabel}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>

			{/* ── Score-Sektion ─────────────────────────────────────────── */}
			<div className="stack-expose__score-section">
				<SovereigntyGauge score={metrics.avgScore} category={metrics.avgCategory} size={160} />
				<div className="stack-expose__score-meta">
					<div className="stack-expose__avg-label-row">
						<span className="stack-expose__avg-label">{t('stackGallery.avgScore')}</span>
						<InfoIcon explainerId="overallScore" label={t('stackGallery.avgScore')} />
					</div>
					<span className="stack-expose__avg-category" style={{ color: metrics.avgColor }}>
						{t(`article.scoreCategories.${metrics.avgCategory}`)}
					</span>
					<span className="stack-expose__item-count">{t('stackGallery.itemCount', { count: metrics.totalItems })}</span>
				</div>
			</div>

			{/* ── Score-Verteilung ──────────────────────────────────────── */}
			<div className="stack-expose__distribution-wrapper">
				<h3 className="stack-expose__section-title">{t('stackGallery.scoreDistribution')}</h3>
				<ul className="stack-expose__distribution" aria-label={t('stackGallery.scoreDistribution')}>
					{SCORE_CATEGORIES.map(({ category }) => {
						const count = metrics.scoreDistribution[category];
						const fillPct = metrics.totalItems > 0 ? Math.round((count / metrics.totalItems) * 100) : 0;
						return (
							<li key={category} className="stack-expose__dist-bar">
								<span className="stack-expose__dist-label">{t(`article.scoreCategories.${category}`)}</span>
								<div className="stack-expose__dist-track" role="presentation">
									<div
										className="stack-expose__dist-fill"
										role="progressbar"
										aria-label={`${t(`article.scoreCategories.${category}`)}: ${count}`}
										style={{ width: `${fillPct}%`, background: getScoreCategoryColorByCategory(category) }}
										aria-valuenow={count}
										aria-valuemin={0}
										aria-valuemax={metrics.totalItems}
									/>
								</div>
								<span className="stack-expose__dist-count" aria-hidden="true">
									{count}
								</span>
							</li>
						);
					})}
				</ul>
			</div>

			{/* ── Schlüssel-Metriken ───────────────────────────────────── */}
			<div className="stack-expose__metrics-wrapper">
				<h3 className="stack-expose__section-title">{t('stackGallery.keyMetrics')}</h3>
				<dl className="stack-expose__metrics">
					<div className="stack-expose__metric">
						<dt>
							<span>{t('stackGallery.metrics.selfHostable')}</span>
							<InfoIcon explainerId="selfHostable" label={t('stackGallery.metrics.selfHostable')} />
						</dt>
						<dd style={{ color: metricColor(metrics.pctSelfHostable) }}>{metrics.pctSelfHostable}%</dd>
					</div>
					<div className="stack-expose__metric">
						<dt>
							<span>{t('stackGallery.metrics.openSource')}</span>
							<InfoIcon explainerId="openSource" label={t('stackGallery.metrics.openSource')} />
						</dt>
						<dd style={{ color: metricColor(metrics.pctOpenSource) }}>{metrics.pctOpenSource}%</dd>
					</div>
					<div className="stack-expose__metric">
						<dt>
							<span>{t('stackGallery.metrics.euHQ')}</span>
							<InfoIcon explainerId="euHeadquartered" label={t('stackGallery.metrics.euHQ')} />
						</dt>
						<dd style={{ color: metricColor(metrics.pctEuHQ) }}>{metrics.pctEuHQ}%</dd>
					</div>
					<div className="stack-expose__metric">
						<dt>
							<span>{t('stackGallery.metrics.permissiveLicense')}</span>
							<InfoIcon explainerId="permissiveLicense" label={t('stackGallery.metrics.permissiveLicense')} />
						</dt>
						<dd style={{ color: metricColor(metrics.pctPermissiveLicense) }}>{metrics.pctPermissiveLicense}%</dd>
					</div>
					<div className="stack-expose__metric">
						<dt>
							<span>{t('stackGallery.metrics.audit')}</span>
							<InfoIcon explainerId="auditedCode" label={t('stackGallery.metrics.audit')} />
						</dt>
						<dd style={{ color: metricColor(metrics.pctAudit) }}>{metrics.pctAudit}%</dd>
					</div>
					<div className="stack-expose__metric">
						<dt>{t('stackGallery.metrics.ownerCountry')}</dt>
						<dd>
							{flag ? (
								<>
									<span aria-hidden="true">{flag}</span> {stack.country?.toUpperCase()}
								</>
							) : (
								t('stackGallery.metrics.unknown')
							)}
						</dd>
					</div>
				</dl>
			</div>

			{/* ── Rollen-Badges ─────────────────────────────────────────── */}
			<div className="stack-expose__roles-wrapper">
				<h3 className="stack-expose__section-title">{t('stackGallery.metrics.roles')}</h3>
				<div className="stack-expose__roles">
					{PARTICIPANT_ROLES.filter((role) => metrics.roleCounts[role] > 0).map((role) => (
						<KolBadge
							key={role}
							className="stack-expose__role-badge"
							_color={ROLE_COLORS[role]}
							_label={`${metrics.roleCounts[role]} ${t(`stack.roles.${role}`)}`}
						/>
					))}
				</div>
			</div>

			{/* ── Layer-Verteilung ──────────────────────────────────────── */}
			{metrics.layerBreakdown.length > 0 && (
				<div className="stack-expose__layers-wrapper">
					<h3 className="stack-expose__section-title">{t('stackGallery.metrics.layerBreakdown')}</h3>
					<ul className="stack-expose__layers">
						{metrics.layerBreakdown.map(({ layerId, count }) => {
							const layer = allLayers.find((l) => l.id === layerId);
							const layerName = layer ? getLocalizedText(layer.name, i18n.language) : layerId;
							const layerColor = layer?.color ?? '#999';
							return (
								<li key={layerId} className="stack-expose__layer-item">
									<span className="stack-expose__layer-dot" style={{ background: layerColor }} aria-hidden="true" />
									<span>{layerName}:</span>
									<strong>{count}</strong>
								</li>
							);
						})}
					</ul>
				</div>
			)}

			{/* ── Status-Zeile ──────────────────────────────────────────── */}
			<div className="stack-expose__statuses">
				{metrics.statusCounts.recommended > 0 && (
					<KolBadge
						className="stack-expose__status-badge stack-expose__status-badge--recommended"
						_color={STATUS_COLORS.recommended}
						_label={`${metrics.statusCounts.recommended} ${t('stackGallery.recommended')}`}
					/>
				)}
				{metrics.statusCounts.approved > 0 && (
					<KolBadge
						className="stack-expose__status-badge stack-expose__status-badge--approved"
						_color={STATUS_COLORS.approved}
						_label={`${metrics.statusCounts.approved} ${t('stackGallery.approved')}`}
					/>
				)}
				{metrics.statusCounts.deprecated > 0 && (
					<KolBadge
						className="stack-expose__status-badge stack-expose__status-badge--deprecated"
						_color={STATUS_COLORS.deprecated}
						_label={`${metrics.statusCounts.deprecated} ${t('stackGallery.deprecated')}`}
					/>
				)}
			</div>

			{/* ── CTA-Button ────────────────────────────────────────────── */}
			<div className="stack-expose__cta">
				<KolLinkButton _label={t('stackGallery.exploreStack')} _href={`#/deps?stack=${stack.id}`} _variant="primary" className="stack-expose__explore-link" />
			</div>
		</article>
	);
}
