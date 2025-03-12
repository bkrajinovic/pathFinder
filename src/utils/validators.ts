import { Directions, Position, MapArray } from "src/types";
import { UPPERCASE_LETTERS } from 'src/helpers/patterns';
import { moveInDirection } from "./directions";


export const isValidPathChar = (char: string): boolean => {
  return ['-', '|', '+', 'x'].includes(char) || UPPERCASE_LETTERS.test(char);
};

export const isValidMove = (equalizedMap: MapArray, position: Position, direction: Directions): boolean => {
  const newPosition = { ...position };
  moveInDirection(newPosition, direction);
  return !isOutOfBounds(equalizedMap, newPosition) && isValidPathChar(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]);
};

export const isOutOfBounds = (equalizedMap: MapArray, position: Position): boolean => {
  return (
    position.rowIndex < 0 ||
    position.rowIndex >= equalizedMap.length ||
    position.cellIndex < 0 ||
    position.cellIndex >= equalizedMap[0].length
  );
};

export const isEndingPosition = (position: Position, endingPosition: Position): boolean => {
  return position.rowIndex === endingPosition.rowIndex && position.cellIndex === endingPosition.cellIndex;
};
