import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MainView, SubView, Overlay, ViewEnum } from '../types';

type ViewState = {
    main?: MainView;
    sub?: SubView | null;
    level?: string | null;
    overlay?: Overlay | null;
};

export function useViewNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const goToView = useCallback(
        ({ main, sub, level, overlay }: ViewState) => {
            const params = new URLSearchParams(location.search);
            const currentMain = params.get(ViewEnum.MainView);
            const currentSub = params.get(ViewEnum.Subview);
            const currentLevel = params.get(ViewEnum.Level);
            const currentOverlay = params.get(ViewEnum.Overlay);

            let onlyOverlayChanged = true;

            if (main !== undefined) {
                const newMain = main;

                if (currentMain !== newMain) {
                    onlyOverlayChanged = false;
                }

                params.set(ViewEnum.MainView, newMain);
            }

            if (sub !== undefined) {
                const newSub = sub;

                if (currentSub !== newSub) {
                    onlyOverlayChanged = false;
                }

                if (newSub === null) {
                    params.delete(ViewEnum.Subview);
                } else {
                    params.set(ViewEnum.Subview, newSub);
                }
            }

            if (overlay !== undefined) {
                if (overlay === null) {
                    params.delete(ViewEnum.Overlay);
                } else {
                    params.set(ViewEnum.Overlay, overlay);
                }
            }

            if (level !== undefined) {
                const newLevel = level;

                if (currentLevel !== newLevel) {
                    onlyOverlayChanged = false;
                }
                if (level === null) {
                    params.delete(ViewEnum.Level);
                } else {
                    params.set(ViewEnum.Level, level);
                }
            }

            const newOverlay = params.get(ViewEnum.Overlay);

            if (main === undefined && sub === undefined && overlay !== undefined && currentOverlay === newOverlay) {
                return;
            }

            navigate(
                {
                    search: `?${params.toString()}`,
                },
                {
                    replace: onlyOverlayChanged,
                }
            );
        },
        [navigate, location.search]
    );

    return { goToView };
}
