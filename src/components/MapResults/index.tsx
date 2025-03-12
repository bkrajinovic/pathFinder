import React from "react";
import { DisplayList } from "src/components";
import './styles.scss';

interface MapResultsProps {
  isError: boolean;
  mapResults: { path: string[]; collectedLetters: string[] };
}

const MapResults: React.FC<MapResultsProps> = ({ isError, mapResults }) => {
  const { path, collectedLetters } = mapResults;

  return (isError ?
    <p className="error-message" role='alert'>{isError ? 'Ops! There is an error in path' : ''}</p> :
    <React.Fragment>
      <DisplayList title="Path" items={path} />
      <DisplayList title="Collected Letters" items={collectedLetters} />
    </React.Fragment>
    );
};

export default MapResults;
