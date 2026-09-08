import { theme } from '@genai-fi/base';
import { GameScaleProvider } from '../../context/GameScale/GameScaleProvied';
import Frontpage from './Frontpage';
import { ThemeProvider } from '@mui/material';

export default function FrontpageWrapper() {
    return (
        <ThemeProvider theme={theme}>
            <GameScaleProvider>
                <Frontpage />
            </GameScaleProvider>
        </ThemeProvider>
    );
}
