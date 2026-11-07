import style from './style.module.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { TileSizeAtom, TopbarAtom } from '../../../atoms/uiState';
import { useTranslation } from 'react-i18next';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { IconButton } from '@mui/material';

export default function Score() {
    const { t } = useTranslation();
    const { s } = useGameScale();
    const state = useAtomValue(TopbarAtom);
    const setTileSize = useSetAtom(TileSizeAtom);

    return (
        <div
            className={style.itemContainerRight}
            style={{ fontSize: `${s(2.5)}rem` }}
        >
            {/* This used to show the score to beat. It might be useful but now it is removed
            <div className={style.itemElement}>
                <b>{t('topBar.score.toBeat')}</b>
                <b className={style.toBeat}>{state.toBeat}</b>
            </div>
            */}
            <div className={style.itemElement}>
                <b>{t('topBar.score.top')}</b>
                <b className={style.topScore}>{state.topScore}</b>
            </div>
            <div className={style.zoom}>
                <IconButton
                    style={{ width: '30px', padding: 0, margin: 0 }}
                    onClick={() =>
                        setTileSize((old) => {
                            return old + 4;
                        })
                    }
                >
                    <ZoomInIcon fontSize="large" />
                </IconButton>
                <IconButton
                    style={{ width: '30px', padding: 0, margin: 0 }}
                    onClick={() =>
                        setTileSize((old) => {
                            return old - 4;
                        })
                    }
                >
                    <ZoomOutIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    );
}
