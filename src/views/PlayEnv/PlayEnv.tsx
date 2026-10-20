import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import GameDialog from '../../components/Dialogs/GameImport/GameDialog';
import AddIcon from '@mui/icons-material/Add';
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
import LevelPreview from '../../components/Dialogs/LevelPreview/LevelPreview';
import { useGameScale } from '../../context/GameScale/useGameScale';
import { Button } from '@genai-fi/base';

export default function PlayEnv() {
    const { s } = useGameScale();
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
                        <FileUploadIcon
                            fontSize="large"
                            sx={{ width: s(128), height: s(128) }}
                        />
                    </SelectorItem>
                    <div className={style.cards}>
                        <SelectorItem
                            title={t('import.actions.createNew')}
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
                        >
                            <AddIcon
                                fontSize="large"
                                sx={{ width: s(128), height: s(128) }}
                            />
                        </SelectorItem>
                    </div>
                </div>
                {loaded && (
                    <>
                        <h3>{t('import.actions.playLoaded')}</h3>

                        <LevelPreview
                            gameName={selectedGameName}
                            preview={selectedPreview}
                            size={s(96)}
                        />
                        <div className={style.buttons}>
                            <Button variant="outlined">Modify</Button>
                            <Button
                                variant="contained"
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
                                Play
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
