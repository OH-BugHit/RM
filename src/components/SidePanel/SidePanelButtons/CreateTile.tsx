import style from '../style.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import AddIcon from '@mui/icons-material/Add';
import {
    ActiveViewAtom,
    CurrentTileToolAtom,
    StoryProgressAtom,
    TilePropsAtom,
    UiHelpAtom,
} from '../../../atoms/uiState';
import { SidePanelButton } from './SidePanelButton';
import { CellType, TileDefinition } from '../../../types';
import { InnerFillCellAtom, WorldGridRenderAtom } from '../../../atoms/gameState';
import { useEffect } from 'react';
import TileDialog from '../../ImportDialog/TileDialog';

export default function CreateTile() {
    const setActiveView = useSetAtom(ActiveViewAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const [tiles, setTiles] = useAtom<TileDefinition[]>(TilePropsAtom);
    const setWorldGrid = useSetAtom(WorldGridRenderAtom);
    const setInnerFill = useSetAtom(InnerFillCellAtom);
    const uiHelp = useAtomValue(UiHelpAtom);
    const setSelectedTool = useSetAtom(CurrentTileToolAtom);

    const iconStyle = {
        width: '3rem',
        height: '3rem',
        padding: '0.5rem',
    };

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

    const openImport = () => {
        setSelectedTool(undefined);
        setActiveView((old) => ({ ...old, overlay: 'import' }));
    };

    return (
        <>
            <TileDialog
                onSelect={(tile: TileDefinition, newTile: boolean) => {
                    if (!tile) return;

                    if (tiles.length < 3) tile.isCoreTile = true;

                    if (tile.isCoreTile) {
                        switch (tile.type) {
                            case CellType.Trigger: {
                                if (tile.image) {
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
                                if (tile.image) {
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
                                        // Update all borders to new style
                                        if (!old) return old;

                                        return old.map((row) =>
                                            row.map((cell) =>
                                                cell.type === CellType.Solid ? { ...cell, image: tile.image } : cell
                                            )
                                        );
                                    });
                                }
                                break;
                            }

                            case CellType.Spawn: {
                                // Update the whole spawn area. Might be good this way or not..
                                if (tile.image) {
                                    setStoryProgress((old) => {
                                        return {
                                            ...old,
                                            design: {
                                                ...old.design,
                                                spawn: true,
                                            },
                                        };
                                    });

                                    setInnerFill(tile);
                                    setWorldGrid((old) => {
                                        if (!old) return old;

                                        return old.map((row) =>
                                            row.map((cell) =>
                                                cell.type === CellType.Spawn ? { ...cell, image: tile.image } : cell
                                            )
                                        );
                                    });
                                    break;
                                }
                            }
                        }
                    }
                    if (!newTile) {
                        setTiles((prev) => prev.map((oldTile) => (oldTile.id === tile.id ? { ...tile } : oldTile)));
                        return;
                    }
                    setTiles((old) => [...old, tile]);
                }}
            />

            <SidePanelButton
                key={'newTile'}
                className={style.icon}
                disabled={false}
                value={'newTile'}
                icon={<AddIcon style={iconStyle} />}
                activeHelp={uiHelp.createTile ? 'newTile' : ''}
                onClick={() => openImport()} // TODO: Open dialog for creating tile
            />
        </>
    );
}
