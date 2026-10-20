import style from './agentSelector.module.css';
import SelectorItem from '../SelectorItem';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveAgentAtom, ImportedAgentImgAtom } from '../../../../atoms/state';
import { ActiveViewAtom, StoryProgressAtom } from '../../../../atoms/uiState';

import { defaultAgents } from '../../../../utils/defaults';
import { useTranslation } from 'react-i18next';
import ImportDialog from '../../../../components/Dialogs/ImportDialog';
import { preprocessImageWScale } from '../../../../utils/import';
import { useEffect } from 'react';

export default function AgentSelector() {
    const { t } = useTranslation('', { keyPrefix: 'createMenu.agent' });
    const setActiveAgent = useSetAtom(ActiveAgentAtom);
    const setActiveView = useSetAtom(ActiveViewAtom);
    const [selectedAgent, setSelectedAgent] = useAtom(ActiveAgentAtom);
    const [importedImg, setImportedImg] = useAtom(ImportedAgentImgAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);

    useEffect(() => {
        if (selectedAgent.img) {
            setStoryProgress((old) => {
                return {
                    ...old,
                    agent: { ...old.agent, img: true },
                };
            });
        }
    }, [setStoryProgress, selectedAgent]);

    return (
        <div className={style.selectorContainer}>
            <ImportDialog
                preprocess={preprocessImageWScale}
                onSelect={(image) => {
                    setActiveAgent((old) => ({
                        ...old,
                        type: 'created',
                        img: image,
                    }));
                    setImportedImg(image);
                }}
            />
            <div className={style.title}>
                <h2>{t('imgTitle')}</h2>
            </div>
            <ul className={style.selectorItemContainer}>
                <SelectorItem
                    title="Robo-Dog"
                    img={defaultAgents.robodog.img}
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                img: defaultAgents.robodog.img,
                                type: 'robodog',
                            };
                        });
                        setActiveAgent((old) => {
                            return {
                                ...old,
                                type: 'robodog',
                                img: defaultAgents.robodog.img,
                                name: selectedAgent.name,
                            };
                        });
                    }}
                    selected={selectedAgent.type === 'robodog'}
                />
                <SelectorItem
                    title="Robo-Hoover"
                    img={defaultAgents.roboHoover.img}
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                img: defaultAgents.roboHoover.img,
                                type: 'hoover',
                            };
                        });
                        setActiveAgent((old) => {
                            return {
                                ...old,
                                type: 'hoover',
                                img: defaultAgents.roboHoover.img,
                                name: selectedAgent.name,
                            };
                        });
                    }}
                    selected={selectedAgent.type === 'hoover'}
                />
                <SelectorItem
                    title="Robo-Mover"
                    img={defaultAgents.roboMover.img}
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                img: defaultAgents.roboMover.img,
                                type: 'mover',
                            };
                        });
                        setActiveAgent((old) => {
                            return {
                                ...old,
                                type: 'mover',
                                img: defaultAgents.roboMover.img,
                                name: selectedAgent.name,
                            };
                        });
                    }}
                    selected={selectedAgent.type === 'mover'}
                />
                <SelectorItem
                    title="Adventurer"
                    img={defaultAgents.adventurer.img}
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                img: defaultAgents.adventurer.img,
                                type: 'adventurer',
                            };
                        });
                        setActiveAgent((old) => {
                            return {
                                ...old,
                                type: 'adventurer',
                                img: defaultAgents.adventurer.img,
                                name: selectedAgent.name,
                            };
                        });
                    }}
                    selected={selectedAgent.type === 'adventurer'}
                />
                <SelectorItem
                    title="Use own image"
                    img={importedImg ?? defaultAgents.created.img}
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                type: 'created',
                                name: selectedAgent.name,
                            };
                        });
                        setActiveView((old) => {
                            return { ...old, overlay: 'import' };
                        });
                    }}
                    selected={selectedAgent.type === 'created'}
                />
            </ul>
        </div>
    );
}
