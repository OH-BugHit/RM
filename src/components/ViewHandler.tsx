import { useSetAtom } from 'jotai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveViewAtom, MenuOpenAtom } from '../atoms/uiState';
import { Overlay, SubView, MainView, ViewEnum } from '../types';

function ViewHandler() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const setView = useSetAtom(ActiveViewAtom);
    const navigate = useNavigate();
    const setMenuOpen = useSetAtom(MenuOpenAtom);

    const view = searchParams.get(ViewEnum.MainView) as MainView | null;
    const subView = searchParams.get(ViewEnum.Subview) as SubView | null;
    const overlay = (searchParams.get(ViewEnum.Overlay) ?? 'none') as Overlay;

    useEffect(() => {
        if (!view) {
            console.warn('Missing URL parameter: view, redirecting to frontpage');

            navigate('/', { replace: true });
            return;
        }

        setView({
            main: view,
            sub: subView,
            overlay,
        });
    }, [view, subView, overlay, setView, navigate]);

    useEffect(() => {
        switch (view) {
            case 'frontpage':
                document.title = `${t('common.title')}`;
                break;
            default:
                document.title = t('common.title');
                break;
        }
    }, [view, t]);

    useEffect(() => {
        switch (overlay) {
            case 'menu':
                setMenuOpen(true);
                break;
            default:
                setMenuOpen(false);
                break;
        }
    }, [overlay, setMenuOpen]);

    return null;
}

export default React.memo(ViewHandler);
