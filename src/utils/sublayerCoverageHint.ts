import { Item, LocalizableText, StackItem } from '../types';
import { computeContextualOverallScore } from './overallScore';
import { computeEffectiveSovereigntyScore } from './sovereigntyScore';

export type SublayerCoverageHint = {
	betterItemId: string;
	betterItemName: LocalizableText;
	betterScore: number;
	currentScore: number;
};

type ScoredItem = {
	id: string;
	name: LocalizableText;
	score: number;
};

function toGroupKey(layer: string, groupKey: string): string {
	return `${layer}::${groupKey}`;
}

export function computeSublayerCoverageHints(items: Item[], stackItemMap?: Map<string, StackItem>): Map<string, SublayerCoverageHint> {
	const hintsByItemId = new Map<string, SublayerCoverageHint>();
	const groupedItems = new Map<string, ScoredItem[]>();

	for (const item of items) {
		const comparableGroup = item.groupKey;
		if (!comparableGroup) {
			continue;
		}

		const groupKey = toGroupKey(item.layer, comparableGroup);
		const groupItems = groupedItems.get(groupKey) ?? [];
		const stackItem = stackItemMap?.get(item.id);
		const sovereigntyScore = computeEffectiveSovereigntyScore(item.sovereigntyCriteria, stackItem);
		const score =
			stackItemMap && item.adoption
				? computeContextualOverallScore(sovereigntyScore, item.adoption, stackItem)
				: sovereigntyScore;
		groupItems.push({
			id: item.id,
			score,
			name: item.name,
		});
		groupedItems.set(groupKey, groupItems);
	}

	for (const groupItems of groupedItems.values()) {
		for (const currentItem of groupItems) {
			const betterCandidate = groupItems.reduce<ScoredItem | null>((best, candidate) => {
				if (candidate.id === currentItem.id || candidate.score <= currentItem.score) {
					return best;
				}

				if (best === null || candidate.score > best.score) {
					return candidate;
				}

				return best;
			}, null);

			if (!betterCandidate) {
				continue;
			}

			hintsByItemId.set(currentItem.id, {
				betterItemId: betterCandidate.id,
				betterItemName: betterCandidate.name,
				betterScore: betterCandidate.score,
				currentScore: currentItem.score,
			});
		}
	}

	return hintsByItemId;
}
