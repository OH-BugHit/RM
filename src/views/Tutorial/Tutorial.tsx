import style from './style.module.css';
import { useRef } from 'react';
import ViewHandler from '../../components/ViewHandler';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import ButtonBubble from '../../components/Bubbles/ButtonBubble';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { ActiveSubViewAtom } from '../../atoms/state';
import TutorialEnvironment from './TutorialEnvironment/TutorialEnvironment';
import { RLGridEnv } from '../Environments/PotsAndBurglar/environment';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, Agent, GameEnvironmentInfo, GenericObservation } from '../../types';

export default function Tutorial() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const activeStep = useAtomValue(ActiveSubViewAtom);

    const agent: Agent = { name: 'Tutorial Agent', type: 'robodog' };
    const envRef = useRef<RLGridEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);

    const goPlay = () => {
        navigate('/story?view=story');
    };

    //TODO: Think about uri stuff and viewhandler
    return (
        <div className={style.tutorialPage}>
            <ViewHandler />

            <div
                className={style.content}
                tabIndex={-1}
            >
                <h1>Tutorial</h1>
                <div className={style.tutorialContainer}>
                    <TutorialEnvironment
                        envRef={envRef}
                        agentRef={agentRef}
                        obsRef={obsRef}
                        actionRef={actionRef}
                        qvalueRef={qvalueRef}
                        infoRef={infoRef}
                        agent={agent}
                    />
                </div>
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
