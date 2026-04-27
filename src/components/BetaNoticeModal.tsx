import { KolButton } from '@public-ui/preact';
import { useEffect, useRef } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

const GITHUB_URL = 'https://github.com/TechGovStacks/StackAtlas';

interface BetaNoticeModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function BetaNoticeModal({ isOpen, onClose }: BetaNoticeModalProps) {
	const { t } = useTranslation();
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const focusTimeout = setTimeout(() => {
			closeButtonRef.current?.focus();
		}, 50);

		const handleKeyDown = (e: Event) => {
			const keyboardEvent = e as unknown as { key?: string };
			if (keyboardEvent.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			clearTimeout(focusTimeout);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			role="presentation"
			className="beta-modal-overlay"
			onClick={(e) => {
				if ((e.target as HTMLElement) === e.currentTarget) onClose();
			}}
			onKeyDown={(e) => {
				if (e.key === 'Escape' && (e.target as HTMLElement) === e.currentTarget) onClose();
			}}
		>
			<div role="dialog" aria-modal="true" aria-labelledby="beta-modal-title" className="beta-modal-dialog">
				<div className="beta-modal-header">
					<span className="beta-modal-badge">BETA</span>
					<div className="beta-modal-icon" aria-hidden="true">
						<i className="fas fa-flask" />
					</div>
					<h2 id="beta-modal-title" className="beta-modal-title">
						{t('betaNotice.title')}
					</h2>
					<button type="button" className="beta-modal-close-x" aria-label={t('betaNotice.closeButton')} onClick={onClose}>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
				</div>

				<div className="beta-modal-body">
					<p className="beta-modal-description">{t('betaNotice.description')}</p>
				</div>

				<div className="beta-modal-footer">
					<a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="beta-modal-github-link">
						<i className="fab fa-github" aria-hidden="true" />
						{t('betaNotice.githubButton')}
					</a>
					<KolButton ref={closeButtonRef} _label={t('betaNotice.closeButton')} _variant="primary" _on={{ onClick: onClose }} />
				</div>
			</div>
		</div>
	);
}
