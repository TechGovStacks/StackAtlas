import { KolSingleSelect } from '@public-ui/preact';
import { useTranslation } from 'react-i18next';
import { useTheme, type ThemeValue } from '../hooks/useTheme';
import { LanguageSwitcher } from './LanguageSwitcher';

export function SettingsForm() {
	const { t } = useTranslation();
	const { theme, setTheme } = useTheme();

	const themeOptions = [
		{ value: 'auto', label: t('pages.settings.theme.auto') },
		{ value: 'light', label: t('pages.settings.theme.light') },
		{ value: 'dark', label: t('pages.settings.theme.dark') },
		{ value: 'high-contrast', label: t('pages.settings.theme.highContrast') },
	];

	return (
		<div className="settings-form space-y-6">
			<p className="text-sm text-gray-600">{t('pages.settings.description')}</p>

			<fieldset className="settings-form__theme-group space-y-2">
				<legend className="text-sm font-semibold">{t('pages.settings.theme.label')}</legend>
				<KolSingleSelect
					_label={t('pages.settings.theme.label')}
					_hideLabel
					_options={themeOptions}
					_value={theme}
					_on={{
						onChange: (event: Event) => {
							const target = event.target as HTMLSelectElement;
							setTheme(target.value as ThemeValue);
						},
					}}
				/>
			</fieldset>

			<LanguageSwitcher />
		</div>
	);
}
