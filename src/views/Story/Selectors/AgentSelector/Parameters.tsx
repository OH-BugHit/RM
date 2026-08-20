import { useAtomValue } from 'jotai';
import Separator from '../../../../components/Separator/Separator';
import Epsilon from '../../../Xai/Agent/Epsilon/Epsilon';
import Gamma from '../../../Xai/Agent/Gamma/Gamma';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { HUDvisAtom } from '../../../../atoms/uiState';

export default function Parameters() {
    const { t } = useTranslation();
    const hudVis = useAtomValue(HUDvisAtom);

    return (
        <div className={style.selectorContainer}>
            <h2>{t('createMenu.agent.paramTitle')}</h2>
            <div className={style.parameters}>
                {hudVis.epsilon && <Epsilon />}
                <div style={{ position: 'relative', top: '-40px' }}>
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
