import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { useTheme, type ThemeValue } from '../hooks/useTheme';
import { AutoSingleSelect as KolSingleSelect } from './AutoSingleSelect';
import { LanguageSwitcher } from './LanguageSwitcher';

export function SettingsForm() {
	const { t } = useTranslation();
	const { theme, setTheme } = useTheme();
	const [displayTheme, setDisplayTheme] = useState<string>(theme);

	// Keep display value in sync when theme changes externally (e.g. loaded from localStorage)
	useEffect(() => {
		setDisplayTheme(theme);
	}, [theme]);

	const themeOptions = [
		{ value: 'auto', label: t('pages.settings.theme.auto') },
		{ value: 'light', label: t('pages.settings.theme.light') },
		{ value: 'dark', label: t('pages.settings.theme.dark') },
		{ value: 'high-contrast', label: t('pages.settings.theme.highContrast') },
	];

	const handleThemeChange = (_event: Event, value: unknown) => {
		const newTheme = typeof value === 'string' ? value : '';
		setDisplayTheme(newTheme);
		if (newTheme) setTheme(newTheme as ThemeValue);
	};

	return (
		<div className="settings-form space-y-6">
			<p className="text-sm text-gray-600">{t('pages.settings.description')}</p>

			<LanguageSwitcher />

			<div className="settings-form__theme-group space-y-2">
				<KolSingleSelect
					_label={t('pages.settings.theme.label')}
					_options={themeOptions}
					_value={displayTheme}
					_on={{
						onChange: handleThemeChange,
					}}
				/>
			</div>
		</div>
	);
}
