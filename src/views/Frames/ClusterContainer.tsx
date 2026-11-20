import { IconButton } from '@mui/material';
import style from './cluster.module.css';
import React, { CSSProperties } from 'react';
import ContentContainer from './ContentContainer/ContentContainer';
import { getAgentButtons } from '../../components/Buttons/agentButtonList';
import { getRewardButtons } from '../../components/Buttons/rewardButtonList';
import getInspectButtons, { InspectButtonProps } from '../../components/Buttons/inspectButtonList';
import { getBuildButtons } from '../../components/Buttons/buildButtonList';
import { useAtomValue } from 'jotai';
import { BuildCAtom, ClusterOpenAtom, HUDvisAtom, RewardCAtom } from '../../atoms/uiState';
import { useClusterOpenState } from './useClusterState';
import BuildToolsContent from './BuildToolsContent';
import { useGameScale } from '../../context/GameScale/useGameScale';
import Dismissible from '../../utils/Dismissible';
import CloseIcon from '../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';

interface FrameContainerProps {
    position: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
    direction?: 'column' | 'row';
    type: 'agent' | 'reward' | 'inspect' | 'build';
    vis?: boolean;
    width?: string;
    children: React.ReactNode;
    inspectButtonProps: InspectButtonProps;
}

export default function ClusterContainer({ position, type, vis, children, inspectButtonProps }: FrameContainerProps) {
    const { s, scale, scaleWidth } = useGameScale();
    const { openState, handleOpenClick } = useClusterOpenState(type);
    const rewardC = useAtomValue(RewardCAtom);
    const buildC = useAtomValue(BuildCAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    const clusterOpen = useAtomValue(ClusterOpenAtom);
    const RADIUS = 160;

    const buttons =
        type === 'agent'
            ? getAgentButtons(scale, scaleWidth)
            : type === 'reward'
              ? getRewardButtons(scale, scaleWidth)
              : type === 'inspect'
                ? getInspectButtons(inspectButtonProps, scale)
                : getBuildButtons(scale, scaleWidth);

    const buildOpenState = type === 'build' ? (openState as import('../../types').BuildCluster) : undefined;

    const getPosition = (): CSSProperties => {
        switch (position) {
            case 'topLeft':
                return { top: 0, left: 0 };
            case 'topRight':
                return { top: 0, right: 0 };
            case 'bottomLeft':
                return { bottom: 0, left: 0 };
            case 'bottomRight':
                return { bottom: 0, right: 0 };
        }
    };

    const getClusterPosition = () => {
        const clusterHalfSize = s(220) / 2;

        switch (position) {
            case 'topLeft':
                return { x: clusterHalfSize, y: clusterHalfSize };
            case 'topRight':
                return { x: window.innerWidth - clusterHalfSize, y: clusterHalfSize };
            case 'bottomLeft':
                return { x: clusterHalfSize, y: window.innerHeight - clusterHalfSize };
            case 'bottomRight':
                return { x: window.innerWidth - clusterHalfSize, y: window.innerHeight - clusterHalfSize };
        }
    };

    if (type === 'build' && rewardC.props) return;
    if (type === 'reward' && buildC.tools) return;

    return (
        <>
            {vis && (
                <div
                    className={style.agentWrapper}
                    style={{
                        position: 'absolute',
                        ...getPosition(),
                        width: s(220),
                        height: s(220),
                        zIndex: 21,
                    }}
                >
                    <div>{children}</div>
                    {clusterOpen[type] && (
                        <>
                            {buttons.map((button) => {
                                if (!hudVis[type]?.[button.id as keyof (typeof hudVis)[typeof type]]) return;
                                const rad = (button.angle * Math.PI) / 180;

                                const origin = {
                                    x: s(Math.cos(rad) * RADIUS),
                                    y: s(-Math.sin(rad) * RADIUS),
                                };

                                return (
                                    <React.Fragment key={button.id}>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: `calc(50% + ${origin.x}px)`,
                                                top: `calc(50% + ${origin.y}px)`,
                                                width: s(140),
                                                height: s(140),
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 21,
                                            }}
                                        >
                                            <IconButton
                                                data-dismissible-exclude
                                                className={style.actionButton}
                                                style={{ width: `${s(140)}px`, height: `${s(140)}px` }}
                                                onClick={() => handleOpenClick(button.id)}
                                            >
                                                <div style={{ position: 'absolute', inset: 0 }}>{button.icon}</div>

                                                {openState[button.id as keyof typeof openState] && (
                                                    <div style={{ position: 'absolute', inset: 0 }}>
                                                        <CloseIcon
                                                            size={s(140)}
                                                            type="red"
                                                        />
                                                    </div>
                                                )}
                                            </IconButton>
                                        </div>

                                        {type === 'build' && button.id === 'tools' ? (
                                            <BuildToolsContent
                                                open={buildOpenState?.tools ?? false}
                                                origin={origin}
                                                baseTarget={button.target}
                                                clusterPosition={getClusterPosition()}
                                            />
                                        ) : (
                                            <ContentContainer
                                                open={openState[button.id as keyof typeof openState]}
                                                unmountOnClose={type === 'inspect' ? false : true}
                                                origin={origin}
                                                clusterPosition={getClusterPosition()}
                                                background={type}
                                                size={s(140)}
                                                contentWidth={button.size.w}
                                                contentHeight={button.size.h}
                                                target={button.target}
                                            >
                                                {button.content && (
                                                    <Dismissible
                                                        open={openState[button.id as keyof typeof openState]}
                                                        onClose={() => handleOpenClick(button.id)}
                                                    >
                                                        {button.content}
                                                    </Dismissible>
                                                )}
                                            </ContentContainer>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
