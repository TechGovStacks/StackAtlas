import { useTranslation } from 'react-i18next';

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	const commitSha = import.meta.env.VITE_COMMIT_SHA;
	const commitDisplay = commitSha ? commitSha.slice(0, 7) : 'lokal';

	return (
		<footer className="footer">
			<div className="footer__inner footer__inner--top">
				<div className="footer__brand">
					<p className="footer-title">StackAtlas</p>
					<p className="footer-sub">{t('footer.subtitle')}</p>
				</div>
				<nav className="footer__links" aria-label={t('footer.navigationAria')}>
					<a href="/settings">{t('footer.links.settings')}</a>
					<a href="/news">{t('footer.links.news')}</a>
					<a href="/imprint">{t('footer.links.imprint')}</a>
					<a href="https://github.com/deleonio/accessible-d-stack-landscape" rel="noopener noreferrer">
						{t('footer.links.github')}
					</a>
					<a href="https://github.com/deleonio/accessible-d-stack-landscape#readme" rel="noopener noreferrer">
						{t('footer.links.documentation')}
					</a>
					<a href="mailto:opensource@example.org">{t('footer.links.contact')}</a>
					<a href="https://github.com/deleonio/accessible-d-stack-landscape/discussions" rel="noopener noreferrer">
						{t('footer.links.community')}
					</a>
				</nav>
			</div>

			<div className="footer__inner footer__inner--bottom">
				<p className="footer__copy">
					© {year} StackAtlas · Lizenz: EUPL-1.2 · Built with{' '}
					<a href="https://www.public-ui.de/" rel="noopener noreferrer">
						KoliBri
					</a>
					, {t('footer.and')}{' '}
					<a href="https://www.kern-ux.com/" rel="noopener noreferrer">
						KERN-UX
					</a>
				</p>
				<p className="footer__meta" aria-label={t('footer.buildCommitAria', { commit: commitDisplay })}>
					{t('footer.buildCommitLabel')} <code>{commitDisplay}</code>
				</p>
			</div>
		</footer>
	);
}
