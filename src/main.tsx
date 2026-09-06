import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import { theme } from '@genai-fi/base';

const spoofTheme = createTheme(theme, {
    components: {
        MuiPopper: {
            styleOverrides: {
                root: {
                    zIndex: '3000 !important',
                },
            },
        },
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
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={spoofTheme}>
                <App />
            </ThemeProvider>
        </I18nextProvider>
    </React.StrictMode>
);
