import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { Button } from '@genai-fi/base';
import { useGameScale } from '../../context/GameScale/useGameScale';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    id: string;
    image?: string;
    onClick?: () => void;
}

export default function Phase({ id, image, onClick, children }: Props) {
    const { t } = useTranslation();
    const { s } = useGameScale();

    return (
        <li>
            <Button
                onClick={onClick}
                className={style.step}
            >
                <div
                    className={style.imageContainer}
                    style={{
                        height: Math.min(200, s(200)),
                    }}
                >
                    {image && (
                        <img
                            src={image}
                            alt={t(`app.phases.titles.${id}`)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'fill',
                            }}
                        />
                    )}
                    {children}
                </div>
                <h2>{t(`app.phases.titles.${id}`)}</h2>
                <div className={style.description}>{t(`app.phases.desc.${id}`)}</div>
            </Button>
        </li>
    );
}
