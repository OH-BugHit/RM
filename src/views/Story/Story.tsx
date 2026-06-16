import style from './style.module.css';
import ViewHandler from '../../components/ViewHandler';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../atoms/state';
import { ActiveViewAtom } from '../../atoms/uiState';
import RewardsSelector from './Selectors/RewardsSelector';
import ThoughtBubble from '../../components/Bubbles/ThoughtBubble';
import ButtonBubble from '../../components/Bubbles/ButtonBubble';
import { AnimatePresence, motion } from 'framer-motion';
import AgentIndex from './Selectors/AgentSelector/AgentIndex';
import ImportDialog from '../../components/ImportDialog/ImportDialog';
import EnvironmentIndex from './Selectors/EnvironmentSelector/EnvironmentIndex';
import { useNavigate } from 'react-router';

export default function Story() {
    const { t } = useTranslation();
    const activeView = useAtomValue(ActiveViewAtom);
    const navigate = useNavigate();
    const selectedAgent = useAtomValue(ActiveAgentAtom);

    const goPlay = () => {
        navigate('/play');
    };

    return (
        <>
            <ImportDialog />
            <AnimatePresence mode="wait">
                {activeView.sub === 'agent' && (
                    <motion.div
                        key="agent"
                        className={style.storyContent}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ThoughtBubble
                            side="left"
                            text={t('story.bubbles.once')}
                        />
                        <ThoughtBubble
                            side="right"
                            text={t('story.bubbles.thereWas')}
                        />
                        <div className={style.content}>
                            <AgentIndex />
                        </div>
                    </motion.div>
                )}

                {activeView.sub === 'environment' && (
                    <motion.div
                        key="environment"
                        className={style.storyContent}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ThoughtBubble
                            side="left"
                            text={t('story.bubbles.seenAt')}
                            textComponents={{
                                AgentName: (
                                    <p>
                                        &nbsp;
                                        {selectedAgent.name
                                            ? `${selectedAgent.name}-agent`
                                            : '...yet-to-be-named agent...'}
                                        &nbsp;
                                    </p>
                                ),
                            }}
                        />
                        <div className={style.content}>
                            <EnvironmentIndex />
                        </div>
                    </motion.div>
                )}

                {activeView.sub === 'rewards' && (
                    <motion.div
                        key="rewards"
                        className={style.storyContent}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ThoughtBubble
                            side="right"
                            text={t('story.bubbles.capable')}
                        />
                        <ThoughtBubble
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
                    </motion.div>
                )}
            </AnimatePresence>
            <ViewHandler />
        </>
    );
}
