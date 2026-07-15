import style from './style.module.css';
import { useEffect } from 'react';
import Separator from '../../../../components/Separator/Separator';
import { useSetAtom } from 'jotai';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import PropTool from './Prop/PropTool/PropTool';

export default function ModifyEnvironment() {
    const setStoryProgress = useSetAtom(StoryProgressAtom);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                environment: {
                    ...old.environment,
                    modifyOpened: true,
                },
            };
        });
        return () =>
            setStoryProgress((old) => {
                return {
                    ...old,
                    environment: {
                        ...old.environment,
                        modifyOpened: false,
                    },
                };
            });
    }, [setStoryProgress]);

    return (
        <div className={style.selectorContainer}>
            <h1>Modify your world</h1>
            <Separator />
            <div className={style.textSection}>
                <h3>Alter your environment!</h3>
                <p>You can resize your world by clicking on the edges of your world.</p>
                <p>You can change bordering tiles style, but they always have to be "Solid"-type.</p>
            </div>
            <PropTool />

            <Separator />
        </div>
    );
}
