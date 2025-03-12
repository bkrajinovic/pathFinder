import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import MapViewer from './index';

describe('MapViewer component', () => {
  it('renders the correct number of rows and cells', () => {
    const equalizedMap = [
      ['@', '-', '-', 'x'],
      ['|', ' ', ' ', '|'],
      ['+', '-', '-', '+']
    ];
    render(<MapViewer equalizedMap={equalizedMap} />);

    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(equalizedMap.flat().length);
  });
});