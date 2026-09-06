import { useAtomValue } from 'jotai';
import Separator from '../../../../components/Separator/Separator';
import Epsilon from '../../../Xai/Agent/Epsilon/Epsilon';
import Gamma from '../../../Xai/Agent/Gamma/Gamma';
import style from './parameters.module.css';
import { useTranslation } from 'react-i18next';
import { HUDvisAtom } from '../../../../atoms/uiState';
import { useGameScale } from '../../../../context/GameScale/useGameScale';

export default function Parameters() {
    const { t } = useTranslation();
    const { s } = useGameScale();
    const hudVis = useAtomValue(HUDvisAtom);

    return (
        <div className={style.selectorContainer}>
            <h2 style={{ margin: `${s(20)}px` }}>{t('createMenu.agent.paramTitle')}</h2>
            <div className={style.parameters}>
                {hudVis.epsilon && <Epsilon />}
                <div
                    className={style.divider}
                    style={{ top: `${s(-40)}`, paddingLeft: `${s(1)}rem`, paddingRight: `${s(1)}rem` }}
                >
                    {hudVis.epsilon && hudVis.gamma && (
                        <Separator
                            vertical
                            color="rgb(38, 114, 189)"
                        />
                    )}
                </div>
                {hudVis.gamma && <Gamma />}
            </div>
        </div>
    );
}
