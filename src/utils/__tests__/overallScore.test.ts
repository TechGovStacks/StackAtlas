import { describe, expect, it } from 'vitest';
import type { AdoptionResult, StackItem } from '../../types/index.js';
import { computeContextualOverallScore, computeOverallScore, enrichAdoptionWithOverallScore, withStackRoleAdoptionContext } from '../overallScore.js';

describe('computeOverallScore', () => {
	it('computes weighted sum of 60% sovereignty + 25% sovereign adoption + 15% adoption', () => {
		const sovereigntyScore = 100;
		const adoption: AdoptionResult = {
			adoptionScore: 100,
			sovereignAdoptionScore: 100,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		const result = computeOverallScore(sovereigntyScore, adoption);
		expect(result).toBe(100);
	});

	it('returns zero when all inputs are zero', () => {
		const sovereigntyScore = 0;
		const adoption: AdoptionResult = {
			adoptionScore: 0,
			sovereignAdoptionScore: 0,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		const result = computeOverallScore(sovereigntyScore, adoption);
		expect(result).toBe(0);
	});

	it('respects weight distribution (60/25/15)', () => {
		const adoption1: AdoptionResult = {
			adoptionScore: 100,
			sovereignAdoptionScore: 0,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		const adoption2: AdoptionResult = {
			adoptionScore: 0,
			sovereignAdoptionScore: 100,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		const adoption3: AdoptionResult = {
			adoptionScore: 0,
			sovereignAdoptionScore: 0,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		// Score from sovereignty only
		const score1 = computeOverallScore(100, adoption3);
		expect(score1).toBe(60);

		// Score from sovereign adoption only
		const score2 = computeOverallScore(0, adoption2);
		expect(score2).toBe(25);

		// Score from adoption only
		const score3 = computeOverallScore(0, adoption1);
		expect(score3).toBe(15);
	});

	it('clamps result to [0, 100]', () => {
		const adoption: AdoptionResult = {
			adoptionScore: 200,
			sovereignAdoptionScore: 200,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		const result = computeOverallScore(200, adoption);
		expect(result).toBeLessThanOrEqual(100);
		expect(result).toBeGreaterThanOrEqual(0);
	});

	it('produces reasonable scores for mixed inputs', () => {
		const adoption: AdoptionResult = {
			adoptionScore: 50,
			sovereignAdoptionScore: 60,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		const result = computeOverallScore(70, adoption);
		// 0.6 * 70 + 0.25 * 60 + 0.15 * 50
		// = 42 + 15 + 7.5 = 64.5
		expect(result).toBe(65);
	});
});

describe('enrichAdoptionWithOverallScore', () => {
	it('adds overall score to adoption result', () => {
		const adoption: AdoptionResult = {
			adoptionScore: 50,
			sovereignAdoptionScore: 60,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};

		const enriched = enrichAdoptionWithOverallScore(adoption, 70);

		expect(enriched.overallScore).toBeGreaterThan(0);
		expect(enriched.adoptionScore).toBe(adoption.adoptionScore);
		expect(enriched.sovereignAdoptionScore).toBe(adoption.sovereignAdoptionScore);
	});

	it('preserves all other fields', () => {
		const adoption: AdoptionResult = {
			adoptionScore: 50,
			sovereignAdoptionScore: 60,
			overallScore: 0,
			directCoverage: 123,
			transitiveCoverage: 45,
			diversity: 0.8,
			usedInStacks: ['stack1', 'stack2'],
		};

		const enriched = enrichAdoptionWithOverallScore(adoption, 70);

		expect(enriched.directCoverage).toBe(adoption.directCoverage);
		expect(enriched.transitiveCoverage).toBe(adoption.transitiveCoverage);
		expect(enriched.diversity).toBe(adoption.diversity);
		expect(enriched.usedInStacks).toEqual(adoption.usedInStacks);
	});
});

describe('withStackRoleAdoptionContext', () => {
	const baseAdoption: AdoptionResult = {
		adoptionScore: 0,
		sovereignAdoptionScore: 0,
		overallScore: 0,
		directCoverage: 0,
		transitiveCoverage: 0,
		diversity: 0,
		usedInStacks: [],
	};

	it('applies a strong floor for maintainer relationships', () => {
		const stackItem: StackItem = {
			itemId: 'item1',
			role: 'maintainer',
			status: 'approved',
		};
		const contextual = withStackRoleAdoptionContext(baseAdoption, stackItem);
		expect(contextual.adoptionScore).toBeGreaterThanOrEqual(80);
		expect(contextual.sovereignAdoptionScore).toBeGreaterThanOrEqual(80);
	});

	it('applies a moderate floor for contributor relationships', () => {
		const stackItem: StackItem = {
			itemId: 'item1',
			role: 'contributor',
			status: 'approved',
		};
		const contextual = withStackRoleAdoptionContext(baseAdoption, stackItem);
		expect(contextual.adoptionScore).toBeGreaterThanOrEqual(55);
		expect(contextual.sovereignAdoptionScore).toBeGreaterThanOrEqual(50);
	});

	it('does not apply floors for deprecated items', () => {
		const stackItem: StackItem = {
			itemId: 'item1',
			role: 'maintainer',
			status: 'deprecated',
		};
		const contextual = withStackRoleAdoptionContext(baseAdoption, stackItem);
		expect(contextual.adoptionScore).toBe(0);
		expect(contextual.sovereignAdoptionScore).toBe(0);
	});
});

describe('computeContextualOverallScore', () => {
	it('lifts overall score for maintainer context compared to raw overall score', () => {
		const baseAdoption: AdoptionResult = {
			adoptionScore: 0,
			sovereignAdoptionScore: 0,
			overallScore: 0,
			directCoverage: 0,
			transitiveCoverage: 0,
			diversity: 0,
			usedInStacks: [],
		};
		const stackItem: StackItem = {
			itemId: 'item1',
			role: 'maintainer',
			status: 'approved',
		};
		const raw = computeOverallScore(100, baseAdoption);
		const contextual = computeContextualOverallScore(100, baseAdoption, stackItem);
		expect(raw).toBe(60);
		expect(contextual).toBeGreaterThan(raw);
		expect(contextual).toBeGreaterThanOrEqual(90);
	});
});
