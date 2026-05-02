import { useMemo } from 'preact/hooks';
import { Item, Layer, ParticipantRole, SovereigntyScoreCategory, Stack, StackItem, StackItemStatus } from '../types';
import { computeItemContextualOverallScore } from '../utils/overallScore';
import { SCORE_CATEGORIES, getScoreCategory, getScoreCategoryColor } from '../utils/sovereigntyScore';

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
	rolleCounts: Record<ParticipantRole, number>;
	/** Anzahl Items je Status */
	statusCounts: Record<StackItemStatus, number>;
	/** Items je Layer, sortiert nach Layer-Order */
	layerBreakdown: Array<{ layerId: string; count: number }>;
	totalItems: number;
}

/**
 * Berechnet den Durchschnitts-Overall-Score eines Stacks (Adoption-basiert).
 * Wird für Ranking und Sortierung in der Stack-Galerie genutzt.
 */
export function computeStackAvgScore(stack: Stack, allItems: Item[]): number {
	const stackItemMap = new Map<string, StackItem>(stack.items.map((si) => [si.itemId, si]));
	const items = allItems.filter((item) => stackItemMap.has(item.id));
	if (items.length === 0) return 0;
	const scores = items.map((item) => computeItemContextualOverallScore(item, stackItemMap.get(item.id)));
	const raw = scores.reduce((a, b) => a + b, 0) / scores.length;
	return Math.round(raw * 10) / 10;
}

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

		// Overall Scores (für Ranking und Galerie)
		const overallScores = items.map((item) => computeItemContextualOverallScore(item, stackItemMap.get(item.id)));
		const avgScore = total > 0 ? Math.round((overallScores.reduce((a, b) => a + b, 0) / overallScores.length) * 10) / 10 : 0;

		// Score-Verteilung nach Kategorie (basierend auf Overall Scores)
		const scoreDistribution = Object.fromEntries(SCORE_CATEGORIES.map(({ category }) => [category, 0])) as Record<SovereigntyScoreCategory, number>;
		for (const score of overallScores) {
			const cat = getScoreCategory(score);
			scoreDistribution[cat]++;
		}

		// Kriterien-Prozentsätze in einem Durchlauf (rohe Kriterien, kontextunabhängig)
		let countSelfHostable = 0, countOpenSource = 0, countEuHQ = 0, countPermissiveLicense = 0, countAudit = 0;
		for (const i of items) {
			if (i.sovereigntyCriteria.selfHostable) countSelfHostable++;
			if (i.sovereigntyCriteria.openSource) countOpenSource++;
			if (i.sovereigntyCriteria.euHeadquartered) countEuHQ++;
			if (i.sovereigntyCriteria.permissiveLicense) countPermissiveLicense++;
			if (i.sovereigntyCriteria.hasAudit) countAudit++;
		}
		const pctSelfHostable = pct(countSelfHostable);
		const pctOpenSource = pct(countOpenSource);
		const pctEuHQ = pct(countEuHQ);
		const pctPermissiveLicense = pct(countPermissiveLicense);
		const pctAudit = pct(countAudit);

		// Rollen-Zählung
		const roleCounts = Object.fromEntries(PARTICIPANT_ROLES.map((r) => [r, 0])) as Record<ParticipantRole, number>;
		for (const si of stackItemMap.values()) {
			rolleCounts[si.role]++;
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
		// Layer-Order als Map vorberechnen, um find() im Sort-Comparator zu vermeiden
		const layerOrderMap = allLayers ? new Map(allLayers.map((l) => [l.id, l.order])) : null;
		const layerBreakdown = Array.from(layerCountMap.entries())
			.map(([layerId, count]) => ({ layerId, count }))
			.sort((a, b) => {
				if (!layerOrderMap) return a.layerId.localeCompare(b.layerId);
				return (layerOrderMap.get(a.layerId) ?? 99) - (layerOrderMap.get(b.layerId) ?? 99);
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
			rolleCounts,
			statusCounts,
			layerBreakdown,
			totalItems: total,
		};
	}, [stack, allItems, allLayers]);
}
