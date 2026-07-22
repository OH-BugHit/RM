import style from '../style.module.css';
import Separator from '../../../../components/Separator/Separator';
import ImportDialog from '../../../../components/ImportDialog/ImportDialog';
import { useEffect, useState } from 'react';
import { preprocessImage } from '../../../../utils/import';
import { CellType, TileDefinition } from '../../../../types';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveViewAtom, StoryProgressAtom, TilePropsAtom } from '../../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import PropRow from './Prop/PropRow';
import { InnerFillCellAtom, WorldGridRenderAtom } from '../../../../atoms/gameState';
import { useTranslation } from 'react-i18next';

export default function PropSelector() {
    const { t } = useTranslation('', { keyPrefix: 'createMenu.design' });
    const setActiveView = useSetAtom(ActiveViewAtom);
    const [storyProgress, setStoryProgress] = useAtom(StoryProgressAtom);
    const [tiles, setTiles] = useAtom<TileDefinition[]>(TilePropsAtom);
    const [activeTile, setActiveTile] = useState<TileDefinition | null>(null);
    const setWorldGrid = useSetAtom(WorldGridRenderAtom);
    const setInnerFill = useSetAtom(InnerFillCellAtom);

    const lockedTiles = tiles.filter((t) => t.isCoreTile);
    const libraryTiles = tiles.filter((t) => !t.isCoreTile);

    useEffect(() => {
        setInnerFill(lockedTiles[1]);
    }, [lockedTiles, setInnerFill]);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                design: {
                    ...old.design,
                    opened: true,
                },
            };
        });
    }, [setStoryProgress]);

    const openImport = (tile: TileDefinition) => {
        setActiveTile(tile);
        setActiveView((old) => ({ ...old, overlay: 'import' }));
    };

    const addTile = () => {
        setTiles((old) => [
            ...old,
            {
                id: crypto.randomUUID(),
                type: CellType.Empty,
                image: '',
                isCoreTile: false,
                reloadTime: -1,
                timer: 0,
                reward: 0,
            },
        ]);
    };

    return (
        <div className={style.selectorContainer}>
            <h1>{t('title')}</h1>
            <em>{t('titleDesc')}</em>
            <Separator />
            <ImportDialog
                type="tile"
                preprocess={preprocessImage}
                onSelect={(image) => {
                    if (!activeTile) return;

                    setTiles((old) => old.map((t) => (t.id === activeTile.id ? { ...t, image } : t)));

                    if (activeTile.isCoreTile) {
                        switch (activeTile.type) {
                            case CellType.Trigger: {
                                if (image) {
                                    setStoryProgress((old) => {
                                        return {
                                            ...old,
                                            design: {
                                                ...old.design,
                                                goal: true,
                                                props: true,
                                            },
                                        };
                                    });
                                }
                                break;
                            }
                            case CellType.Solid: {
                                if (image) {
                                    setStoryProgress((old) => {
                                        return {
                                            ...old,
                                            design: {
                                                ...old.design,
                                                solid: true,
                                            },
                                        };
                                    });
                                    setWorldGrid((old) => {
                                        if (!old) return old;

                                        return old.map((row) =>
                                            row.map((cell) =>
                                                cell.type === CellType.Solid ? { ...cell, image: image } : cell
                                            )
                                        );
                                    });
                                }
                                break;
                            }

                            case CellType.Spawn: {
                                if (image) {
                                    setStoryProgress((old) => {
                                        return {
                                            ...old,
                                            design: {
                                                ...old.design,
                                                spawn: true,
                                            },
                                        };
                                    });

                                    setWorldGrid((old) => {
                                        if (!old) return old;

                                        return old.map((row) =>
                                            row.map((cell) =>
                                                cell.type === CellType.Spawn ? { ...cell, image: image } : cell
                                            )
                                        );
                                    });
                                    break;
                                }
                            }
                        }
                        //TODO: For-loopissa laita pohjaan jotta ei muokka muita spawneja tai solideja!
                    }
                }}
            />
            <div className={style.toolWrapper}>
                <div className={style.textSection}>
                    <h3>{t('makeWorkTitle')}</h3>
                    <em>{t('makeWorkTitleDesc')}</em>
                </div>
                <p>{t('solid')}</p>
                <PropRow
                    tile={lockedTiles[0]}
                    openImport={openImport}
                    setTiles={setTiles}
                />
                {storyProgress.design.solid && (
                    <>
                        <p>{t('solid')}</p>
                        <PropRow
                            tile={lockedTiles[1]}
                            openImport={openImport}
                            setTiles={setTiles}
                        />
                    </>
                )}
                {storyProgress.design.spawn && (
                    <>
                        <p>{t('goal')}</p>
                        <PropRow
                            tile={lockedTiles[2]}
                            openImport={openImport}
                            setTiles={setTiles}
                        />
                    </>
                )}
                <Separator />
                {storyProgress.design.spawn && (
                    <>
                        <h3>{t('makeBeautifullTitle')}</h3>

                        <p>{t('makeBeautifullTitleDesc')}</p>
                        {libraryTiles.map((tile) => (
                            <PropRow
                                key={tile.id}
                                tile={tile}
                                openImport={openImport}
                                setTiles={setTiles}
                            />
                        ))}
                        <Button
                            variant="outlined"
                            onClick={() => addTile()}
                            className={style.row}
                        >
                            {t('createNew')}
                        </Button>
                        <p>{t('ps')}</p>
                        <Separator />
                    </>
                )}
            </div>
        </div>
    );
}
