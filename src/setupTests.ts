import { afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

vi.mock('react-i18next', () => {
    type TOptions = { returnObjects?: boolean };
    return {
        useTranslation: () => ({
            t: (key: string, options?: TOptions) => {
                if (options?.returnObjects) {
                    return ['Welcome to our Privacy Notice', 'Second paragraph'];
                }
                return key === 'about.title' ? 'Generation AI' : key;
            },
            i18n: {
                changeLanguage: () => Promise.resolve(),
            },
        }),
        Trans: ({ children }: { children: React.ReactNode }) => children,
    };
});

// Cleanup after each test
afterEach(() => {
    cleanup();
});
