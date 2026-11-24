import { MenuItem, MenuList } from '@mui/material';
import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import ActionButtons from './ActionButtons';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MiscButtons from './MiscButtons';
import { useLocation } from 'react-router';
import { configAtom, gamePhaseAtom } from '../../../atoms/state';
import { GamePhase, TeacherDialogs, TeacherViews } from '../../../types';
import { useViewNavigation } from '../../../hooks/useViewNavigation';

interface GuidanceProps {
    single?: boolean; // For singleplayer tournaments
}

export default function Guidance({ single = false }: GuidanceProps) {
    const { t } = useTranslation('translation', { keyPrefix: 'sidePanel' });
    const { goToView } = useViewNavigation();
    const [currentSelected, setCurrentSelected] = useAtom(gamePhaseAtom);
    const stepRefs = useRef<Record<number, HTMLLIElement | null>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);

    const setConfig = useSetAtom(configAtom);
    const location = useLocation();
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

    // Autoscroll to phase
    useEffect(() => {
        const el = stepRefs.current[currentSelected];
        if (!el) return;

        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [currentSelected]);

    const data: { index: number; title: string; view: TeacherViews }[] = single
        ? [
              { index: 1, title: t('teacher.1.title'), view: 'users' },
              { index: 2, title: t('teacher.4.title'), view: 'tournamentPlay' },
          ]
        : [
              { index: 1, title: t('teacher.1.title'), view: 'users' },
              { index: 2, title: t('teacher.2.title'), view: 'levels' },
              { index: 3, title: t('teacher.3.title'), view: 'tournamentBuild' },
              { index: 4, title: t('teacher.4.title'), view: 'tournamentPlay' },
              { index: 5, title: t('teacher.5.title'), view: 'recap' },
          ];

    // Sync URL view parameter to currentSelected step
    useEffect(() => {
        const viewParam = params.get('view');
        if (viewParam) {
            const matchingStep = {
                connect: 1,
                select: 2,
                explore: 3,
                heatmap: 4,
                data: 5,
                results: 6,
                ready: 7,
            }[viewParam as string];

            if (matchingStep && matchingStep !== currentSelected) {
                setCurrentSelected(matchingStep);
            }
        }
    }, [location.search, currentSelected, setCurrentSelected, params]);

    const handleStepChage = (selectedStep: { index: number; title: string; view: TeacherDialogs | TeacherViews }) => {
        let phase: GamePhase | null = null;
        switch (selectedStep.index) {
            case 1: {
                goToView({
                    main: 'users',
                    sub: null,
                    overlay: 'share',
                });
                break;
            }

            case 2: {
                if (single) {
                    goToView({
                        main: 'tournamentPlay',
                        sub: null,
                        overlay: null,
                    });
                    phase = 'tournamentPlay';
                    break;
                }
                goToView({
                    main: 'levels',
                    sub: null,
                    overlay: null,
                });
                phase = 'levels';
                break;
            }

            case 3: {
                goToView({
                    main: 'tournamentBuild',
                    sub: null,
                    overlay: null,
                });
                phase = 'tournamentBuild';
                break;
            }

            case 4: {
                goToView({
                    main: 'tournamentPlay',
                    sub: null,
                    overlay: null,
                });
                phase = 'tournamentPlay';
                break;
            }

            case 5: {
                goToView({
                    main: 'recap',
                    sub: null,
                    overlay: null,
                });
                phase = 'recap';
                break;
            }

            default:
                return;
        }
        if (phase !== null) {
            setConfig((old) => {
                return {
                    ...old,
                    phase: phase,
                };
            });
        }
    };

    return (
        <nav
            className={style.container}
            data-testid="guidance"
        >
            <div style={{ marginTop: '0.5rem' }}></div>
            <div style={{ flexGrow: 1 }}></div>
            <div
                className={style.stepsContainer}
                ref={containerRef}
            >
                <MenuList>
                    {data.map((step) => (
                        <MenuItem
                            selected={step.index === currentSelected}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                },
                            }}
                            onClick={() => {
                                setCurrentSelected(step.index);
                                handleStepChage(step);
                            }}
                            key={step.index}
                            component="li"
                            ref={(el) => {
                                stepRefs.current[step.index] = el;
                            }}
                        >
                            <p className={style.guidanceTitle}>
                                {step.index}. {step.title}
                            </p>
                        </MenuItem>
                    ))}
                </MenuList>
            </div>

            <ActionButtons single={single} />
            <div style={{ flexGrow: 1 }}></div>
            <MiscButtons />
        </nav>
    );
}
