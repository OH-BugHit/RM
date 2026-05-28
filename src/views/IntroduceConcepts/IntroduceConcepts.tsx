import style from './style.module.css';
import { useRef } from 'react';
import ViewHandler from '../../components/ViewHandler';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import ButtonBubble from '../../components/Bubbles/ButtonBubble';
import { useNavigate } from 'react-router';
import Guidance from '../Guidance/Guidance';
import AgentC from './Concepts/AgentC';
import EnvironmentsC from './Concepts/EnvironmentC';
import InteractionC from './Concepts/RewardsC';
import { useAtomValue } from 'jotai';
import { ActiveSubViewAtom } from '../../atoms/state';

export default function IntroduceConcepts() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const activeStep = useAtomValue(ActiveSubViewAtom);

    const contentRef = useRef<HTMLDivElement>(null);

    const goPlay = () => {
        navigate('/story?view=story');
    };

    return (
        <div className={style.storyPage}>
            <ViewHandler />
            <div className={style.guideContainer}>
                <Guidance />
            </div>
            <div
                className={style.content}
                ref={contentRef}
                tabIndex={-1}
            >
                {activeStep === 'agent' && <AgentC />}
                {activeStep === 'environment' && <EnvironmentsC />}
                {activeStep === 'interaction' && <InteractionC />}
                {activeStep === 'interaction' && (
                    <ButtonBubble
                        side="center"
                        text={t('start.actions.goStory')}
                        onClick={goPlay}
                    />
                )}
            </div>

            <Footer hideLang={false} />
        </div>
    );
}
