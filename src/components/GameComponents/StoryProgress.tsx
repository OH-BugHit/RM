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
    AgentCAtom,
    BuildCAtom,
} from '../../atoms/uiState';
import { useEffect } from 'react';
import { GameControlAtom } from '../../atoms/state';
import { EpisodicDataAtom } from '../../atoms/gameState';

export default function StoryProgress() {
    const [step, setStep] = useAtom(StoryStepAtom);
    const setHud = useSetAtom(HUDvisAtom);
    const setTextContent = useSetAtom(StatsContentAtom);
    const [progress, setProgress] = useAtom(StoryProgressAtom);
    const setVisibleTiles = useSetAtom(TileVisibilityAtom);
    const setUIHelper = useSetAtom(UiHelpAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const [controlState, setGameState] = useAtom(GameControlAtom);
    const obsViewType = useAtomValue(ObsViewTypeAtom);
    const gameData = useAtomValue(EpisodicDataAtom);
    const setLod = useSetAtom(LodStateAtom);
    const setAgentCluster = useSetAtom(AgentCAtom);
    const setBuildCluster = useSetAtom(BuildCAtom);
    //const setInspecCluster = useSetAtom(InspectCAtom);
    //const setRewardCluster = useSetAtom(RewardCAtom) progress.design.tools

    useEffect(() => {
        if (step > 22) return;
        if (gameData?.triggered && gameData.triggered > 10) {
            setStep(23);
            return;
        }
        if (progress.hud.agentView.steps && controlState.isRunning) {
            setStep(22);
            return;
        }
        if (step > 19) return;
        if (obsViewType === 'agent') {
            setStep(20);
            return;
        }
        if (progress.hud.agentView.steps) {
            setStep(19);
            return;
        }
        if (progress.hud.agentView.opened) {
            setStep(18);
            return;
        }
        if (step > 16) return;
        if (controlState.isRunning) {
            setStep(17);
            return;
        }
        if (step > 11) return;
        if (progress.environment.name) {
            setStep(12);
            return;
        }
        if (step > 10) {
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

        if (step > 3) {
            return;
        }

        if (progress.agent.obsShape) {
            setStep(4);
            return;
        }

        if (progress.agent.img) {
            setStep(3);
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
            case 2: {
                setTextContent({ mode: 'text', phase: step });
                setHud((old) => {
                    return {
                        ...old,
                        agentCluster: true,
                        agent: {
                            img: true,
                            prm: false,
                            obs: false,
                        },
                    };
                });
                setUIHelper((old) => {
                    return {
                        ...old,
                        agent: {
                            img: true,
                            prm: false,
                            obs: false,
                        },
                        textArrow: false,
                    };
                });
                break;
            }
            case 3: {
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        agent: true,
                        outside: true,
                    };
                });
                setHud((old) => {
                    return {
                        ...old,
                        agentCluster: true,
                        agent: {
                            img: true,
                            prm: false,
                            obs: true,
                        },
                    };
                });
                setUIHelper((old) => {
                    return {
                        ...old,
                        agent: {
                            img: false,
                            prm: false,
                            obs: true,
                        },
                    };
                });
                break;
            }
            case 4: {
                setTextContent({ mode: 'textNext', phase: step });
                setUIHelper((old) => {
                    return {
                        ...old,
                        agent: {
                            img: false,
                            prm: false,
                            obs: false,
                        },
                    };
                });
                break;
            }

            case 5: {
                setAgentCluster({ obs: false, img: false, prm: false });
                break;
            }

            case 6: {
                setTextContent({ mode: 'text', phase: step });
                setHud((old) => {
                    return {
                        ...old,
                        buildCluster: true,
                        build: {
                            create: true,
                            tools: false,
                            settings: false,
                        },
                    };
                });
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
                setHud((old) => {
                    return {
                        ...old,
                        build: {
                            create: true,
                            tools: true,
                            settings: false,
                        },
                    };
                });
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
                setBuildCluster((old) => {
                    return {
                        ...old,
                        create: false,
                    };
                });
                setHud((old) => {
                    return {
                        ...old,
                        buildCluster: true,
                        build: {
                            create: true,
                            tools: true,
                            settings: false,
                        },
                    };
                });
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: undefined,
                        createTile: false,
                    };
                });
                setProgress((old) => {
                    return {
                        ...old,
                        design: old.design,
                        tools: true,
                    };
                });
                setTextContent({ mode: 'text', phase: step });
                break;
            }
            case 11: {
                setHud((old) => {
                    return {
                        ...old,
                        buildCluster: true,
                        build: {
                            create: true,
                            tools: true,
                            settings: true,
                        },
                    };
                });
                setUIHelper((old) => {
                    return {
                        ...old,
                        designMenu: false,
                        createTile: false,
                    };
                });
                setTextContent({ mode: 'text', phase: step });
                break;
            }
            case 12: {
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 13: {
                setHud((old) => {
                    return {
                        ...old,
                        rewardCluster: true,
                    };
                });
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
                setHud((old) => {
                    return {
                        ...old,
                        reward: {
                            time: true,
                            step: true,
                            props: true,
                        },
                    };
                });
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: 'settings',
                    };
                });
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 15: {
                setHud((old) => {
                    return {
                        ...old,
                        envTitle: true,
                    };
                });
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 16: {
                setTextContent({ mode: 'text', phase: step });
                setHud((old) => {
                    return {
                        ...old,
                        controls: true,
                    };
                });
                setControls({ play: true, ff: false, step: false, inspect: false });
                break;
            }
            case 17: {
                setHud((old) => {
                    return {
                        ...old,
                        inspectCluster: true,
                        inspect: {
                            agentVision: true,
                            charts: false,
                            qMap: false,
                        },
                    };
                });
                break;
            }
            case 18: {
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
            case 19: {
                setTextContent({ mode: 'text', phase: step });
                break;
            }
            case 20: {
                setTextContent({ mode: 'textNext', phase: step });
                break;
            }
            case 21: {
                setTextContent({ mode: 'text', phase: step });
                setControls({ play: true, ff: true, step: true, inspect: false });
                break;
            }
            case 22: {
                setTextContent({ mode: 'text', phase: step });
                break;
            }
            case 23: {
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
            case 25: {
                setLod(2);
                setHud((old) => {
                    return {
                        ...old,
                        inspect: {
                            agentVision: true,
                            charts: false,
                            qMap: true,
                        },
                    };
                });
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
                        agent: {
                            ...old.agent,
                            prm: true,
                        },
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
                setHud((old) => {
                    return {
                        ...old,
                        inspect: {
                            agentVision: true,
                            charts: true,
                            qMap: true,
                        },
                    };
                });
                setControls({ play: true, ff: true, step: true, inspect: true });
                break;
            }
            default:
                return;
        }
    }, [
        step,
        setBuildCluster,
        setAgentCluster,
        setProgress,
        setControls,
        setHud,
        setTextContent,
        setVisibleTiles,
        setUIHelper,
        setGameState,
        setLod,
    ]);

    return null;
}
