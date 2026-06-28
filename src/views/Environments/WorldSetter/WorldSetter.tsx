/*
*** OLD WORLD SETTER. world is removed from selectedEnvironment.
import { FormLabel, Slider } from '@mui/material';
import { useAtom } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../atoms/state';

export default function WorldSetter() {
    const [selectedEnvironment, setSelectedEnvironment] = useAtom(ActiveEnvironmentAtom);

    return (
        <div>
            <h3>World props:</h3>
            <FormLabel>World size (number of doors): {selectedEnvironment.world.numberOfEdges}</FormLabel>
            <Slider
                value={selectedEnvironment.world.numberOfEdges}
                min={0}
                max={40}
                step={1}
                valueLabelDisplay="auto"
                onChange={(_, newValue) => {
                    setSelectedEnvironment((prev) => ({
                        ...prev,
                        world: {
                            ...prev.world,
                            numberOfEdges: newValue,
                        },
                    }));
                }}
            />

            <FormLabel>Density: {selectedEnvironment.world.density}</FormLabel>
            <Slider
                value={selectedEnvironment.world.density}
                min={0}
                max={1}
                step={0.1}
                valueLabelDisplay="auto"
                onChange={(_, newValue) => {
                    setSelectedEnvironment((prev) => ({
                        ...prev,
                        world: {
                            ...prev.world,
                            density: newValue,
                        },
                    }));
                }}
            />

            <FormLabel>Room size: {selectedEnvironment.world.roomSizeX}</FormLabel>
            <Slider
                value={selectedEnvironment.world.numberOfEdges}
                min={10}
                max={10}
                step={1}
                valueLabelDisplay="auto"
                onChange={(_, newValue) => {
                    setSelectedEnvironment((prev) => ({
                        ...prev,
                        world: {
                            ...prev.world,
                            roomSizeX: newValue,
                            roomSizeY: newValue,
                        },
                    }));
                }}
            />
        </div>
    );
}
*/
