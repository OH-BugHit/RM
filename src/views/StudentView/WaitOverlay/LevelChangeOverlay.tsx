import style from './wait.module.css';
import { useAtomValue } from 'jotai';
import { GameModeAtom, TeacherControlAtom } from '../../../atoms/state';
import { Button } from '@genai-fi/base';
import { LevelConfAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { NewFrame } from '../../Frames/NewFrame';

interface WaitOverlayProps {
    onReady: () => void;
}
export default function LevelChangeOverlay({ onReady }: WaitOverlayProps) {
    const { t } = useTranslation();
    const gameMode = useAtomValue(GameModeAtom);
    const teacherControl = useAtomValue(TeacherControlAtom);
    const level = useAtomValue(LevelConfAtom);

    if (gameMode === 'single') {
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
                    {t(`${level?.levelText?.textKey}.preMessage`)}
                    <Button
                        onClick={onReady}
                        variant="contained"
                        sx={{ maxWidth: 'max-content', minWidth: '100px' }}
                    >
                        Start level
                    </Button>
                </div>
            </NewFrame>
        );
    }

    return (
        <div className={style.waitContent}>
            Waiting for teacher action
            <Button
                disabled={teacherControl.wait}
                onClick={onReady}
            >
                Start level
            </Button>
        </div>
    );
}
