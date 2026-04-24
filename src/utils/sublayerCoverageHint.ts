import { Item, LocalizableText, StackItem } from '../types';
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

function toGroupKey(layer: string, comparableGroup: string, isGroupKey: boolean): string {
	const prefix = isGroupKey ? 'group' : 'sublayer';
	return `${layer}::${prefix}::${comparableGroup}`;
}

export function computeSublayerCoverageHints(items: Item[], stackItemMap?: Map<string, StackItem>): Map<string, SublayerCoverageHint> {
	const hintsByItemId = new Map<string, SublayerCoverageHint>();
	const groupedItems = new Map<string, ScoredItem[]>();

	for (const item of items) {
		const comparableGroup = item.groupKey ?? item.sublayer;
		if (!comparableGroup) {
			continue;
		}

		const groupKey = toGroupKey(item.layer, comparableGroup, !!item.groupKey);
		const groupItems = groupedItems.get(groupKey) ?? [];
		groupItems.push({
			id: item.id,
			score: computeEffectiveSovereigntyScore(item.sovereigntyCriteria, stackItemMap?.get(item.id)),
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
