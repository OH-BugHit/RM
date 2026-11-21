import style from './style.module.css';
import L from 'leaflet';
import { useAtom, useSetAtom } from 'jotai';
import { ControlEnablerAtom, InspectAtom, TextStepAtom } from '../../../atoms/uiState';
import TypewriterText from '../../../components/Typewriter/TypeWriterText';
import { useTranslation } from 'react-i18next';
import { Button } from '@genai-fi/base';
import { useEffect } from 'react';
import { GameControlAtom } from '../../../atoms/state';
import { WorldStore } from '../../../components/QTable/utils';
import { FocusOverlay } from '../../../components/QTable/FocusOverlay/FocusOverlay';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';

interface InspectTextProps {
    mapRef: React.RefObject<L.Map | null>;
    world: WorldStore;
    focusFrameRef: React.RefObject<FocusOverlay | undefined>;
    layerRef: React.RefObject<L.GridLayer | null>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
}

export default function InspectText({ mapRef, world, focusFrameRef, layerRef, agentRef }: InspectTextProps) {
    const { t } = useTranslation();
    const [inspect, setInspect] = useAtom(InspectAtom);
    const setStep = useSetAtom(TextStepAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const setGame = useSetAtom(GameControlAtom);
    useEffect(() => {
        setControls({ trash: false, test: false, play: false, ff: false, step: false, inspect: false });
        setGame((old) => {
            return {
                ...old,
                isRunning: false,
                isFast: false,
                takeStep: !old.takeStep,
            };
        });
        const timeout = setTimeout(() => {
            const map = mapRef.current;
            if (!map) return;

            if (!agentRef.current) return;
            const pos = world.statePos.get(agentRef.current?.getCurrentState());
            if (!pos) return;

            const p = L.point((pos.x + 0.5) * 256, (pos.y + 0.5) * 256);
            const latlng = map.unproject(p, 14);

            map.setView(latlng, 14, { animate: true });
            focusFrameRef.current?.show(latlng, 1000);
            layerRef.current?.redraw();
        }, 50);

        return () => {
            clearTimeout(timeout);
            setControls({ trash: true, test: true, play: true, ff: true, step: true, inspect: true });
        };
    }, [setControls, setGame, agentRef, focusFrameRef, layerRef, mapRef, world.statePos]);

    const handleStep = (dir: -1 | 1) => {
        setStep((old) => old + dir);
        setInspect((old) => {
            const newValue = old.step + dir;
            if (newValue === 0) {
                agentRef.current?.clearInspect();
            } else if (newValue === 1) {
                agentRef.current?.inspect();
            } else if (newValue === 3) {
                agentRef.current?.clearInspect();
            } else if (newValue > 6) {
                return { vis: false, step: 0 };
            }
            return {
                ...old,
                step: newValue,
            };
        });
    };
    return (
        <div
            className={style.textContainer}
            style={{ width: '550px', maxWidth: '40vw' }}
        >
            <p className={style.storyText}>
                {' '}
                {/**TODO: Change to use samplewriter? */}
                <TypewriterText
                    startDelay={200}
                    speed={25}
                    text={t(`inspect.${inspect.step}`)}
                />
            </p>
            <div className={style.buttonGroup}>
                <Button
                    disabled={inspect.step < 1}
                    onClick={() => {
                        handleStep(-1);
                    }}
                >
                    {t('common.previous')}
                </Button>
                <Button
                    onClick={() => {
                        handleStep(1);
                    }}
                >
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );
}
