import style from '../style.module.css';
import SelectorItem from '../SelectorItem';
import EnvironmentControl from '../../../Controls/GameSettingsControl';
import WorldSetter from '../../../Environments/WorldSetter/WorldSetter';
import Separator from '../../../../components/Separator/Separator';
import { useAtom, useAtomValue } from 'jotai';
import { ActiveAgentAtom, ActiveEnvironmentAtom } from '../../../../atoms/state';

export default function EnvironmentSelector() {
    const agent = useAtomValue(ActiveAgentAtom);
    const [selectedEnvironment, setSelectedEnvironment] = useAtom(ActiveEnvironmentAtom);

    return (
        <div className={style.selectorContainer}>
            <div className={style.textSection}>
                <h3>Select you Environment</h3>
                <p>Environment is the playground of the agent. You can use premade playing areas or create your own!</p>
            </div>
            <ul className={style.selectorItemContainer}>
                <SelectorItem
                    title="Pots and Burglar"
                    img="images/environments/potsAndBurglar.png"
                    onClick={() => {
                        console.log('selected  potsAndBurglar');
                        setSelectedEnvironment((old) => {
                            return {
                                ...old,
                                type: 'potsAndBurglar',
                            };
                        });
                    }}
                    selected={selectedEnvironment.type === 'potsAndBurglar'}
                    columnChilds={true}
                    children={
                        <p style={{ maxWidth: '400px' }}>
                            {`In Pots and Burglar, ${agent.name ? agent.name : 'Agents'}'s goal (if rewarded well) is to spook the burglar away while avoiding
                            pots around the floor!`}
                        </p>
                    }
                />
                <SelectorItem
                    title="Treasure Hunter"
                    img="images/agents/adventurer.png"
                    onClick={() => {
                        setSelectedEnvironment((old) => {
                            return {
                                ...old,
                                type: 'treasureHunter',
                            };
                        });
                    }}
                    selected={selectedEnvironment.type === 'treasureHunter'}
                    columnChilds={true}
                    children={
                        <p style={{ maxWidth: '400px' }}>
                            {`In Treasure Hunter, ${agent.name ? agent.name : 'Agents'}'s goal (if rewarded well) is to gather all treasures!`}
                        </p>
                    }
                />
                <SelectorItem
                    title="Create own"
                    img="images/background/backgroundTownPcb.png"
                    onClick={() => {
                        setSelectedEnvironment((old) => {
                            return {
                                ...old,
                                type: 'created',
                            };
                        });
                    }}
                    selected={selectedEnvironment.type === 'created'}
                    columnChilds={true}
                    children={
                        <p style={{ maxWidth: '400px' }}>
                            {`In your own game, you select what the environment looks like and what happens when ${agent.name ? agent.name : 'Agent'} acts.`}
                        </p>
                    }
                />
            </ul>
            <Separator />
            <EnvironmentControl />
            <Separator />
            {selectedEnvironment.type === 'treasureHunter' && <WorldSetter />}
            <Separator />
        </div>
    );
}
