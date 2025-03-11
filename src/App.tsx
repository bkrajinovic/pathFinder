import React, { useEffect, useState } from 'react';

import { Button, MapPicker, MapResults, MapViewer } from 'src/components';
import { equalizeMapRows } from './helpers/mapModifiers';
import { MapArray, MapKeys } from 'src/types';
import { findPath } from 'src/helpers/findPath';
import { MAPS } from './constants/maps';

import './App.scss';

const MapTraversal: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMapKey, setSelectedMapKey] = useState<MapKeys>('BASIC_EXAMPLE');
  const [equalizedMap, setEqualizedMap] = useState<MapArray>(MAPS.BASIC_EXAMPLE);
  const [mapResults, setMapResults] = useState<{ path: string[], collectedLetters: string[] }>({ path: [], collectedLetters: [] });


  useEffect(() => {
    setEqualizedMap(equalizeMapRows(MAPS[selectedMapKey]));
  }, [selectedMapKey]);

  const handleSolveMap = () => {
    setIsLoading(true);
    const { path, collectedLetters, error } = findPath(equalizedMap);

    if(!mapResults.path.length) {
      if (error) {
        setIsError(true);
      } else {
        setMapResults({ path, collectedLetters });
      }
    }

    setIsLoading(false);
  };

  const handleMapChange = (key: MapKeys) => {
    setIsError(false);
    setSelectedMapKey(key);
    setMapResults({ path: [], collectedLetters: [] });
  };

  return (
    <div className='page'>
      <h1>Map Traversal</h1>

      <MapPicker selectedMapKey={selectedMapKey} handleMapChange={handleMapChange} />
      <MapViewer equalizedMap={equalizedMap} />

      <Button color='primary' onClick={handleSolveMap} size='large' tooltipText='Solve map'>
        {isLoading ? 'Loading...' : 'Solve Map'}
      </Button>

      <MapResults isError={isError} mapResults={mapResults}/>
    </div>
  );
};

export default MapTraversal;