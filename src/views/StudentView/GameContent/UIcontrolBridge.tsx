import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { buildHudVisibility, buildUiConf } from '../../Xai/GameTutorial/progressUtil';
import {
    AgentCAtom,
    BuildCAtom,
    ClusterOpenAtom,
    HUDvisAtom,
    InspectCAtom,
    RewardCAtom,
    TextStepAtom,
} from '../../../atoms/uiState';
import { playHudVis } from '../../../utils/defaults';
import { GameControlAtom } from '../../../atoms/state';
import { Level } from '../../../types';

export default function UIcontrolBridge({ level }: { level: Level }) {
    const setHudVis = useSetAtom(HUDvisAtom);
    const step = useAtomValue(TextStepAtom);
    const setAgentC = useSetAtom(AgentCAtom);
    const setInspectC = useSetAtom(InspectCAtom);
    const setBuildC = useSetAtom(BuildCAtom);
    const setRewardC = useSetAtom(RewardCAtom);
    const setClusters = useSetAtom(ClusterOpenAtom);
    const setGameState = useSetAtom(GameControlAtom);

    useEffect(() => {
        const hudConf = level?.hudSettings;
        if (step === 1 && hudConf?.some((group) => group.includes('options.autoPlay'))) {
            setGameState((old) => {
                return {
                    ...old,
                    isRunning: true,
                };
            });
        }

        if (hudConf?.length) {
            const currentStep = Math.min(step, hudConf.length - 1);

            const fields = hudConf.slice(0, currentStep + 1).flat();
            setHudVis(buildHudVisibility(fields));
        } else {
            setHudVis(playHudVis);
        }
    }, [step, setHudVis, setGameState, level]);

    useEffect(() => {
        const UiConf = level?.uiControls;

        if (UiConf?.length) {
            if (step < UiConf.length) {
                const fields = UiConf[step];
                if (fields.length > 0) {
                    const uiOptions = buildUiConf(fields);

                    setAgentC(uiOptions.agentC);
                    setBuildC(uiOptions.buildC);
                    setInspectC(uiOptions.inspectC);
                    setRewardC(uiOptions.rewardC);

                    setClusters({
                        agent: uiOptions.agent,
                        build: uiOptions.build,
                        inspect: uiOptions.inspect,
                        reward: uiOptions.reward,
                    });
                }
            }
        }
    }, [setAgentC, setBuildC, setInspectC, setRewardC, setClusters, level, step]);

    return null;
}
