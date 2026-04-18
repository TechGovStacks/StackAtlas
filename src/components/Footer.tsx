import { useTranslation } from 'react-i18next';
import { getAppVersion, getCommitDisplay } from '../utils';

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	const commitDisplay = getCommitDisplay();
	const appVersion = getAppVersion();

	return (
		<footer className="footer w-full border-t mt-auto">
			<div className="footer__inner flex flex-col max-w-6xl mx-auto px-4 md:px-6 w-full">
				{/* Navigation flex */}
				<div className="footer__nav flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8 py-8 md:py-12 border-b">
					{/* Brand section */}
					<div className="footer__brand">
						<p className="footer__title font-bold text-sm mb-2">StackAtlas</p>
						<p className="footer__subtitle text-xs">{t('footer.subtitle')}</p>
					</div>

					{/* Links navigation */}
					<nav className="footer__nav-section flex flex-wrap gap-4 md:gap-6 text-sm" aria-label={t('footer.navigationAria')}>
						<a href="https://github.com/deleonio/accessible-d-stack-landscape/blob/main/docs/README.md" rel="noopener noreferrer" className="footer__link">
							{t('footer.links.documentation')}
						</a>
						<a href="#/news" className="footer__link">
							News
						</a>
						<a href="#/stacks" className="footer__link">
							Stacks
						</a>
						<a href="#/graphs" className="footer__link">
							Graphs
						</a>
						<a href="https://github.com/deleonio/accessible-d-stack-landscape" rel="noopener noreferrer" className="footer__link">
							GitHub
						</a>
						<a href="https://github.com/deleonio/accessible-d-stack-landscape/issues/new" rel="noopener noreferrer" className="footer__link">
							Community
						</a>
						<a href="#/settings" className="footer__link">
							{t('footer.links.settings')}
						</a>
					</nav>
				</div>
			</div>

			{/* Footer Abschlussleiste (volle Breite) */}
			<div className="footer__meta py-3 px-4 md:px-6">
				<div className="footer__meta-inner flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<p className="footer__copy">
						© {year} StackAtlas · Lizenz: EUPL-1.2 · Built with{' '}
						<a href="https://public-ui.github.io/en/" rel="noopener noreferrer" className="footer__copy-link underline">
							KoliBri
						</a>
						, {t('footer.and')}{' '}
						<a href="https://designsystem.gov.de/" rel="noopener noreferrer" className="footer__copy-link underline">
							KERN-UX
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
