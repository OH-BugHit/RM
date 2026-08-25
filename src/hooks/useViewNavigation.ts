import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainView, SubView, Overlay, ViewEnum } from '../types';

type ViewState = {
    main?: MainView;
    sub?: SubView | null;
    overlay?: Overlay | null;
};

export function useViewNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const goToView = useCallback(
        ({ main, sub, overlay }: ViewState) => {
            const params = new URLSearchParams(location.search);

            if (main !== undefined) {
                params.set(ViewEnum.MainView, main);
            }

            if (sub !== undefined) {
                if (sub === null) {
                    params.delete(ViewEnum.Subview);
                } else {
                    params.set(ViewEnum.Subview, sub);
                }
            }

            if (overlay !== undefined) {
                if (overlay === null) {
                    params.delete(ViewEnum.Overlay);
                } else {
                    params.set(ViewEnum.Overlay, overlay);
                }
            }

            navigate({
                search: `?${params.toString()}`,
            });
        },
        [navigate, location.search]
    );

    return { goToView };
}
