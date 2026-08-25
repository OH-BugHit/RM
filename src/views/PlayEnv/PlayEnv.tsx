import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import GameDialog from '../../components/ImportDialog/GameImport/GameDialog';
import SelectorItem from '../Story/Selectors/SelectorItem';
import { useSetAtom, useStore } from 'jotai';
import {
    ControlEnablerAtom,
    HUDvisAtom,
    StoryProgressAtom,
    TextStepAtom,
    TilePropsAtom,
    TileVisibilityAtom,
    UiHelpAtom,
} from '../../atoms/uiState';
import { applyLoadedGame, readSavedFile } from '../../utils/import';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { playControls, playHudVis, playStoryProgress, playUIHelp, playVisibleTiles } from '../../utils/defaults';
import { ActiveEnvironmentAtom } from '../../atoms/state';
import { useViewNavigation } from '../../hooks/useViewNavigation';
import { useState } from 'react';
import { renderWorldPreview } from '../../components/EnvironmentRender/renderWorldPreview';
import LevelPreview from '../../components/ImportDialog/LevelPreview/LevelPreview';

export default function PlayEnv() {
    const { t } = useTranslation();
    const setStep = useSetAtom(TextStepAtom);
    const setHud = useSetAtom(HUDvisAtom);
    const setStory = useSetAtom(StoryProgressAtom);
    const setTileVis = useSetAtom(TileVisibilityAtom);
    const setEnv = useSetAtom(ActiveEnvironmentAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const setUiHelp = useSetAtom(UiHelpAtom);
    const { goToView } = useViewNavigation();
    const store = useStore();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [selectedGameName, setSelectedGameName] = useState('');
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
    const setTileTools = useSetAtom(TilePropsAtom);

    const handleImport = async (file: File) => {
        const loaded = await readSavedFile(file);
        const canvas = await renderWorldPreview(loaded.game.world);
        const previewUrl = canvas.toDataURL();
        applyLoadedGame(store, loaded);
        setStep(99);
        setHud(playHudVis);
        setStory(playStoryProgress);
        setTileVis(playVisibleTiles);
        setControls(playControls);
        setLoaded(true);
        setSelectedGameName(loaded.manifest.gameName);
        setSelectedPreview(previewUrl);
    };

    return (
        <main className={style.siteContainer}>
            <GameDialog onImport={handleImport} />
            <h1>{t('playEnv.load.title')}</h1>
            <div className={style.selectGroup}>
                <div className={style.import}>
                    <SelectorItem
                        title={t('import.actions.loadGame')}
                        onClick={() => {
                            goToView({
                                overlay: 'import',
                            });
                        }}
                        selected={false}
                    >
                        {
                            <FileUploadIcon
                                fontSize="large"
                                sx={{ width: 128, height: 128 }}
                            />
                        }
                    </SelectorItem>
                    <SelectorItem
                        title={t('import.actions.playLoaded')}
                        disabled={!loaded}
                        onClick={() => {
                            setEnv((old) => {
                                return { ...old, type: 'loaded' };
                            });
                            setUiHelp({ ...playUIHelp, mode: 'loaded' });
                            goToView({
                                main: 'play',
                            });
                        }}
                    >
                        <LevelPreview
                            gameName={selectedGameName}
                            preview={selectedPreview}
                        />
                    </SelectorItem>
                </div>
                <div className={style.cards}>
                    <SelectorItem
                        title={t('import.actions.createNew')}
                        img={'/images/environments/potsAndBurglar.png'}
                        onClick={() => {
                            setEnv((old) => {
                                return { ...old, type: 'modify' };
                            });
                            setUiHelp({ ...playUIHelp, mode: 'modify' });
                            setTileTools([]);
                            goToView({
                                main: 'build',
                            });
                        }}
                    ></SelectorItem>
                </div>
            </div>
        </main>
    );
}
