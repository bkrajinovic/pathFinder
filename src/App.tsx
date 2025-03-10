import React, { useEffect, useState } from 'react';

import { handleParseMap } from 'src/helpers/mapParser';
import { findPath } from 'src/helpers/pathFinder';
import { MapArray } from './shared/types';
import { MAPS } from './constants/maps';
import Map from './Map';

import './App.css';

type MapKeys = keyof typeof MAPS;

const MapTraversal: React.FC = () => {
  const [error] = useState<string | null>(null);

  const [selectedMapKey, setSelectedMapKey] = useState<MapKeys>('BASIC_EXAMPLE');
  const [map2D, setMap2D] = useState<MapArray>(MAPS.BASIC_EXAMPLE);


  useEffect(() => {
    setMap2D(handleParseMap(MAPS[selectedMapKey]));
  }, [selectedMapKey]);

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

      <button onClick={() => findPath(map2D)}>
        Find Path
      </button>

      {error && <h2>{error}</h2>}

      <Map map2D={map2D} />
    </div>
  );
};

export default MapTraversal;