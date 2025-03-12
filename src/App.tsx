import React, { useEffect, useState } from "react";

import { Button, MapPicker, MapResults, MapViewer } from "src/components";
import { equalizeMapRows } from "./helpers/mapModifiers";
import { findPath } from "src/helpers/findPath";
import { Instructions } from "src/components";
import { MapArray, MapKeys } from "src/types";
import { MAPS } from "./constants/maps";

import "./App.scss";

const MapTraversal: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggleInstructions, setToggleInstructions] = useState<boolean>(false);
  const [selectedMapKey, setSelectedMapKey] = useState<MapKeys>("BASIC_EXAMPLE");
  const [equalizedMap, setEqualizedMap] = useState<MapArray>(MAPS.BASIC_EXAMPLE);
  const [mapResults, setMapResults] = useState<{path: string[]; collectedLetters: string[];}>({ path: [], collectedLetters: [] });

  useEffect(() => {
    setEqualizedMap(equalizeMapRows(MAPS[selectedMapKey]));
  }, [selectedMapKey]);

  const handleSolveMap = () => {
    setIsLoading(true);
    const { path, collectedLetters, error } = findPath(equalizedMap);

    if (!mapResults.path.length) {
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

  const handleToggleInstructions = () => {
    setToggleInstructions(!toggleInstructions);
  };
  return (
    <div className="page">
      <h1>Map Traversal</h1>
      <Button
        color="primary"
        onClick={handleToggleInstructions}
        tooltipText={toggleInstructions ? "Back to maps" : "Show Instructions"}
      >
        {toggleInstructions ? "Back to maps" : "Show Instructions"}
      </Button>

      {toggleInstructions ? <Instructions /> :
        <React.Fragment>
          <MapPicker
            selectedMapKey={selectedMapKey}
            handleMapChange={handleMapChange}
          />
          <MapViewer equalizedMap={equalizedMap} />
          <Button
            color="primary"
            onClick={handleSolveMap}
            tooltipText={"Solve map"}
          >
            {isLoading ? "Loading..." : "Solve map"}
          </Button>
          <MapResults isError={isError} mapResults={mapResults} />
        </React.Fragment>
      }
    </div>
  );
};

export default MapTraversal;
