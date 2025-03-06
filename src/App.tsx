import React, { useEffect, useState } from 'react';
import { MAPS } from './constants';
import Map from './Map';

import './App.css';

type MapKeys = keyof typeof MAPS;

const MapTraversal: React.FC = () => {
  const [selectedMapKey, setSelectedMapKey] = useState<MapKeys>('BASIC_EXAMPLE');
  const [map2D, setMap2D] = useState<string[][]>(MAPS.BASIC_EXAMPLE);

  useEffect(() => {
    handleParseMap();
  }, [selectedMapKey]);

  const handleParseMap = () => {
    const selectedMap = MAPS[selectedMapKey];

    // Find the length of the longest array
    const maxLength = selectedMap.reduce((max, row) => Math.max(max, row.length), 0);

    // Ensure every array is the same length
    const normalizedMap = selectedMap.map(row => {
      while (row.length < maxLength) {
        row.push(' ');
      }
      return row;
    });

    setMap2D(normalizedMap);
  };

  return (
    <div className='App'>
      <h1>Map Traversal</h1>
      <select onChange={(e) => setSelectedMapKey(e.target.value as MapKeys)} value={selectedMapKey}>
        {Object.keys(MAPS).map(key => (
          <option key={key} value={key}>
            {key.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
      <Map map2D={map2D} />
    </div>
  );
};

export default MapTraversal;