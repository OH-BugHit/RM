import { useAtomValue, useSetAtom } from 'jotai';
import { CurrentTileToolAtom, DesignOpenAtom, TilePropsAtom } from '../../atoms/uiState';
import ContentContainer from './ContentContainer/ContentContainer';
import PropToolIcon from '../Story/Selectors/EnvironmentSelector/Prop/PropTool/PropToolIcon';
import { useEffect } from 'react';
import ChangeBackground from '../../components/Buttons/ChangeBackground/ChangeBackground';
import { useViewNavigation } from '../../hooks/useViewNavigation';
import { Target } from '../../types';

interface BuildToolsContentProps {
    open: boolean;
    scale: number;
    scaleWidth: number;
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
const VIEWPORT_MARGIN = 150;

function getToolTargets(
    baseTarget: { x: number; y: number },
    tileCount: number,
    toolWidth: number,
    toolHeight: number
): Target[] {
    if (tileCount === 0) {
        return [] as { type: 'cluster'; x: number; y: number }[];
    }

    const maxRows = Math.max(
        1,
        Math.floor((window.innerHeight - VIEWPORT_MARGIN * 2 + TOOL_SPACING_Y) / (toolHeight + TOOL_SPACING_Y))
    );

    return Array.from({ length: tileCount }, (_, index) => {
        const column = Math.floor(index / maxRows);
        const row = index % maxRows;
        const x = baseTarget.x - column * (toolWidth + TOOL_SPACING_X);
        const y = baseTarget.y + row * (toolHeight + TOOL_SPACING_Y);

        return { type: 'cluster', x, y };
    });
}

export default function BuildToolsContent({
    open,
    origin,
    baseTarget,
    scale,
    scaleWidth,
    clusterPosition,
}: BuildToolsContentProps) {
    const { goToView } = useViewNavigation();
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
    const targets = getToolTargets({ x: xT, y: yT }, tiles.length, TOOL_WIDTH * scaleWidth, TOOL_HEIGHT * scale);

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
                    size={scale * 140}
                    scale={scale}
                    scaleWidth={scaleWidth}
                    contentWidth={scaleWidth * 80}
                    contentHeight={scale * 110}
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
                scale={scale}
                scaleWidth={scaleWidth}
                contentWidth={scaleWidth * 350}
                contentHeight={scale * 110}
                background="build"
            >
                <ChangeBackground />
            </ContentContainer>
        </>
    );
}
