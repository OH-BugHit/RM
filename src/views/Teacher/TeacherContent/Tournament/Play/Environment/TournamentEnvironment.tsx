import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import { useAtomValue, useSetAtom } from 'jotai';

import { motion } from 'framer-motion';
import { StepsLeftAtom } from '../../../../../../atoms/gameState';
import { GameControlAtom } from '../../../../../../atoms/state';
import { useRewardFloats } from '../../../../../../hooks/useRewardFloats';
import { TournamentEnv } from '../../../../../Environments/Tournament/tournamentEnvironment';
import TournamentWorld from './TournamentWorld';
import { QPolicyAgent } from '../../../../../../components/agents/policyQagent';
import { CellSave } from '../../../../../../utils/types';
import TournamentAgentRender from '../../../../../../components/EnvironmentRender/TournamentAgentRender';
import { useGameScale } from '../../../../../../context/GameScale/useGameScale';

const STEP_INTERVAL = 400; //ms
const FLOAT_RING_SIZE = 32;

interface GenericWorldProps {
    agentsRef: React.RefObject<QPolicyAgent[] | undefined>;
    grid: CellSave[][];
}

const maxTurns = 30;

function TournamentEnvironment({ agentsRef, grid }: GenericWorldProps) {
    const worldGrid = useRef(grid);
    const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
    const [tileSize, setTileSize] = useState(0);
    const setStepsLeft = useSetAtom(StepsLeftAtom);
    const { maxTile } = useGameScale();

    const controls = useAtomValue(GameControlAtom);

    const envRef = useRef<TournamentEnv>(undefined);
    const [environment, setEnvironment] = useState<TournamentEnv>();

    const { items: floatItems, spawnFloat, deactivate } = useRewardFloats({ size: FLOAT_RING_SIZE });
    const height = grid.length;
    const width = grid[0]?.length ?? 0;

    useEffect(() => {
        if (!viewport) return;

        const observer = new ResizeObserver(([entry]) => {
            if (!entry) return;
            const { width: availableWidth, height: availableHeight } = entry.contentRect;
            setTileSize(maxTile(availableHeight, height, availableWidth, width));
        });

        observer.observe(viewport);
        return () => observer.disconnect();
    }, [height, maxTile, viewport, width]);

    /**
     * Resets environment. Agent starts with new q-table and environment is reset.
     */
    const resetUI = React.useCallback(() => {
        const environment = new TournamentEnv({
            world: grid,
            maxTurns,
        });
        envRef.current = environment;
        setEnvironment(environment);

        const agents = agentsRef.current;

        if (agents) {
            agents.forEach((agent) => {
                environment.resetAgent(agent);
            });

            environment.resetEnv(agents);
        }
    }, [grid, agentsRef]);

    useEffect(() => {
        worldGrid.current = grid;
        resetUI();
    }, [grid, resetUI]);

    const stepUI = React.useCallback(() => {
        if (agentsRef.current && envRef.current) {
            let deadCount = 0;

            for (const agent of agentsRef.current) {
                if (agent.dead) {
                    deadCount++;
                    continue;
                }

                const prev = agent.position; // For facing
                const currentObs = agent.currentObs;
                const action = agent.chooseAction(currentObs);
                //if (action === Actions.specialAction) console.log('Special action.');
                const {
                    info,
                    obs: nextObs,
                    reward,
                    terminated,
                } = envRef.current.step(agent, action, agent.position, agent.rewards, agent.offsets);
                setStepsLeft(info.timeLeft);

                spawnFloat(agent.position.x, agent.position.y, reward);
                const dx = prev.x - agent.position.x;
                if (dx !== 0) agent.facing = dx > 0 ? -1 : 1;

                if (terminated) {
                    envRef.current.resetAgent(agent);
                } else {
                    agent.currentObs = nextObs;
                }
            }
            if (deadCount >= agentsRef.current.length) {
                envRef.current.resetEnv(agentsRef.current);
                setStepsLeft(maxTurns);
            }
        }
    }, [spawnFloat, setStepsLeft, agentsRef, envRef]);

    useEffect(() => {
        stepUI();
    }, [controls.takeStep, stepUI]);

    useEffect(() => {
        if (!controls.isRunning || controls.isFast) return;
        const id = setInterval(stepUI, STEP_INTERVAL);
        return () => clearInterval(id);
    }, [controls.isFast, controls.isRunning, stepUI]);

    const env = environment;

    if (!env) {
        console.warn('Missing info - env ', env);
        return <div>missing info</div>;
    }

    return (
        <motion.div
            key="genericWorld"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={style.container}
        >
            <div
                ref={setViewport}
                className={style.worldContainer}
            >
                {tileSize > 0 && (
                    <div
                        inert
                        style={{
                            position: 'relative',
                            width: width * tileSize,
                            height: height * tileSize,
                            flex: 'none',
                        }}
                    >
                        <TournamentAgentRender
                            agentsRef={agentsRef}
                            tileSize={tileSize}
                        />
                        <TournamentWorld
                            worldGrid={worldGrid}
                            agentsRef={agentsRef}
                            floatItems={floatItems}
                            deactivate={deactivate}
                            tileSize={tileSize}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default TournamentEnvironment;
