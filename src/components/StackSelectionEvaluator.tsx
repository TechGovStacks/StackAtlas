import { KolButton, KolCard, KolInputCheckbox, KolInputNumber, KolSingleSelect } from '@public-ui/preact';
import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import type { StackSelectionAssessmentInput, StackSelectionDimensionKey, StackSelectionHardExclusion } from '../types';
import { computeStackSelectionAssessment } from '../utils';

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

export function StackSelectionEvaluator() {
	const { t } = useTranslation();
	const [input, setInput] = useState<StackSelectionAssessmentInput>(DEFAULT_INPUT);

	const result = useMemo(() => computeStackSelectionAssessment(input), [input]);

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

						<KolButton
							_label={t('pages.settings.stackSelection.reset', 'Auf Standardwerte zurücksetzen')}
							_variant="ghost"
							_on={{ onClick: () => setInput(DEFAULT_INPUT) }}
						/>
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
				</div>
			</KolCard>
		</section>
	);
}
