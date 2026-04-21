import { KolButton, KolCard, KolInputCheckbox, KolInputNumber, KolSingleSelect } from '@public-ui/preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { ITEMS, STACKS } from '../data/catalog';
import type { StackSelectionAssessmentInput, StackSelectionDimensionKey, StackSelectionHardExclusion } from '../types';
import { computeStackSelectionAssessment, getLocalizedText } from '../utils';

const DIMENSION_KEYS: StackSelectionDimensionKey[] = [
	'austauschbarkeit',
	'betriebsGovernanceFaehigkeit',
	'interoperabilitaet',
	'offenheitStandardisierung',
	'patternFit',
	'reifegrad',
	'steuerbarkeit',
	'souveraenitaet',
];

const DEFAULT_HARD_EXCLUSION: StackSelectionHardExclusion = {
	geringeAustauschbarkeit: false,
	keinDokumentierterStandard: false,
	keinKlaresPattern: false,
	keinMehrwertGegenueberBestand: false,
	nichtOperationalisierbar: false,
	nurHypeToolMode: false,
	starkeHerstellerCloudBindung: false,
	ueberschneidungOhneZusatznutzen: false,
	unreiferInstabilerReifegrad: false,
};

const DEFAULT_INPUT: StackSelectionAssessmentInput = {
	dimensions: {
		austauschbarkeit: 3,
		betriebsGovernanceFaehigkeit: 3,
		interoperabilitaet: 3,
		offenheitStandardisierung: 3,
		patternFit: 3,
		reifegrad: 3,
		steuerbarkeit: 3,
		souveraenitaet: 3,
	},
	hardExclusion: DEFAULT_HARD_EXCLUSION,
	itemClass: 'produktPlattformFramework',
	lifecycleStatus: 'kandidat',
};

const EVALUATOR_STATE_STORAGE_KEY = 'stack-selection-evaluator-state-v1';
const STACK_ITEM_ASSESSMENTS_STORAGE_KEY = 'stack-selection-assessments-v1';

type LinkedAssessment = {
	input: StackSelectionAssessmentInput;
	itemId: string;
	result: ReturnType<typeof computeStackSelectionAssessment>;
	savedAt: string;
	stackId: string;
};

type StoredEvaluatorState = {
	input: StackSelectionAssessmentInput;
	selectedItemId: string;
	selectedStackId: string;
};

