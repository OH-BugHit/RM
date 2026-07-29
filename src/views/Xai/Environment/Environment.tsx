import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../atoms/state';
import { HUDvisAtom } from '../../../atoms/uiState';
import TypewriterText from '../../../components/Typewriter/TypeWriterText';

export default function Environment() {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    return (
        <>
            {hudVis.envTitle && (
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
                    {
                        <TypewriterText
                            startDelay={1000}
                            speed={60}
                            text={environment.name}
                        />
                    }
                </h1>
            )}
        </>
    );
}
