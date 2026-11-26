import style from './gameContent.module.css';
import { useSetAtom } from 'jotai';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { WorldStore } from '../../../components/QTable/utils';
import { Actions, GameEnvironmentInfo, GenericObservation, Level, StateData } from '../../../types';
import RewardMachine from '../../Environments/RewardMachine/RewardMachine';
import { useState } from 'react';
import { TextStepAtom } from '../../../atoms/uiState';
import { fromSavedCell } from '../../../utils/import';
import LevelChangeOverlay from '../WaitOverlay/LevelChangeOverlay';

import GameProgressBridge from './GameProgressBridge';
import UIcontrolBridge from './UIcontrolBridge';
import { ActiveAgentAtom } from '../../../atoms/state';

interface GameContentProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    obsRef: React.RefObject<GenericObservation | undefined>;
    actionRef: React.RefObject<Actions | undefined>;
    qvalueRef: React.RefObject<number[]>;
    infoRef: React.RefObject<GameEnvironmentInfo | undefined>;
    lWorld: WorldStore;
    currentStateRef: React.RefObject<StateData>;
    levelIDref: React.RefObject<string>;
    level: Level;
}

type Mode = 'ready' | 'loaded';
export default function GameContent({
    agentRef,
    obsRef,
    actionRef,
    qvalueRef,
    infoRef,
    lWorld,
    currentStateRef,
    levelIDref,
    level,
}: GameContentProps) {
    const setStep = useSetAtom(TextStepAtom);

    const setActiveAgent = useSetAtom(ActiveAgentAtom);
    const [mode, setMode] = useState<Mode>('loaded'); // Waiting for level;

    const startLevel = () => {
        setStep(1);
        if (level) {
            setActiveAgent(level.level.agent.activeAgent);
            setMode('ready');
        } else {
            console.warn('No level selected to start!');
        }
    };

    if (mode !== 'ready')
        return (
            <div className={style.waitContainer}>
                <UIcontrolBridge level={level} />
                <LevelChangeOverlay
                    onReady={startLevel}
                    level={level}
                />
            </div>
        );

    if (mode === 'ready' && level !== undefined) {
        return (
            <>
                <UIcontrolBridge level={level} />
                <GameProgressBridge />
                <RewardMachine
                    levelIDref={levelIDref}
                    agentRef={agentRef}
                    obsRef={obsRef}
                    actionRef={actionRef}
                    qvalueRef={qvalueRef}
                    infoRef={infoRef}
                    lWorld={lWorld}
                    currentStateRef={currentStateRef}
                    grid={level.level.game.world.map((row) => row.map(fromSavedCell))}
                />
            </>
        );
    }
}
