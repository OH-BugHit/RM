import style from './observationSelector.module.css';
import SelectorItem from '../SelectorItem';
import DrawObservation from '../../../Observation/DrawObservation';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../../../atoms/state';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import { ObservationShape } from '../../../../types';
import { useTranslation } from 'react-i18next';
import Separator from '../../../../components/Separator/Separator';
import { useGameScale } from '../../../../context/GameScale/useGameScale';

export default function ObservationSelector() {
    const { t } = useTranslation('', { keyPrefix: 'createMenu.agent' });
    const { s } = useGameScale();
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
            <h2>{t('obsShapeTitle')}</h2>
            <ul className={style.selectorItemContainer}>
                <SelectorItem
                    title="Small"
                    onClick={() => {
                        select('small');
                    }}
                    selected={activeAgent.observationShape === 'small'}
                    children={
                        <DrawObservation
                            tileSize={Math.min(40, s(40))}
                            state="0101"
                            disabled={false}
                            actionValues={[0.12, -0.5, 0.16, -0.5, -0.46, -0.4]}
                            type={'small'}
                        />
                    }
                />
                <div style={{ position: 'relative', top: '-40px' }}>
                    <Separator
                        vertical
                        color="rgb(38, 114, 189)"
                    />
                </div>
                <SelectorItem
                    title="Large"
                    onClick={() => {
                        select('large');
                    }}
                    selected={activeAgent.observationShape === 'large'}
                    children={
                        <DrawObservation
                            tileSize={Math.min(40, s(40))}
                            state="10020000201021100222"
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
