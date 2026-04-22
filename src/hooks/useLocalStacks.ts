import { useEffect, useMemo, useState } from 'preact/hooks';
import { Item, ParticipantRole, Stack, StackItem, StackItemStatus } from '../types';

const LOCAL_STACKS_STORAGE_KEY = 'local-stacks-v1';
const LOCAL_STACK_VERSION = 1;

const DEFAULT_STACK_ITEM_STATUS: StackItemStatus = 'approved';
const DEFAULT_STACK_ITEM_ROLE: ParticipantRole = 'consumer';
const LOCAL_STACK_VERSION_LABEL = 'local';

type PersistedLocalStackItem = {
	addedAt: string;
	itemId: string;
	role: ParticipantRole;
	status: StackItemStatus;
};

type PersistedLocalStack = {
	createdAt: string;
	id: string;
	items: PersistedLocalStackItem[];
	name: string;
	updatedAt: string;
	version: string;
};

type PersistedLocalStackStore = {
	stacks: PersistedLocalStack[];
	version: number;
};

type LegacyPersistedLocalStack = {
	createdAt?: unknown;
	id?: unknown;
	itemIds?: unknown;
	name?: unknown;
	updatedAt?: unknown;
};

function normalizeStackName(name: string) {
	return name.trim().toLocaleLowerCase();
}

function isStackItemStatus(value: unknown): value is StackItemStatus {
	return value === 'approved' || value === 'deprecated' || value === 'recommended';
}

function isParticipantRole(value: unknown): value is ParticipantRole {
	return value === 'consumer' || value === 'contributor' || value === 'funder' || value === 'maintainer';
}

function sanitizeStackItem(value: unknown, validItemIds: Set<string>, fallbackDate: string): PersistedLocalStackItem | null {
	if (!value || typeof value !== 'object') {
		return null;
	}

	const candidate = value as Partial<PersistedLocalStackItem>;
	if (typeof candidate.itemId !== 'string' || !validItemIds.has(candidate.itemId)) {
		return null;
	}

	return {
		addedAt: typeof candidate.addedAt === 'string' ? candidate.addedAt : fallbackDate,
		itemId: candidate.itemId,
		role: isParticipantRole(candidate.role) ? candidate.role : DEFAULT_STACK_ITEM_ROLE,
		status: isStackItemStatus(candidate.status) ? candidate.status : DEFAULT_STACK_ITEM_STATUS,
	};
}

function uniqueItems(items: PersistedLocalStackItem[]): PersistedLocalStackItem[] {
	const byId = new Map<string, PersistedLocalStackItem>();
	for (const item of items) {
		if (!byId.has(item.itemId)) {
			byId.set(item.itemId, item);
		}
	}
	return Array.from(byId.values());
}

function sanitizeStack(value: unknown, validItemIds: Set<string>): PersistedLocalStack | null {
	if (!value || typeof value !== 'object') {
		return null;
	}

	const candidate = value as Partial<PersistedLocalStack>;
	if (typeof candidate.id !== 'string' || typeof candidate.name !== 'string') {
		return null;
	}

	const createdAt = typeof candidate.createdAt === 'string' ? candidate.createdAt : new Date().toISOString();
	const updatedAt = typeof candidate.updatedAt === 'string' ? candidate.updatedAt : createdAt;
	const sanitizedItems = Array.isArray(candidate.items)
		? candidate.items.map((item) => sanitizeStackItem(item, validItemIds, updatedAt)).filter((item): item is PersistedLocalStackItem => Boolean(item))
		: [];

	return {
		createdAt,
		id: candidate.id,
		items: uniqueItems(sanitizedItems),
		name: candidate.name,
		updatedAt,
		version: typeof candidate.version === 'string' && candidate.version ? candidate.version : LOCAL_STACK_VERSION_LABEL,
	};
}

function sanitizeLegacyStack(value: unknown, validItemIds: Set<string>): PersistedLocalStack | null {
	if (!value || typeof value !== 'object') {
		return null;
	}

	const candidate = value as LegacyPersistedLocalStack;
	if (typeof candidate.id !== 'string' || typeof candidate.name !== 'string' || !Array.isArray(candidate.itemIds)) {
		return null;
	}

	const createdAt = typeof candidate.createdAt === 'string' ? candidate.createdAt : new Date().toISOString();
	const updatedAt = typeof candidate.updatedAt === 'string' ? candidate.updatedAt : createdAt;
	const items = candidate.itemIds
		.filter((itemId): itemId is string => typeof itemId === 'string' && validItemIds.has(itemId))
		.map((itemId) => ({
			addedAt: updatedAt,
			itemId,
			role: DEFAULT_STACK_ITEM_ROLE,
			status: DEFAULT_STACK_ITEM_STATUS,
		}));

	return {
		createdAt,
		id: candidate.id,
		items: uniqueItems(items),
		name: candidate.name,
		updatedAt,
		version: LOCAL_STACK_VERSION_LABEL,
	};
}

