import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
    HUDvisAtom,
    StatsContentAtom,
    StoryProgressAtom,
    StoryStepAtom,
    UiHelpAtom,
    TileVisibilityAtom,
    ControlEnablerAtom,
    ObsViewTypeAtom,
    LodStateAtom,
} from '../../atoms/uiState';
import { useEffect } from 'react';
import { GameControlAtom } from '../../atoms/state';
import { EpisodicDataAtom } from '../../atoms/gameState';

export default function StoryProgress() {
    const [step, setStep] = useAtom(StoryStepAtom);
    const setHud = useSetAtom(HUDvisAtom);
    const setTextContent = useSetAtom(StatsContentAtom);
    const progress = useAtomValue(StoryProgressAtom);
    const setVisibleTiles = useSetAtom(TileVisibilityAtom);
    const setUIHelper = useSetAtom(UiHelpAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const [controlState, setGameState] = useAtom(GameControlAtom);
    const obsViewType = useAtomValue(ObsViewTypeAtom);
    const gameData = useAtomValue(EpisodicDataAtom);
    const setLod = useSetAtom(LodStateAtom);

    useEffect(() => {
        if (step > 26) return;
        if (gameData?.triggered && gameData.triggered > 10) {
            setStep(27);
            return;
        }
        if (progress.hud.agentView.steps && controlState.isRunning) {
            setStep(26);
            return;
        }
        if (step > 23) return;
        if (obsViewType === 'agent') {
            setStep(24);
            return;
        }
        if (progress.hud.agentView.steps) {
            setStep(23);
            return;
        }
        if (step > 20) return;
        if (controlState.isRunning) {
            setStep(21);
            return;
        }
        if (step > 16) return;
        if (progress.settings.closed) {
            setStep(17);
            return;
        }
        if (progress.environment.name) {
            setStep(16);
            return;
        }
        if (progress.settings.opened) {
            setStep(15);
            return;
        }
        if (step > 12) return;
        if (progress.rewards.opened) {
            setStep(13);
            return;
        }
        if (progress.design.closed) {
            setStep(12);
            return;
        }
        if (progress.environment.goalSet) {
            setStep(11);
            return;
        }

        if (progress.design.clickOkay) {
            setStep(10);
            return;
        }

        if (progress.design.goal) {
            setStep(9);
            return;
        }

        if (progress.design.spawn) {
            setStep(8);
            return;
        }

        if (progress.design.solid) {
            setStep(7);
            return;
        }

        if (progress.design.opened) {
            setStep(6);
            return;
        }

        if (progress.agent.closed) {
            setStep(5);
            return;
        }

        if (progress.agent.obsShape) {
            setStep(4); // Step 3 was the agent name and is removed
            return;
        }

        if (progress.agent.img) {
            setStep(2);
            return;
        }
    }, [progress, setStep, step, controlState, obsViewType, gameData]);

    useEffect(() => {
        setTextContent((old) => {
            return { mode: old.mode, phase: step };
        });
        switch (step) {
            case 0: {
                setTextContent({ mode: 'textNext', phase: step });
                setHud((old) => {
                    return { ...old, text: true, progress: true };
                });
                break;
            }
            case 1: {
                setTextContent({ mode: 'text', phase: step });
                setUIHelper((old) => {
                    return {
                        ...old,
                        textArrow: false,
                        sideOpener: 'agent',
                        hideSideOpener: false,
                        devMenu: true,
                    };
                });
                break;
            }
            case 2: {
                setHud((old) => {
                    return { ...old, agent: true };
                });
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        agent: true,
                        outside: true,
                    };
                });
                break;
            }
            case 4: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        creativeClose: true,
                    };
                });
                break;
            }
            case 5: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        creativeClose: false,
                        designMenu: true,
                        sideOpener: 'design',
                    };
                });
                break;
            }
            case 6: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        creativeClose: false,
                        designMenu: false,
                        sideOpener: undefined,
                        createTile: true,
                    };
                });
                break;
            }
            case 7: {
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        wall: true,
                    };
                });
                break;
            }
            case 8: {
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        spawn: true,
                    };
                });
                break;
            }
            case 9: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: undefined,
                        createTile: false,
                    };
                });
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 10: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: undefined,
                        createTile: false,
                    };
                });
                setTextContent({ mode: 'text', phase: step });
                break;
            }
            case 11: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: 'reward',
                        designMenu: false,
                        createTile: false,
                    };
                });
                setTextContent({ mode: 'text', phase: step });
                break;
            }
            case 13: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: undefined,
                    };
                });
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 14: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: 'settings',
                    };
                });
                setTextContent({ mode: 'text', phase: step });
                break;
            }
            case 16: {
                setHud((old) => {
                    return {
                        ...old,
                        envTitle: true,
                    };
                });
                setUIHelper((old) => {
                    return {
                        ...old,
                        creativeClose: true,
                    };
                });
                break;
            }
            case 17: {
                setTextContent({ mode: 'textNext', phase: step });
                setControls({ play: true, ff: false, step: false, inspect: false });
                break;
            }
            case 20: {
                setTextContent({ mode: 'text', phase: step });
                setHud((old) => {
                    return {
                        ...old,
                        controls: true,
                    };
                });
                break;
            }
            case 21: {
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 22: {
                setTextContent({ mode: 'text', phase: step });
                setHud((old) => {
                    return {
                        ...old,
                        agentVision: true,
                    };
                });
                setGameState((old) => {
                    return {
                        ...old,
                        isRunning: false,
                    };
                });
                setControls({ play: false, ff: false, step: true, inspect: false });
                break;
            }
            case 24: {
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 25: {
                setTextContent({ mode: 'text', phase: step });
                setControls({ play: true, ff: true, step: true, inspect: false });
                break;
            }
            case 27: {
                setGameState((old) => {
                    return {
                        ...old,
                        isFast: false,
                        isRunning: false,
                    };
                });
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 29: {
                setHud((old) => {
                    return {
                        ...old,
                        qTable: true,
                    };
                });
                setLod(2);
                setControls({ play: false, ff: false, step: false, inspect: false });
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 31: {
                setTextContent({ mode: 'text', phase: step });
                setControls({ play: false, ff: false, step: false, inspect: true });
                break;
            }
            case 32: {
                setTextContent({ mode: 'inspect', phase: step });
                break;
            }
            case 38: {
                setTextContent({ mode: 'textNext', phase: step });
                setControls({ play: false, ff: false, step: false, inspect: false });
                setHud((old) => {
                    return {
                        ...old,
                        epsilon: true,
                        gamma: true,
                        alpha: true,
                    };
                });
                break;
            }
            case 40: {
                setHud((old) => {
                    return {
                        ...old,
                        charts: true,
                    };
                });
                break;
            }
            case 44: {
                setHud((old) => {
                    return {
                        ...old,
                        text: false,
                        progress: false,
                    };
                });
                setControls({ play: true, ff: true, step: true, inspect: true });
                break;
            }
            default:
                return;
        }
    }, [step, setControls, setHud, setTextContent, setVisibleTiles, setUIHelper, setGameState, setLod]);

    return null;
}
