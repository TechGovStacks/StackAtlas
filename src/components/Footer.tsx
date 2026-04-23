import { KolLinkButton } from '@public-ui/preact';
import { useTranslation } from 'react-i18next';
import { getAppVersion, getCommitDisplay } from '../utils';

const GITHUB_REPO = 'https://github.com/TechGovStacks/StackAtlas';

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	const commitDisplay = getCommitDisplay();
	const appVersion = getAppVersion();

	return (
		<footer className="footer w-full border-t mt-auto">
			<div className="footer__inner flex flex-col max-w-6xl mx-auto px-4 md:px-6 w-full">
				<div className="footer__nav flex flex-col items-start gap-6 py-8 md:py-12 border-b">
					<div className="footer__brand">
						<p className="footer__title font-bold text-sm mb-2">StackAtlas</p>
						<p className="footer__subtitle text-xs">{t('footer.subtitle')}</p>
					</div>

					<nav className="footer__nav-section flex flex-wrap items-center gap-4 md:gap-6 text-sm" aria-label={t('footer.navigationAria')}>
						<a href="https://github.com/TechGovStacks/StackAtlas/blob/main/docs/README.md" rel="noopener noreferrer" className="footer__link">
							{t('footer.links.documentation')}
						</a>
						<a href="#/news" className="footer__link">
							News
						</a>
						<a href="#/graphs" className="footer__link">
							Graphs
						</a>
						<a href="https://github.com/TechGovStacks/StackAtlas/issues/new/choose" rel="noopener noreferrer" className="footer__link">
							{t('footer.links.issues')}
						</a>
						<a href="#/settings" className="footer__link">
							{t('footer.links.settings')}
						</a>
						<KolLinkButton _label={t('footer.links.githubCta')} _href={GITHUB_REPO} _target="_blank" _variant="secondary" className="footer__github-cta" />
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