function loadPersistedLocalStacks(allItems: Item[]): PersistedLocalStack[] {
	if (typeof window === 'undefined') {
		return [];
	}

	try {
		const raw = localStorage.getItem(LOCAL_STACKS_STORAGE_KEY);
		if (!raw) {
			return [];
		}

		const parsed = JSON.parse(raw) as Partial<PersistedLocalStackStore>;
		if (parsed.version !== LOCAL_STACK_VERSION || !Array.isArray(parsed.stacks)) {
			return [];
		}

		const validItemIds = new Set(allItems.map((item) => item.id));
		return parsed.stacks
			.map((stack) => sanitizeStack(stack, validItemIds) ?? sanitizeLegacyStack(stack, validItemIds))
			.filter((stack): stack is PersistedLocalStack => Boolean(stack));
	} catch {
		return [];
	}
}

function savePersistedLocalStacks(stacks: PersistedLocalStack[]) {
	if (typeof window === 'undefined') {
		return;
	}

	const payload: PersistedLocalStackStore = {
		version: LOCAL_STACK_VERSION,
		stacks,
	};

	localStorage.setItem(LOCAL_STACKS_STORAGE_KEY, JSON.stringify(payload));
}

function toStack(localStack: PersistedLocalStack): Stack {
	return {
		id: `local-${localStack.id}`,
		name: {
			de: localStack.name,
			en: localStack.name,
		},
		description: {
			de: 'Lokaler, selbst konfigurierter Stack',
			en: 'Local user-defined stack',
		},
		issuer: 'Local',
		items: localStack.items.map(
			(item) =>
				({
					itemId: item.itemId,
					role: item.role,
					since: item.addedAt,
					status: item.status,
				}) satisfies StackItem,
		),
		publishedAt: localStack.updatedAt,
		version: localStack.version,
	};
}

function withoutLocalPrefix(stackId: string) {
	return stackId.replace(/^local-/, '');
}

export function useLocalStacks(allItems: Item[]) {
	const [localStacks, setLocalStacks] = useState<PersistedLocalStack[]>([]);

	useEffect(() => {
		setLocalStacks(loadPersistedLocalStacks(allItems));
	}, [allItems]);

	const saveAndReturn = (next: PersistedLocalStack[]) => {
		savePersistedLocalStacks(next);
		return next;
	};

	const createLocalStack = (name: string) => {
		const trimmedName = name.trim();
		if (!trimmedName) {
			return false;
		}

		let created = false;
		setLocalStacks((previous) => {
			const normalizedName = normalizeStackName(trimmedName);
			if (previous.some((stack) => normalizeStackName(stack.name) === normalizedName)) {
				created = false;
				return previous;
			}

			const now = new Date().toISOString();
			const nextEntry: PersistedLocalStack = {
				createdAt: now,
				id: globalThis.crypto.randomUUID(),
				items: [],
				name: trimmedName,
				updatedAt: now,
				version: LOCAL_STACK_VERSION_LABEL,
			};
			created = true;
			return saveAndReturn([...previous, nextEntry]);
		});

		return created;
	};

	const renameLocalStack = (stackId: string, name: string) => {
		const trimmedName = name.trim();
		if (!trimmedName) {
			return false;
		}

		const rawStackId = withoutLocalPrefix(stackId);
		let renamed = false;
		setLocalStacks((previous) => {
			const normalizedName = normalizeStackName(trimmedName);
			const hasDuplicate = previous.some((stack) => stack.id !== rawStackId && normalizeStackName(stack.name) === normalizedName);
			if (hasDuplicate) {
				renamed = false;
				return previous;
			}

			const next = previous.map((stack) =>
				stack.id === rawStackId
					? {
							...stack,
							name: trimmedName,
							updatedAt: new Date().toISOString(),
						}
					: stack,
			);
			renamed = true;
			return saveAndReturn(next);
		});

		return renamed;
	};

	const addItemToLocalStack = (stackId: string, itemId: string, role: ParticipantRole = DEFAULT_STACK_ITEM_ROLE) => {
		if (!allItems.some((item) => item.id === itemId)) {
			return;
		}
		const rawStackId = withoutLocalPrefix(stackId);
		setLocalStacks((previous) => {
			const next = previous.map((stack) => {
				if (stack.id !== rawStackId || stack.items.some((item) => item.itemId === itemId)) {
					return stack;
				}

				const now = new Date().toISOString();
				return {
					...stack,
					items: [...stack.items, { addedAt: now, itemId, role, status: DEFAULT_STACK_ITEM_STATUS }],
					updatedAt: now,
				};
			});
			return saveAndReturn(next);
		});
	};

	const removeItemFromLocalStack = (stackId: string, itemId: string) => {
		const rawStackId = withoutLocalPrefix(stackId);
		setLocalStacks((previous) => {
			const next = previous.map((stack) =>
				stack.id === rawStackId
					? {
							...stack,
							items: stack.items.filter((item) => item.itemId !== itemId),
							updatedAt: new Date().toISOString(),
						}
					: stack,
			);
			return saveAndReturn(next);
		});
	};

	const deleteLocalStack = (stackId: string) => {
		const rawStackId = withoutLocalPrefix(stackId);
		setLocalStacks((previous) => saveAndReturn(previous.filter((stack) => stack.id !== rawStackId)));
	};

	const allStacks = useMemo(() => localStacks.map(toStack), [localStacks]);

	return {
		addItemToLocalStack,
		allStacks,
		createLocalStack,
		deleteLocalStack,
		localStacks,
		renameLocalStack,
		removeItemFromLocalStack,
	};
}
