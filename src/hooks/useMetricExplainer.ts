import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import type { MetricExplainerId } from '../types';

interface MetricExplainerContextType {
	openExplainerId: MetricExplainerId | null;
	setOpenExplainerId: (id: MetricExplainerId | null) => void;
}

export const MetricExplainerContext = createContext<MetricExplainerContextType | null>(null);

export function useMetricExplainer() {
	const context = useContext(MetricExplainerContext);
	if (!context) {
		throw new Error('useMetricExplainer must be used within MetricExplainerProvider');
	}
	return context;
}
