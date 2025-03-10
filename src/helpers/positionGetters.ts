import { MapArray, Directions, Position } from "src/shared/types";

export const getStartingAndEndingCharacterPosition = (map2D: MapArray) => {
    const startingPositions = [];
    const endingPositions = [];
    let isError = false;
    let error = null;

    for (let rowIndex = 0; rowIndex < map2D.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < map2D[rowIndex].length; cellIndex++) {
        if (map2D[rowIndex][cellIndex] === '@') {
          startingPositions.push({ rowIndex, cellIndex });
        }

        if (map2D[rowIndex][cellIndex]?.toLowerCase() === 'x') {
          endingPositions.push({ rowIndex, cellIndex });
        }
      }
    }

    if (startingPositions.length === 0) {
      error = 'No starting position (@) found in the map.';
      isError = true;
    }

    if (startingPositions.length > 1) {
      error = 'Multiple starting positions (@) found in the map.';
      isError = true;
    }

    if (endingPositions.length === 0) {
      error = 'No ending position (X) found in the map.';
      isError = true;
    }

    if (endingPositions.length > 1) {
      error = 'Multiple ending positions (X) found in the map.';
      isError = true;
    }

    console.log(error);

    return {
      startingPosition: startingPositions[0],
      endingPosition: endingPositions[0],
      error: isError,
    };
  };

export const nextPositionBasedOnPreviousDirection = (position: Position, previousDirection: Directions) => {
    if (previousDirection === 'left') {
      position.cellIndex -= 1;
    } else if (previousDirection === 'right') {
      position.cellIndex += 1;
    } else if (previousDirection === 'down') {
      position.rowIndex += 1;
    } else if (previousDirection === 'up') {
      position.rowIndex -= 1;
    }
  };
