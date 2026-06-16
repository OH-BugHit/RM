import { Link } from 'react-router-dom';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface Props {
    id: string;
    url: string;
    image?: string;
    icon?: ReactNode;
    onClick?: () => void;
}

export default function Phase({ id, url, image, icon, onClick }: Props) {
    const { t } = useTranslation();

    return (
        <Link
            onClick={onClick}
            to={url}
            className={style.step}
        >
            {image && (
                <img
                    src={image}
                    width={128}
                    height={128}
                    alt={t(`app.phases.${id}`)}
                    className={style.stepImage}
                />
            )}
            {icon && <div className={style.icon}>{icon}</div>}
            <div className={style.stepContent}>
                <h2>{t(`app.phases.${id}`)}</h2>
            </div>
        </Link>
    );
}
