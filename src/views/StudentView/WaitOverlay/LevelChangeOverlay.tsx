import style from './wait.module.css';
import { useAtomValue } from 'jotai';
import { Button } from '@genai-fi/base';
import { LevelConfAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { NewFrame } from '../../Frames/NewFrame';

interface WaitOverlayProps {
    onReady: () => void;
}
export default function LevelChangeOverlay({ onReady }: WaitOverlayProps) {
    const { t } = useTranslation();
    const level = useAtomValue(LevelConfAtom);

    return (
        <NewFrame
            position={{ top: '50%', left: '50%' }}
            centerX={-50}
            centerY={-50}
            zIndex={21}
            variant="blob"
        >
            <div className={style.waitContent}>
                <h1>{level?.level.manifest.gameName}</h1>
                <p>{t(`${level?.levelText?.textKey}.preMessage`)}</p>
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
