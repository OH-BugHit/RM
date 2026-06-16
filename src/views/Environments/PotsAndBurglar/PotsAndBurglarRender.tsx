import style from './style.module.css';
import { useAtomValue } from 'jotai';
import Burglar from '../../../components/GameComponents/Burglar';
import RewardFloats from '../../../components/RewardFloats.tsx/RewardFloats';
import { SixthSenseDirection } from '../../../types';
import { motion } from 'framer-motion';
import { ActiveAgentAtom, GameControlAtom } from '../../../atoms/state';
import { RLGridEnv } from './environment';
import { FacingAtom } from '../../../atoms/gameState';
import { FloatItem } from '../../../hooks/useRewardFloats';
import { getOnSightOrOnSpot } from '../../../components/GameComponents/drawComponent';
const fadeStyle = {
    transition: 'opacity 0.4s ease, background-color 0.15s linear',
};

interface RenderProps {
    gridSize: number;
    env: RLGridEnv | undefined;
    floatItems: FloatItem[];
    deactivate: (id: number) => void;
}
export default function PotsAndBurglarRender({ gridSize, env, floatItems, deactivate }: RenderProps) {
    const controls = useAtomValue(GameControlAtom);
    const facing = useAtomValue(FacingAtom);
    const agent = useAtomValue(ActiveAgentAtom);

    if (!env) return null;

    return (
        <div className={style.renderGrid}>
            <div />
            <Burglar direction={SixthSenseDirection.North} />
            <div />
            <Burglar direction={SixthSenseDirection.West} />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 40px)`,
                }}
            >
                {!controls.isFast && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            zIndex: 20,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                        }}
                        animate={{
                            x: env.position.x * 40,
                            y: env.position.y * 40,
                        }}
                    >
                        <div style={{ position: 'relative' }}>
                            <motion.img
                                src={agent.img}
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                                animate={{
                                    scaleX: facing ?? 1,
                                }}
                            />
                        </div>
                    </motion.div>
                )}
                <RewardFloats
                    items={floatItems}
                    cellSize={40}
                    onComplete={deactivate}
                />
                {Array.from({ length: gridSize }).map((_, y) =>
                    Array.from({ length: gridSize }).map((_, x) => {
                        let bg = 'lightgray';
                        const isEdge = x === 0 || y === 0 || x === gridSize - 1 || y === gridSize - 1;
                        const onSight = getOnSightOrOnSpot({
                            agentPos: env.position,
                            x: x,
                            y: y,
                            agentType: agent.type,
                        });

                        if (controls.isFast) {
                            if (env.position.x === x && env.position.y === y)
                                return (
                                    <img
                                        key={`${x}-${y}`}
                                        src={agent.img}
                                        width={40}
                                        style={{
                                            overflow: 'visible',
                                            width: 40,
                                            height: 40,
                                            border: '1px solid black',
                                            background: 'white',
                                            zIndex: 10,
                                        }}
                                    />
                                );
                        }
                        if (isEdge) {
                            return (
                                <img
                                    key={`${x}-${y}`}
                                    src="/images/assets/wall.png"
                                    width={40}
                                    height={40}
                                    style={{
                                        border: '1px solid black',
                                    }}
                                />
                            );
                        }

                        if (env.flower_pots.find((r) => r.intact && r.x === x && r.y === y)) bg = 'green';
                        else if (env.flower_pots.find((r) => !r.intact && r.x === x && r.y === y)) bg = 'brown';

                        if (onSight) {
                            if (bg === 'green')
                                return (
                                    <img
                                        key={`${x}-${y}`}
                                        src="/images/assets/pot_intact.png"
                                        width={40}
                                        style={{
                                            overflow: 'visible',
                                            width: 40,
                                            height: 40,
                                            border: '1px solid black',
                                            background: 'white',

                                            ...fadeStyle,
                                        }}
                                    />
                                );
                            if (bg === 'brown')
                                return (
                                    <img
                                        key={`${x}-${y}`}
                                        src="/images/assets/pot_broken.png"
                                        width={40}
                                        style={{
                                            overflow: 'visible',
                                            width: 40,
                                            height: 40,
                                            border: '1px solid black',
                                            background: onSight ? 'white' : 'lightgrey',

                                            ...fadeStyle,
                                        }}
                                    />
                                );
                            return (
                                <div
                                    key={`${x}-${y}`}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        border: '1px solid black',
                                        background: 'white',

                                        ...fadeStyle,
                                    }}
                                />
                            );
                        }
                        if (bg === 'green')
                            return (
                                <img
                                    key={`${x}-${y}`}
                                    src="/images/assets/pot_intact.png"
                                    width={40}
                                    style={{
                                        overflow: 'visible',
                                        width: 40,
                                        height: 40,
                                        border: '1px solid black',
                                        background: 'lightgrey',

                                        ...fadeStyle,
                                    }}
                                />
                            );
                        if (bg === 'brown')
                            return (
                                <img
                                    key={`${x}-${y}`}
                                    src="/images/assets/pot_broken.png"
                                    width={40}
                                    style={{
                                        overflow: 'visible',
                                        width: 40,
                                        height: 40,
                                        border: '1px solid black',
                                        background: onSight ? 'white' : 'lightgrey',
                                        ...fadeStyle,
                                    }}
                                />
                            );
                        return (
                            <div
                                key={`${x}-${y}`}
                                style={{
                                    width: 40,
                                    height: 40,
                                    border: '1px solid black',
                                    background: 'lightgrey',
                                    ...fadeStyle,
                                }}
                            />
                        );
                    })
                )}
            </div>

            <Burglar direction={SixthSenseDirection.East} />
            <div />
            <Burglar direction={SixthSenseDirection.South} />

            <div />
        </div>
    );
}
