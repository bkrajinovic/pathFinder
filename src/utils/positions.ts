import { MapArray } from "src/types";

export const getStartingAndEndingCharacterPosition = (equalizedMap: MapArray) => {
    const startingPositions = [];
    const endingPositions = [];
    let isError = false;

    for (let rowIndex = 0; rowIndex < equalizedMap.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < equalizedMap[rowIndex].length; cellIndex++) {
        if (equalizedMap[rowIndex][cellIndex] === '@') {
          startingPositions.push({ rowIndex, cellIndex });
        }

        if (equalizedMap[rowIndex][cellIndex] === 'x') {
          endingPositions.push({ rowIndex, cellIndex });
        }
      }
    }

    if (startingPositions.length !== 1 || endingPositions.length !== 1) {
      isError = true;
    }

    return {
      startingPosition: startingPositions[0],
      endingPosition: endingPositions[0],
      error: isError,
    };
  };
