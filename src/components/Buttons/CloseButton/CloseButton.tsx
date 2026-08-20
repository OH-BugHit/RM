import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useSetAtom } from 'jotai';
import { HUDvisAtom } from '../../../atoms/uiState';

interface CloseButtonProps {
    target: 'agentSettings' | 'rewardSettings';
}
export default function CloseButton({ target }: CloseButtonProps) {
    const setHudVis = useSetAtom(HUDvisAtom);
    const close = () => {
        if (target === 'agentSettings') {
            setHudVis((old) => {
                return {
                    ...old,
                    agent: {
                        img: false,
                        obs: false,
                        prm: false,
                        trash: true,
                    },
                };
            });
        } else if (target === 'rewardSettings') {
            setHudVis((old) => {
                return {
                    ...old,
                    rewardSettings: {
                        step: false,
                        time: false,
                        props: false,
                    },
                };
            });
        }
    };

    return (
        <IconButton onClick={() => close()}>
            <CloseIcon fontSize="medium" />
        </IconButton>
    );
}
