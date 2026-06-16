import { Dispatch, useEffect } from 'react';
import style from './style.module.css';
//import { useTranslation } from 'react-i18next';
import { SetStateAction, useSetAtom } from 'jotai';
import { Button } from '@genai-fi/base';
import { ActiveAgentAtom, ActiveEnvironmentAtom } from '../../atoms/state';
import { defaultWorld } from '../../utils/defaults';

interface StoryStartProps {
    setStart: Dispatch<SetStateAction<boolean>>;
}
export default function StoryStart({ setStart }: StoryStartProps) {
    const setAgent = useSetAtom(ActiveAgentAtom);
    const setEnvironment = useSetAtom(ActiveEnvironmentAtom);

    useEffect(() => {
        setAgent({ name: '', type: 'none', img: '', observationShape: 'none' });
        setEnvironment({ name: '', type: undefined, world: defaultWorld, envProps: undefined });
    }, [setAgent, setEnvironment]);
    //const { t } = useTranslation();
    return (
        <div className={style.storyStartLayer}>
            <h1>Build your own story</h1>
            <p>In this game you will create your own agent and world for it to learn and play!</p>

            <section>
                <p>You can select from pre-made agents or choose your own jotai jotai et oma kuva</p>
            </section>
            <section>
                <p>
                    Next you can choose environment with ready tasks, such as Pots and Burglar or Adventurer, or you can
                    even build your completely own environment!
                </p>
            </section>
            <section>
                <p>
                    After selecting agent and environment, you can tune rewards if you like. By shaping reward, agent
                    will learn different things. There is default rewards so you can skip this if you like. Later in the
                    game, it is possible to alter reward and jotai jota...
                </p>
            </section>

            <Button
                variant="contained"
                fullWidth={false}
                onClick={() => setStart(false)}
            >
                asdad
            </Button>
        </div>
    );
}
