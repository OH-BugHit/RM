import { useAtom, useAtomValue } from 'jotai';
import style from './win.module.css';
import { LevelConfAtom, TestAgentAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { Button } from '@genai-fi/base';
import Separator from '../../../components/Separator/Separator';
import { useViewNavigation } from '../../../hooks/useViewNavigation';

export default function WinScreen() {
    const { t } = useTranslation();
    const [level] = useAtom(LevelConfAtom);
    const vis = useAtomValue(TestAgentAtom);
    const { goToView } = useViewNavigation();

    const onNextLevel = () => {
        goToView({
            main: 'levels',
            sub: null,
        });
    };

    if (vis !== 'passed') {
        return null;
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <h1>{t('winScreen.title')}</h1>
                <b>
                    {t('winScreen.titleDesc')} {level?.level.manifest.gameName}.
                </b>
                <Separator />
                <p>{t(`${level?.levelText?.textKey}.postMessage`)}</p>
                <Separator />
                <p>{t(`${level?.levelText?.textKey}.nextLevelInfo`)}</p>
                <Separator />
                <Button
                    onClick={onNextLevel}
                    variant="contained"
                    style={{ marginBottom: '2dvh' }}
                >
                    {t('winScreen.levelSelect')}
                </Button>
            </div>
        </div>
    );
}
