import { NativeSelect } from '@mui/material';
import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import LanguageIcon from '@mui/icons-material/Language';

interface Props {
    position?: 'topRight' | null;
}

export default function LangSelect({ position }: Props) {
    const { t, i18n } = useTranslation();

    const doChangeLanguage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value || 'en-GB');
    };

    const supportedLanguages = Array.isArray(i18n.options?.supportedLngs)
        ? i18n.options.supportedLngs.filter(
              (lng: string) => lng !== 'cimode' // dont show test languages
          )
        : [];

    return (
        <div className={`${style.lang} ${position === 'topRight' ? style.langTopRight : style.langBottomRight}`}>
            <NativeSelect
                value={i18n.language}
                onChange={doChangeLanguage}
                variant="outlined"
                data-testid="select-lang"
                style={{ padding: '2px' }}
                inputProps={{ 'aria-label': t('app.language', { ns: 'common' }) }}
            >
                {supportedLanguages.map((lng) => (
                    <option
                        key={lng}
                        value={lng}
                    >
                        {t(`languages.${lng}`)}
                    </option>
                ))}
            </NativeSelect>
            <LanguageIcon />
        </div>
    );
}
