import React from 'react';
import './styles.scss';

interface MapViewerProps {
  equalizedMap: string[][];
}

const MapViewer: React.FC<MapViewerProps> = ({ equalizedMap }) => {
  return (
    <div className="map-viewer" style={{ gridTemplateColumns: `repeat(${equalizedMap[0]?.length || 0}, 30px)` }}>
      {equalizedMap.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            className="map-viewer__cell"
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default MapViewer;