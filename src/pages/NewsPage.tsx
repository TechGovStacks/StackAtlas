import { KolButton } from '@public-ui/preact';
import { ComponentType } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { FeaturedNewsCard } from '../components/FeaturedNewsCard';
import { useRouteAnnouncement } from '../hooks/useRouteAnnouncement';
import { NewsEntry } from '../types/news';

const PAGE_SIZE = 10;

type NewsModule = {
	default: ComponentType;
	metadata?: {
		author?: string;
		coverImage?: string;
		featured?: boolean;
		focus?: string;
		summary?: string;
		tags?: string[];
		title?: string;
	};
};

const modules = import.meta.glob('../content/news/*.{md,mdx}', {
	eager: true,
}) as Record<string, NewsModule>;

function normalizeEntries(): NewsEntry[] {
	return Object.entries(modules)
		.map(([path, module]) => {
			const fileName = path.split('/').at(-1) ?? '';
			const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|mdx)$/);

			if (!match || !module.default) {
				return null;
			}

			const [, date, slug] = match;

			return {
				Content: module.default,
				author: module.metadata?.author,
				coverImage: module.metadata?.coverImage,
				date,
				featured: module.metadata?.featured ?? false,
				focus: module.metadata?.focus,
				slug,
				summary: module.metadata?.summary ?? slug,
				tags: module.metadata?.tags ?? [],
				title: module.metadata?.title ?? slug,
			};
		})
		.filter((entry): entry is NonNullable<typeof entry> => entry !== null)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function NewsPage() {
	const { i18n, t } = useTranslation();
	useRouteAnnouncement({ pageTitle: t('pages.news.title') || 'News' });
	const dateFormatter = useMemo(() => new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' }), [i18n.language]);
	const entries = useMemo(() => normalizeEntries(), []);

	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(entries.length / PAGE_SIZE);
	const visibleEntries = entries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	return (
		<main id="main-content" className="content-page" aria-labelledby="news-page-title">
			<h1 id="news-page-title">{t('pages.news.title')}</h1>
			<p>{t('pages.news.description')}</p>

			<section className="news-page" aria-label={t('pages.news.sectionAria')}>
				<p className="news-page__hint">{t('pages.news.pushHint')}</p>

				{entries.length === 0 && <p>{t('pages.news.empty')}</p>}

				<div className="news-page__list">
					{visibleEntries.map((entry) => (
						<FeaturedNewsCard key={`${entry.date}-${entry.slug}`} entry={entry} dateFormatter={dateFormatter} />
					))}
				</div>

				{totalPages > 1 && (
					<nav className="news-pagination" aria-label={t('news.pagination.ariaLabel')}>
						<KolButton
							_label={t('news.pagination.prev')}
							_variant="ghost"
							_disabled={currentPage === 1}
							_on={{ onClick: () => setCurrentPage((p) => p - 1) }}
						/>
						<span className="news-pagination__info">{t('news.pagination.pageOf', { current: currentPage, total: totalPages })}</span>
						<KolButton
							_label={t('news.pagination.next')}
							_variant="ghost"
							_disabled={currentPage === totalPages}
							_on={{ onClick: () => setCurrentPage((p) => p + 1) }}
						/>
					</nav>
				)}
			</section>
		</main>
	);
}
