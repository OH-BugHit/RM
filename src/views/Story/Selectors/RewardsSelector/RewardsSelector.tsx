import { useAtomValue, useSetAtom } from 'jotai';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { StoryProgressAtom, TilePropsAtom } from '../../../../atoms/uiState';
import PropRewardItem from './PropRewardItem';
import { CellType, TileDefinition } from '../../../../types';
import { useEffect } from 'react';
import TimeStepReward from './TimeStepReward';
import TimeUpReward from './TimeUpReward';
import Separator from '../../../../components/Separator/Separator';

export default function RewardsSelector() {
    const { t } = useTranslation('', { keyPrefix: 'createMenu.rewards' });
    const setStoryProgress = useSetAtom(StoryProgressAtom);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                rewards: {
                    ...old.rewards,
                    opened: true,
                },
            };
        });
    }, [setStoryProgress]);
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
            <h1>{t('title')}</h1>
            <em>{t('titleDesc')}</em>
            <Separator />
            <div className={style.rowContainer}>
                <h3>{t('general')}</h3>
                <TimeStepReward />
                <TimeUpReward />
                <Separator />
                <h3>{t('objects')}</h3>
                {groups.map((tiles) => (
                    <PropRewardItem
                        key={tiles[0].type}
                        tiles={tiles}
                    />
                ))}
            </div>
            <Separator />
        </div>
    );
}
