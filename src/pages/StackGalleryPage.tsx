import { KolButton, KolDialog, KolDrawer, KolInputText } from '@public-ui/preact';
import type { ComponentChildren } from 'preact';
import { useLocation } from 'preact-iso';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { AutoSingleSelect as KolSingleSelect } from '../components/AutoSingleSelect';
import { StackExpose } from '../components/StackExpose';
import { ITEMS, LAYERS, STACKS } from '../data/catalog';
import { useLocalStacks } from '../hooks/useLocalStacks';
import { useRouteAnnouncement } from '../hooks/useRouteAnnouncement';
import { computeStackAvgScore, useStackMetrics } from '../hooks/useStackMetrics';
import { Item, Stack } from '../types';
import { getLocalizedText } from '../utils';
import { computeEffectiveSovereigntyScore, getScoreCategoryColor } from '../utils/sovereigntyScore';

interface StackExposeWithMetricsProps {
	children?: ComponentChildren;
	stack: Stack;
	isTop: boolean;
	rank: number;
}

type DialogHandle = HTMLElement & {
	closeModal: () => Promise<void>;
	openModal: () => Promise<void>;
};

function StackExposeWithMetrics({ stack, isTop, rank, children }: StackExposeWithMetricsProps) {
	const metrics = useStackMetrics(stack, ITEMS, LAYERS);
	return (
		<StackExpose stack={stack} metrics={metrics} allLayers={LAYERS} isTop={isTop} rank={rank}>
			{children}
		</StackExpose>
	);
}

function isLocalStack(stack: Stack) {
	return stack.id.startsWith('local-');
}

