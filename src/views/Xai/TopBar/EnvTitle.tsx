import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../atoms/state';
import { SampleWriter } from '../../../components/Typewriter/TypeWriterText';
import style from './style.module.css';

// Not used, maybe later again to type environment on start?
// Changed to use SampleWriter, without testing, test.
export default function EnvTitle() {
    const environment = useAtomValue(ActiveEnvironmentAtom);

    return (
        <h1
            className={style.envTitle}
            style={{
                fontFamily: 'Tektur, Andika',
                minHeight: '70px',
                alignContent: 'center',
                margin: 0,
                justifySelf: 'center',
            }}
        >
            {
                <SampleWriter
                    startDelay={1000}
                    speed={60}
                    sample={environment.name}
                />
            }
        </h1>
    );
}
