import { describe, expect, it } from 'vitest';
import { AdoptionResult, Item, SovereigntyCriteria, StackItem } from '../../types';
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

const zeroAdoption: AdoptionResult = {
	adoptionScore: 0,
	sovereignAdoptionScore: 0,
	overallScore: 0,
	directCoverage: 0,
	transitiveCoverage: 0,
	diversity: 0,
	usedInStacks: [],
};

function createItem(
	id: string,
	groupKey?: string,
	criteria: Partial<SovereigntyCriteria> = {},
	adoption?: AdoptionResult,
): Item {
	return {
		id,
		name: { de: id, en: id },
		groupKey,
		layer: 'platform',
		sublayer: 'some-sublayer',
		description: { de: id, en: id },
		oss: true,
		tags: [],
		sovereigntyCriteria: {
			...baseCriteria,
			...criteria,
		},
		adoption,
	};
}

describe('computeSublayerCoverageHints', () => {
	it('returns a hint when another item in the same groupKey has a higher score', () => {
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

	it('only compares within the same groupKey, not across different groupKeys', () => {
		const items = [
			createItem('react', 'component-framework', { openSource: true }),
			createItem('nextjs', 'server-side-rendering', { openSource: true, selfHostable: true }),
		];

		const hints = computeSublayerCoverageHints(items);

		expect(hints.size).toBe(0);
	});

	it('ignores items without a groupKey', () => {
		const items = [
			createItem('no-group-a'),
			createItem('no-group-b', undefined, { openSource: true, selfHostable: true }),
		];

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

	it('uses contextual overall score (sovereignty + adoption) when stack context and adoption data are present', () => {
		// Item A: high sovereignty (openSource + selfHostable + dataPortability = 15+20+15=50, base=65) but zero adoption
		// Item B: lower sovereignty (openSource only = 15, base=30) but high sovereign adoption score
		// Without stack: A beats B on sovereignty (65 > 30)
		// With stack and adoption: B's overall score (60%*30 + 25%*100 + 15%*80 = 18+25+12=55) may exceed A's (60%*65 + 0 + 0 = 39)
		const itemA = createItem('high-sovereignty', 'auth-provider', { openSource: true, selfHostable: true, dataPortability: true }, {
			...zeroAdoption,
			adoptionScore: 0,
			sovereignAdoptionScore: 0,
		});
		const itemB = createItem('high-adoption', 'auth-provider', { openSource: true }, {
			...zeroAdoption,
			adoptionScore: 80,
			sovereignAdoptionScore: 100,
		});

		const stackItemMap = new Map<string, StackItem>([
			['high-sovereignty', { itemId: 'high-sovereignty', role: 'consumer', status: 'approved' }],
			['high-adoption', { itemId: 'high-adoption', role: 'consumer', status: 'approved' }],
		]);

		const hintsWithStack = computeSublayerCoverageHints([itemA, itemB], stackItemMap);
		// B's overall: 60%*30 + 25%*100 + 15%*80 = 18+25+12=55; A's overall: 60%*65 = 39 → B is better
		expect(hintsWithStack.get('high-sovereignty')).toMatchObject({ betterItemId: 'high-adoption' });
		expect(hintsWithStack.has('high-adoption')).toBe(false);

		const hintsWithoutStack = computeSublayerCoverageHints([itemA, itemB]);
		// Without stack: compare sovereignty scores only → A(65) > B(30), so B gets the hint
		expect(hintsWithoutStack.get('high-adoption')).toMatchObject({ betterItemId: 'high-sovereignty' });
		expect(hintsWithoutStack.has('high-sovereignty')).toBe(false);
	});
});
