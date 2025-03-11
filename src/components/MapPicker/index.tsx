import React from 'react';
import { MAPS } from 'src/constants/maps';
import { MapKeys } from 'src/types';

import './styles.scss';

interface MapPickerProps {
    selectedMapKey: string;
    handleMapChange: (key: MapKeys) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ selectedMapKey, handleMapChange }) => {
    return (
        <div className='map-picker'>
          {Object.keys(MAPS).map(key => (
            <div
              key={key}
              className={`map-picker__item${selectedMapKey === key ? '--selected' : ''}`}
              onClick={() => handleMapChange(key as MapKeys)}
              >
              <p className='map-picker__item__title'>
                {key.replace(/_/g, ' ')}
              </p>
            </div>
        ))}
      </div>
    );
};

export default MapPicker;