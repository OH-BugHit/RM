import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Frontpage from './Frontpage';

// Mocks
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../hooks/useModelNamesLoader', () => ({
    useModelNamesLoader: () => {},
}));

vi.mock('../../components/Footer/Footer', () => ({
    default: () => <div data-testid="footer" />,
}));

vi.mock('@genai-fi/base', () => ({
    Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{props.children}</button>,
}));

vi.mock('@mui/material', () => ({
    TextField: (props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; value?: string }) => (
        <input
            data-testid="textfield"
            value={props.value}
            onChange={props.onChange}
            onClick={props.onClick}
            aria-label={props.label}
        />
    ),
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
    it('renders TextField and Buttons', () => {
        render(
            <MemoryRouter>
                <Frontpage />
            </MemoryRouter>
        );

        const input = screen.getByTestId('textfield') as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(2);

        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('updates TextField value on change', () => {
        render(
            <MemoryRouter>
                <Frontpage />
            </MemoryRouter>
        );

        const input = screen.getByTestId('textfield') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '12345' } });

        expect(input.value).toBe('12345');
    });

    it('disables start button when code is too short', () => {
        render(
            <MemoryRouter>
                <Frontpage />
            </MemoryRouter>
        );

        const buttons = screen.getAllByRole('button');
        const startButton = buttons[0]; // ensimmäinen on toStudent

        const input = screen.getByTestId('textfield') as HTMLInputElement;

        // empty input -> disabled
        expect(startButton).toBeDisabled();

        // 4 -> disabled
        fireEvent.change(input, { target: { value: '1234' } });
        expect(startButton).toBeDisabled();

        // 5 -> enabled
        fireEvent.change(input, { target: { value: '12345' } });
        expect(startButton).not.toBeDisabled();
    });

    it('calls navigate to student when start button clicked', () => {
        render(
            <MemoryRouter>
                <Frontpage />
            </MemoryRouter>
        );

        const input = screen.getByTestId('textfield') as HTMLInputElement;
        const buttons = screen.getAllByRole('button');
        const startButton = buttons[0];

        fireEvent.change(input, { target: { value: '12345' } });
        fireEvent.click(startButton);

        expect(mockNavigate).toHaveBeenCalledWith('/student/12345/main');
    });

    it('calls navigate to teacher library when create button clicked', () => {
        render(
            <MemoryRouter>
                <Frontpage />
            </MemoryRouter>
        );

        const buttons = screen.getAllByRole('button');
        const createButton = buttons[1]; // toinen button

        fireEvent.click(createButton);

        expect(mockNavigate).toHaveBeenCalledWith('/library/');
    });
});
