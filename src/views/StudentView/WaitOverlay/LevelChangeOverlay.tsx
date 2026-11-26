import style from './wait.module.css';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';
import { NewFrame } from '../../Frames/NewFrame';
import { Level } from '../../../types';

interface WaitOverlayProps {
    onReady: () => void;
    level: Level;
}
export default function LevelChangeOverlay({ onReady, level }: WaitOverlayProps) {
    const { t } = useTranslation();

    if (!level?.level.manifest) {
        onReady();
    }

    return (
        <NewFrame
            position={{ top: '0%', left: '50%' }}
            centerX={-50}
            zIndex={21}
            variant="blob"
        >
            <div className={style.waitContent}>
                <h1>{level?.level.manifest.gameName}</h1>
                {level?.levelText?.textKey && <p>{t(`${level.levelText.textKey}.preMessage`)}</p>}
                <Button
                    onClick={onReady}
                    variant="contained"
                    sx={{ maxWidth: 'max-content', minWidth: '100px' }}
                >
                    {t('common.actions.startLevel')}
                </Button>
            </div>
        </NewFrame>
    );
}
