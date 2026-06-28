import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../../atoms/state';
import Stats from '../Stats/Stats';
import { HUDvisAtom } from '../../../atoms/uiState';
import { NewFrame } from '../../Frames/NewFrame';

export default function Agent() {
    const agent = useAtomValue(ActiveAgentAtom);
    const vis = useAtomValue(HUDvisAtom);
    return (
        <>
            <NewFrame visible={vis.stats}>
                <Stats width="550px" />
            </NewFrame>
            <NewFrame visible={vis.agent}>
                <h3 style={{ margin: '0.5rem' }}>{agent.name}</h3>
                <img
                    src={agent.img}
                    height={160}
                    className={style.flipped}
                />
            </NewFrame>
        </>
    );
}
