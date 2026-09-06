import { useAtomValue, useSetAtom, useStore } from 'jotai';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { StoryProgressAtom, TilePropsAtom } from '../../../../atoms/uiState';
import PropRewardItem from './PropRewardItem';
import { CellType, TileDefinition } from '../../../../types';
import { useEffect } from 'react';
import { useGameScale } from '../../../../context/GameScale/useGameScale';

export default function RewardsSelector() {
    const { t } = useTranslation('', { keyPrefix: 'createMenu.rewards' });
    const { s } = useGameScale();
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const tiles = useAtomValue(TilePropsAtom);
    const store = useStore();

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
    }, [setStoryProgress, store]);
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
        <div
            className={style.selectorContainer}
            style={{ gap: `${s(1.2)}rem` }}
        >
            <h3>{t('title')}</h3>
            <div
                className={style.columnContent}
                style={{ gap: `${s(1.2)}rem` }}
            >
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
