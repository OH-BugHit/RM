import { useSetAtom } from 'jotai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveViewAtom } from '../atoms/uiState';
import { Overlay, SubView, MainView, ViewEnum } from '../types';

function ViewHandler() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const setView = useSetAtom(ActiveViewAtom);
    const navigate = useNavigate();

    const view = searchParams.get(ViewEnum.MainView) as MainView | null;
    const subView = searchParams.get(ViewEnum.Subview) as SubView | null;
    const overlay = (searchParams.get(ViewEnum.Overlay) ?? 'none') as Overlay | null;

    useEffect(() => {
        switch (view) {
            case 'frontpage': {
                document.title = `${t('common.title')}`;
                break;
            }
            case 'tutorial': {
                document.title = `${t('common.tutorial')}`;
                break;
            }
            case 'story': {
                document.title = `${t('common.title')} - ${t('common.story')}`;
                break;
            }
            case 'start': {
                document.title = `${t('common.title')}`;
                break;
            }
            case 'game': {
                document.title = `${t('common.title')} - ${t('common.game')}`;
                break;
            }
            default: {
                document.title = `${t('common.title')}`;
            }
        }
    }, [view, t]);

    if (!view) {
        console.warn('Missing URL parameters: view, redirecting to frontpage');
        navigate('/', { replace: true });
        return null;
    }

    setView({ main: view, sub: subView, overlay: overlay });
    return null;
}

export default React.memo(ViewHandler);
