import { KolSingleSelect } from '@public-ui/preact';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = [
	{ code: 'bg', label: 'Български' },
	{ code: 'cs', label: 'Čeština' },
	{ code: 'da', label: 'Dansk' },
	{ code: 'de', label: 'Deutsch' },
	{ code: 'el', label: 'Ελληνικά' },
	{ code: 'en', label: 'English' },
	{ code: 'en-gb', label: 'English (UK)' },
	{ code: 'es', label: 'Español' },
	{ code: 'et', label: 'Eesti' },
	{ code: 'fi', label: 'Suomi' },
	{ code: 'fr', label: 'Français' },
	{ code: 'ga', label: 'Gaeilge' },
	{ code: 'hr', label: 'Hrvatski' },
	{ code: 'hu', label: 'Magyar' },
	{ code: 'it', label: 'Italiano' },
	{ code: 'lt', label: 'Lietuvių' },
	{ code: 'lv', label: 'Latviešu' },
	{ code: 'mt', label: 'Malti' },
	{ code: 'nl', label: 'Nederlands' },
	{ code: 'no', label: 'Norsk' },
	{ code: 'pl', label: 'Polski' },
	{ code: 'pt', label: 'Português' },
	{ code: 'ro', label: 'Română' },
	{ code: 'sk', label: 'Slovenčina' },
	{ code: 'sl', label: 'Slovenščina' },
	{ code: 'sv', label: 'Svenska' },
	{ code: 'uk', label: 'Українська' },
] as const;

export function LanguageSwitcher() {
	const { i18n, t } = useTranslation();

	const activeLanguage = i18n.resolvedLanguage ?? i18n.language ?? '';
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
							void i18n.changeLanguage(value);
						}
					},
				}}
			/>
		</div>
	);
}
