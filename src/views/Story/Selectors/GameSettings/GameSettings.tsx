import { useAtomValue, useSetAtom } from 'jotai';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { StoryProgressAtom, TilePropsAtom } from '../../../../atoms/uiState';
import { CellType, TileDefinition } from '../../../../types';
import { useEffect } from 'react';
import SettingsItem from './SettingsItem';

export default function GameSettings() {
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
            <h1>{t('story.settings.title')}</h1>
            <p>Lastly, you can tune some settings for your game.</p>
            <p>You can select now how long the treasures that are picked are.. POIS? </p>
            <h3>Your states OTETAAN POIS?:</h3>
            <div className={style.rowContainer}>
                {groups.map((tiles) => (
                    <SettingsItem
                        key={tiles[0].type}
                        tiles={tiles}
                    />
                ))}
            </div>
        </div>
    );
}
