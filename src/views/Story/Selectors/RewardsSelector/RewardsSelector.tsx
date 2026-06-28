import { useAtomValue, useSetAtom } from 'jotai';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { StoryProgressAtom, TilePropsAtom } from '../../../../atoms/uiState';
import PropRewardItem from './PropRewardItem';
import { CellType, TileDefinition } from '../../../../types';
import { useEffect } from 'react';
import TimeStepReward from './TimeStepReward';
import TimeUpReward from './TimeUpReward';

export default function RewardsSelector() {
    const setStoryProgress = useSetAtom(StoryProgressAtom);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                rewards: true,
            };
        });
    }, [setStoryProgress]);

    const { t } = useTranslation();
    const tiles = useAtomValue(TilePropsAtom);
    const groups = Object.values(
        tiles.reduce(
            (acc, tile) => {
                if (tile.type === CellType.Solid || tile.type === CellType.Empty || tile.type === CellType.Spawn) {
                    return acc;
                }

                (acc[tile.type] ??= []).push(tile);
                return acc;
            },
            {} as Record<CellType, TileDefinition[]>
        )
    );

    return (
        <div className={style.selectorContainer}>
            <h1>{t('story.rewards.title')}</h1>
            <p>Now you need do define reward function</p>
            <p>That means that you select what reward is given for agent in each state</p>
            <h3>Your states:</h3>
            <div className={style.rowContainer}>
                <TimeStepReward />
                <TimeUpReward />
                {groups.map((tiles) => (
                    <PropRewardItem
                        key={tiles[0].type}
                        tiles={tiles}
                    />
                ))}
            </div>
        </div>
    );
}
