import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { Button } from '@genai-fi/base';

interface Props {
    id: string;
    url?: string;
    icon?: ReactNode;
    onClick?: () => void;
}

export default function Phase({ id, url, icon, onClick }: Props) {
    const { t } = useTranslation();

    if (url)
        return (
            <Button
                onClick={onClick}
                className={style.step}
            >
                {icon && icon}
                <h2>{t(`app.phases.${id}`)}</h2>
            </Button>
        );
    return (
        <Button
            onClick={onClick}
            className={style.step}
        >
            {icon && icon}
            <h2>{t(`app.phases.${id}`)}</h2>
        </Button>
    );
}
