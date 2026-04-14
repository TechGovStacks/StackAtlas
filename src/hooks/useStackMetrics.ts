import { useMemo } from 'preact/hooks';
import { Item, Layer, ParticipantRole, SovereigntyScoreCategory, Stack, StackItem, StackItemStatus } from '../types';
import { computeEffectiveSovereigntyScore, getScoreCategory, getScoreCategoryColor } from '../utils/sovereigntyScore';

export interface StackMetrics {
	avgScore: number;
	avgColor: string;
	avgCategory: SovereigntyScoreCategory;
	/** Anzahl Items je Score-Kategorie */
	scoreDistribution: Record<SovereigntyScoreCategory, number>;
	/** Prozentsatz Items mit jeweiligem Souveränitätskriterium (rohe Kriterien) */
	pctSelfHostable: number;
	pctOpenSource: number;
	pctEuHQ: number;
	pctPermissiveLicense: number;
	pctAudit: number;
	/** Anzahl Items je Rolle */
	roleCounts: Record<ParticipantRole, number>;
	/** Anzahl Items je Status */
	statusCounts: Record<StackItemStatus, number>;
	/** Items je Layer, sortiert nach Layer-Order */
	layerBreakdown: Array<{ layerId: string; count: number }>;
	totalItems: number;
}

/**
 * Berechnet den Durchschnitts-Souveränitätsscore eines Stacks (effektiv, mit Maintainer-Kontext).
 * Kann auch außerhalb des Hooks für Sortieroperationen genutzt werden.
 */
export function computeStackAvgScore(stack: Stack, allItems: Item[]): number {
	const stackItemMap = new Map<string, StackItem>(stack.items.map((si) => [si.itemId, si]));
	const items = allItems.filter((item) => stackItemMap.has(item.id));
	if (items.length === 0) return 0;
	const scores = items.map((item) => computeEffectiveSovereigntyScore(item.sovereigntyCriteria, stackItemMap.get(item.id)));
	return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

const SCORE_CATEGORIES: SovereigntyScoreCategory[] = ['insufficient', 'minimal', 'adequate', 'good', 'excellent', 'outstanding'];
const PARTICIPANT_ROLES: ParticipantRole[] = ['maintainer', 'contributor', 'funder', 'consumer'];
const STACK_STATUSES: StackItemStatus[] = ['recommended', 'approved', 'deprecated'];

/**
 * Hook: Berechnet alle abgeleiteten Metriken für einen Stack.
 * Wrapped in useMemo – stabile Referenzen für Stack + allItems aus dem Katalog.
 */
export function useStackMetrics(stack: Stack, allItems: Item[], allLayers?: Layer[]): StackMetrics {
	return useMemo(() => {
		const stackItemMap = new Map<string, StackItem>(stack.items.map((si) => [si.itemId, si]));
		const items = allItems.filter((item) => stackItemMap.has(item.id));
		const total = items.length;

		const pct = (count: number) => (total > 0 ? Math.round((count / total) * 100) : 0);

		// Effektive Scores (mit Maintainer-Kontext)
		const scores = items.map((item) => computeEffectiveSovereigntyScore(item.sovereigntyCriteria, stackItemMap.get(item.id)));
		const avgScore = total > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

		// Score-Verteilung nach Kategorie
		const scoreDistribution = Object.fromEntries(SCORE_CATEGORIES.map((cat) => [cat, 0])) as Record<SovereigntyScoreCategory, number>;
		for (const score of scores) {
			const cat = getScoreCategory(score);
			scoreDistribution[cat]++;
		}

		// Kriterien-Prozentsätze (rohe Kriterien, kontextunabhängig)
		const pctSelfHostable = pct(items.filter((i) => i.sovereigntyCriteria.selfHostable).length);
		const pctOpenSource = pct(items.filter((i) => i.sovereigntyCriteria.openSource).length);
		const pctEuHQ = pct(items.filter((i) => i.sovereigntyCriteria.euHeadquartered).length);
		const pctPermissiveLicense = pct(items.filter((i) => i.sovereigntyCriteria.permissiveLicense).length);
		const pctAudit = pct(items.filter((i) => i.sovereigntyCriteria.hasAudit).length);

		// Rollen-Zählung
		const roleCounts = Object.fromEntries(PARTICIPANT_ROLES.map((r) => [r, 0])) as Record<ParticipantRole, number>;
		for (const si of stackItemMap.values()) {
			roleCounts[si.role]++;
		}

		// Status-Zählung
		const statusCounts = Object.fromEntries(STACK_STATUSES.map((s) => [s, 0])) as Record<StackItemStatus, number>;
		for (const si of stackItemMap.values()) {
			statusCounts[si.status]++;
		}

		// Layer-Verteilung
		const layerCountMap = new Map<string, number>();
		for (const item of items) {
			layerCountMap.set(item.layer, (layerCountMap.get(item.layer) ?? 0) + 1);
		}
		// Nach Layer-Order sortieren, falls Layer-Daten vorhanden
		const layerBreakdown = Array.from(layerCountMap.entries())
			.map(([layerId, count]) => ({ layerId, count }))
			.sort((a, b) => {
				if (!allLayers) return a.layerId.localeCompare(b.layerId);
				const orderA = allLayers.find((l) => l.id === a.layerId)?.order ?? 99;
				const orderB = allLayers.find((l) => l.id === b.layerId)?.order ?? 99;
				return orderA - orderB;
			});

		return {
			avgScore,
			avgColor: getScoreCategoryColor(avgScore),
			avgCategory: getScoreCategory(avgScore),
			scoreDistribution,
			pctSelfHostable,
			pctOpenSource,
			pctEuHQ,
			pctPermissiveLicense,
			pctAudit,
			roleCounts,
			statusCounts,
			layerBreakdown,
			totalItems: total,
		};
	}, [stack, allItems, allLayers]);
}
