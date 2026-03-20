import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import { theme } from '@genai-fi/base';

const spoofTheme = createTheme(theme, {
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#000000ff',
                    '&.Mui-focused': {
                        color: '#000000ff',
                    },
                    '&.Mui-error': {
                        color: 'red',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(21 53 58 / 76%);',
                    },
                },
            },
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={spoofTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
