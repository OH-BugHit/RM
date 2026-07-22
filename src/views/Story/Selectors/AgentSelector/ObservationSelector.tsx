import style from '../style.module.css';
import SelectorItem from '../SelectorItem';
import DrawObservation from '../../../Observation/DrawObservation';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../../../atoms/state';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import { ObservationShape } from '../../../../types';
import { useTranslation } from 'react-i18next';

export default function ObservationSelector() {
    const { t } = useTranslation('', { keyPrefix: 'createMenu.agent' });
    const [activeAgent, setActiveAgent] = useAtom(ActiveAgentAtom);
    const setProgress = useSetAtom(StoryProgressAtom);

    const select = (shape: ObservationShape) => {
        setActiveAgent((old) => {
            return {
                ...old,
                observationShape: shape,
            };
        });
        setProgress((old) => {
            return {
                ...old,
                agent: {
                    ...old.agent,
                    obsShape: true,
                },
            };
        });
    };

    return (
        <div className={style.selectorContainer}>
            <div className={style.textSection}>
                <h3>{t('obsShapeTitle')}</h3>
                <em>{t('obsShapeTitleDesc')}</em>
            </div>
            <ul className={style.selectorItemContainer}>
                <SelectorItem
                    title="Small"
                    onClick={() => {
                        select('small');
                    }}
                    selected={activeAgent.observationShape === 'small'}
                    children={
                        <DrawObservation
                            state="0101-1"
                            disabled={false}
                            actionValues={[0.12, -0.5, 0.16, -0.5, -0.46, -0.4]}
                            type={'small'}
                        />
                    }
                />
                <SelectorItem
                    title="Large"
                    onClick={() => {
                        select('large');
                    }}
                    selected={activeAgent.observationShape === 'large'}
                    children={
                        <DrawObservation
                            state="10020000201021100222-1"
                            disabled={false}
                            actionValues={[0.8, -0.47, -0.44, -0.5, -0.42, -0.4]}
                            type="large"
                        />
                    }
                />
            </ul>
        </div>
    );
}
