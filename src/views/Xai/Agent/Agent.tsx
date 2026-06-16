import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../../atoms/state';
import Stats from '../Stats/Stats';
import { Frame } from '../../Frames/Frame';

export default function Agent() {
    const agent = useAtomValue(ActiveAgentAtom);
    return (
        <>
            <Frame
                variant="wide"
                minWidth={500}
                minHeight={200}
                backgroundColour="rgba(255, 219, 134, 1)"
            >
                <Stats width="550px" />
            </Frame>
            <Frame
                variant="square"
                minWidth={120}
                backgroundColour="rgba(255, 219, 134, 1)"
            >
                <h3 style={{ margin: '0.5rem' }}>{agent.name}</h3>
                <img
                    src={agent.img}
                    height={160}
                    className={style.flipped}
                />
            </Frame>
        </>
    );
}
