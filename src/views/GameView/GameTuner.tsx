import style from './style.module.css';
import { Button } from '@genai-fi/base';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { ActiveEnvironmentAtom, EnvSettingsAtom, ResetUiPulseAtom, TempSettingsAtom } from '../../atoms/state';
import AgentControl from '../Controls/AgentControl';
import EnvironmentControl from '../Controls/GameSettingsControl';
import ObservationControl from '../Controls/ObservationControl';
import RewardControlContainer from '../Controls/RewardControlContainer';

function GameTuner() {
    const store = useStore();
    const { t } = useTranslation();
    const [tabNumber, setTabNumber] = useState(0);
    const tempSettings = useAtomValue(TempSettingsAtom);
    const setEnvSettings = useSetAtom(EnvSettingsAtom);
    const setResetUIpulse = useSetAtom(ResetUiPulseAtom);

    const resetUI = (reset: boolean) => {
        const game = store.get(ActiveEnvironmentAtom);

        switch (game.type) {
            case 'potsAndBurglar': {
                setEnvSettings((old) => ({
                    ...old,
                    potsAndBurglar: {
                        env: {
                            gridSize: tempSettings.potsAndBurglar.env.gridSize ?? 10,
                            maxTurns: tempSettings.potsAndBurglar.env.maxTurns ?? 20,
                            numberOfPots: tempSettings.potsAndBurglar.env.numberOfPots ?? 10,
                            potReloadDelay: tempSettings.potsAndBurglar.env.potReloadDelay ?? 25,
                            breakPotSpooksBurglar: tempSettings.potsAndBurglar.env.breakPotSpooksBurglar ?? true,
                        },
                        reward: {
                            spookedBurglarReward: tempSettings.potsAndBurglar.reward.spookedBurglarReward ?? 10,
                            brokePotReward: tempSettings.potsAndBurglar.reward.brokePotReward ?? -2,
                            barkSuccessReward: tempSettings.potsAndBurglar.reward.barkSuccessReward ?? 10,
                            barkFailReward: tempSettings.potsAndBurglar.reward.barkFailReward ?? -1,
                            burglarWonReward: tempSettings.potsAndBurglar.reward.burglarWonReward ?? -10,
                        },
                    },
                }));
                break;
            }
            default:
                break;
        }
        if (reset)
            setResetUIpulse((old) => {
                return !old;
            });
    };

    return (
        <div className={style.tuneContainer}>
            <div className={style.tuneContent}>
                <h1>Manipulate menu</h1>
                <Tabs
                    value={tabNumber}
                    onChange={(_, value) => setTabNumber(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                    orientation="horizontal"
                    sx={{ borderRight: '1px solid #008297', borderLeft: '1px solid #008297' }}
                >
                    <Tab label={t('Agent')} />
                    <Tab label={t('Reward')} />
                    <Tab label={t('Environment')} />
                    <Tab label={t('Observation')} />
                </Tabs>
                {tabNumber === 0 && <AgentControl />}
                {tabNumber === 1 && <RewardControlContainer />}
                {tabNumber === 2 && <EnvironmentControl />}
                {tabNumber === 3 && <ObservationControl />}
                <Button
                    variant="contained"
                    onClick={() => resetUI(false)}
                    sx={{ marginTop: '1rem' }}
                >
                    Update
                </Button>
                <Button
                    variant="contained"
                    onClick={() => resetUI(true)}
                    sx={{ marginTop: '1rem' }}
                >
                    Restart learning
                </Button>
            </div>
        </div>
    );
}

export default GameTuner;
