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

export type SovereigntyCriteria = {
	/** Open-source with publicly accessible source code (+30) */
	openSource: boolean;
	/** Headquartered or legally registered in the EU (+25) */
	euHeadquartered: boolean;
	/** Has a documented and publicly available security/compliance audit (+20) */
	hasAudit: boolean;
	/** Uses a permissive or copyleft open-source license (+10) */
	permissiveLicense: boolean;
	/** Project is mature — graduated/stable lifecycle status (+10) */
	matureProject: boolean;
	/** Large community ecosystem — e.g. GitHub stars > 1 000 (+5) */
	largeEcosystem: boolean;
	/** Ownership model of the project (+0 to +20) */
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
};

// ---------------------------------------------------------------------------
// Legacy aliases — kept for gradual migration
// ---------------------------------------------------------------------------
// Stack (Gov-Stack mapping)
// ---------------------------------------------------------------------------
