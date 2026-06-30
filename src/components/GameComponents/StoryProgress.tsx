import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
    HUDvisAtom,
    StatsContentAtom,
    StoryProgressAtom,
    StoryStepAtom,
    UiHelpAtom,
    VisibleTilesAtom,
} from '../../atoms/uiState';
import { useEffect } from 'react';

export default function StoryProgress() {
    const [step, setStep] = useAtom(StoryStepAtom);
    const setHud = useSetAtom(HUDvisAtom);
    const setStatsContent = useSetAtom(StatsContentAtom);
    const progress = useAtomValue(StoryProgressAtom);
    const setVisibleTiles = useSetAtom(VisibleTilesAtom);
    const setUIHelper = useSetAtom(UiHelpAtom);

    useEffect(() => {
        if (step > 11) return; // creative stuff is under 11
        if (progress.environment.name) {
            setStep(11);
            return;
        }

        if (progress.rewards) {
            setStep(10);
            return;
        }

        if (progress.environment.goalSet) {
            setStep(9);
            return;
        }

        if (progress.environment.modifyOpened) {
            setStep(8);
            return;
        }

        if (progress.environment.goal) {
            setStep(7);
            return;
        }

        if (progress.environment.spawn) {
            setStep(6);
            return;
        }

        if (progress.environment.solid) {
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
    }, [progress, setStep]);

    useEffect(() => {
        setStatsContent((old) => {
            return { mode: old.mode, phase: step };
        });
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
                        sideOpener: true,
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
            case 5: {
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        wall: true,
                    };
                });
                break;
            }
            case 6: {
                setVisibleTiles((old) => {
                    return {
                        ...old,
                        spawn: true,
                    };
                });
                break;
            }
            case 11: {
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
            case 12: {
                setStatsContent({ mode: 'textNext', phase: step });
                break;
            }
            case 15: {
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
