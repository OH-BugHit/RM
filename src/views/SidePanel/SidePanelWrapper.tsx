import { SidePanel } from '@genai-fi/base';
import CreateMenu from '../GameView/CreateMenu';
import { useAtom, useSetAtom, useStore } from 'jotai';
import { StoryProgressAtom, UiHelpAtom, SetupVisibleAtom } from '../../atoms/uiState';

// Not in use
export default function SidePanelWrapper() {
    const [, setSidePanelOpen] = useAtom(SetupVisibleAtom);
    const setUIHelper = useSetAtom(UiHelpAtom);
    const store = useStore();
    const setProgress = useSetAtom(StoryProgressAtom);

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

    return (
        <div>
            <SidePanel
                open={false} // sidePanelOpen.visible
                closeLabel="asdasd"
                onOpen={() =>
                    setSidePanelOpen((old) => {
                        return {
                            ...old,
                            visible: true,
                        };
                    })
                }
                position={'right'}
                onClose={() => {
                    storyProgressHelper();
                    setSidePanelOpen((old) => {
                        return {
                            ...old,
                            visible: false,
                        };
                    });
                }}
            >
                <CreateMenu />
            </SidePanel>
        </div>
    );
}
