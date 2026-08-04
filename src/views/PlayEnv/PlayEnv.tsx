import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import Phase from '../Frontpage/Phase';
import GameDialog from '../../components/ImportDialog/GameImport/GameDialog';
import SelectorItem from '../Story/Selectors/SelectorItem';
import { useSetAtom, useStore } from 'jotai';
import {
    ActiveViewAtom,
    ControlEnablerAtom,
    HUDvisAtom,
    StoryProgressAtom,
    StoryStepAtom,
    TileVisibilityAtom,
    UiHelpAtom,
} from '../../atoms/uiState';
import { applyLoadedGame, readSavedFile } from '../../utils/import';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { playControls, playHudyVis, playStoryProgress, playUIHelp, playVisibleTiles } from '../../utils/defaults';
import { ActiveEnvironmentAtom } from '../../atoms/state';

export default function PlayEnv() {
    const { t } = useTranslation();
    const setActiveView = useSetAtom(ActiveViewAtom);
    const setStep = useSetAtom(StoryStepAtom);
    const setHud = useSetAtom(HUDvisAtom);
    const setStory = useSetAtom(StoryProgressAtom);
    const setTileVis = useSetAtom(TileVisibilityAtom);
    const setEnv = useSetAtom(ActiveEnvironmentAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const setUiHelp = useSetAtom(UiHelpAtom);
    const store = useStore();

    const handleImport = async (file: File) => {
        const loaded = await readSavedFile(file);
        applyLoadedGame(store, loaded);
        setStep(99);
        setHud(playHudyVis);
        setStory(playStoryProgress);
        setTileVis(playVisibleTiles);
        setControls(playControls);
    };

    return (
        <main className={style.siteContainer}>
            <GameDialog onImport={handleImport} />
            <h1>{t('playEnv.load.title')}</h1>
            <div className={style.selectGroup}>
                <div className={style.importButton}>
                    <SelectorItem
                        title={t('import.actions.loadGame')}
                        img={'images/environments/potsAndBurglar.png'}
                        onClick={() => {
                            setActiveView((old) => {
                                return { ...old, overlay: 'import' };
                            });
                        }}
                        selected={false}
                    >
                        {<FileUploadIcon fontSize="large" />}
                    </SelectorItem>
                </div>
                <div className={style.cards}>
                    <Phase
                        id="play"
                        image="images/environments/potsAndBurglar.png"
                        url="/play"
                        onClick={() => {
                            setEnv((old) => {
                                return { ...old, type: 'loaded' };
                            });
                            setUiHelp({ ...playUIHelp, mode: 'loaded' });
                        }}
                    />
                    <Phase
                        id="modify"
                        image="images/environments/potsAndBurglar.png"
                        url="/import"
                        onClick={() => {
                            setEnv((old) => {
                                return { ...old, type: 'modify' };
                            });
                            setUiHelp({ ...playUIHelp, mode: 'modify' });
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
