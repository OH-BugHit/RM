import style from './style.module.css';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { QPolicyAgent } from '../agents/policyQagent';
import { RefObject } from 'react';
import { tournamentAgentUpdatesAtom } from '../../atoms/state';

interface AgentRenderInterface {
    agentsRef: RefObject<QPolicyAgent[] | undefined>;
    tileSize?: number;
}

export default function TournamentAgentRender({ agentsRef, tileSize = 40 }: AgentRenderInterface) {
    const updates = useAtomValue(tournamentAgentUpdatesAtom);

    const agents = agentsRef.current ?? [];

    return (
        <>
            {agents.map((agent: QPolicyAgent) => {
                if (updates.data.get(agent.studentId)?.img === '') return null;

                return (
                    <motion.div
                        key={agent.studentId}
                        style={{
                            position: 'absolute',
                            zIndex: 20,
                        }}
                        transition={{
                            type: 'tween',
                            duration: 0.2,
                            ease: 'easeInOut',
                            delay: 0,
                        }}
                        animate={{
                            x: agent.position.x * tileSize,
                            y: agent.position.y * tileSize,
                            opacity: 1,
                        }}
                    >
                        <motion.img
                            src={updates.data.get(agent.studentId)?.img}
                            alt="Agent Image"
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            style={{
                                position: 'relative',
                                top: '16px',
                                left: '16px',
                                width: tileSize,
                                height: tileSize,
                                display: 'block',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                scaleX: 1,
                            }}
                        />
                    </motion.div>
                );
            })}
        </>
    );
}
