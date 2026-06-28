import style from '../style.module.css';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import { PropToolAtom } from '../../../../../../atoms/uiState';
import { TileDefinition } from '../../../../../../types';

interface PropRowProps {
    tile: TileDefinition;
    selected?: boolean;
}
export default function PropToolRow({ tile, selected }: PropRowProps) {
    const { t } = useTranslation();
    const setSelected = useSetAtom(PropToolAtom);
    return (
        <Button
            className={`${style.row} ${selected ? style.selectedButton : style.notSelectedButton}`}
            onClick={() => {
                setSelected(tile);
            }}
        >
            <b>Type: {t(`common.cell.${tile.type}`)}</b>
            <b>Name: {tile.name}</b>
            <img
                src={tile.image}
                width={64}
                height={64}
            />
        </Button>
    );
}
