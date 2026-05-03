import { KolButton, KolLinkButton } from '@public-ui/preact';
import { useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { getAppVersion, getCommitDisplay } from '../utils';

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	const commitDisplay = getCommitDisplay();
	const appVersion = getAppVersion();

	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		const url = window.location.href;
		try {
			if (navigator.share) {
				await navigator.share({
					title: 'StackAtlas',
					text: t('footer.shareText'),
					url,
				});
			} else {
				await navigator.clipboard.writeText(url);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		} catch (err) {
			if (err instanceof DOMException && err.name === 'AbortError') {
				return;
			}
			// Silently ignore other errors (e.g. clipboard permission denied)
		}
	};

	return (
		<footer className="footer w-full border-t mt-auto">
			<div className="footer__inner flex flex-col max-w-6xl mx-auto px-4 md:px-6 w-full">
				<div className="footer__nav flex flex-col gap-8 py-8 md:py-12 border-b">
					<div className="footer__brand">
						<p className="footer__title font-bold text-sm mb-2">StackAtlas</p>
						<p className="footer__subtitle text-xs">{t('footer.subtitle')}</p>
					</div>

					<nav className="footer__nav-section text-sm" aria-label={t('footer.navigationAria')}>
						<ul className="flex flex-wrap items-center gap-4 md:gap-6 p-0 m-0 list-none">
							<li className="mb-1">
								<KolLinkButton
									_label={t('footer.links.documentation')}
									_href="https://github.com/TechGovStacks/StackAtlas/blob/main/docs/README.md"
									className="footer__link-btn"
								/>
							</li>
							<li className="mb-1">
								<KolLinkButton _label="News" _href="#/news" className="footer__link-btn" />
							</li>
							<li className="mb-1">
								<KolLinkButton _label="Graphs" _href="#/graphs" className="footer__link-btn" />
							</li>
							<li className="mb-1">
								<KolLinkButton _label="Issue melden" _href="https://github.com/TechGovStacks/StackAtlas/issues/new" className="footer__link-btn" />
							</li>
							<li className="mb-1">
								<KolLinkButton
									_label={t('footer.links.contribute')}
									_icons="fab fa-github"
									_href="https://github.com/TechGovStacks/StackAtlas"
									_hideLabel
									className="footer__github-corner-btn"
								/>
							</li>
							<li className="mb-1">
								<KolButton
									_label={copied ? t('footer.shareCopied') : t('footer.share')}
									_icons={copied ? 'fas fa-check' : 'fas fa-share-nodes'}
									_hideLabel
									_on={{ onClick: () => void handleShare() }}
									className="footer__share-btn"
								/>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className="footer__meta py-3 px-4 md:px-6">
				<div className="footer__meta-inner flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<p className="footer__copy">
						© {year} StackAtlas · Lizenz: EUPL-1.2 · Built with{' '}
						<a href="https://public-ui.github.io/en/" rel="noopener noreferrer" className="footer__copy-link underline">
							KoliBri
						</a>
					</p>
					<p className="footer__build-info" aria-label={t('footer.buildInfoAria', { commit: commitDisplay, version: appVersion })}>
						<span className="footer__build-label">{t('footer.buildVersionLabel')}</span> <code className="footer__build-code">{appVersion}</code> ·{' '}
						<span className="footer__build-label">{t('footer.buildCommitLabel')}</span> <code className="footer__build-code">{commitDisplay}</code>
					</p>
				</div>
			</div>
		</footer>
	);
}
