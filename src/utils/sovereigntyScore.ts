import { OwnerType, SovereigntyCriteria } from '../types';

const WEIGHTS: Record<keyof SovereigntyCriteria, number> = {
	openSource: 30,
	euHeadquartered: 25,
	hasAudit: 20,
	permissiveLicense: 10,
	matureProject: 10,
	largeEcosystem: 5,
	ownerType: 0,
};

const OWNER_WEIGHTS: Record<OwnerType, number> = {
	independentConsortium: 15,
	community: 10,
	corporation: 5,
	oneManShow: 0,
};

const MAX_SCORE_WITHOUT_OWNER = 60;

export function computeOwnerScore(ownerType?: OwnerType): number {
	if (!ownerType) return 0;
	return OWNER_WEIGHTS[ownerType];
}

export function computeSovereigntyScore(criteria: SovereigntyCriteria): number {
	const baseScore = (Object.keys(WEIGHTS) as Array<keyof SovereigntyCriteria>).reduce((sum, key) => {
		if (key === 'ownerType') {
			return sum;
		}
		return sum + (criteria[key] ? WEIGHTS[key] : 0);
	}, 0);

	const scoreWithOwner = Math.min(100, baseScore + computeOwnerScore(criteria.ownerType));
	if (!criteria.ownerType) {
		return Math.min(scoreWithOwner, MAX_SCORE_WITHOUT_OWNER);
	}
	return scoreWithOwner;
}
