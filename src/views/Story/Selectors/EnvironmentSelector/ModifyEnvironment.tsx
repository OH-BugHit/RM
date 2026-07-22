import style from '../style.module.css';
import { useEffect } from 'react';
import Separator from '../../../../components/Separator/Separator';
import { useSetAtom } from 'jotai';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import PropTool from './Prop/PropTool/PropTool';
import { useTranslation } from 'react-i18next';

export default function ModifyEnvironment() {
    const { t } = useTranslation('', { keyPrefix: 'createMenu.modify' });
    const setStoryProgress = useSetAtom(StoryProgressAtom);

    // Sets false when unmounting since that is used in addition to follow story progress, for resize button toggle.
    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                environment: {
                    ...old.environment,
                    opened: true,
                },
            };
        });
        return () =>
            setStoryProgress((old) => {
                return {
                    ...old,
                    environment: {
                        ...old.environment,
                        opened: false,
                    },
                };
            });
    }, [setStoryProgress]);

    return (
        <div className={style.selectorContainer}>
            <h1>{t('title')}</h1>
            <em>{t('titleDesc')}</em>
            <Separator />
            <div className={style.textSection}>
                <h3>{t('alterTitle')}</h3>
                <p>{t('alterDesc')}</p>
            </div>
            <div className={style.textSection}>
                <h3>{t('modifyTitle')}</h3>
                <p>{t('modifyDesc')}</p>
            </div>
            <PropTool />
            <Separator />
        </div>
    );
}
