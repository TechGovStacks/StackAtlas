import { describe, expect, it } from 'vitest';
import { Item, Stack, StackItem } from '../../types';
import { computeStackAvgScore, computeStackItemOverallScore } from '../useStackMetrics';

const baseItem: Item = {
	id: 'item-1',
	name: 'Item One',
	layer: 'applications',
	description: 'desc',
	tags: [],
	oss: true,
	sovereigntyCriteria: {
		openSource: false,
		euHeadquartered: true,
		hasAudit: false,
		permissiveLicense: false,
		matureProject: true,
		selfHostable: false,
		dataPortability: false,
		openStandards: false,
		noTelemetryByDefault: false,
		ownerType: 'corporation',
	},
	adoption: {
		adoptionScore: 10,
		sovereignAdoptionScore: 10,
		overallScore: 10,
		directCoverage: 0,
		transitiveCoverage: 0,
		diversity: 0,
		usedInStacks: [],
	},
};

describe('computeStackItemOverallScore', () => {
	it('applies stack relation context', () => {
		const maintainerStackItem: StackItem = { itemId: baseItem.id, role: 'maintainer', status: 'recommended' };
		const consumerStackItem: StackItem = { itemId: baseItem.id, role: 'consumer', status: 'recommended' };

		const maintainerScore = computeStackItemOverallScore(baseItem, maintainerStackItem);
		const consumerScore = computeStackItemOverallScore(baseItem, consumerStackItem);

		expect(maintainerScore).toBeGreaterThan(consumerScore);
	});
});

describe('computeStackAvgScore', () => {
	it('uses contextual dependency score for stack average', () => {
		const stack: Stack = {
			id: 'stack-1',
			name: 'Stack',
			version: '1',
			items: [
				{ itemId: baseItem.id, role: 'maintainer', status: 'recommended' },
				{ itemId: 'item-2', role: 'consumer', status: 'recommended' },
			],
		};
		const secondItem: Item = {
			...baseItem,
			id: 'item-2',
			name: 'Item Two',
		};

		const avgScore = computeStackAvgScore(stack, [baseItem, secondItem]);
		expect(avgScore).toBeGreaterThan(secondItem.adoption?.overallScore ?? 0);
	});
});
