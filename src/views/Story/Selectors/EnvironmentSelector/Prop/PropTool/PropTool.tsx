import style from '../../../style.module.css';
import { useAtom, useAtomValue } from 'jotai';
import PropToolRow from './PropToolRow';
import { useEffect } from 'react';
import { PropToolAtom, TilePropsAtom } from '../../../../../../atoms/uiState';

export default function PropTool() {
    const tileProps = useAtomValue(TilePropsAtom);
    const [selectedTool, setSelectedTool] = useAtom(PropToolAtom);

    // De-select tool on unmount. Changing tiles is allowed only when PropTool is opened
    useEffect(() => {
        return () => {
            setSelectedTool(undefined);
        };
    }, [setSelectedTool]);

    return (
        <div className={style.toolWrapper}>
            {tileProps.map((tile) => (
                <PropToolRow
                    key={tile.id}
                    tile={tile}
                    selected={tile === selectedTool}
                />
            ))}
        </div>
    );
}
