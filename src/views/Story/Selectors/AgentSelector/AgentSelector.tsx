import style from '../style.module.css';
import SelectorItem from '../SelectorItem';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ActiveAgentAtom, ImportedAgentImgAtom } from '../../../../atoms/state';
import { ActiveViewAtom } from '../../../../atoms/uiState';

import { defaultAgents } from '../../../../utils/defaults';

export default function AgentSelector() {
    const setActiveAgent = useSetAtom(ActiveAgentAtom);
    const setActiveView = useSetAtom(ActiveViewAtom);
    const [selectedAgent, setSelectedAgent] = useAtom(ActiveAgentAtom);
    const importedImg = useAtomValue(ImportedAgentImgAtom);

    return (
        <div className={style.selectorContainer}>
            <div className={style.textSection}>
                <h3>Select your agent</h3>
                <p>Select what your agent looks like.</p>
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
