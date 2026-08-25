import { Link } from 'react-router-dom';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface Props {
    id: string;
    url: string;
    icon?: ReactNode;
    onClick?: () => void;
}

export default function Phase({ id, url, icon, onClick }: Props) {
    const { t } = useTranslation();

    return (
        <Link
            onClick={onClick}
            to={url}
            className={style.step}
        >
            {icon && icon}
            <h2>{t(`app.phases.${id}`)}</h2>
        </Link>
    );
}
