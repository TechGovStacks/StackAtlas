import { useTranslation } from 'react-i18next';
import { SettingsForm } from '../components/SettingsForm';
import { StackSelectionEvaluator } from '../components/StackSelectionEvaluator';
import { useRouteAnnouncement } from '../hooks/useRouteAnnouncement';

export function SettingsPage() {
	const { t } = useTranslation();
	useRouteAnnouncement({ pageTitle: t('pages.settings.title') || 'Settings' });

	return (
		<main id="main-content" className="content-page max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12" aria-labelledby="settings-page-title">
			<h1 id="settings-page-title" className="text-3xl md:text-4xl font-bold mb-8">
				{t('pages.settings.title')}
			</h1>
			<SettingsForm />
			<StackSelectionEvaluator />
		</main>
	);
}
