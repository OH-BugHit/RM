import style from './style.module.css';
import { ObservationShape } from '../../../types';
import DrawObservation from '../../Observation/DrawObservation';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { ActiveAgentAtom } from '../../../atoms/state';

export default function SelectedObservation() {
    const selectedAgent = useAtomValue(ActiveAgentAtom);

    const showObservation = (type: ObservationShape) => {
        switch (type) {
            case 'small':
                return (
                    <DrawObservation
                        state="0101-1"
                        disabled={false}
                        actionValues={[0, 0, 0, 0, 0, 0]}
                        drawActions={false}
                        type={'small'}
                    />
                );
            case 'large': {
                return (
                    <DrawObservation
                        state="10020000201021100222-1"
                        disabled={false}
                        actionValues={[0, 0, 0, 0, 0, 0]}
                        drawActions={false}
                        type="large"
                    />
                );
            }
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={style.selectedStory}
        >
            <AnimatePresence mode="wait">
                {selectedAgent.type !== 'none' && (
                    <>
                        <h3>Observation space:</h3>
                        <motion.div
                            key={selectedAgent.type}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {selectedAgent.type ? (
                                <>{showObservation(selectedAgent.observationShape)}</>
                            ) : (
                                <p>select agent</p>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
