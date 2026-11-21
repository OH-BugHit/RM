import { useAtomValue } from 'jotai';
import BlackBox from '../../components/BlackBox/BlackBox';
import { StateDataAtom } from '../../atoms/gameState';

interface ObservationBoxProps {
    size?: number;
}
export default function ObservationBox({ size = 64 }: ObservationBoxProps) {
    const state = useAtomValue(StateDataAtom);
    return (
        <>
            <BlackBox
                size={size}
                inplace
                keepOpen
                dark
                message={
                    <p style={{ fontSize: '0.9em' }}>
                        {`Current observation of the agent:`}
                        <br />
                        <em style={{ padding: '4px', fontSize: '0.9em', lineBreak: 'anywhere' }}>
                            {state.current.slice(0, -2)}
                        </em>
                    </p>
                }
            />
        </>
    );
}
