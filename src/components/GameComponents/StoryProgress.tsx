import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { HUDvisAtom, StatsContentAtom, StoryProgressAtom, StoryStepAtom, VisibleTilesAtom } from '../../atoms/uiState';
import { useEffect } from 'react';

export default function StoryProgress() {
    const [step, setStep] = useAtom(StoryStepAtom);
    const setHud = useSetAtom(HUDvisAtom);
    const setStatsContent = useSetAtom(StatsContentAtom);
    const progress = useAtomValue(StoryProgressAtom);
    const setVisibleTiles = useSetAtom(VisibleTilesAtom);

    useEffect(() => {
        if (progress.rewards) {
            setStep(9);
            return;
        }

        if (progress.environment.name) {
            setStep(8);
            return;
        }

        if (progress.environment.props) {
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
        setStatsContent({ mode: 'text', phase: step });
        switch (step) {
            case 1: {
                setHud((old) => {
                    return { ...old, stats: true };
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
            case 8: {
                setHud((old) => {
                    return {
                        ...old,
                        envTitle: true,
                    };
                });
                break;
            }
            case 9: {
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
                break;
            }
            default:
                return;
        }
    }, [step, setHud, setStatsContent, setVisibleTiles]);

    return null;
}
