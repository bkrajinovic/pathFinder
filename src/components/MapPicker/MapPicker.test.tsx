import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { MAPS } from 'src/constants/maps';
import { MapKeys } from 'src/types';
import MapPicker from './index';

describe('MapPicker component', () => {
  it('renders all map options', () => {
    render(<MapPicker selectedMapKey="" handleMapChange={() => {}} />);
    const mapKeys = Object.keys(MAPS) as MapKeys[];
    mapKeys.forEach(key => {
      const mapItem = screen.getByText(key.replace(/_/g, ' '));
      expect(mapItem).toBeInTheDocument();
    });
  });

  it('highlights the selected map', () => {
    const selectedMapKey: string = Object.keys(MAPS)[0];
    render(<MapPicker selectedMapKey={selectedMapKey} handleMapChange={() => {}} />);
    const selectedMapItem = screen.getByText(selectedMapKey.replace(/_/g, ' '));
    expect(selectedMapItem).toHaveClass('color-secondary');
  });

  it('calls handleMapChange when a map is clicked', () => {
    const handleMapChange = vi.fn();
    const mapKeys = Object.keys(MAPS) as MapKeys[];
    render(<MapPicker selectedMapKey="" handleMapChange={handleMapChange} />);
    const mapItem = screen.getByText(mapKeys[0].replace(/_/g, ' '));
    fireEvent.click(mapItem);
    expect(handleMapChange).toHaveBeenCalledWith(mapKeys[0]);
  });
});