import React from 'react';

interface MapProps {
  map2D: string[][];
}

const Map: React.FC<MapProps> = ({ map2D }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${map2D[0]?.length || 0}, 30px)` }}>
      {map2D.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            style={{
              fontSize: '18px',
              width: '30px',
              height: '30px',
              border: '1px solid #2C3930',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#A27B5C',
            }}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default Map;