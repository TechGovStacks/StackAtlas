import { KolButton } from '@public-ui/preact';
import { useTranslation } from 'react-i18next';
import { useMetricExplainer } from '../hooks/useMetricExplainer';
import type { MetricExplainerId } from '../types';

interface InfoIconProps {
	explainerId: MetricExplainerId;
	label?: string;
}

export function InfoIcon({ explainerId, label }: InfoIconProps) {
	const { t } = useTranslation();
	const { setOpenExplainerId } = useMetricExplainer();

	const ariaLabel = label ? t('metricExplainer.openFor', { label }) : t('metricExplainer.openExplainer');

	return (
		<KolButton
			_icon="codicon codicon-info"
			_variant="ghost"
			_aria-label={ariaLabel}
			_on={{
				onClick: () => setOpenExplainerId(explainerId),
			}}
			className="info-icon-button"
		/>
	);
}
