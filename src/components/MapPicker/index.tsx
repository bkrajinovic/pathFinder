import React from "react";
import { MAPS } from "src/constants/maps";
import { Button } from "src/components";
import { MapKeys } from "src/types";
import "./styles.scss";

interface MapPickerProps {
  selectedMapKey: string;
  handleMapChange: (key: MapKeys) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ selectedMapKey, handleMapChange }) => {
  return (
    <ul className="map-picker">
      {Object.keys(MAPS).map((key) => (
        <li key={key}>
          <Button
            color={selectedMapKey === key ? "secondary" : "primary"}
            onClick={() => handleMapChange(key as MapKeys)}
            aria-pressed={selectedMapKey === key}
            tooltipText={`Select ${key.replace(/_/g, " ")} map`}
            >
            {key.replace(/_/g, " ")}
            </Button>
        </li>
      ))}
    </ul>
  );
};

export default MapPicker;
