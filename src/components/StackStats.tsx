import { KolBadge } from '@public-ui/preact';
import { useTranslation } from 'react-i18next';
import { PARTICIPANT_ROLES, ROLE_COLORS } from '../constants/roleColors';
import { Item, Stack, StackItem } from '../types';
import { getLocalizedText } from '../utils';
import { computeItemContextualOverallScore } from '../utils/overallScore';
import { getScoreCategory, getScoreCategoryColor } from '../utils/sovereigntyScore';
import { InfoIcon } from './InfoIcon';

interface StackStatsProps {
	stack: Stack;
	items: Item[];
	stackItemMap: Map<string, StackItem>;
}

export function StackStats({ stack, items, stackItemMap }: StackStatsProps) {
	const { i18n, t } = useTranslation();

	// Calculate average Overall Score from all items in this stack
	const scores = items.map((item) => computeItemContextualOverallScore(item, stackItemMap.get(item.id)));
	const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
	const avgColor = getScoreCategoryColor(avgScore);
	const avgCategory = getScoreCategory(avgScore);

	const roleCounts = Array.from(stackItemMap.values()).reduce(
		(acc, si) => {
			acc[si.role] = (acc[si.role] ?? 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	return (
		<div className="stack-stats">
			<div className="stack-stats__info">
				<span className="stack-stats__name">{getLocalizedText(stack.name, i18n.language)}</span>
				<span className="stack-stats__meta">
					{t('stack.stats.version', { version: stack.version })} &middot; {t('stack.stats.items', { count: stack.items.length })}
				</span>
				{stack.issuer && <span className="stack-stats__issuer">{stack.issuer}</span>}
			</div>
			<div className="stack-stats__score">
				<div className="stack-stats__score-label-wrapper">
					<span className="stack-stats__score-label">{t('stack.stats.avgScore')}</span>
					<InfoIcon explainerId="overallScore" label={t('stack.stats.avgScore')} />
				</div>
				<div className="stack-stats__score-container">
					<span className="stack-stats__score-value" style={{ color: avgColor }}>
						{avgScore}/100
					</span>
					<span className="stack-stats__score-category" style={{ color: avgColor, fontSize: '0.75rem', fontWeight: 600 }}>
						{t(`article.scoreCategories.${avgCategory}`)}
					</span>
				</div>
			</div>
			<div className="stack-stats__roles">
				{PARTICIPANT_ROLES.filter((role) => roleCounts[role]).map((role) => (
					<KolBadge key={role} className="stack-stats__role-badge" _color={ROLE_COLORS[role]} _label={`${roleCounts[role]} ${t(`stack.roles.${role}`)}`} />
				))}
			</div>
		</div>
	);
}
