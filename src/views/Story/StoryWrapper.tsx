import { useState } from 'react';
import Story from './Story';
import StoryStart from './StoryStart';
import style from './style.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import StoryGuidance from '../Guidance/StoryGuidance';
import Footer from '../Footer/Footer';
import AgentPreview from './SelectedStory/AgentPreview';
import SelectedObservation from './SelectedStory/SelectedObservation';
export default function StoryWrapper() {
    const [start, setStart] = useState(true);

    return (
        <AnimatePresence mode="wait">
            {start && (
                <motion.div
                    className={style.storyPage}
                    key="storyStart"
                    initial={{
                        opacity: 1,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{ duration: 0.6 }}
                >
                    <StoryStart setStart={setStart} />
                </motion.div>
            )}
            {!start && (
                <motion.div
                    className={style.storyPage}
                    key="story"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className={style.guideContainer}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        <StoryGuidance />
                    </motion.div>
                    <AnimatePresence>
                        <div className={style.columns}>
                            <div className={style.gameViewContainer}>
                                <h1>Your game</h1>
                                <AgentPreview />
                                <SelectedObservation />
                            </div>
                            <motion.div
                                className={style.storyPage}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <Story />
                            </motion.div>
                        </div>
                    </AnimatePresence>
                </motion.div>
            )}
            <Footer hideLang={false} />
        </AnimatePresence>
    );
}
