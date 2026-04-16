import { useLocation } from 'preact-iso';
import { useEffect, useMemo } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { StackExpose } from '../components/StackExpose';
import { ITEMS, LAYERS, STACKS } from '../data/catalog';
import { computeStackAvgScore, useStackMetrics } from '../hooks/useStackMetrics';
import { Stack } from '../types';

interface StackExposeWithMetricsProps {
	stack: Stack;
	isTop: boolean;
	rank: number;
}

/**
 * Wrapper-Komponente, damit useStackMetrics nicht in einem map()-Callback aufgerufen wird.
 * Hooks müssen auf Component-Ebene aufgerufen werden.
 */
function StackExposeWithMetrics({ stack, isTop, rank }: StackExposeWithMetricsProps) {
	const metrics = useStackMetrics(stack, ITEMS, LAYERS);
	return <StackExpose stack={stack} metrics={metrics} allLayers={LAYERS} isTop={isTop} rank={rank} />;
}

export function StackGalleryPage() {
	const { t } = useTranslation();
	const location = useLocation();
	const selectedStackId = location.query.stack;

	const stacksWithScores = useMemo(() => STACKS.map((stack) => ({ stack, avgScore: computeStackAvgScore(stack, ITEMS) })), []);

	// Stacks absteigend nach Ø-Score sortieren
	const rankedStacks = useMemo(() => [...stacksWithScores].sort((a, b) => b.avgScore - a.avgScore), [stacksWithScores]);

	useEffect(() => {
		if (!selectedStackId) return;

		window.requestAnimationFrame(() => {
			const target = document.getElementById(`stack-${selectedStackId}`);
			if (!target) return;

			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
		});
	}, [selectedStackId]);

	return (
		<main id="main-content" className="stack-gallery" aria-labelledby="gallery-page-title">
			<div className="stack-gallery__header">
				<h1 id="gallery-page-title" className="stack-gallery__title">
					{t('stackGallery.title')}
				</h1>
				<p className="stack-gallery__subtitle">{t('stackGallery.subtitle')}</p>
			</div>

			<ol className="stack-gallery__list" aria-label={t('stackGallery.listAria')}>
				{rankedStacks.map(({ stack }, index) => (
					<li key={stack.id} className="stack-gallery__item" id={`stack-${stack.id}`}>
						<StackExposeWithMetrics stack={stack} isTop={index === 0} rank={index + 1} />
					</li>
				))}
			</ol>
		</main>
	);
}
