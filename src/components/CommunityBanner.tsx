import { KolButton, KolLinkButton } from '@public-ui/preact';
import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

interface CommunityBannerProps {
	githubUrl?: string;
}

const BANNER_DISMISSED_KEY = 'community-banner-dismissed';

export function CommunityBanner({ githubUrl = import.meta.env.VITE_GITHUB_REPO_URL ?? 'https://github.com/techgovstacks/stackatlas' }: CommunityBannerProps) {
	const { t } = useTranslation();
	const [dismissed, setDismissed] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const isDismissed = localStorage.getItem(BANNER_DISMISSED_KEY) === 'true';
		setDismissed(isDismissed);
	}, []);

	const handleDismiss = () => {
		localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
		setDismissed(true);
	};

	if (!mounted || dismissed) {
		return null;
	}

	return (
		<div className="community-banner" role="banner" aria-label={t('community.bannerLabel')}>
			<div className="community-banner__content">
				<span className="community-banner__text">{t('community.bannerText')}</span>
			</div>
			<KolLinkButton
				className="community-banner__link-button"
				_label={t('community.contribute')}
				_href={githubUrl}
				_target="_blank"
				_rel="noopener noreferrer"
				_variant="secondary"
				_size="small"
			/>
			<KolButton
				className="community-banner__close-button"
				_label={t('community.bannerClose')}
				_hideLabel
				_icons={{ left: 'codicon codicon-close' }}
				_variant="ghost"
				_size="small"
				_on={{ onClick: handleDismiss }}
			/>
		</div>
	);
}
