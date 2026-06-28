import style from './style.module.css';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AgentIndex from '../Story/Selectors/AgentSelector/AgentIndex';
import { useAtomValue } from 'jotai';
import { StoryProgressAtom } from '../../atoms/uiState';
import EnvironmentOptions from '../Story/Selectors/EnvironmentSelector/EnvironmentOptions';
import RewardsSelector from '../Story/Selectors/RewardsSelector/RewardsSelector';
import GameSettings from '../Story/Selectors/GameSettings/GameSettings';

function CreateMenu() {
    const { t } = useTranslation();
    const [tabNumber, setTabNumber] = useState(0);
    const storyProgress = useAtomValue(StoryProgressAtom);

    return (
        <div className={style.tuneContainer}>
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
                        disabled={!storyProgress.environment.name}
                    />
                    <Tab label={t('gameSettings')} />
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
