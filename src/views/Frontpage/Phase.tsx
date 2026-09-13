import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { Button } from '@genai-fi/base';
import { useGameScale } from '../../context/GameScale/useGameScale';

interface Props {
    id: string;
    image: string;
    onClick?: () => void;
}

export default function Phase({ id, image, onClick }: Props) {
    const { t } = useTranslation();
    const { s } = useGameScale();

    return (
        <li>
            <Button
                onClick={onClick}
                className={style.step}
            >
                {image && (
                    <div
                        className={style.imageContainer}
                        style={{
                            height: Math.min(200, s(200)),
                        }}
                    >
                        <img
                            src={image}
                            alt={t(`app.phases.titles.${id}`)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'fill',
                            }}
                        />
                    </div>
                )}
                <h2>{t(`app.phases.titles.${id}`)}</h2>
                <div className={style.description}>{t(`app.phases.desc.${id}`)}</div>
            </Button>
        </li>
    );
}
