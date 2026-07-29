import style from './style.module.css';
import { useAtom, useAtomValue, useSetAtom, useStore } from 'jotai';
import {
    CurrentTileToolAtom,
    DesignOpenAtom,
    HideHudAtom,
    StoryProgressAtom,
    TilePropsAtom,
    UiHelpAtom,
} from '../../../../atoms/uiState';
import CreateTile from '../../../../components/SidePanel/SidePanelButtons/CreateTile';
import SideButtonMenu from '../../../../components/SidePanel/SidePanelButtons/SideButtonMenu';
import PropToolIcon from '../EnvironmentSelector/Prop/PropTool/PropToolIcon';
import { useEffect } from 'react';

export default function DesignMenu() {
    const tiles = useAtomValue(TilePropsAtom);
    const [selectedTool, setSelectedTool] = useAtom(CurrentTileToolAtom);
    const setDesignOpen = useSetAtom(DesignOpenAtom);
    const setHideHud = useSetAtom(HideHudAtom);
    const setProgress = useSetAtom(StoryProgressAtom);
    const store = useStore();

    const setUiHelp = useSetAtom(UiHelpAtom);

    useEffect(() => {
        setUiHelp((old) => {
            return {
                ...old,
                designMenu: false,
            };
        });
        setDesignOpen(true);
        setHideHud(true);

        return () => {
            const progress = store.get(StoryProgressAtom);
            if (!progress.design.closed && progress.design.goal) {
                setProgress((old) => {
                    return {
                        ...old,
                        design: {
                            ...old.design,
                            closed: true,
                        },
                    };
                });
            }
            if (!progress.environment.closed && progress.environment.goalSet) {
                setProgress((old) => {
                    return {
                        ...old,
                        environment: {
                            ...old.environment,
                            closed: true,
                        },
                    };
                });
            }
            setSelectedTool(undefined);
            setDesignOpen(false);
            setHideHud(false);
        };
    }, [setProgress, store, setDesignOpen, setHideHud, setSelectedTool, setUiHelp]);

    return (
        <>
            <div className={style.design}>
                <CreateTile />

                <SideButtonMenu
                    open={true}
                    position="design"
                >
                    {tiles.map((tile) => (
                        <PropToolIcon
                            key={tile.id}
                            tile={tile}
                            selected={tile === selectedTool}
                            disabled={false}
                        />
                    ))}
                </SideButtonMenu>
            </div>
        </>
    );
}
