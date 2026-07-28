import { useAtom, useAtomValue, useSetAtom, useStore } from 'jotai';
import { SetupVisibleAtom, StoryProgressAtom, UiHelpAtom } from '../../../atoms/uiState';
import CreateMenu from '../../../views/GameView/CreateMenu';
import style from './style.module.css';
import { IconButton } from '@mui/material';
import Arrow from '../../HelperArrow/Arrow';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

export default function Overlay() {
    const [setup, setSetup] = useAtom(SetupVisibleAtom);
    const setUIHelper = useSetAtom(UiHelpAtom);
    const store = useStore();
    const setProgress = useSetAtom(StoryProgressAtom);
    const uiHelp = useAtomValue(UiHelpAtom);

    const storyProgressHelper = () => {
        setUIHelper((old) => {
            return {
                ...old,
                creativeClose: false,
            };
        });
        const progress = store.get(StoryProgressAtom);
        if (!progress.agent.closed && progress.agent.obsShape) {
            setProgress((old) => {
                return {
                    ...old,
                    agent: {
                        ...old.agent,
                        closed: true,
                    },
                };
            });
        }
        if (!progress.design.closed && progress.design.goal) {
            setProgress((old) => {
                return {
                    ...old,
                    design: {
                        ...old.design,
                        closed: true,
                    },
                };
            });
        }
        if (!progress.environment.closed && progress.environment.goalSet) {
            setProgress((old) => {
                return {
                    ...old,
                    environment: {
                        ...old.environment,
                        closed: true,
                    },
                };
            });
        }
        if (!progress.rewards.closed && progress.rewards.opened) {
            setProgress((old) => {
                return {
                    ...old,
                    rewards: {
                        ...old.rewards,
                        closed: true,
                    },
                };
            });
        }
        if (!progress.settings.closed && progress.environment.name) {
            setProgress((old) => {
                return {
                    ...old,
                    settings: {
                        ...old.settings,
                        closed: true,
                    },
                };
            });
        }
    };

    if (!setup.visible) return;
    return (
        <motion.div
            className={style.wrapper}
            key="menu"
            layout
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <IconButton
                className={style.closeButton}
                onClick={() => {
                    storyProgressHelper();
                    setSetup({ content: undefined, visible: false });
                }}
                size="large"
            >
                {uiHelp.creativeClose && (
                    <Arrow
                        position="fixed"
                        radius={90}
                        angle={185}
                    />
                )}
                <CloseIcon />
            </IconButton>
            <div className={style.container}>
                <CreateMenu />
            </div>
        </motion.div>
    );
}
