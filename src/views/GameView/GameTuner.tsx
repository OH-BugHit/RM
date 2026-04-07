import { Button } from '@genai-fi/base';
import EnvironmentControl from '../RobodogTest/Controls/GameSettingsControl';
import RewardControl from '../RobodogTest/Controls/RewardControl';
import AgentControl from '../RobodogTest/Controls/AgentControl';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import {
    ActiveGameAtom,
    AgentSettingsAtom,
    EnvSettingsAtom,
    ResetUiPulseAtom,
    RewardSettingsAtom,
    TempSettingsAtom,
} from '../../atoms/state';

function GameTuner() {
    const store = useStore();
    const { t } = useTranslation();
    const [tabNumber, setTabNumber] = useState(0);
    const tempSettings = useAtomValue(TempSettingsAtom);
    const setAgentSettings = useSetAtom(AgentSettingsAtom);
    const setEnvSettings = useSetAtom(EnvSettingsAtom);
    const setRewards = useSetAtom(RewardSettingsAtom);
    const setResetUIpulse = useSetAtom(ResetUiPulseAtom);

    const resetUI = () => {
        const game = store.get(ActiveGameAtom);

        switch (game) {
            case 'robodog': {
                setAgentSettings({
                    epsilon: tempSettings[game].agent.epsilon,
                    gamma: tempSettings[game].agent.gamma,
                    alpha: tempSettings[game].agent.alpha,
                });
                setEnvSettings({
                    settings: {
                        gridSize: tempSettings[game].env.settings?.gridSize ?? 10,
                        maxTurns: tempSettings[game].env.settings?.maxTurns ?? 20,
                        numberOfPots: tempSettings[game].env.settings?.numberOfPots ?? 10,
                        potReloadDelay: tempSettings[game].env.settings?.potReloadDelay ?? 25,
                        breakPotSpooksBurglar: tempSettings[game].env.settings?.breakPotSpooksBurglar ?? true,
                    },
                });
                setRewards({
                    settings: {
                        spookedBurglarReward: tempSettings[game].reward.settings?.spookedBurglarReward ?? 10,
                        brokePotReward: tempSettings[game].reward.settings?.brokePotReward ?? -2,
                        barkSuccessReward: tempSettings[game].reward.settings?.barkSuccessReward ?? 10,
                        barkFailReward: tempSettings[game].reward.settings?.barkFailReward ?? -1,
                        burglarWonReward: tempSettings[game].reward.settings?.burglarWonReward ?? -10,
                    },
                });
                break;
            }
            default:
                break;
        }
        setResetUIpulse((old) => {
            return !old;
        });
    };

    return (
        <div>
            <Tabs
                value={tabNumber}
                onChange={(_, value) => setTabNumber(value)}
                variant="scrollable"
                scrollButtons="auto"
                orientation="horizontal"
                sx={{ borderRight: '1px solid #008297' }}
            >
                <Tab label={t('Agent')} />
                <Tab label={t('Reward')} />
                <Tab label={t('Environment')} />
            </Tabs>
            {tabNumber === 0 && <AgentControl />}
            {tabNumber === 1 && <RewardControl />}
            {tabNumber === 2 && <EnvironmentControl />}
            <Button
                variant="contained"
                onClick={resetUI}
            >
                Restart learning
            </Button>
            ;
        </div>
    );
}

export default GameTuner;
