import { useAtom, useAtomValue } from 'jotai';
import style from './win.module.css';
import { LevelConfAtom, TestAgentAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { Button } from '@genai-fi/base';
import { level2 } from '../../../utils/levels/level2/leveldata';
import { NewFrame } from '../../Frames/NewFrame';
import Separator from '../../../components/Separator/Separator';
import { level3 } from '../../../utils/levels/level3/leveldata';

export default function WinScreen() {
    const { t } = useTranslation();
    const [level, setLevel] = useAtom(LevelConfAtom);
    const vis = useAtomValue(TestAgentAtom);

    const onNextLevel = () => {
        switch (level?.level.manifest.levelIndex) {
            case 1: {
                setLevel(level2);
                break;
            }
            case 2: {
                setLevel(level3);
                break;
            }
            default:
                console.log('No next level');
        }
    };

    if (vis !== 'passed') {
        return null;
    }

    return (
        <NewFrame
            position={{ top: '50%', left: '50%' }}
            centerX={-50}
            centerY={-50}
            zIndex={21}
            variant="blob"
        >
            <div className={style.container}>
                <h1>Congratulations</h1>
                <b>You passed level: {level?.level.manifest.gameName}.</b>
                <Separator />
                <p>{t(`${level?.levelText?.textKey}.postMessage`)}</p>
                <Separator />
                <p>{t(`${level?.levelText?.textKey}.nextLevelInfo`)}</p>
                <Separator />
                <Button
                    onClick={onNextLevel}
                    variant="contained"
                >
                    Next level
                </Button>
            </div>
        </NewFrame>
    );
}
