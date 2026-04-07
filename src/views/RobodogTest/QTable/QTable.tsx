import { useEffect, useRef } from 'react';
import { QLearningAgent } from '../rlAgentQ';
import QItem from './QItem';
import style from './style.module.css';

interface QTableProps {
    disabled: boolean;
    agent: React.RefObject<QLearningAgent | undefined>;
    scrollToState?: string | undefined;
}

export default function QTable({ agent, disabled, scrollToState }: QTableProps) {
    const activeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!activeRef.current) return;

        requestAnimationFrame(() => {
            activeRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        });
    }, [scrollToState]);

    return (
        <main className={style.tableContainer}>
            <div className={style.qItemsGrid}>
                {agent.current &&
                    !disabled &&
                    Object.entries(agent.current.getQTable()).map(([state, actions]) => {
                        const isActive = state === scrollToState;

                        return (
                            <div
                                key={state}
                                ref={isActive ? activeRef : null}
                                className={isActive ? style.activeState : ''}
                            >
                                <QItem
                                    state={state}
                                    actions={actions}
                                    version={agent.current!.visitTimes[state] || 0}
                                />
                            </div>
                        );
                    })}
                {disabled && <em>Game is running</em>}
            </div>
        </main>
    );
}
