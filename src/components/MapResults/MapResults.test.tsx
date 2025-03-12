import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import MapResults from './index';

describe('MapResults component', () => {
  it('renders error message when isError is true', () => {
    render(<MapResults isError={true} mapResults={{ path: [], collectedLetters: [] }} />);
    const errorMessage = screen.getByText(/Ops! There is an error in path/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders path and collected letters when isError is false', () => {
    const mapResults = {
      path: ['A', 'B', 'C'],
      collectedLetters: ['X', 'Y', 'Z']
    };
    render(<MapResults isError={false} mapResults={mapResults} />);

    const pathTitle = screen.getByText(/Path/i);
    const collectedLettersTitle = screen.getByText(/Collected Letters/i);

    expect(pathTitle).toBeInTheDocument();
    expect(collectedLettersTitle).toBeInTheDocument();

    mapResults.path.forEach(item => {
      const pathItem = screen.getByText(item);
      expect(pathItem).toBeInTheDocument();
    });

    mapResults.collectedLetters.forEach(item => {
      const collectedLetterItem = screen.getByText(item);
      expect(collectedLetterItem).toBeInTheDocument();
    });
  });
});