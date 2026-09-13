import { useAtomValue, useSetAtom } from 'jotai';
import { CurrentTileToolAtom, DesignOpenAtom, TilePropsAtom } from '../../atoms/uiState';
import ContentContainer from './ContentContainer/ContentContainer';
import PropToolIcon from '../Story/Selectors/EnvironmentSelector/Prop/PropTool/PropToolIcon';
import { useEffect } from 'react';
import ChangeBackground from '../../components/Buttons/ChangeBackground/ChangeBackground';
import { useViewNavigation } from '../../hooks/useViewNavigation';
import { Target } from '../../types';
import { useGameScale } from '../../context/GameScale/useGameScale';

interface BuildToolsContentProps {
    open: boolean;
    origin: {
        x: number;
        y: number;
    };
    clusterPosition: {
        x: number;
        y: number;
    };
    baseTarget: Target;
}

const TOOL_WIDTH = 120;
const TOOL_HEIGHT = 120;
const TOOL_SPACING_X = 44;
const TOOL_SPACING_Y = 0;
const VIEWPORT_MARGIN = 90;

function getToolTargets(
    baseTarget: { x: number; y: number },
    tileCount: number,
    toolWidth: number,
    toolHeight: number,
    clusterPosition: { x: number; y: number },
    contentHeight: number
): Target[] {
    if (tileCount === 0) {
        return [] as { type: 'cluster'; x: number; y: number }[];
    }

    const maxRows = Math.max(
        1,
        Math.floor((window.innerHeight - VIEWPORT_MARGIN * 2 + TOOL_SPACING_Y) / (toolHeight + TOOL_SPACING_Y))
    );
    const firstRowY = Math.max(baseTarget.y, 20 + contentHeight / 2 - clusterPosition.y);

    return Array.from({ length: tileCount }, (_, index) => {
        const column = Math.floor(index / maxRows);
        const row = index % maxRows;
        const x = baseTarget.x - column * (toolWidth + TOOL_SPACING_X);
        const y = firstRowY + row * (toolHeight + TOOL_SPACING_Y);

        return { type: 'cluster', x, y };
    });
}

export default function BuildToolsContent({ open, origin, baseTarget, clusterPosition }: BuildToolsContentProps) {
    const { goToView } = useViewNavigation();
    const { s, scale, scaleWidth } = useGameScale();
    const tiles = useAtomValue(TilePropsAtom);
    const selectedTool = useAtomValue(CurrentTileToolAtom);
    const setDesignOpen = useSetAtom(DesignOpenAtom);

    useEffect(() => {
        setDesignOpen(true);
        if (!open) {
            goToView({ overlay: null });
        }
        return () => {
            setDesignOpen(false);
        };
    }, [setDesignOpen, goToView, open]);

    if (!open) return null;
    if (baseTarget.type !== 'cluster') return;
    const xT = baseTarget.x;
    const yT = baseTarget.y;
    const toolContentHeight = scale * 110;
    const targets = getToolTargets(
        { x: xT, y: yT },
        tiles.length,
        TOOL_WIDTH * scaleWidth,
        TOOL_HEIGHT * scale,
        clusterPosition,
        toolContentHeight
    );

    return (
        <>
            {tiles.map((tile, index) => (
                <ContentContainer
                    key={tile.id}
                    unmountOnClose={true}
                    clusterPosition={clusterPosition}
                    open={open}
                    origin={origin}
                    target={targets[index] ?? { type: 'cluster', x: 0, y: 0 }}
                    delay={index * 60}
                    size={s(140)}
                    contentWidth={scaleWidth * 80}
                    contentHeight={toolContentHeight}
                    background="build"
                >
                    <PropToolIcon
                        tile={tile}
                        size={Math.min(48, 64 * scale)}
                        selected={tile === selectedTool}
                    />
                </ContentContainer>
            ))}
            <ContentContainer
                key={'background'}
                unmountOnClose={true}
                clusterPosition={clusterPosition}
                open={open}
                origin={origin}
                target={{ type: 'cluster', x: scaleWidth * -500, y: 0 }}
                delay={200}
                size={s(140)}
                contentWidth={scaleWidth * 350}
                contentHeight={scale * 110}
                background="build"
            >
                <ChangeBackground />
            </ContentContainer>
        </>
    );
}
