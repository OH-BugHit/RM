import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../../atoms/state';
import Stats from '../Stats/Stats';
import { HUDvisAtom } from '../../../atoms/uiState';
import { NewFrame } from '../../Frames/NewFrame';
import { Help } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';

export default function Agent() {
    const { t } = useTranslation();
    const agent = useAtomValue(ActiveAgentAtom);
    const vis = useAtomValue(HUDvisAtom);
    return (
        <>
            <NewFrame
                visible={vis.stats}
                overlayRightTop={
                    vis.charts && (
                        <span>
                            <Help
                                inplace
                                message={t('help.hud.stats')}
                            />
                        </span>
                    )
                }
            >
                <Stats />
            </NewFrame>
            <NewFrame visible={vis.agent}>
                <h3 style={{ margin: '0.5rem' }}>{agent.name}</h3>
                <img
                    src={agent.img}
                    height={160}
                    className={style.flipped}
                />
            </NewFrame>
        </>
    );
}
