import { DependencyType, Item, ItemDependency } from '../types';

export type DependencyEdge = {
	id: string;
	source: Item;
	target: Item;
	dependency: ItemDependency;
};

export type DependencyGraphData = {
	edges: DependencyEdge[];
	incomingById: Map<string, DependencyEdge[]>;
	outgoingById: Map<string, DependencyEdge[]>;
};

type NeighborhoodOptions = {
	maxDepth?: 1 | 2 | 3 | null;
	onlyDirectDependencies?: boolean;
	selectedDependencyType?: DependencyType | null;
};

const DEPTH_LIMIT = 3;

export function buildDependencyGraph(items: Item[]): DependencyGraphData {
	const itemById = new Map(items.map((item) => [item.id, item]));
	const edges: DependencyEdge[] = [];

	for (const source of items) {
		for (const dependency of source.dependencies ?? []) {
			const target = itemById.get(dependency.targetItemId);
			if (!target) continue;
			edges.push({
				id: `${source.id}::${dependency.targetItemId}::${dependency.type}::${dependency.scope ?? 'required'}`,
				source,
				target,
				dependency,
			});
		}
	}

	const outgoingById = new Map<string, DependencyEdge[]>();
	const incomingById = new Map<string, DependencyEdge[]>();
	for (const edge of edges) {
		const outgoing = outgoingById.get(edge.source.id) ?? [];
		outgoing.push(edge);
		outgoingById.set(edge.source.id, outgoing);

		const incoming = incomingById.get(edge.target.id) ?? [];
		incoming.push(edge);
		incomingById.set(edge.target.id, incoming);
	}

	return { edges, incomingById, outgoingById };
}

export function getDependencyTypes(items: Item[]): DependencyType[] {
	const types = new Set<DependencyType>();
	for (const item of items) {
		for (const dependency of item.dependencies ?? []) {
			types.add(dependency.type);
		}
	}
	return Array.from(types).sort();
}

export function getFilteredEdges(graph: DependencyGraphData, selectedDependencyType: DependencyType | null): DependencyEdge[] {
	const typedEdges = selectedDependencyType ? graph.edges.filter((edge) => edge.dependency.type === selectedDependencyType) : graph.edges;
	return typedEdges;
}

export function hasDependencyWithinDepth(
	itemId: string,
	graph: DependencyGraphData,
	maxDepth: 1 | 2 | 3,
	selectedDependencyType: DependencyType | null,
): boolean {
	const queue: Array<{ id: string; depth: number }> = [{ id: itemId, depth: 0 }];
	const seen = new Set<string>([itemId]);
	let hasMatch = false;

	while (queue.length > 0) {
		const current = queue.shift();
		if (!current) break;

		if (current.depth >= maxDepth || current.depth >= DEPTH_LIMIT) continue;

		for (const edge of graph.outgoingById.get(current.id) ?? []) {
			if (selectedDependencyType && edge.dependency.type !== selectedDependencyType) continue;
			if (!seen.has(edge.target.id)) {
				if (current.depth + 1 === maxDepth) {
					hasMatch = true;
				}
				seen.add(edge.target.id);
				queue.push({ id: edge.target.id, depth: current.depth + 1 });
			}
		}
	}

	return hasMatch;
}

export function collectDependencyNeighborhood(
	rootItemId: string,
	graph: DependencyGraphData,
	{ maxDepth = null, onlyDirectDependencies = false, selectedDependencyType = null }: NeighborhoodOptions = {},
): Set<string> {
	const depthLimit = onlyDirectDependencies ? 1 : (maxDepth ?? Number.POSITIVE_INFINITY);
	const visited = new Set<string>([rootItemId]);
	const queue: Array<{ itemId: string; depth: number }> = [{ itemId: rootItemId, depth: 0 }];

	while (queue.length > 0) {
		const current = queue.shift();
		if (!current) break;
		if (current.depth >= depthLimit) continue;

		const outgoing = graph.outgoingById.get(current.itemId) ?? [];
		const incoming = graph.incomingById.get(current.itemId) ?? [];
		const neighbors = [...outgoing, ...incoming]
			.filter((edge) => !selectedDependencyType || edge.dependency.type === selectedDependencyType)
			.map((edge) => (edge.source.id === current.itemId ? edge.target.id : edge.source.id));

		for (const neighborId of neighbors) {
			if (visited.has(neighborId)) continue;
			visited.add(neighborId);
			queue.push({ itemId: neighborId, depth: current.depth + 1 });
		}
	}

	return visited;
}
