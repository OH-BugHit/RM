import { useAtomValue } from 'jotai';
import { ActiveAgentAtom, ImportedAgentImgAtom } from '../../../atoms/state';
import { AnimatePresence, motion } from 'framer-motion';
import { getAgentImage } from '../../../components/GameComponents/agentProps';

export default function AgentPreview() {
    const selectedAgent = useAtomValue(ActiveAgentAtom);
    const importedImage = useAtomValue(ImportedAgentImgAtom);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <AnimatePresence mode="wait">
                {selectedAgent.type !== 'none' && (
                    <>
                        <h3>Agent selected:</h3>
                        <h3 style={{ justifySelf: 'center', marginLeft: 0 }}>{selectedAgent.name}</h3>
                        <motion.div
                            key={selectedAgent.type}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                key={selectedAgent.type}
                                src={getAgentImage({ type: selectedAgent.type, atomState: importedImage })}
                                height={100}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