export function StackSelectionEvaluator() {
	const { i18n, t } = useTranslation();
	const [input, setInput] = useState<StackSelectionAssessmentInput>(DEFAULT_INPUT);
	const [selectedStackId, setSelectedStackId] = useState<string>('');
	const [selectedItemId, setSelectedItemId] = useState<string>('');
	const [savedSelection, setSavedSelection] = useState<LinkedAssessment | null>(null);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const result = useMemo(() => computeStackSelectionAssessment(input), [input]);
	const selectedStack = useMemo(() => STACKS.find((stack) => stack.id === selectedStackId), [selectedStackId]);
	const availableItemIds = useMemo(() => new Set(selectedStack?.items.map((stackItem) => stackItem.itemId) ?? []), [selectedStack]);
	const selectedStackItemRelation = useMemo(
		() => selectedStack?.items.find((stackItem) => stackItem.itemId === selectedItemId),
		[selectedItemId, selectedStack],
	);

	const stackOptions = useMemo(
		() =>
			STACKS.map((stack) => ({
				label: getLocalizedText(stack.name, i18n.resolvedLanguage ?? i18n.language ?? 'de'),
				value: stack.id,
			})),
		[i18n.language, i18n.resolvedLanguage],
	);

	const itemOptions = useMemo(() => {
		const language = i18n.resolvedLanguage ?? i18n.language ?? 'de';
		const filteredItems = selectedStackId ? ITEMS.filter((item) => availableItemIds.has(item.id)) : ITEMS;
		return filteredItems.map((item) => ({
			label: getLocalizedText(item.name, language),
			value: item.id,
		}));
	}, [availableItemIds, i18n.language, i18n.resolvedLanguage, selectedStackId]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		try {
			const rawState = localStorage.getItem(EVALUATOR_STATE_STORAGE_KEY);
			if (!rawState) {
				return;
			}

			const parsed = JSON.parse(rawState) as Partial<StoredEvaluatorState>;
			if (parsed.input) {
				setInput(parsed.input);
			}
			if (typeof parsed.selectedStackId === 'string') {
				setSelectedStackId(parsed.selectedStackId);
			}
			if (typeof parsed.selectedItemId === 'string') {
				setSelectedItemId(parsed.selectedItemId);
			}
		} catch {
			// ignore invalid persisted state
		}
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const stateToPersist: StoredEvaluatorState = {
			input,
			selectedItemId,
			selectedStackId,
		};
		localStorage.setItem(EVALUATOR_STATE_STORAGE_KEY, JSON.stringify(stateToPersist));
	}, [input, selectedItemId, selectedStackId]);

	useEffect(() => {
		if (selectedStackId && selectedItemId && !availableItemIds.has(selectedItemId)) {
			setSelectedItemId('');
		}
	}, [availableItemIds, selectedItemId, selectedStackId]);

	useEffect(() => {
		if (!selectedStackId || !selectedItemId || typeof window === 'undefined') {
			setSavedSelection(null);
			return;
		}

		try {
			const existingRaw = localStorage.getItem(STACK_ITEM_ASSESSMENTS_STORAGE_KEY);
			const existing = existingRaw ? (JSON.parse(existingRaw) as Record<string, LinkedAssessment>) : {};
			const storageKey = `${selectedStackId}:${selectedItemId}`;
			setSavedSelection(existing[storageKey] ?? null);
		} catch {
			setSavedSelection(null);
		}
	}, [selectedItemId, selectedStackId]);

	const updateDimension = (key: StackSelectionDimensionKey, rawValue: unknown) => {
		const parsedValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);
		if (!Number.isFinite(parsedValue)) {
			return;
		}

		setInput((previous) => ({
			...previous,
			dimensions: {
				...previous.dimensions,
				[key]: parsedValue,
			},
		}));
	};

	const updateHardExclusion = (key: keyof StackSelectionHardExclusion, rawValue: unknown) => {
		setInput((previous) => ({
			...previous,
			hardExclusion: {
				...previous.hardExclusion,
				[key]: Boolean(rawValue),
			},
		}));
	};

	const resetAll = () => {
		setInput(DEFAULT_INPUT);
		setSaveMessage('');
		setSelectedItemId('');
		setSelectedStackId('');
	};

	const saveAssessmentForSelection = () => {
		if (!selectedStackId || !selectedItemId || typeof window === 'undefined') {
			setSaveMessage(t('pages.settings.stackSelection.saveHint', 'Bitte Stack und Item auswählen, um zu speichern.'));
			return;
		}

		const payload: LinkedAssessment = {
			input,
			itemId: selectedItemId,
			result,
			savedAt: new Date().toISOString(),
			stackId: selectedStackId,
		};

		const storageKey = `${selectedStackId}:${selectedItemId}`;

		try {
			const existingRaw = localStorage.getItem(STACK_ITEM_ASSESSMENTS_STORAGE_KEY);
			const existing = existingRaw ? (JSON.parse(existingRaw) as Record<string, LinkedAssessment>) : {};
			existing[storageKey] = payload;
			localStorage.setItem(STACK_ITEM_ASSESSMENTS_STORAGE_KEY, JSON.stringify(existing));
			setSavedSelection(payload);
			setSaveMessage(t('pages.settings.stackSelection.saveSuccess', 'Assessment für Stack/Item lokal gespeichert.'));
		} catch {
			setSaveMessage(t('pages.settings.stackSelection.saveError', 'Assessment konnte nicht gespeichert werden.'));
		}
	};

	const applySavedAssessment = () => {
		if (!savedSelection) {
			return;
		}
		setInput(savedSelection.input);
		setSaveMessage(t('pages.settings.stackSelection.loadSuccess', 'Gespeichertes Assessment geladen.'));
	};

	return (
		<section className="stack-selection-evaluator mt-8" aria-labelledby="stack-selection-title">
			<h2 id="stack-selection-title" className="text-2xl font-bold mb-4">
				{t('pages.settings.stackSelection.title', 'Stack-Selection Test')}
			</h2>
			<p className="stack-selection-evaluator__intro mb-6">
				{t(
					'pages.settings.stackSelection.description',
					'Hier kannst du die Bewertung aus dem Plan direkt ausprobieren. Alle Eingaben werden lokal berechnet und zeigen sofort Entscheidungsklasse und Kernstack-Eignung.',
				)}
			</p>

			<div className="grid gap-6 md:grid-cols-2">
				<KolCard _label={t('pages.settings.stackSelection.dimensions', 'Dimensionen (0–5)')}>
					<div className="p-4 grid gap-3">
						{DIMENSION_KEYS.map((key) => (
							<KolInputNumber
								key={key}
								_label={t(`pages.settings.stackSelection.dimensionLabels.${key}`, key)}
								_min={0}
								_max={5}
								_step={1}
								_value={input.dimensions[key]}
								_on={{
									onChange: (_event: Event, value: unknown) => updateDimension(key, value),
								}}
							/>
						))}
					</div>
				</KolCard>

				<KolCard _label={t('pages.settings.stackSelection.config', 'Konfiguration')}>
					<div className="p-4 grid gap-3">
						<KolSingleSelect
							_label={t('pages.settings.stackSelection.stack', 'Stack')}
							_options={stackOptions}
							_value={selectedStackId}
							_on={{
								onChange: (_event: Event, value: unknown) => {
									if (typeof value === 'string') {
										setSelectedStackId(value);
									}
								},
							}}
						/>
						<KolSingleSelect
							_label={t('pages.settings.stackSelection.item', 'Item')}
							_options={itemOptions}
							_value={selectedItemId}
							_on={{
								onChange: (_event: Event, value: unknown) => {
									if (typeof value === 'string') {
										setSelectedItemId(value);
									}
								},
							}}
						/>

						<KolSingleSelect
							_label={t('pages.settings.stackSelection.itemClass', 'Item-Klasse')}
							_options={[
								{ label: t('pages.settings.stackSelection.itemClassOptions.architekturPattern', 'Architektur-Pattern'), value: 'architekturPattern' },
								{
									label: t('pages.settings.stackSelection.itemClassOptions.beobachtungskandidat', 'Beobachtungskandidat'),
									value: 'beobachtungskandidat',
								},
								{ label: t('pages.settings.stackSelection.itemClassOptions.offenerStandard', 'Offener Standard'), value: 'offenerStandard' },
								{
									label: t('pages.settings.stackSelection.itemClassOptions.produktPlattformFramework', 'Produkt/Plattform/Framework'),
									value: 'produktPlattformFramework',
								},
								{
									label: t('pages.settings.stackSelection.itemClassOptions.referenzimplementierung', 'Referenzimplementierung'),
									value: 'referenzimplementierung',
								},
							]}
							_value={input.itemClass}
							_on={{
								onChange: (_event: Event, value: unknown) => {
									if (typeof value === 'string') {
										setInput((previous) => ({
											...previous,
											itemClass: value as StackSelectionAssessmentInput['itemClass'],
										}));
									}
								},
							}}
						/>

						<KolSingleSelect
							_label={t('pages.settings.stackSelection.lifecycle', 'Lifecycle-Status')}
							_options={[
								{ label: t('pages.settings.stackSelection.lifecycleOptions.deprecated', 'Deprecated'), value: 'deprecated' },
								{ label: t('pages.settings.stackSelection.lifecycleOptions.kandidat', 'Kandidat'), value: 'kandidat' },
								{ label: t('pages.settings.stackSelection.lifecycleOptions.kernstack', 'Kernstack'), value: 'kernstack' },
								{ label: t('pages.settings.stackSelection.lifecycleOptions.referenz', 'Referenz'), value: 'referenz' },
								{ label: t('pages.settings.stackSelection.lifecycleOptions.sunset', 'Sunset'), value: 'sunset' },
							]}
							_value={input.lifecycleStatus}
							_on={{
								onChange: (_event: Event, value: unknown) => {
									if (typeof value === 'string') {
										setInput((previous) => ({
											...previous,
											lifecycleStatus: value as StackSelectionAssessmentInput['lifecycleStatus'],
										}));
									}
								},
							}}
						/>

						<KolButton _label={t('pages.settings.stackSelection.reset', 'Auf Standardwerte zurücksetzen')} _variant="ghost" _on={{ onClick: resetAll }} />
					</div>
				</KolCard>
			</div>

			<KolCard className="mt-6" _label={t('pages.settings.stackSelection.hardExclusions', 'Hard Exclusions')}>
				<div className="p-4 grid gap-3 md:grid-cols-2">
					{Object.keys(DEFAULT_HARD_EXCLUSION).map((key) => (
						<KolInputCheckbox
							key={key}
							_label={t(`pages.settings.stackSelection.hardExclusionLabels.${key}`, key)}
							_checked={input.hardExclusion[key as keyof StackSelectionHardExclusion]}
							_on={{
								onChange: (_event: Event, value: unknown) => updateHardExclusion(key as keyof StackSelectionHardExclusion, value),
							}}
						/>
					))}
				</div>
			</KolCard>

			<KolCard className="mt-6" _label={t('pages.settings.stackSelection.result', 'Ergebnis')}>
				<div className="p-4">
					<p className="stack-selection-evaluator__result-line">
						<strong>{t('pages.settings.stackSelection.selectionContext', 'Auswahlkontext')}:</strong>{' '}
						{selectedStackId && selectedItemId
							? t('pages.settings.stackSelection.selectionContextFilled', 'Stack und Item ausgewählt')
							: t('pages.settings.stackSelection.selectionContextEmpty', 'Kein Stack/Item ausgewählt')}
					</p>
					{selectedStackItemRelation && (
						<p className="stack-selection-evaluator__result-line">
							<strong>{t('pages.settings.stackSelection.stackRole', 'Stack-Rolle')}:</strong> {selectedStackItemRelation.role} ·{' '}
							<strong>{t('pages.settings.stackSelection.stackStatus', 'Stack-Status')}:</strong> {selectedStackItemRelation.status}
						</p>
					)}
					<p className="stack-selection-evaluator__result-line">
						<strong>{t('pages.settings.stackSelection.resultDecision', 'Entscheidungsklasse')}:</strong> {result.decisionClass}
					</p>
					<p className="stack-selection-evaluator__result-line">
						<strong>{t('pages.settings.stackSelection.resultPoints', 'Punkte')}:</strong> {result.points}
					</p>
					<p className="stack-selection-evaluator__result-line">
						<strong>{t('pages.settings.stackSelection.resultWeighted', 'Gewichteter Score')}:</strong> {result.weightedScore}
					</p>
					<p className="stack-selection-evaluator__result-line">
						<strong>{t('pages.settings.stackSelection.resultThreshold', 'Threshold verletzt')}:</strong>{' '}
						{result.thresholdFailed ? t('pages.settings.stackSelection.yes', 'Ja') : t('pages.settings.stackSelection.no', 'Nein')}
					</p>
					<p className="stack-selection-evaluator__result-line">
						<strong>{t('pages.settings.stackSelection.resultHardExclusion', 'Hard Exclusion verletzt')}:</strong>{' '}
						{result.hardExclusionFailed ? t('pages.settings.stackSelection.yes', 'Ja') : t('pages.settings.stackSelection.no', 'Nein')}
					</p>
					<p className="stack-selection-evaluator__result-line">
						<strong>{t('pages.settings.stackSelection.resultCore', 'Für Kernstack geeignet')}:</strong>{' '}
						{result.isEligibleForCore ? t('pages.settings.stackSelection.yes', 'Ja') : t('pages.settings.stackSelection.no', 'Nein')}
					</p>

					<div className="mt-4">
						<KolButton
							_label={t('pages.settings.stackSelection.saveSelection', 'Assessment für ausgewählten Stack/Item speichern')}
							_variant="primary"
							_on={{ onClick: saveAssessmentForSelection }}
						/>
					</div>
					{saveMessage && <p className="stack-selection-evaluator__result-line mt-2">{saveMessage}</p>}
					{savedSelection && (
						<div className="mt-3">
							<p className="stack-selection-evaluator__result-line">
								<strong>{t('pages.settings.stackSelection.savedAt', 'Gespeichert am')}:</strong> {new Date(savedSelection.savedAt).toLocaleString()}
							</p>
							<KolButton
								_label={t('pages.settings.stackSelection.loadSaved', 'Gespeichertes Assessment laden')}
								_variant="secondary"
								_on={{ onClick: applySavedAssessment }}
							/>
						</div>
					)}
				</div>
			</KolCard>
		</section>
	);
}
