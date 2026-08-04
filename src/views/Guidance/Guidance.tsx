import { MenuItem, MenuList } from '@mui/material';
import style from './style.module.css';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubView } from '../../types';

export default function Guidance() {
    const { t } = useTranslation();
    const stepRefs = useRef<Record<number, HTMLLIElement | null>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const [selected, setSelected] = useState<SubView>('agent');

    const data: { index: number; title: string; view: SubView }[] = [
        { index: 1, title: t('story.agents.title'), view: 'agent' },
        { index: 2, title: t('story.environment.title'), view: 'environment' },
        { index: 3, title: t('story.interaction.title'), view: 'interaction' },
    ];

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
                params.set('subView', 'interaction');
                break;
            }

            default:
                return;
        }
        setSelected(selectedStep.view);
        navigate(`${location.pathname}?${params.toString()}`, { replace: false });
    };

    return (
        <nav
            className={style.container}
            data-testid="guidance"
        >
            <div
                className={style.stepsContainer}
                ref={containerRef}
            >
                <MenuList>
                    {data.map((step) => (
                        <MenuItem
                            aria-current={step.view === selected ? 'step' : undefined}
                            selected={step.view === selected}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                },
                            }}
                            onClick={() => {
                                handleStepChage(step);
                            }}
                            key={step.index}
                            component="li"
                            ref={(el) => {
                                stepRefs.current[step.index] = el;
                            }}
                        >
                            <p>{step.title}</p>
                        </MenuItem>
                    ))}
                </MenuList>
            </div>
        </nav>
    );
}
