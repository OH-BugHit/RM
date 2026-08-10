import { useAtomValue, useSetAtom } from 'jotai';
import { CurrentTileToolAtom, DesignOpenAtom, TilePropsAtom } from '../../atoms/uiState';
import ContentContainer from './ContentContainer/ContentContainer';
import PropToolIcon from '../Story/Selectors/EnvironmentSelector/Prop/PropTool/PropToolIcon';
import { useEffect } from 'react';

interface BuildToolsContentProps {
    open: boolean;
    origin: {
        x: number;
        y: number;
    };
    baseTarget: {
        x: number;
        y: number;
    };
}

const TOOL_WIDTH = 120;
const TOOL_HEIGHT = 120;
const TOOL_SPACING_X = 44;
const TOOL_SPACING_Y = 0;
const VIEWPORT_MARGIN = 300;

function getToolTargets(baseTarget: { x: number; y: number }, tileCount: number) {
    if (tileCount === 0) {
        return [] as { x: number; y: number }[];
    }

    const maxRows = Math.max(
        1,
        Math.floor((window.innerHeight - VIEWPORT_MARGIN * 2 + TOOL_SPACING_Y) / (TOOL_HEIGHT + TOOL_SPACING_Y))
    );

    return Array.from({ length: tileCount }, (_, index) => {
        const column = Math.floor(index / maxRows);
        const row = index % maxRows;
        const x = baseTarget.x - column * (TOOL_WIDTH + TOOL_SPACING_X);
        const y = baseTarget.y + row * (TOOL_HEIGHT + TOOL_SPACING_Y);

        return { x, y };
    });
}

export default function BuildToolsContent({ open, origin, baseTarget }: BuildToolsContentProps) {
    const tiles = useAtomValue(TilePropsAtom);
    const selectedTool = useAtomValue(CurrentTileToolAtom);
    const targets = getToolTargets(baseTarget, tiles.length);
    const setDesignOpen = useSetAtom(DesignOpenAtom);

    useEffect(() => {
        setDesignOpen(true);
        return () => {
            setDesignOpen(false);
        };
    }, [setDesignOpen]);

    if (!open) return null;

    return (
        <>
            {tiles.map((tile, index) => (
                <ContentContainer
                    key={tile.id}
                    unmountOnClose={true}
                    open={open}
                    origin={origin}
                    target={targets[index] ?? { x: 0, y: 0 }}
                    delay={index * 60}
                    contentWidth={80}
                    contentHeight={110}
                    background="build"
                >
                    <PropToolIcon
                        tile={tile}
                        selected={tile === selectedTool}
                    />
                </ContentContainer>
            ))}
        </>
    );
}
