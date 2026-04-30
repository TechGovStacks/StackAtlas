import { KolButton, KolDrawer } from '@public-ui/preact';
import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { METRIC_EXPLAINERS } from '../data/metricExplainers';
import type { MetricExplainerId } from '../types';
import { getLocalizedText } from '../utils';

interface MetricInfoDrawerProps {
	explainerId: MetricExplainerId | null;
	onClose: () => void;
}

export function MetricInfoDrawer({ explainerId, onClose }: MetricInfoDrawerProps) {
	const { t, i18n } = useTranslation();
	const [cachedExplainerId, setCachedExplainerId] = useState<MetricExplainerId | null>(explainerId);

	useEffect(() => {
		if (explainerId) {
			setCachedExplainerId(explainerId);
		}
	}, [explainerId]);

	useEffect(() => {
		if (!explainerId) return;

		const handleKeyDown = (e: Event) => {
			if ('key' in e && e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [explainerId, onClose]);

	if (!cachedExplainerId) return null;

	const explainer = METRIC_EXPLAINERS[cachedExplainerId];
	if (!explainer) return null;

	const label = getLocalizedText(explainer.label, i18n.language);
	const definition = getLocalizedText(explainer.definition, i18n.language);
	const importance = getLocalizedText(explainer.importance, i18n.language);
	const calculation = explainer.calculation ? getLocalizedText(explainer.calculation, i18n.language) : null;
	const example = explainer.example ? getLocalizedText(explainer.example, i18n.language) : null;

	return (
		<KolDrawer
			_label={label}
			_open={Boolean(explainerId)}
			_align="right"
			_hasCloser
			_on={{
				onClose: onClose,
			}}
			className="metric-info-drawer"
		>
			<div className="metric-info-drawer-content">
				<section className="metric-info-section">
					<h3>{t('metricExplainer.definition')}</h3>
					<p>{definition}</p>
				</section>

				<section className="metric-info-section">
					<h3>{t('metricExplainer.importance')}</h3>
					<p>{importance}</p>
				</section>

				{calculation && (
					<section className="metric-info-section">
						<h3>{t('metricExplainer.calculation')}</h3>
						<p>{calculation}</p>
					</section>
				)}

				{example && (
					<section className="metric-info-section">
						<h3>{t('metricExplainer.example')}</h3>
						<p>{example}</p>
					</section>
				)}

				<div className="metric-info-drawer-action">
					<KolButton _label={t('metricExplainer.close')} _variant="primary" _on={{ onClick: onClose }} />
				</div>
			</div>
		</KolDrawer>
	);
}
