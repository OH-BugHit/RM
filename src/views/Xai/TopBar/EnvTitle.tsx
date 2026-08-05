import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../atoms/state';
import TypewriterText from '../../../components/Typewriter/TypeWriterText';
import style from './style.module.css';
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
                <TypewriterText
                    startDelay={1000}
                    speed={60}
                    text={environment.name}
                />
            }
        </h1>
    );
}
