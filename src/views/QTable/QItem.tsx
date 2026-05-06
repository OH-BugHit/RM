import React from 'react';
import style from './style.module.css';
import DrawObservation from '../Observation/DrawObservation';
import { AgentType } from '../../types';

interface QItemProps {
    state: string;
    actions: number[];
    version: number;
    type: AgentType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function QItem({ state, actions, version, type }: QItemProps) {
    return (
        <div className={style.qItem}>
            <DrawObservation
                state={state}
                disabled={false}
                actionValues={actions}
                type={type}
            />
            Visited: {version} times
        </div>
    );
}

export default React.memo(QItem, (prev, next) => {
    return prev.version === next.version;
});
