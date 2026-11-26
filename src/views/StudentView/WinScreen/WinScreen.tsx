import { useAtom, useStore } from 'jotai';
import style from './win.module.css';
import { LevelConfAtom, LevelMapNodesAtom, TestAgentAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { Button } from '@genai-fi/base';
import Separator from '../../../components/Separator/Separator';
import { useViewNavigation } from '../../../hooks/useViewNavigation';

export default function WinScreen() {
    const { t } = useTranslation();
    const [level] = useAtom(LevelConfAtom);
    const [vis, setVis] = useAtom(TestAgentAtom);
    const { goToView } = useViewNavigation();
    const store = useStore();

    const onNextLevel = () => {
        if (level) {
            const nodes = store.get(LevelMapNodesAtom);

            const currentNode = nodes.find(
                (node) =>
                    node.level.level.manifest.gameName === level.level.manifest.gameName && node.kind === 'required'
            );

            if (currentNode) {
                const updatedNodes = nodes.map((node) => {
                    if (node.groupType === currentNode.groupType && node.kind === 'bonus') {
                        return {
                            ...node,
                            allowed: true,
                        };
                    }

                    return node;
                });

                store.set(LevelMapNodesAtom, updatedNodes);
            }
        }
        setVis('no');
        goToView({
            main: 'levels',
            level: null,
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
                {level?.levelText?.textKey && (
                    <>
                        <Separator />
                        <p>{t(`${level?.levelText?.textKey}.postMessage`)}</p>
                        <Separator />
                        <p>{t(`${level?.levelText?.textKey}.nextLevelInfo`)}</p>
                    </>
                )}
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
