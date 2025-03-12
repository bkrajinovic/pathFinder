import React from 'react';
import './styles.scss';

interface MapViewerProps {
  equalizedMap: string[][];
}

const MapViewer: React.FC<MapViewerProps> = ({ equalizedMap }) => {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${equalizedMap[0]?.length || 0}, var(--cell-size))` }}
      data-testid="map-viewer"
      className="map-viewer"
    >
      {equalizedMap.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            className="map-viewer__cell"
            data-testid="cell"
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default MapViewer;