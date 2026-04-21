import { describe, expect, it } from 'vitest';
import type { StackSelectionAssessmentInput } from '../../types';
import { computeStackSelectionAssessment, getDecisionClassByPoints } from '../stackSelectionScore';

function createBaseInput(): StackSelectionAssessmentInput {
	return {
		dimensions: {
			austauschbarkeit: 5,
			betriebsGovernanceFaehigkeit: 5,
			interoperabilitaet: 5,
			offenheitStandardisierung: 5,
			patternFit: 5,
			reifegrad: 5,
			steuerbarkeit: 5,
			souveraenitaet: 5,
		},
		hardExclusion: {
			geringeAustauschbarkeit: false,
			keinDokumentierterStandard: false,
			keinKlaresPattern: false,
			keinMehrwertGegenueberBestand: false,
			nichtOperationalisierbar: false,
			nurHypeToolMode: false,
			starkeHerstellerCloudBindung: false,
			ueberschneidungOhneZusatznutzen: false,
			unreiferInstabilerReifegrad: false,
		},
		itemClass: 'architekturPattern',
		lifecycleStatus: 'kandidat',
	};
}

describe('getDecisionClassByPoints', () => {
	it('maps score boundaries to expected classes', () => {
		expect(getDecisionClassByPoints(90)).toBe('kernstack');
		expect(getDecisionClassByPoints(70)).toBe('referenzstack');
		expect(getDecisionClassByPoints(50)).toBe('optionaleReferenztechnologie');
		expect(getDecisionClassByPoints(30)).toBe('beobachtungPilotierung');
		expect(getDecisionClassByPoints(10)).toBe('nichtAufnehmen');
	});
});

describe('computeStackSelectionAssessment', () => {
	it('returns kernstack for a strong architecture pattern', () => {
		const result = computeStackSelectionAssessment(createBaseInput());

		expect(result.weightedScore).toBe(5);
		expect(result.points).toBe(100);
		expect(result.thresholdFailed).toBe(false);
		expect(result.hardExclusionFailed).toBe(false);
		expect(result.decisionClass).toBe('kernstack');
		expect(result.isEligibleForCore).toBe(true);
	});

	it('caps decision class to referenzstack for referenzimplementierung', () => {
		const input = createBaseInput();
		input.itemClass = 'referenzimplementierung';

		const result = computeStackSelectionAssessment(input);

		expect(result.points).toBe(100);
		expect(result.decisionClass).toBe('referenzstack');
		expect(result.isEligibleForCore).toBe(false);
	});

	it('forces nichtAufnehmen when any hard exclusion is hit', () => {
		const input = createBaseInput();
		input.hardExclusion.keinKlaresPattern = true;

		const result = computeStackSelectionAssessment(input);

		expect(result.hardExclusionFailed).toBe(true);
		expect(result.decisionClass).toBe('nichtAufnehmen');
		expect(result.isEligibleForCore).toBe(false);
	});

	it('limits decision to beobachtungPilotierung when minimum threshold fails', () => {
		const input = createBaseInput();
		input.dimensions.steuerbarkeit = 2;

		const result = computeStackSelectionAssessment(input);

		expect(result.thresholdFailed).toBe(true);
		expect(result.decisionClass).toBe('beobachtungPilotierung');
	});
});
