import { describe, expect, it } from 'vitest';
import { Item, SovereigntyCriteria, StackItem } from '../../types';
import { computeSublayerCoverageHints } from '../sublayerCoverageHint';

const baseCriteria: SovereigntyCriteria = {
	dataPortability: true,
	euHeadquartered: false,
	hasAudit: false,
	matureProject: false,
	noTelemetryByDefault: false,
	openSource: false,
	openStandards: false,
	ownerType: 'oneManShow',
	permissiveLicense: false,
	selfHostable: false,
};

function createItem(id: string, sublayer?: string, criteria: Partial<SovereigntyCriteria> = {}): Item {
	return {
		id,
		name: { de: id, en: id },
		layer: 'platform',
		sublayer,
		description: { de: id, en: id },
		oss: true,
		tags: [],
		sovereigntyCriteria: {
			...baseCriteria,
			...criteria,
		},
	};
}

describe('computeSublayerCoverageHints', () => {
	it('returns a hint when another item in the same layer+sublayer has a higher score', () => {
		const items = [createItem('low', 'messaging', { openSource: true }), createItem('high', 'messaging', { openSource: true, selfHostable: true })];

		const hints = computeSublayerCoverageHints(items);

		expect(hints.get('low')).toMatchObject({
			betterItemId: 'high',
			betterScore: 50,
			currentScore: 30,
		});
		expect(hints.has('high')).toBe(false);
	});

	it('does not return hints on score ties', () => {
		const items = [createItem('a', 'identity', { openSource: true }), createItem('b', 'identity', { openSource: true })];

		const hints = computeSublayerCoverageHints(items);

		expect(hints.size).toBe(0);
	});

	it('uses effective sovereignty score with stack role context', () => {
		const items = [
			createItem('maintained', 'registry', { ownerType: 'corporation', openSource: false }),
			createItem('standard', 'registry', { ownerType: 'corporation', openSource: true }),
		];
		const stackItemMap = new Map<string, StackItem>([
			[
				'maintained',
				{
					itemId: 'maintained',
					role: 'maintainer',
					status: 'recommended',
				},
			],
		]);

		const hints = computeSublayerCoverageHints(items, stackItemMap);

		expect(hints.has('maintained')).toBe(false);
		expect(hints.get('standard')).toMatchObject({
			betterItemId: 'maintained',
			betterScore: 78,
		});
	});

	it('ignores items without sublayer', () => {
		const items = [createItem('no-sublayer'), createItem('other', 'runtime', { openSource: true, selfHostable: true })];

		const hints = computeSublayerCoverageHints(items);

		expect(hints.size).toBe(0);
	});
});
