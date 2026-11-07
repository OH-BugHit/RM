import style from './testProgress.module.css';
import { useAtom, useAtomValue, useSetAtom, useStore } from 'jotai';
import { EpisodicDataAtom, StepsLeftAtom, TestAgentAtom, TestWinAtom } from '../../atoms/gameState';
import { useEffect, useRef } from 'react';
import { AgentProps } from '../../types';
import GameButton from '../Buttons/GameButton/GameButton';
import TestIcon from '../Buttons/ButtonIcons/OtherIcons/TestIcon';
import { AgentSettingsAtom, GameControlAtom } from '../../atoms/state';
import { HUDvisAtom } from '../../atoms/uiState';
import { defaultAgentSettings } from '../../utils/defaults';
import { useGameScale } from '../../context/GameScale/useGameScale';

interface TestProgressProps {
    target?: number;
    bonus?: boolean;
}

export default function TestProgress({ target = 3, bonus = false }: TestProgressProps) {
    const { s } = useGameScale();
    const stats = useAtomValue(EpisodicDataAtom);
    const setStepsLeft = useSetAtom(StepsLeftAtom);
    const setGameControls = useSetAtom(GameControlAtom);
    const setHudVis = useSetAtom(HUDvisAtom);
    const [testWin, setTestWin] = useAtom(TestWinAtom);
    const [active, setTest] = useAtom(TestAgentAtom);
    const startRef = useRef<number | 'unset'>('unset');
    const completedRef = useRef(false);
    const store = useStore();
    const agentPrm = useRef<AgentProps>(defaultAgentSettings);

    useEffect(() => {
        if (bonus) {
            setTest('available');
        }
    }, [bonus, setTest]);
    useEffect(() => {
        if (stats && active === 'isRunning') {
            if (startRef.current === 'unset') {
                startRef.current = stats.wins;
                completedRef.current = false;
            }
        } else if (active !== 'passed') {
            startRef.current = 'unset';
            completedRef.current = false;
        }
    }, [active, stats]);

    useEffect(() => {
        if (active === 'isRunning' && testWin.beatsScore >= target && !completedRef.current) {
            completedRef.current = true;
            setTest('passed');

            setHudVis((old) => ({
                ...old,
                text: false,
            }));

            setGameControls((old) => ({
                isRunning: false,
                isFast: false,
                takeStep: old.takeStep,
            }));
        }
    }, [active, testWin, target, setTest, setHudVis, setGameControls]);

    const handleTestAgent = () => {
        setStepsLeft(0); // TODO: Does not reset env, figure a way!!.
        setTestWin({ beatsScore: 0 });

        if (active === 'available') {
            agentPrm.current = store.get(AgentSettingsAtom);

            store.set(AgentSettingsAtom, {
                ...agentPrm.current,
                learning: false,
                epsilon: 0,
            });

            setGameControls((old) => ({
                isRunning: true,
                isFast: false,
                takeStep: old.takeStep,
            }));

            setTest('isRunning');
        } else {
            store.set(AgentSettingsAtom, {
                ...agentPrm.current,
            });

            setGameControls((old) => ({
                isRunning: false,
                isFast: false,
                takeStep: old.takeStep,
            }));

            setTest('available');
        }
    };

    if (active === 'no') return;

    return (
        <>
            {active && (
                <>
                    <div className={style.testButton}>
                        <GameButton
                            title="Test Agent"
                            color={active === 'isRunning' ? 'warning' : 'primary'}
                            disabled={active === 'passed'}
                            variant="text"
                            onClick={handleTestAgent}
                        >
                            <TestIcon
                                size={s(160)}
                                title={'TEST'}
                                target={target}
                                current={testWin.beatsScore}
                                active={active === 'isRunning'}
                                disabled={active === 'passed'}
                            />
                        </GameButton>
                    </div>
                </>
            )}
        </>
    );
}
