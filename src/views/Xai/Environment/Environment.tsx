import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../atoms/state';
import { HUDvisAtom } from '../../../atoms/uiState';
import { NewFrame } from '../../Frames/NewFrame';

export default function Environment() {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    return (
        <>
            <NewFrame visible={hudVis.envTitle}>
                <h1
                    className={style.envTitle}
                    style={{
                        fontFamily: 'Tektur, Andika;',
                        minHeight: '70px',
                        alignContent: 'center',
                        margin: 0,
                        justifySelf: 'center',
                    }}
                >
                    {environment.name}
                </h1>
            </NewFrame>
        </>
    );
}
