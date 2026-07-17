import style from './style.module.css';
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
    const { t } = useTranslation();
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
            <h1>{t('story.design.title')}</h1>
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
                                            environment: {
                                                ...old.environment,
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
                                            environment: {
                                                ...old.environment,
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
                                            environment: {
                                                ...old.environment,
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
                    <p>
                        Environment is the playground of the agent where it acts, receives rewards and learns. Here you
                        design the world for your agent!
                    </p>
                    <h3>Design your environment!</h3>

                    <p>
                        Here you select what your world looks like. You can select from premade props and emojis or
                        import your own images.
                    </p>
                    <p>
                        The agent must be always contained inside of wall-elements in this game. First, select one solid
                        prop to form that boundary.
                    </p>
                </div>
                <PropRow
                    tile={lockedTiles[0]}
                    openImport={openImport}
                    setTiles={setTiles}
                />
                {storyProgress.environment.solid && (
                    <>
                        <p>Now select image for spawn area (start location)</p>
                        <PropRow
                            tile={lockedTiles[1]}
                            openImport={openImport}
                            setTiles={setTiles}
                        />
                    </>
                )}
                {storyProgress.environment.spawn && (
                    <>
                        <p>Select episode ending prop (something smarter here about goal or task of the agent)</p>
                        <PropRow
                            tile={lockedTiles[2]}
                            openImport={openImport}
                            setTiles={setTiles}
                        />
                    </>
                )}
                <Separator />
                {storyProgress.environment.spawn && (
                    <>
                        <h3>More props</h3>

                        <p>
                            Your environment has everything needed for full episode or reinforcement learning: Starting
                            place and ending condition. Also you have those outer walls that are needed in this
                            particular game.
                        </p>
                        <p>
                            You can make your world more interesting by adding additional props. Maybe consider adding
                            few "treasures", "big treasures" and "traps", that will give different rewards for the agent
                            when reached.
                        </p>
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
                            Create new prop
                        </Button>
                        <p>
                            You can alter all selections throughtout the whole game so feel free to come back here
                            later.
                        </p>
                        <Separator />
                    </>
                )}
            </div>
        </div>
    );
}
