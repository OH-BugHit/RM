import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import About from './About';
import { renderWithProviders } from '../../test-utils/render';
//import React from 'react';

describe('About', () => {
    it('renders title', () => {
        renderWithProviders(<About />);
        expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Generation AI');
    });

    it('renders logo image', () => {
        renderWithProviders(<About />);
        const images = screen.getAllByAltText('logo');
        expect(images[0].getAttribute('src')).toBe('/logo192_bw.png');
    });

    it('renders privacy markdown content', () => {
        renderWithProviders(<About />);
        const markdownContent = screen.getByText(/Welcome to our Privacy Notice/);
        expect(markdownContent).toBeTruthy();
    });

    it('renders footer', () => {
        renderWithProviders(<About />);
        expect(screen.getByTestId('footer')).toBeTruthy();
    });
});
