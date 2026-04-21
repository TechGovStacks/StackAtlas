import { KolButton, KolCard } from '@public-ui/preact';
import { useEffect, useRef } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

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
			<KolCard _label={t('betaNotice.title')} className="beta-modal-card">
				<div className="beta-modal-content">
					<p className="beta-modal-description">{t('betaNotice.description')}</p>
					<div className="beta-modal-actions">
						<KolButton ref={closeButtonRef} _label={t('betaNotice.closeButton')} _variant="primary" _on={{ onClick: onClose }} />
					</div>
				</div>
			</KolCard>
		</div>
	);
}
