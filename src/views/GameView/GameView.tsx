import { useEffect, useRef } from 'react';
import RoboDogGame from '../RobodogTest/RoboDogGame';
import style from './style.module.css';
import { RLGridEnv } from '../RobodogTest/environment';
import { QLearningAgent } from '../RobodogTest/rlAgentQ';
import { Actions, DogInfo, Observation } from '../../types';
import Controls from '../RobodogTest/Controls/Controls';
import { useSetAtom, useStore } from 'jotai';
import { ActiveGameAtom, EnvSettingsAtom, RewardSettingsAtom, TempSettingsAtom } from '../../atoms/state';
import GameTuner from './GameTuner';

// React component
function GameView() {
    const store = useStore();
    const game = store.get(ActiveGameAtom);
    const setEnvSettings = useSetAtom(EnvSettingsAtom);
    const setRewardSettings = useSetAtom(RewardSettingsAtom);

    const envRef = useRef<RLGridEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<Observation>(undefined);
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
                            <RoboDogGame
                                envRef={envRef}
                                agentRef={agentRef}
                                obsRef={obsRef}
                                actionRef={actionRef}
                                qvalueRef={qvalueRef}
                                infoRef={infoRef}
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
