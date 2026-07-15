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
        if (progress.rewards.rewards) {
            setStep(13);
            return;
        }
        if (progress.environment.closed) {
            setStep(12);
            return;
        }
        if (progress.environment.goalSet) {
            setStep(11);
            return;
        }

        if (progress.environment.modifyOpened) {
            setStep(10);
            return;
        }
        if (progress.design.closed) {
            setStep(9);
            return;
        }

        if (progress.environment.goal) {
            setStep(8);
            return;
        }

        if (progress.environment.spawn) {
            setStep(7);
            return;
        }

        if (progress.environment.solid) {
            setStep(6);
            return;
        }

        if (progress.agent.closed) {
            setStep(5);
            return;
        }

        if (progress.agent.name) {
            setStep(4);
            return;
        }

        if (progress.agent.obsShape) {
            setStep(3);
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
        console.log(step);
        switch (step) {
            case 0: {
                setStatsContent({ mode: 'textNext', phase: step });
                setHud((old) => {
                    return { ...old, stats: true };
                });
                setUIHelper((old) => {
                    return {
                        ...old,
                        statsArrow: true,
                    };
                });
                break;
            }
            case 1: {
                setStatsContent({ mode: 'text', phase: step });
                setUIHelper((old) => {
                    return {
                        ...old,
                        statsArrow: false,
                        sideOpener: 'agent',
                        hideSideOpener: false,
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
                        sideOpener: 'props',
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
                    };
                });
                break;
            }
            case 6: {
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        wall: true,
                    };
                });
                break;
            }
            case 7: {
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        spawn: true,
                    };
                });
                break;
            }
            case 8: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: 'world',
                    };
                });
                break;
            }
            case 11: {
                setUIHelper((old) => {
                    return {
                        ...old,
                        sideOpener: 'reward',
                    };
                });
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
                    charts: true,
                    agentVision: true,
                    qTable: true,
                    stats: true,
                    cableLeft: true,
                    cableRight: true,
                    envTitle: true,
                    controls: true,
                    agent: true,
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
