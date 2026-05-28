import { MenuItem, MenuList } from '@mui/material';
import style from './style.module.css';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { SubView } from '../../types';
import { StoryStepAtom } from '../../atoms/state';

export default function StoryGuidance() {
    const { t } = useTranslation();
    const [currentSelected, setCurrentSelected] = useAtom(StoryStepAtom);
    const stepRefs = useRef<Record<number, HTMLLIElement | null>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
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

    const data: { index: number; title: string; view: SubView }[] = [
        { index: 1, title: t('story.agents.title'), view: 'agent' },
        { index: 2, title: t('story.environment.title'), view: 'environment' },
        { index: 3, title: t('story.actions.title'), view: 'actions' },
        { index: 4, title: t('story.rewards.title'), view: 'rewards' },
    ];

    // Sync URL view parameter to currentSelected step
    useEffect(() => {
        const viewParam = params.get('subView');
        if (viewParam) {
            const matchingStep = {
                agent: 1,
                environment: 2,
                actions: 3,
                rewards: 4,
            }[viewParam as string];

            if (matchingStep && matchingStep !== currentSelected) {
                setCurrentSelected(matchingStep);
            }
        }
    }, [location.search, currentSelected, setCurrentSelected, params]);

    const handleStepChage = (selectedStep: { index: number; title: string; view: SubView }) => {
        switch (selectedStep.index) {
            case 1: {
                params.set('subView', 'agent');
                break;
            }
            case 2: {
                params.set('subView', 'environment');
                break;
            }
            case 3: {
                params.set('subView', 'actions');
                break;
            }
            case 4: {
                params.set('subView', 'rewards');
                break;
            }

            default:
                return;
        }
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    return (
        <nav
            className={style.container}
            data-testid="guidance"
        >
            <div style={{ marginTop: '0.5rem' }}></div>

            <div
                className={style.stepsContainer}
                ref={containerRef}
            >
                <MenuList>
                    {data.map((step) => (
                        <MenuItem
                            aria-current={step.index === currentSelected ? 'step' : undefined}
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
                            <p className={style.guidanceTitle}>{step.title}</p>
                        </MenuItem>
                    ))}
                </MenuList>
            </div>
        </nav>
    );
}
