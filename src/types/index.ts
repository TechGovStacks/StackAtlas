export type LanguageCode = 'de' | 'en' | 'fr';

export type LocalizedText = {
	de: string;
	en: string;
	fr?: string;
};

export type LocalizableText = string | LocalizedText;

// ---------------------------------------------------------------------------
// Layer (replaces Category) — the 5 Splash layers
// ---------------------------------------------------------------------------

export type Layer = {
	id: string;
	order: number;
	name: LocalizableText;
	description?: LocalizableText;
	color: string;
};

// ---------------------------------------------------------------------------
// Item (replaces Article)
// ---------------------------------------------------------------------------

export type Maturity = 'sandbox' | 'incubation' | 'graduated';
export type OwnerType = 'independentConsortium' | 'corporation' | 'community' | 'oneManShow';

// Hybrid Scoring Scale: 6 Categories + Numeric Score
export type SovereigntyScoreCategory =
	| 'insufficient' // 0-30
	| 'minimal' // 31-45
	| 'adequate' // 46-60
	| 'good' // 61-75
	| 'excellent' // 76-90
	| 'outstanding'; // 91-100

export type SovereigntyScoreResult = {
	/** Raw score: 0-100 */
	score: number;
	/** Category: one of 6 categories */
	category: SovereigntyScoreCategory;
	/** Color code for UI visualization (hex) */
	color: string;
	/** Position within category range (0-100) */
	percentileInCategory: number;
};

export type SovereigntyCriteria = {
	/** Open-source with publicly accessible source code (+15) */
	openSource: boolean;
	/** Headquartered or legally registered in the EU (+5) */
	euHeadquartered: boolean;
	/** Has a documented and publicly available security/compliance audit (+5) */
	hasAudit: boolean;
	/** Uses a permissive or copyleft open-source license that allows forking (+10) */
	permissiveLicense: boolean;
	/** Project is mature — graduated/stable lifecycle status (+5) */
	matureProject: boolean;
	/** Can be operated by the user without depending on third-party infrastructure (+20) */
	selfHostable: boolean;
	/** User data can be exported in open, non-proprietary formats (+15) */
	dataPortability: boolean;
	/** Built on or implements open, vendor-neutral standards and protocols (+10) */
	openStandards: boolean;
	/** Does not collect usage telemetry by default — privacy-respecting out of the box (+5) */
	noTelemetryByDefault: boolean;
	/** Ownership / governance model of the project (+0 to +10) */
	ownerType?: OwnerType;
};

export type Item = {
	id: string;
	name: LocalizableText;
	layer: string;
	sublayer?: string;
	description: LocalizableText;
	homepage?: string;
	logo?: string;
	tags: string[];
	license?: string;
	oss: boolean;
	maturity?: Maturity;
	sovereigntyCriteria: SovereigntyCriteria;
	sovereigntyScore?: number;
	/** Computed from sovereigntyCriteria: category, color, percentile */
	sovereigntyScoreResult?: SovereigntyScoreResult;
	github?: {
		repo?: string;
		stars?: number;
	};
	audit?: {
		lastDate?: string;
		url?: string;
	};
};

// ---------------------------------------------------------------------------
// Stack (Gov-Stack mapping)
// ---------------------------------------------------------------------------

export type ParticipantRole = 'maintainer' | 'contributor' | 'funder' | 'consumer';

export type StackItemStatus = 'recommended' | 'approved' | 'deprecated';

export type StackItem = {
	itemId: string;
	status: StackItemStatus;
	role: ParticipantRole;
	since?: string;
	rationale?: LocalizableText;
	alternatives?: string[];
};

export type Stack = {
	id: string;
	name: LocalizableText;
	description?: LocalizableText;
	country?: string;
	issuer?: string;
	version: string;
	publishedAt?: string;
	items: StackItem[];
};

// ---------------------------------------------------------------------------
// Filter state
// ---------------------------------------------------------------------------

export type FilterState = {
	searchQuery: string;
	selectedLayer: string | null;
	selectedSublayer: string | null;
};

// ---------------------------------------------------------------------------
// Legacy aliases — kept for gradual migration
// ---------------------------------------------------------------------------
// Stack (Gov-Stack mapping)
// ---------------------------------------------------------------------------
