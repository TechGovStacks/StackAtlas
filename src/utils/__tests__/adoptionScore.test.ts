import { describe, expect, it } from 'vitest';
import type { Item, SovereigntyCriteria, Stack } from '../../types/index.js';
import { computeAdoptionScores } from '../adoptionScore.js';

const DEFAULT_CRITERIA: SovereigntyCriteria = {
	openSource: false,
	euHeadquartered: false,
	hasAudit: false,
	permissiveLicense: false,
	matureProject: false,
	selfHostable: false,
	dataPortability: false,
	openStandards: false,
	noTelemetryByDefault: false,
};

describe('computeAdoptionScores', () => {
	it('returns empty map for empty items', () => {
		const result = computeAdoptionScores([], []);
		expect(result.size).toBe(0);
	});

	it('assigns zero adoption score to items with no stack appearances', () => {
		const items: Item[] = [
			{
				id: 'item1',
				name: { de: 'Item 1', en: 'Item 1' },
				layer: 'infrastructure',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
			},
		];

		const result = computeAdoptionScores(items, []);
		expect(result.get('item1')).toBeDefined();
		expect(result.get('item1')?.adoptionScore).toBe(0);
		expect(result.get('item1')?.sovereignAdoptionScore).toBe(0);
	});

	it('scores item higher when in maintainer/recommended status vs consumer/deprecated', () => {
		const items: Item[] = [
			{
				id: 'item1',
				name: { de: 'Item 1', en: 'Item 1' },
				layer: 'infrastructure',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
				sovereigntyScore: 70,
			},
			{
				id: 'item2',
				name: { de: 'Item 2', en: 'Item 2' },
				layer: 'infrastructure',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
				sovereigntyScore: 70,
			},
		];

		const stack: Stack = {
			id: 'stack1',
			name: { de: 'Stack 1', en: 'Stack 1' },
			version: '1.0',
			items: [
				{ itemId: 'item1', status: 'recommended', role: 'maintainer' },
				{ itemId: 'item2', status: 'deprecated', role: 'consumer' },
			],
		};

		const result = computeAdoptionScores(items, [stack]);

		const score1 = result.get('item1')?.adoptionScore ?? 0;
		const score2 = result.get('item2')?.adoptionScore ?? 0;

		expect(score1).toBeGreaterThan(score2);
	});

	it('applies diversity multiplier based on country distribution', () => {
		const items: Item[] = [
			{
				id: 'item1',
				name: { de: 'Item 1', en: 'Item 1' },
				layer: 'infrastructure',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
				sovereigntyScore: 70,
			},
			{
				id: 'item2',
				name: { de: 'Item 2', en: 'Item 2' },
				layer: 'infrastructure',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
				sovereigntyScore: 70,
			},
		];

		const diverseStacks: Stack[] = [
			{
				id: 'stack1',
				name: { de: 'Stack DE', en: 'Stack DE' },
				country: 'DE',
				version: '1.0',
				items: [
					{ itemId: 'item1', status: 'recommended', role: 'maintainer' },
					{ itemId: 'item2', status: 'recommended', role: 'maintainer' },
				],
			},
			{
				id: 'stack2',
				name: { de: 'Stack FR', en: 'Stack FR' },
				country: 'FR',
				version: '1.0',
				items: [{ itemId: 'item1', status: 'recommended', role: 'maintainer' }],
			},
		];

		const monoStacks: Stack[] = [
			{
				id: 'stack3',
				name: { de: 'Stack DE 1', en: 'Stack DE 1' },
				country: 'DE',
				version: '1.0',
				items: [
					{ itemId: 'item1', status: 'recommended', role: 'maintainer' },
					{ itemId: 'item2', status: 'recommended', role: 'maintainer' },
				],
			},
			{
				id: 'stack4',
				name: { de: 'Stack DE 2', en: 'Stack DE 2' },
				country: 'DE',
				version: '1.0',
				items: [{ itemId: 'item1', status: 'recommended', role: 'maintainer' }],
			},
		];

		const diverseResult = computeAdoptionScores(items, diverseStacks);
		const monoResult = computeAdoptionScores(items, monoStacks);

		// item1 appears in both diverse and mono stacks, but should score higher in diverse
		const diverseScore = diverseResult.get('item1')?.adoptionScore ?? 0;
		const monoScore = monoResult.get('item1')?.adoptionScore ?? 0;
		expect(diverseScore).toBeGreaterThanOrEqual(monoScore);
	});

	it('captures stack IDs where item appears', () => {
		const items: Item[] = [
			{
				id: 'item1',
				name: { de: 'Item 1', en: 'Item 1' },
				layer: 'infrastructure',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
			},
		];

		const stacks: Stack[] = [
			{
				id: 'stack1',
				name: { de: 'Stack 1', en: 'Stack 1' },
				version: '1.0',
				items: [{ itemId: 'item1', status: 'recommended', role: 'maintainer' }],
			},
			{
				id: 'stack2',
				name: { de: 'Stack 2', en: 'Stack 2' },
				version: '1.0',
				items: [{ itemId: 'item1', status: 'approved', role: 'consumer' }],
			},
		];

		const result = computeAdoptionScores(items, stacks);
		const usedStacks = result.get('item1')?.usedInStacks ?? [];

		expect(usedStacks).toContain('stack1');
		expect(usedStacks).toContain('stack2');
		expect(usedStacks.length).toBe(2);
	});

	it('normalizes all scores to [0, 100]', () => {
		const items: Item[] = Array.from({ length: 5 }, (_, i) => ({
			id: `item${i}`,
			name: { de: `Item ${i}`, en: `Item ${i}` },
			layer: 'infrastructure',
			description: { de: '', en: '' },
			tags: [],
			oss: true,
			sovereigntyCriteria: DEFAULT_CRITERIA,
			sovereigntyScore: 50,
		}));

		const stacks: Stack[] = [
			{
				id: 'stack1',
				name: { de: 'Stack 1', en: 'Stack 1' },
				version: '1.0',
				items: items.map((item) => ({
					itemId: item.id,
					status: 'recommended' as const,
					role: 'maintainer' as const,
				})),
			},
		];

		const result = computeAdoptionScores(items, stacks);

		for (const adoption of result.values()) {
			expect(adoption.adoptionScore).toBeGreaterThanOrEqual(0);
			expect(adoption.adoptionScore).toBeLessThanOrEqual(100);
			expect(adoption.sovereignAdoptionScore).toBeGreaterThanOrEqual(0);
			expect(adoption.sovereignAdoptionScore).toBeLessThanOrEqual(100);
		}
	});

	it('applies transitive weight correctly', () => {
		const items: Item[] = [
			{
				id: 'upstream',
				name: { de: 'Upstream', en: 'Upstream' },
				layer: 'infrastructure',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
				sovereigntyScore: 70,
			},
			{
				id: 'depends_on_upstream',
				name: { de: 'Depends', en: 'Depends' },
				layer: 'platform',
				description: { de: '', en: '' },
				tags: [],
				oss: true,
				sovereigntyCriteria: DEFAULT_CRITERIA,
				sovereigntyScore: 70,
				dependencies: [
					{
						targetItemId: 'upstream',
						type: 'runtime',
					},
				],
			},
		];

		const stack: Stack = {
			id: 'stack1',
			name: { de: 'Stack 1', en: 'Stack 1' },
			version: '1.0',
			items: [{ itemId: 'depends_on_upstream', status: 'recommended', role: 'maintainer' }],
		};

		const result = computeAdoptionScores(items, [stack]);

		// upstream should have non-zero score due to transitive coverage
		const upstreamScore = result.get('upstream')?.adoptionScore ?? 0;
		expect(upstreamScore).toBeGreaterThan(0);
	});
});
