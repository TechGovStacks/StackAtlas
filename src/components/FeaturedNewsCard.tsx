import { useTranslation } from 'react-i18next';
import { NewsEntry } from '../types/news';
import { parseLocalIsoDate } from '../utils';
import { ExpandableContent } from './ExpandableContent';
import { TagList } from './TagList';

interface FeaturedNewsCardProps {
	dateFormatter: Intl.DateTimeFormat;
	entry: NewsEntry;
}

export function FeaturedNewsCard({ entry, dateFormatter }: FeaturedNewsCardProps) {
	const { t } = useTranslation();

	return (
		<article className="news-card news-card--featured">
			{entry.coverImage && <img src={entry.coverImage} alt="" className="news-card__cover" />}
			<div className="news-card__header">
				{entry.featured && <span className="news-card__badge">{t('news.featured')}</span>}
				<time dateTime={entry.date}>{dateFormatter.format(parseLocalIsoDate(entry.date))}</time>
			</div>
			<h2 className="news-card__title">{entry.title}</h2>
			<p className="news-card__summary">{entry.summary}</p>
			<TagList tags={entry.tags} />
			<ExpandableContent Content={entry.Content} />
		</article>
	);
}
