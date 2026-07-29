import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
    HUDvisAtom,
    StatsContentAtom,
    StoryProgressAtom,
    StoryStepAtom,
    UiHelpAtom,
    TileVisibilityAtom,
} from '../../atoms/uiState';
import { useEffect } from 'react';

export default function StoryProgress() {
    const [step, setStep] = useAtom(StoryStepAtom);
    const setHud = useSetAtom(HUDvisAtom);
    const setStatsContent = useSetAtom(StatsContentAtom);
    const progress = useAtomValue(StoryProgressAtom);
    const setVisibleTiles = useSetAtom(TileVisibilityAtom);
    const setUIHelper = useSetAtom(UiHelpAtom);

    useEffect(() => {
        if (step > 17) return; // creative stuff is under 18
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
        if (progress.rewards.closed) {
            setStep(14);
            return;
        }
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

        if (progress.design.tools) {
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
    }, [progress, setStep, step]);

    useEffect(() => {
        setStatsContent((old) => {
            return { mode: old.mode, phase: step };
        });
        switch (step) {
            case 0: {
                setStatsContent({ mode: 'textNext', phase: step });
                setHud((old) => {
                    return { ...old, text: true };
                });
                break;
            }
            case 1: {
                setStatsContent({ mode: 'text', phase: step });
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
                    };
                });
                setStatsContent({ mode: 'textNext', phase: step });
                break;
            }
            case 10: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: undefined,
                    };
                });
                setStatsContent({ mode: 'text', phase: step });
                break;
            }
            case 11: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: 'reward',
                        designMenu: false,
                    };
                });
                setStatsContent({ mode: 'text', phase: step });
                break;
            }
            case 14: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: 'settings',
                    };
                });
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
                setStatsContent({ mode: 'textNext', phase: step });
                break;
            }
            case 19: {
                setHud({
                    text: false,
                    charts: true,
                    agentVision: true,
                    qTable: true,
                    stats: true,
                    cableLeft: true,
                    cableRight: true,
                    envTitle: true,
                    controls: true,
                    agent: true,
                    alpha: true,
                    gamma: true,
                    epsilon: true,
                });
                setStatsContent((old) => {
                    return {
                        ...old,
                        mode: 'stats',
                    };
                });
                break;
            }
            default:
                return;
        }
    }, [step, setHud, setStatsContent, setVisibleTiles, setUIHelper]);

    return null;
}
