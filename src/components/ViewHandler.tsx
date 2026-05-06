import { useSetAtom } from 'jotai';
import { useNavigate, useSearchParams } from 'react-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveSubViewAtom } from '../atoms/state';
import { SubView, View } from '../types';

function ViewHandler() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const setView = useSetAtom(ActiveSubViewAtom);
    const navigate = useNavigate();

    const view = searchParams.get('view') as View | null;
    const subView = searchParams.get('subView') as SubView | null;

    useEffect(() => {
        switch (view) {
            case 'frontpage': {
                document.title = `${t('common.title')}`;
                break;
            }
            case 'story': {
                document.title = `${t('common.title')} - ${t('common.story')}`;
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

    if (subView === 'agent') {
        setView('agent');
        return null;
    } else if (subView === 'actions') {
        setView('actions');
    } else if (subView === 'environment') {
        setView('environment');
    } else if (subView === 'rewards') {
        setView('rewards');
    } else setView('agent');

    return null;
}

export default React.memo(ViewHandler);
