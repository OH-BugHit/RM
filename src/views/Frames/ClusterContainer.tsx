import { IconButton } from '@mui/material';
import style from './cluster.module.css';
import React from 'react';
import ContentContainer from './ContentContainer/ContentContainer';
import { agentButtons } from '../../components/Buttons/agentButtonList';
import { rewardButtons } from '../../components/Buttons/rewardButtonList';
import getInspectButtons, { InspectButtonProps } from '../../components/Buttons/inspectButtonList';
import { getBuildButtons } from '../../components/Buttons/buildButtonList';
import useWindowSize from '../../hooks/useWindowSize';
import { useAtomValue } from 'jotai';
import { ClusterOpenAtom, HUDvisAtom } from '../../atoms/uiState';
import { useClusterOpenState } from './useClusterState';
import BuildToolsContent from './BuildToolsContent';

interface FrameContainerProps {
    position?: Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'>;
    direction?: 'column' | 'row';
    type: 'agent' | 'reward' | 'inspect' | 'build';
    vis?: boolean;
    width?: string;
    children: React.ReactNode;
    inspectButtonProps: InspectButtonProps;
}

const RADIUS = 160;

export default function ClusterContainer({ position, type, vis, children, inspectButtonProps }: FrameContainerProps) {
    const { openState, handleOpenClick } = useClusterOpenState(type);
    const hudVis = useAtomValue(HUDvisAtom);
    const clusterOpen = useAtomValue(ClusterOpenAtom);
    const windowSize = useWindowSize();

    const buttons =
        type === 'agent'
            ? agentButtons
            : type === 'reward'
              ? rewardButtons
              : type === 'inspect'
                ? getInspectButtons(inspectButtonProps, windowSize)
                : getBuildButtons(windowSize);

    const buildOpenState = type === 'build' ? (openState as import('../../types').BuildCluster) : undefined;

    return (
        <>
            {vis && (
                <div
                    style={{
                        ...(position && {
                            position: 'absolute',
                            ...position,
                        }),
                        zIndex: 21,
                    }}
                >
                    <div className={style.agentWrapper}>
                        {clusterOpen[type] && (
                            <>
                                {buttons.map((button) => {
                                    if (!hudVis[type]?.[button.id as keyof (typeof hudVis)[typeof type]]) return;
                                    const rad = (button.angle * Math.PI) / 180;

                                    const origin = {
                                        x: Math.cos(rad) * RADIUS,
                                        y: -Math.sin(rad) * RADIUS,
                                    };

                                    return (
                                        <React.Fragment key={button.id}>
                                            <IconButton
                                                className={`${style.action} ${style.actionPop}`}
                                                onClick={() => handleOpenClick(button.id)}
                                                style={{
                                                    left: `calc(50% + ${origin.x}px)`,
                                                    top: `calc(50% + ${origin.y}px)`,
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                            >
                                                {button.icon}
                                            </IconButton>

                                            {type === 'build' && button.id === 'tools' ? (
                                                <BuildToolsContent
                                                    open={buildOpenState?.tools ?? false}
                                                    origin={origin}
                                                    baseTarget={button.target}
                                                />
                                            ) : (
                                                <ContentContainer
                                                    open={openState[button.id as keyof typeof openState]}
                                                    unmountOnClose={type === 'inspect' ? false : true}
                                                    origin={origin}
                                                    contentWidth={button.size.w}
                                                    contentHeight={button.size.h}
                                                    background={type}
                                                    target={{
                                                        x: button.target.x,
                                                        y: button.target.y,
                                                    }}
                                                >
                                                    {button.content}
                                                </ContentContainer>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </>
                        )}

                        <div>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
}
