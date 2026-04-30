import { KolButton } from '@public-ui/preact';
import { ComponentType } from 'preact';
import { useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

export function ExpandableContent({ Content }: { Content: ComponentType }) {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="expandable-content">
			{expanded && (
				<div className="expandable-content__body news-report-card__content">
					<Content />
				</div>
			)}
			<KolButton _label={expanded ? t('news.collapse') : t('news.expand')} _variant="ghost" _on={{ onClick: () => setExpanded(!expanded) }} />
		</div>
	);
}
