import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import { createTheme, ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';

const theme = createTheme({
    transitions: {
        create: () => 'none',
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
});

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    store?: ReturnType<typeof createStore>;
}

function AllProviders({ children, store }: React.PropsWithChildren<{ store: ReturnType<typeof createStore> }>) {
    return (
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>{children}</Provider>
            </ThemeProvider>
        </MemoryRouter>
    );
}

export function renderWithProviders(
    ui: React.ReactElement,
    { store = createStore(), ...options }: ExtendedRenderOptions = {}
) {
    return render(ui, {
        wrapper: ({ children }) => <AllProviders store={store}>{children}</AllProviders>,
        ...options,
    });
}
