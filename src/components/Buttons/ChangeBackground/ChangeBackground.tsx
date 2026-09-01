import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { InnerFillCellAtom } from '../../../atoms/gameState';
import { Button } from '@genai-fi/base';
import { useState } from 'react';
import { useViewNavigation } from '../../../hooks/useViewNavigation';
import { useTranslation } from 'react-i18next';

export default function ChangeBackground() {
    const { t } = useTranslation();
    const { goToView } = useViewNavigation();
    const background = useAtomValue(InnerFillCellAtom);
    const [dialog, setDialog] = useState<boolean>(false);

    const doDialog = () => {
        goToView({ overlay: dialog ? null : 'backgroundDialog' });
        setDialog(!dialog);
    };

    return (
        <>
            <div className={style.container}>
                <Button
                    onClick={doDialog}
                    variant="text"
                    className={style.changeButton}
                >
                    <h2>{t('import.titles.changeButton')}</h2>
                    <div className={style.current}>
                        {t('common.current')}:
                        <img
                            src={background.emoji ? background.emoji : background.image}
                            height={64}
                        />
                    </div>
                </Button>
            </div>
        </>
    );
}
