import { KolLinkButton } from '@public-ui/preact';
import { useTranslation } from 'react-i18next';

const GITHUB_URL = import.meta.env.VITE_GITHUB_REPO_URL ?? 'https://github.com/TechGovStacks/StackAtlas';

export function CommunityBanner() {
	const { t } = useTranslation();

	return (
		<div className="community-banner" role="complementary" aria-label={t('community.bannerAriaLabel')}>
			<div className="community-banner__inner max-w-6xl mx-auto px-4 md:px-6 w-full">
				<p className="community-banner__text">{t('community.bannerText')}</p>
				<div className="community-banner__actions">
					<KolLinkButton className="community-banner__cta" _href={GITHUB_URL} _target="_blank" _label={t('community.contribute')} />
				</div>
			</div>
		</div>
	);
}
