import style from './style.module.css';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AgentIndex from '../Story/Selectors/AgentSelector/AgentIndex';
import { useAtomValue } from 'jotai';
import { StoryProgressAtom, UiHelpAtom } from '../../atoms/uiState';
import EnvironmentOptions from '../Story/Selectors/EnvironmentSelector/EnvironmentOptions';
import RewardsSelector from '../Story/Selectors/RewardsSelector/RewardsSelector';
import GameSettings from '../Story/Selectors/GameSettings/GameSettings';
import Arrow from '../../components/HelperArrow/Arrow';

function CreateMenu() {
    const { t } = useTranslation();
    const [tabNumber, setTabNumber] = useState(0);
    const storyProgress = useAtomValue(StoryProgressAtom);
    const uiHelp = useAtomValue(UiHelpAtom);

    return (
        <div className={style.tuneContainer}>
            {uiHelp.creativeClose && (
                <Arrow
                    right={28}
                    top={25}
                    radius={70}
                    angle={170}
                />
            )}
            <div className={style.tuneContent}>
                <h1>Creative menu</h1>
                <Tabs
                    value={tabNumber}
                    onChange={(_, value) => setTabNumber(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                    orientation="horizontal"
                    sx={{ borderRight: '1px solid #008297', borderLeft: '1px solid #008297' }}
                >
                    <Tab label={t('Agent')} />
                    <Tab
                        label={t('Environment')}
                        disabled={
                            !storyProgress.agent.img || !storyProgress.agent.name || !storyProgress.agent.obsShape
                        }
                    />

                    <Tab
                        label={t('Reward')}
                        disabled={!storyProgress.environment.goalSet}
                    />
                    <Tab
                        label={t('gameSettings')}
                        disabled={!storyProgress.rewards}
                    />
                </Tabs>
                {tabNumber === 0 && <AgentIndex />}
                {tabNumber === 1 && <EnvironmentOptions />}
                {tabNumber === 2 && <RewardsSelector />}
                {tabNumber === 3 && <GameSettings />}
            </div>
        </div>
    );
}

export default CreateMenu;
