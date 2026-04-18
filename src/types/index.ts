export type LanguageCode = 'da' | 'de' | 'en' | 'es' | 'fr' | 'it' | 'no' | 'sv';

export type LocalizedText = {
	[K in LanguageCode]?: string;
} & {
	de: string;
	en: string;
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
export type DependencyType = 'build' | 'compiles-to' | 'language' | 'protocol' | 'runtime';
export type DependencyScope = 'dev' | 'optional' | 'required';

export type ItemDependency = {
	targetItemId: string;
	/** Technical dependency relation. */
	type: DependencyType;
	/** Whether the dependency is required, optional, or only needed in development. */
	scope?: DependencyScope;
	reason?: string | LocalizedText;
};

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

/**
 * Item: A technology, standard, or tool — essentially a dependency.
 *
 * All Items are dependencies organized by layer. Items in the "sovereign-standards"
 * layer are foundational standards that stacks may commit to maintaining or contributing.
 * Items in other layers (infrastructure, platform, building-blocks, applications) are
 * operational dependencies.
 */
export type Item = {
	id: string;
	name: LocalizableText;
	/** The layer this item belongs to (infrastructure, platform, building-blocks, applications, sovereign-standards) */
	layer: string;
	sublayer?: string;
	/** ISO 3166-1 alpha-2 country code of the owner/maintainer organization (e.g. DE, FR, US) */
	ownerCountry?: string;
	description: LocalizableText;
	homepage?: string;
	logo?: string;
	tags: string[];
	license?: string;
	oss: boolean;
	maturity?: Maturity;
	dependencies?: ItemDependency[];
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

/**
 * ParticipantRole: The role a stack plays in relation to an item (dependency).
 * - maintainer: Actively develops and maintains the item/standard
 * - contributor: Actively contributes to the development
 * - funder: Provides funding for development
 * - consumer: Uses the item/standard but does not contribute
 *
 * For items in the "sovereign-standards" layer, the role indicates the stack's
 * responsibility level for that foundational standard.
 */
export type ParticipantRole = 'maintainer' | 'contributor' | 'funder' | 'consumer';

export type StackItemStatus = 'recommended' | 'approved' | 'deprecated';

/**
 * StackItem: A dependency declaration.
 *
 * Represents a Stack's relationship to an Item (dependency), including:
 * - What role the stack plays (maintainer, contributor, funder, consumer)
 * - Whether this is a recommended, approved, or deprecated choice
 * - The rationale for including this dependency
 * - Alternative items that could fulfill the same function
 *
 * For items in the "sovereign-standards" layer, the role indicates the stack's
 * commitment to that foundational standard.
 */
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
	sources?: StackSource[];
	version: string;
	publishedAt?: string;
	items: StackItem[];
};

export type StackSource = {
	label?: LocalizableText;
	url: string;
};

// ---------------------------------------------------------------------------
// Filter state
// ---------------------------------------------------------------------------

export type FilterState = {
	searchQuery: string;
	selectedLayer: string | null;
	selectedSublayer: string | null;
	selectedRelation: ParticipantRole | null;
	onlyDirectDependencies: boolean;
	dependencyDepth: 1 | 2 | 3 | null;
	selectedDependencyType: DependencyType | null;
};

// ---------------------------------------------------------------------------
// Legacy aliases — kept for gradual migration
// ---------------------------------------------------------------------------
// Stack (Gov-Stack mapping)
// ---------------------------------------------------------------------------
