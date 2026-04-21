import type {
	StackSelectionAssessmentInput,
	StackSelectionAssessmentResult,
	StackSelectionDecisionClass,
	StackSelectionDimensionKey,
	StackSelectionItemClass,
} from '../types';

export const STACK_SELECTION_WEIGHTS: Readonly<Record<StackSelectionDimensionKey, number>> = {
	austauschbarkeit: 0.1,
	betriebsGovernanceFaehigkeit: 0.1,
	interoperabilitaet: 0.1,
	offenheitStandardisierung: 0.2,
	patternFit: 0.15,
	reifegrad: 0.1,
	steuerbarkeit: 0.15,
	souveraenitaet: 0.1,
};

const HARD_THRESHOLD_DIMENSIONS: ReadonlyArray<StackSelectionDimensionKey> = [
	'betriebsGovernanceFaehigkeit',
	'offenheitStandardisierung',
	'souveraenitaet',
	'steuerbarkeit',
];

const MAX_DECISION_BY_CLASS: Readonly<Record<StackSelectionItemClass, StackSelectionDecisionClass>> = {
	architekturPattern: 'kernstack',
	beobachtungskandidat: 'beobachtungPilotierung',
	offenerStandard: 'kernstack',
	produktPlattformFramework: 'optionaleReferenztechnologie',
	referenzimplementierung: 'referenzstack',
};

const DECISION_PRIORITY: ReadonlyArray<StackSelectionDecisionClass> = [
	'nichtAufnehmen',
	'beobachtungPilotierung',
	'optionaleReferenztechnologie',
	'referenzstack',
	'kernstack',
];

function clampScore(value: number): number {
	return Math.min(5, Math.max(0, value));
}

function clampPoints(value: number): number {
	return Math.min(100, Math.max(0, value));
}

export function getDecisionClassByPoints(points: number): StackSelectionDecisionClass {
	if (points >= 85) return 'kernstack';
	if (points >= 70) return 'referenzstack';
	if (points >= 50) return 'optionaleReferenztechnologie';
	if (points >= 30) return 'beobachtungPilotierung';
	return 'nichtAufnehmen';
}

function getStrictestDecision(left: StackSelectionDecisionClass, right: StackSelectionDecisionClass): StackSelectionDecisionClass {
	return DECISION_PRIORITY.indexOf(left) <= DECISION_PRIORITY.indexOf(right) ? left : right;
}

export function computeStackSelectionAssessment(input: StackSelectionAssessmentInput): StackSelectionAssessmentResult {
	const normalizedDimensions: Record<StackSelectionDimensionKey, number> = {
		austauschbarkeit: clampScore(input.dimensions.austauschbarkeit),
		betriebsGovernanceFaehigkeit: clampScore(input.dimensions.betriebsGovernanceFaehigkeit),
		interoperabilitaet: clampScore(input.dimensions.interoperabilitaet),
		offenheitStandardisierung: clampScore(input.dimensions.offenheitStandardisierung),
		patternFit: clampScore(input.dimensions.patternFit),
		reifegrad: clampScore(input.dimensions.reifegrad),
		steuerbarkeit: clampScore(input.dimensions.steuerbarkeit),
		souveraenitaet: clampScore(input.dimensions.souveraenitaet),
	};

	const hardExclusionFailed = Object.values(input.hardExclusion).some((isFailed) => isFailed);
	const weightedScore =
		normalizedDimensions.patternFit * STACK_SELECTION_WEIGHTS.patternFit +
		normalizedDimensions.offenheitStandardisierung * STACK_SELECTION_WEIGHTS.offenheitStandardisierung +
		normalizedDimensions.steuerbarkeit * STACK_SELECTION_WEIGHTS.steuerbarkeit +
		normalizedDimensions.austauschbarkeit * STACK_SELECTION_WEIGHTS.austauschbarkeit +
		normalizedDimensions.reifegrad * STACK_SELECTION_WEIGHTS.reifegrad +
		normalizedDimensions.interoperabilitaet * STACK_SELECTION_WEIGHTS.interoperabilitaet +
		normalizedDimensions.souveraenitaet * STACK_SELECTION_WEIGHTS.souveraenitaet +
		normalizedDimensions.betriebsGovernanceFaehigkeit * STACK_SELECTION_WEIGHTS.betriebsGovernanceFaehigkeit;

	const points = clampPoints(Math.round(weightedScore * 20));
	const thresholdFailed = HARD_THRESHOLD_DIMENSIONS.some((key) => normalizedDimensions[key] < 3);

	let decisionClass = hardExclusionFailed ? 'nichtAufnehmen' : getDecisionClassByPoints(points);

	if (thresholdFailed && !hardExclusionFailed) {
		decisionClass = getStrictestDecision(decisionClass, 'beobachtungPilotierung');
	}

	decisionClass = getStrictestDecision(decisionClass, MAX_DECISION_BY_CLASS[input.itemClass]);

	const governanceStatus = input.lifecycleStatus;
	const isEligibleForCore = !hardExclusionFailed && !thresholdFailed && decisionClass === 'kernstack';

	return {
		decisionClass,
		governanceStatus,
		hardExclusionFailed,
		isEligibleForCore,
		points,
		thresholdFailed,
		weightedScore: Number(weightedScore.toFixed(2)),
	};
}