export function StackGalleryPage() {
	const { i18n, t } = useTranslation();
	const location = useLocation();
	const selectedStackId = location.query.stack;
	const {
		allStacks: localStackCards,
		localStacks,
		createLocalStack,
		deleteLocalStack,
		renameLocalStack,
		addItemToLocalStack,
		removeItemFromLocalStack,
	} = useLocalStacks(ITEMS);
	const [newStackName, setNewStackName] = useState('');
	const [createMessage, setCreateMessage] = useState('');
	const [renameValues, setRenameValues] = useState<Record<string, string>>({});
	const [selectedItemByStack, setSelectedItemByStack] = useState<Record<string, string>>({});
	const [selectedRelationByStack, setSelectedRelationByStack] = useState<Record<string, string>>({});
	const [stackIdPendingDelete, setStackIdPendingDelete] = useState<string | null>(null);
	const [stackIdInDrawer, setStackIdInDrawer] = useState<string | null>(null);
	const deleteDialogRef = useRef<DialogHandle | null>(null);

	useRouteAnnouncement({ pageTitle: t('stackGallery.title') || 'Stacks' });

	const allStacks = useMemo(() => [...STACKS, ...localStackCards], [localStackCards]);
	const localStackById = useMemo(() => new Map(localStacks.map((stack) => [`local-${stack.id}`, stack])), [localStacks]);

	const itemOptions = useMemo(
		() =>
			ITEMS.map((item) => {
				const baseScore = item.sovereigntyScore ?? computeEffectiveSovereigntyScore(item.sovereigntyCriteria);
				return {
					label: `${getLocalizedText(item.name, i18n.language)} (${baseScore})`,
					value: item.id,
				};
			}),
		[i18n.language],
	);
	const relationOptions = useMemo(
		() => [
			{ label: t('stack.roles.consumer'), value: 'consumer' },
			{ label: t('stack.roles.contributor'), value: 'contributor' },
			{ label: t('stack.roles.funder'), value: 'funder' },
			{ label: t('stack.roles.maintainer'), value: 'maintainer' },
		],
		[t],
	);

	const stacksWithScores = useMemo(() => allStacks.map((stack) => ({ stack, avgScore: computeStackAvgScore(stack, ITEMS) })), [allStacks]);
	const { builtInEntries, customRankedStacks, globalRankByStackId } = useMemo(() => {
		const language = i18n.resolvedLanguage ?? i18n.language ?? 'de';
		const sortedByOverallRank = [...stacksWithScores].sort((a, b) => b.avgScore - a.avgScore);
		const globalRankMap = new Map(sortedByOverallRank.map(({ stack }, index) => [stack.id, index + 1]));
		const customStacks = stacksWithScores
			.filter(({ stack }) => isLocalStack(stack))
			.sort((a, b) => getLocalizedText(a.stack.name, language).localeCompare(getLocalizedText(b.stack.name, language), language));
		const entries: Array<{ kind: 'stack'; rank: number; stack: Stack } | { kind: 'custom-note'; names: string[]; rankStart: number; rankEnd: number }> = [];
		let pendingCustomNames: string[] = [];
		let pendingRankStart: number | null = null;
		let pendingRankEnd: number | null = null;

		for (const { stack } of sortedByOverallRank) {
			const rank = globalRankMap.get(stack.id) ?? 0;
			if (isLocalStack(stack)) {
				pendingCustomNames.push(getLocalizedText(stack.name, language));
				pendingRankStart ??= rank;
				pendingRankEnd = rank;
				continue;
			}

			if (pendingCustomNames.length > 0 && pendingRankStart && pendingRankEnd) {
				entries.push({
					kind: 'custom-note',
					names: pendingCustomNames,
					rankStart: pendingRankStart,
					rankEnd: pendingRankEnd,
				});
				pendingCustomNames = [];
				pendingRankStart = null;
				pendingRankEnd = null;
			}

			entries.push({ kind: 'stack', rank, stack });
		}

		if (pendingCustomNames.length > 0 && pendingRankStart && pendingRankEnd) {
			entries.push({
				kind: 'custom-note',
				names: pendingCustomNames,
				rankStart: pendingRankStart,
				rankEnd: pendingRankEnd,
			});
		}

		return { builtInEntries: entries, customRankedStacks: customStacks, globalRankByStackId: globalRankMap };
	}, [i18n.language, i18n.resolvedLanguage, stacksWithScores]);

	useEffect(() => {
		if (!selectedStackId) return;

		window.requestAnimationFrame(() => {
			const target = document.getElementById(`stack-${selectedStackId}`);
			if (!target) return;

			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
		});
	}, [selectedStackId]);

	useEffect(() => {
		const dialog = deleteDialogRef.current;
		if (!dialog) return;

		if (stackIdPendingDelete) {
			void dialog.openModal();
			return;
		}

		void dialog.closeModal();
	}, [stackIdPendingDelete]);

	const createStack = () => {
		const created = createLocalStack(newStackName);
		if (!created) {
			setCreateMessage(t('stackGallery.custom.nameTaken'));
			return;
		}
		setCreateMessage(t('stackGallery.custom.saved'));
		setNewStackName('');
	};

	const renameStack = (stackId: string) => {
		const nameValue = renameValues[stackId] ?? '';
		const renamed = renameLocalStack(stackId, nameValue);
		if (!renamed) {
			setCreateMessage(t('stackGallery.custom.nameTaken'));
		}
	};

	const selectedItems = (stack: Stack): Item[] => {
		const itemIdSet = new Set(stack.items.map((item) => item.itemId));
		return ITEMS.filter((item) => itemIdSet.has(item.id));
	};

	const stackNamePendingDelete = stackIdPendingDelete ? allStacks.find((stack) => stack.id === stackIdPendingDelete)?.name : null;
	const stackInDrawer = stackIdInDrawer ? allStacks.find((stack) => stack.id === stackIdInDrawer) : null;
	const localStackInDrawer = stackIdInDrawer ? localStackById.get(stackIdInDrawer) : null;

	const confirmDeleteStack = () => {
		if (!stackIdPendingDelete) {
			return;
		}
		deleteLocalStack(stackIdPendingDelete);
		if (stackIdInDrawer === stackIdPendingDelete) {
			setStackIdInDrawer(null);
		}
		setStackIdPendingDelete(null);
	};

	return (
		<main id="main-content" className="stack-gallery" aria-labelledby="gallery-page-title">
			<div className="stack-gallery__header">
				<h1 id="gallery-page-title" className="stack-gallery__title">
					{t('stackGallery.title')}
				</h1>
				<p className="stack-gallery__subtitle">{t('stackGallery.subtitle')}</p>
			</div>

			<nav className="stack-gallery__compact-nav" aria-label={t('stackGallery.compactNavAria') || 'Stack Navigation'}>
				<h2 className="stack-gallery__compact-nav-title">{t('stackGallery.compactNavTitle') || 'Stacks'}</h2>
				<ul className="stack-gallery__compact-nav-list">
					{stacksWithScores
						.sort((a, b) => b.avgScore - a.avgScore)
						.map(({ stack }, index) => {
							const stackName = getLocalizedText(stack.name, i18n.language);
							const avgScore = computeStackAvgScore(stack, ITEMS);
							const isCustom = isLocalStack(stack);
							const rank = index + 1;
							return (
								<li key={stack.id} className="stack-gallery__compact-nav-item">
									<span className="stack-gallery__compact-nav-rank">#{rank}</span>
									<a
										href={`?stack=${stack.id}`}
										className="stack-gallery__compact-nav-link"
										onClick={(e) => {
											e.preventDefault();
											const target = document.getElementById(`stack-${stack.id}`);
											if (target) {
												const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
												target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
											}
										}}
									>
										{stackName}
										{isCustom && <span className="stack-gallery__compact-nav-custom-badge"> (Custom)</span>}
									</a>
									<span className="stack-gallery__compact-nav-metrics">
										<span className="stack-gallery__compact-nav-metric">
											{stack.items.length} {t('stackGallery.compactNavDeps') || 'Deps'}
										</span>
										<span className="stack-gallery__compact-nav-metric stack-gallery__compact-nav-score" style={{ color: getScoreCategoryColor(avgScore) }}>
											{avgScore.toFixed(1)} {t('stackGallery.compactNavScore') || 'Score'}
										</span>
									</span>
								</li>
							);
						})}
				</ul>
			</nav>

			<ol className="stack-gallery__list" aria-label={t('stackGallery.listAria')}>
				{builtInEntries.map((entry) => {
					if (entry.kind === 'custom-note') {
						const rankLabel = entry.rankStart === entry.rankEnd ? `#${entry.rankStart}` : `#${entry.rankStart}–#${entry.rankEnd}`;
						return (
							<li key={`custom-note-${entry.rankStart}-${entry.rankEnd}`} className="stack-gallery__item">
								<p className="stack-gallery__custom-note">{`------ ${rankLabel}: Hier wäre ${
									entry.names.length > 1 ? 'die Custom Stacks' : 'der Custom Stack'
								} ${entry.names.join(', ')} ------`}</p>
							</li>
						);
					}

					return (
						<li key={entry.stack.id} className="stack-gallery__item" id={`stack-${entry.stack.id}`}>
							<StackExposeWithMetrics stack={entry.stack} isTop={entry.rank === 1} rank={entry.rank} />
						</li>
					);
				})}
			</ol>
			<section className="stack-gallery__create-section" aria-label={t('stackGallery.custom.createSectionTitle')}>
				<h2 className="stack-gallery__custom-title">{t('stackGallery.custom.createSectionTitle')}</h2>
				<p className="stack-gallery__subtitle">{t('stackGallery.custom.createSectionIntro')}</p>
				<div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
					<div className="w-full min-w-0">
						<KolInputText
							_label={t('stackGallery.custom.name')}
							_value={newStackName}
							_on={{ onInput: (_event: Event, value: unknown) => setNewStackName(typeof value === 'string' ? value : '') }}
						/>
					</div>
					<div className="w-full md:w-auto md:shrink-0">
						<KolButton _label={t('stackGallery.custom.save')} _on={{ onClick: createStack }} />
					</div>
				</div>
				{createMessage && <p className="mt-2">{createMessage}</p>}
			</section>

			{customRankedStacks.length > 0 && (
				<section className="stack-gallery__custom-section" aria-label={t('stackGallery.custom.manageAria')}>
					<ol className="stack-gallery__list" aria-label={t('stackGallery.custom.manageAria')}>
						{customRankedStacks.map(({ stack }) => {
							const editable = isLocalStack(stack);
							const rank = globalRankByStackId.get(stack.id) ?? 0;

							return (
								<li key={stack.id} className="stack-gallery__item" id={`stack-${stack.id}`}>
									<StackExposeWithMetrics stack={stack} isTop={rank === 1} rank={rank}>
										{editable && (
											<KolButton
												_label={t('stackGallery.custom.manageAria')}
												_hideLabel
												_icons={{ left: 'kolicon kolicon-cogwheel' }}
												_variant="ghost"
												_on={{ onClick: () => setStackIdInDrawer(stack.id) }}
											/>
										)}
									</StackExposeWithMetrics>
								</li>
							);
						})}
					</ol>
				</section>
			)}

			<KolDrawer
				_label={t('stackGallery.custom.manageAria')}
				_align="right"
				_hasCloser
				_open={Boolean(localStackInDrawer)}
				_on={{ onClose: () => setStackIdInDrawer(null) }}
			>
				{stackInDrawer && localStackInDrawer && (
					<div className="p-4 flex flex-col gap-3" aria-label={t('stackGallery.custom.manageAria')}>
						<section className="stack-gallery__drawer-section">
							<h3 className="stack-gallery__drawer-section-title">{t('stackGallery.custom.renameSave')}</h3>
							<div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
								<div className="w-full min-w-0">
									<KolInputText
										_label={t('stackGallery.custom.rename')}
										_value={renameValues[stackInDrawer.id] ?? localStackInDrawer.name}
										_on={{
											onInput: (_event: Event, value: unknown) =>
												setRenameValues((prev) => ({ ...prev, [stackInDrawer.id]: typeof value === 'string' ? value : '' })),
										}}
									/>
								</div>
								<div className="w-full md:w-auto md:shrink-0">
									<KolButton _label={t('stackGallery.custom.renameSave')} _variant="secondary" _on={{ onClick: () => renameStack(stackInDrawer.id) }} />
								</div>
							</div>
						</section>

						<section className="stack-gallery__drawer-section">
							<h3 className="stack-gallery__drawer-section-title">{t('stackGallery.custom.addDep')}</h3>
							<div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
								<div className="w-full min-w-0">
									<KolSingleSelect
										_label={t('stackGallery.custom.item')}
										_options={itemOptions}
										_value={selectedItemByStack[stackInDrawer.id] ?? ''}
										_on={{
											onChange: (_event: Event, value: unknown) =>
												setSelectedItemByStack((prev) => ({ ...prev, [stackInDrawer.id]: typeof value === 'string' ? value : '' })),
										}}
									/>
								</div>
								<div className="w-full min-w-0">
									<KolSingleSelect
										_label={t('stackGallery.custom.relation')}
										_options={relationOptions}
										_value={selectedRelationByStack[stackInDrawer.id] ?? 'consumer'}
										_on={{
											onChange: (_event: Event, value: unknown) =>
												setSelectedRelationByStack((prev) => ({ ...prev, [stackInDrawer.id]: typeof value === 'string' ? value : 'consumer' })),
										}}
									/>
								</div>
								<div className="w-full md:w-auto md:shrink-0">
									<KolButton
										_label={t('stackGallery.custom.addDep')}
										_variant="secondary"
										_disabled={
											!(selectedItemByStack[stackInDrawer.id] ?? '') ||
											new Set(stackInDrawer.items.map((item) => item.itemId)).has(selectedItemByStack[stackInDrawer.id] ?? '')
										}
										_on={{
											onClick: () =>
												addItemToLocalStack(
													stackInDrawer.id,
													selectedItemByStack[stackInDrawer.id] ?? '',
													(selectedRelationByStack[stackInDrawer.id] ?? 'consumer') as 'consumer' | 'contributor' | 'funder' | 'maintainer',
												),
										}}
									/>
								</div>
							</div>
							{selectedItems(stackInDrawer).length > 0 && (
								<ul className="flex flex-col gap-1" aria-label={t('stackGallery.custom.selectedAria')}>
									{selectedItems(stackInDrawer).map((item) => (
										<li key={`${stackInDrawer.id}-${item.id}`} className="flex items-start justify-between gap-2">
											<span className="min-w-0 break-words flex-1">{getLocalizedText(item.name, i18n.language)}</span>
											<div className="shrink-0">
												<KolButton
													_label={t('stackGallery.custom.removeDep')}
													_hideLabel
													_icons={{ left: 'fa-solid fa-trash-can' }}
													_variant="danger"
													_on={{ onClick: () => removeItemFromLocalStack(stackInDrawer.id, item.id) }}
												/>
											</div>
										</li>
									))}
								</ul>
							)}
						</section>

						<section className="stack-gallery__drawer-section">
							<h3 className="stack-gallery__drawer-section-title">{t('stackGallery.custom.delete')}</h3>
							<div className="w-full md:w-auto md:shrink-0">
								<KolButton
									_label={t('stackGallery.custom.delete')}
									_icons={{ left: 'fa-solid fa-trash-can' }}
									_variant="danger"
									_on={{ onClick: () => setStackIdPendingDelete(stackInDrawer.id) }}
								/>
							</div>
						</section>
					</div>
				)}
			</KolDrawer>

			<KolDialog
				ref={deleteDialogRef}
				_label={t('stackGallery.custom.deleteConfirmTitle')}
				_width="32rem"
				_on={{ onClose: () => setStackIdPendingDelete(null) }}
			>
				<div className="p-4 flex flex-col gap-3">
					<p>
						{t('stackGallery.custom.deleteConfirmMessage', {
							name: stackNamePendingDelete ? getLocalizedText(stackNamePendingDelete, i18n.language) : '',
						})}
					</p>
					<div className="flex gap-2">
						<KolButton _label={t('stackGallery.custom.deleteConfirmCancel')} _variant="secondary" _on={{ onClick: () => setStackIdPendingDelete(null) }} />
						<KolButton _label={t('stackGallery.custom.deleteConfirmAccept')} _variant="normal" _on={{ onClick: confirmDeleteStack }} />
					</div>
				</div>
			</KolDialog>
		</main>
	);
}
