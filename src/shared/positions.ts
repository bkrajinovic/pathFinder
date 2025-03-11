import { MapArray } from "src/shared/types";

export const getStartingAndEndingCharacterPosition = (map2D: MapArray) => {
    const startingPositions = [];
    const endingPositions = [];
    let isError = false;

    for (let rowIndex = 0; rowIndex < map2D.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < map2D[rowIndex].length; cellIndex++) {
        if (map2D[rowIndex][cellIndex] === '@') {
          startingPositions.push({ rowIndex, cellIndex });
        }

        if (map2D[rowIndex][cellIndex] === 'x') {
          endingPositions.push({ rowIndex, cellIndex });
        }
      }
    }

    if (startingPositions.length === 0) isError = true;
    if (startingPositions.length > 1) isError = true;
    if (endingPositions.length === 0) isError = true;
    if (endingPositions.length > 1) isError = true;

    return {
      startingPosition: startingPositions[0],
      endingPosition: endingPositions[0],
      error: isError,
    };
  };
