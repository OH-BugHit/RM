import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Frontpage from './Frontpage';
import { createTheme, ThemeProvider } from '@mui/material';

// Mocks
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../Footer/Footer', () => ({
    default: () => <div data-testid="footer" />,
}));

vi.mock('@genai-fi/base', () => ({
    Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{props.children}</button>,
    theme: {},
}));

vi.mock('../GameView/GameView', () => ({
    default: () => <div data-testid="robodog" />,
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Frontpage', () => {
    it('Dummy tests', () => {
        const theme = createTheme();
        render(
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <Frontpage />
                </MemoryRouter>
            </ThemeProvider>
        );
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
