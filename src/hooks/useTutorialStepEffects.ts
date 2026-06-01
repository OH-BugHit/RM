// useTutorialStepEffects.ts
import { useEffect } from 'react';
import { RLGridEnv } from '../views/Environments/PotsAndBurglar/environment';
import { useSetAtom } from 'jotai';
import { GameControlAtom } from '../atoms/state';

interface Params {
    tutorialStep: number;
    envRef: React.RefObject<RLGridEnv | undefined>;
    setFacing: (v: number) => void;
}

export function useTutorialStepEffects({ tutorialStep, envRef, setFacing }: Params) {
    const setControls = useSetAtom(GameControlAtom);
    useEffect(() => {
        const env = envRef.current;
        if (!env) return;

        switch (tutorialStep) {
            case 0:
                env.position = { x: 2, y: 2 };
                setFacing(1);
                break;

            case 1:
                env.position = { x: 2, y: 2 };
                env.POI = { side: 1, turns: 0 };
                break;

            case 2:
                env.position = { x: 3, y: 2 };
                break;

            case 3:
                env.position = { x: 3, y: 3 };
                break;

            case 4:
                env.position = { x: 2, y: 3 };
                setFacing(1);
                break;

            case 5:
                env.position = { x: 2, y: 3 };
                setFacing(-1);
                break;

            case 7:
                env.position = { x: 1, y: 3 };
                break;

            case 12:
                env.position = { x: 2, y: 3 };
                setFacing(1);
                break;

            case 19:
                setControls((old) => ({ ...old, isRunning: true }));
                break;

            case 20:
            case 21:
            case 22:
            case 23:
                setControls((old) => ({ ...old, isRunning: false }));
                break;

            case 24:
                setControls((old) => ({
                    ...old,
                    isRunning: true,
                    isFast: true,
                }));
                break;

            case 25:
                setControls((old) => ({
                    ...old,
                    isRunning: false,
                    isFast: false,
                }));
                break;

            case 27:
                setControls((old) => ({
                    ...old,
                    isRunning: true,
                    isFast: false,
                }));
                break;
        }

        if (tutorialStep < 2) {
            env.position = { x: 2, y: 2 };
        }
    }, [tutorialStep, envRef, setFacing, setControls]);
}
