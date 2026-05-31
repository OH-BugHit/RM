import style from './style.module.css';
import { useEffect, useRef, useMemo, useState } from 'react';
import ViewHandler from '../../components/ViewHandler';
import StoryGuidance from '../Guidance/StoryGuidance';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ActiveEnvironmentAtom, ActiveAgentAtom, StoryStepAtom } from '../../atoms/state';
import AgentSelector from './Selectors/AgentSelector';
import EnvironmentSelector from './Selectors/EnvironmentSelector';
import RewardsSelector from './Selectors/RewardsSelector';
import Footer from '../Footer/Footer';
import ThoughtBubble from '../../components/Bubbles/ThoughtBubble';
import ButtonBubble from '../../components/Bubbles/ButtonBubble';
import { useNavigate, useLocation } from 'react-router';
import { Agent, GameEnvironment } from '../../types';

export default function Story() {
    const { t } = useTranslation();
    const step = useAtomValue(StoryStepAtom);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const agentRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const environmentRef = useRef<HTMLDivElement>(null);
    const rewardsRef = useRef<HTMLDivElement>(null);

    const contentRef = useRef<HTMLDivElement>(null);
    const isManualScrollUpdateRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const [selectedAgent, setSelectedAgent] = useState<Agent>({ name: '', type: 'none' });
    const [selectedEnvironment, setSelectedEnvironment] = useAtom<GameEnvironment>(ActiveEnvironmentAtom);

    const setAgent = useSetAtom(ActiveAgentAtom);

    useEffect(() => {
        const map: { [key: number]: React.RefObject<HTMLDivElement | null> } = {
            1: agentRef,
            2: environmentRef,
            3: actionsRef,
            4: rewardsRef,
        };
        const ref = map[step];

        // Skip auto-scroll if this step change came from manual scrolling
        if (isManualScrollUpdateRef.current) {
            isManualScrollUpdateRef.current = false;
            return;
        }

        if (ref?.current && contentRef.current) {
            const container = contentRef.current;
            const element = ref.current;

            const y = element.offsetTop - 80; // guidance height

            container.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        }
    }, [step]);

    // Handle manual scroll events to update URL and guidance
    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Debounce scroll handler
            scrollTimeoutRef.current = setTimeout(() => {
                const scrollTop = container.scrollTop;
                const containerHeight = container.clientHeight;
                const centerViewport = scrollTop + containerHeight / 4;

                // Get all section positions
                const sections = [
                    { step: 1, ref: agentRef },
                    { step: 2, ref: environmentRef },
                    { step: 3, ref: actionsRef },
                    { step: 4, ref: rewardsRef },
                ];

                // Find which section is closest to the center of viewport
                let closestStep = step;
                let closestDistance = Infinity;

                for (const section of sections) {
                    const element = section.ref.current;
                    if (!element) continue;

                    const elementCenter = element.offsetTop + element.offsetHeight / 2;
                    const distance = Math.abs(elementCenter - centerViewport);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestStep = section.step;
                    }
                }

                // Update step and URL if it changed
                if (closestStep !== step) {
                    isManualScrollUpdateRef.current = true;
                    const viewMap: { [key: number]: string } = {
                        1: 'agent',
                        2: 'environment',
                        3: 'actions',
                        4: 'rewards',
                    };
                    const newParams = new URLSearchParams(params);
                    newParams.set('subView', viewMap[closestStep]);
                    navigate(`${location.pathname}?${newParams.toString()}`, { replace: false });
                }
            }, 200); // 300ms debounce
        };

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [step, navigate, location.pathname, params]);

    const goPlay = () => {
        setAgent(selectedAgent);
        navigate('/play');
    };

    return (
        <div className={style.storyPage}>
            <ViewHandler />
            <div className={style.guideContainer}>
                <StoryGuidance />
            </div>
            <div
                className={style.storyContent}
                ref={contentRef}
                tabIndex={-1}
            >
                <ThoughtBubble
                    ref={agentRef}
                    side="left"
                    text={t('story.bubbles.once')}
                />
                <ThoughtBubble
                    side="right"
                    text={t('story.bubbles.thereWas')}
                />
                <div className={style.content}>
                    <AgentSelector
                        selectedAgent={selectedAgent}
                        setSelectedAgent={setSelectedAgent}
                    />
                </div>
                <ThoughtBubble
                    ref={environmentRef}
                    side="left"
                    text={t('story.bubbles.seenAt')}
                    textComponents={{
                        AgentName: (
                            <p>
                                &nbsp;
                                {selectedAgent.name ? `${selectedAgent.name}-agent` : '...yet-to-be-named agent...'}
                                &nbsp;
                            </p>
                        ),
                    }}
                />
                <div className={style.content}>
                    <EnvironmentSelector
                        selectedEnvironment={selectedEnvironment}
                        setSelectedEnvironment={setSelectedEnvironment}
                        agentName={selectedAgent.name}
                    />
                </div>
                <ThoughtBubble
                    ref={actionsRef}
                    side="right"
                    text={t('story.bubbles.capable')}
                />
                <ThoughtBubble
                    ref={rewardsRef}
                    side="left"
                    text={t('story.bubbles.rewarded')}
                />
                <div className={style.content}>
                    <RewardsSelector />
                </div>
                <ThoughtBubble
                    side="right"
                    text={t('story.bubbles.end1')}
                />
                <ButtonBubble
                    side="center"
                    text={t('story.bubbles.goPlay')}
                    onClick={goPlay}
                />
            </div>

            <Footer hideLang={false} />
        </div>
    );
}
