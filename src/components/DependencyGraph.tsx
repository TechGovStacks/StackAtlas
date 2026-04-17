import { KolButton, KolCard } from '@public-ui/preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FilterState, Item, Layer } from '../types';
import { buildDependencyGraph, collectDependencyNeighborhood, getDependencyTypes, getFilteredEdges, getLocalizedText } from '../utils';

interface DependencyGraphProps {
	items: Item[];
	layers: Layer[];
	filters: FilterState;
	selectedRootItemId: string | null;
}

type PositionedNode = {
	x: number;
	y: number;
	item: Item;
};

const NODE_WIDTH = 180;
const NODE_HEIGHT = 56;
const COLUMN_GAP = 220;
const ROW_GAP = 92;
const CANVAS_PADDING = 56;
const NODE_LABEL_MAX_LENGTH = 24;

function truncateLabel(label: string): string {
	return label.length > NODE_LABEL_MAX_LENGTH ? `${label.slice(0, NODE_LABEL_MAX_LENGTH - 1)}…` : label;
}

export function DependencyGraph({ items, layers, filters, selectedRootItemId }: DependencyGraphProps) {
	const { i18n, t } = useTranslation();
	const graph = useMemo(() => buildDependencyGraph(items), [items]);
	const visibleEdges = useMemo(() => getFilteredEdges(graph, filters.selectedDependencyType), [graph, filters.selectedDependencyType]);
	const visibleItemIds = useMemo(() => {
		if (!selectedRootItemId) {
			return new Set(items.map((item) => item.id));
		}

		return collectDependencyNeighborhood(selectedRootItemId, graph, {
			maxDepth: filters.dependencyDepth,
			onlyDirectDependencies: filters.onlyDirectDependencies,
			selectedDependencyType: filters.selectedDependencyType,
		});
	}, [selectedRootItemId, items, graph, filters.dependencyDepth, filters.onlyDirectDependencies, filters.selectedDependencyType]);
	const scopedEdges = useMemo(
		() => visibleEdges.filter((edge) => visibleItemIds.has(edge.source.id) && visibleItemIds.has(edge.target.id)),
		[visibleEdges, visibleItemIds],
	);
	const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(scopedEdges[0]?.id ?? null);
	const [focusedEdgeId, setFocusedEdgeId] = useState<string | null>(null);
	const selectedEdge = useMemo(() => scopedEdges.find((edge) => edge.id === selectedEdgeId) ?? null, [scopedEdges, selectedEdgeId]);
	useEffect(() => {
		setSelectedEdgeId((previousEdgeId) => {
			if (previousEdgeId && scopedEdges.some((edge) => edge.id === previousEdgeId)) {
				return previousEdgeId;
			}
			return scopedEdges[0]?.id ?? null;
		});
	}, [scopedEdges]);

	const layerOrder = useMemo(() => [...layers].sort((a, b) => a.order - b.order), [layers]);
	const dependencyTypes = useMemo(() => getDependencyTypes(items), [items]);
	const dependencyScopes = useMemo(() => {
		const scopes = new Set<string>();
		for (const edge of scopedEdges) {
			scopes.add(edge.dependency.scope ?? 'required');
		}
		return Array.from(scopes).sort();
	}, [scopedEdges]);
	const visibleItems = useMemo(() => items.filter((item) => visibleItemIds.has(item.id)), [items, visibleItemIds]);
	const layerItems = useMemo(() => {
		const bucket = new Map<string, Item[]>();
		for (const layer of layerOrder) {
			bucket.set(layer.id, []);
		}
		for (const item of visibleItems) {
			const group = bucket.get(item.layer) ?? [];
			group.push(item);
			bucket.set(item.layer, group);
		}
		for (const [layerId, group] of bucket.entries()) {
			bucket.set(
				layerId,
				group.sort((a, b) => getLocalizedText(a.name, i18n.language).localeCompare(getLocalizedText(b.name, i18n.language), i18n.language)),
			);
		}
		return bucket;
	}, [visibleItems, i18n.language, layerOrder]);

	const positionedNodes = useMemo(() => {
		const nodes = new Map<string, PositionedNode>();
		layerOrder.forEach((layer, layerIndex) => {
			const nodesInLayer = layerItems.get(layer.id) ?? [];
			nodesInLayer.forEach((item, rowIndex) => {
				nodes.set(item.id, {
					x: CANVAS_PADDING + layerIndex * COLUMN_GAP,
					y: CANVAS_PADDING + rowIndex * ROW_GAP,
					item,
				});
			});
		});
		return nodes;
	}, [layerItems, layerOrder]);

	const canvasSize = useMemo(() => {
		const maxRows = Math.max(...layerOrder.map((layer) => layerItems.get(layer.id)?.length ?? 0), 1);
		return {
			width: CANVAS_PADDING * 2 + Math.max(layerOrder.length - 1, 1) * COLUMN_GAP + NODE_WIDTH,
			height: CANVAS_PADDING * 2 + Math.max(maxRows - 1, 0) * ROW_GAP + NODE_HEIGHT,
		};
	}, [layerItems, layerOrder]);

	return (
		<section className="dependency-graph px-3 md:px-4 lg:px-5 py-4" aria-label={t('dependencies.graph.aria')}>
			<KolCard _label={t('dependencies.graph.title')} className="dependency-graph__card">
				<div className="dependency-graph__content flex flex-col gap-4">
					<div className="dependency-graph__legend flex flex-wrap gap-3">
						{layerOrder.map((layer) => (
							<span key={layer.id} className="dependency-graph__legend-item">
								<span className="dependency-graph__legend-dot" style={{ backgroundColor: layer.color }} aria-hidden="true" />
								{getLocalizedText(layer.name, i18n.language)}
							</span>
						))}
					</div>

					<div className="dependency-graph__legend dependency-graph__legend--meta flex flex-wrap gap-3">
						<span className="dependency-graph__legend-caption">{t('dependencies.graph.typeLegend')}</span>
						{dependencyTypes.map((type) => (
							<span key={type} className="dependency-graph__meta-pill">
								{t(`search.dependencies.type.${type}`)}
							</span>
						))}
						<span className="dependency-graph__legend-caption">{t('dependencies.graph.scopeLegend')}</span>
						{dependencyScopes.map((scope) => (
							<span key={scope} className="dependency-graph__meta-pill">
								{t(`dependencies.scope.${scope}`)}
							</span>
						))}
					</div>

					{visibleItems.length === 0 ? (
						<p className="dependency-graph__empty">{t('dependencies.graph.empty')}</p>
					) : (
						<>
							<div className="dependency-graph__canvas-wrapper">
								<svg
									className="dependency-graph__canvas"
									viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
									width="100%"
									height="100%"
									role="img"
									aria-label={t('dependencies.graph.canvasAria', { count: scopedEdges.length })}
								>
									{scopedEdges.map((edge) => {
										const source = positionedNodes.get(edge.source.id);
										const target = positionedNodes.get(edge.target.id);
										if (!source || !target) return null;
										const y1 = source.y + NODE_HEIGHT / 2;
										const y2 = target.y + NODE_HEIGHT / 2;
										const x1 = source.x + NODE_WIDTH;
										const x2 = target.x;
										const layerColor = layers.find((layer) => layer.id === edge.source.layer)?.color ?? '#003d82';
										const selected = selectedEdge?.id === edge.id;
										const focused = focusedEdgeId === edge.id;
										return (
											<g key={edge.id}>
												<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={layerColor} strokeWidth={selected ? 4 : 2} opacity={selected ? 1 : 0.45} />
												{focused && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffbf47" strokeWidth={6} opacity={1} pointerEvents="none" />}
												<line
													className="dependency-graph__edge-hitbox"
													x1={x1}
													y1={y1}
													x2={x2}
													y2={y2}
													stroke="transparent"
													strokeWidth={16}
													tabIndex={0}
													role="button"
													aria-label={t('dependencies.graph.edgeAria', {
														source: getLocalizedText(edge.source.name, i18n.language),
														target: getLocalizedText(edge.target.name, i18n.language),
													})}
													onClick={() => setSelectedEdgeId(edge.id)}
													onFocus={() => setFocusedEdgeId(edge.id)}
													onBlur={() => setFocusedEdgeId((currentFocusedId) => (currentFocusedId === edge.id ? null : currentFocusedId))}
													onKeyDown={(event) => {
														if (event.key === 'Enter' || event.key === ' ') {
															event.preventDefault();
															setSelectedEdgeId(edge.id);
														}
													}}
												/>
											</g>
										);
									})}
									{Array.from(positionedNodes.values()).map(({ item, x, y }) => {
										const layerColor = layers.find((layer) => layer.id === item.layer)?.color ?? '#003d82';
										const fullName = getLocalizedText(item.name, i18n.language);
										return (
											<g key={item.id}>
												<title>{fullName}</title>
												<rect x={x} y={y} rx={8} ry={8} width={NODE_WIDTH} height={NODE_HEIGHT} fill="white" stroke={layerColor} strokeWidth={2} />
												<text x={x + 10} y={y + 32} fontSize={13} fill="#1b1f23">
													{truncateLabel(fullName)}
												</text>
											</g>
										);
									})}
								</svg>
							</div>

							{scopedEdges.length > 0 ? (
								<div className="dependency-graph__edge-list flex flex-col gap-2">
									{scopedEdges.map((edge) => (
										<KolButton
											key={edge.id}
											_label={`${getLocalizedText(edge.source.name, i18n.language)} → ${getLocalizedText(edge.target.name, i18n.language)}`}
											_variant={selectedEdge?.id === edge.id ? 'primary' : 'ghost'}
											_on={{ onClick: () => setSelectedEdgeId(edge.id) }}
										/>
									))}
								</div>
							) : (
								<p className="dependency-graph__empty">{t('dependencies.graph.noEdgesForSelection')}</p>
							)}

							{selectedEdge && (
								<div className="dependency-graph__explanation">
									<p className="dependency-graph__explanation-title">{t('dependencies.graph.whyConnection')}</p>
									<p>
										<strong>{getLocalizedText(selectedEdge.source.name, i18n.language)}</strong> →{' '}
										<strong>{getLocalizedText(selectedEdge.target.name, i18n.language)}</strong>
									</p>
									<p>{t('dependencies.graph.edgeType', { type: selectedEdge.dependency.type })}</p>
									<p>{t('dependencies.graph.edgeScope', { scope: t(`dependencies.scope.${selectedEdge.dependency.scope ?? 'required'}`) })}</p>
									<p>{selectedEdge.dependency.reason ? getLocalizedText(selectedEdge.dependency.reason, i18n.language) : t('dependencies.graph.noReason')}</p>
								</div>
							)}
						</>
					)}
				</div>
			</KolCard>
		</section>
	);
}
