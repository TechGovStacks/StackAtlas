import { KolSingleSelect } from '@public-ui/preact';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '../i18n/language';

const SUPPORTED_LANGUAGES = [
	{ code: 'da', label: 'Dansk' },
	{ code: 'de', label: 'Deutsch' },
	{ code: 'en', label: 'English' },
	{ code: 'es', label: 'Español' },
	{ code: 'fr', label: 'Français' },
	{ code: 'it', label: 'Italiano' },
	{ code: 'no', label: 'Norsk' },
	{ code: 'sv', label: 'Svenska' },
] as const;

export function LanguageSwitcher() {
	const { i18n, t } = useTranslation();

	const activeLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);
	const languageOptions = SUPPORTED_LANGUAGES.map(({ code, label }) => ({
		label,
		value: code,
	}));

	return (
		<div className="language-switcher">
			<KolSingleSelect
				_label={t('header.languageSwitcher.label')}
				_accessKey={t('header.languageSwitcher.accessKey')}
				_options={languageOptions}
				_value={activeLanguage}
				_on={{
					onChange: (_event: globalThis.Event, value: unknown) => {
						if (typeof value === 'string') {
							void i18n.changeLanguage(normalizeLanguage(value));
						}
					},
				}}
			/>
		</div>
	);
}
