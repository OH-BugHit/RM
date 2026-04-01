import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Frontpage from './Frontpage';

// Mocks
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../Footer/Footer', () => ({
    default: () => <div data-testid="footer" />,
}));

vi.mock('@genai-fi/base', () => ({
    Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{props.children}</button>,
}));

vi.mock('../RobodogTest/Robodog', () => ({
    default: () => <div data-testid="robodog" />,
}));

describe('Frontpage', () => {
    it('Dummy tests', () => {
        render(
            <MemoryRouter>
                <Frontpage />
            </MemoryRouter>
        );
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
