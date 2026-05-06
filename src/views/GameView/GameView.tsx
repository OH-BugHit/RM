import { useEffect, useRef } from 'react';
import PotsAndBurglarGame from '../Environments/PotsAndBurglar/PotsAndBurglarGame';
import style from './style.module.css';
import { RLGridEnv } from '../Environments/PotsAndBurglar/environment';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, DogInfo, BurglarGameObservation } from '../../types';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { ActiveGameAtom, agentAtom, EnvSettingsAtom, RewardSettingsAtom, TempSettingsAtom } from '../../atoms/state';
import GameTuner from './GameTuner';
import Controls from '../Controls/Controls';

// React component
function GameView() {
    const store = useStore();
    const game = store.get(ActiveGameAtom);
    const setEnvSettings = useSetAtom(EnvSettingsAtom);
    const setRewardSettings = useSetAtom(RewardSettingsAtom);

    const agent = useAtomValue(agentAtom);

    const envRef = useRef<RLGridEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<BurglarGameObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<DogInfo>(undefined);

    useEffect(() => {
        const tempSettings = store.get(TempSettingsAtom);
        setRewardSettings({
            settings: tempSettings[game].reward.settings,
        });
        setEnvSettings({
            settings: tempSettings[game].env.settings,
        });
    }, [game, setRewardSettings, setEnvSettings, store]);

    //TODO: Set settings when game is selected now they are here:

    switch (game) {
        case 'robodog': {
            return (
                <div className={style.container}>
                    <div className={style.containerBox}>
                        <div className={style.game}>
                            <PotsAndBurglarGame
                                envRef={envRef}
                                agentRef={agentRef}
                                obsRef={obsRef}
                                actionRef={actionRef}
                                qvalueRef={qvalueRef}
                                infoRef={infoRef}
                                agent={agent}
                            />
                            <Controls />
                        </div>
                    </div>
                    <div className={style.containerBox}>
                        <GameTuner />
                    </div>
                </div>
            );
        }

        default: {
            return null;
        }
    }
}

export default GameView;
