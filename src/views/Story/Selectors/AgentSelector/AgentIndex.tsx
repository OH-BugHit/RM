import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Separator from '../../../../components/Separator/Separator';
import { useAtom, useAtomValue, useStore } from 'jotai';
import { ActiveAgentAtom } from '../../../../atoms/state';
import AgentSelector from './AgentSelector';
import ObservationSelector from './ObservationSelector';
import { StoryProgressAtom } from '../../../../atoms/uiState';

export default function AgentIndex() {
    const { t } = useTranslation();
    const [storyProgress, setStoryProgress] = useAtom(StoryProgressAtom);
    const selectedAgent = useAtomValue(ActiveAgentAtom);
    const store = useStore();

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                agent: {
                    ...old.agent,
                    opened: true,
                },
            };
        });
        if (selectedAgent.img) {
            setStoryProgress((old) => {
                return {
                    ...old,
                    agent: { ...old.agent, img: true },
                };
            });
        }

        return () => {
            const progress = store.get(StoryProgressAtom);
            if (!progress.agent.closed && progress.agent.obsShape) {
                setStoryProgress((old) => {
                    return {
                        ...old,
                        agent: {
                            ...old.agent,
                            closed: true,
                        },
                    };
                });
            }
        };
    }, [selectedAgent, setStoryProgress, store]);

    return (
        <div className={style.selector}>
            <div className={style.selectorContainer}>
                <h1>{t('createMenu.agent.title')}</h1>
                <em>{t('createMenu.agent.titleDesc')}</em>

                <Separator />
                <AgentSelector />
                {storyProgress.agent.img && (
                    <>
                        <Separator />
                        <ObservationSelector />
                    </>
                )}
                <Separator />
            </div>
        </div>
    );
}
