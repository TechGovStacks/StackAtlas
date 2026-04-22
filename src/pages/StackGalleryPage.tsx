import { KolButton, KolDialog, KolInputText } from '@public-ui/preact';
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
	const deleteDialogRef = useRef<DialogHandle | null>(null);

	useRouteAnnouncement({ pageTitle: t('stackGallery.title') || 'Stacks' });

	const allStacks = useMemo(() => [...STACKS, ...localStackCards], [localStackCards]);
	const localStackById = useMemo(() => new Map(localStacks.map((stack) => [`local-${stack.id}`, stack])), [localStacks]);

	const itemOptions = useMemo(
		() =>
			ITEMS.map((item) => {
				const score = item.adoption?.overallScore ?? 0;
				return {
					label: `${getLocalizedText(item.name, i18n.language)} (${score})`,
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
	const rankedStacks = useMemo(() => {
		const language = i18n.resolvedLanguage ?? i18n.language ?? 'de';
		const customStacks = stacksWithScores
			.filter(({ stack }) => isLocalStack(stack))
			.sort((a, b) => getLocalizedText(a.stack.name, language).localeCompare(getLocalizedText(b.stack.name, language), language));
		const builtInStacks = stacksWithScores.filter(({ stack }) => !isLocalStack(stack)).sort((a, b) => b.avgScore - a.avgScore);

		return [...customStacks, ...builtInStacks];
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

	const confirmDeleteStack = () => {
		if (!stackIdPendingDelete) {
			return;
		}
		deleteLocalStack(stackIdPendingDelete);
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

			<section className="mb-6" aria-label={t('stackGallery.custom.manageAria')}>
				<div className="flex items-end gap-2">
					<KolInputText
						_label={t('stackGallery.custom.name')}
						_value={newStackName}
						_on={{ onInput: (_event: Event, value: unknown) => setNewStackName(typeof value === 'string' ? value : '') }}
					/>
					<KolButton _label={t('stackGallery.custom.save')} _on={{ onClick: createStack }} />
				</div>
				{createMessage && <p className="mt-2">{createMessage}</p>}
			</section>

			<ol className="stack-gallery__list" aria-label={t('stackGallery.listAria')}>
				{rankedStacks.map(({ stack }, index) => {
					const editable = isLocalStack(stack);
					const rawLocalStack = localStackById.get(stack.id);
					const selectedItemId = selectedItemByStack[stack.id] ?? '';
					const selectedRelation = selectedRelationByStack[stack.id] ?? 'consumer';
					const assignedItemIds = new Set(stack.items.map((item) => item.itemId));

					return (
						<li key={stack.id} className="stack-gallery__item" id={`stack-${stack.id}`}>
							<StackExposeWithMetrics stack={stack} isTop={index === 0} rank={index + 1}>
								{editable && rawLocalStack && (
									<div className="mt-4 flex flex-col gap-3" aria-label={t('stackGallery.custom.manageAria')}>
										<div className="flex items-end gap-2">
											<KolInputText
												_label={t('stackGallery.custom.rename')}
												_value={renameValues[stack.id] ?? rawLocalStack.name}
												_on={{
													onInput: (_event: Event, value: unknown) =>
														setRenameValues((prev) => ({ ...prev, [stack.id]: typeof value === 'string' ? value : '' })),
												}}
											/>
											<KolButton _label={t('stackGallery.custom.renameSave')} _variant="secondary" _on={{ onClick: () => renameStack(stack.id) }} />
										</div>
										<div className="flex items-end gap-2">
											<KolSingleSelect
												_label={t('stackGallery.custom.item')}
												_options={itemOptions}
												_value={selectedItemId}
												_on={{
													onChange: (_event: Event, value: unknown) =>
														setSelectedItemByStack((prev) => ({ ...prev, [stack.id]: typeof value === 'string' ? value : '' })),
												}}
											/>
											<KolSingleSelect
												_label={t('stackGallery.custom.relation')}
												_options={relationOptions}
												_value={selectedRelation}
												_on={{
													onChange: (_event: Event, value: unknown) =>
														setSelectedRelationByStack((prev) => ({ ...prev, [stack.id]: typeof value === 'string' ? value : 'consumer' })),
												}}
											/>
											<KolButton
												_label={t('stackGallery.custom.addDep')}
												_variant="secondary"
												_disabled={!selectedItemId || assignedItemIds.has(selectedItemId)}
												_on={{
													onClick: () =>
														addItemToLocalStack(stack.id, selectedItemId, selectedRelation as 'consumer' | 'contributor' | 'funder' | 'maintainer'),
												}}
											/>
										</div>
										{selectedItems(stack).length > 0 && (
											<ul className="flex flex-col gap-1" aria-label={t('stackGallery.custom.selectedAria')}>
												{selectedItems(stack).map((item) => (
													<li key={`${stack.id}-${item.id}`} className="flex items-center justify-between gap-2">
														<span>{getLocalizedText(item.name, i18n.language)}</span>
														<KolButton
															_label={t('stackGallery.custom.removeDep')}
															_variant="normal"
															_on={{ onClick: () => removeItemFromLocalStack(stack.id, item.id) }}
														/>
													</li>
												))}
											</ul>
										)}
										<KolButton _label={t('stackGallery.custom.delete')} _variant="normal" _on={{ onClick: () => setStackIdPendingDelete(stack.id) }} />
									</div>
								)}
							</StackExposeWithMetrics>
						</li>
					);
				})}
			</ol>

			<KolDialog ref={deleteDialogRef} _label={t('stackGallery.custom.deleteConfirmTitle')} _on={{ onClose: () => setStackIdPendingDelete(null) }}>
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
