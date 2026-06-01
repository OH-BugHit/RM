import style from './style.module.css';
import { useRef, useState } from 'react';
import ViewHandler from '../../components/ViewHandler';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import ButtonBubble from '../../components/Bubbles/ButtonBubble';
import { useNavigate } from 'react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { AgentSettingsAtom, AudioSettingsAtom, GameControlAtom, TutorialPhaseAtom } from '../../atoms/state';
import TutorialEnvironment from './TutorialEnvironment/TutorialEnvironment';
import { RLGridEnv } from '../Environments/PotsAndBurglar/environment';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, Agent, GameEnvironmentInfo, GenericObservation } from '../../types';
import { defaultAgentSettings, defaultControls, defaultAudioSettings } from '../../utils/defaults';
import { AnimatePresence, motion } from 'framer-motion';
import TutorialConcepts from './TutorialConcepts/TutorialConcepts';
import TaskCompletion from './TaskCompletion/TaskCompletion';
import Recap from './Recap/Recap';
import ReplayTutorial from './ReplayTutorial';
import Quiz from './Quiz/Quiz';

export default function Tutorial() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const activeStep = useAtomValue(TutorialPhaseAtom);
    const agent: Agent = { name: 'Tutorial Agent', type: 'robodog' };
    const envRef = useRef<RLGridEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);
    const setControls = useSetAtom(GameControlAtom);
    const setAgentSettings = useSetAtom(AgentSettingsAtom);
    const [visitedRewards, setVisitedRewards] = useState({ win: false, pot: false, barkFail: false });
    const [showRecap, setShowRecap] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const setSoundSettings = useSetAtom(AudioSettingsAtom);

    const handleClick = () => {
        switch (activeStep) {
            case 'startRecap': {
                setSoundSettings({ volume: 0 });
                setShowRecap(true);
                break;
            }
            case 'startQuiz': {
                setShowQuiz(true);
                setControls(defaultControls);
                break;
            }
            case 'ready': {
                setAgentSettings(defaultAgentSettings);
                setSoundSettings(defaultAudioSettings);
                navigate('/story?view=story');
                break;
            }

            default:
                return null;
        }
    };

    //TODO: Think about uri stuff and viewhandler
    return (
        <main className={style.tutorialPage}>
            <ViewHandler />
            <h1 style={{ marginBlockEnd: '0em' }}>Tutorial</h1>
            <div className={style.content}>
                <div className={style.tutorialContainer}>
                    <div className={style.tutorialContent}>
                        <ReplayTutorial />
                        <TutorialConcepts />
                        <AnimatePresence mode="popLayout">
                            {showRecap && (
                                <motion.div
                                    key="recap"
                                    layout
                                    initial={{
                                        x: -300,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Recap />
                                </motion.div>
                            )}
                            {showQuiz && (
                                <motion.div
                                    key="quiz"
                                    layout
                                    initial={{
                                        x: -300,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        x: 300,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Quiz />
                                </motion.div>
                            )}
                            {!showQuiz && (
                                <motion.div
                                    key="environment"
                                    layout
                                    exit={{
                                        x: 300,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <TutorialEnvironment
                                        envRef={envRef}
                                        agentRef={agentRef}
                                        obsRef={obsRef}
                                        actionRef={actionRef}
                                        qvalueRef={qvalueRef}
                                        infoRef={infoRef}
                                        agent={agent}
                                        visitedRewards={visitedRewards}
                                        setVisitedRewards={setVisitedRewards}
                                    />
                                </motion.div>
                            )}
                            {!showRecap && (
                                <motion.div
                                    key="tasks"
                                    layout
                                    exit={{
                                        x: 300,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <TaskCompletion visitedRewards={visitedRewards} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <motion.div
                    className={style.buttonContainer}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity:
                            activeStep !== 'ready'
                                ? activeStep !== 'startRecap'
                                    ? activeStep !== 'startQuiz'
                                        ? 0
                                        : 1
                                    : 1
                                : 1,
                    }}
                    transition={{
                        opacity: { duration: 0.3 },
                    }}
                >
                    <ButtonBubble
                        side="center"
                        text={
                            activeStep === 'ready'
                                ? t('tutorial.actions.goStory')
                                : activeStep === 'startRecap'
                                  ? t('tutorial.actions.recap')
                                  : t('tutorial.actions.quiz')
                        }
                        onClick={handleClick}
                    />
                </motion.div>
            </div>

            <Footer hideLang={false} />
        </main>
    );
}
