import { SidePanel } from '@genai-fi/base';
import { SidePanelOpener } from '../../components/Buttons/SidePanelOpener';
import CreateMenu from '../GameView/CreateMenu';
import { useAtom, useSetAtom } from 'jotai';
import { StoryStepAtom, UiHelpAtom, UiShowSidePanelAtom } from '../../atoms/uiState';

export default function SidePanelWrapper() {
    const [sidePanelOpen, setSidePanelOpen] = useAtom(UiShowSidePanelAtom);
    const [uiHelp, setUIHelper] = useAtom(UiHelpAtom);
    const setStep = useSetAtom(StoryStepAtom);

    return (
        <div style={{ zIndex: 1000 }}>
            <SidePanelOpener />
            <SidePanel
                open={sidePanelOpen}
                closeLabel="asdasd"
                onOpen={() => setSidePanelOpen(true)}
                position={'right'}
                onClose={() => {
                    if (uiHelp.creativeClose) {
                        setStep((old) => old + 1);
                    }
                    setSidePanelOpen(false);
                    setUIHelper((old) => {
                        return {
                            ...old,
                            creativeClose: false,
                        };
                    });
                }}
            >
                <CreateMenu />
            </SidePanel>
        </div>
    );
}
