import type { Item, Stack } from '../types/index.js';

/**
 * Compute average sovereignty, adoption, and overall scores for a stack.
 */
export function computeStackMetrics(
	stack: Stack,
	itemMap: Map<string, Item>
): {
	avgSovereigntyScore: number;
	avgAdoptionScore: number;
	avgOverallScore: number;
} {
	let totalSovereignty = 0;
	let totalAdoption = 0;
	let totalOverall = 0;
	let count = 0;

	for (const stackItem of stack.items) {
		const item = itemMap.get(stackItem.itemId);
		if (!item) continue;

		count++;

		if (item.sovereigntyScore !== undefined) {
			totalSovereignty += item.sovereigntyScore;
		}

		if (item.adoption) {
			totalAdoption += item.adoption.adoptionScore;
			totalOverall += item.adoption.overallScore;
		}
	}

	return {
		avgSovereigntyScore: count > 0 ? Math.round(totalSovereignty / count) : 0,
		avgAdoptionScore: count > 0 ? Math.round(totalAdoption / count) : 0,
		avgOverallScore: count > 0 ? Math.round(totalOverall / count) : 0,
	};
}
